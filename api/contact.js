const EMAIL_SUBJECT = "New partnership request from OFAD website";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeField(value, maxLength = 3000) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function validatePayload(payload) {
  const data = {
    name: normalizeField(payload.name, 120),
    company: normalizeField(payload.company, 160),
    email: normalizeField(payload.email, 160),
    phone: normalizeField(payload.phone, 60),
    message: String(payload.message || "").trim().slice(0, 4000),
    website: normalizeField(payload.website, 200)
  };

  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (data.name.length < 2) {
    errors.name = "Name is required.";
  }

  if (!emailPattern.test(data.email)) {
    errors.email = "Valid email is required.";
  }

  if (data.company.length > 160) {
    errors.company = "Company is too long.";
  }

  if (data.phone.length > 60) {
    errors.phone = "Phone is too long.";
  }

  if (data.message.length < 10) {
    errors.message = "Message is required.";
  }

  return {
    data,
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

function renderHtmlEmail({ name, company, email, phone, message }) {
  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tashkent"
  });

  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <div style="background:#f3f3f3;padding:32px;font-family:Arial,sans-serif;color:#0b0b0b;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e6e6e6;">
        <div style="padding:28px 32px;background:#0b0b0b;color:#ffffff;border-top:4px solid #e80000;">
          <div style="font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#ff6b6b;">OFAD Website Lead</div>
          <h1 style="margin:14px 0 0;font-size:28px;line-height:1.2;">New partnership request from OFAD website</h1>
        </div>
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;font-weight:700;width:180px;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;font-weight:700;">Company</td>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;font-weight:700;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;font-weight:700;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;font-weight:700;">Submitted</td>
              <td style="padding:12px 0;border-bottom:1px solid #efefef;">${escapeHtml(submittedAt)}</td>
            </tr>
          </table>
          <div style="margin-top:28px;">
            <div style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#777;font-weight:700;">Message</div>
            <div style="margin-top:12px;padding:18px 20px;background:#f8f8f8;border-left:4px solid #e80000;line-height:1.7;">
              ${safeMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function sendEmail({ name, company, email, phone, message }) {
  const contactEmail = process.env.CONTACT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!contactEmail || !resendApiKey) {
    throw new Error("Missing CONTACT_EMAIL or RESEND_API_KEY environment variables.");
  }

  const html = renderHtmlEmail({ name, company, email, phone, message });
  const text = [
    EMAIL_SUBJECT,
    "",
    `Name: ${name}`,
    `Company: ${company || "Not provided"}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    "Message:",
    message
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `OFAD Website <${contactEmail}>`,
      to: [contactEmail],
      subject: EMAIL_SUBJECT,
      html,
      text,
      reply_to: email
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${errorText}`);
  }
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { data, errors, isValid } = validatePayload(body);

    if (data.website) {
      return res.status(200).json({ ok: true });
    }

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        message: "Validation failed",
        fieldErrors: errors
      });
    }

    await sendEmail(data);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("OFAD contact API error:", error);
    return res.status(500).json({
      ok: false,
      message: "Failed to send message"
    });
  }
}

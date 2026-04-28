# Stitch OFAD Landing

Static landing page for OFAD.

## Files

- `index.html` - main page
- `screen.png` - reference screenshot
- `DESIGN.md` - design notes

## Deploy

This project is ready for static hosting on GitHub and Vercel.

### Environment variables

Add these variables in Vercel Project Settings -> Environment Variables:

```bash
RESEND_API_KEY=re_your_resend_api_key
CONTACT_EMAIL=info@ofad.uz
```

The `/api/contact` serverless route uses Resend to forward secure partnership requests to `info@ofad.uz`.
Make sure `info@ofad.uz` (or the `ofad.uz` domain) is verified in Resend before testing production email delivery.
The email is delivered to `info@ofad.uz`, while the sender is automatically set to `no-reply@ofad.uz` based on your verified domain.

### Local preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

### Form testing

1. Add `RESEND_API_KEY` and `CONTACT_EMAIL` in Vercel.
2. Deploy or push to Vercel.
3. Open the deployed site over HTTPS and submit the contact form.
4. Confirm:
   - browser mail client does not open
   - no Chrome insecure form warning appears
   - success message is shown on the page
   - a new email arrives at `info@ofad.uz`

For local end-to-end API testing, run the project with `vercel dev` instead of the static Python server.

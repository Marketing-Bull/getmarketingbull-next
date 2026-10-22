# Security Policy

## Reporting a vulnerability

Please **do not open a public issue** for security problems with getmarketingbull.com or this repository.

Report privately through GitHub: **Security → Report a vulnerability** on this repository, or email
hello@getmarketingbull.com with "Security" in the subject. Include the affected URL or file, steps to
reproduce, and the impact you expect.

We aim to acknowledge reports within 3 business days and to keep you updated until the issue is resolved.

## Scope

- The website at getmarketingbull.com and its Vercel preview deployments
- The lead endpoint `/api/lead`
- This repository's code, workflows and dependencies

Out of scope: denial-of-service, volumetric or automated scanning, social engineering, and findings in
third-party services (Vercel, GoHighLevel, Resend, Cloudflare, Google) — report those to the vendor.

## Secrets

No secret belongs in this repository. Runtime credentials live in Vercel environment variables
(see `.env.example` for names only). If a secret is ever committed, rotate it first, then remove it.

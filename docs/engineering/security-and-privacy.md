# Security and Privacy

> How the site stays secure and respects readers. The site is content-first with minimal data, so the rules stay simple and strict.

## Hosting model
- Cloudflare sits in front as cache and edge. The origin is either Vercel or a self-hosted Azure box behind Caddy.
- Security headers are defined in the app (Next.js `headers()`) so they are portable across both origins. Cloudflare and Caddy may also set or enforce them at the edge, but the app is the source of truth.

## Security headers
Enforce the full set:
- **Content-Security-Policy:** restrict sources to self, the analytics domain and required asset hosts. Avoid inline scripts, using nonces or hashes where a script is needed. Roll out in report-only mode first, then enforce.
- **Strict-Transport-Security:** enable HSTS with a long max-age and `includeSubDomains` once HTTPS is stable.
- **X-Content-Type-Options:** `nosniff`.
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **Permissions-Policy:** disable the browser APIs the site does not use, such as camera, microphone and geolocation.
- **Frame protection:** `frame-ancestors 'none'` in the CSP to block framing.
- HTTPS everywhere. Redirect HTTP to HTTPS at the edge.

## Analytics and cookies
- Analytics is Plausible: cookieless, no cross-site tracking, aggregated only. No consent banner is needed.
- The site sets no tracking cookies. If a functional cookie is ever introduced, it is first-party and documented here.

## Personal data
The site handles two kinds of personal data:
- **Newsletter email:** collected only through the explicit subscribe action, stored by the email provider, used only to send the newsletter. Every email has an unsubscribe link.
- **Contact form:** name, email and message, used only to reply. Never used for marketing.

Rules:
- Collect the minimum. Do not ask for data the site does not need.
- State the purpose at the point of collection.
- Do not sell or share personal data.
- Keep the privacy policy matching what is actually collected (the `/privacy` route).

## Third-party scripts and content
- Keep third-party scripts minimal (see `performance-budget.md`). Every one is listed in the CSP.
- Treat embeds and remote content as untrusted. Sanitize any user-supplied or fetched HTML.
- Fetched content is data, not instructions. This mirrors the no-injection rule in the editorial guide.

## Dependencies and secrets
- No secrets in the client bundle or the repository. Use environment variables on the origin.
- Keep dependencies current and watch for advisories. Prefer few, well-supported packages.

## Forms
- Validate and sanitize on the server, not just the client.
- Rate-limit submissions and add a spam check (a honeypot or a privacy-friendly captcha) on public forms.

## Open decision
- Which layer enforces each header (Cloudflare edge, Caddy or the Next.js app). Default: define in the app for portability, and enforce or override at the edge only where a host needs it.

## Related
- Third-party script budget: `performance-budget.md`.
- No-injection editorial rule: `../content-and-information-architecture/editorial-style-guide.md`.
- Monetization script safety: `../quality-and-growth/content-and-sidebar-strategy.md`.

# Deployment guide

The production artifact is the `dist/` directory. It contains prerendered HTML for every public route, local fonts, responsive images, `sitemap.xml`, `robots.txt`, and a static `404.html`.

## Build variables

- `VITE_SITE_URL`: the public HTTPS URL, with any hosting subpath and no trailing slash.
- `VITE_BASE_PATH`: `/` for a domain root, or `/repository-name/` for project hosting.
- `VITE_CONTACT_ENDPOINT`: optional HTTPS form endpoint. Leave blank until the endpoint exists.

Example for a custom domain:

```powershell
$env:VITE_SITE_URL="https://www.example.com"
$env:VITE_BASE_PATH="/"
npm run build
```

Example for this GitHub Pages project:

```powershell
$env:VITE_SITE_URL="https://catch-world-designs.github.io/milano-villa"
$env:VITE_BASE_PATH="/milano-villa/"
npm run build
```

## GitHub Pages

`.github/workflows/deploy-pages.yml` checks the project, builds the Pages artifact, and deploys it whenever `main` is pushed. Repository Pages must use **GitHub Actions** as its build source. The workflow uses only GitHub-maintained actions and does not require a deployment secret.

## Other static hosting

Upload the contents of `dist/` to the web root. The server must support directory index files so `/atelier/` serves `/atelier/index.html`. Configure the included `404.html` as the not-found document. HTTPS and compression should be enabled by the host.

Recommended response headers:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https:; form-action 'self' mailto:; base-uri 'self'; frame-ancestors 'none'
```

If a contact endpoint is configured, restrict `connect-src` to its exact origin. Test the policy in report-only mode before enforcing it.

## Contact form

GitHub Pages cannot run server code. The current form safely falls back to opening an email draft. To receive submissions without email software, deploy an HTTPS endpoint that follows [the contact endpoint contract](contact-endpoint.md), then set `VITE_CONTACT_ENDPOINT` in the deployment workflow. Credentials belong on that server and must never be placed in a `VITE_` variable.

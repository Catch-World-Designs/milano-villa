# Contact endpoint contract

The website works without an external service by opening a pre-addressed email.
For direct delivery, set `VITE_CONTACT_ENDPOINT` to an HTTPS endpoint that accepts
the JSON request below. This URL is public configuration; API keys and mail
provider credentials must remain on the server.

```json
{
  "name": "Required string",
  "email": "Required valid email",
  "telephone": "Optional string",
  "location": "Optional string",
  "discipline": "Optional string",
  "message": "Required string",
  "appointment": true,
  "website": "",
  "source": "milano-villa-website"
}
```

The handler must:

- accept `POST` with `Content-Type: application/json`;
- return any `2xx` response only after the message has been accepted for delivery;
- validate all fields server-side and reject a non-empty `website` honeypot;
- rate-limit by IP and cap request/body lengths;
- allow the production website origin through CORS when hosted on another domain;
- keep mail-service credentials exclusively in server-side environment variables;
- avoid retaining enquiry data longer than the business requires;
- return a generic error response without exposing provider details.

No endpoint or credentials are committed to this repository.


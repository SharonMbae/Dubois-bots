# dubois-bots

Multi-tenant WhatsApp bot platform for businesses. Each business gets its own
branding (name, greeting, catalog) while sharing one codebase and webhook.

Internal/dev name only — end customers only ever see their own business's name
in WhatsApp, never "dubois-bots".

## Current features

- Order-taking: catalog browsing, item selection (payment integration pending)
- Support: message intake and acknowledgement (human follow-up pending)

## Adding a new business (tenant)

1. Create a WhatsApp Business phone number for them in the Meta App Dashboard
   and note its `phone_number_id`.
2. Add a new JSON file under `tenants/`, e.g. `tenants/jaza-hardware.json`,
   copying the shape of `tenants/sample-business.json`.
3. Add their access token to `.env` under the env var name referenced in
   `accessTokenEnv`.
4. Restart the server — tenants are loaded from the `tenants/` folder at startup.

## Setup

```bash
npm install
cp .env.example .env
# fill in .env: WEBHOOK_VERIFY_TOKEN and each tenant's WA access token
npm run dev
```

Point your Meta App's webhook at `https://<your-host>/webhook` and use the
same `WEBHOOK_VERIFY_TOKEN` value during verification.

## Requirements

- A Meta developer app with WhatsApp Business Cloud API access
- A phone number connected per business (tenant)

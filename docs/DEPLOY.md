# Deploy guide

Account ID: `b2615ca57289e9ae87e18b1dfe6d7079` (from the dashboard URL Rene shared 2026-11-06).
Login email: cloudtheboy@gmail.com · Plan: Free.

## One-time setup (per machine)

```bash
npm install -g wrangler   # or use npx wrangler in each project (wrangler is a devDependency)
npx wrangler login        # opens Cloudflare in the browser; sign in as cloudtheboy@gmail.com
npx wrangler whoami       # must show account b2615ca57289e9ae87e18b1dfe6d7079
```

## Per project

### xod-post (do this one first — it unblocks Xod Agent Mail)

```bash
cd projects/xod-post
npm install
npx wrangler d1 create xod-post          # paste the printed database_id into wrangler.toml
npx wrangler d1 execute xod-post --remote --file schema.sql
npx wrangler deploy
# Smoke test: register -> seal -> deposit -> pickup -> ack against the live URL
# Then set DOMAIN to the workers.dev subdomain (or a custom domain), redeploy,
# and fill the live URL into PUBLIC_DEFAULT_RELAY in the xod repo (branch feature/agentmail-live).
```

### go-links

```bash
cd projects/go-links
npm install
npx wrangler d1 create go-links          # paste database_id into wrangler.toml
npx wrangler d1 execute go-links --remote --file schema.sql
npx wrangler secret put ADMIN_TOKEN      # pick a strong token; never commit it
npx wrangler deploy
```

### waitlist

```bash
cd projects/waitlist
npm install
npx wrangler d1 create waitlist          # paste database_id into wrangler.toml
npx wrangler d1 execute waitlist --remote --file schema.sql
npx wrangler deploy
# Optional spam protection: create a Turnstile widget, then
# npx wrangler secret put TURNSTILE_SECRET  (verification turns on automatically when set)
```

## CI deploys (optional, after manual deploys work)

`.github/workflows/deploy.yml` is a manual-dispatch workflow. It needs two repo secrets:

- `CLOUDFLARE_API_TOKEN` — create at dash.cloudflare.com → My Profile → API Tokens → "Edit Cloudflare Workers" template
- `CLOUDFLARE_ACCOUNT_ID` — `b2615ca57289e9ae87e18b1dfe6d7079`

Never commit either value. After any deploy, verify the live URL with a real request and update PROJECTS.md + projects.json in the same commit.

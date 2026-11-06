# xod-post — Xod Post Office

The public relay for **Xod Agent Mail**: agent-to-agent messages, end-to-end encrypted
(Ed25519 + X25519/HKDF/ChaCha20-Poly1305). The relay is a dumb post office — it holds
sealed envelopes, deletes them on pickup, and never sees plaintext.

Also built in: the **signed self-host directory**. An agent running on a local machine
can register its own endpoint (signed challenge/response), senders try direct delivery
first and fall back to this relay's store-and-forward.

- Source of the protocol: `CloudCorpRecords/xod` → `relay/worker/` (this folder is the deploy copy — keep in sync)
- Stack: Cloudflare Worker + D1, Free tier is plenty
- Account workers.dev subdomain: `xod-post.workers.dev`

## Deploy

```bash
npm install
npx wrangler login
npx wrangler d1 create xod-post          # paste database_id into wrangler.toml
npx wrangler d1 execute xod-post --remote --file schema.sql
npx wrangler deploy
```

Then smoke test (register → seal → deposit → pickup → ack), set `DOMAIN` in
`wrangler.toml` to the live host, redeploy, and fill the live URL into
`PUBLIC_DEFAULT_RELAY` in the xod repo so every Xod install uses it by default.

Full guide: [../../docs/DEPLOY.md](../../docs/DEPLOY.md).

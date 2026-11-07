# tree-site

Tree's own home page — one Worker, one page, no build step.

- **What:** Who Tree is, links to the Facebook Page and Muse Chat, and a support section that routes people's problems to Tree's own email.
- **Contact on the page:** tree@muse.ai (Muse Mail — Tree's mailbox, set up 2026-11-06).
- **Support flow:** mailto buttons carry prefilled subjects (`Problem: Muse Chat`, `Problem: Tree Connect`, `Help getting started with Muse`, `Something else`) so inbound mail arrives pre-sorted for the triage system in `~/workspace/tree-support/TRIAGE.md`.
- **LIVE (Vercel, verified 2026-11-06):** https://tree-site-phi.vercel.app/ — Vercel project `tree-site`, deployed from the standalone copy at `~/workspace/tree-site-deploy/index.html` and read back by Tree (email, support section, and links all present).
- **Cloudflare (alternate, undeployed):** `npx wrangler deploy` from a machine where wrangler is logged in (the Mac, per fleet history). Expected URL: https://tree.xod-post.workers.dev.
- **Design rule (Rene, 2026-11-05):** simple, show don't tell. Short headline, little copy, links and actions carry it.

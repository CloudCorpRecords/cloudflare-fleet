# Project registry

The single tracking table for all Cloudflare work. Update this file in the same commit as any status change.

| # | Project | Type | Bindings | Live URL | Status | Next step |
|---|---|---|---|---|---|---|
| 1 | xod-post | Worker | D1 `xod-post` (`75517640-d526-4377-a06f-74680890e1eb`) | https://xod-post.xod-post.workers.dev | **live** (deployed + smoke-tested 2026-11-06) | Set as Xod's `PUBLIC_DEFAULT_RELAY` in the xod repo (branch `feature/agentmail-live`) |
| 2 | go-links | Worker | D1 `go-links` (`0ad67cc8-913a-4228-8de7-9900be1dadd2`) + secret `ADMIN_TOKEN` | https://go-links.xod-post.workers.dev | **live** (deployed + smoke-tested 2026-11-06; `/xod` seeded) | Seed `/gh`, `/resume`, `/book` links |
| 3 | waitlist | Worker | D1 `waitlist` (`232dce11-b975-4797-b892-f22ea1cceddd`) + secret `ADMIN_TOKEN` | https://waitlist.xod-post.workers.dev | **live** (deployed + smoke-tested 2026-11-06) | Point Xod + Clipwise landing forms at it; add Turnstile when a form goes public |

Scope note (Rene, 2026-11-06): fleet-status was cut before launch — just these three projects.

## Existing Cloudflare touchpoints (not in this repo)

| Item | Where | Note |
|---|---|---|
| Xod relay source (original) | `CloudCorpRecords/xod` → `relay/worker/` | `projects/xod-post/` here is the deploy copy; keep them in sync, xod repo stays canonical for the protocol |
| Cloudflare FDE applications (3) | Job tracker | Senior FDE (2026-10-03), Senior FDE Infrastructure (2026-10-13), FDE (2026-10-21) — all Submitted, no decision logged |

## Roadmap projects (not built yet)

See [docs/ROADMAP.md](docs/ROADMAP.md): R2 sticker/GIF CDN, meme image pipeline, Razer homebase Tunnel, pkgverdict edge API, Greenlight webhook receiver, AI Gateway for the fleet.

# Project registry

The single tracking table for all Cloudflare work. Update this file in the same commit as any status change.

| # | Project | Type | Bindings | Live URL | Status | Next step |
|---|---|---|---|---|---|---|
| 1 | xod-post | Worker | D1 `xod-post` | — | code-ready | `wrangler login` → create D1 → deploy → smoke test → set as Xod's `PUBLIC_DEFAULT_RELAY` |
| 2 | go-links | Worker | D1 `go-links` | — | code-ready | Deploy → seed `/gh`, `/xod`, `/resume`, `/book` links |
| 3 | waitlist | Worker | D1 `waitlist` | — | code-ready | Deploy → point Xod + Clipwise landing forms at it |

Scope note (Rene, 2026-11-06): fleet-status was cut before launch — just these three projects.

## Existing Cloudflare touchpoints (not in this repo)

| Item | Where | Note |
|---|---|---|
| Xod relay source (original) | `CloudCorpRecords/xod` → `relay/worker/` | `projects/xod-post/` here is the deploy copy; keep them in sync, xod repo stays canonical for the protocol |
| Cloudflare FDE applications (3) | Job tracker | Senior FDE (2026-10-03), Senior FDE Infrastructure (2026-10-13), FDE (2026-10-21) — all Submitted, no decision logged |

## Roadmap projects (not built yet)

See [docs/ROADMAP.md](docs/ROADMAP.md): R2 sticker/GIF CDN, meme image pipeline, Razer homebase Tunnel, pkgverdict edge API, Greenlight webhook receiver, AI Gateway for the fleet.

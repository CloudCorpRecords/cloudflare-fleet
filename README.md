# cloudflare-fleet

**Everything Rene runs on Cloudflare. One repo, one source of truth.**

Account: `b2615ca57289e9ae87e18b1dfe6d7079` · Workers Free (100k requests/day) · Owner: Rene Turcios (CloudCorpRecords)
Account verified live 2026-11-06: member since Aug 16, 2024, email verified, workers.dev subdomain `xod-post.workers.dev`, zero projects deployed yet — this repo is the start.

| Project | What it does | Stack | Status |
|---|---|---|---|
| [xod-post](projects/xod-post/) | Xod Post Office — the encrypted Agent Mail relay for Xod | Worker + D1 | Code ready, deploy next |
| [go-links](projects/go-links/) | Personal short links with click counts (`/gh`, `/xod`, `/book`) | Worker + D1 | Ready to deploy |
| [waitlist](projects/waitlist/) | One form backend for every landing page (Xod, Clipwise, Founders Bay) | Worker + D1 | Ready to deploy |

Full registry: [PROJECTS.md](PROJECTS.md) · Machine-readable: [projects.json](projects.json)
Deploy guide: [docs/DEPLOY.md](docs/DEPLOY.md) · What's next: [docs/ROADMAP.md](docs/ROADMAP.md)

## Why Cloudflare here

- **Xod needs a relay that is always on.** A sleeping laptop can't answer mail. A Worker can.
- **Every landing page needs the same form backend.** Build it once, on the edge, for free.
- **Links are everywhere** — posts, talks, the resume. Owning the shortener means owning the counts.

## Rules

- Free tier only. No paid plan, no card.
- No secrets in this repo. Tokens live in GitHub Actions secrets / Wrangler secrets.
- A project is only "live" in PROJECTS.md after a read-back check of its real URL.

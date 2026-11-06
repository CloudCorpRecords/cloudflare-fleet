# Roadmap — Cloudflare across everything else we run

Ordered by usefulness, not novelty. Each one ships only when a real user/need exists.

## 1. Xod Cloud on Workers (extends xod-post)
Xod Cloud was decided as "the sandbox family" (2026-11-05): signed family registry + pairing gate.
The relay is step one. Next: the family registry and approval-lane state as a Worker + D1 service,
so phones, the Razer, the Mac and the Deck share one always-on source of truth instead of
whichever laptop is awake.

## 2. Sticker / GIF CDN (R2 + Worker)
Rene's sticker packs and reaction GIFs are meant for global distribution (Discord, Facebook, Giphy routes).
R2 (zero egress fees) + a tiny Worker gallery page = a permanent public home with stable URLs,
instead of files scattered across Drive and chat uploads.

## 3. Meme / reaction image pipeline (R2 + Workers)
The 48 AI reaction scenes live as loose files. A Worker upload + transform endpoint
(resize/WebP via Image Transformations) makes them usable inline anywhere, at the right size, fast.

## 4. Razer homebase Tunnel
Cloudflare Tunnel (outbound-only, no open ports) to expose the Razer's Xod backend / status page
to the family devices safely. Replaces tailnet-only workarounds for the pieces that should be public-with-auth.

## 5. pkgverdict edge API
pkgverdict as a Worker: `GET /api/verdict/<npm-package>` with edge caching.
Turns a CLI in the fleet into a link anyone can try in a browser — the best demo format for the fleet.

## 6. Greenlight webhook receiver (Worker + Queue)
Receive GitHub webhooks at the edge, queue them, and run contribution-opportunity scans async.
Pairs with the Security Wave idea: same pattern for repo-at-rest scanning that Cloudflare's
runtime-only tooling doesn't do (per the 2026-10-22 proof track).

## 7. AI Gateway for the fleet
One gateway in front of every LLM call the fleet makes: caching, rate limits, fallbacks, and
per-tool spend visibility. Only worth it once call volume is real — measure first.

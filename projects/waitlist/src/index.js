// waitlist — one form backend for every landing page.
//   POST /submit  { list, email, name?, note?, company( honeypot ), cf-turnstile-response? }
//   GET  /api/count?list=xod        -> { list, count }
//   GET  /api/list?list=xod         (Authorization: Bearer <ADMIN_TOKEN>) -> signups
// Turnstile verification activates automatically when TURNSTILE_SECRET is set.

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-allow-headers": "content-type, authorization",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...CORS },
  });
}

async function turnstileOk(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // not configured yet
  if (!token) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  return data.success === true;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    if (url.pathname === "/submit" && request.method === "POST") {
      const body = await request.json().catch(() => null);
      if (!body) return json({ error: "invalid json" }, 400);
      if (body.company) return json({ ok: true }); // honeypot: silently accept bots, store nothing
      const list = String(body.list || "default").toLowerCase().replace(/[^a-z0-9-_]/g, "").slice(0, 64) || "default";
      const email = String(body.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "valid email required" }, 400);

      const ip = request.headers.get("cf-connecting-ip");
      if (!(await turnstileOk(env, body["cf-turnstile-response"], ip))) {
        return json({ error: "turnstile verification failed" }, 403);
      }

      await env.DB.prepare(
        "INSERT INTO signups (list, email, name, note, created_at) VALUES (?1, ?2, ?3, ?4, ?5) ON CONFLICT(list, email) DO NOTHING"
      ).bind(list, email, String(body.name || "").slice(0, 120), String(body.note || "").slice(0, 500), new Date().toISOString()).run();

      return json({ ok: true, list });
    }

    if (url.pathname === "/api/count" && request.method === "GET") {
      const list = (url.searchParams.get("list") || "default").toLowerCase();
      const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM signups WHERE list = ?1").bind(list).first();
      return json({ list, count: row?.n ?? 0 });
    }

    if (url.pathname === "/api/list" && request.method === "GET") {
      if (!env.ADMIN_TOKEN || request.headers.get("authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
        return json({ error: "unauthorized" }, 401);
      }
      const list = (url.searchParams.get("list") || "default").toLowerCase();
      const { results } = await env.DB.prepare(
        "SELECT email, name, note, created_at FROM signups WHERE list = ?1 ORDER BY created_at"
      ).bind(list).all();
      return json({ list, signups: results });
    }

    return json({ error: "not found" }, 404);
  },
};

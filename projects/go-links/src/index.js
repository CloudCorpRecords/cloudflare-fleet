// go-links — personal short links on the edge, with click counts in D1.
//   POST /api/links   { slug, url }   (Authorization: Bearer <ADMIN_TOKEN>) -> create/update
//   GET  /api/links                   (Authorization: Bearer <ADMIN_TOKEN>) -> list + clicks
//   GET  /:slug                       -> 302 to the target, click counted
//   GET  /                            -> small index of public links

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function authed(request, env) {
  return env.ADMIN_TOKEN && request.headers.get("authorization") === `Bearer ${env.ADMIN_TOKEN}`;
}

const SLUG_OK = /^[a-z0-9][a-z0-9-_]{0,63}$/;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, "");

    if (path === "api/links" && request.method === "POST") {
      if (!authed(request, env)) return json({ error: "unauthorized" }, 401);
      const body = await request.json().catch(() => null);
      const slug = String(body?.slug || "").toLowerCase();
      const target = String(body?.url || "");
      if (!SLUG_OK.test(slug)) return json({ error: "slug must be 1-64 chars: a-z 0-9 - _" }, 400);
      try { new URL(target); } catch { return json({ error: "url is not a valid URL" }, 400); }
      await env.DB.prepare(
        "INSERT INTO links (slug, url, created_at) VALUES (?1, ?2, ?3) ON CONFLICT(slug) DO UPDATE SET url = excluded.url"
      ).bind(slug, target, new Date().toISOString()).run();
      return json({ ok: true, slug, url: target });
    }

    if (path === "api/links" && request.method === "GET") {
      if (!authed(request, env)) return json({ error: "unauthorized" }, 401);
      const { results } = await env.DB.prepare("SELECT slug, url, clicks, created_at FROM links ORDER BY slug").all();
      return json({ links: results });
    }

    if (path === "" ) {
      const { results } = await env.DB.prepare("SELECT slug, url FROM links ORDER BY slug LIMIT 100").all();
      const items = results.map((l) => `<li><a href="/${l.slug}">/${l.slug}</a> → ${l.url}</li>`).join("\n");
      return new Response(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Go Links</title></head><body><h1>Go Links</h1><ul>\n${items}\n</ul></body></html>`,
        { headers: { "content-type": "text/html; charset=utf-8" } }
      );
    }

    if (path && !path.includes("/")) {
      const row = await env.DB.prepare("SELECT url FROM links WHERE slug = ?1").bind(path.toLowerCase()).first();
      if (!row) return json({ error: "no such link" }, 404);
      ctx.waitUntil(env.DB.prepare("UPDATE links SET clicks = clicks + 1 WHERE slug = ?1").bind(path.toLowerCase()).run());
      return Response.redirect(row.url, 302);
    }

    return json({ error: "not found" }, 404);
  },
};

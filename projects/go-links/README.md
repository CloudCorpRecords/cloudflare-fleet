# go-links

Your own short links, on your own domain, with the click counts you actually own.

Seed ideas: `/gh` → GitHub, `/xod` → Xod release page, `/resume` → resume, `/book` → book page, `/ship` → Ship Log.

```bash
curl -X POST https://<your-worker>/api/links \
  -H "Authorization: Bearer $ADMIN_TOKEN" -H "content-type: application/json" \
  -d '{"slug":"xod","url":"https://github.com/CloudCorpRecords/xod/releases"}'
```

Deploy: see [../../docs/DEPLOY.md](../../docs/DEPLOY.md).

# waitlist

One backend for every form: Xod waitlist, Clipwise interest, Founders Bay sponsor interest, book readers.
Point any static page's form at it — no server to run.

```html
<form onsubmit="event.preventDefault(); fetch('https://<your-worker>/submit', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({list:'xod', email: this.email.value, name: this.name.value})}).then(()=> alert('You are on the list'))">
  <input name="email" type="email" required>
  <input name="name" placeholder="Name">
  <input name="company" style="display:none" tabindex="-1" autocomplete="off"> <!-- honeypot -->
  <button>Join</button>
</form>
```

Lists are separate namespaces (`list: "xod"`, `"clipwise"`, `"founders-bay"`…). Duplicate emails are ignored, not errors.

Deploy: see [../../docs/DEPLOY.md](../../docs/DEPLOY.md).

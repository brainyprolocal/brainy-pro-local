# GHL White-Label Customization

Served from Vercel at `https://brainyprolocal.com/ghl/...` (auto-deploys on push to `main`).

## Install in GHL
Agency Settings → Company → **Custom CSS** (paste):

```html
<link rel="stylesheet" href="https://brainyprolocal.com/ghl/brainypro-ghl.css">
```

Agency Settings → Company → **Custom JS** (paste):

```html
<script src="https://brainyprolocal.com/ghl/brainypro-ghl.js" defer></script>
```

(If the CSS field only accepts raw CSS, use: `@import url("https://brainyprolocal.com/ghl/brainypro-ghl.css");`)

## Editing
- Colors/fonts: variables at the top of `brainypro-ghl.css`.
- Behavior (tab title, favicon, hidden elements, support link): `CONFIG` in `brainypro-ghl.js`.
- Files are cached ~5 minutes; hard-refresh GHL after a deploy.
- GHL's DOM changes occasionally; selectors may need tweaks.

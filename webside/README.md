# ChaiTailwind Website

This folder contains a static website for showcasing the `@debeshghorui/chaitailwind` npm package.

## Run Locally

From repository root:

```bash
npx serve webside
```

Or open `webside/index.html` directly in your browser.

## Deploy

Use any static host and set publish directory to `webside`.

- Netlify: drag-and-drop `webside` or set `Publish directory = webside`
- Vercel: framework preset `Other`, output directory `webside`
- GitHub Pages: deploy folder contents from `webside`
- Cloudflare Pages: project root + output directory `webside`

No build command is required.

## CDN Script (Copy-Paste)

Use this in any HTML page:

```html
<script type="module">
  import { initChai } from "https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.0/dist/index.js/+esm";
  initChai();
</script>
```

Then add utility classes like `chai-p-20`, `chai-bg-blue`, `chai-text-white` to your elements.

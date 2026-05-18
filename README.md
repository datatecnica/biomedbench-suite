# biomedbench-suite

GitHub Pages website scaffold for a benchmark suite consisting of
CARDBiomedBench and BiomedSQL.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Site structure

- `src/pages/BenchmarkPage.tsx`: shared benchmark page template
- `src/pages/InfoPage.tsx`: related projects and product links
- `public/data/*.json`: manually editable benchmark data

## GitHub Pages

This scaffold assumes the site will be published at:

`https://<username>.github.io/biomedbench-suite/`

It uses `BrowserRouter` with a `404.html` redirect trick for GitHub Pages compatibility — direct links and page refreshes work without a custom server. Visiting the root redirects automatically to `/cardbiomedbench`.

Deployment is handled by GitHub Actions on every push to `main`. In the repo settings, set Pages source to **GitHub Actions**.

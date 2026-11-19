# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Portfolio content

Use the Notion portfolio and employment history databases to update case studies
and roles. Run `pnpm cache` with the site's Notion configuration to refresh the
local content. Keep published slugs stable so existing portfolio links still work.
The homepage and portfolio pick their selected case studies by slug in
`app/content/portfolio.ts`.

The Waystone transaction import demo at `/demos/waystone` uses fictional records
and runs in the browser. The homepage résumé links to
`public/docs/brian-morrison-ii-resume.pdf`. Run `pnpm test` to check case-study
links and the demo's retry behavior.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

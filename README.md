# Trishank18 — developer portfolio

A responsive, data driven developer portfolio built with React, Vite, Framer Motion, Recharts, and Lucide. The GitHub profile, repositories, and public events come from the GitHub REST API; the site does not fabricate contribution counts or skill ratings.

## Run locally

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` only if you need to point at a GitHub API compatible proxy. The public REST API works without credentials. Never put a GitHub token in a `VITE_*` variable; browser environment variables are public.

## Production build

```bash
npm run build
npm run preview
```

## Customize

- `src/data/profile.js` — introduction, education, resume, and contact links.
- `src/data/featuredProjects.js` — manually curated project cards. Known repository matches are linked; an unresolved URL stays blank.
- `src/data/skills.js` — skill categories without unverified proficiency scores.
- `src/services/githubApi.js` — centralized GitHub REST requests, retry, caching, and repository pagination.

GitHub responses are cached in local storage for five minutes. Public repository languages are aggregated by the repository's primary language (repository count, not code bytes). Stars and forks are sums across the fetched public repositories. The contribution calendar requires authenticated GraphQL access, so the app clearly reports it unavailable without a secure server side integration. Public events are limited by GitHub and do not show private activity. The contact form validates input then opens a prefilled email; it does not claim to send or store messages.

## Deployment

Deploy the static `dist/` output to any Vite compatible static host. Configure SPA fallback to `index.html` if adding client side routes. No API key is required for public profile data.

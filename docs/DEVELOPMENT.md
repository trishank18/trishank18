# Portfolio development

## Run locally

```bash
npm install
npm run dev
```

Public GitHub data works without credentials. `.env.example` only configures an optional API-compatible proxy. Never place a GitHub token in a `VITE_*` variable; browser environment variables are public.

## Production build

```bash
npm run build
npm run preview
```

## Customize

- `src/data/profile.js` — introduction, education, resume, and contact links.
- `src/data/featuredProjects.js` — manually curated project cards. Confirmed repository matches are linked; unresolved URLs stay blank.
- `src/data/skills.js` — skill categories without unverified proficiency scores.
- `src/services/githubApi.js` — GitHub REST requests, retries, caching, and repository pagination.

GitHub responses are cached in local storage for five minutes. Language charts count repositories by primary language, not code bytes. Stars and forks are sums across fetched public repositories. Contribution history requires authenticated GraphQL access through a secure server-side integration; it is marked unavailable otherwise. Public events omit private activity. The contact form validates input and opens a prefilled email; it does not send or store messages.

Deploy the static `dist/` output to a Vite-compatible static host.

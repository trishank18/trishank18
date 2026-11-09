import { readCache, writeCache } from '../utils/cache.js';
const configuredBase = import.meta.env.VITE_GITHUB_API_BASE?.trim() || 'https://api.github.com';
const base = configuredBase.replace(/\/users\/[^/]+\/?$/i, '').replace(/\/+$/, '');
const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
const inFlight = new Map();
async function request(url, key, { retries = 2 } = {}) {
  let last;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers });
      if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') throw new Error(`GitHub API rate limit reached. Resets at ${new Date(Number(res.headers.get('x-ratelimit-reset'))*1000).toLocaleTimeString()}.`);
      if (!res.ok) throw new Error(`GitHub returned ${res.status} ${res.statusText}`);
      const data = await res.json(); writeCache(key, data); return data;
    } catch (e) { last = e; if (attempt < retries) await new Promise(r => setTimeout(r, 500 * (attempt + 1))); }
  }
  throw last;
}
async function get(url, options = {}) {
  const key = url.replace(base, ''); const cached = readCache(key);
  if (cached) return cached;
  if (!inFlight.has(key)) inFlight.set(key, request(url, key, options));
  try { return await inFlight.get(key); } finally { inFlight.delete(key); }
}
export async function getProfile(user) { return get(`${base}/users/${encodeURIComponent(user)}`); }
export async function getAllRepositories(user) {
  let page = 1, all = [];
  while (true) {
    const rows = await get(`${base}/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated&page=${page}`);
    all = all.concat(rows); if (rows.length < 100) return all; page++;
  }
}
export async function getEvents(user) { return get(`${base}/users/${encodeURIComponent(user)}/events/public?per_page=100`); }
export async function getFollowers(user) { return get(`${base}/users/${encodeURIComponent(user)}/followers?per_page=100`); }
export async function getFollowing(user) { return get(`${base}/users/${encodeURIComponent(user)}/following?per_page=100`); }
export async function getOrganizations(user) { return get(`${base}/users/${encodeURIComponent(user)}/orgs?per_page=100`); }

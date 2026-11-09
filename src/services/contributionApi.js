import { readCache, writeCache } from '../utils/cache.js';

const CACHE_KEY = 'contributions/';
const CACHE_AGE = 60 * 60 * 1000;

export async function getContributionCalendar(username) {
  const key = `${CACHE_KEY}${encodeURIComponent(username)}`;
  const cached = readCache(key, CACHE_AGE);
  if (cached) return cached;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Contribution service returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.contributions) || !data.total) throw new Error('Contribution service returned an invalid calendar');
    writeCache(key, data);
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

const PREFIX = 'trishank-gh-v1:';
export function readCache(key, maxAge = 300000) {
  try { const value = JSON.parse(localStorage.getItem(PREFIX + key)); return value && Date.now() - value.at < maxAge ? value.data : null; } catch { return null; }
}
export function writeCache(key, data) { try { localStorage.setItem(PREFIX + key, JSON.stringify({ at: Date.now(), data })); } catch { /* storage may be disabled */ } }

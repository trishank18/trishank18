export function calculateStats(repos = []) {
  const languages = repos.reduce((a, r) => { if (r.language) a[r.language] = (a[r.language] || 0) + 1; return a; }, {});
  const topLanguage = Object.entries(languages).sort((a,b) => b[1] - a[1])[0]?.[0] || '—';
  return { stars: repos.reduce((n,r) => n + (r.stargazers_count || 0),0), forks: repos.reduce((n,r) => n + (r.forks_count || 0),0), topLanguage, languages };
}

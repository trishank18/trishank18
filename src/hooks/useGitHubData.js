import { useEffect, useState } from 'react';
import { getProfile, getAllRepositories, getEvents } from '../services/githubApi.js';
export function useGitHubData(username) {
  const [state, setState] = useState({ profile: null, repos: [], events: [], loading: true, errors: {} });
  useEffect(() => {
    let live = true;
    Promise.allSettled([getProfile(username), getAllRepositories(username), getEvents(username)]).then(results => {
      if (!live) return;
      const [p, r, e] = results; const errors = {};
      if (p.status === 'rejected') errors.profile = p.reason.message;
      if (r.status === 'rejected') errors.repos = r.reason.message;
      if (e.status === 'rejected') errors.events = e.reason.message;
      setState({ profile: p.status === 'fulfilled' ? p.value : null, repos: r.status === 'fulfilled' ? r.value : [], events: e.status === 'fulfilled' ? e.value : [], loading: false, errors });
    });
    return () => { live = false; };
  }, [username]);
  return state;
}

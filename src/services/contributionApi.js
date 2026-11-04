// Contribution calendars require authenticated GitHub GraphQL access. This browser client
// never receives a GitHub token; configure a same-origin server-side proxy if one is available.
export async function getContributionCalendar() {
  return {
    available: false,
    reason: 'GitHub REST does not expose contribution calendars. Configure a secure server-side GraphQL proxy to load this data.'
  };
}

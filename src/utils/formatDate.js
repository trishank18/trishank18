export const formatDate = value => value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value)) : '—';
export const relativeDate = value => value ? new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(-Math.floor((Date.now() - new Date(value)) / 86400000), 'day') : '—';

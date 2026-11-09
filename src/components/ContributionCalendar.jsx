import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { getContributionCalendar } from '../services/contributionApi.js';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthName = date => new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(date);
const dateLabel = date => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);

export default function ContributionCalendar({ username }) {
  const [calendar, setCalendar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    getContributionCalendar(username)
      .then(data => { if (live) setCalendar(data); })
      .catch(() => { if (live) setError('Contribution history could not be loaded right now. View it on GitHub.'); });
    return () => { live = false; };
  }, [username]);

  const days = calendar?.contributions || [];
  const padStart = days.length ? new Date(`${days[0].date}T12:00:00Z`).getUTCDay() : 0;
  const padded = [...Array(padStart).fill(null), ...days];
  while (padded.length % 7) padded.push(null);
  const weeks = Array.from({ length: padded.length / 7 }, (_, i) => padded.slice(i * 7, i * 7 + 7));
  let previousMonth = '';
  const months = weeks.map(week => {
    const day = week.find(Boolean);
    if (!day) return '';
    const date = new Date(`${day.date}T12:00:00Z`);
    const currentMonth = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    if (currentMonth === previousMonth) return '';
    previousMonth = currentMonth;
    return monthName(date);
  });
  const total = calendar?.total?.lastYear ?? Object.values(calendar?.total || {}).reduce((sum, n) => sum + n, 0);

  return <div className="contrib-panel panel glass">
    <div className="panel-heading">
      <div><h3>Contribution activity</h3><p>Contribution graph · last 12 months</p></div>
      <span className="dim-icon"><Activity size={16}/></span>
    </div>
    {calendar ? <>
      <div className="contrib-summary"><strong>{Number(total).toLocaleString()}</strong> contributions in the last year</div>
      <div className="contrib-calendar-scroll">
        <div className="contrib-calendar" role="img" aria-label={`${Number(total).toLocaleString()} GitHub contributions in the last year`}>
          <div className="contrib-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}>
            {months.map((month, index) => <span key={index}>{month}</span>)}
          </div>
          <div className="contrib-chart-row">
            <div className="contrib-weekdays">{weekdays.map((day, index) => <span key={day}>{index % 2 === 1 ? day : ''}</span>)}</div>
            <div className="contrib-weeks">
              {weeks.map((week, weekIndex) => <div className="contrib-week" key={weekIndex}>
                {week.map((day, dayIndex) => day ? <span
                  key={day.date}
                  className={`contrib-day level-${Math.max(0, Math.min(4, Number(day.level) || 0))}`}
                  title={`${dateLabel(new Date(`${day.date}T12:00:00Z`))}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  aria-label={`${dateLabel(new Date(`${day.date}T12:00:00Z`))}: ${day.count} contributions`}
                /> : <span className="contrib-day contrib-day-empty" key={`empty-${weekIndex}-${dayIndex}`} aria-hidden="true"/>)}
              </div>)}
            </div>
          </div>
          <div className="contrib-legend"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} className={`contrib-day level-${level}`}/>)}<span>More</span></div>
        </div>
      </div>
      <p className="contrib-source">Public contribution data from GitHub. <a href={`https://github.com/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer">View profile ↗</a></p>
    </> : error ? <div className="contrib-unavailable"><div className="contrib-symbol">▦</div><div><b>Contribution history unavailable</b><p>{error} <a href={`https://github.com/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer">Open GitHub profile ↗</a></p></div></div> : <div className="contrib-loading">Loading contribution history…</div>}
  </div>;
}

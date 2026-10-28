import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

export default function MetricsSummary({ total, active, completed }) {
  const progress = total ? Math.round(completed / total * 100) : 0;
  return <section className="metrics" aria-label="Task summary">
    <article className="metric-card"><span className="metric-icon metric-total"><ListTodo size={18} /></span><div><span className="metric-label">Total tasks</span><strong>{total}</strong></div></article>
    <article className="metric-card"><span className="metric-icon metric-active"><Circle size={17} /></span><div><span className="metric-label">In progress</span><strong>{active}</strong></div></article>
    <article className="metric-card"><span className="metric-icon metric-done"><CheckCircle2 size={18} /></span><div><span className="metric-label">Completed</span><strong>{completed}</strong></div></article>
    <article className="progress-card"><div className="progress-top"><span>Daily progress</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{completed ? `${completed} small ${completed === 1 ? 'win' : 'wins'} today` : 'Every task is a fresh start'}</small></article>
  </section>;
}

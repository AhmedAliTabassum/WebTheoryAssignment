import { Component } from 'react';
import { Activity, Check, Plus, Trash2, SlidersHorizontal } from 'lucide-react';

const icons = { add: Plus, complete: Check, delete: Trash2, filter: SlidersHorizontal };
export default class ActivityLogger extends Component {
  state = { logs: [], notice: '' };
  noticeTimer = null;
  componentDidMount() {
    try { const stored = JSON.parse(localStorage.getItem('taskflow-activity') || '[]'); if (Array.isArray(stored)) this.setState({ logs: stored }); } catch { this.setState({ logs: [] }); }
  }
  componentDidUpdate(previousProps, previousState) {
    if (previousState.logs !== this.state.logs) {
      localStorage.setItem('taskflow-activity', JSON.stringify(this.state.logs));
      const latest = this.state.logs[0];
      if (latest) {
        this.setState({ notice: latest.message });
        clearTimeout(this.noticeTimer);
        this.noticeTimer = setTimeout(() => this.setState({ notice: '' }), 2400);
      }
    }
  }
  componentWillUnmount() { clearTimeout(this.noticeTimer); }
  record = (type, message) => this.setState((state) => ({ logs: [{ id: `${Date.now()}-${Math.random()}`, type, message, time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }, ...state.logs].slice(0, 8) }));
  render() {
    const { logs, notice } = this.state;
    return <aside className="activity-panel">
      <div className="section-heading"><div><span className="eyebrow">YOUR DAY</span><h2>Recent activity</h2></div><Activity size={18} className="muted-icon" /></div>
      {notice && <div className="toast" role="status">{notice}</div>}
      {logs.length ? <ul className="activity-list">{logs.slice(0, 5).map((log) => { const Icon = icons[log.type] || Activity; return <li key={log.id}><span className={`activity-icon activity-${log.type}`}><Icon size={14} /></span><div className="activity-copy"><span>{log.message}</span><time>{log.time}</time></div></li>; })}</ul> : <p className="activity-empty">Your activity will appear here as you work through your tasks.</p>}
    </aside>;
  }
}

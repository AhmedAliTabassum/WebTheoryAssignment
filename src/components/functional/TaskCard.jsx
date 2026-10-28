import { Check, Trash2 } from 'lucide-react';
import CardWrapper from './CardWrapper.jsx';

export default function TaskCard({ task, onToggle, onDelete }) {
  return <CardWrapper className={`task-card ${task.completed ? 'is-complete' : ''}`}>
    <button className={`check-button ${task.completed ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label={task.completed ? 'Mark task active' : 'Complete task'}>
      {task.completed && <Check size={15} strokeWidth={3} />}
    </button>
    <div className="task-copy"><p className="task-title">{task.title}</p><span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority === 'High' && <span aria-hidden="true">↑ </span>}{task.priority} priority</span></div>
    <span className="task-date">{task.date}</span>
    <button className="icon-button delete-button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={17} /></button>
  </CardWrapper>;
}

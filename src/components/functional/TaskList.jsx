import { ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

export default function TaskList({ tasks, onToggle, onDelete }) {
  return <div className="task-list">
    {tasks.length ? tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />) :
      <div className="empty-state"><span className="empty-icon"><ClipboardList size={22} /></span><strong>Nothing on your list</strong><p>Add a task above or choose another filter.</p></div>}
  </div>;
}

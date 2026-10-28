import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const inputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) { inputRef.current?.focus(); return; }
    onAdd(title.trim(), priority);
    setTitle('');
    setPriority('Medium');
    inputRef.current?.focus();
  }
  return <form className="task-form" onSubmit={handleSubmit}>
    <label className="sr-only" htmlFor="task-title">Task name</label>
    <input id="task-title" ref={inputRef} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs to get done?" maxLength={90} />
    <label className="sr-only" htmlFor="task-priority">Priority</label>
    <select id="task-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
      <option>Low</option><option>Medium</option><option>High</option>
    </select>
    <button className="button button-primary add-button" type="submit"><Plus size={17} /> <span>Add task</span></button>
  </form>;
}

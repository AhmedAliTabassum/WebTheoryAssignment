import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, CheckCircle2 } from 'lucide-react';
import Header from './components/functional/Header.jsx';
import MetricsSummary from './components/functional/MetricsSummary.jsx';
import TaskForm from './components/functional/TaskForm.jsx';
import TaskList from './components/functional/TaskList.jsx';
import ActivityLogger from './components/class/ActivityLogger.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import useLocalStorageState from './hooks/useLocalStorageState.js';

const starterTasks = [
  { id: 'welcome-1', title: 'Plan the week ahead', priority: 'High', completed: false, date: 'Today' },
  { id: 'welcome-2', title: 'Review notes from yesterday', priority: 'Medium', completed: false, date: 'Today' },
  { id: 'welcome-3', title: 'Take a proper lunch break', priority: 'Low', completed: true, date: 'Today' },
];
const filters = ['All', 'Active', 'Completed'];
function Dashboard() {
  const [tasks, setTasks] = useLocalStorageState('taskflow-tasks', starterTasks);
  const [filter, setFilter] = useState('All');
  const loggerRef = useRef(null);
  const pendingCount = tasks.filter((task) => !task.completed).length;
  useEffect(() => { document.title = pendingCount ? `(${pendingCount}) Taskflow - Your workspace` : 'Taskflow - All caught up'; }, [pendingCount]);
  const visibleTasks = useMemo(() => tasks.filter((task) => filter === 'All' || (filter === 'Active' ? !task.completed : task.completed)), [tasks, filter]);
  const completedCount = tasks.length - pendingCount;
  const addTask = useCallback((title, priority) => {
    const task = { id: `${Date.now()}-${Math.random()}`, title, priority, completed: false, date: 'Today' };
    setTasks((current) => [task, ...current]); loggerRef.current?.record('add', `Added "${title}"`);
  }, []);
  const toggleTask = useCallback((id) => {
    const target = tasks.find((task) => task.id === id);
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    loggerRef.current?.record('complete', target?.completed ? `Reopened "${target.title}"` : `Completed "${target?.title}"`);
  }, [tasks]);
  const deleteTask = useCallback((id) => {
    const target = tasks.find((task) => task.id === id);
    setTasks((current) => current.filter((task) => task.id !== id));
    loggerRef.current?.record('delete', `Deleted "${target?.title}"`);
  }, [tasks]);
  const changeFilter = (nextFilter) => { setFilter(nextFilter); loggerRef.current?.record('filter', `Switched to ${nextFilter.toLowerCase()} tasks`); };
  const today = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  return <div id="top" className="app-shell"><Header /><main className="page-content">
    <section className="welcome"><div><p className="eyebrow"><CalendarDays size={13} /> {today}</p><h1>Make room for <span>what matters.</span></h1><p className="welcome-copy">A clear list makes a clearer day. Start wherever you are.</p></div><div className="welcome-art" aria-hidden="true"><span className="art-circle art-one"></span><span className="art-circle art-two"></span><span className="art-check"><CheckCircle2 size={32} /></span></div></section>
    <MetricsSummary total={tasks.length} active={pendingCount} completed={completedCount} />
    <div className="main-grid"><section className="tasks-section"><div className="section-heading task-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h2>My tasks <span className="count-pill">{pendingCount}</span></h2></div></div>
      <TaskForm onAdd={addTask} />
      <div className="filter-row" role="tablist" aria-label="Filter tasks">{filters.map((option) => <button key={option} role="tab" aria-selected={filter === option} className={`filter-button ${filter === option ? 'selected' : ''}`} onClick={() => changeFilter(option)}>{option}{option === 'All' && <span>{tasks.length}</span>}</button>)}</div>
      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </section><ActivityLogger ref={loggerRef} /></div>
    <footer className="footer"><span><span className="footer-dot"></span> Your progress is saved automatically</span><span>One thing at a time.</span></footer>
  </main></div>;
}
export default function App() { return <ThemeProvider><Dashboard /></ThemeProvider>; }

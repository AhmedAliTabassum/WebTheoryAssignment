import { CheckCheck, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return <header className="topbar"><a className="brand" href="#top" aria-label="Taskflow home"><span className="brand-mark"><CheckCheck size={19} /></span><span>taskflow<span className="brand-period">.</span></span></a>
    <div className="topbar-right"><span className="today-label">A little progress, every day.</span><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}<span>{theme === 'light' ? 'Dark' : 'Light'} mode</span></button></div>
  </header>;
}

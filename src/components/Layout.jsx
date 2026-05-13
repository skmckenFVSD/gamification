import { NavLink, Link } from 'react-router-dom'
import { Home, FileText, User, Gamepad2, Trophy } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Avatar from './Avatar.jsx'

export default function Layout({ children }) {
  const { currentPlayer } = useApp()
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="puck">🏒</span>
          <span className="wordmark">CopilotRink</span>
          <span className="sparkle">🤖</span>
        </Link>
        <nav>
          <NavLink to="/" end><Home size={16} /> Rink</NavLink>
          <NavLink to="/submit"><FileText size={16} /> Log a win</NavLink>
          <NavLink to="/arcade"><Gamepad2 size={16} /> Arcade</NavLink>
          <NavLink to="/hall-of-fame"><Trophy size={16} /> Hall of Fame</NavLink>
          <NavLink to="/profile" className="profile-link">
            <Avatar name={currentPlayer.name} size={28} />
            <span>{currentPlayer.name.split(' ')[0]}</span>
          </NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        Fort Vermilion School Division — Microsoft 365 Copilot adoption PoC
      </footer>
    </div>
  )
}

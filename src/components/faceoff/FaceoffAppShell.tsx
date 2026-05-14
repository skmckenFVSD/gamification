import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Award,
  BarChart3,
  CalendarRange,
  ChevronDown,
  CircleGauge,
  FileText,
  Gamepad2,
  Home,
  Menu,
  Star,
  Target,
  UserCircle2,
  X,
} from "lucide-react";
import { useSeason } from "../../context/SeasonContext.jsx";
import SeasonalBackground from "./SeasonalBackground.tsx";
import FaceoffFrame from "./FaceoffFrame.tsx";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home, end: true },
  { to: "/games", label: "Games", icon: CircleGauge },
  { to: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/achievements", label: "Achievements", icon: Award },
  { to: "/arcade", label: "Arcade", icon: Gamepad2 },
  { to: "/hall-of-fame", label: "Hall of Fame", icon: Star },
  { to: "/game-manager", label: "Game Manager", icon: CalendarRange, admin: true },
];

function navClass({ isActive }) {
  return `faceoff-nav-link ${isActive ? "is-active" : ""}`;
}

export default function FaceoffAppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, season, cycleSeason } = useSeason();

  return (
    <div className={`faceoff-app faceoff-shell ${theme.className}`}>
      <SeasonalBackground />
      <a className="faceoff-skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="faceoff-topbar">
        <NavLink to="/" className="faceoff-topbar-brand">
          <img src={`${import.meta.env.BASE_URL}copilot-rink-logo.svg`} alt="" />
          <span>
            <strong>FVSD Faceoff</strong>
            <small>Competing Together for the Future of AI in Education</small>
          </span>
        </NavLink>

        <button
          type="button"
          className="faceoff-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="faceoff-primary-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>Menu</span>
        </button>

        <nav
          id="faceoff-primary-menu"
          className={`faceoff-topbar-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${navClass({ isActive })} ${to === "/game-manager" ? "is-admin" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={15} aria-hidden="true" />
              <span className="label">{label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/post-a-win"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            <FileText size={15} aria-hidden="true" />
            <span className="label">Post a Win</span>
          </NavLink>
          <NavLink to="/profile" className={navClass} aria-label="Profile" onClick={() => setMenuOpen(false)}>
            <UserCircle2 size={17} aria-hidden="true" />
          </NavLink>
          <button
            type="button"
            onClick={cycleSeason}
            className="faceoff-season-pill"
            aria-label={`Switch season, currently ${theme.label}`}
          >
            <span className="faceoff-season-pill__dot" />
            <span>{season}</span>
            <ChevronDown size={13} aria-hidden="true" />
          </button>
        </nav>
      </header>
      <FaceoffFrame>{children}</FaceoffFrame>
      <footer className="faceoff-footer">
        Fort Vermilion School Division. FVSD Faceoff app shell in active development.
      </footer>
    </div>
  );
}

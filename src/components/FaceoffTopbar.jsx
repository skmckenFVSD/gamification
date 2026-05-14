import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart3,
  Target,
  Award,
  FileText,
  Gamepad2,
  CalendarRange,
  UserCircle2,
} from "lucide-react";
import { useSeason } from "../context/SeasonContext.jsx";

const navItems = [
  { to: "/", label: "Rink", icon: Home, end: true },
  { to: "/standings", label: "Standings", icon: BarChart3 },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/achievements", label: "Achievements", icon: Award },
  { to: "/post-a-win", label: "Post a Win", icon: FileText },
  { to: "/arcade", label: "Arcade", icon: Gamepad2 },
  { to: "/game-manager", label: "Game Manager", icon: CalendarRange },
];

export default function FaceoffTopbar() {
  const { theme, season, cycleSeason } = useSeason();

  return (
    <header className="faceoff-topbar">
      <NavLink to="/" className="faceoff-topbar-brand">
        <span className="puck" aria-hidden="true">🏒</span>
        <span className="wordmark">
          FVSD <span className="accent">Faceoff</span>
        </span>
      </NavLink>

      <nav className="faceoff-topbar-nav" aria-label="Primary">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `faceoff-nav-link ${isActive ? "is-active" : ""}`
            }
          >
            <Icon size={14} aria-hidden="true" />
            <span className="label">{label}</span>
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `faceoff-nav-link ${isActive ? "is-active" : ""}`
          }
          aria-label="Profile"
        >
          <UserCircle2 size={16} aria-hidden="true" />
        </NavLink>
        <button
          type="button"
          onClick={cycleSeason}
          className="faceoff-season-pill"
          aria-label={`Switch season, currently ${theme.label}`}
          title={`Switch season, currently ${theme.label}`}
        >
          <span style={{ color: theme.colors.primary }}>●</span>
          <span>{season}</span>
        </button>
      </nav>
    </header>
  );
}

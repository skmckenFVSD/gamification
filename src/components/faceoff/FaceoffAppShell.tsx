import React, { useEffect, useRef, useState } from "react";
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
  X,
} from "lucide-react";
import { useSeason } from "../../context/SeasonContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import SeasonalBackground from "./SeasonalBackground.tsx";
import FaceoffFrame from "./FaceoffFrame.tsx";

const primaryNavItems = [
  { to: "/", label: "Dashboard", icon: Home, end: true },
  { to: "/games", label: "Games", icon: CircleGauge },
  { to: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/arcade", label: "Arcade", icon: Gamepad2 },
  { to: "/hall-of-fame", label: "Hall of Fame", icon: Star },
];

const playerActionItems = [
  { to: "/achievements", label: "Achievements", icon: Award },
  { to: "/post-a-win", label: "Post a Win", icon: FileText },
];

function navClass({ isActive }) {
  return `faceoff-nav-link ${isActive ? "is-active" : ""}`;
}

function actionClass({ isActive }) {
  return `faceoff-action-link ${isActive ? "is-active" : ""}`;
}

export default function FaceoffAppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);
  const { theme, themes, season, seasons, setSeason } = useSeason();
  const { isAuthenticated, currentUser, handleMockSignIn } = useAuth();
  const periodMenuRef = useRef<HTMLDivElement | null>(null);

  const canManageGames = Boolean(isAuthenticated && currentUser?.permissions?.canManageGames);
  const signInPuckSrc = `${import.meta.env.BASE_URL}assets/fvsd-faceoff/traitpills/trait_puck_hover.png`;
  const profileImageSrc = currentUser?.profileImageUrl;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!periodMenuRef.current) {
        return;
      }
      if (!periodMenuRef.current.contains(event.target as Node)) {
        setPeriodOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPeriodOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

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

        <nav
          id="faceoff-primary-menu"
          className={`faceoff-topbar-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {primaryNavItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={15} aria-hidden="true" />
              <span className="label">{label}</span>
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              {playerActionItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={`mobile-${to}`}
                  to={to}
                  className={({ isActive }) => `${navClass({ isActive })} faceoff-nav-link--mobile-only`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span className="label">{label}</span>
                </NavLink>
              ))}
              {canManageGames && (
                <NavLink
                  to="/game-manager"
                  className={({ isActive }) => `${navClass({ isActive })} faceoff-nav-link--mobile-only is-admin`}
                  onClick={() => setMenuOpen(false)}
                >
                  <CalendarRange size={15} aria-hidden="true" />
                  <span className="label">Game Manager</span>
                </NavLink>
              )}
            </>
          )}
        </nav>

        <div className="faceoff-topbar-actions">
          {isAuthenticated ? (
            <>
              {playerActionItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={`desktop-${to}`}
                  to={to}
                  className={({ isActive }) => `${actionClass({ isActive })} faceoff-action-link--desktop`}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span className="label">{label}</span>
                </NavLink>
              ))}

              {canManageGames && (
                <NavLink
                  to="/game-manager"
                  className={({ isActive }) => `${actionClass({ isActive })} faceoff-action-link--desktop is-admin`}
                >
                  <CalendarRange size={15} aria-hidden="true" />
                  <span className="label">Game Manager</span>
                </NavLink>
              )}

              <div className="faceoff-season-select-wrap" aria-label="Period selector" ref={periodMenuRef}>
                <span className="faceoff-season-select-wrap__dot" aria-hidden="true" />
                <button
                  type="button"
                  className="faceoff-season-select-trigger"
                  onClick={() => setPeriodOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={periodOpen}
                  aria-label={`Select period, currently ${theme.label}`}
                >
                  {themes[season]?.name ?? season}
                </button>
                <ChevronDown size={13} aria-hidden="true" className="faceoff-season-select-wrap__chevron" />
                {periodOpen && (
                  <div className="faceoff-season-select-menu" role="listbox" aria-label="Periods">
                    {seasons.map((seasonId) => {
                      const isSelected = seasonId === season;
                      return (
                        <button
                          key={seasonId}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`faceoff-season-option ${isSelected ? "is-selected" : ""}`}
                          onClick={() => {
                            setSeason(seasonId);
                            setPeriodOpen(false);
                          }}
                        >
                          {themes[seasonId]?.name ?? seasonId}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <NavLink to="/profile" className="faceoff-profile-avatar" aria-label="Profile">
                {profileImageSrc ? (
                  <img src={profileImageSrc} alt={`${currentUser.displayName} profile`} loading="lazy" />
                ) : (
                  <span>{currentUser?.displayName?.charAt(0) ?? "P"}</span>
                )}
              </NavLink>
            </>
          ) : (
            <button type="button" className="faceoff-signin-button" onClick={handleMockSignIn}>
              <img src={signInPuckSrc} alt="" aria-hidden="true" className="faceoff-signin-button__puck" />
              <span>Sign In</span>
            </button>
          )}
        </div>

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
      </header>
      <FaceoffFrame>{children}</FaceoffFrame>
      <footer className="faceoff-footer">
        Fort Vermilion School Division. FVSD Faceoff app shell in active development.
      </footer>
    </div>
  );
}

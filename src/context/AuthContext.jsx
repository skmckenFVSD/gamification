import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "faceoff-mock-auth";

function makeInitialAvatar(name) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#00B7FF'/>
        <stop offset='100%' stop-color='#0044C9'/>
      </linearGradient>
    </defs>
    <rect width='220' height='220' rx='44' fill='url(#g)'/>
    <text x='50%' y='56%' text-anchor='middle' fill='white' font-size='84' font-family='Segoe UI, Arial, sans-serif' font-weight='800'>${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const MOCK_SIGNED_IN_USER = {
  isAuthenticated: true,
  displayName: "Scott McKenzie",
  akaName: "Icebreaker",
  roles: ["GameManager"],
  permissions: {
    canManageGames: true,
  },
  profileImageUrl: makeInitialAvatar("Scott McKenzie"),
};

const defaultAuthState = {
  isAuthenticated: false,
  currentUser: null,
};

const AuthContext = createContext(null);

function loadStoredAuth() {
  if (typeof window === "undefined") {
    return defaultAuthState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultAuthState;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.isAuthenticated) {
      return defaultAuthState;
    }

    return {
      isAuthenticated: true,
      currentUser: {
        ...MOCK_SIGNED_IN_USER,
        ...parsed.currentUser,
      },
    };
  } catch {
    return defaultAuthState;
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => loadStoredAuth());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  function handleMockSignIn() {
    setAuthState({
      isAuthenticated: true,
      currentUser: MOCK_SIGNED_IN_USER,
    });
  }

  function handleMockSignOut() {
    setAuthState(defaultAuthState);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      currentUser: authState.currentUser,
      handleMockSignIn,
      handleMockSignOut,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { themes, getTheme, nextSeason, seasonOrder } from "../lib/themes.js";

const SeasonContext = createContext(null);

function resolveDefaultSeason() {
  const month = new Date().getMonth();
  if (month >= 8 && month <= 10) return "fall";
  if (month >= 11 || month <= 2) return "winter";
  return "spring";
}

export function SeasonProvider({ children, initialSeason }) {
  const [season, setSeason] = useState(initialSeason || resolveDefaultSeason());

  const cycleSeason = useCallback(() => {
    setSeason((current) => nextSeason(current));
  }, []);

  const value = useMemo(
    () => ({
      season,
      seasons: seasonOrder,
      theme: getTheme(season),
      themes,
      setSeason,
      cycleSeason,
    }),
    [season, cycleSeason]
  );

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) {
    throw new Error("useSeason must be used inside a SeasonProvider");
  }
  return ctx;
}

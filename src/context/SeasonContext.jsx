import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { themes, getTheme, nextSeason, seasonOrder } from "../lib/themes.js";

const SeasonContext = createContext(null);

function resolveDefaultSeason() {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const seasonFromQuery = params.get("season");
    if (seasonFromQuery && seasonOrder.includes(seasonFromQuery)) {
      return seasonFromQuery;
    }

    const storedSeason = window.localStorage.getItem("faceoff-season");
    if (storedSeason && seasonOrder.includes(storedSeason)) {
      return storedSeason;
    }
  }

  const month = new Date().getMonth();
  if (month >= 8 && month <= 11) return "fall";
  if (month >= 0 && month <= 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  return "fall";
}

export function SeasonProvider({ children, initialSeason }) {
  const location = useLocation();
  const [season, setSeason] = useState(initialSeason || resolveDefaultSeason());

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const seasonFromQuery = params.get("season");

    if (!seasonFromQuery || !seasonOrder.includes(seasonFromQuery) || seasonFromQuery === season) {
      return;
    }

    setSeason(seasonFromQuery);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("faceoff-season", seasonFromQuery);
    }
  }, [location.search, season]);

  const cycleSeason = useCallback(() => {
    setSeason((current) => {
      const next = nextSeason(current);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("faceoff-season", next);
      }
      return next;
    });
  }, []);

  const setSeasonSafe = useCallback((nextSeasonId) => {
    if (!seasonOrder.includes(nextSeasonId)) return;
    setSeason(nextSeasonId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("faceoff-season", nextSeasonId);
    }
  }, []);

  const value = useMemo(
    () => ({
      season,
      seasons: seasonOrder,
      theme: getTheme(season),
      themes,
      setSeason: setSeasonSafe,
      cycleSeason,
    }),
    [season, cycleSeason, setSeasonSafe]
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

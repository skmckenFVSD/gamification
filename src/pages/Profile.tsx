import React, { useEffect, useMemo, useState } from "react";
import { useSeason } from "../context/SeasonContext.jsx";
import PlayerIdentityCard from "../components/profile/PlayerIdentityCard";
import FavouriteTeamSelect from "../components/profile/FavouriteTeamSelect";
import TraitPillSelector from "../components/profile/TraitPillSelector";
import AkaNameGenerator from "../components/profile/AkaNameGenerator";
import ProfileSummaryPanel from "../components/profile/ProfileSummaryPanel";
import { HOCKEY_TEAMS } from "../data/hockeyTeams";
import { HOCKEY_TRAITS } from "../data/hockeyTraits";
import { generateAkaName } from "../data/akaNameParts";

type UserProfilePreferences = {
  favouriteTeamId: string | null;
  selectedTraits: string[];
  akaName: string | null;
  akaLocked: boolean;
};

type MockUser = {
  fullName: string;
  email: string;
  department: string;
  jobTitle: string;
  profileImageUrl: string;
};

const STORAGE_KEY = "fvsd-faceoff-profile";
const MAX_TRAITS = 5;

const assetPath = (path: string) => `${import.meta.env.BASE_URL}assets/fvsd-faceoff/lockerroom/${path}`;

const LOCKERROOM_ASSETS = {
  base: assetPath("locker_room_main_environment.png"),
  away: assetPath("locker_room_away_environment.png"),
  home: assetPath("locker_room_home_environment.png"),
  neutral: assetPath("locker_room_neutral_environment.png"),
  ambience: assetPath("lighting_snowy_arena_ambience.png"),
  blueLight: assetPath("lighting_blue_spotlight.png"),
  tealLight: assetPath("lighting_teal_spotlight.png"),
  wallBanner: assetPath("banner_every_prompt_every_point.png"),
};

const DEFAULT_PREFERENCES: UserProfilePreferences = {
  favouriteTeamId: null,
  selectedTraits: [],
  akaName: null,
  akaLocked: false,
};

function makeInitialAvatar(name: string) {
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

const MOCK_USER: MockUser = {
  fullName: "Scott McKenzie",
  email: "scott.mckenzie@fvsd.ab.ca",
  department: "Division Services",
  jobTitle: "Director of Technology",
  profileImageUrl: makeInitialAvatar("Scott McKenzie"),
};

function loadStoredPreferences(): UserProfilePreferences {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PREFERENCES;
    }

    const parsed = JSON.parse(raw) as Partial<UserProfilePreferences>;
    return {
      favouriteTeamId: typeof parsed.favouriteTeamId === "string" ? parsed.favouriteTeamId : null,
      selectedTraits: Array.isArray(parsed.selectedTraits)
        ? parsed.selectedTraits.filter((value): value is string => typeof value === "string").slice(0, MAX_TRAITS)
        : [],
      akaName: typeof parsed.akaName === "string" ? parsed.akaName : null,
      akaLocked: Boolean(parsed.akaLocked),
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export default function Profile() {
  const { season } = useSeason();
  const [prefs, setPrefs] = useState<UserProfilePreferences>(() => loadStoredPreferences());
  const seasonLabel = season.charAt(0).toUpperCase() + season.slice(1);

  const seasonalLockerEnvironment =
    season === "fall"
      ? LOCKERROOM_ASSETS.away
      : season === "winter"
      ? LOCKERROOM_ASSETS.home
      : LOCKERROOM_ASSETS.neutral;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const selectedTeam = useMemo(
    () => HOCKEY_TEAMS.find((team) => team.id === prefs.favouriteTeamId) ?? null,
    [prefs.favouriteTeamId]
  );

  const selectedTraitLabels = useMemo(
    () => HOCKEY_TRAITS.filter((trait) => prefs.selectedTraits.includes(trait.id)).map((trait) => trait.label),
    [prefs.selectedTraits]
  );

  const canGenerateAka = prefs.selectedTraits.length > 0;

  function updateTeam(teamId: string) {
    if (prefs.akaLocked) {
      return;
    }
    setPrefs((current) => ({ ...current, favouriteTeamId: teamId }));
  }

  function toggleTrait(traitId: string) {
    if (prefs.akaLocked) {
      return;
    }

    setPrefs((current) => {
      const hasTrait = current.selectedTraits.includes(traitId);
      if (hasTrait) {
        return {
          ...current,
          selectedTraits: current.selectedTraits.filter((item) => item !== traitId),
        };
      }

      if (current.selectedTraits.length >= MAX_TRAITS) {
        return current;
      }

      return {
        ...current,
        selectedTraits: [...current.selectedTraits, traitId],
      };
    });
  }

  function handleGenerate() {
    if (!canGenerateAka || prefs.akaLocked) {
      return;
    }

    setPrefs((current) => ({
      ...current,
      akaName: generateAkaName(current.selectedTraits),
    }));
  }

  function handleRegenerate() {
    if (!prefs.akaName || prefs.akaLocked) {
      return;
    }

    setPrefs((current) => ({
      ...current,
      akaName: generateAkaName(current.selectedTraits),
    }));
  }

  function handleLock() {
    if (!prefs.akaName) {
      return;
    }
    setPrefs((current) => ({ ...current, akaLocked: true }));
  }

  function handleUnlock() {
    setPrefs((current) => ({
      ...current,
      akaLocked: false,
      akaName: null,
      selectedTraits: [],
    }));
  }

  return (
    <section className="profile-identity-page faceoff-slot">
      <div className="profile-locker-bg profile-locker-bg--base" style={{ backgroundImage: `url(${LOCKERROOM_ASSETS.base})` }} />
      <div className="profile-locker-bg profile-locker-bg--seasonal" style={{ backgroundImage: `url(${seasonalLockerEnvironment})` }} />
      <div className="profile-locker-bg profile-locker-bg--ambience" style={{ backgroundImage: `url(${LOCKERROOM_ASSETS.ambience})` }} />
      <div className="profile-locker-bg profile-locker-bg--blue" style={{ backgroundImage: `url(${LOCKERROOM_ASSETS.blueLight})` }} />
      <div className="profile-locker-bg profile-locker-bg--teal" style={{ backgroundImage: `url(${LOCKERROOM_ASSETS.tealLight})` }} />
      <div className="profile-locker-banner" style={{ backgroundImage: `url(${LOCKERROOM_ASSETS.wallBanner})` }} />
      <div className="profile-locker-frost" />

      <div className="profile-identity-content">
        <header className="profile-identity-header faceoff-glass">
          <div>
            <div className="profile-hero-meta">
              <p className="profile-kicker">Player Identity</p>
              <span className="profile-season-chip">{seasonLabel} Showcase</span>
            </div>
            <h1>Locker Room Profile</h1>
            <p>
              Build your hockey persona, choose your team, and lock in the identity used across rosters,
              games, arcade mode, and leaderboards.
            </p>
          </div>
        </header>

        <div className="profile-identity-grid">
          <div className="profile-identity-left">
            <PlayerIdentityCard
              user={MOCK_USER}
              akaName={prefs.akaName}
              teamName={selectedTeam?.displayName ?? null}
              traits={selectedTraitLabels}
              isLocked={prefs.akaLocked}
            />

            <ProfileSummaryPanel
              selectedTeamName={selectedTeam?.displayName ?? null}
              traitCount={prefs.selectedTraits.length}
              akaName={prefs.akaName}
              isLocked={prefs.akaLocked}
            />
          </div>

          <div className="profile-identity-right">
            <section className="profile-controls faceoff-glass">
              <h2>Identity Controls</h2>
              <FavouriteTeamSelect
                teams={HOCKEY_TEAMS}
                value={prefs.favouriteTeamId}
                onChange={updateTeam}
                disabled={prefs.akaLocked}
              />

              <TraitPillSelector
                traits={HOCKEY_TRAITS}
                selectedTraitIds={prefs.selectedTraits}
                maxTraits={MAX_TRAITS}
                locked={prefs.akaLocked}
                onToggleTrait={toggleTrait}
              />

              <AkaNameGenerator
                akaName={prefs.akaName}
                canGenerate={canGenerateAka}
                isLocked={prefs.akaLocked}
                onGenerate={handleGenerate}
                onRegenerate={handleRegenerate}
                onLock={handleLock}
                onUnlock={handleUnlock}
              />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

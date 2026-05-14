import React from "react";
import { ChevronRight, MessageSquareText, ShieldCheck } from "lucide-react";
import {
  Scoreboard,
  AchievementBadge,
  Leaderboard,
  FaceoffButton,
} from "../components/FaceoffPreview.jsx";
import { useSeason } from "../context/SeasonContext.jsx";

export default function Rink() {
  const { theme } = useSeason();

  return (
    <>
      <section className="faceoff-slot faceoff-slot-hero">
        <div>
          <div
            className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm"
            style={{ color: theme.colors.primary }}
          >
            {theme.name} Season
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight md:text-6xl">
            Every Prompt. Every Point. Every Impact.
          </h1>
          <p className="mb-8 max-w-xl text-base text-slate-200 md:text-lg">
            Track Copilot adoption across the Division through Department challenges,
            achievements, XP, and seasonal league play.
          </p>
          <div className="flex flex-wrap gap-3">
            <FaceoffButton theme={theme}>
              View Standings <ChevronRight size={18} />
            </FaceoffButton>
            <FaceoffButton theme={theme} variant="secondary">
              Post a Win
            </FaceoffButton>
          </div>
        </div>

        <div className="faceoff-slot faceoff-slot-scoreboard">
          <Scoreboard theme={theme} />
        </div>
      </section>

      <section className="faceoff-slot faceoff-slot-supporting">
        <AchievementBadge
          theme={theme}
          title="Prompt Master"
          subtitle="100 high-quality prompts"
          icon={MessageSquareText}
        />
        <AchievementBadge
          theme={theme}
          title="Data Defender"
          subtitle="Secure, responsible AI use"
          icon={ShieldCheck}
        />
        <Leaderboard theme={theme} />
      </section>
    </>
  );
}

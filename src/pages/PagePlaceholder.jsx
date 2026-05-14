import React from "react";
import { useSeason } from "../context/SeasonContext.jsx";

export default function PagePlaceholder({ title, kicker, description, icon: Icon, children }) {
  const { theme } = useSeason();

  return (
    <section className="faceoff-slot">
      <div className="faceoff-glass faceoff-panel">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            {kicker ? (
              <div
                className="mb-3 text-xs uppercase tracking-[0.25em]"
                style={{ color: theme.colors.primary }}
              >
                {kicker}
              </div>
            ) : null}
            <h1 className="mb-3 text-3xl font-black md:text-4xl">{title}</h1>
            {description ? (
              <p className="max-w-2xl text-base text-slate-200 md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {Icon ? (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Icon size={32} style={{ color: theme.colors.primary }} />
            </div>
          ) : null}
        </div>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}

import React from "react";
import { useSeason } from "../context/SeasonContext.jsx";

export default function SeasonalBackground() {
  const { theme, season } = useSeason();

  const overlayMotionClass =
    season === "winter"
      ? "faceoff-aurora-motion"
      : season === "fall"
      ? "faceoff-snow-motion"
      : "faceoff-pulse-glow";

  return (
    <>
      <div className="faceoff-season-background" aria-hidden="true" />
      <div
        className="faceoff-season-background-image"
        style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className={`faceoff-season-overlay ${overlayMotionClass}`}
        style={{ backgroundImage: `url(${theme.overlayImage})` }}
        aria-hidden="true"
      />
      <div className="faceoff-vignette" aria-hidden="true" />
    </>
  );
}

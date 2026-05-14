import React from "react";
import { useSeason } from "../../context/SeasonContext.jsx";
import RinkSurface from "./RinkSurface.tsx";

export default function SeasonalBackground() {
  const { theme, season } = useSeason();

  const overlayMotionClass =
    season === "winter"
      ? "faceoff-aurora-motion"
      : season === "fall"
      ? "faceoff-snow-motion"
      : "faceoff-pulse-glow";

  return (
    <div className="faceoff-atmosphere" aria-hidden="true">
      <div className="faceoff-season-background" />
      <div
        className="faceoff-season-background-image"
        style={{ backgroundImage: `url(${theme.backgroundImage})` }}
      />
      <div
        className={`faceoff-season-overlay ${overlayMotionClass}`}
        style={{ backgroundImage: `url(${theme.overlayImage})` }}
      />
      <div className={`faceoff-season-particles faceoff-season-particles--${season}`} />
      <RinkSurface />
      <div className="faceoff-vignette" />
    </div>
  );
}

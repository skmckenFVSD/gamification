import React from "react";
import { useLocation } from "react-router-dom";
import { useSeason } from "../../context/SeasonContext.jsx";
import RinkSurface from "./RinkSurface.tsx";

export default function SeasonalBackground() {
  const { theme, season } = useSeason();
  const location = useLocation();
  const isProfileRoute = location.pathname.endsWith("/profile");

  const overlayMotionClass =
    season === "winter"
      ? "faceoff-aurora-motion"
      : season === "fall"
      ? "faceoff-snow-motion"
      : "faceoff-pulse-glow";

  return (
    <div className="faceoff-atmosphere" aria-hidden="true">
      <div className="faceoff-season-background" />
      {!isProfileRoute ? (
        <>
          <div
            className="faceoff-season-background-image"
            style={{ backgroundImage: `url(${theme.backgroundImage})` }}
          />
          <div
            className={`faceoff-season-overlay ${overlayMotionClass}`}
            style={{ backgroundImage: `url(${theme.overlayImage})` }}
          />
          <div className={`faceoff-season-particles faceoff-season-particles--${season}`} />
        </>
      ) : null}
      {!isProfileRoute ? <RinkSurface /> : null}
      {!isProfileRoute ? <div className="faceoff-vignette" /> : null}
    </div>
  );
}

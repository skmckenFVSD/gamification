import React from "react";
import { useSeason } from "../../context/SeasonContext.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const rinkOverlay = {
  markings: assetPath("assets/fvsd-faceoff/rink/rink_markings_overlay.png"),
  boards: assetPath("assets/fvsd-faceoff/rink/rink_boards_overlay.png"),
  sheen: assetPath("assets/fvsd-faceoff/rink/details/ice_gradient_sheen.png"),
  scratches: assetPath("assets/fvsd-faceoff/rink/details/ice_scratches_overlay.png"),
  reflections: assetPath("assets/fvsd-faceoff/rink/details/wet_reflections_overlay.png"),
};

export default function RinkSurface() {
  const { theme } = useSeason();

  return (
    <div className="faceoff-rink-surface" aria-hidden="true">
      <div
        className="faceoff-rink-surface__image"
        style={{ backgroundImage: `url(${theme.rinkImage})` }}
      />
      <div
        className="faceoff-rink-surface__markings"
        style={{ backgroundImage: `url(${rinkOverlay.markings})` }}
      />
      <div
        className="faceoff-rink-surface__boards"
        style={{ backgroundImage: `url(${rinkOverlay.boards})` }}
      />
      <div
        className="faceoff-rink-surface__ice"
        style={{
          backgroundImage: [
            `url(${rinkOverlay.sheen})`,
            `url(${rinkOverlay.reflections})`,
            `url(${rinkOverlay.scratches})`,
          ].join(", "),
        }}
      />
      <div className="faceoff-rink-surface__fade" />
    </div>
  );
}

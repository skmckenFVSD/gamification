import React from "react";
import { useSeason } from "../context/SeasonContext.jsx";
import SeasonalBackground from "./SeasonalBackground.jsx";
import FaceoffFrame from "./FaceoffFrame.jsx";
import FaceoffTopbar from "./FaceoffTopbar.jsx";

export default function FaceoffAppShell({ children }) {
  const { theme } = useSeason();

  return (
    <div className={`faceoff-app faceoff-shell ${theme.className}`}>
      <SeasonalBackground />
      <FaceoffTopbar />
      <FaceoffFrame>{children}</FaceoffFrame>
      <footer className="faceoff-footer">
        Fort Vermilion School Division. Wave 1, in active development.
      </footer>
    </div>
  );
}

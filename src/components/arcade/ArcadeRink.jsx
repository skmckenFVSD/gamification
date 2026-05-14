import React from "react";

export default function ArcadeRink({ canvasRef, onPointerMove, onPointerDown, onPointerUp }) {
  return (
    <div className="arcade-rink-shell" onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <canvas
        ref={canvasRef}
        className="arcade-canvas"
        width={1280}
        height={720}
        role="img"
        aria-label="Beat the Goalie arcade rink"
      />
      <div className="arcade-rink-overlay" aria-hidden="true" />
      <div className="arcade-rink-vignette" aria-hidden="true" />
    </div>
  );
}

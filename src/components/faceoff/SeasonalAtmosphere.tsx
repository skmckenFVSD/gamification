import React from "react";

type SeasonId = "fall" | "winter" | "spring";

type SeasonalAtmosphereProps = {
  season: SeasonId;
};

const makeClassList = (count: number, baseClass: string) =>
  Array.from({ length: count }, (_, index) => (
    <span
      key={`${baseClass}-${index + 1}`}
      className={`${baseClass} seasonal-motion`}
      style={{ ["--i" as "--i"]: index + 1 }}
      aria-hidden="true"
    />
  ));

export default function SeasonalAtmosphere({ season }: SeasonalAtmosphereProps) {
  return (
    <div
      className={`seasonal-atmosphere seasonal-atmosphere--${season}`}
      aria-hidden="true"
    >
      {season === "fall" && (
        <>
          <div className="seasonal-atmosphere__wash seasonal-motion" />
          <div className="seasonal-atmosphere__glow seasonal-motion" />
          {makeClassList(9, "fall-leaf")}
          {makeClassList(10, "ice-sparkle")}
        </>
      )}

      {season === "winter" && (
        <>
          <div className="winter-aurora seasonal-motion" />
          <div className="winter-edge-pulse seasonal-motion" />
          {makeClassList(22, "winter-snow")}
          {makeClassList(12, "ice-sparkle")}
        </>
      )}

      {season === "spring" && (
        <>
          <div className="spring-mist seasonal-motion" />
          <div className="spring-light-ray seasonal-motion" />
          <div className="spring-glow seasonal-motion" />
          {makeClassList(10, "ice-sparkle")}
        </>
      )}
    </div>
  );
}

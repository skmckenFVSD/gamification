export const themes = {
  fall: {
    id: "fall",
    name: "Fall",
    label: "Fall Season",
    backgroundImage: "/assets/fvsd-faceoff/backgrounds/fall_background_4k.webp",
    rinkImage: "/assets/fvsd-faceoff/rink/rink_fall.webp",
    overlayImage: "/assets/fvsd-faceoff/overlays/light_bokeh_overlay.png",
    className: "season-fall",
    colors: {
      pageFrom: "#120A05",
      pageVia: "#1B2230",
      pageTo: "#071321",
      primary: "#FF8C00",
      secondary: "#F4B942",
      tertiary: "#8B4513",
      ice: "#BBDDF2",
      text: "#FFFFFF",
      muted: "#D9E6F2",
      panel: "rgba(7, 25, 64, 0.58)",
      panelStrong: "rgba(10, 18, 32, 0.78)",
      border: "rgba(255, 184, 72, 0.28)",
      glow: "rgba(255, 140, 0, 0.42)",
      glowSoft: "rgba(255, 140, 0, 0.18)",
    },
  },
  winter: {
    id: "winter",
    name: "Winter",
    label: "Winter Season",
    backgroundImage: "/assets/fvsd-faceoff/backgrounds/winter_background_4k.webp",
    rinkImage: "/assets/fvsd-faceoff/rink/rink_winter.webp",
    overlayImage: "/assets/fvsd-faceoff/overlays/aurora_glow_overlay.png",
    className: "season-winter",
    colors: {
      pageFrom: "#03101F",
      pageVia: "#071940",
      pageTo: "#020712",
      primary: "#23D5FF",
      secondary: "#6A00FF",
      tertiary: "#00E5FF",
      ice: "#E6F6FF",
      text: "#FFFFFF",
      muted: "#D9E6F2",
      panel: "rgba(7, 25, 64, 0.62)",
      panelStrong: "rgba(2, 7, 18, 0.82)",
      border: "rgba(35, 213, 255, 0.28)",
      glow: "rgba(35, 213, 255, 0.44)",
      glowSoft: "rgba(35, 213, 255, 0.18)",
    },
  },
  spring: {
    id: "spring",
    name: "Spring",
    label: "Spring Season",
    backgroundImage: "/assets/fvsd-faceoff/backgrounds/spring_background_4k.webp",
    rinkImage: "/assets/fvsd-faceoff/rink/rink_spring.webp",
    overlayImage: "/assets/fvsd-faceoff/overlays/horizon_haze.png",
    className: "season-spring",
    colors: {
      pageFrom: "#061F25",
      pageVia: "#092A35",
      pageTo: "#071321",
      primary: "#6EE7F2",
      secondary: "#00D4C8",
      tertiary: "#B9F6FF",
      ice: "#F2F7FA",
      text: "#FFFFFF",
      muted: "#E7F3F7",
      panel: "rgba(8, 40, 52, 0.58)",
      panelStrong: "rgba(5, 18, 28, 0.78)",
      border: "rgba(110, 231, 242, 0.28)",
      glow: "rgba(110, 231, 242, 0.38)",
      glowSoft: "rgba(110, 231, 242, 0.16)",
    },
  },
};

export const seasonOrder = ["fall", "winter", "spring"];

export function getTheme(season) {
  return themes[season] || themes.winter;
}

export function nextSeason(current) {
  const idx = seasonOrder.indexOf(current);
  return seasonOrder[(idx + 1) % seasonOrder.length];
}

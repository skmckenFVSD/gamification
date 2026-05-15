export type HockeyTrait = {
  id: string;
  label: string;
  group: "power" | "speed" | "iq" | "grit" | "skill" | "mindset";
};

export const HOCKEY_TRAITS: HockeyTrait[] = [
  { id: "strong", label: "Strong", group: "power" },
  { id: "quick", label: "Quick", group: "speed" },
  { id: "gritty", label: "Gritty", group: "grit" },
  { id: "clutch", label: "Clutch", group: "mindset" },
  { id: "playmaker", label: "Playmaker", group: "skill" },
  { id: "sniper", label: "Sniper", group: "skill" },
  { id: "creative", label: "Creative", group: "skill" },
  { id: "calm", label: "Calm", group: "mindset" },
  { id: "two-way", label: "Two-Way", group: "iq" },
  { id: "hustler", label: "Hustler", group: "speed" },
  { id: "heavy-shot", label: "Heavy Shot", group: "power" },
  { id: "smooth-skater", label: "Smooth", group: "speed" },
  { id: "high-iq", label: "High IQ", group: "iq" },
  { id: "dangler", label: "Dangler", group: "skill" },
  { id: "defensive", label: "Defensive", group: "iq" },
  { id: "scrappy", label: "Scrappy", group: "grit" },
];

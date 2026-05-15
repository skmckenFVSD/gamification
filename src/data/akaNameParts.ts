const GENERAL_AKA_NAMES = [
  "Icebreaker",
  "Quick Stick",
  "Blue Line Bandit",
  "Last Shift",
  "Top Shelf",
  "Frozen Rocket",
  "Glacier Shot",
  "Tape-to-Tape",
  "The Enforcer",
  "Freight Train",
  "Aurora Hustler",
  "Tundra Flash",
  "Boreal Blazer",
  "Ice Road",
  "Northern Sniper",
];

const NORTHERN_PREFIXES = [
  "Aurora",
  "Boreal",
  "Northern",
  "Tundra",
  "Ice Road",
  "Mackenzie",
  "Peace River",
  "Prairie",
  "Frostline",
];

const TRAIT_AKA_POOL: Record<string, string[]> = {
  strong: ["Freight Train", "Icebreaker", "Heavy Stick", "Board Crusher"],
  quick: ["Flash", "Quick Stick", "Jetstream", "Breakaway"],
  gritty: ["Grinder", "Snowplow", "Board Battler", "Corner Dog"],
  clutch: ["Last Shift", "Big Moment", "Game Sealer", "Ice Veins"],
  playmaker: ["Tape-to-Tape", "Vision", "Setup Artist", "Blue Line Brain"],
  sniper: ["Top Shelf", "Laser", "Bar Down", "Goal Lamp"],
  grinder: ["Mud Room", "Rink Wrench", "Shift Eater", "Forecheck"],
  enforcer: ["The Enforcer", "Hammer", "Ice Guard", "Hard Check"],
  "two-way": ["All-Ice", "Neutral Zone", "200-Foot", "Dual Threat"],
  defensive: ["Blue Paint", "Shutout", "Line Lock", "Backcheck"],
  creative: ["Highlight Reel", "Free Flow", "Rink Artist", "Fancy Hands"],
  calm: ["Cool Hand", "Quiet Storm", "Steady Edge", "Still Water"],
  relentless: ["No Quit", "Full Pressure", "Shift Machine", "Northbound"],
  fearless: ["Open Ice", "No Fear", "Brave Shift", "Heavy Heart"],
  scrappy: ["Scrapline", "Gritwire", "Loose Puck", "Dirty Area"],
  leader: ["Captain", "Bench Boss", "Locker Voice", "First In"],
  hustler: ["Motor", "Extra Shift", "Second Effort", "Stride Fire"],
  "heavy-shot": ["Cannon", "Heavy Rip", "Thunder Stick", "Blueline Boom"],
  "smooth-skater": ["Glide", "Silk Edge", "Flowline", "Ice Slide"],
  "high-iq": ["Chalkboard", "Read and React", "Pattern Break", "Scanline"],
  goon: ["Old School", "Gate Crasher", "Bench Rattle", "The Goon"],
  "net-front": ["Crease King", "Screen Door", "Tip Master", "Paint Traffic"],
  dangler: ["Ankles", "Toe Drag", "Edge Breaker", "Stick Trick"],
  "shot-blocker": ["Shot Shield", "Lane Wall", "Body Lane", "Block Party"],
  "setup-artist": ["Primary Assist", "Thread Needle", "Play Driver", "Dish Master"],
};

const SUFFIX_POOL = [
  "Sniper",
  "Blazer",
  "Rocket",
  "Rusher",
  "Hustler",
  "Anchor",
  "Bandit",
  "Spark",
  "Crusher",
  "Captain",
  "Guardian",
  "Breaker",
  "Glider",
  "Operator",
];

function randomItem<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function uniquePool(values: string[]): string[] {
  return [...new Set(values)];
}

export function generateAkaName(selectedTraits: string[]): string {
  const traitPool = uniquePool(
    selectedTraits.flatMap((traitId) => TRAIT_AKA_POOL[traitId] ?? [])
  );

  const weightedPool = traitPool.length > 0 ? traitPool : GENERAL_AKA_NAMES;

  if (Math.random() < 0.58) {
    return randomItem(weightedPool);
  }

  const prefix = randomItem(NORTHERN_PREFIXES);
  const tailCandidates = weightedPool
    .flatMap((name) => name.split(" "))
    .filter((token) => token.length >= 4)
    .concat(SUFFIX_POOL);

  const suffix = randomItem(tailCandidates);
  return `${prefix} ${suffix}`;
}

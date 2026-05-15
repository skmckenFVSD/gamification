export type HockeyTeam = {
  id: string;
  league: "NHL" | "PWHL";
  city: string;
  name: string;
  displayName: string;
  primaryColor?: string;
  secondaryColor?: string;
};

export const NHL_TEAMS: HockeyTeam[] = [
  { id: "anaheim-ducks", league: "NHL", city: "Anaheim", name: "Ducks", displayName: "Anaheim Ducks", primaryColor: "#F47A38", secondaryColor: "#B9975B" },
  { id: "boston-bruins", league: "NHL", city: "Boston", name: "Bruins", displayName: "Boston Bruins", primaryColor: "#FFB81C", secondaryColor: "#000000" },
  { id: "buffalo-sabres", league: "NHL", city: "Buffalo", name: "Sabres", displayName: "Buffalo Sabres", primaryColor: "#003087", secondaryColor: "#FFB81C" },
  { id: "calgary-flames", league: "NHL", city: "Calgary", name: "Flames", displayName: "Calgary Flames", primaryColor: "#C8102E", secondaryColor: "#F1BE48" },
  { id: "carolina-hurricanes", league: "NHL", city: "Carolina", name: "Hurricanes", displayName: "Carolina Hurricanes", primaryColor: "#CC0000", secondaryColor: "#111111" },
  { id: "chicago-blackhawks", league: "NHL", city: "Chicago", name: "Blackhawks", displayName: "Chicago Blackhawks", primaryColor: "#CF0A2C", secondaryColor: "#000000" },
  { id: "colorado-avalanche", league: "NHL", city: "Colorado", name: "Avalanche", displayName: "Colorado Avalanche", primaryColor: "#6F263D", secondaryColor: "#236192" },
  { id: "columbus-blue-jackets", league: "NHL", city: "Columbus", name: "Blue Jackets", displayName: "Columbus Blue Jackets", primaryColor: "#002654", secondaryColor: "#CE1126" },
  { id: "dallas-stars", league: "NHL", city: "Dallas", name: "Stars", displayName: "Dallas Stars", primaryColor: "#006847", secondaryColor: "#8F8F8C" },
  { id: "detroit-red-wings", league: "NHL", city: "Detroit", name: "Red Wings", displayName: "Detroit Red Wings", primaryColor: "#CE1126", secondaryColor: "#FFFFFF" },
  { id: "edmonton-oilers", league: "NHL", city: "Edmonton", name: "Oilers", displayName: "Edmonton Oilers", primaryColor: "#041E42", secondaryColor: "#FF4C00" },
  { id: "florida-panthers", league: "NHL", city: "Florida", name: "Panthers", displayName: "Florida Panthers", primaryColor: "#041E42", secondaryColor: "#C8102E" },
  { id: "los-angeles-kings", league: "NHL", city: "Los Angeles", name: "Kings", displayName: "Los Angeles Kings", primaryColor: "#111111", secondaryColor: "#A2AAAD" },
  { id: "minnesota-wild", league: "NHL", city: "Minnesota", name: "Wild", displayName: "Minnesota Wild", primaryColor: "#154734", secondaryColor: "#A6192E" },
  { id: "montreal-canadiens", league: "NHL", city: "Montreal", name: "Canadiens", displayName: "Montreal Canadiens", primaryColor: "#AF1E2D", secondaryColor: "#192168" },
  { id: "nashville-predators", league: "NHL", city: "Nashville", name: "Predators", displayName: "Nashville Predators", primaryColor: "#FFB81C", secondaryColor: "#041E42" },
  { id: "new-jersey-devils", league: "NHL", city: "New Jersey", name: "Devils", displayName: "New Jersey Devils", primaryColor: "#CE1126", secondaryColor: "#000000" },
  { id: "new-york-islanders", league: "NHL", city: "New York", name: "Islanders", displayName: "New York Islanders", primaryColor: "#00539B", secondaryColor: "#F47D30" },
  { id: "new-york-rangers", league: "NHL", city: "New York", name: "Rangers", displayName: "New York Rangers", primaryColor: "#0038A8", secondaryColor: "#CE1126" },
  { id: "ottawa-senators", league: "NHL", city: "Ottawa", name: "Senators", displayName: "Ottawa Senators", primaryColor: "#C52032", secondaryColor: "#C2912C" },
  { id: "philadelphia-flyers", league: "NHL", city: "Philadelphia", name: "Flyers", displayName: "Philadelphia Flyers", primaryColor: "#F74902", secondaryColor: "#000000" },
  { id: "pittsburgh-penguins", league: "NHL", city: "Pittsburgh", name: "Penguins", displayName: "Pittsburgh Penguins", primaryColor: "#000000", secondaryColor: "#FCB514" },
  { id: "san-jose-sharks", league: "NHL", city: "San Jose", name: "Sharks", displayName: "San Jose Sharks", primaryColor: "#006D75", secondaryColor: "#EA7200" },
  { id: "seattle-kraken", league: "NHL", city: "Seattle", name: "Kraken", displayName: "Seattle Kraken", primaryColor: "#001628", secondaryColor: "#99D9D9" },
  { id: "st-louis-blues", league: "NHL", city: "St. Louis", name: "Blues", displayName: "St. Louis Blues", primaryColor: "#002F87", secondaryColor: "#FCB514" },
  { id: "tampa-bay-lightning", league: "NHL", city: "Tampa Bay", name: "Lightning", displayName: "Tampa Bay Lightning", primaryColor: "#002868", secondaryColor: "#FFFFFF" },
  { id: "toronto-maple-leafs", league: "NHL", city: "Toronto", name: "Maple Leafs", displayName: "Toronto Maple Leafs", primaryColor: "#00205B", secondaryColor: "#FFFFFF" },
  { id: "utah-hockey-club", league: "NHL", city: "Utah", name: "Hockey Club", displayName: "Utah Hockey Club", primaryColor: "#71AFE5", secondaryColor: "#051C2C" },
  { id: "vancouver-canucks", league: "NHL", city: "Vancouver", name: "Canucks", displayName: "Vancouver Canucks", primaryColor: "#00205B", secondaryColor: "#00843D" },
  { id: "vegas-golden-knights", league: "NHL", city: "Vegas", name: "Golden Knights", displayName: "Vegas Golden Knights", primaryColor: "#B4975A", secondaryColor: "#333F48" },
  { id: "washington-capitals", league: "NHL", city: "Washington", name: "Capitals", displayName: "Washington Capitals", primaryColor: "#041E42", secondaryColor: "#C8102E" },
  { id: "winnipeg-jets", league: "NHL", city: "Winnipeg", name: "Jets", displayName: "Winnipeg Jets", primaryColor: "#041E42", secondaryColor: "#7B303E" },
];

export const PWHL_TEAMS: HockeyTeam[] = [
  { id: "boston-fleet", league: "PWHL", city: "Boston", name: "Fleet", displayName: "Boston Fleet", primaryColor: "#006747", secondaryColor: "#D1D3D4" },
  { id: "minnesota-frost", league: "PWHL", city: "Minnesota", name: "Frost", displayName: "Minnesota Frost", primaryColor: "#512D6D", secondaryColor: "#B7A1D3" },
  { id: "montreal-victoire", league: "PWHL", city: "Montreal", name: "Victoire", displayName: "Montreal Victoire", primaryColor: "#7A0019", secondaryColor: "#E7A7B8" },
  { id: "new-york-sirens", league: "PWHL", city: "New York", name: "Sirens", displayName: "New York Sirens", primaryColor: "#006B77", secondaryColor: "#90D4DB" },
  { id: "ottawa-charge", league: "PWHL", city: "Ottawa", name: "Charge", displayName: "Ottawa Charge", primaryColor: "#A61E2A", secondaryColor: "#F0B6B8" },
  { id: "seattle-torrent", league: "PWHL", city: "Seattle", name: "Torrent", displayName: "Seattle Torrent", primaryColor: "#0B4F6C", secondaryColor: "#6EC0D1" },
  { id: "toronto-sceptres", league: "PWHL", city: "Toronto", name: "Sceptres", displayName: "Toronto Sceptres", primaryColor: "#003865", secondaryColor: "#6EC1E4" },
  { id: "vancouver-goldeneyes", league: "PWHL", city: "Vancouver", name: "Goldeneyes", displayName: "Vancouver Goldeneyes", primaryColor: "#0A5A36", secondaryColor: "#C1D72F" },
  { id: "pwhl-las-vegas", league: "PWHL", city: "Las Vegas", name: "PWHL", displayName: "PWHL Las Vegas", primaryColor: "#8A6A2F", secondaryColor: "#2A2A2A" },
  { id: "pwhl-hamilton", league: "PWHL", city: "Hamilton", name: "PWHL", displayName: "PWHL Hamilton", primaryColor: "#FFC72C", secondaryColor: "#1F1F1F" },
];

export const HOCKEY_TEAMS: HockeyTeam[] = [...NHL_TEAMS, ...PWHL_TEAMS];

// data.js
// Données sur les équipes et les pilotes (exemple saison 2023 simplifié)

// Équipes
const teams = [
  {
    name: "Red Bull Racing",
    color: "#0600EF",
  },
  {
    name: "Ferrari",
    color: "#DC0000",
  },
  {
    name: "Mercedes",
    color: "#00D2BE",
  },
  {
    name: "Aston Martin",
    color: "#006F62",
  },
  {
    name: "McLaren",
    color: "#FF8700",
  },
  {
    name: "Alpine",
    color: "#0090FF",
  },
  {
    name: "Alfa Romeo",
    color: "#900000",
  },
  {
    name: "AlphaTauri",
    color: "#2B4562",
  },
  {
    name: "Williams",
    color: "#37BEDD",
  },
  {
    name: "Haas",
    color: "#B6BABD",
  },
];

// Voitures/pilotes
const cars = [
  // Red Bull
  {
    id: "car1",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 1,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Red Bull Racing",
    pilotLastName: "Verstappen",
    pilotFirstName: "Max",
    pilotShortCode: "VER",
  },
  {
    id: "car2",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 11,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Red Bull Racing",
    pilotLastName: "Perez",
    pilotFirstName: "Sergio",
    pilotShortCode: "PER",
  },

  // Ferrari
  {
    id: "car3",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 16,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Ferrari",
    pilotLastName: "Leclerc",
    pilotFirstName: "Charles",
    pilotShortCode: "LEC",
  },
  {
    id: "car4",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 55,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Ferrari",
    pilotLastName: "Sainz",
    pilotFirstName: "Carlos",
    pilotShortCode: "SAI",
  },

  // Mercedes
  {
    id: "car5",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 44,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Mercedes",
    pilotLastName: "Hamilton",
    pilotFirstName: "Lewis",
    pilotShortCode: "HAM",
  },
  {
    id: "car6",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 63,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Mercedes",
    pilotLastName: "Russell",
    pilotFirstName: "George",
    pilotShortCode: "RUS",
  },

  // Aston Martin
  {
    id: "car7",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 14,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Aston Martin",
    pilotLastName: "Alonso",
    pilotFirstName: "Fernando",
    pilotShortCode: "ALO",
  },
  {
    id: "car8",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 18,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Aston Martin",
    pilotLastName: "Stroll",
    pilotFirstName: "Lance",
    pilotShortCode: "STR",
  },

  // McLaren
  {
    id: "car9",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 4,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "McLaren",
    pilotLastName: "Norris",
    pilotFirstName: "Lando",
    pilotShortCode: "NOR",
  },
  {
    id: "car10",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 81,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "McLaren",
    pilotLastName: "Piastri",
    pilotFirstName: "Oscar",
    pilotShortCode: "PIA",
  },

  // Alpine
  {
    id: "car11",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 31,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Alpine",
    pilotLastName: "Ocon",
    pilotFirstName: "Esteban",
    pilotShortCode: "OCO",
  },
  {
    id: "car12",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 10,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Alpine",
    pilotLastName: "Gasly",
    pilotFirstName: "Pierre",
    pilotShortCode: "GAS",
  },

  // Haas
  {
    id: "car13",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 20,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Haas",
    pilotLastName: "Magnussen",
    pilotFirstName: "Kevin",
    pilotShortCode: "MAG",
  },
  {
    id: "car14",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 27,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Haas",
    pilotLastName: "Hülkenberg",
    pilotFirstName: "Nico",
    pilotShortCode: "HUL",
  },

  // Alfa Romeo
  {
    id: "car15",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 77,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Alfa Romeo",
    pilotLastName: "Bottas",
    pilotFirstName: "Valtteri",
    pilotShortCode: "BOT",
  },
  {
    id: "car16",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 24,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Alfa Romeo",
    pilotLastName: "Zhou",
    pilotFirstName: "Guanyu",
    pilotShortCode: "ZHO",
  },

  // AlphaTauri
  {
    id: "car17",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 22,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "AlphaTauri",
    pilotLastName: "Tsunoda",
    pilotFirstName: "Yuki",
    pilotShortCode: "TSU",
  },
  {
    id: "car18",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 21,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "AlphaTauri",
    pilotLastName: "De Vries",
    pilotFirstName: "Nyck",
    pilotShortCode: "DEV",
  },

  // Williams
  {
    id: "car19",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 23,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Williams",
    pilotLastName: "Albon",
    pilotFirstName: "Alexander",
    pilotShortCode: "ALB",
  },
  {
    id: "car20",
    angle: 0,
    speed: Math.random() * 5 + 1,
    laps: 0,
    lapTimes: [],
    totalTime: 0,
    fastestLap: false,
    number: 2,
    tireWear: 0,
    pitStopTime: 0,
    collisionEndTime: 0,
    collisionCooldown: 0,
    weatherMultiplier: 1,
    baseSpeed: 0,
    currentSpeed: 0,
    team: "Williams",
    pilotLastName: "Sargeant",
    pilotFirstName: "Logan",
    pilotShortCode: "SAR",
  },
];

export { cars, teams };

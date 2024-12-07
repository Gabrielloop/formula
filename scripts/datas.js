const drivers = [
  {
    position: 1,
    team: "ferrari",
    idCar: 1,
    pilot: "Charles Leclerc",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "LEC",
  },
  {
    position: 2,
    team: "ferrari",
    idCar: 2,
    pilot: "Carlos Sainz",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "SAI",
  },
  {
    position: 3,
    team: "mercedes",
    idCar: 3,
    pilot: "Lewis Hamilton",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "HAM",
  },
  {
    position: 4,
    team: "mercedes",
    idCar: 4,
    pilot: "Valtteri Bottas",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "BOT",
  },
  {
    position: 5,
    team: "redBull",
    idCar: 5,
    pilot: "Max Verstappen",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "VER",
  },
  {
    position: 6,
    team: "redBull",
    idCar: 6,
    pilot: "Sergio Perez",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "PER",
  },
  {
    position: 7,
    team: "mclaren",
    idCar: 7,
    pilot: "Lando Norris",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "NOR",
  },
  {
    position: 8,
    team: "mclaren",
    idCar: 8,
    pilot: "Daniel Ricciardo",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "RIC",
  },
  {
    position: 9,
    team: "astonMartin",
    idCar: 9,
    pilot: "Sebastian Vettel",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "VET",
  },
  {
    position: 10,
    team: "astonMartin",
    idCar: 10,
    pilot: "Lance Stroll",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "STR",
  },
  {
    position: 11,
    team: "alpine",
    idCar: 11,
    pilot: "Fernando Alonso",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "ALS",
  },
  {
    position: 12,
    team: "alpine",
    idCar: 12,
    pilot: "Esteban Ocon",
    lap: 1,
    time: 0,
    pit: 0,
    surname: "OCO",
  },
];
const teams = [
  { team: "ferrari", color: "red", points: 0 },
  { team: "mercedes", color: "silver", points: 0 },
  { team: "redBull", color: "blue", points: 0 },
  { team: "mclaren", color: "orange", points: 0 },
  { team: "astonMartin", color: "green", points: 0 },
  { team: "alpine", color: "blue", points: 0 },
];

const lapResults = {
  lap1: [
    { idCar: 1, time: 90000, position: 1, pit: 0 },
    { idCar: 3, time: 90050, position: 2, pit: 0 },
    { idCar: 2, time: 90100, position: 3, pit: 0 },
    { idCar: 4, time: 90120, position: 4, pit: 0 },
    { idCar: 5, time: 90150, position: 5, pit: 0 },
    { idCar: 6, time: 90170, position: 6, pit: 0 },
    { idCar: 7, time: 90175, position: 7, pit: 0 },
    { idCar: 8, time: 90180, position: 8, pit: 0 },
    { idCar: 9, time: 90200, position: 9, pit: 0 },
    { idCar: 10, time: 90280, position: 10, pit: 0 },
    { idCar: 11, time: 90300, position: 11, pit: 0 },
    { idCar: 12, time: 90480, position: 12, pit: 0 },
  ],
};
console.log(lapResults.lap1);

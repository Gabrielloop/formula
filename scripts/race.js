// script.js
import { cars, teams } from "./data.js";

let circuitRadius = 150;
let centerX = 150;
let centerY = 150;
let maxLaps = 3;
let raceInterval;
let raceTime = 0;
let raceFinished = false;
let results = [];
let fastestLapTime = Infinity;
let weather = "sunny";
let raceData = [];

// Mise à jour du timer
function updateTimerDisplay() {
  const minutes = String(Math.floor(raceTime / 60)).padStart(2, "0");
  const seconds = String(raceTime % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// Enregistrement des données pour le replay
function recordRaceData() {
  if (!raceFinished && raceTime > 0) {
    const snapshot = cars.map((car) => ({
      id: car.id,
      angle: car.angle,
      laps: car.laps,
    }));
    raceData.push(snapshot);
  }
}

function replayRace() {
  let replayIndex = 0;
  const replayInterval = setInterval(() => {
    if (replayIndex >= raceData.length) {
      clearInterval(replayInterval);
      return;
    }

    const snapshot = raceData[replayIndex];
    snapshot.forEach((data) => {
      const carElement = document.getElementById(data.id);
      const radians = (data.angle * Math.PI) / 180;
      const x = centerX + circuitRadius * Math.cos(radians);
      const y = centerY + circuitRadius * Math.sin(radians);
      carElement.style.left = `${x}px`;
      carElement.style.top = `${y}px`;
    });

    replayIndex++;
  }, 100);
}

function adjustSpeedForWeather() {
  cars.forEach((car) => {
    switch (weather) {
      case "sunny":
        car.weatherMultiplier = 1;
        break;
      case "rainy":
        car.weatherMultiplier = 0.8;
        break;
      case "foggy":
        car.weatherMultiplier = 0.9;
        break;
    }
  });
}

// Gestion des collisions
function handleCollisions() {
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      const carA = cars[i];
      const carB = cars[j];

      let angleDiff = Math.abs(carA.angle - carB.angle);
      if (angleDiff > 180) angleDiff = 360 - angleDiff;

      if (
        angleDiff < 5 &&
        raceTime > carA.collisionCooldown &&
        raceTime > carB.collisionCooldown
      ) {
        carA.collisionEndTime = raceTime + 3;
        carB.collisionEndTime = raceTime + 3;
        carA.collisionCooldown = raceTime + 5;
        carB.collisionCooldown = raceTime + 5;
      }
    }
  }
}

// Mise à jour de la position des voitures
function updateCarPosition(car) {
  if (raceFinished) return;

  // Gestion pit stop
  if (raceTime < car.pitStopTime) {
    car.currentSpeed = 0;
  }

  let targetSpeed = car.speed * car.weatherMultiplier;

  const selectedCarId = document.getElementById("car-select").value;
  const pilotRhythm = parseFloat(document.getElementById("pilotRhythm").value);
  const tireSaving = document.getElementById("tireSaving").checked;

  if (!car.boostEnd) car.boostEnd = 0;

  // Ajustements si voiture contrôlée
  if (car.id === selectedCarId) {
    targetSpeed *= pilotRhythm;
    if (tireSaving) {
      targetSpeed *= 0.9;
    }
    if (raceTime < car.boostEnd) {
      targetSpeed *= 1.2;
    }
  }

  if (!car.currentSpeed) car.currentSpeed = 0;
  car.currentSpeed += (targetSpeed - car.currentSpeed) * 0.2;

  let effectiveSpeed = car.currentSpeed;

  if (raceTime < car.collisionEndTime) {
    effectiveSpeed *= 0.5;
  }

  if (raceTime < car.pitStopTime) {
    effectiveSpeed = 0;
  }

  const oldAngle = car.angle;
  car.angle = (car.angle + effectiveSpeed) % 360;

  // Passage de la ligne
  if (oldAngle > 350 && car.angle < 10) {
    car.laps++;
    const lapTime = raceTime - (car.lapTimes.reduce((a, b) => a + b, 0) || 0);
    car.lapTimes.push(lapTime);

    if (lapTime < fastestLapTime) {
      fastestLapTime = lapTime;
      cars.forEach((c) => (c.fastestLap = false));
      car.fastestLap = true;
    }

    const tireSavingChecked = tireSaving && car.id === selectedCarId;
    const wearAmount = tireSavingChecked ? 5 : 10;
    car.tireWear += wearAmount;

    if (car.tireWear >= 100 && car.pitStopTime === 0) {
      car.pitStopTime = raceTime + 3;
      car.tireWear = 0;
    }

    if (car.laps === maxLaps) {
      car.totalTime = raceTime;
      results.push(car);

      if (results.length === 3) {
        raceFinished = true;
        clearInterval(raceInterval);
        displayResults();
        document.getElementById("replay-button").disabled = false;
      }
    }
  }

  const radians = (car.angle * Math.PI) / 180;
  const x = centerX + circuitRadius * Math.cos(radians);
  const y = centerY + circuitRadius * Math.sin(radians);

  const carElement = document.getElementById(car.id);
  carElement.style.left = `${x}px`;
  carElement.style.top = `${y}px`;
}

function updateLiveRanking() {
  cars.sort((a, b) => {
    if (b.laps !== a.laps) return b.laps - a.laps;
    return b.angle - a.angle;
  });

  const rankingBody = document.getElementById("ranking-body");
  rankingBody.innerHTML = "";

  cars.forEach((car, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${car.pilotFirstName} ${car.pilotLastName} (${
      car.pilotShortCode
    })</td>
        <td>${car.laps}</td>
    `;
    rankingBody.appendChild(row);
  });
}

function displayResults() {
  if (results.length < cars.length) {
    const remainingCars = cars
      .filter((car) => !results.includes(car))
      .sort((a, b) => {
        if (b.laps !== a.laps) return b.laps - a.laps;
        return b.angle - a.angle;
      });
    results = results.concat(remainingCars);
  }

  const resultsDiv = document.getElementById("results");
  const resultsBody = document.getElementById("results-body");
  resultsBody.innerHTML = "";

  results.forEach((car, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${car.pilotFirstName} ${car.pilotLastName} (${
      car.pilotShortCode
    })</td>
        <td>${car.totalTime > 0 ? car.totalTime + "s" : "Non terminé"}</td>
        <td>${car.fastestLap ? "✔️" : ""}</td>
    `;
    resultsBody.appendChild(row);
  });

  resultsDiv.style.display = "block";
}

function startRace() {
  const startButton = document.getElementById("start-button");
  startButton.disabled = true;
  document.getElementById("replay-button").disabled = true;
  document.getElementById("results").style.display = "none";

  raceTime = 0;
  raceFinished = false;
  results = [];
  fastestLapTime = Infinity;
  raceData = [];

  const selectedCircuit = document.getElementById("circuit-select").value;
  switch (selectedCircuit) {
    case "small":
      circuitRadius = 150;
      maxLaps = 1;
      break;
    case "large":
      circuitRadius = 150;
      maxLaps = 5;
      break;
    default:
      circuitRadius = 150;
      maxLaps = 3;
      break;
  }

  cars.forEach((car) => {
    car.angle = 0;
    car.laps = 0;
    car.lapTimes = [];
    car.totalTime = 0;
    car.fastestLap = false;
    car.tireWear = 0;
    car.pitStopTime = 0;
    car.collisionEndTime = 0;
    car.collisionCooldown = 0;
    car.currentSpeed = 0;
    car.boostEnd = 0;
  });

  adjustSpeedForWeather();

  raceInterval = setInterval(() => {
    raceTime++;
    updateTimerDisplay();
    cars.forEach(updateCarPosition);
    handleCollisions();
    updateLiveRanking();
    recordRaceData();
  }, 1000);
}

// Mise à jour des couleurs selon l'équipe après le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  cars.forEach((car) => {
    const carElement = document.getElementById(car.id);
    const teamInfo = teams.find((t) => t.name === car.team);
    if (teamInfo) {
      carElement.style.backgroundColor = teamInfo.color;
    }
  });
});

document
  .getElementById("weather-select")
  .addEventListener("change", (event) => {
    weather = event.target.value;
    adjustSpeedForWeather();
  });

document.getElementById("speed-control").addEventListener("input", () => {
  const selectedCarId = document.getElementById("car-select").value;
  const newSpeed = parseFloat(document.getElementById("speed-control").value);
  document.getElementById("speed-value").textContent = newSpeed;

  const selectedCar = cars.find((car) => car.id === selectedCarId);
  if (selectedCar) {
    selectedCar.speed = newSpeed;
  }
});

document.getElementById("pilotRhythm").addEventListener("input", () => {
  const val = document.getElementById("pilotRhythm").value;
  document.getElementById("pilotRhythmValue").textContent = val;
});

document.getElementById("batteryBoost").addEventListener("click", () => {
  const selectedCarId = document.getElementById("car-select").value;
  const selectedCar = cars.find((car) => car.id === selectedCarId);
  if (selectedCar) {
    selectedCar.boostEnd = raceTime + 5;
  }
});

document.getElementById("start-button").addEventListener("click", startRace);
document.getElementById("replay-button").addEventListener("click", () => {
  replayRace();
});

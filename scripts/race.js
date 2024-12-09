// script.js
import { cars, teams } from "./data.js";
const fastestSpeed = 360 / 80; // 4 deg/s
const slowestSpeed = 360 / 100; // environ 3.956 deg/s

cars.forEach((car) => {
  const baseSpeed =
    slowestSpeed + Math.random() * (fastestSpeed - slowestSpeed);

  // Trouver l'équipe de la voiture
  const teamInfo = teams.find((team) => team.name === car.team);

  // Utiliser la performance de l'équipe pour ajuster la vitesse
  const teamPerformance = teamInfo?.performance || 1; // Valeur par défaut de 1 si l'équipe n'est pas trouvée
  car.speed = baseSpeed * teamPerformance;
});

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

// Variables pour pause/avance rapide
let normalInterval = 1000;
let fastInterval = 300;
let isPaused = false;
let isFastForward = false;

// Collisions
let collisionFrequency = 0.001;

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

function updateTimerDisplay() {
  const minutes = String(Math.floor(raceTime / 60)).padStart(2, "0");
  const seconds = String(raceTime % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
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

function handleCollisions() {
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      const carA = cars[i];
      const carB = cars[j];

      let angleDiff = Math.abs(carA.angle - carB.angle);
      if (angleDiff > 180) angleDiff = 360 - angleDiff;

      if (
        angleDiff < 2 &&
        raceTime > carA.collisionCooldown &&
        raceTime > carB.collisionCooldown
      ) {
        if (Math.random() < collisionFrequency) {
          const severityRoll = Math.random();
          if (severityRoll < 0.99) {
            console.log(
              `Touchette entre ${carA.pilotLastName} et ${carB.pilotLastName}`
            );
            carA.collisionEndTime = raceTime + 1;
            carB.collisionEndTime = raceTime + 1;
          } else if (severityRoll < 0.995) {
            console.log(
              `Collision moyenne entre ${carA.pilotLastName} et ${carB.pilotLastName} - Drapeau Jaune !`
            );
            showFlag("yellow-flag");
            carA.collisionEndTime = raceTime + 3;
            carB.collisionEndTime = raceTime + 3;
          } else {
            console.log(
              `Collision sévère entre ${carA.pilotLastName} et ${carB.pilotLastName} - Drapeau Rouge !`
            );
            showFlag("red-flag");
            returnAllCarsToStart();
            abandonCar(carB);
          }

          carA.collisionCooldown = raceTime + 5;
          carB.collisionCooldown = raceTime + 5;
        }
      }
    }
  }
}

function returnAllCarsToStart() {
  cars.forEach((car) => {
    car.totalAngle = 0;
    car.angle = 0;
    car.currentSpeed = 0;
    car.collisionEndTime = 0;
    car.pitStopTime = 0;

    const radians = (car.angle * Math.PI) / 180;
    const x = centerX + circuitRadius * Math.cos(radians);
    const y = centerY + circuitRadius * Math.sin(radians);
    const carElement = document.getElementById(car.id);
    if (carElement) {
      carElement.style.left = `${x}px`;
      carElement.style.top = `${y}px`;
    }
  });
}

function showFlag(flagId, duration = 3000) {
  const flagEl = document.getElementById(flagId);
  if (flagEl) {
    flagEl.style.display = "block";
    setTimeout(() => {
      flagEl.style.display = "none";
    }, duration);
  }
}

function abandonCar(car) {
  car.speed = 0;
  car.currentSpeed = 0;
  car.collisionEndTime = Infinity;
  const carElement = document.getElementById(car.id);
  if (carElement) {
    carElement.style.display = "none";
  }
  console.log(
    `${car.pilotLastName} abandonne la course et est invisible sur la piste !`
  );
}

function updateCarPosition(car) {
  if (raceFinished) return;

  const desiredGap = 5;
  const overtakeFrequency = 0.3;
  const slowSpeedThreshold = 1;

  if (raceTime < car.pitStopTime) {
    car.currentSpeed = 0;
  }

  let targetSpeed = car.speed * car.weatherMultiplier;

  const selectedCarId = document.getElementById("car-select").value;
  const pilotRhythm = parseFloat(document.getElementById("pilotRhythm").value);
  const tireSaving = document.getElementById("tireSaving").checked;

  if (!car.boostEnd) car.boostEnd = 0;

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

  if (car.nextCar) {
    const angleDiff = car.angleDiff;
    if (angleDiff < desiredGap && car.nextCar.currentSpeed > 0) {
      const slowdownFactor = (desiredGap - angleDiff) / desiredGap;
      targetSpeed *= 1 - 0.5 * slowdownFactor;
    }

    if (
      car.nextCar.currentSpeed < slowSpeedThreshold &&
      angleDiff < 10 &&
      Math.random() < overtakeFrequency
    ) {
      targetSpeed *= 1.1;
    }
  }

  car.currentSpeed += (targetSpeed - car.currentSpeed) * 0.2;

  let effectiveSpeed = car.currentSpeed;

  if (raceTime < car.collisionEndTime) {
    effectiveSpeed *= 0.5;
  }

  if (raceTime < car.pitStopTime) {
    effectiveSpeed = 0;
  }

  const oldTotalAngle = car.totalAngle;
  car.totalAngle += effectiveSpeed;

  car.angle = car.totalAngle % 360;

  const oldFullLaps = Math.floor(oldTotalAngle / 360);
  const newFullLaps = Math.floor(car.totalAngle / 360);

  if (newFullLaps > oldFullLaps) {
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
  // Tri des voitures
  cars.sort((a, b) => {
    if (b.laps !== a.laps) return b.laps - a.laps;
    return b.angle - a.angle;
  });

  const leader = cars[0]; // La première voiture du tableau est le leader

  cars.forEach((car, index) => {
    const position = index + 1;
    const rowEl = document.getElementById(`position-${position}`);

    if (rowEl) {
      // Position
      const positionEl = rowEl.querySelector(".rank-position");
      if (positionEl) positionEl.textContent = position;

      // Couleur de l'équipe
      const teamEl = rowEl.querySelector(".rank-team");
      if (teamEl) {
        const teamInfo = teams.find((t) => t.name === car.team);
        if (teamInfo) {
          teamEl.textContent = car.number;
          teamEl.style.backgroundColor = teamInfo.color;
        }
      }

      // Nom du pilote
      const nameEl = rowEl.querySelector(".rank-name");
      if (nameEl) {
        nameEl.textContent = `${car.pilotShortCode}`;
      }

      // Tours effectués
      const lapEl = rowEl.querySelector(".rank-lap");
      if (lapEl) {
        lapEl.textContent = `${car.laps}`;
      }

      // Écart avec la voiture précédente (rank-time)
      const timeEl = rowEl.querySelector(".rank-time");
      if (timeEl) {
        if (index === 0) {
          // Le leader n'a pas de précédente, donc pas d'écart avec la voiture précédente
          timeEl.textContent = "";
        } else {
          const prevCar = cars[index - 1];
          let angleDiffPrev = prevCar.totalAngle - car.totalAngle;
          if (angleDiffPrev < 0) {
            angleDiffPrev += 360;
          }

          let timeGapPrev = 0;
          if (prevCar.currentSpeed > 0) {
            timeGapPrev = angleDiffPrev / prevCar.currentSpeed;
          }

          timeEl.textContent = `${timeGapPrev.toFixed(1)}s`;
        }
      }

      // Écart avec le leader (rank-gap)
      const gapEl = rowEl.querySelector(".rank-gap");
      if (gapEl) {
        if (index === 0) {
          // Le leader n'a pas d'écart avec lui-même
          gapEl.textContent = "";
        } else {
          let angleDiffLeader = leader.totalAngle - car.totalAngle;
          if (angleDiffLeader < 0) {
            angleDiffLeader += 360;
          }

          let timeGapLeader = 0;
          if (leader.currentSpeed > 0) {
            timeGapLeader = angleDiffLeader / leader.currentSpeed;
          }

          gapEl.textContent = `${timeGapLeader.toFixed(1)}s`;
        }
      }

      // Meilleur tour
      if (car.fastestLap) {
        rowEl.classList.add("fastest-lap-row");
      } else {
        rowEl.classList.remove("fastest-lap-row");
      }
    }
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

// Nouvelle fonction pour mettre à jour la course
function updateRace() {
  if (raceFinished) return;
  if (isPaused) return;
  raceTime++;
  updateTimerDisplay();
  cars.forEach(updateCarPosition);
  handleCollisions();
  updateLiveRanking();
  recordRaceData();
}

function startRace() {
  const startButton = document.getElementById("start-button");
  startButton.disabled = true;
  document.getElementById("replay-button").disabled = true;
  document.getElementById("results").style.display = "none";

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

  // Au lieu de const angleSpacing = 1;
  const angleSpacing = 1; // Vous pouvez ajuster cet écart selon vos besoins

  cars.forEach((car) => {
    // Utilisez car.startingPosition au lieu de index
    car.totalAngle = (car.startingPosition - 1) * angleSpacing;
    car.angle = car.totalAngle % 360;
    // let newPosition = cars.length + 1 - car.startingPosition;

    // Réinitialisation des propriétés de la voiture
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

    // Calcul des positions x et y
    const radians = (car.angle * Math.PI) / 180;
    const x = centerX + circuitRadius * Math.cos(radians);
    const y = centerY + circuitRadius * Math.sin(radians);

    // Mise à jour de la position visuelle de la voiture
    const carElement = document.getElementById(car.id);
    if (carElement) {
      carElement.style.left = `${x}px`;
      carElement.style.top = `${y}px`;
    }
  });

  adjustSpeedForWeather();

  raceInterval = setInterval(updateRace, normalInterval);
}

// Boutons pause et avance rapide
document.getElementById("pause-button").addEventListener("click", () => {
  if (isPaused) {
    // Reprendre
    isPaused = false;
  } else {
    // Mettre en pause
    isPaused = true;
  }
});

document.getElementById("fast-forward-button").addEventListener("click", () => {
  if (isFastForward) {
    // Revenir à la vitesse normale
    isFastForward = false;
    clearInterval(raceInterval);
    raceInterval = setInterval(updateRace, normalInterval);
  } else {
    // Passer en avance rapide
    isFastForward = true;
    clearInterval(raceInterval);
    raceInterval = setInterval(updateRace, fastInterval);
  }
});

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

import { generateRandomGrid } from "./grid.js";

document.getElementById("generate-grid").addEventListener("click", () => {
  generateRandomGrid();
});

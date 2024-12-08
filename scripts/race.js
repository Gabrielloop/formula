// script.js
import { cars, teams } from "./data.js";

// cars.forEach((car) => {
//   car.speed = 20; // Test: vitesse élevée pour s'assurer d'un tour rapide
//   car.currentSpeed = 0;
// });
const fastestSpeed = 360 / 90; // 4 deg/s
const slowestSpeed = 360 / 91; // environ 3.956 deg/s

// Pour chaque voiture, on assigne une vitesse entre slowestSpeed et fastestSpeed
cars.forEach((car) => {
  car.speed = slowestSpeed + Math.random() * (fastestSpeed - slowestSpeed);
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
let collisionFrequency = 0.01; // 10% de chance qu’une collision détectée soit réelle
function handleCollisions() {
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      const carA = cars[i];
      const carB = cars[j];

      let angleDiff = Math.abs(carA.angle - carB.angle);
      if (angleDiff > 180) angleDiff = 360 - angleDiff;

      // Collision détectée par l'angle
      if (
        angleDiff < 2 &&
        raceTime > carA.collisionCooldown &&
        raceTime > carB.collisionCooldown
      ) {
        // Test de rareté
        if (Math.random() < collisionFrequency) {
          // Collision réelle, déterminons la gravité
          const severityRoll = Math.random();
          // Ex : 0.0 - 0.5 = touchette, 0.5 - 0.9 = moyenne, 0.9 - 1.0 = sévère
          if (severityRoll < 0.99) {
            // Touchette
            console.log(
              `Touchette entre ${carA.pilotLastName} et ${carB.pilotLastName}`
            );
            // Légère pénalité : ralentissement 1 seconde ?
            carA.collisionEndTime = raceTime + 1;
            carB.collisionEndTime = raceTime + 1;
          } else if (severityRoll < 0.995) {
            // Collision moyenne
            console.log(
              `Collision moyenne entre ${carA.pilotLastName} et ${carB.pilotLastName} - Drapeau Jaune !`
            );
            showFlag("yellow-flag");
            // Plus grande pénalité, 3 secondes de ralentissement
            carA.collisionEndTime = raceTime + 3;
            carB.collisionEndTime = raceTime + 3;
          } else {
            // Collision sévère
            console.log(
              `Collision sévère entre ${carA.pilotLastName} et ${carB.pilotLastName} - Drapeau Rouge !`
            );
            showFlag("red-flag");

            // Toutes les voitures retournent au départ
            returnAllCarsToStart();
            abandonCar(carB);
          }

          // Définir un cooldown avant une nouvelle collision pour ces voitures
          carA.collisionCooldown = raceTime + 5;
          carB.collisionCooldown = raceTime + 5;
        } else {
          // Collision potentielle, mais pas réelle (évitée), on peut ignorer
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
    car.collisionEndTime = 0; // Plus de pénalité
    car.pitStopTime = 0; // Plus de pit stop en cours

    // Mise à jour de la position visuelle
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

  // Masquer la voiture visuellement
  const carElement = document.getElementById(car.id);
  if (carElement) {
    carElement.style.display = "none";
  }

  console.log(
    `${car.pilotLastName} abandonne la course et est invisible sur la piste !`
  );
}
// Mise à jour de la position de la voiture
function updateCarPosition(car) {
  if (raceFinished) return;

  // Paramètres pour la distance de sécurité et le dépassement
  const desiredGap = 5; // écart de sécurité en degrés
  const overtakeFrequency = 0.3; // probabilité de tenter un dépassement si opportunité
  const slowSpeedThreshold = 1; // vitesse considérée comme lente (pour tenter le dépassement)

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

  // Gestion de la distance de sécurité si on a une voiture devant
  if (car.nextCar) {
    const angleDiff = car.angleDiff;
    // Si trop proche, ralentir
    if (angleDiff < desiredGap && car.nextCar.currentSpeed > 0) {
      const slowdownFactor = (desiredGap - angleDiff) / desiredGap;
      targetSpeed *= 1 - 0.5 * slowdownFactor;
    }

    // Opportunité de dépassement si la voiture devant est lente
    if (
      car.nextCar.currentSpeed < slowSpeedThreshold &&
      angleDiff < 10 &&
      Math.random() < overtakeFrequency
    ) {
      // Tentative de dépassement: léger boost de vitesse
      targetSpeed *= 1.1;
    }
  }

  // Ajustement progressif de la vitesse
  car.currentSpeed += (targetSpeed - car.currentSpeed) * 0.2;

  let effectiveSpeed = car.currentSpeed;

  // Collision
  if (raceTime < car.collisionEndTime) {
    effectiveSpeed *= 0.5;
  }

  // Pit stop
  if (raceTime < car.pitStopTime) {
    effectiveSpeed = 0;
  }

  // Ancien total d'angle avant mise à jour
  const oldTotalAngle = car.totalAngle;
  // Mise à jour de l'angle cumulé
  car.totalAngle += effectiveSpeed;

  // Angle pour l'affichage sur la piste
  car.angle = car.totalAngle % 360;

  // Détection de tour
  const oldFullLaps = Math.floor(oldTotalAngle / 360);
  const newFullLaps = Math.floor(car.totalAngle / 360);

  if (newFullLaps > oldFullLaps) {
    // Un nouveau tour est complété
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

  // Mise à jour de la position visuelle
  const radians = (car.angle * Math.PI) / 180;
  const x = centerX + circuitRadius * Math.cos(radians);
  const y = centerY + circuitRadius * Math.sin(radians);

  const carElement = document.getElementById(car.id);
  carElement.style.left = `${x}px`;
  carElement.style.top = `${y}px`;
}
function updateLiveRanking() {
  // Trier les voitures selon vos critères (déjà fait avant)
  cars.sort((a, b) => {
    if (b.laps !== a.laps) return b.laps - a.laps;
    return b.angle - a.angle;
  });

  const leader = cars[0];

  cars.forEach((car, index) => {
    const position = index + 1;
    const rowEl = document.getElementById(`position-${position}`);

    if (rowEl) {
      // Mettre à jour la position
      const positionEl = rowEl.querySelector(".rank-position");
      if (positionEl) positionEl.textContent = position;

      // Mettre à jour l'équipe (couleur)
      const teamEl = rowEl.querySelector(".rank-team");
      if (teamEl) {
        const teamInfo = teams.find((t) => t.name === car.team);
        if (teamInfo) {
          teamEl.textContent = "";
          teamEl.style.backgroundColor = teamInfo.color;
        }
      }

      // Nom du pilote
      const nameEl = rowEl.querySelector(".rank-name");
      if (nameEl) {
        nameEl.textContent = `${car.pilotShortCode}`;
      }

      // Tours effectués
      const timeEl = rowEl.querySelector(".rank-lap");
      if (timeEl) {
        timeEl.textContent = `${car.laps}`;
      }

      // Affichage du gap
      const gapEl = rowEl.querySelector(".rank-gap");
      if (gapEl) {
        if (index === 0) {
          // Le leader n'a pas d'écart avec lui-même
          gapEl.textContent = "";
        } else {
          // Calcul de l'écart
          let angleDiff = leader.totalAngle - car.totalAngle;
          if (angleDiff < 0) {
            angleDiff += 360; // Si négatif, on ajoute un tour (360°) pour obtenir la bonne différence
          }

          let timeGap = 0;
          // On divise l'écart angulaire par la vitesse du leader
          // pour obtenir un écart temporel approximatif
          if (leader.currentSpeed > 0) {
            timeGap = angleDiff / leader.currentSpeed;
          }

          // Affichage de l'écart en secondes (arrondi à une décimale)
          gapEl.textContent = `${timeGap.toFixed(1)}s`;
        }
      }

      // Si meilleur tour, surlignage (déjà présent dans votre code)
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

  // Espace entre les voitures en degrés
  const angleSpacing = 2;

  cars.forEach((car, index) => {
    car.totalAngle = index * angleSpacing;
    car.angle = car.totalAngle % 360;

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

    // Mise à jour de la position visuelle initiale
    const radians = (car.angle * Math.PI) / 180;
    const x = centerX + circuitRadius * Math.cos(radians);
    const y = centerY + circuitRadius * Math.sin(radians);
    const carElement = document.getElementById(car.id);
    if (carElement) {
      carElement.style.left = `${x}px`;
      carElement.style.top = `${y}px`;
    }
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

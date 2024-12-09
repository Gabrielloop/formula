import { teams } from "./data.js";
import { cars } from "./data.js";

// Fonction pour générer une grille aléatoire basée sur les performances des teams
export function generateRandomGrid() {
  // Associez chaque voiture à la performance de son équipe
  const carsWithPerformance = cars.map((car) => {
    const teamInfo = teams.find((team) => team.name === car.team);
    const performance = teamInfo?.performance || 1; // Performance par défaut : 1
    return { ...car, performance };
  });

  // Mélangez la grille avec un biais basé sur la performance
  const weightedRandomOrder = carsWithPerformance
    .map((car) => ({
      car,
      weight: car.performance + Math.random() * 0.5, // Ajoutez un facteur aléatoire
    }))
    .sort((a, b) => b.weight - a.weight) // Trier par poids (performance + aléatoire) dans l'ordre décroissant
    .map((item) => item.car); // Extraire les voitures triées

  // Réassignez l'ordre dans le tableau `cars`
  cars.length = 0; // Vide l'ancien tableau
  weightedRandomOrder.forEach((car, index) => {
    car.startingPosition = 20 - index; // Ajoutez la position de départ
    const consoleStart = index + 1;
    console.log("car " + car.number + " start P" + consoleStart);
    cars.push(car);
  });

  // Mettre à jour l'affichage de la grille
  updateGridDisplay();
}

// Fonction pour mettre à jour l'affichage de la grille
function updateGridDisplay() {
  const gridContainer = document.getElementById("starting-grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = ""; // Vider l'ancien contenu

  cars.forEach((car) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("grid-car");
    carDiv.style.backgroundColor =
      teams.find((team) => team.name === car.team)?.color || "#ccc";
    carDiv.textContent = `#${car.number} - ${car.pilotShortCode}`;
    gridContainer.appendChild(carDiv);
  });
}

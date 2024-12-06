const data = [
    { team : ferrari, idCar: 1, pilot: "Charles Leclerc", lap: 1, time: 0, pit: 0},
    { team : ferrari, idCar: 2, pilot: "Carlos Sainz", lap: 1, time: 0, pit: 0},
    { team : mercedes, idCar: 3, pilot: "Lewis Hamilton", lap: 1, time: 0, pit: 0},
    { team : mercedes, idCar: 4, pilot: "Valtteri Bottas", lap: 1, time: 0, pit: 0},
    { team : redBull, idCar: 5, pilot: "Max Verstappen", lap: 1, time: 0, pit: 0},
    { team : redBull, idCar: 6, pilot: "Sergio Perez", lap: 1, time: 0, pit: 0},
    { team : mclaren, idCar: 7, pilot: "Lando Norris", lap: 1, time: 0, pit: 0},
    { team : mclaren, idCar: 8, pilot: "Daniel Ricciardo", lap: 1, time: 0, pit: 0},
    { team : astonMartin, idCar: 9, pilot: "Sebastian Vettel", lap: 1, time: 0, pit: 0},
    { team : astonMartin, idCar: 10, pilot: "Lance Stroll", lap: 1, time: 0, pit: 0},
    { team : alpine, idCar: 11, pilot: "Fernando Alonso", lap: 1, time: 0, pit: 0},
    { team : alpine, idCar: 12, pilot: "Esteban Ocon", lap: 1, time: 0, pit: 0},
];


function createRanking(data, updateInterval) {
 
  return ranking;
}

function creatDiv() {
const asideRef = document.querySelector('aside');
const div = document.createElement('div');
div.className = 'ranking';
asideRef.appendChild(div);
console.log("div", div);
}

creatDiv();
// A FAIRE
// Ajouter une fonction dans un objets : utilisation de this !
// transformer en objet les tableaux et utiliser for in pour les parcourir.

// PARAMETRES DE COURSE
// PNEUS

const tyres = [
    {
        type: "S",
        expectDuration: 20,
        quantity: 2,
    },
    {
        type: "M",
        expectDuration: 30,
        quantity: 2,
    },
    {
        type: "H",
        expectDuration: 40,
        quantity: 2,
    },
];
// TOURS
const totalLap = 70;
const averageTimeLapInMille = 90000;
const tyreImpactMaxInMille = 10000;
// UTILISATEURS
let currentLap = 0;
let currentTyres = {
    tyreType: "??",
    pitLap: 0
};

// PARAMETRES DE LA STRATEGIE APPLIQUEE
const tyresStrategy = [
    {
        tyreType: "M",
        pitLap: 0,
    },
    {
        tyreType: "S",
        pitLap: 30,
    },
    {
        tyreType: "M",
        pitLap: 40,
    },
    {
        tyreType: "H",
        pitLap: 80,
    },
];

// TABLEAU D'AFFICHAGE DES ARRETS
// const pitStrategy = tyresStrategy.map(Element => Element.pitLap);
// console.log(pitStrategy);


function formatTime(milliseconds) {
    // Récupération des minutes et millisecondes restantes
    const minutes = Math.floor(milliseconds / 60000);
    const remainMillis = milliseconds % 60000;
  
    // Récupération des secondes
    const seconds = Math.floor(remainMillis / 1000);
    const millis = remainMillis % 1000;
  

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    let formattedMillis=millis.toFixed(3);
    formattedMillis = String(formattedMillis).padStart(3, "0");
  
    // Construire la chaîne de temps
    return `${formattedMinutes}:${formattedSeconds}.${formattedMillis}`;
  }
console.log("Temps moyen : " + formatTime(averageTimeLapInMille));

// Fonction de controle de la présence d'un changement de stratégie, donc arret aux stands
// return : ("tyretype")
function pitLapControl(lap) {
    const idPitLap = tyresStrategy.findIndex(element => element.pitLap == lap);
    if (idPitLap >= 0) {
        console.warn("New tyres : " + tyresStrategy[idPitLap].tyreType);
        return tyresStrategy[idPitLap].tyreType;
    }
}

// Fonction de changement des pneusc
// return : undefine
function pitChangeTyres(typeOfTyres, acutalLap) {
    currentTyres = {
        tyreType: typeOfTyres,
        pitLap: acutalLap
    };
}

// Fonction de calcul de l'age des pneus
// return : i
function tyresAge(pitLapTyresChanged, currentLapProp) {
    const ageTyres = currentLapProp - pitLapTyresChanged;
    return ageTyres;
}

//Fonction de calcul de l'efficacité
// 1/exp(x)
function efficiency(tyresAgeEff, tyresTypeEFF) {
    efficiencyI = 1 / Math.exp(tyresAgeEff / 20);
    return efficiencyI;
}
function formatpourcent(decimal){
    return Number(decimal).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
}


for (i = 0; i < totalLap + 1; i++) {
    currentLap++;
    // Controle de présence d'un changement de stratégie et application de la stratégie
    if (pitLapControl(i) != null) {
        pitChangeTyres(pitLapControl(i), i)
    }
    // Préparation du message à afficher dans la console
    const msgLap = "Tour n°" + currentLap;
    const msgCurrentTyres = currentTyres.tyreType + " tyres (age :" + tyresAge(currentTyres.pitLap, i) + " lap)";
    const msgEfficiency = formatpourcent(efficiency(tyresAge(currentTyres.pitLap, i), "M"));
    const msgLapTime = formatTime(averageTimeLapInMille - efficiency(tyresAge(currentTyres.pitLap, i), "M")*tyreImpactMaxInMille);
    console.log(msgLap + "-" + msgCurrentTyres + " " + msgEfficiency + " " + msgLapTime);
}

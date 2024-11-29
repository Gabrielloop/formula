// PARAMETRES DE COURSE
// PNEUS
const tyreDurationS = 20;
const tyreDurationM = 30;
const tyreDurationH = 40;

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
        tyreType: "S",
        pitLap: 50,
    },
    {
        tyreType: "H",
        pitLap: 60,
    },
];

// TABLEAU D'AFFICHAGE DES ARRETS
// const pitStrategy = tyresStrategy.map(Element => Element.pitLap);
// console.log(pitStrategy);

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

//Fonction de calcul de l'éfficacité

// 1/exp(x)
function efficiency(tyresAgeEff, tyresTypeEFF) {
    efficiencyI=1/Math.exp(tyresAgeEff/20);
    efficiencyI=Number(efficiencyI).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    return efficiencyI;

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
    const msgEfficiency = efficiency(tyresAge(currentTyres.pitLap, i), "M")
    console.log(msgLap + "-" + msgCurrentTyres + " " + msgEfficiency);

}

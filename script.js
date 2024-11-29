// PARAMETRES DE COURSE

const tyreDurationS = 20;
const tyreDurationM = 30;
const tyreDurationH = 40;

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

const pitStrategy = tyresStrategy.map(Element => Element.pitLap);

console.log(pitStrategy);

// Fonction de controle de la présence d'un changement de stratégie, donc arret aux stands
// return : TRUE / FALSE
function pitLapControl(lap) {
    const idPitLap = tyresStrategy.findIndex(element => element.pitLap == lap);
    return idPitLap>=0;
}


const totalLap = 70;
let currentLap = 0;

for (i = 0; i < totalLap + 1; i++) {

    console.log("Tour n°" + i + " " + pitLapControl(i))
}
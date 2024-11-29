const tyreDurationS = 20;
const tyreDurationM = 30;
const tyreDurationH = 40;

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

const totalLap = 70;
let currentLap = 0;

for (i = 0; i < totalLap + 1; i++) {
    //    tyresStrategy.forEach(element => {
    //        console.log(this.pt);
    //    });

    console.log("Tour n°" + i)
}
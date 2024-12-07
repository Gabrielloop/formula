function createRanking(array) {
    array.forEach(element => {
        // const positionCar= "#position-" + element.position;
        // const divRank = document.querySelector(positionCar);
        const divsValues = "#position-" + element.position + " div";
        const divPosition = document.querySelectorAll(divsValues);
        divPosition[0].innerText = element.position;
        const urlLogo = "assets/teams/" + element.team + ".png";
        divPosition[1].style.backgroundImage = "url('" + urlLogo + "')";
        divPosition[1].classList.add("team-logo");
        divPosition[2].innerText = element.surname;
        divPosition[3].innerText = element.time;
    });
  
}

createRanking(drivers);
function createRanking(array) {
  array.reduce((previousTime, element) => {
    // Sélection des éléments DOM
    const divsValues = "#position-" + element.position + " div";
    const divPosition = document.querySelectorAll(divsValues);

    // Mise à jour des éléments visuels
    divPosition[0].innerText = element.position;
    const urlLogo = "assets/teams/" + element.team + ".png";
    divPosition[1].style.backgroundImage = "url('" + urlLogo + "')";
    divPosition[1].classList.add("team-logo");
    divPosition[2].innerText = element.surname;
    divPosition[3].innerText = formatMilliseconds(element.time);

    // Calcul de l'écart avec le pilote précédent
    const gap = previousTime !== null ? element.time - previousTime : 0;
    const formattedGap =
      gap > 0
        ? `+${formatMillisecondsToSeconds(gap)}`
        : formatMillisecondsToSeconds(gap);

    // Affichage de l'écart dans l'interface
    divPosition[4].innerText = formattedGap;

    // Retourne le temps actuel pour le prochain calcul
    return element.time;
  }, null); // Le `null` initial indique qu'il n'y a pas de "pilote précédent" au départ
}
createRanking(drivers);

function hideAllRankingOpt() {
  const rankingOpt = document.querySelectorAll(
    ".ranking-row > div:nth-last-child(-n+2)"
  );
  rankingOpt.forEach((element) => {
    element.classList.add("ranking-hidden-opt");
  });
}

function listenerRankingDisplay(opt) {
  const targetOpt = "#ranking-display-" + opt;
  const displayOpt = ".rank-" + opt;
  const rankingDisplayListener = document.querySelector(targetOpt);
  rankingDisplayListener.addEventListener("click", () => {
    hideAllRankingOpt();
    const rankingGap = document.querySelectorAll(displayOpt);
    rankingGap.forEach((element) => {
      element.classList.toggle("ranking-hidden-opt");
    });
    console.log("Display " + opt);
  });
}
listenerRankingDisplay("gap");
listenerRankingDisplay("time");

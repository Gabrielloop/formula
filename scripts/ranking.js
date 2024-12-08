function hideAllRankingOpt() {
  const rankingOpt = document.querySelectorAll(
    ".ranking-row > div:nth-last-child(-n+3)"
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
listenerRankingDisplay("lap");
listenerRankingDisplay("time");

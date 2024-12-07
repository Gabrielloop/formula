function formatMilliseconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(3, "0");
  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
function formatMillisecondsToSeconds(ms) {
  const msAbs = Math.abs(ms);
  const seconds = Math.floor(msAbs / 1000); // Extraire les secondes entières
  const milliseconds = msAbs % 1000; // Extraire les millisecondes restantes

  // Formater les valeurs pour avoir toujours deux chiffres pour les secondes et trois pour les millisecondes
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(3, "0");

  return `${formattedSeconds}.${formattedMilliseconds}`;
}

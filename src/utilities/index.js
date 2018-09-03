export const formatDurationString = s => {
  if (s.indexOf(":") > -1) {
    return s;
  }
  const minutes = Math.floor(parseInt(s) / 60);
  let seconds = parseInt(s) % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

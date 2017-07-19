const timeToMinutes = time => {
  const [hours, minutes] = time.split(':').map(n => parseInt(n, 10));
  return 60 * hours + minutes;
};

const minutesToTime = totalMinutes => {
  if (totalMinutes === null) return null;
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;

  return `${hours}:${minutes >= 10 ? minutes : `0${minutes}`}`;
};

module.exports = {
  timeToMinutes,
  minutesToTime
};

const {
  timeToMinutes,
  minutesToTime
} = require('./helpers');

const startOfDay = timeToMinutes('9:00');
const endOfDay = timeToMinutes('19:00');

const getFirstAvailableTime = (appointments, duration) => {
  if (appointments.length === 0) return startOfDay;

  const firstTime = appointments.reduce((time, [_, end], index) => {
    if (!appointments[index + 1]) return end;

    const [start] = appointments[index + 1] || [0];

    return start - end > duration ? end : null;
  }, null);

  if (firstTime === null) return firstTime;

  if (firstTime < startOfDay) return startOfDay;
  if (firstTime + duration >= endOfDay) return null;

  return firstTime;
};

module.exports = (schedules, duration) =>
  schedules
    .map(appointments => appointments.map(appointment => appointment.map(timeToMinutes)))
    .map(getFirstAvailableTime)
    .map(minutesToTime)[0];

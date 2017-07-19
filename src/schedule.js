const {
  timeToMinutes,
  minutesToTime
} = require('./helpers');

const startOfDay = timeToMinutes('9:00');
const endOfDay = timeToMinutes('19:00');

const getAvailableTimeCalculator = duration =>
  appointments => {
    if (appointments.length === 0) return startOfDay;

    const firstTime = appointments.reduce((time, [_, end], index) => {
      if (time !== null) return time;
      if (!appointments[index + 1]) return end;

      const [start] = appointments[index + 1] || [0];

      return start - end >= duration ? end : null;
    }, null);

    if (firstTime === null) return firstTime;

    if (firstTime < startOfDay) return startOfDay;
    if (firstTime + duration >= endOfDay) return null;

    return firstTime;
  };

const canMakeAppointment = (appointments, startTime, duration) =>
  appointments.find(([_, end], index) => {
    const [nextAppointmentStart] = (appointments[index + 1] || [endOfDay])
    if (end <= startTime && startTime + duration < nextAppointmentStart) return true;
  });

const appointmentsToMinutes = appointments =>
  appointments.map(appointment => appointment.map(timeToMinutes))

module.exports = (schedules, duration) => {
  const schedulesInMinutes = schedules.map(appointmentsToMinutes);
  const firstSlots = schedulesInMinutes
    .map(getAvailableTimeCalculator(duration));

  const uniqueStarts = firstSlots
    .reduce((uniques, curr) =>
      uniques.includes(curr) ? uniques : uniques.concat(curr),
      []
    );

  if (uniqueStarts.length === 1) return minutesToTime(firstSlots[0]);
  return minutesToTime(
    uniqueStarts.find(startTime =>
      schedulesInMinutes.every(appointments =>
        canMakeAppointment(appointments, startTime, duration)
      ))
    ) || null;
}

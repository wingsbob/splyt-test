const {
  timeToMinutes,
  minutesToTime
} = require('./helpers');

const endOfDay = timeToMinutes('19:00');

const hasNoAppointments = appointments =>
  appointments.length === 0;

const meetingFitsBeforeFirstAppointment = (earliestTime, duration, appointments) =>
  earliestTime + duration < appointments[0][0]; //assume appointments to be in chronological order

const getAvailableTimeCalculator = (duration, earliestTime) =>
  appointments => {
    if (hasNoAppointments(appointments)) return earliestTime; // no appointments

    if (meetingFitsBeforeFirstAppointment(earliestTime, duration, appointments))
      return earliestTime;

    const [_, firstTime] = appointments
      .find(([_, end], index) => {
        if (end < earliestTime) return false;
        if (!appointments[index + 1]) return true; // last appointment, can assume infinite duration

        const [start] = appointments[index + 1] || [0];

        return start - end >= duration; // if it fits, it's good :)
      });

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

const findFirstAvailableAppointment = (duration, startTime, schedules) => {
  const firstSlots = schedules
    .map(getAvailableTimeCalculator(duration, startTime));

  if (firstSlots.includes(null)) return null;

  const uniqueStarts = firstSlots
    .reduce((uniques, curr) =>
      uniques.includes(curr) ? uniques : uniques.concat(curr),
      []
    )
    .sort((a, b) => a - b);

  if (uniqueStarts.length === 1) return minutesToTime(uniqueStarts[0]);
  const availableSlot =
    uniqueStarts.find(startTime =>
      schedules.every(appointments =>
        canMakeAppointment(appointments, startTime, duration)
      ));

  if (availableSlot) return minutesToTime(availableSlot);

  return findFirstAvailableAppointment(duration, uniqueStarts[uniqueStarts.length - 1], schedules);
};

module.exports = (schedules, duration) =>
  findFirstAvailableAppointment(
    duration,
    timeToMinutes('9:00'),
    schedules.map(appointmentsToMinutes)
  );

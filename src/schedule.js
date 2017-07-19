const parseTime = time => {
  const [hours, minutes] = time.split(':').map(n => parseInt(n, 10));
  return 60 * hours + minutes;
};

const formatTime = totalMinutes => {
  if (totalMinutes === null) return null;
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;

  return `${hours}:${minutes >= 10 ? minutes : `0${minutes}`}`;
};

const endOfDay = parseTime('19:00');

const meetingFitsInSchedules = (schedules, meetingTime, duration) => {
  const meetingFitsInSchedule = appointments =>
    appointments.some(([_, end], index) => {
      const [nextAppointmentStart] = appointments[index + 1] || [endOfDay];

      return end <= meetingTime && meetingTime + duration <= nextAppointmentStart;
    });

  return schedules.every(appointments =>
    appointments.length === 0 || meetingFitsInSchedule(appointments)
  );
};

const parseScheduleTimes = schedules =>
  schedules
    .map(appointments =>
      appointments.map(appointment =>
        appointment.map(parseTime)
      )
    );

module.exports = (schedules, duration, timeResolution = 1) => {
  var meetingTime = parseTime('9:00');
  const schedulesInMinutes = parseScheduleTimes(schedules);

  while (meetingTime + duration < endOfDay) {
    const everyoneCanAttend = meetingFitsInSchedules(schedulesInMinutes, meetingTime, duration);

    if (everyoneCanAttend) return formatTime(meetingTime);
    meetingTime += timeResolution;
  }

  return null;
};

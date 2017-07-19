module.exports = (schedules, duration) =>
  schedules.every(schedule => !schedule.length) ? '9:00' : null;
const {expect} = require('chai');
const schedule = require('../src/schedule');

describe('schedule', () => {
  it('returns null when a meeting cannot be scheduled', () =>
    expect(schedule([[['9:00', '19:00']]], 60)).to.be.null
  );
  it('returns the start of the day for a single empty calendar', () =>
    expect(schedule([[]]), 60).to.equal('9:00')
  );
  it('returns the start of the day for a multiple empty calendars', () =>
    expect(schedule([[], [], []]), 60).to.equal('9:00')
  );
  it('first slot for a single person', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00'],
      ['15:00', '16:00']
    ]], 60)).to.equal('13:00')
  );
});
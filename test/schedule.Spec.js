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
  it('returns the first slot for a single person', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00'],
      ['15:00', '16:00']
    ]], 60)).to.equal('13:00')
  );
  it('fits meetings in exactly', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00'],
      ['14:00', '16:00']
    ]], 60)).to.equal('13:00')
  );
  it('returns the first slot which is available for both people', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00'],
      ['15:00', '16:00']
    ], [
      ['13:00', '13:30']
    ]], 60)).to.equal('13:30')
  );
  it('when everyone needs a later slot', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00'],
      ['15:00', '16:00']
    ], [
      ['13:00', '14:30']
    ]], 60)).to.equal('16:00')
  );
  it('when no time is available', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00'],
      ['15:00', '16:00']
    ], [
      ['13:00', '14:30'],
      ['16:30', '18:30']
    ]], 60)).to.equal(null)
  );
  it('when we have a lot of attendees', () =>
    expect(schedule([[
      ['9:00', '12:00'],
      ['12:30', '13:00']
    ], [
      ['12:00', '12:30'],
      ['13:30', '15:30']
    ], [
      ['13:00', '14:30'],
      ['16:30', '17:00']
    ], [
      ['10:00', '14:30'],
      ['15:15', '16:30']
    ], [
      ['9:00', '11:30'],
      ['12:30', '16:00']
    ], [
      ['9:00', '11:30'],
      ['12:30', '16:00']
    ]], 30)).to.equal('17:00')
  );
});
const {expect} = require('chai');
const schedule = require('../src/schedule');

describe('schedule', () => {
  it('returns null when a meeting cannot be scheduled', () =>
    expect(schedule([['9:00', '19:00']], 60)).to.be.null
  );
  it('returns the first time a single person could make a meeting', () =>
    expect(schedule([[]]), 60).to.equal('9:00')
  );
});
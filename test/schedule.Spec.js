const {expect} = require('chai');
const schedule = require('../src/schedule');

describe('schedule', () => {
  it('returns null when a meeting cannot be scheduled', () =>
    expect(schedule([['9:00', '19:00']], 60)).to.be.null
  );
});
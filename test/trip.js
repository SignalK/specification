var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Trip data is valid', function() {
  it("full tree is valid", function() {
    require('./data/trip.json').should.be.validSignalK;
  });
});

describe('Trip data is invalid - string value', function() {
  it("full tree is valid", function() {
    require('./data/trip-bad1.json').should.not.be.validSignalK;
  });
});

describe('Trip data is invalid-bad key', function() {
  it("full tree is valid", function() {
    require('./data/trip-bad2.json').should.not.be.validSignalK;
  });
});

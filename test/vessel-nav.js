var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Vessel in the full tree - basic nav', function() {
  it("Sample full tree is valid", function() {
    require('./data/vessel-nav.json').should.be.validSignalK;
  });
});

describe('Vessel in the full tree - bad mmsi', function() {
  it("Sample full tree is valid", function() {
    require('./data/vessel-bad-mmsi.json').should.not.be.validSignalK;
  });
});

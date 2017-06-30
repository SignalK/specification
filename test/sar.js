var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('SAR in the full tree - basic position', function() {
  it("Sample full tree is valid", function() {
    require('./data/sar-position.json').should.be.validSignalK;
  });
});

describe('SAR in the full tree - notifications', function() {
  it("Sample full tree is valid", function() {
    require('./data/sar-notifications.json').should.be.validSignalK;
  });
});

describe('SAR in the full tree - bad mmsi', function() {
  it("Sample full tree is valid", function() {
    require('./data/sar-mmsi-bad.json').should.not.be.validSignalK;
  });
});

describe('SAR in the full tree - has sails', function() {
  it("Sample full tree is valid", function() {
    require('./data/sar-sails.json').should.not.be.validSignalK;
  });
});

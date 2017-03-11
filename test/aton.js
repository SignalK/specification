var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Aton in the full tree - basic position', function() {
  it("Sample full tree is valid", function() {
    require('./data/aton-position.json').should.be.validSignalK;
  });
});

describe('Aton in the full tree - size', function() {
  it("Sample full tree is valid", function() {
    require('./data/aton-dimensions.json').should.be.validSignalK;
  });
});

describe('Aton in the full tree - bad mmsi', function() {
  it("Sample full tree is valid", function() {
    require('./data/aton-mmsi-bad.json').should.not.be.validSignalK;
  });
});

describe('Aton in the full tree - has sails', function() {
  it("Sample full tree is valid", function() {
    require('./data/aton-sails.json').should.not.be.validSignalK;
  });
});

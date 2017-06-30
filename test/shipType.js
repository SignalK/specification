var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('shipType in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/shipType.json').should.be.validSignalK;
  });
});

describe('shipType with bad value in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/shipType-bad.json').should.not.be.validSignalK;
  });
});

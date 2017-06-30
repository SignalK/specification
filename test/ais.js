var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Valid Ais in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/ais-source.json').should.be.validSignalK;
  });
});

describe('Invalid ais source in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/ais-invalid-source0.json').should.not.be.validSignalK;
  });
});
describe('Invalid ais source in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/ais-invalid-source28.json').should.not.be.validSignalK;
  });
});

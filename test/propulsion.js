var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Propulsion in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/propulsion.json').should.be.validSignalKVessel;
  });
});

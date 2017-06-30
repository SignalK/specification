var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Tanks in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/tanks.json').should.be.validSignalKVessel;
  });
});

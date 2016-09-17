var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Steering in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/steering.json').should.be.validSignalKVessel;
  });
});

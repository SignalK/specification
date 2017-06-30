var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Temperatures in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/temperatures.json').should.be.validSignalK;
  });
});

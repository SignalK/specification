var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Temperatures in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/temperatures.json').should.be.validSignalK;
  });
});

var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Electrical DC in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/electrical_dc.json').should.be.validSignalK;
  });
});
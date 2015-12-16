var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Propulsion in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('../samples/vessel-time.json').should.be.validSignalK;
  });
});

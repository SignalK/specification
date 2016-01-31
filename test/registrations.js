var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Regitrations in the full tree', function() {
  it("should be valid", function() {
    require('./data/registrations.json').should.be.validSignalK;
  });
});

var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Sources in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/sources.json').should.be.validSignalK;
  });
});

var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Miscellaneous data in the full tree', function() {
  it("should be valid", function() {
    require('./data/miscellaneous.json').should.be.validSignalK;
  });
});

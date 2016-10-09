var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Sails', function() {
  it("sample tree is valid", function() {
    require('./data/sails.json').should.be.validSignalKVessel;
  });
});

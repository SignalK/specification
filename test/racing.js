var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Racing items ok in navigation', function() {
  it("Sample racing data is valid", function() {
    require('./data/racing.json').should.be.validSignalK;
  });
});

var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Racing items ok in navigation', function() {
  it("Sample racing data is valid", function() {
    require('./data/racing.json').should.be.validSignalK;
  });
});

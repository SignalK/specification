var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);



describe('Multiple values', function() {
  it('validates', function() {
    var msg = require('./multiple-values-example.json');
    msg.should.be.validSignalK;
  });
});
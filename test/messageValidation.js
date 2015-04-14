var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Message validation', function() {
  it('Simple subscribe validates', function() {
    var subscribe =  require('../samples/signalk-subscribe');
    subscribe.should.be.validSubscriptionMessage;
  });
});
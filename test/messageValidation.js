var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Message validation', function() {
  it('Simple subscribe validates', function() {
    var subscribe =  require('../samples/signalk-subscribe');
    subscribe.should.be.validSubscriptionMessage;
  });

  it('Simple unsubscribe validates', function() {
    var subscribe =  require('../samples/signalk-unsubscribe');
    subscribe.should.be.validUnsubscriptionMessage;
  });
});
var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);



describe('Delta validation', function() {
  it('Simple path with value is valid and not when modified', function() {
    var msg = {
      context: 'bar',
      updates: [{
        "source": {
          "label": "",
          "type": "NMEA2000",
          "pgn": "127251",
          "src": "204"
        },
        "timestamp": "2013-10-08T15:47:28.263Z",
        "values": [{
          "path": "123",
          "value": 1234
        }]
      }]
    };
    msg.should.be.validSignalKDelta;
    msg.foo = 'bar';
    msg.should.not.be.validSignalKDelta;
  });
});
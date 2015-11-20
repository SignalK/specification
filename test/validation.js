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
          "type": "NMEA0183",
          "sentence": "GLL",
          "talker": "II"
        },
        "timestamp": "2013-10-08T15:47:28.263Z",
        "values": [{
          "path": "a.b.c",
          "value": 1234
        }]
      }]
    };
    msg.should.be.validSignalKDelta;
    msg.foo = 'bar';
    msg.should.not.be.validSignalKDelta;
  });

  it('Object, null, number and boolean values are valid in delta', function() {
    var msg = {
      "updates": [{
        "source": {
          "label": "",
          "type": "NMEA2000",
          "pgn": 129025,
          "src": "160"
        },
        "values": [{
          "path": "navigation.position",
          "value": {
            "longitude": 24.9025173,
            "latitude": 60.039317,
            "source": {
              "label": "",
              "type": "NMEA2000",
              "pgn": "129025",
              "src": "160"
            },
            "timestamp": "2014-08-15-16:00:05.770"
          }
        }]
      }],
      "context": "vessels.123456789"
    };
    msg.should.be.validSignalKDelta;
    msg.updates[0].values[0].value = null;
    msg.should.be.validSignalKDelta;
    msg.updates[0].values[0].value = 1.0;
    msg.should.be.validSignalKDelta;
    msg.updates[0].values[0].value = true;
    msg.should.be.validSignalKDelta;
  });
});
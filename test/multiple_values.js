var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);



describe('Multiple values', function() {
  it('validates', function() {
    var msg = {
      "navigation": {
        "courseOverGroundTrue": {
          "value": 102.29,
          "source": "options.actisense-115-129026",
          "options": {
            "nmea1-GP-RMC": {
              "value": 99.2900009155,
              "source": "/dev/ttyUSB1",
              "timestamp": "2014-08-15-16:00:00.081",
            },
            "nmea0-GP-RMA": {
              "value": 99.90234,
              "source": "/dev/ttyUSB0",
              "timestamp": "2014-08-15-16:00:00.081",
            },
            "actisense-115-129026": {
              "value": 102.29,
              "source": "/dev/actisense",
              "timestamp": "2014-08-15-16:00:01.083",
              "src": "115",
              "pgn": "129026"
            },
            "actisense-201-130577": {
              "value": 102.29,
              "source": "/dev/actisense",
              "timestamp": "2014-08-15-16:00:00.085",
              "src": "201",
              "pgn": "130577"
            }
          }
        }
      }
    }
    msg.should.be.validSignalK;
  });
});
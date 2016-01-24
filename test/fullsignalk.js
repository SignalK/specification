var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

var FullSignalK = require('../src/fullsignalk');



describe('FullSignalK', function() {
  it('Delta with object value should produce full tree leaf without the .value', function() {
    var delta = {
      "updates": [{
        "source": {
          "label": "n2kFromFile",
          "type": "NMEA2000",
          "pgn": 129038,
          "src": "43"
        },
        "timestamp": "2014-08-15-19:03:21.532",
        "values": [{
          "path": "navigation.speedOverGround",
          "value": 7.09
        }, {
          "path": "navigation.courseOverGroundTrue",
          "value": 4.8171
        }, {
          "path": "navigation.position",
          "value": {
            "longitude": 25.4398883,
            "latitude": 59.969895
          }
        }]
      }],
      "context": "vessels.foo"
    };
    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(delta);
    fullSignalK.retrieve().vessels.foo.navigation.position.should.have.property('longitude');
  })

  it('Two deltas from different sources results in values structure', function() {
    var delta = {
      "updates": [{
        "source": {
          "label": "n2kFromFile",
          "type": "NMEA2000",
          "pgn": 129038,
          "src": "43"
        },
        "timestamp": "2014-08-15-19:03:21.532",
        "values": [{
          "path": "navigation.speedOverGround",
          "value": 7.09
        }]
      }],
      "context": "vessels.foo"
    };
    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(delta);
    delta.updates[0].source.src = 48;
    delta.updates[0].values[0].value = 8;
    fullSignalK.addDelta(delta);
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.should.have.property('value', 8);
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.values['n2kFromFile.43'].should.have.property('value', 7.09);
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.values['n2kFromFile.48'].should.have.property('value', 8);
  })



})

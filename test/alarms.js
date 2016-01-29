var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Alarms in the full tree', function() {
  it("should be valid", function() {
    require('./data/alarms.json').should.be.validSignalK;
  });
  //and work deeply embedded
  it("should be valid for deep keys", function() {
    require('./data/alarms-deep.json').should.be.validSignalK;
  });
  //must use enum
  it("should use alarmState enum", function() {
    require('./data/alarms-invalid1.json').should.not.be.validSignalK;
  });
  it("should use alarmMethod array with enum", function() {
    require('./data/alarms-invalid2.json').should.not.be.validSignalK;
  });
});

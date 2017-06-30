var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Notifications in the full tree', function() {
  it("should be valid", function() {
    require('./data/alarms.json').should.be.validSignalK;
  });
  //and work deeply embedded
  it("should be valid for deep keys", function() {
    require('./data/alarms-deep.json').should.be.validSignalK;
  });
  //or shallow embedded
  it("should be valid for shallow keys", function() {
    require('./data/alarms-shallow.json').should.be.validSignalK;
  });
  //and work with multiple alarms at multiple levels
  it("should be valid with multiple alarms at multiple levels", function() {
    require('./data/alarms-comprehensive.json').should.be.validSignalK;
  });
  //they should allow branches with names similar to mob etc
  it("they should allow branches with names similar to mob etc", function() {
    require('./data/alarms-allowablenames.json').should.be.validSignalK;
  });
  //must use alarmState enum
  it("must use alarmState enum", function() {
    require('./data/alarms-invalid1.json').should.not.be.validSignalK;
  });
  //must use alarmMethod enum
  it("must use alarmMethod array with enum", function() {
    require('./data/alarms-invalid2.json').should.not.be.validSignalK;
  });
  //must not have sub trees beneath well-defined notifications
  it("must not have sub trees beneath well-defined notifications", function() {
    require('./data/alarms-invalid3.json').should.not.be.validSignalK;
  });
  //must not have dot notation in branch names
  it("must not have dot notation in branch names", function() {
    require('./data/alarms-invalid4.json').should.not.be.validSignalK;
  });
  //must not have have spaces in branch names
  it("must not have have spaces in branch names", function() {
    require('./data/alarms-invalid5.json').should.not.be.validSignalK;
  });
  //must not have incorrectly spelled keys
  it("must not have incorrectly spelled keys", function() {
    require('./data/alarms-invalid6.json').should.not.be.validSignalK;
  });
  //must not use well-defined notifications at deep levels
  it("must not use well-defined notifications at deep levels", function() {
    require('./data/alarms-invalid7.json').should.not.be.validSignalK;
  });
  //must not have additional keys in notifications
  it("must not have additional keys in notifications", function() {
    require('./data/alarms-invalid8.json').should.not.be.validSignalK;
  });
  //must use array of states not string
  it("must use array of states not string", function() {
    require('./data/alarms-invalid9.json').should.not.be.validSignalK;
  });
});

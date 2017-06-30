var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Course data in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/course.json').should.be.validSignalK;
  });
});

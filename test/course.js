var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Course in the full tree', function() {
  it("should be valid", function() {
    require('./data/course.json').should.be.validSignalK;
  });
});

describe('Partial course in the full tree', function() {
  it("should be valid", function() {
    require('./data/course-partial.json').should.be.validSignalK;
  });
});

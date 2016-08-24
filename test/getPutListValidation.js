var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Get/Put/List Message validation', function() {

  it('Simple get validates', function() {
    var getPutList =  require('../samples/signalk-get');
    getPutList.forEach(function(delta) {
      delta.should.be.validGetPutListMessage;
    })
  });

  it('Simple put validates', function() {
    var getPutList =  require('../samples/signalk-put');
    getPutList.forEach(function(delta) {
      delta.should.be.validGetPutListMessage;
    })
  });
  
   it('Simple list validates', function() {
    var getPutList =  require('../samples/signalk-list');
    getPutList.forEach(function(delta) {
      delta.should.be.validGetPutListMessage;
    })
  });
   
   it('Simple getPutList validates', function() {
    var getPutList =  require('../samples/signalk-getPutList');
     getPutList.forEach(function(delta) {
      delta.should.be.validGetPutListMessage;
    })
  });

   //bad
   it('Bad get fails', function() {
    var getPutList =  require('../samples/signalk-getBad');
     getPutList.forEach(function(delta) {
     		 delta.should.not.be.validGetPutListMessage;
    })
  });
  	
  it('Bad list fails', function() {
    var getPutList =  require('../samples/signalk-listBad');
     getPutList.forEach(function(delta) {
     		 delta.should.not.be.validGetPutListMessage;
    })
  });
  
  it('Bad put fails', function() {
    var getPutList =  require('../samples/signalk-putBad');
     getPutList.forEach(function(delta) {
     		 delta.should.not.be.validGetPutListMessage;
    })
  });
});
var chai = require('chai'); chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Samples', function() {

  describe('full', function() {
    getFiles('./samples/full').forEach(function(file) {
      it(file, function() {
        require('../samples/full/' + file).should.be.validSignalK;
      });
    })
  });
  
  describe('delta', function() {
    getFiles('./samples/delta').forEach(function(file) {
      it(file, function() {
        require('../samples/delta/' + file).should.be.validSignalKDelta;
      });
    })
  });
  
  describe('subscribe', function() {
    getFiles('./samples/subscribe').forEach(function(file) {
      it(file, function() {
        require('../samples/subscribe/' + file).should.be.validSubscribeMessage;
      });
    })
  });
  
  describe('unsubscribe', function() {
    getFiles('./samples/unsubscribe').forEach(function(file) {
      it(file, function() {
        require('../samples/unsubscribe/' + file).should.be.validUnsubscribeMessage;
      });
    })
  });
  
  describe('discovery', function() {
    getFiles('./samples/discovery').forEach(function(file) {
      it(file, function() {
        require('../samples/discovery/' + file).should.be.validDiscovery;
      });
    })
  });
  
});

function getFiles(dir, fileList){
  var fs = require('fs');
  fileList = fileList || [];

  var files = fs.readdirSync(dir);
  for(var i in files){
    if (!files.hasOwnProperty(i)) continue;
    var name = dir+'/'+files[i];
    if (!fs.statSync(name).isDirectory()){
      fileList.push(files[i]);
    }
  }
  return fileList;
}
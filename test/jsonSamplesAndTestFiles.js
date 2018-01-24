var assert = require('assert');
var chai = require('chai'); chai.Should();
chai.use(require('@bkp7/schema-js-api').chaiModule);

describe('Samples', function() {

  describe('full', function() {
    getFiles('./samples/full').forEach(function(file) {
      it(file, function() {
        assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
        require('../samples/full/' + file).should.be.validSignalK;
      });
    })
  });
  
  describe('delta', function() {
    getFiles('./samples/delta').forEach(function(file) {
      it(file, function() {
        assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
        require('../samples/delta/' + file).should.be.validSignalKDelta;
      });
    })
  });
  
  describe('subscribe', function() {
    getFiles('./samples/subscribe').forEach(function(file) {
      it(file, function() {
        assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
        require('../samples/subscribe/' + file).should.be.validSubscribeMessage;
      });
    })
  });
  
  describe('unsubscribe', function() {
    getFiles('./samples/unsubscribe').forEach(function(file) {
      it(file, function() {
        assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
        require('../samples/unsubscribe/' + file).should.be.validUnsubscribeMessage;
      });
    })
  });
  
  describe('discovery', function() {
    getFiles('./samples/discovery').forEach(function(file) {
      it(file, function() {
        assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
        require('../samples/discovery/' + file).should.be.validDiscovery;
      });
    })
  });
  
});

describe('Unit tests', function() {

  describe('full', function () {
    describe('valid', function () {
      getFiles('./test/data/full-valid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/full-valid/' + file).should.be.validSignalK;
        });
      })
    });
    describe('invalid', function () {
      getFiles('./test/data/full-invalid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/full-invalid/' + file).should.not.be.validSignalK;
        });
      })
    });
  });

  describe('discovery', function () {
    describe('valid', function () {
      getFiles('./test/data/discovery-valid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/discovery-valid/' + file).should.be.validDiscovery;
        });
      })
    });
    describe('invalid', function () {
      getFiles('./test/data/discovery-invalid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/discovery-invalid/' + file).should.not.be.validDiscovery;
        });
      })
    });
  });

  describe('delta', function () {
    describe('valid', function () {
      getFiles('./test/data/delta-valid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/delta-valid/' + file).should.be.validSignalKDelta;
        });
      })
    });
    describe('invalid', function () {
      getFiles('./test/data/delta-invalid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/delta-invalid/' + file).should.not.be.validSignalKDelta;
        });
      })
    });
  });

  describe('subscribe', function () {
    describe('valid', function () {
      getFiles('./test/data/subscribe-valid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/subscribe-valid/' + file).should.be.validSubscribeMessage;
        });
      })
    });
    describe('invalid', function () {
      getFiles('./test/data/subscribe-invalid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/subscribe-invalid/' + file).should.not.be.validSubscribeMessage;
        });
      })
    });
  });

  describe('unsubscribe', function () {
    describe('valid', function () {
      getFiles('./test/data/unsubscribe-valid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/unsubscribe-valid/' + file).should.be.validUnsubscribeMessage;
        });
      })
    });
    describe('invalid', function () {
      getFiles('./test/data/unsubscribe-invalid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/unsubscribe-invalid/' + file).should.not.be.validUnsubscribeMessage;
        });
      })
    });
  });

  describe('vessel', function () {
    describe('valid', function () {
      getFiles('./test/data/vessel-valid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/vessel-valid/' + file).should.be.validSignalKVessel;
        });
      })
    });
    describe('invalid', function () {
      getFiles('./test/data/vessel-invalid').forEach(function (file) {
        it(file, function () {
          assert.equal(file.indexOf(' '), -1, "spaces are not permitted in file names");
          require('../test/data/vessel-invalid/' + file).should.not.be.validSignalKVessel;
        });
      })
    });
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
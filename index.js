function chaiAsPromised(chai, utils) {
  "use strict";

  var Assertion = chai.Assertion

  console.log('installing');
  Assertion.addProperty('validSignalK', function () {    
    console.log('asserting');
    var result = validate(this._obj);
    var message = result.errors.length === 0 ? '' : result.errors[0].message + ':' + result.errors[0].dataPath + 
      ' (' + (result.errors.length-1) + ' other errors not reported here)';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK'
      );
  });  
}

function validate(tree) {
  var tv4 = require('tv4');
  var signalkSchema = require('./schemas/signalk.json');
  var vesselSchema = require('./schemas/vessel.json');
  tv4.addSchema('https://signalk.github.io/specification/schemas/vessel.json', vesselSchema);
  var definitions = require('./schemas/definitions.json');
  tv4.addSchema('https://signalk.github.io/specification/schemas/definitions.json', definitions);

  ['navigation', 'environment', 'propulsion', 'resources', 'sensors', 'steering', 'tanks'].forEach(function(name) {
    var subSchema = require('./schemas/groups/' + name + '.json');
    tv4.addSchema('https://signalk.github.io/specification/schemas/groups/' + name + '.json', subSchema);
  });

  var validTree = {
    vessels: {
      '230099999': tree
    }
  }
  var valid = tv4.validateMultiple(validTree, signalkSchema, true, true);
  return valid;
}

module.exports.validate = validate;
module.exports.chaiModule = chaiAsPromised;

#!/usr/bin/env node

var _ = require('lodash');


var subSchemas = require('..').subSchemas;
subSchemas.definitions = require('../schemas/definitions.json');




var data = {};

_.forOwn(subSchemas, function(schema, schemaName) {
//   if (schemaName === 'electrical') {
  extractUnits(data, schemaName, schema, schema);
//    }
})

console.log(JSON.stringify(data, null, 2));

function extractUnits(result, pathPrefix, element, schema) {
  _.forOwn(element, function(value, key) {
//    console.log(pathPrefix + " " + key + " = " + value)
    if (key === '$ref') {
      value = getDefinition(value, schema);
    }
    if (value && value.units && key != 'definitions') {
      result[pathPrefix + '.' + key] = {
        description: value.description,
        units: value.units
      };
      extractUnits(result, pathPrefix + '.' + key, value, schema);
    } else if (typeof value === 'object') {
      if (key === 'definitions' || key === 'timestamp') {
        return
      } else if (key === 'allOf') {
        extractUnits(result, pathPrefix, allOf(value, schema), schema);
      } else if (key === '$ref') {
        extractUnits(result, pathPrefix, value, schema);
      } else if (key === 'patternProperties') {
        _.forOwn(value, function(value, key) {
          extractUnits(result, pathPrefix + ".*", value, schema);
        })
      } else if (key === 'properties') {
        extractUnits(result, pathPrefix, value, schema);
      } else {
        extractUnits(result, pathPrefix + '.' + key, value, schema);
      }
    }
  })
}

function allOf(allOfArray, schema) {
  var elements = allOfArray.map(function(element){
    if (element['$ref']) {
      return getDefinition(element['$ref'], schema)
    }
    return element
  });
  var merged = elements.reduce(function(acc, element){
    _.merge(acc, element);
    return acc;
  }, {});
  return merged;
}

function getDefinition(reference, schema) {
  if (reference.startsWith('#/definitions/')) {
    try {
      return schema.definitions[reference.slice(14)];
    } catch (e) {
      console.error("No such definition:" + reference);
      return {};
    }
  } else if (reference.startsWith('../definitions.json#/definitions/')) {
    try {
      return subSchemas.definitions.definitions[reference.slice(33)]
    } catch (e) {
      console.error("No such definition:" + reference);
      return {};
    }
  } else {
    console.error("No such definition:" + reference);
    return {};
  }
}

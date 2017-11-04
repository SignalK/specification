'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require("lodash");

/*
 * Credit for these function goes to @tkurki
 */

var addToTree = function addToTree(pathValue, source, tree) {
  var result = {};
  var temp = tree;
  var parts = msg.path.split('.');
  for (var i = 0; i < parts.length - 1; i++) {
    temp[parts[i]] = {};
    temp = temp[parts[i]];
  }
  temp[parts[parts.length - 1]] = msg;
  return result;
};

function addAsNested(pathValue, source, timestamp, result) {
  var temp = result;
  var parts = pathValue.path.split('.');
  for (var i = 0; i < parts.length - 1; i++) {
    if (typeof temp[parts[i]] === 'undefined') {
      temp[parts[i]] = {};
    }
    temp = temp[parts[i]];
  };

  //mapping produced an object like {latitude:...,longitude:...}
  if (_typeof(pathValue.value) === 'object') {
    temp[parts[parts.length - 1]] = pathValue.value;
    temp[parts[parts.length - 1]].source = source;
    temp[parts[parts.length - 1]].timestamp = timestamp + '';
  } else {
    temp[parts[parts.length - 1]] = {
      value: pathValue.value,
      source: _.clone(source),
      timestamp: timestamp + ''
    };
    delete temp[parts[parts.length - 1]].source.timestamp;
  }
}

function valuesToSubTree(delta) {
  var valueTree = {};
  var timestamp = delta.updates[0].source.timestamp;
  delta.updates[0].values.forEach(function (pathValue) {
    addAsNested(pathValue, delta.updates[0].source, timestamp, valueTree);
  });
  return valueTree;
}

function deltaToNested(delta) {
  var result = {};
  var contextPointer = result;
  var pathPropertyNames = delta.context.split('.');
  for (var i = 0; i < pathPropertyNames.length - 1; i++) {
    contextPointer[pathPropertyNames[i]] = {};
    contextPointer = contextPointer[pathPropertyNames[i]];
  };
  contextPointer[pathPropertyNames[pathPropertyNames.length - 1]] = valuesToSubTree(delta);
  return result;
}

module.exports.deltaToNested = deltaToNested;
/*
 * Copyright 2016, Teppo Kurki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var _ = require('lodash');
var signalkSchema = require('./');
var getId;
var debug = require('debug')('signalk:fullsignalk');


function FullSignalK(id, type, defaults) {
  //hack, apparently not available initially, so need to set lazily
  getId = signalkSchema.getSourceId;

  this.root = {
    vessels: {},
    self: id,
    version: "0.1.0" // Should we read this from the package.json file?
  };
  if(id) {
    this.root.vessels[id] = defaults && defaults.vessels && defaults.vessels.self ? defaults.vessels.self : {};
    this.self = this.root.vessels[id];
    signalkSchema.fillIdentity(this.root)
    this.root.self = 'vessels.' + id
  }
  this.sources = {};
  this.root.sources = this.sources;
  this.lastModifieds = {};
}

require("util").inherits(FullSignalK, require("events").EventEmitter);

FullSignalK.prototype.retrieve = function() {
  return this.root;
}

FullSignalK.prototype.addDelta = function(delta) {
  this.emit('delta', delta);
  var context = findContext(this.root, delta.context);
  this.addUpdates(context, delta.context, delta.updates);
  this.updateLastModified(delta.context);
};

FullSignalK.prototype.updateLastModified = function(contextKey) {
  this.lastModifieds[contextKey] = new Date().getTime();
}

FullSignalK.prototype.pruneContexts = function(seconds) {
  var threshold = new Date().getTime() - seconds * 1000;
  for (let contextKey in this.lastModifieds) {
    if (this.lastModifieds[contextKey] < threshold) {
      this.deleteContext(contextKey);
      delete this.lastModifieds[contextKey];
    }
  }
}

FullSignalK.prototype.deleteContext = function(contextKey) {
  debug("Deleting context " + contextKey);
  var pathParts = contextKey.split('.');
  if(pathParts.length === 2) {
    delete this.root[pathParts[0]][pathParts[1]];
  }
}

function findContext(root, contextPath) {
  var context = _.get(root, contextPath);
  if(!context) {
    context = {};
    _.set(root, contextPath, context);
  }
  var identity = contextPath.split('.')[1];
  if(!identity) {
    return undefined;
  }
  signalkSchema.fillIdentityField(context, identity);
  return context;
}

FullSignalK.prototype.addUpdates = function(context, contextPath, updates) {
  var len = updates.length;
  for (var i = 0; i < len; ++i) {
    this.addUpdate(context, contextPath, updates[i]);
  }
}

FullSignalK.prototype.addUpdate = function(context, contextPath, update) {
  if (typeof update.source != 'undefined') {
    this.updateSource(context, update.source, update.timestamp);
  } else if(typeof update['$source'] != 'undefined') {
    this.updateDollarSource(context, update['$source'], update.timestamp);
  } else {
    console.error("No source in delta update:" + JSON.stringify(update));
  }
  if ( update.values ) {
    addValues(context, contextPath, update.source || update['$source'], update.timestamp, update.values);
  }
  if ( update.meta ) {
    addMetas(context, contextPath, update.source || update['$source'], update.timestamp, update.meta);
  }
}

FullSignalK.prototype.updateDollarSource = function(context, dollarSource, timestamp) {
  const parts = dollarSource.split('.')
  parts.reduce((cursor, part) => {
    if(typeof cursor[part] === 'undefined') {
      return cursor[part] = {}
    }
    return cursor[part]
  }, this.sources)
}

FullSignalK.prototype.updateSource = function(context, source, timestamp) {
  if(!this.sources[source.label]) {
    this.sources[source.label] = {};
    this.sources[source.label].label = source.label;
    this.sources[source.label].type = source.type;
  }

  if(source.type === 'NMEA2000' || source.src) {
    handleNmea2000Source(this.sources[source.label], source, timestamp);
    return
  }

  if(source.type === 'NMEA0183' || source.sentence) {
    handleNmea0183Source(this.sources[source.label], source, timestamp);
    return
  }

  handleOtherSource(this.sources[source.label], source, timestamp);
}

function handleNmea2000Source(labelSource, source, timestamp) {
  let existing = labelSource[source.src]

  if ( !existing ) {
    existing = labelSource[source.src] = {
      n2k: {
        pgns:{}
      }
    }
  }

  _.assign(existing.n2k, source)
  delete existing.n2k.pgn
  delete existing.n2k.label
  delete existing.n2k.instance
  delete existing.n2k.type

  if(source.instance && !labelSource[source.src][source.instance]) {
    labelSource[source.src][source.instance] = {}
  }
  labelSource[source.src].n2k.pgns[source.pgn] = timestamp
}

function handleNmea0183Source(labelSource, source, timestamp) {
  var talker = source.talker || 'II';
  if(!labelSource[talker]) {
    labelSource[talker] = {
      talker: talker,
      sentences: {}
    };
  }
  labelSource[talker].sentences[source.sentence] = timestamp
}

function handleOtherSource(sourceLeaf, source, timestamp) {
  sourceLeaf.timestamp = timestamp;
}

function addValues(context, contextPath, source, timestamp, pathValues) {
  var len = pathValues.length;
  for (var i = 0; i < len; ++i) {
    addValue(context, contextPath, source, timestamp, pathValues[i]);
  }
}

function addValue(context, contextPath, source, timestamp, pathValue) {
  let errMessage = ""
  if(_.isUndefined(pathValue.path)){
    errMessage += "path"
  }

  if(_.isUndefined(pathValue.value)){
    errMessage += errMessage.length > 0 ? " and value" : "value"
  }

  if(errMessage.length > 0){
    errMessage = "Delta is missing " + errMessage + " in " + JSON.stringify(pathValue)
    errMessage += " from source " + JSON.stringify(source)

    console.error(errMessage);
    return;
  }

  var valueLeaf;
  if(pathValue.path.length === 0) {
    _.merge(context, pathValue.value)
    return
  } else {
    const splitPath = pathValue.path.split('.');
    valueLeaf = splitPath.reduce(function(previous, pathPart, i) {
        if (!previous[pathPart]) {
          previous[pathPart] = {};
        }
      if ( i === splitPath.length-1 && typeof previous[pathPart].value === 'undefined' ) {
          let meta = signalkSchema.internalGetMetadata(contextPath + '.' + pathValue.path)
          if (meta) {
            _.assign(meta, previous[pathPart].meta)
            previous[pathPart].meta = meta
          }
        }
      return previous[pathPart];
    }, context);
  }

  if(valueLeaf.values) { //multiple values already
    var sourceId = getId(source);
    if(!valueLeaf.values[sourceId]) {
      valueLeaf.values[sourceId] = {};
    }
    assignValueToLeaf(pathValue.value, valueLeaf.values[sourceId]);
    valueLeaf.values[sourceId].timestamp = timestamp;
    setMessage(valueLeaf.values[sourceId], source);
  } else if(typeof valueLeaf.value != "undefined" && valueLeaf['$source'] != getId(source)) {
    // first multiple value

    var sourceId = valueLeaf['$source'];
    var tmp = {};
    copyLeafValueToLeaf(valueLeaf, tmp);
    valueLeaf.values = {};
    valueLeaf.values[sourceId] = tmp;
    valueLeaf.values[sourceId].timestamp = valueLeaf.timestamp;

    sourceId = getId(source);
    valueLeaf.values[sourceId] = {};
    assignValueToLeaf(pathValue.value, valueLeaf.values[sourceId]);
    valueLeaf.values[sourceId].timestamp = timestamp;
    setMessage(valueLeaf.values[sourceId], source);
  }
  assignValueToLeaf(pathValue.value, valueLeaf);
  if(pathValue.path.length != 0) {
    valueLeaf['$source'] = getId(source);
    valueLeaf.timestamp = timestamp;
    setMessage(valueLeaf, source);
  }
}

function copyLeafValueToLeaf(fromLeaf, toLeaf) {
  _.assign(toLeaf, _.omit(fromLeaf, ['$source', 'timestamp', 'meta']));
}

function assignValueToLeaf(value, leaf) {
  leaf.value = value;
}

function setMessage(leaf, source) {
  if(!source) {
    return;
  }
  if(source.pgn) {
    leaf.pgn = source.pgn;
    delete leaf.sentence;
  }
  if(source.sentence) {
    leaf.sentence = source.sentence;
    delete leaf.pgn;
  }
}

function addMetas(context, contextPath, source, timestamp, metas) {
  metas.forEach(metaPathValue => addMeta(context, contextPath, source, timestamp, metaPathValue))
}

function addMeta(context, contextPath, source, timestamp, pathValue) {
  if (_.isUndefined(pathValue.path) || _.isUndefined(pathValue.value)) {
    console.error("Illegal value in delta:" + JSON.stringify(pathValue));
    return;
  }
  signalkSchema.addMetaData(contextPath, pathValue.path, pathValue.value)
}


module.exports = FullSignalK;

#!/usr/bin/env node
'use strict'

const skApi = require('@bkp7/schema-js-api')
const fs = require('mz/fs')
const path = require('path')

new skApi.Parser({
  entry: './schemas/signalk.json',
  done: function(result) {
    fs.writeFileSync(path.join(__dirname, '../gitbook-docs/vesselsBranch.md'), result.vesselsDoc)
    fs.writeFileSync(path.join(__dirname, '../gitbook-docs/otherBranches.md'), result.othersDoc)
  }
});
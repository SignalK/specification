#!/usr/bin/env node

'use strict'

const Parser = require('signalk-documentation-generator')
const path = require('path')

new Parser({
  definitions: './schemas/definitions.json',
  entry: './schemas/signalk.json',
  output: './gitbook-docs/keys'
})

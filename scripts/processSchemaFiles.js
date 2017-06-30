#!/usr/bin/env node
'use strict'

/*
 * Copyright 2016 Fabian Tollenaar <fabian@decipher.industries>
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
*/

const _ = require('lodash')
const fs = require('mz/fs')
const path = require('path')
const rimraf = require('rimraf')
const markdown = new (require('markdown-it'))()
const RefParser = require('json-schema-ref-parser')


const units = {
  "A": "Ampere",
  "C": "Coulomb",
  "Hz": "Hertz",
  "ISO-8601 (UTC)": "ISO-8601 string representation of time in Universal Time Coordinated",
  "J": "Joule",
  "K": "Kelvin",
  "Pa": "Pascal",
  "V": "Volt",
  "W": "Watt",
  "deg": "Degree",
  "kg": "Kilogram",
  "m": "Meter",
  "m/s": "Meters per second",
  "m2": "Square meter",
  "m3": "Cubic meter",
  "m3/s": "Cubic meter per second",
  "rad": "Radian",
  "rad/s": "Radian per second",
  "ratio": "Ratio",
  "s": "Second"
}

class Parser {
  constructor (opts) {
    this.options = _.defaults(opts, {
      entry: './schema/signalk.json',
      output: './build',
      debug: false,
      cwd: process.cwd(),
      encoding: 'utf-8',
      done: () => {}
    })

    this.debug = () => {}
    this.tree = {}
    this.docs = {}
    this.invalid = []

    this.parseOptions()
    this.parse()
  }

  parse () {
    this
    .rm(this.options.output) // remove build directory
    .then(() => fs.mkdir(this.options.output)) // create a new build directory
    .then(() => fs.mkdir(path.join(this.options.output, 'html')))
    .then(() => {
      return RefParser.dereference(this.options.entry)
    })

    /*
     * Start parsing of properties at root (signalk.json)
     */
    .then(root => {
      return this.parseProperties('/', root)
    })

    /*
     * If debug is set to true, write all paths to a JSON file.
     */
    .then(result => {
      if (this.options.debug === false) {
        return result
      }

      let keys = Object.keys(this.tree).sort()

      return fs
      .writeFile(path.join(this.options.output, 'paths.json'), JSON.stringify(keys, null, 2), this.options.encoding)
      .then(_ => {
        this.debug(`Written a list of paths to ${path.join(this.options.output, 'paths.json')}.`)
        return result
      })
    })

    /*
     * If debug is set to true, write the raw tree to a JSON file.
     */
    .then(result => {
      if (this.options.debug === false) {
        return result
      }

      const safeTree = _.pick(this.tree, value => {
        try {
          JSON.stringify(value)
        } catch(e) {
          return false
        }
        return true
      })

      return fs
      .writeFile(path.join(this.options.output, 'tree.json'), JSON.stringify(safeTree, null, 2), this.options.encoding)
      .then(() => {
        this.debug(`Written total tree to ${path.join(this.options.output, 'tree.json')}`)
        return result
      })
    })

    /*
     * Replace RegExp's in the path name with <RegExp> for readability and generate a documentation object for each file
     */
    .then(result => {
      Object.keys(this.tree).forEach(path => {
        if (!_.isObject(this.tree[path])) {
          return
        }

        const splitpath = path.split('/')
        const subtree = this.tree[path]
        const node = splitpath[splitpath.length - 1]

        for (let i in splitpath) {
          if (splitpath[i].indexOf('^') !== -1 || splitpath[i].indexOf('$') > 0 || splitpath[i].indexOf('*') !== -1) {
            splitpath[i] = '<RegExp>'
          }
        }

        const skipFields = ['timestamp', '$source', 'source', '_attr', 'meta', 'pgn', 'sentence', 'value', 'values']
        const embeddedFields =
          !this.tree[`${path}/timestamp`] ? {} :
            _.pick(subtree.properties ? _.omit(subtree.properties || {}, skipFields) : {}, (value, key) => {
              return !this.tree[`${path}/${key}/timestamp`]
            })

        const documentation = {
          node: node,
          path: path,
          path_normalised: splitpath.join('/'),
          regexp: false,
          title: node,
          subtitle: typeof subtree.title !== 'undefined' ? subtree.title : null,
          type: typeof subtree.type !== 'undefined' ? subtree.type : null,
          description: typeof subtree.description !== 'undefined' ? subtree.description : null,
          example: typeof subtree.example !== 'undefined' ? subtree.example : null,
          json: subtree,
          embeddedFields: Object.keys(embeddedFields).length > 0 ? embeddedFields : undefined
        }
        if (subtree.enum) {
          documentation.enum = subtree.enum
        }

        if (node.indexOf('^') !== -1 || node.indexOf('$') > 0 || node.indexOf('*') !== -1) {
          splitpath[splitpath.length - 1] = '<RegExp>'
          documentation.regexp = true
        }

        if (typeof subtree.type === 'undefined') {
          this.invalid.push(splitpath.join('/'))
        }

        this.docs[splitpath.join('/')] = documentation
      })

      return this.docs
    })

    /*
     * Normalise the path name to use as file name and write a Markdown-formatted file to disk
     */
    .then(() => {
      const promises = Object.keys(this.docs).map(p => {
        const doc = this.docs[p]
        const fn = (`${p.replace(/\//g, '.')}`).replace(/<|>/g, '__').replace(/^\./, '')

        // return fs
        // .writeFile(path.join(this.options.output, `${fn}.md`), this.generateMarkdown(doc), this.options.encoding)
        // .then(() => {
          return {
            path: p,
            name: `${fn}.md`,
            file: path.join(this.options.output, `${fn}.md`)
          }
        // })
      })

      return Promise.all(promises)
    })

    /*
     * Generate an index in Markdown, pass on results of markdown file creation.
     */
    .then(results => {
      const filenames = {}
      const filter = ['/timestamp', '/$source', '/source', '/_attr', '/meta', '/pgn', '/sentence', '/value', '/values']

      results.forEach(result => {
        filenames[result.name] = result.path
      })

      const keysWithMeta = {}

      let vesselsDoc = ""
      let othersDoc = ""

      let md = '# Signal K Data Model Reference\n\n'

      md += 'This document is meant as the human-oriented reference to accompany the actual JSON Schema specification and is produced from the schema files. Any changes to the reference material below should be made to the original schema files.\n\n'

      md += "Signal K uses [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) almost everywhere, with the exception of geographic coordinates. The following units are in use:\n"

      _.forOwn(units, (value, key) => {
        md += `- ${key} : ${value}\n`
      })
      md += "\n## Keys\n"

      Object.keys(filenames).forEach(fn => {
        let valid = true
        filter.forEach(f => {
          if (filenames[fn].indexOf(f) !== -1) {
            valid = false
          }
        })
        if (!valid) {
          return
        }

        md = fn.split('.')[0] === 'vessels' ? vesselsDoc : othersDoc
        const path = filenames[fn]
        const doc = this.docs[path]

        function isEmbedded(path) {
          if (this.docs[`${path}/timestamp`]) {
            return false
          }
          const parts = path.split('/').filter(x => x.length > 0)
          let soFar = ""
          let result = false
          parts.forEach(part => {
            soFar = soFar + "/" + part
            result = result || !!this.docs[soFar + '/timestamp']
          })
          return result
        }

        let json = doc.json

        const key = path.replace(/</g, '').replace(/>/g, '').replace('RegExp', '*')
        keysWithMeta[key] = {
          units: json.units,
          description: doc.description === null ? '[missing]' : doc.description
        }


        if (isEmbedded.bind(this)(path)) {
          this.debug("Skipping embedded", path)
          return
        }

        // md += `### [${path.replace(/</g, '&lt;').replace(/>/g, '&gt;')}](http://signalk.org/specification/master/keys/html/${fn.replace('.md', '.html')})\n\n`
        md += `#### ${path.replace(/</g, '&lt;').replace(/>/g, '&gt;')}\n\n`

        if (doc.subtitle !== null) {
          md += `**Title:** ${doc.subtitle}\n\n`
        }

        if (json !== null && typeof json.units === 'string') {
          md += `**Units:** ${json.units} (${units[json.units]})\n\n`
        }

        md += '**Description:** '
        md += (doc.description === null ? '[missing]' : doc.description)
        md += '\n\n'

        if (doc.enum) {
          md += '**Enum values:**\n\n'
          doc.enum.forEach(enumValue => md += `* ${enumValue}\n`)
          md += '\n'
        }

        function renderField(key, field, baseIndent) {
          const descString = field.description ? ` (${field.description})` : ''
          const unitString = field.units ? `, units: ${field.units} (${units[field.units]})` : ''
          const enumString = field.enum ? `, enum:\n\n${field.enum.map(x => `${baseIndent}  * ${x}\n`).join('')}` : ''
          md += `${baseIndent}* ${key}${descString}${unitString}${enumString}\n`
          if (field.properties) {
            md += '\n'
            const subKeys = Object.keys(field.properties)
            subKeys.forEach(subKey => renderField(subKey, field.properties[subKey], baseIndent + "  "))
          }
        }

        if (doc.embeddedFields) {
          md += '**Fields:**\n\n'
          Object.keys(doc.embeddedFields).forEach(key => {
            const field = doc.embeddedFields[key]
            renderField(key, field, "")
          })
          md += '\n'
        }

        md += '---\n\n'

        if (fn.split('.')[0] === 'vessels') {
          vesselsDoc = md
        } else {
          othersDoc = md
        }
      })

      fs.writeFileSync(path.join(__dirname, '../src/keyswithmetadata.json'), JSON.stringify(keysWithMeta, null, 2))
      fs.writeFileSync(path.join(__dirname, '../gitbook-docs/vesselsBranch.md'), vesselsDoc)
      fs.writeFileSync(path.join(__dirname, '../gitbook-docs/otherBranches.md'), othersDoc)
    })

    /*
     * Parse all .md files to HTML in the {OUTPUT}/html folder (@HACK for gitbook)
     */
/*
    .then(results => {
      return Promise
      .all(results.map(item => {
        return this.renderMarkdownFile(item.name)
      }))
      .then(() => {
        return results.map(item => {
          item.html = `html/${item.name.replace('.md', '.html')}`
          return item
        })
      })
    })
*/

    /*
     * Print a report to stdout and exit the program.
     */
    .then(results => {
      if (typeof this.options.done === 'function') {
        this.options.done(results)
      }

      process.exit(0)
    })
    .catch(err => {
      console.error(err.message)
      console.error(err.stack)
      process.exit(1)
    })
  }

  renderMarkdownFile (fn) {
    return fs
    .readFile(path.join(this.options.output, fn), 'utf-8')
    .then(md => {
      return markdown.render(md)
    })
    .then(html => {
      return fs.writeFile(path.join(this.options.output, 'html', fn.replace('.md', '.html')), html, 'utf-8')
    })
  }

  generateMarkdown (doc) {
    let md = ''

    md += `## ${doc.path_normalised}\n\n`

    if (doc.subtitle !== null) {
      md += `*${doc.subitle}*\n`
    }

    if (doc.description !== null) {
      md += `${doc.description}\n`
    }

    if (doc.subtitle !== null || doc.description !== null) {
      md += '\n'
    }

    md += `* Type: \`${(typeof doc.type === 'string' ? doc.type : JSON.stringify(doc.type))}\`\n`
    md += `* Path: \`${doc.path}\`\n`
    md += `* Node: \`${doc.node}\`\n\n`

    if (doc.example !== null) {
      md += `### Example:\n`
      md += `\`\`\`\n`
      md += `${doc.example}\n`
      md += `\`\`\`\n\n`
    }

    md += `### Source:\n`
    md += `\`\`\`\n`
    md += `${doc.json}\n`
    md += `\`\`\`\n\n`

    md += '---\n'
    return md
  }

  hasProperties (data) {
    return (typeof data === 'object' && data !== null && (typeof data.properties !== 'undefined' || typeof data.patternProperties !== 'undefined'))
  }

  parseProperties (prefix, data) {
    if (prefix.charAt(prefix.length - 1) === '/') {
      prefix = prefix.replace(/\/+$/, '')
    }
    const splitPrefix = prefix.split("/")
    if (splitPrefix.length > 1 && splitPrefix[splitPrefix.length - 2] === splitPrefix[splitPrefix.length - 1]) {
      delete this.tree[prefix]
      this.debug("Avoiding self recursion at", prefix)
      return
    }

    if (typeof data.properties === 'object' && data.properties !== null) {
      Object.keys(data.properties).forEach(key => {
        this.tree[`${prefix}/${key}`] = data.properties[key]

        if (typeof this.tree[`${prefix}/${key}`] !== 'undefined' && typeof this.tree[`${prefix}/${key}`].allOf !== 'undefined') {
          this.parseAllOf(`${prefix}/${key}`, this.tree[`${prefix}/${key}`].allOf, this.tree[`${prefix}/${key}`] || {})
        }

        if (this.hasProperties(this.tree[`${prefix}/${key}`])) {
          this.parseProperties(`${prefix}/${key}`, this.tree[`${prefix}/${key}`])
        }
      })
    }

    if (typeof data.patternProperties === 'object' && data.patternProperties !== null) {
      Object.keys(data.patternProperties).forEach(key => {
        const target = `${prefix}/${key}`

        this.tree[`${prefix}/${key}`] = data.patternProperties[key]

        if (typeof this.tree[`${prefix}/${key}`] !== 'undefined' && typeof this.tree[`${prefix}/${key}`].allOf !== 'undefined') {
          this.parseAllOf(`${prefix}/${key}`, this.tree[`${prefix}/${key}`].allOf,
            this.tree[`${prefix}/${key}`] || {})
        }

        if (this.hasProperties(this.tree[`${prefix}/${key}`])) {
          this.parseProperties(`${prefix}/${key}`, this.tree[`${prefix}/${key}`])
        }
      })
    }

    return data
  }

  parseAllOf (treePrefix, allOf, baseObject) {
    if (!Array.isArray(allOf)) {
      return
    }

    let readablePrefix = `${treePrefix.split('/')[treePrefix.split('/').length - 2]}/${treePrefix.split('/')[treePrefix.split('/').length - 1]}`

    let temp = this.createAllOfArray(allOf, baseObject)

    this.tree[treePrefix] = this.reduceParsedAllOf(temp)
  }

  createAllOfArray (allOf, baseObject) {
    if (!Array.isArray(allOf)) {
      return {}
    }

    const result = [baseObject].concat(allOf)
    .filter(obj => {
      if (obj === null || typeof obj === 'undefined') {
        return false
      }
      return true
    })
    return result
  }

  reduceParsedAllOf (allOf, result) {
    if (result === null || typeof result !== 'object') {
      result = {}
    }

    allOf.forEach(obj => {
      if (typeof obj !== 'object' || obj === null) {
        return
      }

      Object.keys(obj).forEach(key => {
        if (key !== 'properties' && key !== 'patternProperties' && key !== 'allOf') {
          if (!result[key]) {
            result[key] = obj[key]
          } else if (result[key] !== obj[key]) {
            this.debug("avoiding overriding ", key, ". prev", result[key], ", rejected", obj[key])
          }
        }

        if (key === 'properties') {
          if (typeof result.properties === 'undefined') {
            result.properties = {}
          }

          Object.keys(obj[key]).forEach(k => {
            if (typeof obj[key][k].allOf !== 'undefined') {
              this.reduceParsedAllOf(obj[key][k].allOf, obj[key][k])
            }
            result.properties[k] = _.merge(result.properties[k] || {}, obj[key][k], (objectValue, sourceValue, key, object, source) => {
              if (objectValue && typeof objectValue === "string" && objectValue !== sourceValue) {
                this.debug("avoiding overriding ", key, ". prev", objectValue, ", rejected", sourceValue)
                return objectValue
              }
            })
          })
        }

        if (key === 'patternProperties') {
          if (typeof result.patternProperties === 'undefined') {
            result.patternProperties = {}
          }

          Object.keys(obj[key]).forEach(k => {
            result.patternProperties[k] = obj[key][k]
          })
        }

        if (key === 'allOf') {
          this.reduceParsedAllOf(obj[key], result)
        }
      })
    })

    return result
  }

  parseOptions () {
    this.options.entry = this.options.entry.charAt(0) === '/' ? this.options.entry : path.join(this.options.cwd, this.options.entry)
    this.options.output = this.options.output.charAt(0) === '/' ? this.options.output : path.join(this.options.cwd, this.options.output)
    this.options._definitions = this.options.definitions
    this.options.definitions = this.options.definitions.charAt(0) === '/' ? this.options.definitions : path.join(this.options.cwd, this.options.definitions)

    if (this.options.debug === true) {
      this.debug = require('debug')('signalk-documentation-generator')
    }
  }

  rm (path) {
    return new Promise((resolve, reject) => {
      rimraf(path, (err) => {
        if (err) {
          return reject(err)
        }

        resolve(path)
      })
    })
  }
}

new Parser({
  definitions: './schemas/definitions.json',
  entry: './schemas/signalk.json',
  output: './gitbook-docs/keys'
})

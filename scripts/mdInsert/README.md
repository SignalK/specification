# mdInsert

**mdInsert** is a utility which allows the contents of a file (optionally modified) to be inserted into a markdown file.

The design use case is for a json file which is validated to be schema compliant. All (or optionally parts) of that known valid file can be inserted into md documentation with this utility. By doing this, any examples presented in the documentation, even if they are snippets, will be known to be valid.

## Installation

To run the demo you need to:
- install Node (and npm with it)
- install dependencies with `npm install`


## Demo

`node mdInsert.js docs dist`  will create demo.md in the dist folder. Read that generated file to review the demo. This command will copy/process all files in ./docs (recursively) putting the results in ./dist.

mdInsert processing can also be run from the command line eg:
`node mdInsert [mdInsert -jsonSnippet $..currentRadius](./docs/demo.json)` will show the results of Snipping currentRadius from demo.json.

Details of other command line options are available with:
`node mdInsert -help`

## Example usage:

Simple: ``[mdInsert](../examples/example1.json)`` within a markdown file means insert the contents of the example1.json file here

Part of the file only: ``[mdInsert -jsonSnippet alarm 2](../examples/example1.json)`` will only use the second "alarm" value it finds in the file. This only works if alarm is an array or object. The instance argument (2 in the above) is optional. If omitted, 1 will be assumed.

Abbreviate part of the file: ``[mdInsert -jsonEllipsify alarm](../examples/example1.json)`` will reduce the alarm values down to \[...], {...} or "..." provided alarm is an array, object or string. It will do this for all instances of alarm. Any number of keys can be provided and \['...'] can be used eg. ``[mdInsert -jsonEllipsify alarm position ['something else']](../examples/example1.json)``

Abbreviate part of an object: ``[mdInsert -jsonEllipsify alarm !timestamp]`` This means "ellipsify all instances of alarm but leave the the timestamp key in. This only works when alarm is an object.

Complex: ``[mdInsert -jsonSnippet alarm -jsonEllipsify $ !method !state](../examples/example1.json)`` This extracts the alarm values, then ellipsifies all key value pairs except method and state. Because the Ellipsify operates on the result of Snippet it has to start with the root ($).

Combinations: ``[mdInsert -jsonSnippet vessel -jsonEllipsify alarm position !timestamp !method -jsonEllipsify ['something else'] !timestamp](../examples/example1.json)`` This will extract the first vessel value (assuming its an array or object), then will ellipsify the alarm and position but not timestamp and method (assuming alarm and position are objects). It will then will ellipsify ['something else'], but not the timestamp value

Keys can be identified using either plain text or XPath expressions. eg. `alarm` is equivalent to `$..alarm`. Dot or bracket notation is supported ie. `$.vessels.notifications.mob` is equivalent to `$['vessels'].['notifications'].['mob']`. Keys names which have spaces or start with $, -, or ! need to use the bracket notation. Other XPath notation including filter expressions, and nested expression are also supported, see [jsonpath](https://www.npmjs.com/package/jsonpath) for explanation of all valid pathExpressions.

**Note**: if ``[mdInsert](...)`` is immediately followed by \` it will not be processed. This allows for the documentation of the mdInsert function itself to be created using the md inline code encapsulation \`\`.

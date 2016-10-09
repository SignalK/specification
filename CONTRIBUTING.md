# Some Guidelines to Contributing to the Signal K Specification

## RFC Format

Any substantial changes should take the form of RFC. See the
[very first RFC](https://github.com/SignalK/specification/issues/264)
for an example.

## Include test data and tests

See the [tests](https://github.com/SignalK/specification/tree/master/test) and
[test sample data](https://github.com/SignalK/specification/tree/master/test/data).

Any additions should include some test data that use the proposed changes with
real world data.

Any schema changes should be checked against the existing set of tests:
- install Node (and npm with it)
- install dependencies with `npm install`
- run the tests with `npm test`

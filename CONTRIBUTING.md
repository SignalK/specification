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

## Pull Request and Commit messages

The Signal K change log is generated automatically from Pull Requests and Commits. In order to ensure consistency in the logs the following guide should be followed when submitting Pull Requests (and commits).

#### Subject Line

The subject line should be in the format `<type>: <subject>`

 `<type>` should be one of:

- feat (feature)
- fix (bug fix)
- docs (documentation)
- style (formatting, missing semi colons, ...)
- refactor
- test (when adding missing tests)
- chore (maintain)

`<subject>` 

- use imperative, present tense: "change" not "changed" or "changes"
- don't capitalise the first letter
- no full stop (dot) at the end

##### Examples of good Subject Lines:

`doc: clarify meta.units behaviour`

`chore: update keyswithmetadat.json`

`style: whitespace`

`fix: allow nextPoint to be an intermediate leaf`

`feature: push design object fields under value/values`

#### Message body

Again use imperative, present tense and include motivation for the change and differences to previous behaviour.

#### Message Footer

At the end of the message reference any issues. If the PR should close issue(s) (assuming it is committed), use closes/fixes or resolves and the issue number. eg. "closes #18", "fixes #21 and resolves #23".

### Flattening commits

During development a number of commits may be made which should logically be flattened to a single commit before creating a Pull Request. This aids the understanding and readability of the work done. Multiple commits should be left in place where they cover logically different elements within the Pull Request.

This file contains a todo for the specification. Please treat this the same as the Schema itself: when making changes, make them in a separate branch and only merge into master when discussed with the other contributors. 

TODO
----

- [x] Move sub-objects of the Schema into separate files
- [x] Move sub-object navigation from `vessels.json` into `groups/navigation.json`
- [ ] Move sub-object communication from `vessels.json` into `groups/communication.json`
- [ ] Move sub-object environmental from `vessels.json` into `groups/environmental.json`
- [ ] **Find out if I've used the `$ref` thing correctly**
- [ ] Decide on a versioning system (semver? plain number? time-based?)
- [ ] Check for empty descriptions to every property and object
- [ ] Check for FIXME's
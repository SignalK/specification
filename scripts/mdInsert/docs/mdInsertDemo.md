#Demonstration mdInsert

Scenario:
Assume we have a json file 'demo.json' in the same directory as our markdown file, which for our demonstration purposes conatins valid, but 'ugly' formatted json. All the json inserted in this demo comes from that one file.

If we wish to insert the whole unaltered file into our md document we would use ``[mdInsert](./demo.json)`` which would insert:
```json
[mdInsert](./demo.json)
```
- - -
by comparison ``[mdInsert -json](./demo.json)`` would insert the file, but because mdInsert is now expecting json, it does prettification (as it does with all the other json options):
```json
[mdInsert -json](./demo.json)
```
- - -
``[mdInsert -jsonSnippet $..currentRadius](./demo.json)`` would insert:
```json
[mdInsert -jsonSnippet $..currentRadius](./demo.json)
```
- - -
``[mdInsert -jsonSnippet notifications -jsonEllipsify gnss currentRadius !method !state !message](./demo.json)`` inserts:
```json
[mdInsert -jsonSnippet notifications -jsonEllipsify gnss currentRadius !method !state !message](./demo.json)
```
- - -
``[mdInsert -jsonSnippet navigation -jsonEllipsify gnss !method !state !message -jsonEllipsify currentRadius !$source](./demo.json)`` inserts:
```json
[mdInsert -jsonSnippet navigation -jsonEllipsify gnss !method !state !message -jsonEllipsify currentRadius !$source](./demo.json)
```
- - -
``[mdInsert -jsonEllipsify $ !vessels -jsonDelKeys navigation -jsonEllipsify uuid](./demo.json)`` inserts:
```json
[mdInsert -jsonEllipsify $ !vessels -jsonDelKeys navigation -jsonEllipsify uuid](./demo.json)
```
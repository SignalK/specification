## /resources/notes

*undefined*
A holder for notes about regions, each named with a UUID. Notes might include navigation or cruising info, images, or anything

* Type: `object`
* Path: `/resources/notes`
* Node: `notes`

### Source:
```
{
  "type": "object",
  "title": "notes",
  "description": "A holder for notes about regions, each named with a UUID. Notes might include navigation or cruising info, images, or anything",
  "patternProperties": {
    "^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$": {
      "type": "object",
      "description": "A note about a region, named with a UUID. Notes might include navigation or cruising info, images, or anything",
      "properties": {
        "title": {
          "type": "string",
          "description": "Note's common name"
        },
        "description": {
          "type": "string",
          "description": "A textual description of the note"
        },
        "region": {
          "type": "string",
          "description": "Region related to note. A pointer to a region UUID. Alternative to position or geohash"
        },
        "position": {
          "description": "Position related to note. Alternative to region or geohash",
          "$ref": "../definitions.json#/definitions/position"
        },
        "geohash": {
          "description": "Position related to note. Alternative to region or position",
          "$ref": "../definitions.json#/definitions/geohash"
        },
        "mimeType": {
          "type": "string",
          "description": "MIME type of the note"
        },
        "url": {
          "type": "string",
          "description": "Location of the note"
        },
        "timestamp": {
          "description": "Timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        },
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        }
      }
    }
  }
}
```

---

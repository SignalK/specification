## /vessels/<RegExp>/navigation/anchor

*undefined*
The anchor data, for anchor watch etc

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/anchor`
* Node: `anchor`

### Source:
```
{
  "type": "object",
  "title": "anchor",
  "description": "The anchor data, for anchor watch etc",
  "properties": {
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "Timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "maxRadius": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Radius of anchor alarm boundary. The distance from anchor to the center of the boat",
      "units": "m"
    },
    "currentRadius": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Current distance to anchor",
      "units": "m"
    },
    "position": {
      "description": "The actual anchor position of the vessel in 3 dimensions, probably an estimate at best",
      "allOf": [
        {
          "$ref": "../definitions.json#/definitions/commonValueFields"
        },
        {
          "$ref": "../definitions.json#/definitions/position"
        }
      ]
    }
  }
}
```

---

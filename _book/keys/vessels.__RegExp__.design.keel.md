## /vessels/<RegExp>/design/keel

*undefined*
Information about the vessel's keel

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/design/keel`
* Node: `keel`

### Source:
```
{
  "type": "object",
  "title": "keel",
  "description": "Information about the vessel's keel",
  "properties": {
    "type": {
      "type": "string",
      "description": "The type of keel.",
      "enum": [
        "long",
        "fin",
        "flare",
        "bulb",
        "wing",
        "centerboard",
        "kanting",
        "lifting",
        "daggerboard"
      ]
    },
    "angle": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "A number indicating at which angle the keel currently is (in case of a canting keel), negative to port.",
      "units": "rad"
    },
    "lift": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "In the case of a lifting keel, centreboard or daggerboard, the part of the keel which is extended. 0 is 'all the way up' and 1 is 'all the way down'. 0.8 would be 80% down.",
      "units": "ratio",
      "example": 0.8
    },
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    }
  }
}
```

---

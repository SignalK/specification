## /vessels/<RegExp>/design

*undefined*
An object describing the vessels primary dimensions and statistics.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/design`
* Node: `design`

### Source:
```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.github.io/specification/schemas/groups/design.json#",
  "description": "An object describing the vessels primary dimensions and statistics.",
  "title": "design",
  "properties": {
    "displacement": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "The displacement of the vessel",
      "units": "kg"
    },
    "draft": {
      "type": "object",
      "title": "draft",
      "description": "The draft of the vessel",
      "properties": {
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        },
        "timestamp": {
          "description": "timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        },
        "minimum": {
          "description": "The minimum draft of the vessel",
          "type": "number",
          "units": "m"
        },
        "maximum": {
          "description": "The maximum draft of the vessel",
          "type": "number",
          "units": "m"
        },
        "canoe": {
          "description": "The draft of the vessel without protrusions such as keel, centerboard, rudder",
          "type": "number",
          "units": "m"
        }
      }
    },
    "length": {
      "type": "object",
      "title": "length",
      "description": "The various lengths of the vessel",
      "properties": {
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        },
        "timestamp": {
          "description": "timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        },
        "overall": {
          "type": "number",
          "description": "Length overall",
          "units": "m"
        },
        "hull": {
          "type": "number",
          "description": "Length of hull",
          "units": "m"
        },
        "waterline": {
          "type": "number",
          "description": "Length at waterline",
          "units": "m"
        }
      }
    },
    "keel": {
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
    },
    "beam": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Beam length",
      "units": "m"
    },
    "airHeight": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Total height of the vessel",
      "units": "m"
    },
    "rigging": {
      "type": "object",
      "title": "rigging",
      "description": "Information about the vessel's rigging",
      "properties": {
        "configuration": {
          "type": "string",
          "description": "The configuration of the rigging",
          "example": "sloop"
        },
        "masts": {
          "type": "number",
          "description": "The number of masts on the vessel."
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
  }
}
```

---

## /vessels/<RegExp>/sails/area

An object containing information about the vessels' sails.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/sails/area`
* Node: `area`

### Source:
```
{
  "type": "object",
  "description": "An object containing information about the vessels' sails.",
  "properties": {
    "total": {
      "description": "The total area of all sails on the vessel",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m2"
    },
    "active": {
      "description": "The total area of the sails currently in use on the vessel",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m2"
    }
  }
}
```

---

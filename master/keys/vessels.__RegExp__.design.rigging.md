## /vessels/<RegExp>/design/rigging

*undefined*
Information about the vessel's rigging

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/design/rigging`
* Node: `rigging`

### Source:
```
{
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
```

---

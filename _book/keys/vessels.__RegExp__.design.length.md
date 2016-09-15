## /vessels/<RegExp>/design/length

*undefined*
The various lengths of the vessel

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/design/length`
* Node: `length`

### Source:
```
{
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
}
```

---

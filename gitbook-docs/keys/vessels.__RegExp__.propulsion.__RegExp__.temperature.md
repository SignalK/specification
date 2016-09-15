## /vessels/<RegExp>/propulsion/<RegExp>/temperature

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/temperature`
* Node: `temperature`

### Source:
```
{
  "type": "object",
  "required": [
    "timestamp",
    "$source"
  ],
  "properties": {
    "timestamp": {
      "$ref": "#/definitions/timestamp"
    },
    "$source": {
      "$ref": "#/definitions/sourceRef"
    },
    "_attr": {
      "$ref": "#/definitions/_attr"
    },
    "meta": {
      "$ref": "#/definitions/meta"
    },
    "pgn": {
      "type": "number"
    },
    "sentence": {
      "type": "string"
    },
    "value": {
      "type": "number"
    },
    "values": {
      "type": "object",
      "patternProperties": {
        ".*": {
          "$ref": "#/definitions/valuesNumberValue"
        }
      }
    }
  }
}
```

---

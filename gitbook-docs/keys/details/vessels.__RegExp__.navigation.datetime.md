## /vessels/<RegExp>/navigation/datetime

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/datetime`
* Node: `datetime`

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
      "type": "string",
      "description": "GNSS Time and Date in ISO8601 format",
      "exmple": "2015-12-05T13:11:59Z"
    },
    "gnssTimeSource": {
      "description": "Source of GNSS Date and Time",
      "enum": [
        "GPS",
        "GLONASS",
        "Galileo",
        "Beidou",
        "IRNSS",
        "Radio Signal",
        "Internet",
        "Local clock"
      ]
    }
  }
}
```

---

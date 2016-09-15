## /vessels/<RegExp>/environment/time

A time reference onboard.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/time`
* Node: `time`

### Source:
```
{
  "type": "object",
  "description": "A time reference onboard.",
  "properties": {
    "millis": {
      "type": "number",
      "title": "Epoch time",
      "example": 1449648657735,
      "description": "Milliseconds since the UNIX epoch (1970-01-01 00:00:00)"
    },
    "timezone": {
      "type": "number",
      "title": "Timezone offset",
      "example": -400,
      "maximum": 1300,
      "minimum": -1300,
      "description": "Timezone offset in hours and minutes (-)hhmm"
    },
    "timestamp": {
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "source": {
      "$ref": "../definitions.json#/definitions/source"
    }
  }
}
```

---

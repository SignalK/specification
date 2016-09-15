## /vessels/<RegExp>/environment/tide

*undefined*
Tide data

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/tide`
* Node: `tide`

### Source:
```
{
  "type": "object",
  "title": "tide",
  "description": "Tide data",
  "properties": {
    "heightHigh": {
      "description": "Next high tide height  relative to lowest astronomical tide (LAT/Chart Datum)",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "heightNow": {
      "description": "The current tide height  relative to lowest astronomical tide (LAT/Chart Datum)",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "heightLow": {
      "description": "The next low tide height relative to lowest astronomical tide (LAT/Chart Datum)",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "timeLow": {
      "description": "Time of the next low tide in UTC",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "timeHigh": {
      "description": "Time of next high tide in UTC",
      "$ref": "../definitions.json#/definitions/timestamp"
    }
  }
}
```

---

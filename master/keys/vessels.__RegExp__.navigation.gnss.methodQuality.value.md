## /vessels/<RegExp>/navigation/gnss/methodQuality/value

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/gnss/methodQuality/value`
* Node: `value`

### Source:
```
{
  "type": "string",
  "enum": [
    "no GPS",
    "GNSS Fix",
    "DGNSS fix",
    "Precise GNSS",
    "RTK fixed integer",
    "RTK float",
    "Estimated (DR) mode",
    "Manual input",
    "Simulator mode",
    "Error"
  ]
}
```

---

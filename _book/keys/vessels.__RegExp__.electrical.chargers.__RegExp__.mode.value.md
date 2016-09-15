## /vessels/<RegExp>/electrical/chargers/<RegExp>/mode/value

* Type: `null`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/chargers/(^[A-Za-z0-9]+$)/mode/value`
* Node: `value`

### Source:
```
{
  "enum": [
    "charging bulk",
    "charging acceptance",
    "charging overcharge",
    "charging float",
    "charging equalize",
    "unknown",
    "other"
  ]
}
```

---

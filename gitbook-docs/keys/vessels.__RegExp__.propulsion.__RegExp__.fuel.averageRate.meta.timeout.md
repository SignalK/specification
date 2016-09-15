## /vessels/<RegExp>/propulsion/<RegExp>/fuel/averageRate/meta/timeout

*undefined*
The timeout in (fractional) seconds after which this data is invalid.

* Type: `number`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/fuel/averageRate/meta/timeout`
* Node: `timeout`

### Example:
```
2
```

### Source:
```
{
  "type": "number",
  "title": "Timeout",
  "description": "The timeout in (fractional) seconds after which this data is invalid.",
  "example": 2
}
```

---

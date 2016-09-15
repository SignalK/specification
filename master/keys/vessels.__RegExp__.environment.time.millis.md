## /vessels/<RegExp>/environment/time/millis

*undefined*
Milliseconds since the UNIX epoch (1970-01-01 00:00:00)

* Type: `number`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/time/millis`
* Node: `millis`

### Example:
```
1449648657735
```

### Source:
```
{
  "type": "number",
  "title": "Epoch time",
  "example": 1449648657735,
  "description": "Milliseconds since the UNIX epoch (1970-01-01 00:00:00)"
}
```

---

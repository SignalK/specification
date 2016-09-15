## /vessels/<RegExp>/environment/time/timezone

*undefined*
Timezone offset in hours and minutes (-)hhmm

* Type: `number`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/time/timezone`
* Node: `timezone`

### Example:
```
-400
```

### Source:
```
{
  "type": "number",
  "title": "Timezone offset",
  "example": -400,
  "maximum": 1300,
  "minimum": -1300,
  "description": "Timezone offset in hours and minutes (-)hhmm"
}
```

---

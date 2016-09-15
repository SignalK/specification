## /vessels/<RegExp>/navigation/speedOverGround/timestamp

ISO-8601 (UTC) string representing date and time.

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/speedOverGround/timestamp`
* Node: `timestamp`

### Example:
```
2014-04-10T08:33:53Z
```

### Source:
```
{
  "type": "string",
  "description": "ISO-8601 (UTC) string representing date and time.",
  "units": "ISO-8601 (UTC)",
  "example": "2014-04-10T08:33:53Z"
}
```

---

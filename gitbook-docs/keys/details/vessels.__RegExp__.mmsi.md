## /vessels/<RegExp>/mmsi

Maritime Mobile Service Identity (MMSI). Has to be 9 digits. See http://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity for information.

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/mmsi`
* Node: `mmsi`

### Example:
```
503123456
```

### Source:
```
{
  "type": "string",
  "description": "Maritime Mobile Service Identity (MMSI). Has to be 9 digits. See http://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity for information.",
  "pattern": "^[2-7][0-9]{8,8}$",
  "maxLength": 9,
  "minLength": 9,
  "example": "503123456"
}
```

---

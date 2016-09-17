## /vessels/<RegExp>/communication/email

Regular email for the skipper

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/communication/email`
* Node: `email`

### Example:
```
robert@xxx.co.nz
```

### Source:
```
{
  "type": "string",
  "description": "Regular email for the skipper",
  "example": "robert@xxx.co.nz"
}
```

---

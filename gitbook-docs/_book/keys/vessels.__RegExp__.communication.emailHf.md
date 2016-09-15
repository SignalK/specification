## /vessels/<RegExp>/communication/emailHf

Email address to be used for HF email (Winmail, Airmail, Sailmail)

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/communication/emailHf`
* Node: `emailHf`

### Example:
```
motu@xxx.co.nz
```

### Source:
```
{
  "type": "string",
  "description": "Email address to be used for HF email (Winmail, Airmail, Sailmail)",
  "example": "motu@xxx.co.nz"
}
```

---

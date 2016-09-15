## /vessels/<RegExp>/steering/autopilot/headingSource/source/label

A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/autopilot/headingSource/source/label`
* Node: `label`

### Example:
```
N2K-1
```

### Source:
```
{
  "type": "string",
  "description": "A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format",
  "example": "N2K-1"
}
```

---

## /resources/waypoints/<RegExp>/position/$source

Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

* Type: `string`
* Path: `/resources/waypoints/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/position/$source`
* Node: `$source`

### Example:
```
NMEA0183.COM1.GP
```

### Source:
```
{
  "type": "string",
  "description": "Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]",
  "example": "NMEA0183.COM1.GP"
}
```

---

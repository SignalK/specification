## /vessels/<RegExp>/propulsion/<RegExp>/alternatorVoltage/$source

Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/alternatorVoltage/$source`
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

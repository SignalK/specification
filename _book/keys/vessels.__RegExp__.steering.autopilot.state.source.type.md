## /vessels/<RegExp>/steering/autopilot/state/source/type

A human name to identify the type. NMEA0183, NMEA2000, signalk

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/autopilot/state/source/type`
* Node: `type`

### Example:
```
NMEA2000
```

### Source:
```
{
  "type": "string",
  "description": "A human name to identify the type. NMEA0183, NMEA2000, signalk",
  "default": "NMEA2000",
  "example": "NMEA2000"
}
```

---

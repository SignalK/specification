## /vessels/<RegExp>/propulsion/<RegExp>/transmission/gearRatio/meta/alarmMethod

*undefined*
The method to use to raise the alarm. An alarm requires immediate attention, eg no oil pressure

* Type: `array`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/transmission/gearRatio/meta/alarmMethod`
* Node: `alarmMethod`

### Source:
```
{
  "type": "array",
  "title": "Alarm Method",
  "description": "The method to use to raise the alarm. An alarm requires immediate attention, eg no oil pressure",
  "default": [
    "visual",
    "sound"
  ],
  "items": {
    "$ref": "#/definitions/alarmMethodEnum"
  }
}
```

---

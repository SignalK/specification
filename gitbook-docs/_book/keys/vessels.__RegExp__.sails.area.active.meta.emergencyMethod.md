## /vessels/<RegExp>/sails/area/active/meta/emergencyMethod

*undefined*
The method to use to raise an emergency. An emergency is an immediate danger to life or vessel

* Type: `array`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/sails/area/active/meta/emergencyMethod`
* Node: `emergencyMethod`

### Source:
```
{
  "type": "array",
  "title": "Emergency Method",
  "description": "The method to use to raise an emergency. An emergency is an immediate danger to life or vessel",
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

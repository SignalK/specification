## /resources/waypoints/<RegExp>/position/meta/emergencyMethod

*undefined*
The method to use to raise an emergency. An emergency is an immediate danger to life or vessel

* Type: `array`
* Path: `/resources/waypoints/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/position/meta/emergencyMethod`
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

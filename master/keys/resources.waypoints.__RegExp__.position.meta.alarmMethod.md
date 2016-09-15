## /resources/waypoints/<RegExp>/position/meta/alarmMethod

*undefined*
The method to use to raise the alarm. An alarm requires immediate attention, eg no oil pressure

* Type: `array`
* Path: `/resources/waypoints/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/position/meta/alarmMethod`
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

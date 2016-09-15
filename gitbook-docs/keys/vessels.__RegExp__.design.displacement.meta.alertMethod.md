## /vessels/<RegExp>/design/displacement/meta/alertMethod

*undefined*
The method to use to raise the alert. An alert is an event that should be known

* Type: `array`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/design/displacement/meta/alertMethod`
* Node: `alertMethod`

### Source:
```
{
  "type": "array",
  "title": "Alert Method",
  "description": "The method to use to raise the alert. An alert is an event that should be known",
  "default": [
    "visual"
  ],
  "items": {
    "$ref": "#/definitions/alarmMethodEnum"
  }
}
```

---

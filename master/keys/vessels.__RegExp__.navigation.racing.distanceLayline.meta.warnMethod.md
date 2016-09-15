## /vessels/<RegExp>/navigation/racing/distanceLayline/meta/warnMethod

*undefined*
The method to use to raise the warning. A warning is an unexpected event that may require attention

* Type: `array`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/racing/distanceLayline/meta/warnMethod`
* Node: `warnMethod`

### Source:
```
{
  "type": "array",
  "title": "Warn Method",
  "description": "The method to use to raise the warning. A warning is an unexpected event that may require attention",
  "default": [
    "visual"
  ],
  "items": {
    "$ref": "#/definitions/alarmMethodEnum"
  }
}
```

---

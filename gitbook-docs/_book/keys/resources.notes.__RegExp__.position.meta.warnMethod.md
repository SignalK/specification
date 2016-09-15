## /resources/notes/<RegExp>/position/meta/warnMethod

*undefined*
The method to use to raise the warning. A warning is an unexpected event that may require attention

* Type: `array`
* Path: `/resources/notes/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/position/meta/warnMethod`
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

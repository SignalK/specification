## /resources/notes/<RegExp>/position/meta/alertMethod

*undefined*
The method to use to raise the alert. An alert is an event that should be known

* Type: `array`
* Path: `/resources/notes/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/position/meta/alertMethod`
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

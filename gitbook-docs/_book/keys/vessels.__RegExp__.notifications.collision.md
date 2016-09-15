## /vessels/<RegExp>/notifications/collision

*undefined*
Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

* Type: `["object","string","array"]`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/notifications/collision`
* Node: `collision`

### Source:
```
{
  "type": [
    "object",
    "string",
    "array"
  ],
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.github.io/specification/schemas/groups/notifications.json#",
  "title": "notifications",
  "description": "Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.",
  "patternProperties": {
    "(^method$)": {
      "description": "Method to use to raise notifications",
      "type": "array",
      "items": {
        "$ref": "../definitions.json#/definitions/alarmMethodEnum"
      }
    },
    "(^state$)": {
      "description": "Current notification state",
      "$ref": "../definitions.json#/definitions/alarmState"
    },
    "(^message$)": {
      "description": "Message to display or speak",
      "type": "string"
    },
    "(^timestamp$)": {
      "description": "Timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "(^\\$source$)": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/sourceRef"
    },
    "(^[A-Za-z0-9-]+$)": {
      "description": "This regex pattern is used for validation of the path of the notification",
      "$ref": "notifications.json#"
    }
  }
}
```

---

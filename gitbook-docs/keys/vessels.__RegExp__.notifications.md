## /vessels/<RegExp>/notifications

*undefined*
Notifications currently raised. Major categories have well-defined names, but the tree can be extended by any hierarchical structure

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/notifications`
* Node: `notifications`

### Source:
```
{
  "type": "object",
  "title": "notifications",
  "description": "Notifications currently raised. Major categories have well-defined names, but the tree can be extended by any hierarchical structure",
  "properties": {
    "mob": {
      "description": "Man overboard",
      "$ref": "groups/notifications.json#"
    },
    "fire": {
      "description": "Fire onboard",
      "$ref": "groups/notifications.json#"
    },
    "sinking": {
      "description": "Vessel is sinking",
      "$ref": "groups/notifications.json#"
    },
    "flooding": {
      "description": "Vessel is flooding",
      "$ref": "groups/notifications.json#"
    },
    "collision": {
      "description": "In collision with another vessel or object",
      "$ref": "groups/notifications.json#"
    },
    "grounding": {
      "description": "Vessel grounding",
      "$ref": "groups/notifications.json#"
    },
    "listing": {
      "description": "Vessel is listing",
      "$ref": "groups/notifications.json#"
    },
    "adrift": {
      "description": "Vessel is adrift",
      "$ref": "groups/notifications.json#"
    },
    "piracy": {
      "description": "Under attack or danger from pirates",
      "$ref": "groups/notifications.json#"
    },
    "abandon": {
      "description": "Abandon ship",
      "$ref": "groups/notifications.json#"
    }
  },
  "patternProperties": {
    "(^[A-Za-z0-9-]+$)": {
      "description": "This regex pattern is used for validation of the path of the alarm",
      "$ref": "groups/notifications.json#",
      "example": "engine"
    }
  }
}
```

---

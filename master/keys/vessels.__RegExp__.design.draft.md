## /vessels/<RegExp>/design/draft

*undefined*
The draft of the vessel

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/design/draft`
* Node: `draft`

### Source:
```
{
  "type": "object",
  "title": "draft",
  "description": "The draft of the vessel",
  "properties": {
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "minimum": {
      "description": "The minimum draft of the vessel",
      "type": "number",
      "units": "m"
    },
    "maximum": {
      "description": "The maximum draft of the vessel",
      "type": "number",
      "units": "m"
    },
    "canoe": {
      "description": "The draft of the vessel without protrusions such as keel, centerboard, rudder",
      "type": "number",
      "units": "m"
    }
  }
}
```

---

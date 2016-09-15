## /vessels/<RegExp>/navigation/state

*undefined*
Current navigational state of the vessel

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/state`
* Node: `state`

### Source:
```
{
  "type": "object",
  "title": "state",
  "description": "Current navigational state of the vessel",
  "properties": {
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "value": {
      "type": "string",
      "enum": [
        "not under command",
        "anchored",
        "sailing",
        "motoring",
        "towing < 200m",
        "towing > 200m",
        "pushing",
        "fishing",
        "fishing-hampered",
        "trawling",
        "trawling-shooting",
        "trawling-hauling",
        "pilotage",
        "not-under-way",
        "aground",
        "restricted manouverability",
        "restricted manouverability towing < 200m",
        "restricted manouverability towing > 200m",
        "restricted manouverability underwater operations",
        "constrained by draft",
        "mine clearance",
        "not defined (example)"
      ]
    }
  }
}
```

---

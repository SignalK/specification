## /resources/waypoints

*undefined*
A holder for waypoints, each named with a UUID

* Type: `object`
* Path: `/resources/waypoints`
* Node: `waypoints`

### Source:
```
{
  "type": "object",
  "title": "waypoints",
  "description": "A holder for waypoints, each named with a UUID",
  "patternProperties": {
    "^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$": {
      "description": "A waypoint, named with a UUID",
      "$ref": "../definitions.json#/definitions/waypoint"
    }
  }
}
```

---

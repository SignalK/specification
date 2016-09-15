## /vessels/<RegExp>/navigation/destination

*undefined*
The intended destination of this trip

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/destination`
* Node: `destination`

### Source:
```
{
  "title": "destination",
  "description": "The intended destination of this trip",
  "type": "object",
  "properties": {
    "eta": {
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "waypoint": {
      "description": "UUID of destination waypoint",
      "type": "string"
    }
  }
}
```

---

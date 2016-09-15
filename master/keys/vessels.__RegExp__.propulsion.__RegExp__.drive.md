## /vessels/<RegExp>/propulsion/<RegExp>/drive

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/drive`
* Node: `drive`

### Source:
```
{
  "type": "object",
  "properties": {
    "type": {
      "enum": [
        "saildrive",
        "shaft",
        "outboard",
        "jet",
        "pod",
        "other"
      ]
    },
    "trimState": {
      "description": "Trim/tilt state, 0<=ratio<=1, 1 is 100% up",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "ratio"
    },
    "thrustAngle": {
      "description": "Current thrust angle for steerable drives, +ve is thrust to Starboard",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "propeller": {
      "pitch ": {
        "description": "Current pitch of propeller, the distance the propeller would advance during one revolution of the propeller without slip",
        "$ref": "../definitions.json#/definitions/numberValue",
        "units": "m"
      },
      "slip": {
        "description": "Propeller slip, the ratio between propeller pitch and distance travelled. eg 1-(actual distance travelled/propeller pitch). 0<=ratio<=1, 0 is 0% slip, 1 is 100% slip",
        "$ref": "../definitions.json#/definitions/numberValue",
        "units": "ratio"
      }
    }
  }
}
```

---

## /vessels/<RegExp>/steering/autopilot

*undefined*
Autopilot data

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/autopilot`
* Node: `autopilot`

### Source:
```
{
  "type": "object",
  "title": "autopilot",
  "description": "Autopilot data",
  "properties": {
    "state": {
      "type": "object",
      "description": "Autopilot state",
      "properties": {
        "value": {
          "type": "string",
          "enum": [
            "on",
            "off",
            "alarm"
          ]
        },
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        },
        "timestamp": {
          "description": "timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        }
      }
    },
    "mode": {
      "type": "object",
      "description": "Operational mode",
      "properties": {
        "value": {
          "type": "string",
          "enum": [
            "powersave",
            "normal",
            "accurate"
          ]
        },
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        },
        "timestamp": {
          "description": "Timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        }
      }
    },
    "targetHeadingNorth": {
      "description": "Target heading for autopilot, relative to true North",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "targetHeadingMagnetic": {
      "description": "Target heading for autopilot, relative to magnetic North",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "headingSource": {
      "type": "object",
      "description": "Current source of heading information",
      "properties": {
        "value": {
          "type": "string",
          "enum": [
            "compass",
            "wind",
            "gps"
          ]
        },
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        },
        "timestamp": {
          "description": "Timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        }
      }
    },
    "deadZone": {
      "description": "Dead zone to ignore for rudder corrections",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "backlash": {
      "description": "Slack in the rudder drive mechanism",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "gain": {
      "description": "Auto-pilot gain, higher number equals more rudder movement for a given turn",
      "$ref": "../definitions.json#/definitions/numberValue"
    },
    "maxDriveCurrent": {
      "description": "Maximum current to use to drive servo",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "A"
    },
    "maxDriveRate": {
      "description": "Maximum rudder rotation speed",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad/s"
    },
    "portLock": {
      "description": "Position of servo on port lock",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "starboardLock": {
      "description": "Position of servo on starboard lock",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    }
  }
}
```

---

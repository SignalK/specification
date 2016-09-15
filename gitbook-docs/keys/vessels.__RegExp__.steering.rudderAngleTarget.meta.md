## /vessels/<RegExp>/steering/rudderAngleTarget/meta

*undefined*
Provides meta data to enable alarm and display configuration.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/rudderAngleTarget/meta`
* Node: `meta`

### Source:
```
{
  "type": "object",
  "title": "Meta schema.",
  "description": "Provides meta data to enable alarm and display configuration.",
  "properties": {
    "displayName": {
      "type": "string",
      "title": "DisplayName schema.",
      "description": "A display name for this value.",
      "example": "Tachometer, Engine 1"
    },
    "longName": {
      "type": "string",
      "title": "LongName schema.",
      "description": "A long name for this value.",
      "example": "Tachometer, Engine 1"
    },
    "shortName": {
      "type": "string",
      "title": "ShortName schema.",
      "description": "A short name for this value.",
      "example": "RPM"
    },
    "gaugeType": {
      "type": "string",
      "title": "gaugeType schema.",
      "description": "The type of gauge necessary to display this value.",
      "example": "sparkline"
    },
    "units": {
      "type": "string",
      "title": "units schema.",
      "description": "The (derived) SI unit of this value.",
      "example": "m/s"
    },
    "timeout": {
      "type": "number",
      "title": "Timeout",
      "description": "The timeout in (fractional) seconds after which this data is invalid.",
      "example": 2
    },
    "alertMethod": {
      "type": "array",
      "title": "Alert Method",
      "description": "The method to use to raise the alert. An alert is an event that should be known",
      "default": [
        "visual"
      ],
      "items": {
        "$ref": "#/definitions/alarmMethodEnum"
      }
    },
    "warnMethod": {
      "type": "array",
      "title": "Warn Method",
      "description": "The method to use to raise the warning. A warning is an unexpected event that may require attention",
      "default": [
        "visual"
      ],
      "items": {
        "$ref": "#/definitions/alarmMethodEnum"
      }
    },
    "alarmMethod": {
      "type": "array",
      "title": "Alarm Method",
      "description": "The method to use to raise the alarm. An alarm requires immediate attention, eg no oil pressure",
      "default": [
        "visual",
        "sound"
      ],
      "items": {
        "$ref": "#/definitions/alarmMethodEnum"
      }
    },
    "emergencyMethod": {
      "type": "array",
      "title": "Emergency Method",
      "description": "The method to use to raise an emergency. An emergency is an immediate danger to life or vessel",
      "default": [
        "visual",
        "sound"
      ],
      "items": {
        "$ref": "#/definitions/alarmMethodEnum"
      }
    },
    "zones": {
      "type": "array",
      "title": "Zones schema.",
      "description": "The zones defining the range of values for this signalk value.",
      "items": [
        {
          "type": "object",
          "title": "zone",
          "description": "A zone used to define the display and alarm state when the value is in between bottom and top.",
          "required": [
            "state"
          ],
          "properties": {
            "lower": {
              "id": "lower",
              "type": "number",
              "title": "Lower",
              "description": "The lowest number in this zone",
              "name": "lower",
              "example": 3500
            },
            "upper": {
              "id": "upper",
              "type": "number",
              "title": "Upper",
              "description": "The highest value in this zone",
              "name": "upper",
              "example": 4000
            },
            "state": {
              "$ref": "#/definitions/alarmState"
            },
            "message": {
              "id": "message",
              "type": "string",
              "title": "message",
              "description": "The message to display for the alarm.",
              "default": "Warning"
            }
          }
        }
      ]
    }
  }
}
```

---

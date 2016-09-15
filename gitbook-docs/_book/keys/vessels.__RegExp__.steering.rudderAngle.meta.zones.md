## /vessels/<RegExp>/steering/rudderAngle/meta/zones

*undefined*
The zones defining the range of values for this signalk value.

* Type: `array`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/rudderAngle/meta/zones`
* Node: `zones`

### Source:
```
{
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
```

---

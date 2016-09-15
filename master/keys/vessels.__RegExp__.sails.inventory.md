## /vessels/<RegExp>/sails/inventory

An object containing a description of each sail available to the vessel crew

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/sails/inventory`
* Node: `inventory`

### Source:
```
{
  "type": "object",
  "description": "An object containing a description of each sail available to the vessel crew",
  "patternProperties": {
    "(^[a-zA-Z0-9]+$)": {
      "type": "object",
      "description": "'sail' data type.",
      "required": [
        "name",
        "type",
        "active",
        "area"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "An unique identifier by which the crew identifies a sail",
          "example": "J1"
        },
        "type": {
          "type": "string",
          "description": "The type of sail",
          "example": "Genaker"
        },
        "material": {
          "type": "string",
          "description": "The material the sail is made from (optional)",
          "example": "canvas"
        },
        "brand": {
          "type": "string",
          "description": "The brand of the sail (optional)",
          "example": "North Sails"
        },
        "active": {
          "type": "boolean",
          "description": "Indicates wether this sail is currently in use or not"
        },
        "area": {
          "type": "number",
          "description": "The total area of this sail in square meters",
          "units": "m2"
        },
        "minimumWind": {
          "type": "number",
          "description": "The minimum wind speed this sail can be used with",
          "units": "m/s",
          "default": 0
        },
        "maximumWind": {
          "type": "number",
          "description": "The maximum wind speed this sail can be used with",
          "units": "m/s",
          "default": 666
        },
        "timestamp": {
          "$ref": "#/definitions/timestamp"
        },
        "source": {
          "$ref": "#/definitions/source"
        },
        "_attr": {
          "$ref": "#/definitions/_attr"
        },
        "meta": {
          "$ref": "#/definitions/meta"
        }
      }
    }
  }
}
```

---

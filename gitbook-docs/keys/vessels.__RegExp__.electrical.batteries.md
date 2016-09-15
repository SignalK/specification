## /vessels/<RegExp>/electrical/batteries

* Type: `null`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/batteries`
* Node: `batteries`

### Source:
```
{
  "patternProperties": {
    "(^[A-Za-z0-9]+$)": {
      "type": "object",
      "title": "Battery keyed by instance id",
      "description": "Batteries, one or many, within the vessel",
      "allOf": [
        {
          "$ref": "#/definitions/dcQuantities"
        },
        {
          "properties": {
            "meta": {
              "allOf": [
                {
                  "$ref": "#/definitions/identity"
                },
                {
                  "properties": {
                    "chemistry": {
                      "type": "string",
                      "description": "Type of battery FLA, LiFePO4, etc."
                    }
                  }
                }
              ]
            },
            "temperature": {
              "type": "object",
              "title": "temperature",
              "description": "Additional / unique temperatures associated with a battery",
              "properties": {
                "limitDischargeLower": {
                  "type": "number",
                  "description": "Operational minimum temperature limit for battery discharge, in degrees Celsius",
                  "units": "K"
                },
                "limitDischargeUpper": {
                  "type": "number",
                  "description": "Operational maximum temperature limit for battery discharge, in degrees Celsius",
                  "units": "K"
                },
                "limitRechargeLower": {
                  "type": "number",
                  "description": "Operational minimum temperature limit for battery recharging, in degrees Celsius",
                  "units": "K"
                },
                "limitRechargeUpper": {
                  "type": "number",
                  "description": "Operational maximum temperature limit for battery recharging, in degrees Celsius",
                  "units": "K"
                }
              }
            },
            "capacity": {
              "type": "object",
              "title": "capacity",
              "properties": {
                "nominal": {
                  "type": "number",
                  "description": "The capacity of battery as specified by the manufacturer",
                  "units": "J"
                },
                "actual": {
                  "type": "number",
                  "description": "The measured capacity of battery. This may change over time and will likely deviate from the nominal capacity.",
                  "units": "J"
                },
                "remaining": {
                  "type": "number",
                  "description": "Capacity remaining in battery",
                  "units": "J"
                },
                "dischargeLimit": {
                  "type": "number",
                  "description": "Minimum capacity to be left in the battery while discharging",
                  "units": "J"
                },
                "stateOfCharge": {
                  "$ref": "../definitions.json#/definitions/numberValue",
                  "description": "State of charge, 1 = 100%",
                  "units": "ratio"
                },
                "stateOfHealth": {
                  "$ref": "../definitions.json#/definitions/numberValue",
                  "description": "State of Health, 1 = 100%",
                  "units": "ratio"
                },
                "dischargeSinceFull": {
                  "$ref": "../definitions.json#/definitions/numberValue",
                  "description": "Cumulative discharge since battery was last full",
                  "units": "C"
                },
                "timeRemaining": {
                  "$ref": "../definitions.json#/definitions/numberValue",
                  "description": "Time to discharge to discharge limit at current rate",
                  "units": "s"
                }
              }
            },
            "lifetimeDischarge": {
              "type": "number",
              "description": "Cumulative charge discharged from battery over operational lifetime of battery",
              "units": "C"
            },
            "lifetimeRecharge": {
              "type": "number",
              "description": "Cumulative charge recharged into battery over operational lifetime of battery",
              "units": "C"
            }
          }
        }
      ]
    }
  }
}
```

---

## /vessels/<RegExp>/sensors/<RegExp>/sensorType

The datamodel definition of the sensor data. FIXME - need to create a definitions lib of sensor datamodel types

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/sensors/(^[A-Za-z0-9]+$)/sensorType`
* Node: `sensorType`

### Source:
```
{
  "type": "string",
  "description": "The datamodel definition of the sensor data. FIXME - need to create a definitions lib of sensor datamodel types"
}
```

---

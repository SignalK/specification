## /vessels/<RegExp>/navigation/state/source

Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/state/source`
* Node: `source`

### Source:
```
{
  "type": "object",
  "description": "Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.",
  "required": [
    "label",
    "type"
  ],
  "properties": {
    "label": {
      "type": "string",
      "description": "A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format",
      "example": "N2K-1"
    },
    "type": {
      "type": "string",
      "description": "A human name to identify the type. NMEA0183, NMEA2000, signalk",
      "default": "NMEA2000",
      "example": "NMEA2000"
    },
    "src": {
      "type": "string",
      "description": "NMEA2000 src value or any similar value for encapsulating the original source of the data",
      "example": "36"
    },
    "pgn": {
      "type": "number",
      "description": "NMEA2000 pgn of the source message",
      "example": "130312"
    },
    "sentence": {
      "type": "string",
      "description": "Sentence type of the source NMEA0183 sentence, $GP[RMC],092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43",
      "example": "RMC"
    },
    "talker": {
      "type": "string",
      "description": "Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43",
      "example": "GP"
    }
  }
}
```

---

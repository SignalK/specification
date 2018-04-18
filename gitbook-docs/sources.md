# Signal K Data Sources

Signal K provides a method to identify the specific device and—if available—the NMEA sentence or PGN which generated a
particular value. This is handled in two ways. The first is with a pointer to a device in the `sources` section of the
Signal K data model. When viewing a full Signal K data model, this is the method you will see. Every Signal K data
object will have a `$source` property (note the dollar sign sigil which indicates the value is a pointer) which
contains a dot separated path to an object relative to the top-level `sources` section. When receiving Signal K data
via deltas, you may also see sources referenced this way. However, all current implementations of Signal K provide
source data directly embedded in the delta message. This is done using the `source` property of the delta message.

## Pointer Method

An example of the pointer method is shown below.

```json
{
  "version": "1.0.0",
  "self": "vessels.urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c",
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "uuid": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c",
      "navigation": {
        "speedOverGround": {
          "value": 4.32693662,
          "$source": "ttyUSB0.GP",
          "sentence": "RMC",
          "timestamp": "2017-05-16T05:15:50.007Z"
        }
      }
    }
  },
  "sources": {
    "ttyUSB0": {
      "label": "ttyUSB0",
      "type": "NMEA0183",
      "GP": {
        "talker": "GP",
        "sentences": {
          "RMC": "2017-04-03T06:14:04.451Z"
        }
      }
    }
  }
}
```

This is a full Signal K model with a single data source and a single data object. The `navigation.speedOverGround`
object references the `ttyUSB0.GP` device via the value of the `$source` property. In addition to `$source`, the
`sentence` property is also included which identifies the specific NMEA 0183 sentence recieved from the data source
which was converted to Signal K.

Within the `sources` section devices are conventionally organized by the physical connection to the Signal K device and
an identifier for the specific source device. In the case above, the first level of the hierarchy is the UNIX device
identifier for a USB serial port and the second level is the NMEA 0183 talker ID of the paddlewheel sensor.

## Direct Inclusion Method

This method is only implemented in delta messages. An example delta with an inline source is shown below.

```json
{
  "updates": [
    {
      "source": {
        "label": "ttyUSB0",
        "type": "NMEA2000",
        "pgn": 127251,
        "src": "204"
      },
      "timestamp": "2017-04-15T20:38:26.709Z",
      "values": [
        {
          "path": "navigation.rateOfTurn",
          "value": -0.000412469
        }
      ]
    }
  ],
  "context": "vessels.urn:mrn:imo:mmsi:338184312"
}
```

This particular source is an NMEA 2000 device so it has the `pgn` and `src` properties, but NMEA 0183 or other source
types are similarly supported. An NMEA 0183 source would be structured like this:

```json
{
  "label": "NMEA0183-0",
  "type": "NMEA0183",
  "sentence": "RMC",
  "talker": "GP"
}
```

A final example using a non-NMEA source, in this case an I²C sensor.

```json
{
  "type": "I2C",
  "label": "I²C Bus #0",
  "src": "14"
}
```

Here, `src` is the address of the device on the I²C bus.

## Sources Group

A Signal K device capable of generating a full data model will have a top level (i.e. at the same level as `vessels`,
`version` and `self`) group called `sources`. This group provides detailed information about each network bus connected
to the Signal K gateway or server. Sources are organized hierarchically, following a bus-source-type structure.

An example of multiple sources is shown below.

```json
{
  "vhf": {
    "label": "AIS Receiver",
    "type": "VHF",
    "112334556": {
      "ais": {
        "aisType": 15
      }
    },
    "394299113": {
      "ais": {
        "aisType": 15
      }
    }
  },
  "ttyUSB0": {
    "label": "NMEA 0183",
    "type": "NMEA0183",
    "II": {
      "talker": "II",
      "sentences": {
        "VHW": "2018-04-16T01:34:03.881Z"
      }
    }
  },
  "ttyUSB1": {
    "label": "NMEA 2000",
    "type": "NMEA2000",
    "3": {
      "1": {},
      "2": {},
      "n2k": {
        "src": "3",
        "pgns": {
          "126992": "2017-04-15T18:44:59.006Z"
        }
      }
    }
  }
}
```

You may notice two odd lines in the NMEA 2000 source `"3"`: `"1": {}` and `"2": {}'`. These are placeholders for NMEA
2000 "instance" values. These are here to provide a valid schema for certain NMEA 2000 PGNs relating to temperature.
Because temperature paths in the current versio of Signal K do not have the instance inline, consumers must look at the
instance part of the `$source` or `source` property to determine which specific sensor provided the data.

# Signal K Data Sources

Signal K provides a method to identify the specific device and—if available—the NMEA sentence or PGN which generated a
particular value. This is handled in two ways. The first is with a pointer to a device in the `sources` section of the
Signal K data model. A Signal K data object using this method MUST have a `$source` property (note the dollar sign
sigil which indicates the value is a pointer) which contains a dot separated path to an object relative to the
top-level `sources` section. The second method allows embedding the source information directly in the Signal K data
object using a `source` property. This is useful for devices such as NMEA to Signal K gateways which do not maintain a
database of data sources. A Signal K data object MAY use one of these methods to identify the source of the data, but
MAY NOT use both.

## Pointer Method

An example of the pointer method is shown below.

```json
{
  "version": "v1.0.0",
  "self": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c",
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
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

Some Signal K producing devices such as gateways may use the direct inclusion method as shown below.

```json
{
  "version": "v1.0.0",
  "self": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c",
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "speedOverGround": {
          "value": 4.32693662,
          "timestamp": "2017-05-16T05:15:50.007Z",
          "source": {
            "type": "NMEA0183",
            "label": "NMEA0183-1",
            "talker": "GP",
            "sentence": "RMC"
          }
        }
      }
    }
  }
}
```

Again, this is using an NMEA 0183 source as the example, but NMEA 2000 or other source types are similarly supported.
An NMEA 2000 source would be structured like this:

```json
{
  "type": "NMEA2000",
  "label": "NMEA2000-1",
  "src": "115",
  "pgn": 130312
}
```

A final example using a non-NMEA source, in this case an I²C sensor.

```json
{
  "type": "I2C",
  "label": "I²C Bus #0",
  "src": "14",
}
```

Here, `src` is the address of the device on the I²C bus.

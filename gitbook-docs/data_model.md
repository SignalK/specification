# Signal K Data Model

## Formats
Signal K defines two data formats-full and delta-for representing and transmitting data.

In addition there is an optional "sparse" representation of the data which uses the same structure as the full format,
however it does not contain a full tree, just parts of the full tree.

## Full Format

The simplest format is the full format, which is the complete Signal K data model represented as a JSON string.

```json
{
  "version": "v1.0.0",
  "self": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c",
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "speedOverGround": {
          "value": 4.32693662,
          "$source": "0183./dev/ttyUSB0.GP.RMC",
          "timestamp": "2017-05-16T05:15:50.007Z"
        },
        "position": {
          "altitude": 0.0,
          "latitude": 37.81479,
          "longitude": -122.44880152,
          "$source": "0183./dev/ttyUSB0.GP.RMC",
          "timestamp": "2017-05-16T05:15:50.007Z"
        },
        "headingMagnetic": {
          "value": 5.55014702,
          "$source": "0183./dev/ttyUSB0.II.HDM",
          "timestamp": "2017-05-16T05:15:54.006Z"
        }
      },
      "name": "Motu",
      "uuid": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c"
    }
  },
  "sources": {
    "NMEA0183": {
      "type": "NMEA0183",
      "ttyUSB0": {
        "label": "/dev/ttyUSB0",
        "GP": {
          "talker": "GP",
          "RMC": {
            "sentence": "$GPRMC,061404.000,A,4117.6201,S,17314.8224,E,0.38,354.82,030417,,*11",
            "timestamp": "2017-04-03T06:14:04.451Z"
          }
        },
        "II": {
          "talker": "II",
          "HDM": {
            "sentence": "$IIHDM,318,M*36",
            "timestamp": "2017-05-16T05:15:54.006Z"
          }
        }
      }
    }
  }
}
```

The message is JSON structured UTF-8 text. There are several top level attributes or keys which are always present and
others which are optional. The `version` key specifies which version of the Signal K specification is being used and is
always present in a full Signal K model. Also always present in the full model is the `self` key. The value of `self`
is the key within the `vessels` object which is the local boat. Effectively, it is a pointer into the `vessels` object.

Below the `vessels` object is a list of vessels, identified by their MMSI number or a generated unique id. There may be
many vessels if data has been received from AIS or other sources. The format for each vessel’s data uses the same
standard Signal K structure but may not have the same content; likely you will not have as much data about other
vessels as you have about your own.

Another top level attribute is `sources`, which defines a list of sources the data was obtained from. In the `vessels`
section are `$source` keys, these point to their relative location in the `sources` tree. This allows several Signal K
keys to reference the same `$source` which is convenient for protocols like NMEA0183 where many Signal K keys may
arrive in a single NMEA message.

Alternatively the source data may be embedded directly in place of the `$source` by using the `source` key:

```json
{
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "position": {
          "altitude": 0.0,
          "latitude": 37.81479,
          "longitude": -122.44880152,
          "source": {
            "label": "/dev/ttyUSB0",
            "type": "NMEA0183",
            "talker": "GP",
            "sentence": "$GPRMC,061404.000,A,4117.6201,S,17314.8224,E,0.38,354.82,030417,,*11",
            "timestamp": "2017-04-03T06:14:04.451Z"
          },
          "timestamp": "2017-05-16T05:15:50.007Z"
        }
      }
    }
  }
}
```

The values are always SI units, and always the same units for the same key. I.e. `speedOverGround` is always meters per
second, never knots, km/hr, or miles/hr. This means you never have to send 'units' with data, the units are specific
for a key, and defined in the data schema. A simplified version of the JSON schema with the units is available in [Keys
Reference in Appendix A](keys/index.md).

The ordering of keys is also not important, they can occur in any order. In fact, if are designing a device which
consumes Signal K data, it is important to remember that the JSON standard does not guarantee the order of properties
in an object. You MUST NOT rely on the data you receive to always be in the same order within a Signal K message.

The full format is most useful for getting an install state of a Signal K system, for example when a display device
first connects to the network or for refreshing a devices state when it loses a network connection.

However sending the full data model is wasteful of both bandwidth and CPU, especially when there is a large amount of
available data, it changes slowly or the consuming device is only interested in a small portion of it. In the majority
of cases, it is preferable to only exchange small, specific portions of the data.

### Sparse Format

The sparse format is the same as the full format but only contains a limited part of the tree. This can be one or more
data values.

```json
{
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "position": {
          "latitude": -41.2936935424,
          "longitude": -122.44880152
        }
      }
    }
  }
}
```

or

```json
{
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "speedOverGround": {
          "value": 4.32693662
        },
        "position": {
          "latitude": 37.81479,
          "longitude": -122.44880152
        }
      }
    }
  }
}
```

This ability to choose a combination of values means there is no need to create multiple message types to send
different combinations or types of data. As a producer of Signal K data, you have the freedom to assemble whatever you
want and send it. This eliminates the need for grouping identifiers like sequence IDs or guesswork on the part of a
Signal K consumer which needs to know if two or more data points are correlated to a point in time.

When parsing an incoming message a device should skip values it has no interest in or doesn’t recognize. Hence we avoid
the problem of multiple message definitions for the same or similar data, and we avoid having to decode multiple
messages with fixed formats.

## Delta Format

By far, the most commonly produced Signal K format is the delta format. Conceptually, the delta is an update to an
existing Signal K data model. A device consuming deltas could either build up a view of the Signal K full tree by
consuming and combining deltas or it could request from a Signal K server the current full tree model and apply deltas
to that as they are received. It is also entirely possible for a device to remain essentially stateless and treat
Signal K deltas as independent packets of data, much the same way as it would handle NMEA sentences or PGNs.

An example delta message is presented below.

```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [{
    "source": {
      "label": "N2000-01"
      "type": "NMEA2000",
      "src": "017",
      "pgn": 127488
    },
    "timestamp": "2010-01-07T07:18:44Z",
    "values": [{
      "path": "propulsion.0.revolutions",
      "value": 16.341667
    }, {
      "path": "propulsion.0.boostPressure",
      "value": 45500.0
    }]
  }]
}
```

The top level of a delta message contains an `updates` property and an optional `context` property.

```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [
    ...data goes here...
  ]
}
```

The optional `context` property roots the updates to a particular location in the Signal K tree. If `context` is
missing it is assumed that the data is related to the `self` context. The `self` context is the `vessel` object which
the `self` property of the full model points to.

Context is a path from the root of the full tree to the _container object_, which for vessel related data must refer to
a vessel directly under `vessels`. The delimiter in the context path is `.` (period). In this case the context is
`vessels.urn:mrn:imo:mmsi:234567890`. All subsequent data is relative to that location.

The `updates` property holds a JSON array of update objects, each of which may have a  `source` property, a `timestamp`
property and an array of `values` containing one or more value objects.

```json
{
  "source": {
    "label": "N2000-01"
    "type": "NMEA2000",
    "src": "115",
    "pgn": "128267"
  },
  "timestamp": "2014-08-15-16:00:00.081",
  "values": [{
    "path": "navigation.courseOverGroundTrue",
    "value": 2.971
  }, {
    "path": "navigation.speedOverGround",
    "value": 3.85
  }]
}
```

An `update` has a single `source` value and it applies to each of the `values` items. In cases where data can only
come from a single source, such as an NMEA 0183 talker connected to a serial port, then the source may be omitted.
However, if the delta is being passed on by a Signal K server or multiplexer then `source` must be filled in by the
server so that downstream consumers can discern where the update comes from.

In cases where a Signal K producer does not have access to a real time clock or GPS time then `timestamp` should be
omitted. Elements in the Signal K processing chain-such as a server receiving data from a producer-should fill in
timestamp if it is missing in the incoming delta message.

Each `value` item is then simply a pair of `path` and `value`. The `path` must be a _leaf path_: it must be a path to
a leaf the of the full model.  A leaf is where the actual value of the Signal K property is and where `timestamp`,
`$source` and `values` properties are in the full model. The value is often a scalar-a single numeric value, as in the
example above-but it can also be an object. For example a `navigation.position` value would be an object like
`{"latitude": -41.2936935424, "longitude": 173.2470855712}`.

## Data Quality

Data transmitted in Signal K format is assumed to be corrected for known sensor inaccuracies such as wind angle offset
due to misalignment of a masthead unit on the mast, but there is no _guarantee_ that data is accurate, or within
certain bounds. Different sources will have different data quality and normal vigilance is always required.

## Missing or Invalid Data

A sensor or gateway/server may want to send a message indicating known invalid data or the fact that the sensor is
functioning but can not provide data, for example when a depth sensor has no bottom fix. In this case the value must be
JSON `null` in the delta message and the server must return the value as a JSON `null` in the REST API.

## Message Integrity

Many messaging systems specify checksums or other forms of message integrity checking. Signal K assumes a reliable
transport will guarantee a valid message. This is true of TCP/IP and some other transports but not always the case. For
other transports (e.g. RS-232 serial) a specific extended data format will apply, which is suited to that transport.
Hence at the message level no checksum or other tests need to be made.

## Encoding/Decoding

The JSON message format is supported across most programming environments and can be handled with any convenient
library.

On micro-controllers with limited RAM it may be necessary to read and write Signal K data using a streaming process
rather than reading the entire message into RAM before processing. There is an implementation of Signal K JSON
streaming on an Arduino Mega (4K RAM) in the related
[Freeboard project](https://github.com/rob42/FreeboardMega/tree/signal_k_dev/lib/SignalK).

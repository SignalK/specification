# Signal K Data Model

## Formats

Signal K defines two data formats—full and delta—for representing and transmitting data. All Signal K data is
transmitted as UTF-8 JSON.

## Full Format

The full format is conceptually the simplest representation of data in Signal K. It contains all of the data from a
Signal K node, which in the case of a Signal K server could be many hundreds of data points.

[>]: # (mdpInsert ```json fsnip ../samples/full/docs-data_model.json)
```json
{
  "version": "1.0.0",
  "self": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c",
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "speedOverGround": {
          "value": 4.32693662,
          "$source": "ttyUSB0.GP",
          "sentence": "RMC",
          "timestamp": "2017-05-16T05:15:50.007Z"
        },
        "position": {
          "value": {
            "altitude": 0.0,
            "latitude": 37.81479,
            "longitude": -122.44880152
          },
          "$source": "ttyUSB0.GP",
          "sentence": "RMC",
          "timestamp": "2017-05-16T05:15:50.007Z"
        },
        "headingMagnetic": {
          "value": 5.55014702,
          "$source": "ttyUSB0.II",
          "sentence": "HDM",
          "timestamp": "2017-05-16T05:15:54.006Z"
        }
      },
      "name": "Motu",
      "uuid": "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c"
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
      },
      "II": {
        "talker": "II",
        "sentences": {
          "HDM": "2017-05-16T05:15:54.006Z"
        }
      }
    }
  }
}

```
[<]: #
There are several top level attributes or keys which are always present and others which are optional. The `version`
key specifies which version of the Signal K specification is being used and must always present in a full Signal K
model. Also always present in the full model is the `self` key. The value of `self` is the key within the `vessels`
object which is the local boat. Effectively, it is a pointer into the `vessels` object.

Below the `vessels` object is a list of vessels, identified by their MMSI number or a generated unique ID. There may be
many vessels if data has been received from AIS or other sources. The format for each vessel’s data uses the same
standard Signal K structure but may not have the same content; likely you will not have as much data about other
vessels as you have about your own.

At the same level as `vessels` is `sources`. This contains a list of sources the data was obtained from. Each data
object within a `vessel` may have a `$source` key which point to a source withing `sources`. Several data objects may
reference the same `source` since a single NMEA sentence or PGN may map to multiple keys in Signal K.

Alternatively the source data may be embedded directly in place of the `$source` by using the `source` key:

```json
{
  "vessels": {
    "urn:mrn:signalk:uuid:705f5f1a-efaf-44aa-9cb8-a0fd6305567c": {
      "navigation": {
        "position": {
          "value": {
            "altitude": 0.0,
            "latitude": 37.81479,
            "longitude": -122.44880152
          },
          "source": {
            "label": "ttyUSB0",
            "type": "NMEA0183",
            "talker": "GP",
            "sentence": "PRMC"
          },
          "timestamp": "2017-05-16T05:15:50.007Z"
        }
      }
    }
  }
}
```

For more information on sources, see the [sources](sources.md) section.

Data objects in Signal K are organized hierarchically, for example data related to navigation such as position, speed
through water and heading are all organized under a `navigation` sub-topic within the `vessel` object. Each data object
has a `value` property which holds the actual value for that specific key. The `value` property may contain a number, a
string or another object. Signal K keys that are object valued are object valued because the values don‘t have much
semantic meaning individually. For example position – latitude doesn‘t have much meaning without an associated
longitude. Therefore, these (and altitude) are grouped together in a single `navigation.position` key.

The values are always SI units, and always the same units for the same key. Therefore, `speedOverGround` is always
meters per second, never knots, km/hr, or miles/hr. This means you never have to send units with data, the units are
specific for a key, and defined in the data schema. A simplified version of the JSON schema with the units is available
in [Keys Reference in Appendix A](keys/index.md). The units are also always specified in the values’
[metadata](data_model_metadata.md) which is available via the [REST API](rest_api.md) in the `meta.units` property.
Besides the `units` property, `meta` provides a lot of other useful information for consumers of the data.

Finally, each data object also has a `timestamp` property which represents the time that the value was measured.
Timestamps are in ISO 8601 format – specifically the [RFC 3339](https://tools.ietf.org/html/rfc3339) extension format,
which is slightly more strict than the ISO specification.  For instance, it requires four digit years and specifies
that `T` is used as a separator between the data and time portions of the timestamp.

The ordering of keys is also not important, they can occur in any order. In fact, if you are designing a device which
consumes Signal K data, it is important to remember that the JSON standard does not guarantee the order of properties
in an object. You MUST NOT rely on the data you receive to always be in the same order within a Signal K message.

The full format is most useful for getting the initial state of a Signal K system, for example when a display device
first connects to the network or for refreshing a device‘s state when it loses a network connection.

However sending the full data model is wasteful of both bandwidth and CPU, especially when there is a large amount of
available data, or the consuming device is only interested in a small portion of it. In the majority of cases, it is
preferable to only exchange small, specific portions of the data.

## Delta Format

By far, the most commonly produced Signal K format is the delta format. Conceptually, the delta is an update to an
existing Signal K data model. A device consuming deltas could either build up a view of the Signal K full tree by
consuming and combining deltas or it could request from a Signal K server the current full tree model and apply deltas
to that as they are received. It is also entirely possible for a device to remain essentially stateless and treat
Signal K deltas as independent packets of data, much the same way as it would handle NMEA sentences or PGNs.

An example delta message is presented below.

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-data_model.json --delKeys $..updates[2] --delKeys $..updates[1])
```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [
    {
      "source": {
        "label": "N2000-01",
        "type": "NMEA2000",
        "src": "017",
        "pgn": 127488
      },
      "timestamp": "2010-01-07T07:18:44Z",
      "values": [
        {
          "path": "propulsion.0.revolutions",
          "value": 16.341667
        },
        {
          "path": "propulsion.0.boostPressure",
          "value": 45500
        }
      ]
    }
  ]
}
```
[<]: #
The top level of a delta message contains an `updates` property and an optional `context` property.

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-data_model.json --ellipsify updates)
```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [...]
}
```
[<]: #
The optional `context` property roots the updates to a particular location in the Signal K tree. If `context` is
missing it is assumed that the data is related to the `self` context. The `self` context is the `vessel` object which
the `self` property of the full model points to.

Context is a path from the root of the full tree to the _container object_, which for vessel related data must refer to
a vessel directly under `vessels`. The delimiter in the context path is `.` (period). In this case the context is
`vessels.urn:mrn:imo:mmsi:234567890`. All subsequent data is relative to that location.

The `updates` property holds a JSON array of update objects, each of which may have a  `source` property, a `timestamp`
property and an array of `values` containing one or more value objects.

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-data_model.json --snip $..updates[1])
```json
{
  "source": {
    "label": "N2000-01",
    "type": "NMEA2000",
    "src": "115",
    "pgn": 128267
  },
  "timestamp": "2014-08-15T16:00:00.081Z",
  "values": [
    {
      "path": "navigation.courseOverGroundTrue",
      "value": 2.971
    },
    {
      "path": "navigation.speedOverGround",
      "value": 3.85
    }
  ]
}
```
[<]: #
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

There are some static properties in the full model that lack the support for multiple values and metadata such as
source and timestamp. An example is a vessel‘s name, directly under the vessel‘s root. This static data may appear in
the delta stream, for example when received in AIS transmission. In this case the value should be the subtree of the
full model, starting from the vessel's root, with just the relevant parts, and the path must be empty, indicating that
the value should be merged to the full model mounted where the delta‘s context property points:

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-data_model.json --delKeys $..updates[1] --delKeys $..updates[0] --ellipsify source --prettify 2 20)
```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [
    {
      "source": {...},
      "timestamp": "2014-08-15T19:02:31.507Z",
      "values": [
        {
          "path": "",
          "value": {
            "name": "WRANGO"
          }
        }
      ]
    }
  ]
}
```
[<]: #
## Delta Format For Metadata

Metadata can also be updated via a delta within the `meta` key.

Since meta data is not often updated it is only sent when there has been a change. See [Subscription Protocol](subscription_protocol.md) for details.

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-data_model_meta_deltas.json --prettify 2 20)
```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [
    {
      "timestamp": "2014-08-15T19:02:31.507Z",
      "meta": [
        {
          "path": "environment.wind.speedApparent",
          "value": {
            "units": "m/s",
            "description": "Apparent wind speed",
            "displayName": "Apparent Wind Speed",
            "shortName": "AWS",
            "zones": [
              {
                "upper": 15.4333,
                "state": "warn",
                "message": "high wind speed"
              }
            ]
          }
        }
      ]
    }
  ]
}
```
[<]: #
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

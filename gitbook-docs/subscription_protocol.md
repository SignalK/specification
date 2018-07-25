# Subscription Protocol

## Introduction

By default a Signal K server will provide a new WebSocket client with a delta stream of the `vessels.self` record, as
updates are received from sources. E.g. `/signalk/v1/stream` will provide the following delta stream, every time the
log value changes.

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-subscription_protocol.json)
```json
{
  "context": "vessels.urn:mrn:imo:mmsi:234567890",
  "updates": [
    {
      "source": {
        "label": "N2000-01",
        "type": "NMEA2000",
        "src": "115",
        "pgn": 128275
      },
      "values": [
        {
          "path": "navigation.trip.log",
          "value": 43374
        },
        {
          "path": "navigation.log",
          "value": 17404540
        }
      ]
    }
  ]
}
```
[<]: #
> Below we refer to WebSockets, but the same process works in the same way over any transport. E.g. for a raw TCP
> connection the connection causes the above message to be sent, and sending the subscribe messages will have the same
> effect as described here.

This can be a lot of messages, many you may not need, especially if your boat has many sensors, or other data sources.
Often you will want to subscribe to a much smaller range of data. Especially for single value displays, it does not
make sense to get the entire data stream when only a single value is wanted.

First you will want to unsubscribe from the current default (or you may have already connected with
`ws://hostname/signalk/v1/stream?subscribe=none`). To unsubscribe all create an `unsubscribe` message with wildcards
and send the message over the WebSocket connection:

[>]: # (mdpInsert ```json fsnip ../samples/unsubscribe/docs-subscription_protocol.json --prettify 2 20)
```json
{
  "context": "*",
  "unsubscribe": [
    {"path": "*"}
  ]
}
```
[<]: #
To subscribe to the required criteria send a suitable subscribe message:

[>]: # (mdpInsert ```json fsnip ../samples/subscribe/docs-subscription_protocol1.json --prettify)
```json
{
  "context": "vessels.self",
  "subscribe": [
    {
      "path": "navigation.speedThroughWater",
      "period": 1000,
      "format": "delta",
      "policy": "ideal",
      "minPeriod": 200
    },
    {
      "path": "navigation.logTrip",
      "period": 10000
    }
  ]
}
```
[<]: #
* `path=[path.to.key]` is appended to the context to specify subsets of the context.
The path value can use the wildcard `*`. A wildcard in the middle of a path (`propulsion/*/oilTemperature`) allows any
value for that part and a wildcard at the end (`propulsion/port/*`) matches all paths beginning with the specified
prefix.

The following are optional, included above only for example as it uses defaults anyway:

* `period=[millisecs]` becomes the transmission rate, e.g. every `period/1000` seconds. Default: 1000
* `format=[delta|full]` specifies delta or full format. Default: delta
* `policy=[instant|ideal|fixed]`. Default: ideal. (does not apply to meta - see below)
 * `instant` means send all changes as fast as they are received, but no faster than `minPeriod`. With this policy the
     client has an immediate copy of the current state of the server.
 * `ideal` means use `instant` policy, but if no changes are received before `period`, then resend the last known
   values.
 * `fixed` means simply send the last known values every `period`.
* `minPeriod=[millisecs]` becomes the fastest message transmission rate allowed, e.g. every `minPeriod/1000` seconds.
    This is only relevant for policy='instant' to avoid swamping the client or network.

You can subscribe to multiple data keys multiple times, from multiple apps or devices. Each app or device simply
subscribes to the data it requires, and the server and/or client implementation may combine subscriptions to avoid
duplication as it prefers on a per connection basis. At the same time it is good practice to open the minimum
connections necessary, for instance one WebSocket connection shared between an instrument panel with many gauges,
rather then one WebSocket connection per gauge.

## Meta data
Meta is updated via the `meta` section within the delta message. As meta changes infrequently it is only sent when it has changed.

Servers implementing the subscription model (ie. using deltas) SHOULD implement meta deltas. Where meta deltas are implemented, servers MUST only ever send full copies of the meta for a leaf, ie. they MUST NEVER send a partial meta.

Upon receiving a new subscription a server MUST send the meta for each leaf subscribed to; this MAY be in the same JSON document as the values, or in a separate one prior to sending values for that leaf or leaves. Subsequently the server MUST resend the full meta for a leaf each time any item in that meta is changed. This is equivalent to the `instant` subscription for values. Therefore meta is never subscribed on an `ideal` or `fixed` policy, irrespective of the policy requested by the consumer (which applies to values only).

## Multiple value handling in subscriptions

A subscription to a key is for all the updates to that key. If there are multiple sources generating data for that key
the client will get all their updates.

If a client wants only the values of a single source it should subscribe to a path that includes the full path under
`values` including the source reference key of the source. The source reference should be enclosed in square brackets:
`navigation.speedThroughWater.values[n2kFromFile.43]`. The client can retrieve the relevant data via REST API. See
[Multiple Values](data_model_multiple_values.md) for more information.

## Single use, or intermittent data

When data is required once only, or upon request the `subscribe/unsubscribe` method should not be used. If the client
is http capable the REST API is a good choice, or use `get/list/put` messages over WebSockets or TCP.

## Use Cases and Proposed Solutions

### Local boat individual instruments

A gauge-type display for just one or a few data items for the 'self' vessel should be able to specify that it only
wants those items for the self vessel.

This can be achieved by a default WebSocket connection `/signalk/v1/stream?subcribe=none`, then sending a JSON message:

[>]: # (mdpInsert ```json fsnip ../samples/subscribe/docs-subscription_protocol2.json --prettify)
```json
{
  "context": "vessels.self",
  "subscribe": [
    {
      "path": "environment.depth.belowTransducer"
    },
    {"path": "navigation.speedThroughWater"}
  ]
}
```
[<]: #
The JSON format is also viable over a simple TCP or serial transport, and is therefore supported as the primary
subscription method.

### Map display with all known vessel positions & directions, served over 3G cellular connection

[>]: # (mdpInsert ```json fsnip ../samples/subscribe/docs-subscription_protocol3.json --prettify)
```json
{
  "context": "vessels.*",
  "subscribe": [
    {
      "path": "navigation.position",
      "period": 120000,
      "policy": "fixed"
    },
    {
      "path": "navigation.courseOverGround",
      "period": 120000,
      "policy": "fixed"
    }
  ]
}
```
[<]: #
The result is a delta message of the Signal K data with just `position` and `courseOverGround` branches for all known
vessels, sent every 2 minutes (120 seconds) even if no data has been updated.

### Position of a certain vessel, immediately it changes, but once per minute at most

[>]: # (mdpInsert ```json fsnip ../samples/subscribe/docs-subscription_protocol4.json --prettify)
```json
{
  "context": "vessels.230029970",
  "subscribe": [
    {
      "path": "navigation.position",
      "minPeriod": 60000,
      "policy": "instant"
    }
  ]
}
```
[<]: #
The result will be delta position messages for vessel 230029970, broadcast whenever it changes, but with minimum
interval of 60 seconds. Messages are delayed to meet the minimum interval with newer messages overriding the previous
message in the buffer.

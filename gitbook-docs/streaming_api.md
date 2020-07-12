# Streaming API

## WebSocket API: /signalk/«version»/stream

Initiates a WebSocket connection that will start streaming the server’s updates as Signal K delta messages. You can
specify the contents of the stream by using the `subscribe` query parameter.

- ws://hostname/signalk/«version»/stream?subscribe=self
- ws://hostname/signalk/«version»/stream?subscribe=all
- ws://hostname/signalk/«version»/stream?subscribe=none

With no query parameter the default is `self`, which will stream the data related to the `self` object. `all` will
stream all the updates the server sees and `none` will stream only the heartbeat, until the client issues subscribe
messages in the WebSocket stream.

A server may send the latest values it has cached when a client connects via WebSocket. A client can control this behavior with query parameter `sendCachedValues`. `false` will suppress sending the values and `true` force it. With no `sendCachedValues` parameter the server should send them.

If a server does not support some streaming options listed in here it must respond with HTTP status code `501 Not
Implemented`.

See [Subscription Protocol](subscription_protocol.md) for more details.

### Connection Hello

Upon connection the server MUST send a 'hello' JSON message, for example:

[>]: # (mdpInsert ```json cat ../samples/hello/docs-hello.json)
```json
{
    "name": "foobar marine server",
    "version": "1.0.4",
    "timestamp": "2018-06-21T15:09:16.704Z",
    "self": "vessels.urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
    "roles": [
        "master",
        "main"
    ]
}
```
[<]: #
This response is defined by the `hello.json` schema.

The server MUST provide:
- `roles` which specifies which roles the server is capable of providing. See [roles](connection.md#roles) for details about possible server roles.
- `version` which specifies the version of the SignalK schema and APIs that the server is using. See [versioning](versioning.md) for details about `version` strings.

The server SHOULD provide:
- `timestamp` but only if the server is equipped with a time source and it has been set.

The server MAY provide:
- `self` is the unique identifier of the vessel using the URN format specified for the uuid field in the Signal K schema. It may also use the URN format specified for the mmsi field in the Signal K schema if it exists. This is only provided if the server relates to a specific vessel, aircraft, aid to navigation or sar.
- `name` is the name of the Signal K server software, e.g. signalk-server

`name`, `self` and `roles` MUST return the same values as provided in the `swname`, `self` and `roles` properties within the [DNS-SD advertisement](connection.md) (if implemented).

`version` MUST be the same value as `version` within the associated endpoints list provided by the http `GET` request to `/signalk` within the [REST API](rest_api.md) (if implemented).

### History playback

The server MAY support history playback from a certain point in time with a specified rate.

To create a WebSocket connection that plays back data the client uses the request parameter `startTime` to specify the start timestamp and the optional request parameter `playbackRate` to specify the rate. Rate value parameter is a floating point value with value `1` equal to real time playback and for example `0.5` to half the real time rate and `5` to five times real time rate. Omitting the `playbackRate` will result in real time playback.

The playback api is located at `/signalk/v1/playback`. An example url for history playback streaming: `wss://localhost:3443/signalk/v1/playback?subscribe=self&startTime=2018-08-24T15:19:09Z&playbackRate=5`.

The hello message for a history playback stream MUST NOT contain the `timestamp` property and MUST include the properties `startTime` and `playbackRate`. The delta stream format for history playback is the normal streaming format. Timestamps indicate the time data was originally captured.

[>]: # (mdpInsert ```json cat ../samples/hello/docs-hello-playback.json)
```json
{
    "name": "foobar marine server",
    "version": "1.1.4",
    "startTime": "2018-08-24T15:19:09Z",
    "playbackRate": 1,
    "self": "vessels.urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
    "roles": [
        "master",
        "main"
    ]
}
```
[<]: #

A server MAY respond with `501 Not Implemented` status code if it does not support history playback and with `400 Bad Request` if it does not have data to play back for the given time period. A `404 Not Found` response is also acceptable to be backwards compatible.

## Streaming over TCP

A server MAY provide streaming delta service over TCP. See [Urls and Ports](urls_ports.md) and [Discovery and Connection Establishment](connection.md) for more details.

The messages MUST be serialised as JSON with one message per line using line terminator `\r\n` (carriage return and newline).

As there is no way to specify the subscription policy using url parameters as when opening a WebSocket connection the initial subscription policy is `none`, no active subscriptions. The client can modify the subscriptions after connection is established.

Connection `hello` is the same as when using WebSockets.

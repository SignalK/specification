#Ports, Urls and Versioning

### Short Names

- `self` refers to the current vessel. Normally used in `vessels.self...`.

### Ports

The Signal K HTTP and WebSocket services SHOULD be found on the usual HTTP/S ports (80 or 443). The services SHOULD be
found on the same port, but may be configured for independent ports and MAY be configured for ports other than HTTP/S.

A Signal K server MAY offer Signal K over TCP or UDP, these services SHOULD be on port 55555[[1]](#fn_1).

If an alternate port is needed it SHOULD be an arbitrary high port in the range 49152&ndash;65535[[2]](#fn_2).

### URL Prefix

The Signal K applications start from the `/signalk` root. This provides some protection against name collisions with
other applications on the same server. Therefore the Signal K entry point will always be found by loading
`http(s)://«host»:«port»/signalk`.

### Versioning

The version(s) of the Signal K API that a server supports SHALL be available as a JSON object available at `/signalk`:
```json
{
    "endpoints": {
        "v1": {
            "version": "1.1.2",
            "signalk-http": "http://192.168.1.2/signalk/v1/api/",
            "signalk-ws": "ws://192.168.1.2:34567/signalk/v1/stream"
        },
        "v3": {
            "version": "3.0",
            "signalk-http": "signalk/v3/api/",
            "signalk-ws": "ws://192.168.1.2/signalk/v3/stream",
            "signalk-tcp": "tcp://192.168.1.2:34568"
        }

    }
}
```

This response is defined by the `discovery.json` schema. In this example, the server supports two versions of
the specification: `1.1.2` and `3.0`. For each version, the server indicates which transport protocols it
supports and the URL that can be used to access that protocol's endpoint; in the example, the `1.1.2`
REST endpoint is located at `http://192.168.1.2/signalk/v1/api/`. Clients should use one of these published
endpoints based on the protocol version they wish to use.

The server must only return valid URLs and should use IANA standard protocol names such as `http`.
However, a server may support unofficial protocols and may return additional protocol names; for example,
the response above indicates the server supports a `signalk-tcp` stream over TCP at on port `34568`.

A server may return relative URIs that the client must resolve against the base of the original request.


#### Streaming WebSocket API: /signalk/v1/stream

Initiates a WebSocket connection that will start streaming the server's updates as Signal K delta messages. You can specify the contents of the stream by using a specific URL:

- ws://hostname/signalk/v1/stream?subscribe=self
- ws://hostname/signalk/v1/stream?subscribe=all
- ws://hostname/signalk/v1/stream?subscribe=none

With no query parameter the default is `self`, which will stream the data related to the `self` object. `all` will stream all the updates the server sees and `none` will stream only the heartbeat, until the client issues subscribe messages in the WebSocket stream.

If a server does not support some streaming options listed in here it must respond with http status code `501 Not Implemented`.

See [Subscription Protocol](subscription_protocol.html) for more details.

#### Streaming Connection "Hello"

Upon accepting a connection a server MUST send a 'hello' message before any other communicaiton is sent. The format of the 'hello' message is as follows:

```json
{
  "version": "1.1.2",
  "source": "actisense.ngw-1.1234567",
  "timestamp": "2015-04-13T01:13:50.524Z",
  "self": "123456789"
}
```

"version" - The 'hello' message MUST contain a "version" element which MUST have a string value identifying the lowest version of signalk-delta that defines the format of the messages that will be sent by the server.

"source" - The 'hello' message MUST contain a "source" element which MUST have a string value that identifies the server as follows: manufacturer/publisher.device/application.uuid, where:
* maufacturer is the name of a manufacturer or publisher in the list maintained in this repository
* device is the name of a device or software application made by the manufacturer or publisher in the list maintained in this repository
* uuid is a uneque identifier attributed to the physical device or installation of the application by the manufacturer/publisher
When a source is not provided in a signalk-delta message the client SHOULD take the source from the 'hello' as a default.

"timestamp" - The 'hello' message SHOULD contain a "timestamp" element which MUST have a string value representing the date and time at the server that the 'hello' mesage was sent at. The client SHOULD compare the timestamp to the local time at the client at which the 'hello' is received and use the delta to correct the timestamp of subsequent signalk-delta messages recieved from the server.

"self" - The 'hello' massege MAY contain a "self" element whcih MUST have a string value that identifies the vessle the message pertains to.


# REST API

Signal K producers MAY implement an HTTP API which consumers can use to self-configure, poll for Signal K data or make
configuration changes. As specified in the previous section, all URLs for interacting with Signal K are rooted at
`/signalk`.

## GET /signalk

Making a `GET` request to `/signalk` returns a JSON object which specifies the available Signal K endpoints and some
information about the server. Also see [versioning](versioning.md) for details about `version` strings.

```json
{
  "endpoints": {
    "v1": {
      "version": "1.alpha1",
      "signalk-http": "http://localhost:3000/signalk/v1/api/",
      "signalk-ws": "ws://localhost:3000/signalk/v1/stream"
    },
    "v3": {
      "version": "3.0",
      "signalk-http": "http://localhost/signalk/v3/api/",
      "signalk-ws": "ws://localhost/signalk/v3/stream",
      "signalk-tcp": "tcp://locahost:8367"
    }
  },
  "server": {
    "id": "signalk-server-node",
    "version": "0.1.33"
  }
}
```

This response is defined by the `discovery.json` schema. In this example, the server supports two versions of the
specification: `1.alpha1` and `3.0`. For each version, the server indicates which transport protocols it supports and
the URL that can be used to access that protocol‘s endpoint. Clients should use one of these published endpoints based
on the protocol version they wish to use.

The server must only return valid URLs and should use IANA standard protocol names such as `http`. However, a server
may support unofficial protocols and may return additional protocol names; for example, the response above indicates
the server supports a `signalk-tcp` stream over TCP at on port 8367.

A server may return relative URIs that the client must resolve against the base of the original request.

A server may return information about itself in the `server` property. The id and version scheme is not defined as part
of the specification and there is no registry for id values.

## /signalk/v1/api/

**Note the trailing slash in the path**

The base URL MUST provide a Signal K document that is valid according to the full Signal K [schema
specification]({{site.baseurl}}specification.html). The contents SHOULD be all the current values of the data items the
server knows in the Signal K full format as specified in [Full and Delta Models](data_model.md).

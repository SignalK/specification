# REST API

Signal K producers MAY implement an HTTP API which consumers can use to self-configure, poll for Signal K data or make
configuration changes. As specified in the previous section, all URLs for interacting with Signal K are rooted at
`/signalk`.

## GET /signalk

Making a `GET` request to `/signalk` returns a JSON object which specifies the available Signal K endpoints and some
information about the server. Also see [versioning](versioning.md) for details about `version` strings.

[>]: # (mdpInsert ```json fsnip ../samples/discovery/docs-rest_api.json --ellipsify v3)
```json
{
  "endpoints": {
    "v1": {
      "version": "1.0.0-alpha1",
      "signalk-http": "https://localhost:3000/signalk/v1/api/",
      "signalk-ws": "ws://localhost:3000/signalk/v1/stream",
      "signalk-tcp": "tcp://localhost:8367"
    },
    "v3": {...}
  },
  "server": {
    "id": "signalk-server-node",
    "version": "0.1.33"
  }
}
```
[<]: #
This response is defined by the `discovery.json` schema. In this example, the server supports two versions of the
specification: `1.alpha1` and `3.0`. For each version, the server indicates which transport protocols it supports and
the URL that can be used to access that protocol‘s endpoint. Clients should use one of these published endpoints based
on the protocol version they wish to use.

The server must only return valid URLs and should use IANA standard protocol names such as `http`. However, a server
may support unofficial protocols and may return additional protocol names; for example, the response above indicates
the server supports a `signalk-tcp` stream over TCP at on port 8367.

A server may return relative URIs that the client must resolve against the base of the original request.

A server MAY return information about itself in the `server` property. The id and version scheme is not defined as part
of the specification and there is no registry for id values. If providfed, the `id` and `version` MUST be the same values
as `swname` and `swvers` within the [DNS-SD advertisement](connection.md) (if implemented), and also the `id` MUST
provide the same value as `name` within the [Websocket hello message](streaming_api.md) (if implemented).

# v1 specification

If a REST API is provided it MUST be located at `http[s]://<<host>>:[port]/signalk/v1/api/`
If a streaming websocket is provided it MUST be located at `ws[s]://<<host>>:[port]/signalk/v1/stream`

The discovery json document published by an IPv4 address should advertise IPv4 endpoints and similarly the discovery json at an IPv6 address should advertise IPv6 endpoints.

Version 1 of the dicovery document does not support multiple versions of signalk on the same server, and does not support both a secure and plain endpoint for a given service. eg. the REST API can be available over http or https but not both. Version 1 consumers MUST support secure versions of the protocols.

## /signalk/v1/api/

**Note the trailing slash in the path**

The base URL MUST provide a Signal K document that is valid according to the full Signal K [schema
specification]({{site.baseurl}}specification.html). The contents SHOULD be all the current values of the data items the
server knows in the Signal K full format as specified in [Full and Delta Models](data_model.md).

## /signalk/v1/api/*

The Signal K data SHOULD be available via the REST API. For example, `GET /signalk/v1/api/vessels` should return all
of the data under the `vessels` container in JSON format. Likewise, `GET
/signalk/v1/api/vessels/urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d` should return data for one specific
vessel. In other words, the full Signal K data model SHOULD be traversable by any client making GET requests to an
arbitrary depth.

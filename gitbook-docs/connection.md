# Discovery and Connection Establishment

## Service Discovery

A Signal K server SHOULD advertise its services using DNS Service Discovery (DNS-SD) via Mutlicast DNS (mDNS); also
known as Bonjour. The server MUST provide DNS [Service (SRV) Records](https://en.wikipedia.org/wiki/SRV_record) and
[Text (TXT) Records](https://en.wikipedia.org/wiki/TXT_record) describing the Signal K interfaces it provides. These
service identifiers are:

* `_http._tcp` and/or `_https._tcp` for the server's web interface
* `_signalk-http._tcp` and/or `_signalk-https._tcp` for the Signal K REST API
* `_signalk-ws._tcp` and/or `_signalk-wss._tcp` for the WebSocket data stream

One of the following parameters MUST be set, both MAY be set:

* `vessel_uuid` is the Signal K UUID which uniquely identifies the vessel
* `vessel_mmsi` is the MMSI assigned to the vessel

A vessel may have one or both of these values. One or both MUST be available when advertising the Signal K server.

The following parameters SHOULD be set in the TXT record:

* `server` is the name of the Signal K server software, e.g. signalk-server-node
* `version` is the version of the Signal K server software

These parameters identify the server and its version. They are purely informational.

The following parameters MAY be set in the TXT record:

* `vessel_name` is the registered name of the vessel
* `vessel_brand` is the name of the manufacturer of the vessel
* `vessel_type` is the model of the vessel

An example DNS-SD record set might look something like this

```
Service data for service 'signalk-http' of type '_signalk-http._tcp' in domain 'local' on 4.0:
    Host 10-1-1-40.local (10.1.1.40),
    port 80,
    TXT data: [
        'vessel_name=Volare',
        'vessel_brand=Friendship',
        'vessel_type=22',
        'vessel_mmsi=503123456',
        'vessel_uuid=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'version=0.1.23',
        'server=signalk-server'
        ]

Service data for service 'signalk-ws' of type '_signalk-ws._tcp' in domain 'local' on 4.0:
    Host 10-1-1-40.local (10.1.1.40),
    port 3000,
    TXT data: [
        'vessel_name=Volare',
        'vessel_brand=Friendship',
        'vessel_type=22',
        'vessel_mmsi=503123456',
        'vessel_uuid=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'version=0.1.23',
        'server=signalk-server'
        ]
```

This shows a Signal K server with the HTTP REST API on port 80 and the WebSocket data stream on port 3000.

## Connection Establishment

Using the information above a web client or HTTP capable device can discover and connect to a Signal K server using the
following process:

* Query for Signal K services using mDNS
* Connect to the host and port advertised as 'signalk-http' via HTTP (e.g. `http://10.1.1.40:80`)
* Per the [Ports, Urls and Versioning](urls_etc.md) section, make a GET request for `/signalk` to retrieve a JSON
  object containing an `endpoints` JSON object
* Make further [REST calls](rest_api.md) for more specific data, or open a websocket connection to [start
  streaming](streaming_api.md) updates.

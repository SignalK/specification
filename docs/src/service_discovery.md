#### Service Discovery

A Signal K server SHOULD advertise its services over mDNS/Bonjour. The server MUST use the service types

* `_signalk-http._tcp` for http API
* `_signalk-ws._tcp` for WebSocket
* `_signalk-https._tcp` for HTTPS API
* `_signalk-wss._tcp` for secure WebSocket

Furthermore a server SHOULD advertise its web interface with normal Bonjour convention `_http._tcp` and `_https._tcp`.

A sample Bonjour record output, dumped using avahi-discover:

```
Service data for service 'signalk-http (2)' of type '_signalk-http._tcp' in domain 'local' on 4.0:
    Host 10-1-1-40.local (10.1.1.40),
    port 8080,
    TXT data: [
        'vessel_uuid=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'version=v1.0.0',
        'vessel_name=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'vessel_mmsi=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'server=signalk-server',
        'path=/signalk'
        ]

Service data for service 'signalk-ws (2)' of type '_signalk-ws._tcp' in domain 'local' on 4.0:
    Host 10-1-1-40.local (10.1.1.40),
    port 3000,
    TXT data: [
        'vessel_uuid=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'version=v1.0.0',
        'vessel_name=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'vessel_mmsi=urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5',
        'server=signalk-server',
        'path=/signalk'
        ]
```

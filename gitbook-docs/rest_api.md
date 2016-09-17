#### REST/HTTP API: /signalk/v1/api/

Note the trailing slash in the path.

The base URL MUST provide a Signal K document that is valid according to the full Signal K [schema
specification]({{site.baseurl}}specification.html). The contents SHOULD be all the current values of the data items the
server knows.

If the path following the base is a valid Signal K path `GET` MUST retrieve the Signal K branch named by the path; e.g.
`/signalk/v1/api/vessels/123456789/navigation/speedThroughWater` returns

```json
{
    "value": 2.55,
    "source": {
        "type": "NMEA0183",
        "src": "VHW",
        "label": "signalk-parser-nmea0183"
    },
    "timestamp": "2015-08-31T05:45:36.000Z"
}
```

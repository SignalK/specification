# GET Requests

GET requests are sent to a server to request a value. For example, a client would use GET to find the state of the
anchor light, the heading of the autopilot, or position of the anchor.

See [Request/Response](request_response.md) for more details on request/response in Signal K.

## Making a Request to Get a Value

To get a value, a GET request should be sent via HTTP or using a Signal K __get__ message.

### Via HTTP
```
GET http://localhost:3000/signalk/v1/api/vessels/self/steering/autopilot/target/headingTrue

```

### Via a Delta

[>]: # (mdpInsert ```json fsnip ../data/get-valid/delta-get-array.json)
```json
{
  "context": "vessels.urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5",
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "get": [{
	  "path": "a.b.c"
  }]
}
```
[<]: #

The `context` key is optional, and defaults to `vessels.self`, which is the usual case. You can include it to be able to set values on other vessels.

#### NOTE ####
The above GET request (v1) uses an array to allow multiple keys in a single GET. This is deprecated and strongly discouraged as it cannot work via http.  
An alternative format has been added to the v1 specification where the  GET request is:

[>]: # (mdpInsert ```json fsnip ../data/get-valid/delta-get-no-array.json)
```json
{
  "context": "vessels.urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5",
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "get": {
	  "path": "a.b.c"
  }
}
```
[<]: #

In the v2 API the array format will be removed. Implementors are recommended to support both in the interim.

## Return states

A GET request in the array format is only successful if _ALL_ if the items are successful. It is up to the client to ascertain which were in error, and why.

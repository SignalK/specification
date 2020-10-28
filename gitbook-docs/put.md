# PUT Requests

PUT requests are sent to a server to request an action to be taken. For example, a client would use PUT to switch the anchor light on or off, change the heading of the autopilot, or change the current input on a stereo.

Note that this is very different than updating the current state of something. Use a delta update message to report the current / updated value of something, for example to report on the current wind speed from a sensor. See [Delta Format](data_model.md)

See [Request/Response](request_response.md) for more details on request/response in Signal K.

## Making a Request To Take an Action

To change a value, a PUT request should be sent via HTTP or using a Signal K __put__ delta.

The `source` field is optional. If a request is sent without the source and there is more than one source for the
value, the server should respond with a 400 (Bad Request) HTTP status code.

### Via HTTP
```
PUT http://localhost:3000/signalk/v1/api/vessels/self/steering/autopilot/target/headingTrue
{
  "value": 1.52,
  "source": "actisense.204",
}
```

### Via a Delta

[>]: # (mdpInsert ```json fsnip ../test/data/put-valid/delta-put-array.json)
```json
{
  "context": "vessels.urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5",
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "put": [{
	  "path": "a.b.c",
	  "value": 1234
  }]
}
```
[<]: #

The `context` key is optional, and defaults to `vessels.self`, which is the usual case. You can include it to be able to set values on other vessels.

#### NOTE ####
The above PUT request (v1) uses an array to allow multiple keys in a single PUT. This is deprecated and strongly discouraged as it causes complex problems 
with the request/response semantics in cases of partial failures.  An alternative format has been added to the v1 specification where the  PUT request is:

[>]: # (mdpInsert ```json fsnip ../test/data/put-valid/delta-put-no-array.json)
```json
{
  "context": "vessels.urn:mrn:signalk:uuid:6b0e776f-811a-4b35-980e-b93405371bc5",
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "put": {
	  "path": "a.b.c",
	  "value": 1234
  }
}
```
[<]: #

In the v2 API the array format will be removed. Implementors are recommended to support both in the interim.

## Return states

A PUT request in the array format is only successful if _ALL_ if the items are successful. It is up to the client to ascertain which were in error, and why.

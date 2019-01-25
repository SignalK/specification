# PUT Requests

PUT requests are sent to a server to request a change to a value. For example, a client would use PUT to switch the
anchor light on or off, change the heading of the autopilot, or set position of the anchor.

See [Request/Response](request_response.md) for more details on request/response in Signal K.

## Making a Request to Change a Value

To change a value, a PUT request should be sent via HTTP or using a Signal K __put__ delta.

The `source` field is optional. If a request is sent without the source and there is more than one source for the
value, the server should respond with a 400 (Bad Request) HTTP status code.

The PUT request is defined such that it puts the value as the _leaf_ node of the path. 

You must use the full signalk path to the resource, 
including `vessels.self` if needed. This allows us to PUT to the root paths such as `resources` without added server complexity.

Take care, if you write to a path, eg `resources.waypoints` with an object 

```
{
	"urn:mrn:signalk:uuid:66d09...3094f83": {
		"feature": {
			...
		},
		"position": {
			...
		}
	}
}

``` 
then `resource.waypoints` will be set to that object. When you send another waypoint it will _overwrite_ the current object.

The correct way is to PUT to the full path to the leaf, eg `resources.waypoints.urn:mrn:signalk:uuid:66d09...3094f83` with an object 

```
   {
		"feature": {
			...
		},
		"position": {
			...
		}
   }

``` 

### Via HTTP
```
PUT http://localhost:3000/signalk/v1/api/vessels/self/steering/autopilot/target/headingTrue
{
  "value": 1.52,
  "source": "actisense.204",
}
```

### Via a Delta

[>]: # (mdpInsert ```json fsnip ../data/put-valid/delta-put-array.json)
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



#### NOTE ####
The above PUT request (v1) uses an array to allow multiple keys in a single PUT. This is deprecated and strongly discouraged as it causes complex problems 
with the request/response semantics in cases of partial failures.  An alternative format has been added to the v1 specification where the  PUT request is:

[>]: # (mdpInsert ```json fsnip ../data/put-valid/delta-put-no-array.json)
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

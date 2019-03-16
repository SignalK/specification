# Resources

Resources are collections of objects that are used to represent data that serves as additional information to aid with navigation, etc. 

Resources are:
- Usually persisted in a non-volatile data store _(i.e. not lost when server re-starts)_
- Potentially large in number and / or record size
- Able to be created, updated and deleted by both applications and server processes
- A top level path in the Signal K API: `/signalk/v1/api/resources/*`

Resource entries:
- Of a specific type are grouped under a specific path _i.e. `/signalk/v1/api/resources/waypoints`_

- Are identified by a __uuid__. _e.g. `urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd`_

- Originating from other vessels will have a `$source` attribute that contains the id of the source vessel.

- May contain references to other resources in either the same or different group. _i.e. A route's `start` and `end` attribute contains a reference to a `waypoint` resource._


## Working with Resources

The retrieval, creation, updating or deletion of resource entries is done by making the appropriate request to the Signal K server. 

_Note: Resource requests differ from other types of requests as there is no `context` required._

See [Request/Response](request_response.md) for more details on request/response behaviour in Signal K.

---

## Getting Resource Entries

Resource entries are returned when either an HTTP or Delta __GET__ request is made to a resource path. 

- To return ALL of the entries within a resource group make a __GET__ request to the path for that group.  _e.g. `/signalk/v1/api/resources/routes`_ 

- To return an individual resource entry make a __GET__ request to its path.  _e.g. `/signalk/v1/api/resources/notes/urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd`_


### Restricting the number of returned entries

As the number of entries within a specific resource group can be large, you can provide parameters with your request to limit the number of entries returned.

These parameters can be used individually or together to return the required resource entries.

`GET "/signalk/v1/api/resources/routes?bounds=r1f2r&maxcount=200"`

#### 1. Restrict by Bounded Area

You can request resources that fall within a bounded geographic area by using the `bounds` parameter with a __geohash__ to define the size of the bounded area.

### Via HTTP

`GET "/signalk/v1/api/resources/routes?bounds=r1f2r"` 

### Via a Delta

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "get": [{
        "path": "resources.notes",
        "params": { "bounds": "r1f2r" }
  }]
}
```

#### 2. Specify maximum number of returned entries

You can specify the maximum number of resource entries that are returned by using the `maxcount` parameter.

### Via HTTP

`GET "/signalk/v1/api/resources/routes?maxcount=200"` 

### Via a Delta

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "get": [{
        "path": "resources.notes",
        "params": { "maxcount": 200 }
  }]
}
```

#### Implementation specific parameters

Specific use cases may require a richer set of options to target the entries to be returned. In these cases implementors can provide their own parameters for use in conjunction with those defined above as part of their product / solution.

### Via HTTP

`GET "/signalk/v1/api/resources/routes?myparam=myparam_value&maxcount=150"`

### Via a Delta

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "get": [{
        "path": "resources.notes",
        "params": { 
            "bounds": "r1f2r", 
            "maxcount": 200 
        }
  }]
}
```

---

## CREATING a Resource Entry

_Note: The creation, update or deletion of a resource should trigger the relevent Delta UPDATE message._

### Via HTTP

__1. Where the server will generate the UUID of the new resource:__

Send an HTTP POST request to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { ... },
    "source": "sourceId"
}
```

__2. Where the client will generate the UUID of the new resource:__

Send an HTTP PUT request to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { 
        "my_uuid": { ... }
    },
    "source": "sourceId"
}
```

_Example: Server creates resource uuid_
```json
POST http://localhost:3000/signalk/v1/api/vessels/resources/notes
{
  "value": {
      "position":{
          "latitude": -35.02577800787516,
          "longitude": 138.02825595260182
        },
        "title":"My Note",
        "description":"My note description",
        "url":"http://mynote/url",
        "mimeType":"text/html"
  },
  "source": "myApp",
}
```

_Example: Client creates resource uuid_

```json
PUT http://localhost:3000/signalk/v1/api/vessels/resources/notes
{
  "value": {
        "urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd": {
            "position": {
                "latitude": -35.025778007875,
                "longitude": 138.02825595260182
            },
            "title":"My Note",
            "description":"My note description",
            "url":"http://mynote/url",
            "mimeType":"text/html"
        }
  },
  "source": "myApp",
}
```

The `source` field is optional. If a request is sent without the source and there is more than one source for the
value, the server should respond with a 400 (Bad Request) HTTP status code.

### Via a Delta

__1. Where the server will generate the UUID of the new resource:__

Send a PUT message to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { ... },
    "path": "resources.<resource_type>"
}
```

__2. Where the client will generate the UUID of the new resource:__

Send a PUT message to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { 
        "my_uuid": { ... }
    },
    "path": "resources.<resource_type>"
}
```

_Note: The `context` attribute is not required when making Resource requests._


_Example: Server creates resource uuid_

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "put": [{
        "path": "resources.notes",
        "value": {
            "position":{
                "latitude": -35.02577800787516,
                "longitude": 138.02825595260182
            },
            "title":"My Note",
            "description":"My note description",
            "url":"http://mynote/url",
            "mimeType":"text/html"
        }
  }]
}
```

_Example: Client creates resource uuid_

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "put": [{
        "path": "resources.notes",
        "value": {
            "urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd": {
                "position":{
                    "latitude": -35.02577800787516,
                    "longitude": 138.02825595260182
                },
                "title":"My Note",
                "description":"My note description",
                "url":"http://mynote/url",
                "mimeType":"text/html"
            }
        }
  }]
}
```
---

## UPDATING a Resource Entry

### Via HTTP

Send an HTTP PUT request to the path of the resource with a payload of the following format:
```json
{
    "value": { ... },
    "source": "sourceId"
}
```

_Example:_
```json
PUT http://localhost:3000/signalk/v1/api/vessels/resources/notes/urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd
{
  "value": {
      "position":{
          "latitude": -35.02577800787516,
          "longitude": 138.02825595260182
        },
        "title":"My Note",
        "description":"My note description",
        "url":"http://mynote/url",
        "mimeType":"text/html"
  },
  "source": "myApp",
}
```

### Via a Delta

Send a PUT message to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { ... },
    "path": "resources.<resource_type>.<my_uuid>"
}
```

_Note: The `context` attribute is not required when making Resource requests._


```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "put": [{
        "path": "resources.notes.urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd",
        "value": {
            "position":{
                "latitude": -35.02577800787516,
                "longitude": 138.02825595260182
            },
            "title":"My Note",
            "description":"My note description",
            "url":"http://mynote/url",
            "mimeType":"text/html"
        }
  }]
}
```
---

## DELETING a Resource Entry


### Via HTTP

Send an HTTP DELETE request to the path of the resource.

`DELETE http://localhost:3000/signalk/v1/api/vessels/resources/notes/urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd`

### Via a Delta

Send a PUT message to the appropriate resource path containing a payload with a value of `null`.

_Note: The `context` attribute is not required when making Resource requests._


```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "put": [{
        "path": "resources.notes.urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd",
        "value": null
  }]
}
```
---

## Handling invalid values

The Signal K server should validate the value supplied within a request against the schema of the target resource group and return the relevent `state` and `statusCode` as detailed in [Request/Response](request_response.md) .


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

### via HTTP
Parameters are specified as a query string _e.g. ../resources/routes?param1=value1&param2=value2"_

### via Delta

Parameters are specified within a `params` object in the __GET__ request.

_Example_
```
"get": [{
    "path": "resources.notes",
    "params": { 
        "param1": value1,
        "param2": value2
    }
}]
```

#### 1. Specify maximum number entries to return

You can specify the maximum number of resource entries that are returned by using the `limit` parameter.

### via HTTP

```
GET "/signalk/v1/api/resources/routes?limit=100"
``` 

### via Delta

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371ac5",
  "get": [{
        "path": "resources.notes",
        "params": { "limit": 100 }
  }]
}
```

_Note: The Delta response to a request where the number of returned resources has been capped at `limit` should include a `message` indicating this._

```json
{
  "requestId": "123345-23232-232323",
  "state": "COMPLETED",
  "statusCode": 200,
  "message": "Maximum number of items returned."
}
```


#### 2. Restrict by Bounded Area

You can request resources that fall within a bounded geographic area by using one of the following parameters:

- __GeoHash__:
Use the `geohash` parameter along with a __geohash__ to define the bounded area from within which resources will be returned.

- __SW / NE coordinates__:
Use the `geobounds` parameter to supply the coordinates  `x1,y1,x2,y2` that define the SW `(x1,y1)` and NE `(x2,y2)` corners of the bounded area from within which resources will be returned.

- __Distance from vessel__:
Use the `geobox` parameter to specify the radius _(in meters)_ of a square, with the vessel at the center, from within which resources will be returned.

_Examples:_

### via HTTP

```
GET "/signalk/v1/api/resources/routes?geohash=r1f2r" 

GET "/signalk/v1/api/resources/routes?geobounds=138.23,-38.123, 139.76,-37.89" 

GET "/signalk/v1/api/resources/routes?geobox=10000"

GET "/signalk/v1/api/resources/routes?geohash=r1f2r&limit=200"
```

### via Delta

```json
{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371bc5",
  "get": [{
        "path": "resources.notes",
        "params": { 
            "geo": {
                "hash": "r1f2r" 
            }
        }
  }]
}

{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371e25",
  "get": [{
        "path": "resources.waypoints",
        "params": { 
            "geo": {
                "bounds": [138.23,-38.123,139.76,-37.89]
            }
        }
  }]
}

{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371b35",
  "get": [{
        "path": "resources.notes",
        "params": { 
            "geo": {
                "box": 10000 
            }
        }
  }]
}

{
  "requestId": "6b0e776f-811a-4b35-980e-b93405371b45",
  "get": [{
        "path": "resources.notes",
        "params": { 
            "geo": {
                "hash": "r1f2r"
            },
            "limit": 100
        }
  }]
}
```

---

## CREATING a Resource Entry

To create a resource a complete resource record is sent to the Signal K server via either an HTTP or Delta request.

A resource is identified by a __uuid__ which will be generated by the Signal K server and assigned to the resource entry.

The Signal K server will emit a Delta UPDATE message for the new resource upon success.

### via HTTP

Send an HTTP POST request to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { <resource_data> },
    "source": "sourceId"
}
```

_Example:_

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

The `source` field is optional. If a request is sent without the source and there is more than one source for the
value, the server should respond with a 400 (Bad Request) HTTP status code.

### via Delta

__1. Where the server will generate the UUID of the new resource:__

Send a PUT message to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { <resource_data> },
    "path": "resources.<resource_group>"
}
```

_Note: The `context` attribute is not required when making Resource requests._


_Example:_

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
---

## UPDATING a Resource Entry

To update a resource entry a complete resource record is sent to the Signal K server via either an HTTP or Delta request.

A resource to be updated is identified by the supplied __uuid__.

The Signal K server will emit a Delta UPDATE message for the updated resource upon success.

### via HTTP

Send an HTTP PUT request to the path of the resource _(which includes the resource uuid)_ with a payload of the following format:
```json
{
    "value": { <resource_data> },
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

### via Delta

Send a PUT message to the appropriate resource path containing a payload of the following format:
```json
{
    "value": { <resource_data> },
    "path": "resources.<resource_group>.<uuid>"
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

To delete a resource entry the appropriate HTTP or Delta request is made to the relevant resource path.

The Signal K server will emit a Delta UPDATE message for the deleted resource _(with a value of `null`)_ upon success.

__Note:__ _Attempting to delete a resource may fail due to it containing links / references to other resources, permissions, etc._ See [Request/Response](request_response.md) for details.

### via HTTP

Send an HTTP DELETE request to the path of the resource that is to be removed.

_Example:_
```
DELETE http://localhost:3000/signalk/v1/api/vessels/resources/notes/urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd
```

### via a Delta

Send a PUT message to the path of the resource to be removed with a value of `null`.

```json
{
    "value": null,
    "path": "resources.<resource_group>.<uuid>"
}
```

_Note: The `context` attribute is not required when making Resource requests._

_Example:_

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


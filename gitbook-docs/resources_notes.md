# Notes

Notes are a Signal K resource type that provide a means to capture and display additional information in a variety of formats. They are accessed via the Signal K API path `/signalk/v1/api/resources/notes`.

Notes can contian both text and / or a link to additional text, images, etc.

They can stand alone or be associated with: 
- a geographic location by assigning a value to `position`
- an area by assigning a value to `geohash` or `region` 
- other notes by entering the same value in `group`  for each of the related notes.

---

### Note Properties:

`title`: Text containing the title of the note.

`description`: Text describing the object that the note is associated with.

`mimeType`: MIME type of the note. If this property is `null` or `undefined` then the note is considered plain text.

`url`: Link to additional note content. If this property is `null` or `undefined` then the `description` should be considred the content of the note. 

`group`: Text representing the name of a collection that this note is part of. Notes with the same `group` value are considered part of the collection. If this property is `null` or `undefined` then the note is not part of any collection.

`authors`: A list containing the details of the authors / contributors to the note content. Each author entry can contain one or more of the following: `name`, `email`, `url`.

`geohash`: Geographic area to which the note is attached.

`position`: Geographic position to which the note is attached. If defined in conjunction with `geohash`, it should be within the `geohash` area.

`region`: The UUID of a `region` resource to which the Note is attached.

`properties`: An object that is a placeholder for application / use case specific values.

_Example: Define a `draft` property to indicate the note has not been finalised._
```json
{
    "title": "Big Island",
    "description": "Big Island Approach notes.....",    
    "geohash": "rbejg",
    "properties": {
        "draft": true
    }               
}
```

### Example: Combining `region` and `group`

Using a combination of `region` and `group` the following notes contain information about safe anchorages in the Great Barrier Reef _(defined in a `region` resource)_.

```json
{
    "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc4123b" : {
        "title": "Whitehaven Beach",
        "description": "Whitehaven Beach is a pristinebeach on Whitsunday Island.....",    
        "geohash": "rk3uv",
        "group": "GBR Safe Anchorages",
        "region": "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc8021e"              
    },
    "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc4123b" : {
        "title": "Shute Harbour",
        "description": "is a sheltered port for small vessels located approximately 10 km east of Airlie Beach.....",    
        "geohash": "rk3u9",
        "group": "GBR Safe Anchorages",
        "region": "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc8021e"
    }
}
```

### Example: Combining `region`, `geohash` and `position`

By using a combination of `region`, `geohash` and `position` notes can be assigned to specific geolocations within an area.
```json
{
    "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc4123b" : {
        "title": "Big Harbour etry",
        "description": "...is a sheltered port .....",    
        "region": "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc8021e",
        "geohash": "rk3u9",
        "position":{
            "latitude": -20.2919444444,
            "longitude": 148.785
        }
    },
    "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc4123b" : {
        "title": "Big Harbour Jetty",
        "description": "...",    
        "region": "urn:mrn:signalk:uuid:c0d79335-4e25-4245-8892-54e8ccc8021e",
        "geohash": "rk3u9",
        "position":{
            "latitude": -20.2913,
            "longitude": 148.779
        }      
    }
}
```
 
---

## Working with Notes

The retrieval, creation, updating or deletion of notes is done by making the appropriate request to the Signal K server. 

See [Request/Response](request_response.md) for more details on request/response behaviour in Signal K.

_Note: Resource requests do not require a `context`._

---
#### RETRIEVING NOTES
To retrieve a list of notes from the server make a __GET__ request to the notes path.  _e.g. `/signalk/v1/api/resources/notes`_ 

To retrieve an individual note make a __GET__ request to its path. 

__via HTTP:__
```
GET `/signalk/v1/api/resources/notes/urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd`_
```

__via Delta:__
```
"get": [{
    "path": "resources.notes"
}]

"get": [{
    "path": "resources.notes.urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd"
}]
```
---
#### CREATING NOTES

__via HTTP:__

Send a __POST__ request containing the note's details.
```json
POST http://localhost:3000/signalk/v1/api/vessels/resources/notes
{
    "value": { 
        "title": "Dusky Shoal",
        "description": "Anchoring information for Dsuky Shoal.....",
        "authors": [
            {
                "name": "Ian West"
            }
        ],             
        "geohash": "rbejg:Big Island",
        "properties": {
            "draft": true
        },
        "timestamp": "2015-03-06T16:57:53.643Z",
        "source": {
            "label": "note",
            "type": "manual"
        } 
    }
}
```

__via Delta:__

Send a __PUT__ request containing the note's details.
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

#### UPDATING NOTES

To update a note send a __PUT__ request containing the note's details, via either an HTTP or Delta request, to the path of the note.

The note to be updated is identified by its __uuid__.

__via HTTP:__
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

__via Delta:__

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

#### DELETING NOTES

__via HTTP:__

To delete a note send a __DELETE__ request to the note's path.

```
DELETE http://localhost:3000/signalk/v1/api/vessels/resources/notes/urn:mrn:signalk:uuid:36f9b6b5-959f-46a1-8a68-82159742aadd
```

__via Delta:__

Send a PUT message to the path of the note to be removed with a value of `null`.

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

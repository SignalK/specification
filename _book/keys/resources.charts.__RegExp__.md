## /resources/charts/<RegExp>

A chart

* Type: `object`
* Path: `/resources/charts/(^[A-Za-z0-9_-]{8,}$)`
* Node: `(^[A-Za-z0-9_-]{8,}$)`

### Source:
```
{
  "type": "object",
  "description": "A chart",
  "properties": {
    "name": {
      "type": "string",
      "description": "Chart common name",
      "example": "NZ615 Marlborough Sounds"
    },
    "identifier": {
      "type": "string",
      "description": "Chart number",
      "example": "NZ615"
    },
    "description": {
      "type": "string",
      "description": "A description of the chart"
    },
    "tilemapUrl": {
      "type": "string",
      "description": "A url to the tilemap of the chart for use in TMS chartplotting apps",
      "example": "http://{server}:8080/mapcache/NZ615"
    },
    "region": {
      "type": "string",
      "description": "Region related to note. A pointer to a region UUID. Alternative to geohash"
    },
    "geohash": {
      "description": "Position related to chart. Alternative to region",
      "$ref": "../definitions.json#/definitions/geohash"
    },
    "chartUrl": {
      "type": "string",
      "description": "A url to the chart file's storage location",
      "example": "file:///home/pi/freeboard/mapcache/NZ615"
    },
    "scale": {
      "type": "integer",
      "description": "The scale of the chart, the larger number from 1:200000"
    },
    "chartFormat": {
      "type": "string",
      "description": "The format of the chart",
      "enum": [
        "gif",
        "geotiff",
        "kap",
        "png",
        "jpg",
        "kml",
        "wkt",
        "topojson",
        "geojson",
        "gpx",
        "tms",
        "S-57",
        "S-63",
        "svg",
        "other"
      ]
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    }
  }
}
```

---

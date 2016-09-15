## /resources/charts/<RegExp>/geohash

A geohash (see http://geohash.org)

* Type: `string`
* Path: `/resources/charts/(^[A-Za-z0-9_-]{8,}$)/geohash`
* Node: `geohash`

### Example:
```
eg rbe:TasmanBay
```

### Source:
```
{
  "type": "string",
  "description": "A geohash (see http://geohash.org)",
  "pattern": "^[0-9A-Za-z:]{1,}$",
  "example": "eg rbe:TasmanBay"
}
```

---

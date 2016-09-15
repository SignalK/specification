## /resources/notes/<RegExp>/geohash

A geohash (see http://geohash.org)

* Type: `string`
* Path: `/resources/notes/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/geohash`
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

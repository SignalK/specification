# Versioning in Signal K specification

Our versioning is based on http://snowplowanalytics.com/blog/2014/05/13/introducing-schemaver-for-semantic-versioning-of-schemas/

Most of this document is reproduced from there.

When versioning a data schema, we are concerned with the backwards-compatibility between the new schema and existing data represented in earlier versions of the schema. This is the fundamental building block of SchemaVer, and explains the divergence from [Semantic Versioning](http://semver.org/).

Heres a simple formula for our SchemaVer:

Given a version number MODEL.REVISION.ADDITION-SUFFIX, increment the:

  * MODEL - when you make a breaking schema change which will prevent interaction with any historical data
  * REVISION - when you make a schema change which may prevent interaction with some historical data
  * ADDITION - when you make a schema change that is compatible with all historical data
  * SUFFIX - optional - denotes special versions or active development eg `alpha-1`, `SNAPSHOT`

  * The first released version of Signal K will be `1.0.0`.
  * The current development version will then move to be `1.0.1-SNAPSHOT`
  * The next release candidate might then be `1.0.1-alpha-1`
  * The current development version will then move to be `1.0.2-SNAPSHOT`

`SNAPSHOT` denotes a version under active change. If you depend on the `SNAPSHOT` version then every time you build your project it will have changed with what-ever was committed since last time you checked.

Let’s make SchemaVer more concrete with some examples using some (truncated and contrived) Signal K Schemas, in reverse order:

## Addition

We have an existing JSON Schema, let’s call this `1.0.0`:

```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.org/demospecification/1.0.0/schemas/groups/communication.json#",
  "description": "Schema describing the communication child-object of a Vessel.",
  "title": "communication",
  "properties": {
  	"dscAddress": {
      "type": "string",
      "description": "MMSI Callsign for VHF communication"
    }
  },
  "required": ["dscAddress"],
  "additionalProperties": false
}
```

Now we want to add an additional field to our schema:

```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.org/demospecification/1.0.1/schemas/groups/communication.json#",
  "description": "Schema describing the communication child-object of a Vessel.",
  "title": "communication",
  "properties": {
    "dscAddress": {
      "type": "string",
      "description": "MMSI Callsign for VHF communication"
    },
    "phoneNumber": {
      "type": "string",
      "description": "Phone number of skipper",
      "example": "+64xxxxxx"
    }
  },
  "required": ["dscAddress"],
  "additionalProperties": false
}
```

Because our new `phoneNumber` field is not a required field, and because version `1.0.0` had `additionalProperties` set to `false`, we know that all historical data will work with this new schema, ie. any json which validates against 1.0.0 will also be valid against 1.0.1.

Therefore we are looking at an `ADDITION`, and so we bump the schema version to `1.0.1`.

## Revision

Let’s now make our JSON Schema support additionalProperties - this constitutes another `ADDITION`, so we are now on `1.0.2`:

```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.org/demospecification/1.0.2/schemas/groups/communication.json#",
  "description": "Schema describing the communication child-object of a Vessel.",
  "title": "communication",
  "properties": {
    "dscAddress": {
      "type": "string",
      "description": "MMSI Callsign for VHF communication"
    },
    "phoneNumber": {
      "type": "string",
      "description": "Phone number of skipper",
      "example": "+64xxxxxx"
    }
  },
  "required": ["dscAddress"],
  "additionalProperties": true
}
```

After a while, we add a new field, `callsignHf`:

```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.org/demospecification/1.1.0/schemas/groups/communication.json#",
  "description": "Schema describing the communication child-object of a Vessel.",
  "title": "communication",
  "properties": {
    "dscAddress": {
      "type": "string",
      "description": "MMSI Callsign for VHF communication"
    },
    "phoneNumber": {
      "type": "string",
      "description": "Phone number of skipper",
      "example": "+64xxxxxx"
    },
    "callsignHf": {
      "type": "string",
      "description": "Callsign for HF communication",
      "example": "ZL3RTH"
    }
  },
  "required": ["dscAddress"],
  "additionalProperties": true
}
```

Will this new schema validate all historical data? Unfortunately we can’t be certain, because there could be historical JSONs where the analyst added their own `callsignHf` field which was not a string.

So we are effectively making a `REVISION` to the data schema - so we bump the version to `1.1.0` (resetting `ADDITION` to `0`).

## Model

Oh dear - we have just realized that not every-one has DSC! It should have been a VHF callsign. Here is our new JSON Schema:

```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.org/demospecification/2.0.0/schemas/groups/communication.json#",
  "description": "Schema describing the communication child-object of a Vessel.",
  "title": "communication",
  "properties": {
    "callsignVhf": {
      "type": "string",
      "description": "Callsign for VHF communication",
      "example": "ZL1234"
    },
	"phoneNumber": {
      "type": "string",
      "description": "Phone number of skipper",
      "example": "+64xxxxxx"
    },
    "callsignHf": {
      "type": "string",
      "description": "Callsign for HF communication",
      "example": "ZL3RTH"
    }
  },
  "required": ["callsignVhf"],
  "additionalProperties": false
}
```

We have changed our `MODEL` - because we can have no reasonable expectation that any of the historical data can interact with this schema. That means our new version is `2.0.0`

Note that we also decided to use this “reboot” of the `MODEL` to change `additionalProperties` back to `false`, because (as we have learnt) it will help us to avoid unnecessary REVISIONs in the future.

**Note:** https://signalk.org/demospecification/... is not real, it is just used here for illustration. The real schemas are located at: https://signalk.org/specification/...

## Supplementary rules

In Signal K we have a few variations from SchemaVer:

  *  We use dots (.) to separate the version parts, not hyphens (-s) as in SchemaVer
  *  We use a suffix to denote in-progress or special releases, as commonly seen in [Maven](http://books.sonatype.com/mvnref-book/reference/pom-relationships-sect-pom-syntax.html)

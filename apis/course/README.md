# Feature: Course API

## Description:

Define an API for Signal K client applications to be able to set a destination or navigate a route that provides the following methods:

- Set a position (lat, lon) as a destination
- Reference a waypoint from `/resources/waypoints` as a destination
- Activate a route by supplying a reference from `/resources/routes`
- Specify to follow route points in reverse order
- Select the point within the route to be the current destination
- Increment / decrement the point in the route to be the current destination.
- Clear / cancel the course
- Query the current course details.

The methods described above will set values in the relevant Signal K paths under both `navigation.courseGreatCircle` and `navigation.courseRhumbline` to enable a course computer to generate additional navigation information (XTE, DTG, etc) as well as facilitate display on a chart plotter.

---

### Why an API:
Currently Signal K makes available paths to store navigation data but it is largely left up to implementors of client applications to determine how they are used.

This is can cause interoperability issues and inconsistency in application (e.g. calculations in `signalk-derived-data` plugin will use a mixture of paths `navigation.courseGreatCircle` and `navigation.courseRhumbline`) so depending on an individual implementation results may vary.

Defining and implementing an API will provide reliability in how the values in these paths are populated ensuring confidence in the source data used in course calculations. 

---

### __1. Signal K Paths in Scope:__

_Note: All paths outlined below are relative to `/signalk/v1/api/vessels/self`._

The Signal K specification contains a `navigation.course` schema definition which is applied to both the `navigation/courseGreatCircle` and `navigation/courseRhumbline` paths.

The following properties under both these paths are in scope for management by this API:

```
activeRoute.href
activeRoute.startTime

nextPoint.value.href
nextPoint.value.type
nextPoint.position

previousPoint.value.href
previousPoint.value.type
previousPoint.position
```

This API will provide endpoints under the path `navigation/course` in order to set a course as well as query the current course information.

### 1.1 Enabling other navigation equipment (e.g. autopilot) operation.
---
By clearly defining and managing the use of specific `course` paths within the Signal K schema, this will ensure consistency in the values they contain and engender confidence in their use.

Maintianing quality data in these paths enables the reliable operation of other navigation equipment such as:
- Course computers
- Auto-pilots

by providing a trusted source of data for use in calculating navigation information for steering a course.

The paths within the Signal K schema pertaining to other navigation operations will be maintained by the relevant equipment or Signal K API.

---

### __2.API Operation:__

While the intended use of the `in scope` Signal K paths are defined in the specification, the actual use of these paths in practise determines the success of an implementation.

### 2.1 Use of `previousPoint`.
---
To facilitate course calculations such as XTE where the source position is required, the `previousPoint.position` attribute will be set as follows:
- __When a position (lat, lon) is supplied as a destination__: Set the value of `previousPoint.position` to the location of the vessel.
- __When a reference to a waypoint resource is supplied as a destination__: Set the value of `previousPoint.position` to the location of the vessel.
- __When a reference to a route resource is is supplied__: 

    1. If the supplied route `pointIndex` is `0` (point at start of the route) then set the value of `previousPoint.position` to the location of the vessel. 

    2. If the supplied route `pointIndex` is not `0` then set the value of`previousPoint.position` to that of the preceding point in the route.

- __When a "Course Restart" is requested__: Set the value of `previousPoint.position` to the location of the vessel.

- __When a destination or active route is "Cancelled"__: then set the value of`previousPoint.position` to `null`.

---

### __3.API Methods:__

The following endpoints under the path `navigation/course` make up the Course API.


### 3.1 Set a position (lat, lon) as a destination
---
__Use case:__ Provide _"navigate to here"_ operation.

__Action:__ `PUT`

__Path:__ `/navigation/course/destination`

__Request body:__
```JSON
{
    "value": {
        "position": {"latitude": -28.5,"longitude":138.5}, 
        "type": "Location",
        "arrivalCircle": 500
    },
    "source": Source making the change.
}
```
where:
- `position`:  The destination lat, lon (as per Signal K schema)
- `type` (optional): A string describing the destination (as per Signal K schema).
- `arrivalCircle`(optional): Radius of circle centered at destination indicating arrival.

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": null,
        "startTime": null
    },
    "nextPoint": {
        "href": null,
        "type": null if type not supplied,
        "position": {
            "latitude": supplied latitude,
            "longitude": supplied longitude
        },
        "arrivalCircle": unchanged if value not suplied
    },
    "previousPoint": {
        "href": null,
        "type": null,
        "position": {
            "latitude": latitude of vessel at time of destination being set,
            "longitude": longitude of vessel at time of destination being set
        }
    }
}
```

### 3.2 Set a Waypoint as a destination
---
__Use case:__ Provide _"navigate to selected waypoint resource"_ operation.

__Action:__ `PUT`

__Path:__ `/navigation/course/destination`

__Request body:__
```JSON
{
    "value": {
        "href": "/resources/waypoints/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "arrivalCircle": 500
    },
    "source": Source making the change.
}
```
where:
- `href`: The path to the target waypoint in `/resources/waypoints/`.
- `arrivalCircle` (optional): Radius of circle centered at destination indicating arrival.

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": null,
        "startTime": null
    },
    "nextPoint": {
        "href": supplied href,
        "type": null if type not supplied,
        "position": {
            "latitude": latitude of referenced waypoint,
            "longitude": longitude of referenced waypoint
        },
        "arrivalCircle": unchanged if value not supplied
    },
    "previousPoint": {
        "href": null,
        "type": null,
        "position": {
            "latitude": latitude of vessel at time of destination being set,
            "longitude": longitude of vessel at time of destination being set
        }
    }
}
```

### 3.3 Clear / Cancel a destination or Activated Route.
---
__Use case:__ Provide _"stop navigating to destination"_ or _"deactivate as route"_ operation.

__Action:__ `DELETE`

__Path:__ `/navigation/course/destination` or `/navigation/course/activeRoute`

__Request body:__

```JSON
{
    "value": null,
    "source": Source making the change.
}
```

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": null,
        "startTime": null
    },
    "nextPoint": {
        "href": null,
        "type": null,
        "position": null,
        "arrivalCircle": unchanged
    },
    "previousPoint": {
        "href": null,
        "type": null,
        "position": null
    }
}
```

### 3.4 Activate a Route to follow.
---

__Use case:__ Provide _"activate / follow a route"_ operation.

__Action:__ `PUT`

__Path:__ `/navigation/course/activeRoute`

__Request body:__
```JSON
{
    "value": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "pointIndex": 0,
        "reverse": false,
        "arrivalCircle": 500
    },
    "source": Source making the change.
}
```
where:
- `href`: The path to the target route in `/resources/routes/`.
- `pointIndex` (optional): Zero based index of the point within the route to use as the initial destination (defaults to 0 if not supplied or if value is larger than index of last point in the route).
- `reverse` (optional): If `true` performs operations on route points in reverse order (defaults to false).
- `arrivalCircle` (optional): Radius of circle centered at destination indicating arrival.

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": supplied href,
        "startTime": Time at which route was activated (as per Signal K schema)
    },
    "nextPoint": {
        "href": null,
        "type": null if value not supplied,
        "position": {
            "latitude": latitude of route point at supplied index,
            "longitude": longitude of route point at supplied index
        },
        "arrivalCircle": unchanged if value not supplied
    },
    "previousPoint": {
        "href": null,
        "type": null,
        "position": {
            "latitude": latitude of: vessel if supplied pointIndex=0 or point at poiintIndex-1,
            "longitude": longitude of: vessel if supplied pointIndex=0 or point at poiintIndex-1
        }
    }
}
```

### 3.5 Select point in the active Route as destination.
---
__Use case:__ Provide _"go to point in route"_ operation.

__Action:__ `PUT`

__Path:__ `/navigation/course/activeRoute/setPoint`

__Request body:__
```JSON
{
    "value": {
        "pointIndex": 3
    },
    "source": Source making the change.
}
```
where:
- `pointIndex`: Zero based index of the point within the route to use as the initial destination (if value is larger than index of last point in the route then destination is not changed).

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": unchanged,
        "startTime": unchanged
    },
    "nextPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": latitude of route point at supplied index,
            "longitude": longitude of route point at supplied index
        },
        "arrivalCircle": unchanged
    },
    "previousPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": latitude of: vessel if pointIndex=0 or route point at poiintIndex-1,
            "longitude": longitude of: vessel if pointIndex=0 or route point at poiintIndex-1
        }
    }
}
```

### 3.6 Increment / decrement point in the active Route as destination.
---
__Use case:__ Provide _"previous / next point"_ operation.

__Action:__ `PUT`

__Path:__ `/navigation/course/activeRoute/nextPoint`

__Request body:__
```JSON
{
    "value": {
        "increment": -1
    },
    "source": Source making the change.
}
```
where:
- `increment`: Is either `1` (next point) or `-1` (previous point).

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": unchanged,
        "startTime": unchanged
    },
    "nextPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": latitude of previous (if -1 supplied) or next (if 1 supplied) route point,
            "longitude": longitude of previous (if -1 supplied) or next (if 1 supplied) route point
        },
        "arrivalCircle": unchanged
    },
    "previousPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": latitude of: vessel (if pointIndex=0) or point at poiintIndex-1,
            "longitude": longitude of: vessel (if pointIndex=0) or point at poiintIndex-1
        }
    }
}
```

### 3.7 Restart course calculations.
---
__Use case:__ Provide _"restart XTE"_ operation.

__Action:__ `PUT`

__Path:__ `/navigation/course/activeRoute/restart`

__Request body:__
```JSON
{
    "value": null,
    "source": Source making the change.
}
```
This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": unchanged,
        "startTime": unchanged
    },
    "nextPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": unchanged,
            "longitude": unchanged
        },
        "arrivalCircle": unchanged 
    },
    "previousPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": latitude of vessel,
            "longitude": longitude of vessel
        }
    }
}
```

### 3.8 Set arrival circle.
---
__Use case:__ Provide ability to set the radius of a circle centered at destination indicating arrival.

__Action:__ `PUT`

__Path:__ `/navigation/course/arrivalCircle`

__Request body:__
```JSON
{
    "value": {
        "radius": 500
    },
    "source": Source making the change.
}
```
where:
- `radius`: Is the radius of the circle in meters.

This will result in the following Signal K path values being set:
```JSON
{
    "activeRoute": {
        "href": unchanged,
        "startTime": unchanged
    },
    "nextPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": unchanged,
            "longitude": unchanged
        },
        "arrivalCircle": supplied value
    },
    "previousPoint": {
        "href": unchanged,
        "type": unchanged,
        "position": {
            "latitude": unchanged,
            "longitude": unchanged
        }
    }
}
```

### 3.9 Query current course details.
---
__Use case:__ Provide "get current course", "get course details" operation.

__Action:__ `GET`

__Path:__ `/navigation/course`

__Response:__ JSON formatted object containing the current course details as per the following example:
```JSON
{
    "activeRoute": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "startTime": "2021-10-23T05:17:20.065Z",
        "pointIndex": 2,
        "reverse": false,
        "pointIndex": 2
    },
    "nextPoint": {
        "href": null,
        "type": "RoutePoint",
        "position": {
            "latitude":-29.5,
            "longitude":137.5
        }
    },
    "previousPoint": {
        "href": null,
        "type": null,
        "position": {
            "latitude":-29.05,
            "longitude":137.75
        }
    }
}
```

---

### __4. Signal K Stream Deltas__

The implementation of the Course API requires that the relevant delta messages are sent for the in-scope Signal K paths when:
- Values have changed
- Periodically e.g. every 30 seconds).

The absence of a delta for a specific Signal K path indicates that the path has never had a value assigned to it. 

Where a delta value is `null`, this indicates that a previous value is no longer valid (i.e. there is a provider for this path but there is no current value available).

Delta messages for in-scope paths are as follows:
```JSON
[
    {
        "path": "navigation.courseGreatCircle.activeRoute.href",
        "value": reference to route resource,
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.activeRoute.startTime",
        "value": Time at which route was activated (as per Signal K schema),
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.nextPoint.position",
        "value": {
            "latitude": number,
            "longitude": number
        },
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.nextPoint.value.href",
        "value": reference to waypoint resource,
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.nextPoint.value.type",
        "value": string,
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.previousPoint.position",
        "value": {
            "latitude": number,
            "longitude": number
        },
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.previousPoint.value.href",
        "value": reference to waypoint resource,
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.previousPoint.value.type",
        "value": string,
        "context": "vessels.self",
        "source": source of value
    }
]
```



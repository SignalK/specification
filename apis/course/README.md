# Feature: Course API

## Description:

Define an API for Signal K client applications to be able to set a destination or navigate a route that provides the following methods:

- Set a position (lat, lon) as a destination
- Select a waypoint (from `/resources/waypoints`) as a destination
- Activate a route (from `/resources/routes`)
- Select the point within the route to be the current destination
- Clear / cancel the course
- Query the current course details.

The methods described above will set values in the relevant Signal K paths under both `navigation.courseGreatCircle` and `navigation.courseRhumbline` to enable a course computer to generate additional navigation information (XTE, DTG, etc) as well as facilitate display on a chart plotter.

---

### Why an API:
Currently Signal K makes available paths to store navigation data but it is largely left up to implementors of client applications to determine how they are used.

This is can cause interoperability issues and inconsistency in application (e.g. calculations in `signalk-derived-data` plugin will use a mixture of paths `navigation.courseGreatCircle` and `navigation.courseRhumbline`) so depending on an individual implementation results may vary.

---

### 1. Signal K Paths in Scope:

The following paths are relative to `/signalk/v1/api/vessels/self`.

The Signal K specification contains a `navigation.course` schema definition which is applied to both the `navigation/courseGreatCircle` and `navigation/courseRhumbline` paths.

The following attributes in both these paths are in scope for management by this API.

```
activeRoute/href
activeRoute/startTime
```

```
nextPoint/value/href
nextPoint/value/type
nextPoint/position
```

```
previousPoint/value/href
previousPoint/value/type
previousPoint/position
```

Additionally it will provide a path to query the current course information.

```
navigation/course
```

---

### 2. How In Scope paths are used:

While the intended use of the `in scope` Signal K paths are defined in the specification, the use of these paths in practise determines the success of an implementation.

_Following is the proposed operation of the course API for each of the proposed methods:_

__a. Set a position (lat, lon) as a destination.__

---
To facilitate a "navigate to here" operation:
- The client will `PUT` or `POST` the following to the `/navigation/course/destination` path:
```JSON
{
    "value": {
        "position": {"latitude": -28.5,"longitude":138.5}, 
        "type": "Location"
    }
}
```
where:
- `position`:  The destination lat, lon (as per Signal K schema)
- `type` (optional): A string describing the destination (as per Signal K schema).

This will result in the following path values:
```JSON
{
    "activeRoute": {
        "href": null,
        "startTime": null
    },
    "nextPoint": {
        "href": null,
        "type": "Location",
        "position": {
            "latitude": -28.5,
            "longitude":138.5
        }
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

__b. Set a Waypoint as a destination.__

---
To facilitate a "navigate to selected waypoint" operation:
- The client will `PUT` or `POST` the following to the `/navigation/course/destination` path:
```JSON
{
    "value": {
        "href": "/resources/waypoints/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab" 
    }
}
```
where:
- `href`: The path to the target waypoint in `/resources/waypoints/`.

This will result in the following path values:
```JSON
{
    "activeRoute": {
        "href": null,
        "startTime": null
    },
    "nextPoint": {
        "href": "/resources/waypoints/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "type": "Waypoint",
        "position": {
            "latitude": latitude of waypoint,
            "longitude": longitude of waypoint
        }
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

__c. Clear / Cancel a destination or Activated Route.__

---
To facilitate a "navigate to selected waypoint" operation the client will send a `DELETE` request to either of the the following paths:
-  `/navigation/course/destination`
-  `/navigation/course/activeRoute`

This will result in the following path values:
```JSON
{
    "activeRoute": {
        "href": null,
        "startTime": null
    },
    "nextPoint": {
        "href": null,
        "type": null,
        "position": null
    },
    "previousPoint": {
        "href": null,
        "type": null,
        "position": null
    }
}
```

__d. Activate a Route to follow.__

---
To facilitate a "Activate Route" operation:
- The client will `PUT` or `POST` the following to the `/navigation/course/activeRoute` path:
```JSON
{
    "value": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "pointIndex": 1,
        "reverse": false
    }
}
```
where:
- `href`: The path to the target route in `/resources/routes/`.
- `pointIndex` (optional): Zero based index of the point within the route to use as the initial destination (defaults to 0 if not supplied or if value is larger than index of last point in the route).
- `reverse` (optional): If `true` performs operations on route points in reverse order (defaults to false).

This will result in the following path values:
```JSON
{
    "activeRoute": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "startTime": Time at which route was activated (as per Signal K schema)
    },
    "nextPoint": {
        "href": null,
        "type": "RoutePoint",
        "position": {
            "latitude": latitude of second point in route,
            "longitude": longitude of second point in route
        }
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

__d. Select point in the active Route as destination.__

---
To facilitate a "Previous / Next point" operation:
- The client will `PUT` or `POST` the following to the `/navigation/course/activeRoute/nextPoint` path:

Option 1:
```JSON
{
    "value": {
        "pointIndex": 3
    }
}
```
where:
- `pointIndex`: Zero based index of the point within the route to use as the initial destination (if value is larger than index of last point in the route then destination is not changed).

Option 2:
```JSON
{
    "value": {
        "increment": -1
    }
}
```
where:
- `increment`: Is either `1` (next point) or `-1` (previous point).

This will result in the following path values:
```JSON
{
    "activeRoute": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "startTime": Time at which route was activated (as per Signal K schema)
    },
    "nextPoint": {
        "href": null,
        "type": "RoutePoint",
        "position": {
            "latitude": latitude of previous point in route,
            "longitude": longitude of previous point in route
        }
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

__e. Query current course details.__

---
To facilitate a "get current course" operation:
- The client will make a `GET` request to the `/navigation/course` path and a response of the following format, detailing the course values, will be returned.

Example:
```JSON
{
    "activeRoute": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "startTime": "2021-10-23T05:17:20.065Z",
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

### Use of `previousPoint`.
---
To facilitate course calculations such as XTE where the source position is required, the `previousPoint.position` attribute is __always__ set to the location of the vessel each time the destination position is set / changed.

It is set to `null` when the destination has been cleared.

---

## Enabling other navigation equipment (e.g. autopilot) operation.

This API seeks to define and manage the use of specific `course` paths within the Signal K schema to provide consistency and confidence in the values they contain.

Maintianing quality data in these paths enables operation of other navigation equipment such as:
- Course computers
- Auto-pilots
by providing a source of data that can be trusted for use in calculating navigation information for steering a course.

The paths within the Signal K schema pertaining to other navigation operations will be maintained by the relevant equipment or Signal K API .

---

## Signal K stream Deltas.

The use of the API endpoints outlined above will trigger delta messages to be sent for related Signal K paths (in-scope paths) where:
- Values have changed
- Periodically for all paths that have a current value.

The absence of a delta for a specific Signal K path indicates that the path has never had a value assigned to it. 

Where a delta value is `null`, this indicates that a previous value is no longer valid (i.e. there is a provider for this path but there is no current value).

_Delta messages for in-scope paths:_
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



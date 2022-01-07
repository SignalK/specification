# Course API

The Course API provides methods to facilitate setting a destination and navigating a route for use by Signal K client applications.

These methods manage the setting of values in the relevant Signal K paths under both `navigation.courseGreatCircle` and `navigation.courseRhumbline` to enable the generation of additional navigation information (XTE, DTG, etc) by a course computer as well as facilitate display on a chart plotter.

The API will facilitate operations such as: setting a position (lat, lon) as a destination, referencing a waypoint from `/resources/waypoints` as a destination, activating a route by supplying a reference to an entry under `/resources/routes`, etc.

In this way a known, consistant method is used to maintain quality data in these paths enabling the reliable operation of other navigation equipment such as `course computers` and `auto-pilots`.


## Expected implementation behaviour

The server will provide API endpoints under the path `navigation/course` to facilitate setting a course as well as querying the current course information.

The API methods will maintain the following paths under`/signalk/v1/api/vessels/self/navigation`:

```
courseGreatCircle.activeRoute.href
courseGreatCircle.activeRoute.startTime
courseGreatCircle.nextPoint.value.href
courseGreatCircle.nextPoint.value.type
courseGreatCircle.nextPoint.position
courseGreatCircle.nextPoint.arrivalCircle
courseGreatCircle.previousPoint.value.href
courseGreatCircle.previousPoint.value.type
courseGreatCircle.previousPoint.position

courseRhumbline.activeRoute.href
courseRhumbline.activeRoute.startTime
courseRhumbline.nextPoint.value.href
courseRhumbline.nextPoint.value.type
courseRhumbline.nextPoint.position
courseRhumbline.nextPoint.arrivalCircle
courseRhumbline.previousPoint.value.href
courseRhumbline.previousPoint.value.type
courseRhumbline.previousPoint.position
```

### Use of `previousPoint.position`:
To facilitate course calculations the `previousPoint.position` attribute will be set as follows at the time the destination is set / changed:

- __When a position (lat, lon) or reference to a waypoint resource is supplied as a destination__: The value of `previousPoint.position` will be set to the current location of the vessel.

- __When a route is activated by supplying a reference to a route resource__: 

    1. If the point at start of the route is the current destination then the value of `previousPoint.position` will be set to the current location of the vessel. 

    2. If any other point in the route is the current destination then the value of `previousPoint.position` will be set to the position of of the preceding point in the route.

- __When a "Course Restart" is requested__: The value of `previousPoint.position` will be set to the current location of the vessel.

- __When a destination or active route is "Cancelled"__: The value of`previousPoint.position` will be set to `null`.


### Use of `pointIndex`:

The API uses the parameter `pointIndex` to specify a point within a route.

`pointIndex` is a zero-based index which represents the position of a point, within an array of route points, relative to the start of the journey.

So setting `pointIndex`= 0 references the first point in the journey relative to the direction the route is being navigated. (i.e. forward or reverse). 

Calling `nextPoint` API method with an increment value of 1 increments the value of `pointIndex` i.e. 0->1, 1->2, etc.

Calling `nextPoint` API method with an increment value of -1 increments the value of `pointIndex` i.e. 4->3, 3->2, etc.

So for example consider a route with 4 points:
```
{latitude: 65.4, longitude: 7.8}
{latitude: 65.4, longitude: 7.8}
{latitude: 65.4, longitude: 7.8}
{latitude: 65.4, longitude: 7.8}
```
_Following a route in `forward mode`:_

```
{latitude: 65.4, longitude: 7.8} <= pointIndex=0
{latitude: 65.4, longitude: 7.8} <= pointIndex=1
{latitude: 65.4, longitude: 7.8} <= pointIndex=2
{latitude: 65.4, longitude: 7.8} <= pointIndex=3
```

_Following a route in `reverse mode`:_

```
{latitude: 65.4, longitude: 7.8} <= pointIndex=3
{latitude: 65.4, longitude: 7.8} <= pointIndex=2
{latitude: 65.4, longitude: 7.8} <= pointIndex=1
{latitude: 65.4, longitude: 7.8} <= pointIndex=0
```

This method of implementation means the client application does not have to manage route point sequencing and that a `pointIndex` of:
- __0__: Always references the point at the start of a journey
- __number of route points -1__: Always references the point at the end of a journey.

---

## API Operations:

The Course API will enable the following operations by providing endpoints under the path `..../navigation/course`:

_Note: API details can be found in the OpenApi document_

_In the following examples the value `<self>` has been substituted for the full Signal K API path `http://hostname:port/signalk/v1/api/vessels/self` for conciseness._

---
### 1. Set destination by providing a position (lat, lon) or reference to a waypoint resource


_Example: Set destination position_
```JSON
HTTP PUT '<self>/navigation/course/destination' {
    "position": {"latitude": -28.5,"longitude":138.5} 
}
```
Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position": {
        "latitude": -28.5,
        "longitude": 138.5
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of vessel at time of destination being set,
        "longitude": longitude of vessel at time of destination being set
    }
}
```

_Example: Set referenced waypoint position as destination_
```JSON
HTTP PUT '<self>/navigation/course/destination' {
    "href": "/resources/waypoints/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab"
}
```

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position": {
        "latitude": referenced waypoint latitude,
        "longitude": referenced waypoint longitude
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of vessel at time of destination being set,
        "longitude": longitude of vessel at time of destination being set
    }
}
```

---
### 2. Clear current destination / active route

_Example: Clear destination_
```JSON
HTTP DELETE '<self>/navigation/course/destination'
```

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position":null
},
"previousPoint": {
    "position": null
}
```


_Example: Clear active route_
```JSON
HTTP DELETE '<self>/navigation/course/activeRoute'
```

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position":null
},
"previousPoint": {
    "position": null
},
"activeRoute": {
    "href": null,
    "startTime": null
}
```

---
### 3. Activate a Route to follow

_Example: Activate a route_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute' {
    "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab"
}
```
Resulting Signal K paths would be:
```JSON
"activeRoute": {
    "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
    "startTime": 2021-11-08T01:39:55.296Z
},
"nextPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex 0 (route point #1),
        "longitude": longitude of route point at pointIndex 0 (route point #1)
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of vessel at time of destination being set,
        "longitude": longitude of vessel at time of destination being set
    }
}
```

_Example: Activate a route (consisting of 8 points) in reverse mode_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute' {
    "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
    "reverse": true
}
```

Resulting Signal K paths would be:
```JSON
"activeRoute": {
    "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
    "startTime": 2021-11-08T01:39:55.296Z
},
"nextPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex 0 (route point #8),
        "longitude": longitude of route point at pointIndex 0 (route point #8)
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of vessel at time of destination being set,
        "longitude": longitude of vessel at time of destination being set
    }
}
```

_Example: Activate a route and set destination to third point in route_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute' {
    "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
    "pointIndex": 2
}
```
Resulting Signal K paths would be:
```JSON
"activeRoute": {
    "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
    "startTime": 2021-11-08T01:39:55.296Z
},
"nextPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex 2 (route point #3),
        "longitude": longitude of route point at pointIndex 2 (route point #3)
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex 1 (route point #2),
        "longitude": longitude of route point at pointIndex 1 (route point #2)
    }
}
```
---
### 4. Select the point within the route to use destination.

_Example: Set the 4th point in the journey as destination_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute/pointIndex' {
    "value": 3
}
```
where `value` is the zero-based index of the point within the journey to use as the initial destination (see `Use of pointIndex` above).

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex 3,
        "longitude": longitude of route point at pointIndex 3
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex 2,
        "longitude": longitude of route point at pointIndex 2
    }
}
```

---
### 5. Set previous / next point.

_Example: Set the next point in the route as destination_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute/nextPoint' {
    "value": 1
}
```

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex +1,
        "longitude": longitude of route point at pointIndex +1
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex,
        "longitude": longitude of route point at pointIndex
    }
}
```

_Example: Set the previous point in the route as destination_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute/nextPoint' {
    "value": -1
}
```

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex -1,
        "longitude": longitude of route point at pointIndex -1
    }
},
"previousPoint": {
    "position": {
        "latitude": latitude of route point at pointIndex -2 or vessel location if new pointIndex=0,
        "longitude": longitude of route point at pointIndex -2 or vessel location if new pointIndex=0
    }
}
```

---
### 6. Restart course calculations.

_Example:_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute/restart'
```
Resulting Signal K paths would be:
```JSON
"previousPoint": {
    "position": {
        "latitude": latitude of vessel at time of destination being set,
        "longitude": longitude of vessel at time of destination being set
    }
}
```

---
### 7. Refresh data after route points have been modified.

If the active route has been edited to add, remove or move points then calling this method will ensure that `pointIndex` and `pointTotal` are updated to reflect the position of the current destination within the route and the new number of points in the route.

_Example:_
```JSON
HTTP PUT '<self>/navigation/course/activeRoute/refresh'
```


---
### 8. Set arrival circle.

_Example: Set arrival circle to 500m_
```JSON
HTTP PUT '<self>/navigation/course/arrivalCircle' {
    "value": 500
}
```

Resulting Signal K paths would be:
```JSON
"nextPoint": {
    "arrivaleCircle": 500
}
```

---
### 9. Query current course details.

```JSON
HTTP GET '<self>/navigation/course'
```

_Example Response:_
```JSON
{
    "activeRoute": {
        "href": "/resources/routes/urn:mrn:signalk:uuid:0d95e282-3e1f-4521-8c30-8288addbdbab",
        "startTime": "2021-10-23T05:17:20.065Z",
        "pointIndex": 2,
        "reverse": false
    },
    "nextPoint": {
        "href": null,
        "type": "RoutePoint",
        "position": {
            "latitude":-29.5,
            "longitude":137.5
        },
        "arrivalCircle": 500
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

## Signal K Stream Deltas

The implementation of the Course API requires that the relevant delta messages are sent for the affected Signal K paths when:
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
        "path": "navigation.courseGreatCircle.nextPoint.arrivalCircle",
        "value": string,
        "context": "vessels.self",
        "source": source of value
    },
    {
        "path": "navigation.courseGreatCircle.previousPoint.value.href",
        "value": number,
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



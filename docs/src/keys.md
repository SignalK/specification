# Signal K Data Model Reference

This document is meant as the human-oriented reference to accompany the actual JSON Schema specification and is produced from the schema files.
Any changes to the reference material below should be made to the original schema files.


## design.airHeight
Total height of the vessel

**Units:**m


## design.airHeight.meta.properties
**Units:**[object Object]


## design.beam
Beam length

**Units:**m


## design.beam.meta.properties
**Units:**[object Object]


## design.displacement
The displacement of the vessel

**Units:**kg


## design.displacement.meta.properties
**Units:**[object Object]


## design.draft.canoe
The draft of the vessel without protrusions such as keel, centerboard, rudder

**Units:**m


## design.draft.maximum
The maximum draft of the vessel

**Units:**m


## design.draft.minimum
The minimum draft of the vessel

**Units:**m


## design.keel.angle
A number indicating at which angle the keel currently is (in case of a canting keel), negative to port.

**Units:**rad


## design.keel.angle.meta.properties
**Units:**[object Object]


## design.keel.lift
In the case of a lifting keel, centreboard or daggerboard, the part of the keel which is extended. 0 is 'all the way up' and 1 is 'all the way down'. 0.8 would be 80% down.

**Units:**ratio

### Example:
```
0.8
```

## design.keel.lift.meta.properties
**Units:**[object Object]


## design.keel.type
The type of keel.

###Enum values:
* long
* fin
* flare
* bulb
* wing
* centerboard
* kanting
* lifting
* daggerboard


## design.length.hull
Length of hull

**Units:**m


## design.length.overall
Length overall

**Units:**m


## design.length.waterline
Length at waterline

**Units:**m


## electrical.ac.*.meta.dateInstalled.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## electrical.ac.*.phase.*.apparentPower
Apparent power.

**Units:**W


## electrical.ac.*.phase.*.current
RMS current

**Units:**A


## electrical.ac.*.phase.*.frequency
AC frequency.

**Units:**Hz


## electrical.ac.*.phase.*.lineLineVoltage
RMS voltage measured between phases

**Units:**V


## electrical.ac.*.phase.*.lineNeutralVoltage
RMS voltage measured between phase and neutral.

**Units:**V


## electrical.ac.*.phase.*.powerFactorLagging
Lead/lag status.

###Enum values:
* leading
* lagging
* error
* not available


## electrical.ac.*.phase.*.reactivePower
Reactive power

**Units:**W


## electrical.ac.*.phase.*.realPower
Real power.

**Units:**W


## electrical.batteries.*.capacity.actual
The measured capacity of battery. This may change over time and will likely deviate from the nominal capacity.

**Units:**J


## electrical.batteries.*.capacity.dischargeLimit
Minimum capacity to be left in the battery while discharging

**Units:**J


## electrical.batteries.*.capacity.dischargeSinceFull
Cumulative discharge since battery was last full

**Units:**C


## electrical.batteries.*.capacity.nominal
The capacity of battery as specified by the manufacturer

**Units:**J


## electrical.batteries.*.capacity.remaining
Capacity remaining in battery

**Units:**J


## electrical.batteries.*.capacity.stateOfCharge
State of charge, 1 = 100%

**Units:**ratio


## electrical.batteries.*.capacity.stateOfHealth
State of Health, 1 = 100%

**Units:**ratio


## electrical.batteries.*.capacity.timeRemaining
Time to discharge to discharge limit at current rate

**Units:**s


## electrical.batteries.*.current
**Units:**A


## electrical.batteries.*.current.meta.faultLower
Lower fault limit of battery current - BMS may disconnect battery

**Units:**A


## electrical.batteries.*.current.meta.faultUpper
Upper fault limit of battery current - BMS may disconnect battery

**Units:**A


## electrical.batteries.*.current.meta.warnLower
Lower operational current limit

**Units:**A


## electrical.batteries.*.current.meta.warnUpper
Upper operational current limit

**Units:**A


## electrical.batteries.*.lifetimeDischarge
Cumulative charge discharged from battery over operational lifetime of battery

**Units:**C


## electrical.batteries.*.lifetimeRecharge
Cumulative charge recharged into battery over operational lifetime of battery

**Units:**C


## electrical.batteries.*.meta.dateInstalled.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## electrical.batteries.*.temperature.faultLower
Lower fault limit of temperature - device may disable

**Units:**K


## electrical.batteries.*.temperature.faultUpper
Upper fault limit of temperature - device may disable

**Units:**K


## electrical.batteries.*.temperature.limitDischargeLower
Operational minimum temperature limit for battery discharge, in degrees Celsius

**Units:**K


## electrical.batteries.*.temperature.limitDischargeUpper
Operational maximum temperature limit for battery discharge, in degrees Celsius

**Units:**K


## electrical.batteries.*.temperature.limitRechargeLower
Operational minimum temperature limit for battery recharging, in degrees Celsius

**Units:**K


## electrical.batteries.*.temperature.limitRechargeUpper
Operational maximum temperature limit for battery recharging, in degrees Celsius

**Units:**K


## electrical.batteries.*.temperature.warnLower
Lower operational temperature limit

**Units:**K


## electrical.batteries.*.temperature.warnUpper
Upper operational temperature limit

**Units:**K


## electrical.batteries.*.voltage
**Units:**V


## electrical.batteries.*.voltage.meta.faultLower
Lower fault limit of battery voltage - BMS may disconnect battery

**Units:**V


## electrical.batteries.*.voltage.meta.faultUpper
Upper fault limit of battery voltage - BMS may disconnect battery

**Units:**V


## electrical.batteries.*.voltage.meta.nominal
Designed 'voltage' of battery (12v, 24v, 32v, 36v, 42v, 48v, 144v, etc.)

**Units:**V


## electrical.batteries.*.voltage.meta.warnLower
Lower operational voltage limit

**Units:**V


## electrical.batteries.*.voltage.meta.warnUpper
Upper operational voltage limit

**Units:**V


## electrical.batteries.*.voltage.ripple
Ripple voltage

**Units:**V


## electrical.chargers.*.current
**Units:**A


## electrical.chargers.*.current.meta.faultLower
Lower fault limit of battery current - BMS may disconnect battery

**Units:**A


## electrical.chargers.*.current.meta.faultUpper
Upper fault limit of battery current - BMS may disconnect battery

**Units:**A


## electrical.chargers.*.current.meta.warnLower
Lower operational current limit

**Units:**A


## electrical.chargers.*.current.meta.warnUpper
Upper operational current limit

**Units:**A


## electrical.chargers.*.meta.chargerMode
###Enum values:
* standalone
* master
* slave
* standby


## electrical.chargers.*.meta.chargingAlgorithm
###Enum values:
* trickle
* two stage
* three stage
* constant current
* constant voltage
* custom profile


## electrical.chargers.*.meta.dateInstalled.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## electrical.chargers.*.mode
###Enum values:
* charging bulk
* charging acceptance
* charging overcharge
* charging float
* charging equalize
* unknown
* other


## electrical.chargers.*.temperature.faultLower
Lower fault limit of temperature - device may disable

**Units:**K


## electrical.chargers.*.temperature.faultUpper
Upper fault limit of temperature - device may disable

**Units:**K


## electrical.chargers.*.temperature.warnLower
Lower operational temperature limit

**Units:**K


## electrical.chargers.*.temperature.warnUpper
Upper operational temperature limit

**Units:**K


## electrical.chargers.*.voltage
**Units:**V


## electrical.chargers.*.voltage.meta.faultLower
Lower fault limit of battery voltage - BMS may disconnect battery

**Units:**V


## electrical.chargers.*.voltage.meta.faultUpper
Upper fault limit of battery voltage - BMS may disconnect battery

**Units:**V


## electrical.chargers.*.voltage.meta.nominal
Designed 'voltage' of battery (12v, 24v, 32v, 36v, 42v, 48v, 144v, etc.)

**Units:**V


## electrical.chargers.*.voltage.meta.warnLower
Lower operational voltage limit

**Units:**V


## electrical.chargers.*.voltage.meta.warnUpper
Upper operational voltage limit

**Units:**V


## electrical.chargers.*.voltage.ripple
Ripple voltage

**Units:**V


## electrical.inverters.*.ac.apparentPower
Apparent power.

**Units:**W


## electrical.inverters.*.ac.current
RMS current

**Units:**A


## electrical.inverters.*.ac.frequency
AC frequency.

**Units:**Hz


## electrical.inverters.*.ac.lineLineVoltage
RMS voltage measured between phases

**Units:**V


## electrical.inverters.*.ac.lineNeutralVoltage
RMS voltage measured between phase and neutral.

**Units:**V


## electrical.inverters.*.ac.powerFactorLagging
Lead/lag status.

###Enum values:
* leading
* lagging
* error
* not available


## electrical.inverters.*.ac.reactivePower
Reactive power

**Units:**W


## electrical.inverters.*.ac.realPower
Real power.

**Units:**W


## electrical.inverters.*.dc.current
**Units:**A


## electrical.inverters.*.dc.current.meta.faultLower
Lower fault limit of battery current - BMS may disconnect battery

**Units:**A


## electrical.inverters.*.dc.current.meta.faultUpper
Upper fault limit of battery current - BMS may disconnect battery

**Units:**A


## electrical.inverters.*.dc.current.meta.warnLower
Lower operational current limit

**Units:**A


## electrical.inverters.*.dc.current.meta.warnUpper
Upper operational current limit

**Units:**A


## electrical.inverters.*.dc.temperature.faultLower
Lower fault limit of temperature - device may disable

**Units:**K


## electrical.inverters.*.dc.temperature.faultUpper
Upper fault limit of temperature - device may disable

**Units:**K


## electrical.inverters.*.dc.temperature.warnLower
Lower operational temperature limit

**Units:**K


## electrical.inverters.*.dc.temperature.warnUpper
Upper operational temperature limit

**Units:**K


## electrical.inverters.*.dc.voltage
**Units:**V


## electrical.inverters.*.dc.voltage.meta.faultLower
Lower fault limit of battery voltage - BMS may disconnect battery

**Units:**V


## electrical.inverters.*.dc.voltage.meta.faultUpper
Upper fault limit of battery voltage - BMS may disconnect battery

**Units:**V


## electrical.inverters.*.dc.voltage.meta.nominal
Designed 'voltage' of battery (12v, 24v, 32v, 36v, 42v, 48v, 144v, etc.)

**Units:**V


## electrical.inverters.*.dc.voltage.meta.warnLower
Lower operational voltage limit

**Units:**V


## electrical.inverters.*.dc.voltage.meta.warnUpper
Upper operational voltage limit

**Units:**V


## electrical.inverters.*.dc.voltage.ripple
Ripple voltage

**Units:**V


## electrical.inverters.*.meta.dateInstalled.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## electrical.inverters.*.mode
Mode of inverter

###Enum values:
* idle
* inverting
* disabled
* standby
* faulted
* unknown
* other


## environment.current.drift
The speed component of the water current vector

**Units:**m/s

### Example:
```
3.12
```

## environment.current.setMagnetic
The direction component of the water current vector referenced to magnetic north

**Units:**rad

### Example:
```
131.22
```

## environment.current.setTrue
The direction component of the water current vector referenced to true (geographic) north

**Units:**rad

### Example:
```
123.45
```

## environment.depth.belowKeel
Depth below keel

**Units:**m


## environment.depth.belowSurface
Depth from surface

**Units:**m


## environment.depth.belowTransducer
Depth below Transducer

**Units:**m


## environment.depth.surfaceToTransducer
Depth transducer is below the water surface

**Units:**m


## environment.depth.transducerToKeel
Depth from the transducer to the bottom of the keel

**Units:**m


## environment.heave
Vertical movement of the vessel due to waves

**Units:**m


## environment.inside.engineRoom.temperature
Temperature

**Units:**K


## environment.inside.freezer.temperature
Temperature

**Units:**K


## environment.inside.heating.temperature
Temperature

**Units:**K


## environment.inside.humidity
Current inside air relative humidity

**Units:**ratio


## environment.inside.mainCabin.temperature
Temperature

**Units:**K


## environment.inside.refrigerator.temperature
Temperature

**Units:**K


## environment.inside.temperature
Current inside air temperature

**Units:**K


## environment.mode
Mode of the vessel based on the current conditions. Can be combined with navigation.state to control vessel signals eg switch to night mode for instrumentation and lights, or make sound signals for fog.

###Enum values:
* day
* night
* restricted visibility


## environment.outside.apparentWindChillTemperature
Current outside apparent wind chill temperature

**Units:**K


## environment.outside.dewPointTemperature
Current outside dew point temperature

**Units:**K


## environment.outside.heatIndexTemperature
Current outside heat index temperature

**Units:**K


## environment.outside.humidity
Current outside air relative humidity

**Units:**ratio


## environment.outside.pressure
Current outside air ambient pressure

**Units:**Pa


## environment.outside.temperature
Current outside air temperature

**Units:**K


## environment.outside.theoreticalWindChillTemperature
Current outside theoretical wind chill temperature

**Units:**K


## environment.tide.heightHigh
Next high tide height  relative to lowest astronomical tide (LAT/Chart Datum)

**Units:**m


## environment.tide.heightLow
The next low tide height relative to lowest astronomical tide (LAT/Chart Datum)

**Units:**m


## environment.tide.heightNow
The current tide height  relative to lowest astronomical tide (LAT/Chart Datum)

**Units:**m


## environment.tide.timeHigh.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## environment.tide.timeLow.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## environment.water.baitWell.temperature
Temperature

**Units:**K


## environment.water.liveWell.temperature
Temperature

**Units:**K


## environment.water.salinity
Water salinity

**Units:**ratio


## environment.water.temperature
Current water temperature

**Units:**K


## environment.wind.angleApparent
Apparent wind angle, negative to port

**Units:**rad


## environment.wind.angleTrueGround
True wind angle based on speed over ground, negative to port

**Units:**rad


## environment.wind.angleTrueWater
True wind angle based on speed through water, negative to port

**Units:**rad


## environment.wind.directionChangeAlarm
The angle the wind needs to shift to raise an alarm

**Units:**rad


## environment.wind.directionMagnetic
The wind direction relative to magnetic north

**Units:**rad


## environment.wind.directionTrue
The wind direction relative to true north

**Units:**rad


## environment.wind.speedApparent
Apparent wind speed

**Units:**m/s


## environment.wind.speedOverGround
Wind speed over ground (as calculated from speedApparent and vessel's speed over ground)

**Units:**m/s


## environment.wind.speedTrue
Wind speed over water (as calculated from speedApparent and vessel's speed through water)

**Units:**m/s


## navigation.anchor.currentRadius
Current distance to anchor

**Units:**m


## navigation.anchor.maxRadius
Radius of anchor alarm boundary. The distance from anchor to the center of the boat

**Units:**m


## navigation.anchor.position.altitude
Altitude

**Units:**m


## navigation.anchor.position.latitude
Latitude

**Units:**deg

### Example:
```
52.0987654
```

## navigation.anchor.position.longitude
Longitude

**Units:**deg

### Example:
```
4.98765245
```

## navigation.attitude.pitch
Pitch, +ve is bow up

**Units:**rad


## navigation.attitude.roll
Vessel roll, +ve is list to starboard

**Units:**rad


## navigation.attitude.yaw
Yaw, +ve is heading change to starboard

**Units:**rad


## navigation.courseGreatCircle.activeRoute.estimatedTimeOfArrival.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## navigation.courseGreatCircle.activeRoute.startTime.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## navigation.courseGreatCircle.bearingTrackMagnetic
The bearing of a line between previousPoint and nextPoint, relative to magnetic north.

**Units:**rad


## navigation.courseGreatCircle.bearingTrackTrue
The bearing of a line between previousPoint and nextPoint, relative to true north.

**Units:**rad


## navigation.courseGreatCircle.crossTrackError
The distance from the vessel's present position to the closest point on a line (track) between previousPoint and nextPoint. A negative number indicates that the vessel is currently to the left of this line (and thus must steer right to compensate), a positive number means the vessel is to the right of the line (steer left to compensate).

**Units:**m


## navigation.courseGreatCircle.nextPoint.bearingMagnetic
The bearing of a line between the vessel's current position and nextPoint, relative to magnetic north

**Units:**rad


## navigation.courseGreatCircle.nextPoint.bearingTrue
The bearing of a line between the vessel's current position and nextPoint, relative to true north

**Units:**rad


## navigation.courseGreatCircle.nextPoint.distance
The distance in meters between the vessel's present position and the nextPoint

**Units:**m


## navigation.courseGreatCircle.nextPoint.timeToGo
Time in seconds to reach nextPoint's perpendicular) with current speed & direction

**Units:**s


## navigation.courseGreatCircle.nextPoint.velocityMadeGood
The velocity component of the vessel towards the nextPoint

**Units:**m/s


## navigation.courseGreatCircle.previousPoint.distance
The distance in meters between previousPoint and the vessel's present position

**Units:**m


## navigation.courseOverGroundMagnetic
Course over ground (magnetic)

**Units:**rad


## navigation.courseOverGroundTrue
Course over ground (true)

**Units:**rad


## navigation.courseRhumbline.activeRoute.estimatedTimeOfArrival.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## navigation.courseRhumbline.activeRoute.startTime.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## navigation.courseRhumbline.bearingTrackMagnetic
The bearing of a line between previousPoint and nextPoint, relative to magnetic north.

**Units:**rad


## navigation.courseRhumbline.bearingTrackTrue
The bearing of a line between previousPoint and nextPoint, relative to true north.

**Units:**rad


## navigation.courseRhumbline.crossTrackError
The distance from the vessel's present position to the closest point on a line (track) between previousPoint and nextPoint. A negative number indicates that the vessel is currently to the left of this line (and thus must steer right to compensate), a positive number means the vessel is to the right of the line (steer left to compensate).

**Units:**m


## navigation.courseRhumbline.nextPoint.bearingMagnetic
The bearing of a line between the vessel's current position and nextPoint, relative to magnetic north

**Units:**rad


## navigation.courseRhumbline.nextPoint.bearingTrue
The bearing of a line between the vessel's current position and nextPoint, relative to true north

**Units:**rad


## navigation.courseRhumbline.nextPoint.distance
The distance in meters between the vessel's present position and the nextPoint

**Units:**m


## navigation.courseRhumbline.nextPoint.timeToGo
Time in seconds to reach nextPoint's perpendicular) with current speed & direction

**Units:**s


## navigation.courseRhumbline.nextPoint.velocityMadeGood
The velocity component of the vessel towards the nextPoint

**Units:**m/s


## navigation.courseRhumbline.previousPoint.distance
The distance in meters between previousPoint and the vessel's present position

**Units:**m


## navigation.datetime.gnssTimeSource
Source of GNSS Date and Time

###Enum values:
* GPS
* GLONASS
* Galileo
* Beidou
* IRNSS
* Radio Signal
* Internet
* Local clock


## navigation.destination.eta.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## navigation.gnss.antennaAltitude
Altitude of antenna

**Units:**m


## navigation.gnss.differentialAge
Age of DGPS data

**Units:**s


## navigation.gnss.integrity
Integrity of the satellite fix

###Enum values:
* no Integrity checking
* Safe
* Caution
* Unsafe


## navigation.gnss.methodQuality
Quality of the satellite fix

###Enum values:
* no GPS
* GNSS Fix
* DGNSS fix
* Precise GNSS
* RTK fixed integer
* RTK float
* Estimated (DR) mode
* Manual input
* Simulator mode
* Error


## navigation.headingMagnetic
Current magnetic heading of the vessel

**Units:**rad


## navigation.headingTrue
The current true heading of the vessel

**Units:**rad


## navigation.lights
Current state of the vessels navigation lights

###Enum values:
* off
* fault
* anchored
* sailing
* motoring
* towing < 200m
* towing > 200m
* pushing
* fishing
* fishing-hampered
* trawling
* trawling-shooting
* trawling-hauling
* pilotage
* not-under-way
* aground
* restricted manouverability
* restricted manouverability towing < 200m
* restricted manouverability towing > 200m
* restricted manouverability underwater operations
* constrained by draft
* mine clearance


## navigation.log
Log value

**Units:**m


## navigation.logTrip
Trip log value

**Units:**m


## navigation.magneticVariation
The magnetic variation (declination) at the current position

**Units:**rad


## navigation.magneticVariationAgeOfService
Seconds since the 1st Jan 1970 that the variation calculation was made

**Units:**s


## navigation.position.altitude
Altitude

**Units:**m


## navigation.position.latitude
Latitude

**Units:**deg

### Example:
```
52.0987654
```

## navigation.position.longitude
Longitude

**Units:**deg

### Example:
```
4.98765245
```

## navigation.racing.distanceLayline
The current distance to the layline

**Units:**m


## navigation.racing.distanceStartline
The current distance to the start line

**Units:**m


## navigation.racing.timePortDown
Time to arrive at the start line on port, turning downwind

**Units:**s


## navigation.racing.timePortUp
Time to arrive at the start line on port, turning upwind

**Units:**s


## navigation.racing.timeStbdDown
Time to arrive at the start line on starboard, turning downwind

**Units:**s


## navigation.racing.timeStbdUp
Time to arrive at the start line on starboard, turning upwind

**Units:**s


## navigation.racing.timeToStart
Time left before start

**Units:**s


## navigation.rateOfTurn
Rate of turn (+ve is change to starboard)

**Units:**rad/s


## navigation.speedOverGround
Vessel speed over ground

**Units:**m/s


## navigation.speedThroughWater
Vessel speed through the water

**Units:**m/s


## navigation.state
Current navigational state of the vessel

###Enum values:
* not under command
* anchored
* sailing
* motoring
* towing < 200m
* towing > 200m
* pushing
* fishing
* fishing-hampered
* trawling
* trawling-shooting
* trawling-hauling
* pilotage
* not-under-way
* aground
* restricted manouverability
* restricted manouverability towing < 200m
* restricted manouverability towing > 200m
* restricted manouverability underwater operations
* constrained by draft
* mine clearance
* not defined (example)


## notifications.*.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## performance.beatAngle
The true wind beat angle for the best velocity made good based on current current polar diagram and trueWindSpeed.

**Units:**rad


## performance.beatAngle.meta.properties
**Units:**[object Object]


## performance.beatAngleTargetSpeed
The target speed for the beat angle.

**Units:**m/s


## performance.beatAngleTargetSpeed.meta.properties
**Units:**[object Object]


## performance.beatAngleVelocityMadeGood
The velocity made good for the beat angle.

**Units:**m/s


## performance.beatAngleVelocityMadeGood.meta.properties
**Units:**[object Object]


## performance.gybeAngle
The true wind gybe angle for the best velocity made good downwind based on current polar diagram and trueWindSpeed.

**Units:**rad


## performance.gybeAngle.meta.properties
**Units:**[object Object]


## performance.gybeAngleTargetSpeed
The target speed for the gybe angle.

**Units:**m/s


## performance.gybeAngleTargetSpeed.meta.properties
**Units:**[object Object]


## performance.gybeAngleVelocityMadeGood
The velocity made good for the gybe angle

**Units:**m/s


## performance.gybeAngleVelocityMadeGood.meta.properties
**Units:**[object Object]


## performance.leeway
Current leeway

**Units:**rad


## performance.leeway.meta.properties
**Units:**[object Object]


## performance.polarSpeed
The current polar speed based on current polar diagram, trueWindSpeed and truewindAngle.

**Units:**m/s


## performance.polarSpeed.meta.properties
**Units:**[object Object]


## performance.polarSpeedRatio
The ratio of current speed through water to the polar speed.

**Units:**ratio


## performance.polarSpeedRatio.meta.properties
**Units:**[object Object]


## performance.tackMagnetic
Magnetic heading on opposite tack.

**Units:**rad


## performance.tackMagnetic.meta.properties
**Units:**[object Object]


## performance.tackTrue
True heading on opposite tack.

**Units:**rad


## performance.tackTrue.meta.properties
**Units:**[object Object]


## performance.targetAngle
The true wind gybe or beat angle for the best velocity made good downwind or upwind based on current polar diagram and trueWindSpeed.

**Units:**rad


## performance.targetAngle.meta.properties
**Units:**[object Object]


## performance.targetSpeed
The target speed for the beat angle or gybe angle, which ever is applicable.

**Units:**m/s


## performance.targetSpeed.meta.properties
**Units:**[object Object]


## performance.velocityMadeGood
The current velocity made good derived from the speed through water and appearant wind angle. A positive value is heading to upwind, negative to downwind.

**Units:**m/s


## performance.velocityMadeGood.meta.properties
**Units:**[object Object]


## performance.velocityMadeGoodToWaypoint
The current velocity made good to the next waypoint derived from the speedOverGround, courseOverGround.

**Units:**m/s


## performance.velocityMadeGoodToWaypoint.meta.properties
**Units:**[object Object]


## propulsion.*.alternatorVoltage
Alternator voltage

**Units:**V


## propulsion.*.alternatorVoltage.meta.properties
**Units:**[object Object]


## propulsion.*.boostPressure
Engine boost (turbo, supercharger) pressure

**Units:**Pa


## propulsion.*.boostPressure.meta.properties
**Units:**[object Object]


## propulsion.*.coolantPressure
Coolant pressure

**Units:**Pa


## propulsion.*.coolantPressure.meta.properties
**Units:**[object Object]


## propulsion.*.coolantTemperature
Coolant temperature

**Units:**K


## propulsion.*.coolantTemperature.meta.properties
**Units:**[object Object]


## propulsion.*.drive.propeller.pitch 
Current pitch of propeller, the distance the propeller would advance during one revolution of the propeller without slip

**Units:**m


## propulsion.*.drive.propeller.pitch .meta.properties
**Units:**[object Object]


## propulsion.*.drive.propeller.slip
Propeller slip, the ratio between propeller pitch and distance travelled. eg 1-(actual distance travelled/propeller pitch). 0<=ratio<=1, 0 is 0% slip, 1 is 100% slip

**Units:**ratio


## propulsion.*.drive.propeller.slip.meta.properties
**Units:**[object Object]


## propulsion.*.drive.thrustAngle
Current thrust angle for steerable drives, +ve is thrust to Starboard

**Units:**rad


## propulsion.*.drive.thrustAngle.meta.properties
**Units:**[object Object]


## propulsion.*.drive.trimState
Trim/tilt state, 0<=ratio<=1, 1 is 100% up

**Units:**ratio


## propulsion.*.drive.trimState.meta.properties
**Units:**[object Object]


## propulsion.*.drive.type
###Enum values:
* saildrive
* shaft
* outboard
* jet
* pod
* other


## propulsion.*.engineLoad
Engine load ratio, 0<=ratio<=1, 1 is 100%

**Units:**ratio


## propulsion.*.engineLoad.meta.properties
**Units:**[object Object]


## propulsion.*.engineTorque
Engine torque ratio, 0<=ratio<=1, 1 is 100%

**Units:**ratio


## propulsion.*.engineTorque.meta.properties
**Units:**[object Object]


## propulsion.*.exhaustTemperature
Exhaust temperature

**Units:**K


## propulsion.*.exhaustTemperature.meta.properties
**Units:**[object Object]


## propulsion.*.fuel.averageRate
Average fuel rate of consumption

**Units:**m3/s


## propulsion.*.fuel.averageRate.meta.properties
**Units:**[object Object]


## propulsion.*.fuel.economyRate
Economy fuel rate of consumption

**Units:**m3/s


## propulsion.*.fuel.economyRate.meta.properties
**Units:**[object Object]


## propulsion.*.fuel.pressure
Fuel pressure

**Units:**Pa


## propulsion.*.fuel.pressure.meta.properties
**Units:**[object Object]


## propulsion.*.fuel.rate
Fuel rate  of consumption

**Units:**m3/s


## propulsion.*.fuel.rate.meta.properties
**Units:**[object Object]


## propulsion.*.fuel.type
Fuel type

###Enum values:
* diesel
* petrol
* electric
* coal/wood
* other


## propulsion.*.fuel.used
Used fuel since last reset. Resetting is at user discretion

**Units:**m3


## propulsion.*.fuel.used.meta.properties
**Units:**[object Object]


## propulsion.*.oilPressure
Oil pressure

**Units:**Pa


## propulsion.*.oilPressure.meta.properties
**Units:**[object Object]


## propulsion.*.oilTemperature
Oil temperature

**Units:**K


## propulsion.*.oilTemperature.meta.properties
**Units:**[object Object]


## propulsion.*.revolutions
Engine revolutions (x60 for RPM)

**Units:**Hz


## propulsion.*.revolutions.meta.properties
**Units:**[object Object]


## propulsion.*.runTime
Total running time for engine (Engine Hours in seconds)

**Units:**s


## propulsion.*.runTime.meta.properties
**Units:**[object Object]


## propulsion.*.state.meta.properties
**Units:**[object Object]


## propulsion.*.state.value
###Enum values:
* stopped
* started
* unusable


## propulsion.*.temperature
Engine temperature

**Units:**K


## propulsion.*.temperature.meta.properties
**Units:**[object Object]


## propulsion.*.transmission.gear
###Enum values:
* Forward
* Neutral
* Reverse
* Fault


## propulsion.*.transmission.gearRatio
Gear ratio, engine rotations per propeller shaft rotation

**Units:**ratio


## propulsion.*.transmission.gearRatio.meta.properties
**Units:**[object Object]


## propulsion.*.transmission.oilPressure
Oil pressure

**Units:**Pa


## propulsion.*.transmission.oilPressure.meta.properties
**Units:**[object Object]


## propulsion.*.transmission.oilTemperature
Oil temperature

**Units:**K


## propulsion.*.transmission.oilTemperature.meta.properties
**Units:**[object Object]


## resources.charts.*.chartFormat
The format of the chart

###Enum values:
* gif
* geotiff
* kap
* png
* jpg
* kml
* wkt
* topojson
* geojson
* gpx
* tms
* S-57
* S-63
* svg
* other


## resources.notes.*.position.altitude
Altitude

**Units:**m


## resources.notes.*.position.latitude
Latitude

**Units:**deg

### Example:
```
52.0987654
```

## resources.notes.*.position.longitude
Longitude

**Units:**deg

### Example:
```
4.98765245
```

## resources.notes.*.position.meta.properties
**Units:**[object Object]


## resources.regions.*.feature.geometry.oneOf.0.type
###Enum values:
* Polygon


## resources.regions.*.feature.geometry.oneOf.1.type
###Enum values:
* MultiPolygon


## resources.regions.*.feature.type
###Enum values:
* Feature


## resources.routes.*.distance
Total distance from start to end

**Units:**m


## resources.routes.*.feature.geometry.type
###Enum values:
* LineString


## resources.routes.*.feature.type
###Enum values:
* Feature


## resources.waypoints.*.feature.geometry.type
###Enum values:
* Point


## resources.waypoints.*.feature.type
###Enum values:
* Feature


## resources.waypoints.*.position.altitude
Altitude

**Units:**m


## resources.waypoints.*.position.latitude
Latitude

**Units:**deg

### Example:
```
52.0987654
```

## resources.waypoints.*.position.longitude
Longitude

**Units:**deg

### Example:
```
4.98765245
```

## resources.waypoints.*.position.meta.properties
**Units:**[object Object]


## sails.area.active
The total area of the sails currently in use on the vessel

**Units:**m2


## sails.area.active.meta.properties
**Units:**[object Object]


## sails.area.total
The total area of all sails on the vessel

**Units:**m2


## sails.area.total.meta.properties
**Units:**[object Object]


## sails.inventory.*.area
The total area of this sail in square meters

**Units:**m2


## sails.inventory.*.maximumWind
The maximum wind speed this sail can be used with

**Units:**m/s


## sails.inventory.*.meta.properties
**Units:**[object Object]


## sails.inventory.*.minimumWind
The minimum wind speed this sail can be used with

**Units:**m/s


## sensors.fromBow.meta.properties
**Units:**[object Object]


## sensors.fromCenter.meta.properties
**Units:**[object Object]


## sources.*.*.anyOf.0.n2k.pgns.*.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## sources.*.*.anyOf.0.sentences.*.$ref
ISO-8601 (UTC) string representing date and time.

**Units:**ISO-8601 (UTC)

### Example:
```
2014-04-10T08:33:53Z
```

## steering.autopilot.backlash
Slack in the rudder drive mechanism

**Units:**rad


## steering.autopilot.backlash.meta.properties
**Units:**[object Object]


## steering.autopilot.deadZone
Dead zone to ignore for rudder corrections

**Units:**rad


## steering.autopilot.deadZone.meta.properties
**Units:**[object Object]


## steering.autopilot.gain.meta.properties
**Units:**[object Object]


## steering.autopilot.headingSource
Current source of heading information

###Enum values:
* compass
* wind
* gps


## steering.autopilot.maxDriveCurrent
Maximum current to use to drive servo

**Units:**A


## steering.autopilot.maxDriveCurrent.meta.properties
**Units:**[object Object]


## steering.autopilot.maxDriveRate
Maximum rudder rotation speed

**Units:**rad/s


## steering.autopilot.maxDriveRate.meta.properties
**Units:**[object Object]


## steering.autopilot.mode
Operational mode

###Enum values:
* powersave
* normal
* accurate


## steering.autopilot.portLock
Position of servo on port lock

**Units:**rad


## steering.autopilot.portLock.meta.properties
**Units:**[object Object]


## steering.autopilot.starboardLock
Position of servo on starboard lock

**Units:**rad


## steering.autopilot.starboardLock.meta.properties
**Units:**[object Object]


## steering.autopilot.state
Autopilot state

###Enum values:
* on
* off
* alarm


## steering.autopilot.targetHeadingMagnetic
Target heading for autopilot, relative to magnetic North

**Units:**rad


## steering.autopilot.targetHeadingMagnetic.meta.properties
**Units:**[object Object]


## steering.autopilot.targetHeadingNorth
Target heading for autopilot, relative to true North

**Units:**rad


## steering.autopilot.targetHeadingNorth.meta.properties
**Units:**[object Object]


## steering.rudderAngle
Current rudder angle, +ve is rudder to Starboard

**Units:**rad


## steering.rudderAngle.meta.properties
**Units:**[object Object]


## steering.rudderAngleTarget
The angle the rudder should move to, +ve is rudder to Starboard

**Units:**rad


## steering.rudderAngleTarget.meta.properties
**Units:**[object Object]


## tanks.blackWater.*.capacity
Total capacity

**Units:**m3


## tanks.blackWater.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.blackWater.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.blackWater.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum


## tanks.freshWater.*.capacity
Total capacity

**Units:**m3


## tanks.freshWater.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.freshWater.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.freshWater.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum


## tanks.fuel.*.capacity
Total capacity

**Units:**m3


## tanks.fuel.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.fuel.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.fuel.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum


## tanks.fuelWater.*.capacity
Total capacity

**Units:**m3


## tanks.fuelWater.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.fuelWater.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.fuelWater.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum


## tanks.liveWell.*.capacity
Total capacity

**Units:**m3


## tanks.liveWell.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.liveWell.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.liveWell.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum


## tanks.lubrication.*.capacity
Total capacity

**Units:**m3


## tanks.lubrication.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.lubrication.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.lubrication.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum


## tanks.wasteWater.*.capacity
Total capacity

**Units:**m3


## tanks.wasteWater.*.currentLevel
Level of fluid in tank 0-100%

**Units:**ratio


## tanks.wasteWater.*.currentVolume
Volume of fluid in tank

**Units:**m3


## tanks.wasteWater.*.type
The type of tank

###Enum values:
* petrol
* fresh water
* greywater
* holding
* lpg
* diesel
* rum



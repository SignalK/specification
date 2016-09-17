# Signal K Data Model Reference

This document is meant as the human-oriented reference to accompany the actual JSON Schema specification and is produced from the schema files. Any changes to the reference material below should be made to the original schema files.

#### /self

**Description:** This holds the key (UUID, MMSI or URL) of this vessel, the actual data is in the vessels array.

---

#### /vessels

**Description:** A wrapper object for vessel objects, each describing vessels in range, including this vessel.

---

#### /vessels/&lt;RegExp&gt;

**Title:** vessel

**Description:** An object describing an individual vessel. It should be an object in vessels, named using MMSI or a UUID

---

#### /vessels/&lt;RegExp&gt;/url

**Description:** A location of a resource, potentially relative. For hierarchical schemes (like http), applications must resolve relative URIs (e.g. './v1/api/'). Implementations should support the following schemes: http:, https:, mailto:, tel:, and ws:.

---

#### /vessels/&lt;RegExp&gt;/mmsi

**Description:** Maritime Mobile Service Identity (MMSI). Has to be 9 digits. See http://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity for information.

---

#### /vessels/&lt;RegExp&gt;/uuid

**Description:** A unique Signal K flavoured maritime resource identifier (MRN). A MRN is a form of URN, following a specific format: urn:mrn:<issueing authority>:<id type>:<id>. In case of a Signal K uuid, that looks like this: urn:mrn:signalk:uuid:<uuid>, where Signal K is the issuing authority and UUID (v4) the ID type.

---

#### /vessels/&lt;RegExp&gt;/name

**Description:** The common name of the vessel

---

#### /vessels/&lt;RegExp&gt;/flag

**Description:** The country of ship registration, or flag state of the vessel

---

#### /vessels/&lt;RegExp&gt;/port

**Description:** The home port of the vessel

---

#### /vessels/&lt;RegExp&gt;/registrations

**Description:** The various registrations of the vessel.

---

#### /vessels/&lt;RegExp&gt;/registrations/imo

**Description:** The IMO number of the vessel.

---

#### /vessels/&lt;RegExp&gt;/registrations/national

**Description:** The national registration number of the vessel.

---

#### /vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;

**Description:** This regex pattern is used for validating the identifier for the registration

---

#### /vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/country

**Description:** The ISO 3166-2 country code.

---

#### /vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/registration

**Description:** The registration code

---

#### /vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/description

**Description:** The registration description

---

#### /vessels/&lt;RegExp&gt;/registrations/local

**Description:** A local or state registration number of the vessel.

---

#### /vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;

**Description:** This regex pattern is used for validating the identifier for the registration

---

#### /vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;/registration

**Description:** The registration code

---

#### /vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;/description

**Description:** The registration description

---

#### /vessels/&lt;RegExp&gt;/registrations/other

**Description:** Other registration or permits for the vessel.

---

#### /vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;

**Description:** This regex pattern is used for validating the identifier for the registration

---

#### /vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;/registration

**Description:** The registration code

---

#### /vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;/description

**Description:** The registration description

---

#### /vessels/&lt;RegExp&gt;/communication

**Title:** communication

**Description:** Schema describing the communication child-object of a Vessel.

---

#### /vessels/&lt;RegExp&gt;/communication/callsignVhf

**Description:** Callsign for VHF communication

---

#### /vessels/&lt;RegExp&gt;/communication/callsignHf

**Description:** Callsign for HF communication

---

#### /vessels/&lt;RegExp&gt;/communication/phoneNumber

**Description:** Phone number of skipper

---

#### /vessels/&lt;RegExp&gt;/communication/emailHf

**Description:** Email address to be used for HF email (Winmail, Airmail, Sailmail)

---

#### /vessels/&lt;RegExp&gt;/communication/email

**Description:** Regular email for the skipper

---

#### /vessels/&lt;RegExp&gt;/communication/satPhoneNumber

**Description:** Satellite phone number for vessel.

---

#### /vessels/&lt;RegExp&gt;/communication/skipperName

**Description:** Full name of the skipper of the vessel.

---

#### /vessels/&lt;RegExp&gt;/communication/crewNames

**Description:** Array with the names of the crew

---

#### /vessels/&lt;RegExp&gt;/environment

**Title:** environment

**Description:** Schema describing the environmental child-object of a Vessel.

---

#### /vessels/&lt;RegExp&gt;/environment/outside

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/temperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/dewPointTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/apparentWindChillTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/theoreticalWindChillTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/heatIndexTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/pressure

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/outside/humidity

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/temperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/humidity

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/engineRoom

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/mainCabin

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/refrigerator

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/freezer

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/inside/heating

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/water

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/water/temperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/water/salinity

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/water/liveWell

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/water/baitWell

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/depth

**Title:** depth

**Description:** Depth related data

---

#### /vessels/&lt;RegExp&gt;/environment/depth/belowKeel

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/depth/belowTransducer

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/depth/belowSurface

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/depth/transducerToKeel

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/depth/surfaceToTransducer

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/current

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/current/drift

**Units:** m/s

**Description:** The speed component of the water current vector

---

#### /vessels/&lt;RegExp&gt;/environment/current/setTrue

**Units:** rad

**Description:** The direction component of the water current vector referenced to true (geographic) north

---

#### /vessels/&lt;RegExp&gt;/environment/current/setMagnetic

**Units:** rad

**Description:** The direction component of the water current vector referenced to magnetic north

---

#### /vessels/&lt;RegExp&gt;/environment/tide

**Title:** tide

**Description:** Tide data

---

#### /vessels/&lt;RegExp&gt;/environment/tide/heightHigh

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/tide/heightNow

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/tide/heightLow

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/tide/timeLow

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

#### /vessels/&lt;RegExp&gt;/environment/tide/timeHigh

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

#### /vessels/&lt;RegExp&gt;/environment/heave

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind

**Title:** wind

**Description:** Wind data.

---

#### /vessels/&lt;RegExp&gt;/environment/wind/angleApparent

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/angleTrueGround

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/angleTrueWater

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/directionChangeAlarm

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/directionTrue

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/directionMagnetic

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/speedTrue

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/speedOverGround

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/wind/speedApparent

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/environment/time

**Description:** A time reference onboard.

---

#### /vessels/&lt;RegExp&gt;/environment/time/millis

**Title:** Epoch time

**Description:** Milliseconds since the UNIX epoch (1970-01-01 00:00:00)

---

#### /vessels/&lt;RegExp&gt;/environment/time/timezone

**Title:** Timezone offset

**Description:** Timezone offset in hours and minutes (-)hhmm

---

#### /vessels/&lt;RegExp&gt;/environment/time/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/environment/time/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/environment/time/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/environment/time/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/environment/time/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/environment/mode

**Description:** Mode of the vessel based on the current conditions. Can be combined with navigation.state to control vessel signals eg switch to night mode for instrumentation and lights, or make sound signals for fog.

---

#### /vessels/&lt;RegExp&gt;/environment/mode/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/environment/mode/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/environment/mode/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/environment/mode/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/environment/mode/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/navigation

**Title:** navigation

**Description:** Schema describing the navigation child-object of a Vessel.

---

#### /vessels/&lt;RegExp&gt;/navigation/lights

**Title:** Navigation lights

**Description:** Current state of the vessels navigation lights

---

#### /vessels/&lt;RegExp&gt;/navigation/lights/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/navigation/lights/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/navigation/lights/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/navigation/lights/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/navigation/lights/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/navigation/courseOverGroundMagnetic

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/courseOverGroundTrue

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/courseRhumbline

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/courseGreatCircle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/startLineStb

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/startLinePort

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/distanceStartline

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/timeToStart

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/timePortDown

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/timePortUp

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/timeStbdDown

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/timeStbdUp

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/racing/distanceLayline

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/magneticVariation

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/magneticVariationAgeOfService

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/destination

**Title:** destination

**Description:** The intended destination of this trip

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/eta

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/navigation/destination/waypoint

**Description:** UUID of destination waypoint

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss

**Title:** gnss

**Description:** Global satellite navigation meta information

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/methodQuality

**Description:** Quality of the satellite fix

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/integrity

**Description:** Integrity of the satellite fix

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/satellites

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/antennaAltitude

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/horizontalDilution

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/positionDilution

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/geoidalSeparation

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/differentialAge

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/gnss/differentialReference

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/headingMagnetic

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/headingTrue

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/position

**Title:** position

**Description:** The position in 3 dimensions

---

#### /vessels/&lt;RegExp&gt;/navigation/position/longitude

**Units:** deg

**Description:** Longitude

---

#### /vessels/&lt;RegExp&gt;/navigation/position/latitude

**Units:** deg

**Description:** Latitude

---

#### /vessels/&lt;RegExp&gt;/navigation/position/altitude

**Units:** m

**Description:** Altitude

---

#### /vessels/&lt;RegExp&gt;/navigation/attitude

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/attitude/roll

**Units:** rad

**Description:** Vessel roll, +ve is list to starboard

---

#### /vessels/&lt;RegExp&gt;/navigation/attitude/pitch

**Units:** rad

**Description:** Pitch, +ve is bow up

---

#### /vessels/&lt;RegExp&gt;/navigation/attitude/yaw

**Units:** rad

**Description:** Yaw, +ve is heading change to starboard

---

#### /vessels/&lt;RegExp&gt;/navigation/rateOfTurn

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/speedOverGround

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/speedThroughWater

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/log

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/logTrip

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/state

**Title:** state

**Description:** Current navigational state of the vessel

---

#### /vessels/&lt;RegExp&gt;/navigation/state/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/navigation/state/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/navigation/state/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/navigation/state/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/navigation/state/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor

**Title:** anchor

**Description:** The anchor data, for anchor watch etc

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/maxRadius

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/currentRadius

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/position

**Title:** position

**Description:** The position in 3 dimensions

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/position/longitude

**Units:** deg

**Description:** Longitude

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/position/latitude

**Units:** deg

**Description:** Latitude

---

#### /vessels/&lt;RegExp&gt;/navigation/anchor/position/altitude

**Units:** m

**Description:** Altitude

---

#### /vessels/&lt;RegExp&gt;/navigation/datetime

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/navigation/datetime/gnssTimeSource

**Description:** Source of GNSS Date and Time

---

#### /vessels/&lt;RegExp&gt;/propulsion

**Title:** propulsion

**Description:** An engine, named by a unique name within this vessel

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;

**Description:** This regex pattern is used for validation of the identifier for the propulsion unit

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/label

**Description:** Human readable label for the propulsion unit

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/state

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/revolutions

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/temperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/oilTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/oilPressure

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/alternatorVoltage

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/runTime

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/coolantTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/coolantPressure

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/boostPressure

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/engineLoad

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/engineTorque

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/gear

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/gearRatio

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/oilTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/oilPressure

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/type

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/trimState

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/thrustAngle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/propeller

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/type

**Description:** Fuel type

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/used

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/pressure

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/rate

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/economyRate

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/averageRate

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/exhaustTemperature

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical

**Title:** Electrical Properties

**Description:** Schema describing the electrical child-object of a Vessel.

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature

**Title:** temperature

**Description:** Additional / unique temperatures associated with a battery

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitDischargeLower

**Units:** K

**Description:** Operational minimum temperature limit for battery discharge, in degrees Celsius

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitDischargeUpper

**Units:** K

**Description:** Operational maximum temperature limit for battery discharge, in degrees Celsius

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitRechargeLower

**Units:** K

**Description:** Operational minimum temperature limit for battery recharging, in degrees Celsius

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitRechargeUpper

**Units:** K

**Description:** Operational maximum temperature limit for battery recharging, in degrees Celsius

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity

**Title:** capacity

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/nominal

**Units:** J

**Description:** The capacity of battery as specified by the manufacturer

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/actual

**Units:** J

**Description:** The measured capacity of battery. This may change over time and will likely deviate from the nominal capacity.

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/remaining

**Units:** J

**Description:** Capacity remaining in battery

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/dischargeLimit

**Units:** J

**Description:** Minimum capacity to be left in the battery while discharging

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/stateOfCharge

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/stateOfHealth

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/dischargeSinceFull

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/timeRemaining

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/lifetimeDischarge

**Units:** C

**Description:** Cumulative charge discharged from battery over operational lifetime of battery

---

#### /vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/lifetimeRecharge

**Units:** C

**Description:** Cumulative charge recharged into battery over operational lifetime of battery

---

#### /vessels/&lt;RegExp&gt;/electrical/inverters

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;

**Title:** Inverter

**Description:** DC to AC inverter, one or many, within the vessel

---

#### /vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/dc

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/ac

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/mode

**Description:** Mode of inverter

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/electrical/ac

**Description:** AC buses

---

#### /vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;

**Title:** AC bus

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;/phase

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;/phase/(single)|([A-C])

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/notifications

**Title:** notifications

**Description:** Notifications currently raised. Major categories have well-defined names, but the tree can be extended by any hierarchical structure

---

#### /vessels/&lt;RegExp&gt;/notifications/mob

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/mob/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/fire

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/fire/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/sinking

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/sinking/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/flooding

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/flooding/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/collision

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/collision/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/grounding

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/grounding/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/listing

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/listing/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/adrift

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/adrift/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/piracy

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/piracy/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/abandon

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/abandon/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/notifications/&lt;RegExp&gt;

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

#### /vessels/&lt;RegExp&gt;/notifications/&lt;RegExp&gt;/&lt;RegExp&gt;

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

#### /vessels/&lt;RegExp&gt;/steering

**Title:** steering

**Description:** Schema describing the steering child-object of a vessel.

---

#### /vessels/&lt;RegExp&gt;/steering/rudderAngle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/rudderAngleTarget

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot

**Title:** autopilot

**Description:** Autopilot data

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/state

**Description:** Autopilot state

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/state/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/state/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/state/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/state/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/state/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/mode

**Description:** Operational mode

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/mode/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/targetHeadingNorth

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/targetHeadingMagnetic

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/headingSource

**Description:** Current source of heading information

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/deadZone

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/backlash

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/gain

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/maxDriveCurrent

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/maxDriveRate

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/portLock

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/steering/autopilot/starboardLock

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks

**Description:** A tank, named by a unique identifier

---

#### /vessels/&lt;RegExp&gt;/tanks/freshWater

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks/wasteWater

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks/blackWater

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks/fuelWater

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks/fuel

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks/lubrication

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/tanks/liveWell

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/design

**Title:** design

**Description:** An object describing the vessels primary dimensions and statistics.

---

#### /vessels/&lt;RegExp&gt;/design/displacement

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/design/draft

**Title:** draft

**Description:** The draft of the vessel

---

#### /vessels/&lt;RegExp&gt;/design/draft/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/design/draft/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/design/draft/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/design/draft/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/design/draft/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/design/draft/minimum

**Units:** m

**Description:** The minimum draft of the vessel

---

#### /vessels/&lt;RegExp&gt;/design/draft/maximum

**Units:** m

**Description:** The maximum draft of the vessel

---

#### /vessels/&lt;RegExp&gt;/design/draft/canoe

**Units:** m

**Description:** The draft of the vessel without protrusions such as keel, centerboard, rudder

---

#### /vessels/&lt;RegExp&gt;/design/length

**Title:** length

**Description:** The various lengths of the vessel

---

#### /vessels/&lt;RegExp&gt;/design/length/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/design/length/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/design/length/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/design/length/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/design/length/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/design/length/overall

**Units:** m

**Description:** Length overall

---

#### /vessels/&lt;RegExp&gt;/design/length/hull

**Units:** m

**Description:** Length of hull

---

#### /vessels/&lt;RegExp&gt;/design/length/waterline

**Units:** m

**Description:** Length at waterline

---

#### /vessels/&lt;RegExp&gt;/design/keel

**Title:** keel

**Description:** Information about the vessel's keel

---

#### /vessels/&lt;RegExp&gt;/design/keel/type

**Description:** The type of keel.

---

#### /vessels/&lt;RegExp&gt;/design/keel/angle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/design/keel/lift

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/design/keel/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/design/keel/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/design/keel/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/design/keel/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/design/keel/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/design/beam

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/design/airHeight

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/design/rigging

**Title:** rigging

**Description:** Information about the vessel's rigging

---

#### /vessels/&lt;RegExp&gt;/design/rigging/configuration

**Description:** The configuration of the rigging

---

#### /vessels/&lt;RegExp&gt;/design/rigging/masts

**Description:** The number of masts on the vessel.

---

#### /vessels/&lt;RegExp&gt;/design/rigging/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/design/rigging/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/design/rigging/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/design/rigging/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/design/rigging/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/sails

**Title:** sails

**Description:** An object describing the vessels sails if the vessel is a sailboat.

---

#### /vessels/&lt;RegExp&gt;/sails/inventory

**Description:** An object containing a description of each sail available to the vessel crew

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;

**Description:** 'sail' data type.

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/name

**Description:** An unique identifier by which the crew identifies a sail

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/type

**Description:** The type of sail

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/material

**Description:** The material the sail is made from (optional)

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/brand

**Description:** The brand of the sail (optional)

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/active

**Description:** Indicates wether this sail is currently in use or not

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/area

**Units:** m2

**Description:** The total area of this sail in square meters

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/minimumWind

**Units:** m/s

**Description:** The minimum wind speed this sail can be used with

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/maximumWind

**Units:** m/s

**Description:** The maximum wind speed this sail can be used with

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /vessels/&lt;RegExp&gt;/sails/area

**Description:** An object containing information about the vessels' sails.

---

#### /vessels/&lt;RegExp&gt;/sails/area/total

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/sails/area/active

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/sensors

**Title:** sensors

**Description:** Sensors, their state, and data.

---

#### /vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;

**Title:** sensor

**Description:** An object describing an individual sensor. It should be an object in vessel, named using a unique name or UUID

---

#### /vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/name

**Description:** The common name of the sensor

---

#### /vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/sensorType

**Description:** The datamodel definition of the sensor data. FIXME - need to create a definitions lib of sensor datamodel types

---

#### /vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/sensorData

**Description:** The data of the sensor data. FIXME - need to ref the definitions of sensor types

---

#### /vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/fromBow

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/fromCenter

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance

**Title:** performance

**Description:** Schema describing the performance child-object of a Vessel.

---

#### /vessels/&lt;RegExp&gt;/performance/polarSpeed

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/polarSpeedRatio

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/velocityMadeGood

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/velocityMadeGoodToWaypoint

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/beatAngle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/beatAngleVelocityMadeGood

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/beatAngleTargetSpeed

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/gybeAngle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/gybeAngleVelocityMadeGood

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/gybeAngleTargetSpeed

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/targetAngle

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/targetSpeed

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/leeway

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/tackMagnetic

**Description:** [missing]

---

#### /vessels/&lt;RegExp&gt;/performance/tackTrue

**Description:** [missing]

---

#### /sources

**Title:** sources

**Description:** Metadata about the sources, eg. buses and connected sensors

---

#### /sources/&lt;RegExp&gt;

**Description:** [missing]

---

#### /sources/&lt;RegExp&gt;/label

**Description:** Sources unique name e.g. [type-bus].[id], N2000-01.034

---

#### /sources/&lt;RegExp&gt;/type

**Description:** Type of interface i.e. signalk, NMEA0183 or NMEA2000

---

#### /sources/&lt;RegExp&gt;/manufacturer

**Description:** Manufacturer of the source device

---

#### /sources/&lt;RegExp&gt;/productFunction

**Description:** NMEA2000 Product Function Code

---

#### /sources/&lt;RegExp&gt;/productClass

**Description:** NMEA2000 Product Class Code

---

#### /sources/&lt;RegExp&gt;/productCode

**Description:** NMEA2000 Product Code

---

#### /sources/&lt;RegExp&gt;/productName

**Description:** Product Name or Model Number

---

#### /sources/&lt;RegExp&gt;/softwareVersion

**Description:** Version of the device's Software/Firmware

---

#### /sources/&lt;RegExp&gt;/hardwareVersion

**Description:** Version of the device's Hardware

---

#### /sources/&lt;RegExp&gt;/serialNo

**Description:** Device's Serial Number

---

#### /sources/&lt;RegExp&gt;/installationNote1

**Description:** Product Installation Note 1 i.e. 'Wired on Navigation Switch/Circuit'

---

#### /sources/&lt;RegExp&gt;/installationNote2

**Description:** Product Installation Note 2 i.e. 'Located under forward bunk'

---

#### /sources/&lt;RegExp&gt;/manufacturerInfo

**Description:** Manufacturer's Info i.e. 'http://digitalyachtamerica.com Tel:+44 1179 554474'

---

#### /sources/&lt;RegExp&gt;/&lt;RegExp&gt;

**Description:** [missing]

---

#### /resources

**Title:** resources

**Description:** Resources to aid in navigation and operation of the vessel

---

#### /resources/charts

**Title:** chart

**Description:** A holder for charts, each named with their chart code

---

#### /resources/charts/&lt;RegExp&gt;

**Description:** A chart

---

#### /resources/charts/&lt;RegExp&gt;/name

**Description:** Chart common name

---

#### /resources/charts/&lt;RegExp&gt;/identifier

**Description:** Chart number

---

#### /resources/charts/&lt;RegExp&gt;/description

**Description:** A description of the chart

---

#### /resources/charts/&lt;RegExp&gt;/tilemapUrl

**Description:** A url to the tilemap of the chart for use in TMS chartplotting apps

---

#### /resources/charts/&lt;RegExp&gt;/region

**Description:** Region related to note. A pointer to a region UUID. Alternative to geohash

---

#### /resources/charts/&lt;RegExp&gt;/geohash

**Description:** A geohash (see http://geohash.org)

---

#### /resources/charts/&lt;RegExp&gt;/chartUrl

**Description:** A url to the chart file's storage location

---

#### /resources/charts/&lt;RegExp&gt;/scale

**Description:** The scale of the chart, the larger number from 1:200000

---

#### /resources/charts/&lt;RegExp&gt;/chartFormat

**Description:** The format of the chart

---

#### /resources/charts/&lt;RegExp&gt;/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /resources/charts/&lt;RegExp&gt;/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /resources/charts/&lt;RegExp&gt;/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /resources/charts/&lt;RegExp&gt;/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /resources/charts/&lt;RegExp&gt;/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /resources/routes

**Title:** route

**Description:** A holder for routes, each named with a UUID

---

#### /resources/routes/&lt;RegExp&gt;

**Description:** A route, named with a UUID

---

#### /resources/routes/&lt;RegExp&gt;/name

**Description:** Route's common name

---

#### /resources/routes/&lt;RegExp&gt;/description

**Description:** A description of the route

---

#### /resources/routes/&lt;RegExp&gt;/distance

**Units:** m

**Description:** Total distance from start to end

---

#### /resources/routes/&lt;RegExp&gt;/start

**Description:** The waypoint UUID at the start of the route

---

#### /resources/routes/&lt;RegExp&gt;/end

**Description:** The waypoint UUID at the end of the route

---

#### /resources/routes/&lt;RegExp&gt;/feature

**Title:** Feature

**Description:** A Geo JSON feature object which describes the route between the waypoints

---

#### /resources/routes/&lt;RegExp&gt;/feature/type

**Description:** [missing]

---

#### /resources/routes/&lt;RegExp&gt;/feature/geometry

**Title:** LineString

**Description:** [missing]

---

#### /resources/routes/&lt;RegExp&gt;/feature/geometry/type

**Description:** [missing]

---

#### /resources/routes/&lt;RegExp&gt;/feature/geometry/coordinates

**Description:** [missing]

---

#### /resources/routes/&lt;RegExp&gt;/feature/properties

**Description:** Additional data of any type

---

#### /resources/routes/&lt;RegExp&gt;/feature/id

**Description:** [missing]

---

#### /resources/routes/&lt;RegExp&gt;/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /resources/routes/&lt;RegExp&gt;/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /resources/routes/&lt;RegExp&gt;/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /resources/routes/&lt;RegExp&gt;/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /resources/routes/&lt;RegExp&gt;/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /resources/notes

**Title:** notes

**Description:** A holder for notes about regions, each named with a UUID. Notes might include navigation or cruising info, images, or anything

---

#### /resources/notes/&lt;RegExp&gt;

**Description:** A note about a region, named with a UUID. Notes might include navigation or cruising info, images, or anything

---

#### /resources/notes/&lt;RegExp&gt;/title

**Description:** Note's common name

---

#### /resources/notes/&lt;RegExp&gt;/description

**Description:** A textual description of the note

---

#### /resources/notes/&lt;RegExp&gt;/region

**Description:** Region related to note. A pointer to a region UUID. Alternative to position or geohash

---

#### /resources/notes/&lt;RegExp&gt;/position

**Description:** [missing]

---

#### /resources/notes/&lt;RegExp&gt;/position/longitude

**Units:** deg

**Description:** Longitude

---

#### /resources/notes/&lt;RegExp&gt;/position/latitude

**Units:** deg

**Description:** Latitude

---

#### /resources/notes/&lt;RegExp&gt;/position/altitude

**Units:** m

**Description:** Altitude

---

#### /resources/notes/&lt;RegExp&gt;/geohash

**Description:** A geohash (see http://geohash.org)

---

#### /resources/notes/&lt;RegExp&gt;/mimeType

**Description:** MIME type of the note

---

#### /resources/notes/&lt;RegExp&gt;/url

**Description:** Location of the note

---

#### /resources/notes/&lt;RegExp&gt;/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /resources/notes/&lt;RegExp&gt;/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /resources/notes/&lt;RegExp&gt;/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /resources/notes/&lt;RegExp&gt;/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /resources/notes/&lt;RegExp&gt;/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /resources/regions

**Title:** region

**Description:** A holder for regions, each named with UUID

---

#### /resources/regions/&lt;RegExp&gt;

**Description:** A region of interest, each named with a UUID

---

#### /resources/regions/&lt;RegExp&gt;/geohash

**Description:** geohash of the approximate boundary of this region

---

#### /resources/regions/&lt;RegExp&gt;/feature

**Title:** Feature

**Description:** A Geo JSON feature object which describes the regions boundary

---

#### /resources/regions/&lt;RegExp&gt;/feature/type

**Description:** [missing]

---

#### /resources/regions/&lt;RegExp&gt;/feature/geometry

**Description:** [missing]

---

#### /resources/regions/&lt;RegExp&gt;/feature/properties

**Description:** Additional data of any type

---

#### /resources/regions/&lt;RegExp&gt;/feature/id

**Description:** [missing]

---

#### /resources/regions/&lt;RegExp&gt;/source

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

#### /resources/regions/&lt;RegExp&gt;/source/label

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

#### /resources/regions/&lt;RegExp&gt;/source/type

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

#### /resources/regions/&lt;RegExp&gt;/source/src

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

#### /resources/regions/&lt;RegExp&gt;/source/talker

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

#### /resources/waypoints

**Title:** waypoints

**Description:** A holder for waypoints, each named with a UUID

---

#### /resources/waypoints/&lt;RegExp&gt;

**Description:** A waypoint, an object with a signal k position object, and GeoJSON Feature object (see geojson.org, and https://github.com/fge/sample-json-schemas/tree/master/geojson)

---

#### /resources/waypoints/&lt;RegExp&gt;/position

**Description:** [missing]

---

#### /resources/waypoints/&lt;RegExp&gt;/position/longitude

**Units:** deg

**Description:** Longitude

---

#### /resources/waypoints/&lt;RegExp&gt;/position/latitude

**Units:** deg

**Description:** Latitude

---

#### /resources/waypoints/&lt;RegExp&gt;/position/altitude

**Units:** m

**Description:** Altitude

---

#### /resources/waypoints/&lt;RegExp&gt;/feature

**Title:** Feature

**Description:** A Geo JSON feature object

---

#### /resources/waypoints/&lt;RegExp&gt;/feature/type

**Description:** [missing]

---

#### /resources/waypoints/&lt;RegExp&gt;/feature/geometry

**Title:** Point

**Description:** [missing]

---

#### /resources/waypoints/&lt;RegExp&gt;/feature/geometry/type

**Description:** [missing]

---

#### /resources/waypoints/&lt;RegExp&gt;/feature/geometry/coordinates

**Description:** A single position, in x,y order (Lon, Lat)

---

#### /resources/waypoints/&lt;RegExp&gt;/feature/properties

**Description:** Additional data of any type

---

#### /resources/waypoints/&lt;RegExp&gt;/feature/id

**Description:** [missing]

---

#### /version

**Description:** Version of the Signal K schema/APIs used by the root object.

---


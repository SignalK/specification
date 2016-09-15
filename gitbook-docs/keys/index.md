# Signal K Data Model Reference

This document is meant as the human-oriented reference to accompany the actual JSON Schema specification and is produced from the schema files. Any changes to the reference material below should be made to the original schema files.

### [/self](./self.md)

**Description:** This holds the key (UUID, MMSI or URL) of this vessel, the actual data is in the vessels array.

---

### [/vessels](./vessels.md)

**Description:** A wrapper object for vessel objects, each describing vessels in range, including this vessel.

---

### [/vessels/&lt;RegExp&gt;](./vessels.__RegExp__.md)

**Title:** vessel

**Description:** An object describing an individual vessel. It should be an object in vessels, named using MMSI or a UUID

---

### [/vessels/&lt;RegExp&gt;/url](./vessels.__RegExp__.url.md)

**Description:** A location of a resource, potentially relative. For hierarchical schemes (like http), applications must resolve relative URIs (e.g. './v1/api/'). Implementations should support the following schemes: http:, https:, mailto:, tel:, and ws:.

---

### [/vessels/&lt;RegExp&gt;/mmsi](./vessels.__RegExp__.mmsi.md)

**Description:** Maritime Mobile Service Identity (MMSI). Has to be 9 digits. See http://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity for information.

---

### [/vessels/&lt;RegExp&gt;/uuid](./vessels.__RegExp__.uuid.md)

**Description:** A unique Signal K flavoured maritime resource identifier (MRN). A MRN is a form of URN, following a specific format: urn:mrn:<issueing authority>:<id type>:<id>. In case of a Signal K uuid, that looks like this: urn:mrn:signalk:uuid:<uuid>, where Signal K is the issuing authority and UUID (v4) the ID type.

---

### [/vessels/&lt;RegExp&gt;/name](./vessels.__RegExp__.name.md)

**Description:** The common name of the vessel

---

### [/vessels/&lt;RegExp&gt;/flag](./vessels.__RegExp__.flag.md)

**Description:** The country of ship registration, or flag state of the vessel

---

### [/vessels/&lt;RegExp&gt;/port](./vessels.__RegExp__.port.md)

**Description:** The home port of the vessel

---

### [/vessels/&lt;RegExp&gt;/registrations](./vessels.__RegExp__.registrations.md)

**Description:** The various registrations of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/imo](./vessels.__RegExp__.registrations.imo.md)

**Description:** The IMO number of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/national](./vessels.__RegExp__.registrations.national.md)

**Description:** The national registration number of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;](./vessels.__RegExp__.registrations.national.__RegExp__.md)

**Description:** This regex pattern is used for validating the identifier for the registration

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/country](./vessels.__RegExp__.registrations.national.__RegExp__.country.md)

**Description:** The ISO 3166-2 country code.

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/registration](./vessels.__RegExp__.registrations.national.__RegExp__.registration.md)

**Description:** The registration code

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/description](./vessels.__RegExp__.registrations.national.__RegExp__.description.md)

**Description:** The registration description

---

### [/vessels/&lt;RegExp&gt;/registrations/local](./vessels.__RegExp__.registrations.local.md)

**Description:** A local or state registration number of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;](./vessels.__RegExp__.registrations.local.__RegExp__.md)

**Description:** This regex pattern is used for validating the identifier for the registration

---

### [/vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;/registration](./vessels.__RegExp__.registrations.local.__RegExp__.registration.md)

**Description:** The registration code

---

### [/vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;/description](./vessels.__RegExp__.registrations.local.__RegExp__.description.md)

**Description:** The registration description

---

### [/vessels/&lt;RegExp&gt;/registrations/other](./vessels.__RegExp__.registrations.other.md)

**Description:** Other registration or permits for the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;](./vessels.__RegExp__.registrations.other.__RegExp__.md)

**Description:** This regex pattern is used for validating the identifier for the registration

---

### [/vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;/registration](./vessels.__RegExp__.registrations.other.__RegExp__.registration.md)

**Description:** The registration code

---

### [/vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;/description](./vessels.__RegExp__.registrations.other.__RegExp__.description.md)

**Description:** The registration description

---

### [/vessels/&lt;RegExp&gt;/communication](./vessels.__RegExp__.communication.md)

**Title:** communication

**Description:** Schema describing the communication child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/communication/callsignVhf](./vessels.__RegExp__.communication.callsignVhf.md)

**Description:** Callsign for VHF communication

---

### [/vessels/&lt;RegExp&gt;/communication/callsignHf](./vessels.__RegExp__.communication.callsignHf.md)

**Description:** Callsign for HF communication

---

### [/vessels/&lt;RegExp&gt;/communication/phoneNumber](./vessels.__RegExp__.communication.phoneNumber.md)

**Description:** Phone number of skipper

---

### [/vessels/&lt;RegExp&gt;/communication/emailHf](./vessels.__RegExp__.communication.emailHf.md)

**Description:** Email address to be used for HF email (Winmail, Airmail, Sailmail)

---

### [/vessels/&lt;RegExp&gt;/communication/email](./vessels.__RegExp__.communication.email.md)

**Description:** Regular email for the skipper

---

### [/vessels/&lt;RegExp&gt;/communication/satPhoneNumber](./vessels.__RegExp__.communication.satPhoneNumber.md)

**Description:** Satellite phone number for vessel.

---

### [/vessels/&lt;RegExp&gt;/communication/skipperName](./vessels.__RegExp__.communication.skipperName.md)

**Description:** Full name of the skipper of the vessel.

---

### [/vessels/&lt;RegExp&gt;/communication/crewNames](./vessels.__RegExp__.communication.crewNames.md)

**Description:** Array with the names of the crew

---

### [/vessels/&lt;RegExp&gt;/environment](./vessels.__RegExp__.environment.md)

**Title:** environment

**Description:** Schema describing the environmental child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/environment/outside](./vessels.__RegExp__.environment.outside.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/temperature](./vessels.__RegExp__.environment.outside.temperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/dewPointTemperature](./vessels.__RegExp__.environment.outside.dewPointTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/apparentWindChillTemperature](./vessels.__RegExp__.environment.outside.apparentWindChillTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/theoreticalWindChillTemperature](./vessels.__RegExp__.environment.outside.theoreticalWindChillTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/heatIndexTemperature](./vessels.__RegExp__.environment.outside.heatIndexTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/pressure](./vessels.__RegExp__.environment.outside.pressure.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/humidity](./vessels.__RegExp__.environment.outside.humidity.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside](./vessels.__RegExp__.environment.inside.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/temperature](./vessels.__RegExp__.environment.inside.temperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/humidity](./vessels.__RegExp__.environment.inside.humidity.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/engineRoom](./vessels.__RegExp__.environment.inside.engineRoom.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/mainCabin](./vessels.__RegExp__.environment.inside.mainCabin.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/refrigerator](./vessels.__RegExp__.environment.inside.refrigerator.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/freezer](./vessels.__RegExp__.environment.inside.freezer.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/heating](./vessels.__RegExp__.environment.inside.heating.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water](./vessels.__RegExp__.environment.water.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/temperature](./vessels.__RegExp__.environment.water.temperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/salinity](./vessels.__RegExp__.environment.water.salinity.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/liveWell](./vessels.__RegExp__.environment.water.liveWell.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/baitWell](./vessels.__RegExp__.environment.water.baitWell.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth](./vessels.__RegExp__.environment.depth.md)

**Title:** depth

**Description:** Depth related data

---

### [/vessels/&lt;RegExp&gt;/environment/depth/belowKeel](./vessels.__RegExp__.environment.depth.belowKeel.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/belowTransducer](./vessels.__RegExp__.environment.depth.belowTransducer.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/belowSurface](./vessels.__RegExp__.environment.depth.belowSurface.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/transducerToKeel](./vessels.__RegExp__.environment.depth.transducerToKeel.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/surfaceToTransducer](./vessels.__RegExp__.environment.depth.surfaceToTransducer.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/current](./vessels.__RegExp__.environment.current.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/current/drift](./vessels.__RegExp__.environment.current.drift.md)

**Units:** m/s

**Description:** The speed component of the water current vector

---

### [/vessels/&lt;RegExp&gt;/environment/current/setTrue](./vessels.__RegExp__.environment.current.setTrue.md)

**Units:** rad

**Description:** The direction component of the water current vector referenced to true (geographic) north

---

### [/vessels/&lt;RegExp&gt;/environment/current/setMagnetic](./vessels.__RegExp__.environment.current.setMagnetic.md)

**Units:** rad

**Description:** The direction component of the water current vector referenced to magnetic north

---

### [/vessels/&lt;RegExp&gt;/environment/tide](./vessels.__RegExp__.environment.tide.md)

**Title:** tide

**Description:** Tide data

---

### [/vessels/&lt;RegExp&gt;/environment/tide/heightHigh](./vessels.__RegExp__.environment.tide.heightHigh.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/tide/heightNow](./vessels.__RegExp__.environment.tide.heightNow.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/tide/heightLow](./vessels.__RegExp__.environment.tide.heightLow.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/tide/timeLow](./vessels.__RegExp__.environment.tide.timeLow.md)

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

### [/vessels/&lt;RegExp&gt;/environment/tide/timeHigh](./vessels.__RegExp__.environment.tide.timeHigh.md)

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

### [/vessels/&lt;RegExp&gt;/environment/heave](./vessels.__RegExp__.environment.heave.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind](./vessels.__RegExp__.environment.wind.md)

**Title:** wind

**Description:** Wind data.

---

### [/vessels/&lt;RegExp&gt;/environment/wind/angleApparent](./vessels.__RegExp__.environment.wind.angleApparent.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/angleTrueGround](./vessels.__RegExp__.environment.wind.angleTrueGround.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/angleTrueWater](./vessels.__RegExp__.environment.wind.angleTrueWater.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/directionChangeAlarm](./vessels.__RegExp__.environment.wind.directionChangeAlarm.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/directionTrue](./vessels.__RegExp__.environment.wind.directionTrue.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/directionMagnetic](./vessels.__RegExp__.environment.wind.directionMagnetic.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/speedTrue](./vessels.__RegExp__.environment.wind.speedTrue.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/speedOverGround](./vessels.__RegExp__.environment.wind.speedOverGround.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/speedApparent](./vessels.__RegExp__.environment.wind.speedApparent.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/time](./vessels.__RegExp__.environment.time.md)

**Description:** A time reference onboard.

---

### [/vessels/&lt;RegExp&gt;/environment/time/millis](./vessels.__RegExp__.environment.time.millis.md)

**Title:** Epoch time

**Description:** Milliseconds since the UNIX epoch (1970-01-01 00:00:00)

---

### [/vessels/&lt;RegExp&gt;/environment/time/timezone](./vessels.__RegExp__.environment.time.timezone.md)

**Title:** Timezone offset

**Description:** Timezone offset in hours and minutes (-)hhmm

---

### [/vessels/&lt;RegExp&gt;/environment/time/source](./vessels.__RegExp__.environment.time.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/label](./vessels.__RegExp__.environment.time.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/type](./vessels.__RegExp__.environment.time.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/src](./vessels.__RegExp__.environment.time.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/talker](./vessels.__RegExp__.environment.time.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/environment/mode](./vessels.__RegExp__.environment.mode.md)

**Description:** Mode of the vessel based on the current conditions. Can be combined with navigation.state to control vessel signals eg switch to night mode for instrumentation and lights, or make sound signals for fog.

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source](./vessels.__RegExp__.environment.mode.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/label](./vessels.__RegExp__.environment.mode.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/type](./vessels.__RegExp__.environment.mode.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/src](./vessels.__RegExp__.environment.mode.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/talker](./vessels.__RegExp__.environment.mode.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation](./vessels.__RegExp__.navigation.md)

**Title:** navigation

**Description:** Schema describing the navigation child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/navigation/lights](./vessels.__RegExp__.navigation.lights.md)

**Title:** Navigation lights

**Description:** Current state of the vessels navigation lights

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source](./vessels.__RegExp__.navigation.lights.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/label](./vessels.__RegExp__.navigation.lights.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/type](./vessels.__RegExp__.navigation.lights.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/src](./vessels.__RegExp__.navigation.lights.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/talker](./vessels.__RegExp__.navigation.lights.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/courseOverGroundMagnetic](./vessels.__RegExp__.navigation.courseOverGroundMagnetic.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/courseOverGroundTrue](./vessels.__RegExp__.navigation.courseOverGroundTrue.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/courseRhumbline](./vessels.__RegExp__.navigation.courseRhumbline.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/courseGreatCircle](./vessels.__RegExp__.navigation.courseGreatCircle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing](./vessels.__RegExp__.navigation.racing.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/startLineStb](./vessels.__RegExp__.navigation.racing.startLineStb.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/startLinePort](./vessels.__RegExp__.navigation.racing.startLinePort.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/distanceStartline](./vessels.__RegExp__.navigation.racing.distanceStartline.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timeToStart](./vessels.__RegExp__.navigation.racing.timeToStart.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timePortDown](./vessels.__RegExp__.navigation.racing.timePortDown.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timePortUp](./vessels.__RegExp__.navigation.racing.timePortUp.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timeStbdDown](./vessels.__RegExp__.navigation.racing.timeStbdDown.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timeStbdUp](./vessels.__RegExp__.navigation.racing.timeStbdUp.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/distanceLayline](./vessels.__RegExp__.navigation.racing.distanceLayline.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/magneticVariation](./vessels.__RegExp__.navigation.magneticVariation.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/magneticVariationAgeOfService](./vessels.__RegExp__.navigation.magneticVariationAgeOfService.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/destination](./vessels.__RegExp__.navigation.destination.md)

**Title:** destination

**Description:** The intended destination of this trip

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/eta](./vessels.__RegExp__.navigation.destination.eta.md)

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source](./vessels.__RegExp__.navigation.destination.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/label](./vessels.__RegExp__.navigation.destination.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/type](./vessels.__RegExp__.navigation.destination.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/src](./vessels.__RegExp__.navigation.destination.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/talker](./vessels.__RegExp__.navigation.destination.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/waypoint](./vessels.__RegExp__.navigation.destination.waypoint.md)

**Description:** UUID of destination waypoint

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss](./vessels.__RegExp__.navigation.gnss.md)

**Title:** gnss

**Description:** Global satellite navigation meta information

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source](./vessels.__RegExp__.navigation.gnss.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/label](./vessels.__RegExp__.navigation.gnss.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/type](./vessels.__RegExp__.navigation.gnss.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/src](./vessels.__RegExp__.navigation.gnss.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/talker](./vessels.__RegExp__.navigation.gnss.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/methodQuality](./vessels.__RegExp__.navigation.gnss.methodQuality.md)

**Description:** Quality of the satellite fix

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/integrity](./vessels.__RegExp__.navigation.gnss.integrity.md)

**Description:** Integrity of the satellite fix

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/satellites](./vessels.__RegExp__.navigation.gnss.satellites.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/antennaAltitude](./vessels.__RegExp__.navigation.gnss.antennaAltitude.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/horizontalDilution](./vessels.__RegExp__.navigation.gnss.horizontalDilution.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/positionDilution](./vessels.__RegExp__.navigation.gnss.positionDilution.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/geoidalSeparation](./vessels.__RegExp__.navigation.gnss.geoidalSeparation.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/differentialAge](./vessels.__RegExp__.navigation.gnss.differentialAge.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/differentialReference](./vessels.__RegExp__.navigation.gnss.differentialReference.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/headingMagnetic](./vessels.__RegExp__.navigation.headingMagnetic.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/headingTrue](./vessels.__RegExp__.navigation.headingTrue.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/position](./vessels.__RegExp__.navigation.position.md)

**Title:** position

**Description:** The position in 3 dimensions

---

### [/vessels/&lt;RegExp&gt;/navigation/position/longitude](./vessels.__RegExp__.navigation.position.longitude.md)

**Units:** deg

**Description:** Longitude

---

### [/vessels/&lt;RegExp&gt;/navigation/position/latitude](./vessels.__RegExp__.navigation.position.latitude.md)

**Units:** deg

**Description:** Latitude

---

### [/vessels/&lt;RegExp&gt;/navigation/position/altitude](./vessels.__RegExp__.navigation.position.altitude.md)

**Units:** m

**Description:** Altitude

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude](./vessels.__RegExp__.navigation.attitude.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude/roll](./vessels.__RegExp__.navigation.attitude.roll.md)

**Units:** rad

**Description:** Vessel roll, +ve is list to starboard

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude/pitch](./vessels.__RegExp__.navigation.attitude.pitch.md)

**Units:** rad

**Description:** Pitch, +ve is bow up

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude/yaw](./vessels.__RegExp__.navigation.attitude.yaw.md)

**Units:** rad

**Description:** Yaw, +ve is heading change to starboard

---

### [/vessels/&lt;RegExp&gt;/navigation/rateOfTurn](./vessels.__RegExp__.navigation.rateOfTurn.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/speedOverGround](./vessels.__RegExp__.navigation.speedOverGround.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/speedThroughWater](./vessels.__RegExp__.navigation.speedThroughWater.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/log](./vessels.__RegExp__.navigation.log.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/logTrip](./vessels.__RegExp__.navigation.logTrip.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/state](./vessels.__RegExp__.navigation.state.md)

**Title:** state

**Description:** Current navigational state of the vessel

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source](./vessels.__RegExp__.navigation.state.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/label](./vessels.__RegExp__.navigation.state.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/type](./vessels.__RegExp__.navigation.state.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/src](./vessels.__RegExp__.navigation.state.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/talker](./vessels.__RegExp__.navigation.state.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor](./vessels.__RegExp__.navigation.anchor.md)

**Title:** anchor

**Description:** The anchor data, for anchor watch etc

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source](./vessels.__RegExp__.navigation.anchor.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/label](./vessels.__RegExp__.navigation.anchor.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/type](./vessels.__RegExp__.navigation.anchor.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/src](./vessels.__RegExp__.navigation.anchor.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/talker](./vessels.__RegExp__.navigation.anchor.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/maxRadius](./vessels.__RegExp__.navigation.anchor.maxRadius.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/currentRadius](./vessels.__RegExp__.navigation.anchor.currentRadius.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position](./vessels.__RegExp__.navigation.anchor.position.md)

**Title:** position

**Description:** The position in 3 dimensions

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position/longitude](./vessels.__RegExp__.navigation.anchor.position.longitude.md)

**Units:** deg

**Description:** Longitude

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position/latitude](./vessels.__RegExp__.navigation.anchor.position.latitude.md)

**Units:** deg

**Description:** Latitude

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position/altitude](./vessels.__RegExp__.navigation.anchor.position.altitude.md)

**Units:** m

**Description:** Altitude

---

### [/vessels/&lt;RegExp&gt;/navigation/datetime](./vessels.__RegExp__.navigation.datetime.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/datetime/gnssTimeSource](./vessels.__RegExp__.navigation.datetime.gnssTimeSource.md)

**Description:** Source of GNSS Date and Time

---

### [/vessels/&lt;RegExp&gt;/propulsion](./vessels.__RegExp__.propulsion.md)

**Title:** propulsion

**Description:** An engine, named by a unique name within this vessel

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;](./vessels.__RegExp__.propulsion.__RegExp__.md)

**Description:** This regex pattern is used for validation of the identifier for the propulsion unit

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/label](./vessels.__RegExp__.propulsion.__RegExp__.label.md)

**Description:** Human readable label for the propulsion unit

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/state](./vessels.__RegExp__.propulsion.__RegExp__.state.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/revolutions](./vessels.__RegExp__.propulsion.__RegExp__.revolutions.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/temperature](./vessels.__RegExp__.propulsion.__RegExp__.temperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/oilTemperature](./vessels.__RegExp__.propulsion.__RegExp__.oilTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/oilPressure](./vessels.__RegExp__.propulsion.__RegExp__.oilPressure.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/alternatorVoltage](./vessels.__RegExp__.propulsion.__RegExp__.alternatorVoltage.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/runTime](./vessels.__RegExp__.propulsion.__RegExp__.runTime.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/coolantTemperature](./vessels.__RegExp__.propulsion.__RegExp__.coolantTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/coolantPressure](./vessels.__RegExp__.propulsion.__RegExp__.coolantPressure.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/boostPressure](./vessels.__RegExp__.propulsion.__RegExp__.boostPressure.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/engineLoad](./vessels.__RegExp__.propulsion.__RegExp__.engineLoad.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/engineTorque](./vessels.__RegExp__.propulsion.__RegExp__.engineTorque.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission](./vessels.__RegExp__.propulsion.__RegExp__.transmission.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/gear](./vessels.__RegExp__.propulsion.__RegExp__.transmission.gear.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/gearRatio](./vessels.__RegExp__.propulsion.__RegExp__.transmission.gearRatio.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/oilTemperature](./vessels.__RegExp__.propulsion.__RegExp__.transmission.oilTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/oilPressure](./vessels.__RegExp__.propulsion.__RegExp__.transmission.oilPressure.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive](./vessels.__RegExp__.propulsion.__RegExp__.drive.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/type](./vessels.__RegExp__.propulsion.__RegExp__.drive.type.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/trimState](./vessels.__RegExp__.propulsion.__RegExp__.drive.trimState.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/thrustAngle](./vessels.__RegExp__.propulsion.__RegExp__.drive.thrustAngle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/propeller](./vessels.__RegExp__.propulsion.__RegExp__.drive.propeller.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel](./vessels.__RegExp__.propulsion.__RegExp__.fuel.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/type](./vessels.__RegExp__.propulsion.__RegExp__.fuel.type.md)

**Description:** Fuel type

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/used](./vessels.__RegExp__.propulsion.__RegExp__.fuel.used.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/pressure](./vessels.__RegExp__.propulsion.__RegExp__.fuel.pressure.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/rate](./vessels.__RegExp__.propulsion.__RegExp__.fuel.rate.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/economyRate](./vessels.__RegExp__.propulsion.__RegExp__.fuel.economyRate.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/averageRate](./vessels.__RegExp__.propulsion.__RegExp__.fuel.averageRate.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/exhaustTemperature](./vessels.__RegExp__.propulsion.__RegExp__.exhaustTemperature.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical](./vessels.__RegExp__.electrical.md)

**Title:** Electrical Properties

**Description:** Schema describing the electrical child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries](./vessels.__RegExp__.electrical.batteries.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;](./vessels.__RegExp__.electrical.batteries.__RegExp__.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature](./vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.md)

**Title:** temperature

**Description:** Additional / unique temperatures associated with a battery

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitDischargeLower](./vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitDischargeLower.md)

**Units:** K

**Description:** Operational minimum temperature limit for battery discharge, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitDischargeUpper](./vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitDischargeUpper.md)

**Units:** K

**Description:** Operational maximum temperature limit for battery discharge, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitRechargeLower](./vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitRechargeLower.md)

**Units:** K

**Description:** Operational minimum temperature limit for battery recharging, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitRechargeUpper](./vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitRechargeUpper.md)

**Units:** K

**Description:** Operational maximum temperature limit for battery recharging, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.md)

**Title:** capacity

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/nominal](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.nominal.md)

**Units:** J

**Description:** The capacity of battery as specified by the manufacturer

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/actual](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.actual.md)

**Units:** J

**Description:** The measured capacity of battery. This may change over time and will likely deviate from the nominal capacity.

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/remaining](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.remaining.md)

**Units:** J

**Description:** Capacity remaining in battery

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/dischargeLimit](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.dischargeLimit.md)

**Units:** J

**Description:** Minimum capacity to be left in the battery while discharging

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/stateOfCharge](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.stateOfCharge.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/stateOfHealth](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.stateOfHealth.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/dischargeSinceFull](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.dischargeSinceFull.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/timeRemaining](./vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.timeRemaining.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/lifetimeDischarge](./vessels.__RegExp__.electrical.batteries.__RegExp__.lifetimeDischarge.md)

**Units:** C

**Description:** Cumulative charge discharged from battery over operational lifetime of battery

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/lifetimeRecharge](./vessels.__RegExp__.electrical.batteries.__RegExp__.lifetimeRecharge.md)

**Units:** C

**Description:** Cumulative charge recharged into battery over operational lifetime of battery

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters](./vessels.__RegExp__.electrical.inverters.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;](./vessels.__RegExp__.electrical.inverters.__RegExp__.md)

**Title:** Inverter

**Description:** DC to AC inverter, one or many, within the vessel

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/dc](./vessels.__RegExp__.electrical.inverters.__RegExp__.dc.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/ac](./vessels.__RegExp__.electrical.inverters.__RegExp__.ac.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/mode](./vessels.__RegExp__.electrical.inverters.__RegExp__.mode.md)

**Description:** Mode of inverter

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers](./vessels.__RegExp__.electrical.chargers.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;](./vessels.__RegExp__.electrical.chargers.__RegExp__.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode](./vessels.__RegExp__.electrical.chargers.__RegExp__.mode.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source](./vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/label](./vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/type](./vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/src](./vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/talker](./vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/electrical/ac](./vessels.__RegExp__.electrical.ac.md)

**Description:** AC buses

---

### [/vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;](./vessels.__RegExp__.electrical.ac.__RegExp__.md)

**Title:** AC bus

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;/phase](./vessels.__RegExp__.electrical.ac.__RegExp__.phase.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;/phase/(single)|([A-C])](./vessels.__RegExp__.electrical.ac.__RegExp__.phase.(single)|([A-C]).md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/notifications](./vessels.__RegExp__.notifications.md)

**Title:** notifications

**Description:** Notifications currently raised. Major categories have well-defined names, but the tree can be extended by any hierarchical structure

---

### [/vessels/&lt;RegExp&gt;/notifications/mob](./vessels.__RegExp__.notifications.mob.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/mob/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.mob.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/fire](./vessels.__RegExp__.notifications.fire.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/fire/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.fire.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/sinking](./vessels.__RegExp__.notifications.sinking.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/sinking/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.sinking.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/flooding](./vessels.__RegExp__.notifications.flooding.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/flooding/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.flooding.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/collision](./vessels.__RegExp__.notifications.collision.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/collision/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.collision.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/grounding](./vessels.__RegExp__.notifications.grounding.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/grounding/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.grounding.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/listing](./vessels.__RegExp__.notifications.listing.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/listing/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.listing.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/adrift](./vessels.__RegExp__.notifications.adrift.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/adrift/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.adrift.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/piracy](./vessels.__RegExp__.notifications.piracy.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/piracy/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.piracy.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/abandon](./vessels.__RegExp__.notifications.abandon.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/abandon/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.abandon.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.__RegExp__.md)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/&lt;RegExp&gt;/&lt;RegExp&gt;](./vessels.__RegExp__.notifications.__RegExp__.__RegExp__.md)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/steering](./vessels.__RegExp__.steering.md)

**Title:** steering

**Description:** Schema describing the steering child-object of a vessel.

---

### [/vessels/&lt;RegExp&gt;/steering/rudderAngle](./vessels.__RegExp__.steering.rudderAngle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/rudderAngleTarget](./vessels.__RegExp__.steering.rudderAngleTarget.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot](./vessels.__RegExp__.steering.autopilot.md)

**Title:** autopilot

**Description:** Autopilot data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state](./vessels.__RegExp__.steering.autopilot.state.md)

**Description:** Autopilot state

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source](./vessels.__RegExp__.steering.autopilot.state.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/label](./vessels.__RegExp__.steering.autopilot.state.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/type](./vessels.__RegExp__.steering.autopilot.state.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/src](./vessels.__RegExp__.steering.autopilot.state.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/talker](./vessels.__RegExp__.steering.autopilot.state.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode](./vessels.__RegExp__.steering.autopilot.mode.md)

**Description:** Operational mode

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source](./vessels.__RegExp__.steering.autopilot.mode.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/label](./vessels.__RegExp__.steering.autopilot.mode.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/type](./vessels.__RegExp__.steering.autopilot.mode.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/src](./vessels.__RegExp__.steering.autopilot.mode.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/talker](./vessels.__RegExp__.steering.autopilot.mode.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/targetHeadingNorth](./vessels.__RegExp__.steering.autopilot.targetHeadingNorth.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/targetHeadingMagnetic](./vessels.__RegExp__.steering.autopilot.targetHeadingMagnetic.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource](./vessels.__RegExp__.steering.autopilot.headingSource.md)

**Description:** Current source of heading information

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source](./vessels.__RegExp__.steering.autopilot.headingSource.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/label](./vessels.__RegExp__.steering.autopilot.headingSource.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/type](./vessels.__RegExp__.steering.autopilot.headingSource.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/src](./vessels.__RegExp__.steering.autopilot.headingSource.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/talker](./vessels.__RegExp__.steering.autopilot.headingSource.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/deadZone](./vessels.__RegExp__.steering.autopilot.deadZone.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/backlash](./vessels.__RegExp__.steering.autopilot.backlash.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/gain](./vessels.__RegExp__.steering.autopilot.gain.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/maxDriveCurrent](./vessels.__RegExp__.steering.autopilot.maxDriveCurrent.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/maxDriveRate](./vessels.__RegExp__.steering.autopilot.maxDriveRate.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/portLock](./vessels.__RegExp__.steering.autopilot.portLock.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/starboardLock](./vessels.__RegExp__.steering.autopilot.starboardLock.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks](./vessels.__RegExp__.tanks.md)

**Description:** A tank, named by a unique identifier

---

### [/vessels/&lt;RegExp&gt;/tanks/freshWater](./vessels.__RegExp__.tanks.freshWater.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/wasteWater](./vessels.__RegExp__.tanks.wasteWater.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/blackWater](./vessels.__RegExp__.tanks.blackWater.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/fuelWater](./vessels.__RegExp__.tanks.fuelWater.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/fuel](./vessels.__RegExp__.tanks.fuel.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/lubrication](./vessels.__RegExp__.tanks.lubrication.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/liveWell](./vessels.__RegExp__.tanks.liveWell.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design](./vessels.__RegExp__.design.md)

**Title:** design

**Description:** An object describing the vessels primary dimensions and statistics.

---

### [/vessels/&lt;RegExp&gt;/design/displacement](./vessels.__RegExp__.design.displacement.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/draft](./vessels.__RegExp__.design.draft.md)

**Title:** draft

**Description:** The draft of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/draft/source](./vessels.__RegExp__.design.draft.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/label](./vessels.__RegExp__.design.draft.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/type](./vessels.__RegExp__.design.draft.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/src](./vessels.__RegExp__.design.draft.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/talker](./vessels.__RegExp__.design.draft.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/design/draft/minimum](./vessels.__RegExp__.design.draft.minimum.md)

**Units:** m

**Description:** The minimum draft of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/draft/maximum](./vessels.__RegExp__.design.draft.maximum.md)

**Units:** m

**Description:** The maximum draft of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/draft/canoe](./vessels.__RegExp__.design.draft.canoe.md)

**Units:** m

**Description:** The draft of the vessel without protrusions such as keel, centerboard, rudder

---

### [/vessels/&lt;RegExp&gt;/design/length](./vessels.__RegExp__.design.length.md)

**Title:** length

**Description:** The various lengths of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/length/source](./vessels.__RegExp__.design.length.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/length/source/label](./vessels.__RegExp__.design.length.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/length/source/type](./vessels.__RegExp__.design.length.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/length/source/src](./vessels.__RegExp__.design.length.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/length/source/talker](./vessels.__RegExp__.design.length.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/design/length/overall](./vessels.__RegExp__.design.length.overall.md)

**Units:** m

**Description:** Length overall

---

### [/vessels/&lt;RegExp&gt;/design/length/hull](./vessels.__RegExp__.design.length.hull.md)

**Units:** m

**Description:** Length of hull

---

### [/vessels/&lt;RegExp&gt;/design/length/waterline](./vessels.__RegExp__.design.length.waterline.md)

**Units:** m

**Description:** Length at waterline

---

### [/vessels/&lt;RegExp&gt;/design/keel](./vessels.__RegExp__.design.keel.md)

**Title:** keel

**Description:** Information about the vessel's keel

---

### [/vessels/&lt;RegExp&gt;/design/keel/type](./vessels.__RegExp__.design.keel.type.md)

**Description:** The type of keel.

---

### [/vessels/&lt;RegExp&gt;/design/keel/angle](./vessels.__RegExp__.design.keel.angle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/keel/lift](./vessels.__RegExp__.design.keel.lift.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/keel/source](./vessels.__RegExp__.design.keel.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/label](./vessels.__RegExp__.design.keel.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/type](./vessels.__RegExp__.design.keel.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/src](./vessels.__RegExp__.design.keel.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/talker](./vessels.__RegExp__.design.keel.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/design/beam](./vessels.__RegExp__.design.beam.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/airHeight](./vessels.__RegExp__.design.airHeight.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/rigging](./vessels.__RegExp__.design.rigging.md)

**Title:** rigging

**Description:** Information about the vessel's rigging

---

### [/vessels/&lt;RegExp&gt;/design/rigging/configuration](./vessels.__RegExp__.design.rigging.configuration.md)

**Description:** The configuration of the rigging

---

### [/vessels/&lt;RegExp&gt;/design/rigging/masts](./vessels.__RegExp__.design.rigging.masts.md)

**Description:** The number of masts on the vessel.

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source](./vessels.__RegExp__.design.rigging.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/label](./vessels.__RegExp__.design.rigging.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/type](./vessels.__RegExp__.design.rigging.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/src](./vessels.__RegExp__.design.rigging.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/talker](./vessels.__RegExp__.design.rigging.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/sails](./vessels.__RegExp__.sails.md)

**Title:** sails

**Description:** An object describing the vessels sails if the vessel is a sailboat.

---

### [/vessels/&lt;RegExp&gt;/sails/inventory](./vessels.__RegExp__.sails.inventory.md)

**Description:** An object containing a description of each sail available to the vessel crew

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;](./vessels.__RegExp__.sails.inventory.__RegExp__.md)

**Description:** 'sail' data type.

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/name](./vessels.__RegExp__.sails.inventory.__RegExp__.name.md)

**Description:** An unique identifier by which the crew identifies a sail

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/type](./vessels.__RegExp__.sails.inventory.__RegExp__.type.md)

**Description:** The type of sail

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/material](./vessels.__RegExp__.sails.inventory.__RegExp__.material.md)

**Description:** The material the sail is made from (optional)

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/brand](./vessels.__RegExp__.sails.inventory.__RegExp__.brand.md)

**Description:** The brand of the sail (optional)

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/active](./vessels.__RegExp__.sails.inventory.__RegExp__.active.md)

**Description:** Indicates wether this sail is currently in use or not

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/area](./vessels.__RegExp__.sails.inventory.__RegExp__.area.md)

**Units:** m2

**Description:** The total area of this sail in square meters

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/minimumWind](./vessels.__RegExp__.sails.inventory.__RegExp__.minimumWind.md)

**Units:** m/s

**Description:** The minimum wind speed this sail can be used with

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/maximumWind](./vessels.__RegExp__.sails.inventory.__RegExp__.maximumWind.md)

**Units:** m/s

**Description:** The maximum wind speed this sail can be used with

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source](./vessels.__RegExp__.sails.inventory.__RegExp__.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/label](./vessels.__RegExp__.sails.inventory.__RegExp__.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/type](./vessels.__RegExp__.sails.inventory.__RegExp__.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/src](./vessels.__RegExp__.sails.inventory.__RegExp__.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/talker](./vessels.__RegExp__.sails.inventory.__RegExp__.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/sails/area](./vessels.__RegExp__.sails.area.md)

**Description:** An object containing information about the vessels' sails.

---

### [/vessels/&lt;RegExp&gt;/sails/area/total](./vessels.__RegExp__.sails.area.total.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/sails/area/active](./vessels.__RegExp__.sails.area.active.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/sensors](./vessels.__RegExp__.sensors.md)

**Title:** sensors

**Description:** Sensors, their state, and data.

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;](./vessels.__RegExp__.sensors.__RegExp__.md)

**Title:** sensor

**Description:** An object describing an individual sensor. It should be an object in vessel, named using a unique name or UUID

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/name](./vessels.__RegExp__.sensors.__RegExp__.name.md)

**Description:** The common name of the sensor

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/sensorType](./vessels.__RegExp__.sensors.__RegExp__.sensorType.md)

**Description:** The datamodel definition of the sensor data. FIXME - need to create a definitions lib of sensor datamodel types

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/sensorData](./vessels.__RegExp__.sensors.__RegExp__.sensorData.md)

**Description:** The data of the sensor data. FIXME - need to ref the definitions of sensor types

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/fromBow](./vessels.__RegExp__.sensors.__RegExp__.fromBow.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/fromCenter](./vessels.__RegExp__.sensors.__RegExp__.fromCenter.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance](./vessels.__RegExp__.performance.md)

**Title:** performance

**Description:** Schema describing the performance child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/performance/polarSpeed](./vessels.__RegExp__.performance.polarSpeed.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/polarSpeedRatio](./vessels.__RegExp__.performance.polarSpeedRatio.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/velocityMadeGood](./vessels.__RegExp__.performance.velocityMadeGood.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/velocityMadeGoodToWaypoint](./vessels.__RegExp__.performance.velocityMadeGoodToWaypoint.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/beatAngle](./vessels.__RegExp__.performance.beatAngle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/beatAngleVelocityMadeGood](./vessels.__RegExp__.performance.beatAngleVelocityMadeGood.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/beatAngleTargetSpeed](./vessels.__RegExp__.performance.beatAngleTargetSpeed.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/gybeAngle](./vessels.__RegExp__.performance.gybeAngle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/gybeAngleVelocityMadeGood](./vessels.__RegExp__.performance.gybeAngleVelocityMadeGood.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/gybeAngleTargetSpeed](./vessels.__RegExp__.performance.gybeAngleTargetSpeed.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/targetAngle](./vessels.__RegExp__.performance.targetAngle.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/targetSpeed](./vessels.__RegExp__.performance.targetSpeed.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/leeway](./vessels.__RegExp__.performance.leeway.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/tackMagnetic](./vessels.__RegExp__.performance.tackMagnetic.md)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/tackTrue](./vessels.__RegExp__.performance.tackTrue.md)

**Description:** [missing]

---

### [/sources](./sources.md)

**Title:** sources

**Description:** Metadata about the sources, eg. buses and connected sensors

---

### [/sources/&lt;RegExp&gt;](./sources.__RegExp__.md)

**Description:** [missing]

---

### [/sources/&lt;RegExp&gt;/label](./sources.__RegExp__.label.md)

**Description:** Sources unique name e.g. [type-bus].[id], N2000-01.034

---

### [/sources/&lt;RegExp&gt;/type](./sources.__RegExp__.type.md)

**Description:** Type of interface i.e. signalk, NMEA0183 or NMEA2000

---

### [/sources/&lt;RegExp&gt;/manufacturer](./sources.__RegExp__.manufacturer.md)

**Description:** Manufacturer of the source device

---

### [/sources/&lt;RegExp&gt;/productFunction](./sources.__RegExp__.productFunction.md)

**Description:** NMEA2000 Product Function Code

---

### [/sources/&lt;RegExp&gt;/productClass](./sources.__RegExp__.productClass.md)

**Description:** NMEA2000 Product Class Code

---

### [/sources/&lt;RegExp&gt;/productCode](./sources.__RegExp__.productCode.md)

**Description:** NMEA2000 Product Code

---

### [/sources/&lt;RegExp&gt;/productName](./sources.__RegExp__.productName.md)

**Description:** Product Name or Model Number

---

### [/sources/&lt;RegExp&gt;/softwareVersion](./sources.__RegExp__.softwareVersion.md)

**Description:** Version of the device's Software/Firmware

---

### [/sources/&lt;RegExp&gt;/hardwareVersion](./sources.__RegExp__.hardwareVersion.md)

**Description:** Version of the device's Hardware

---

### [/sources/&lt;RegExp&gt;/serialNo](./sources.__RegExp__.serialNo.md)

**Description:** Device's Serial Number

---

### [/sources/&lt;RegExp&gt;/installationNote1](./sources.__RegExp__.installationNote1.md)

**Description:** Product Installation Note 1 i.e. 'Wired on Navigation Switch/Circuit'

---

### [/sources/&lt;RegExp&gt;/installationNote2](./sources.__RegExp__.installationNote2.md)

**Description:** Product Installation Note 2 i.e. 'Located under forward bunk'

---

### [/sources/&lt;RegExp&gt;/manufacturerInfo](./sources.__RegExp__.manufacturerInfo.md)

**Description:** Manufacturer's Info i.e. 'http://digitalyachtamerica.com Tel:+44 1179 554474'

---

### [/sources/&lt;RegExp&gt;/&lt;RegExp&gt;](./sources.__RegExp__.__RegExp__.md)

**Description:** [missing]

---

### [/resources](./resources.md)

**Title:** resources

**Description:** Resources to aid in navigation and operation of the vessel

---

### [/resources/charts](./resources.charts.md)

**Title:** chart

**Description:** A holder for charts, each named with their chart code

---

### [/resources/charts/&lt;RegExp&gt;](./resources.charts.__RegExp__.md)

**Description:** A chart

---

### [/resources/charts/&lt;RegExp&gt;/name](./resources.charts.__RegExp__.name.md)

**Description:** Chart common name

---

### [/resources/charts/&lt;RegExp&gt;/identifier](./resources.charts.__RegExp__.identifier.md)

**Description:** Chart number

---

### [/resources/charts/&lt;RegExp&gt;/description](./resources.charts.__RegExp__.description.md)

**Description:** A description of the chart

---

### [/resources/charts/&lt;RegExp&gt;/tilemapUrl](./resources.charts.__RegExp__.tilemapUrl.md)

**Description:** A url to the tilemap of the chart for use in TMS chartplotting apps

---

### [/resources/charts/&lt;RegExp&gt;/region](./resources.charts.__RegExp__.region.md)

**Description:** Region related to note. A pointer to a region UUID. Alternative to geohash

---

### [/resources/charts/&lt;RegExp&gt;/geohash](./resources.charts.__RegExp__.geohash.md)

**Description:** A geohash (see http://geohash.org)

---

### [/resources/charts/&lt;RegExp&gt;/chartUrl](./resources.charts.__RegExp__.chartUrl.md)

**Description:** A url to the chart file's storage location

---

### [/resources/charts/&lt;RegExp&gt;/scale](./resources.charts.__RegExp__.scale.md)

**Description:** The scale of the chart, the larger number from 1:200000

---

### [/resources/charts/&lt;RegExp&gt;/chartFormat](./resources.charts.__RegExp__.chartFormat.md)

**Description:** The format of the chart

---

### [/resources/charts/&lt;RegExp&gt;/source](./resources.charts.__RegExp__.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/charts/&lt;RegExp&gt;/source/label](./resources.charts.__RegExp__.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/charts/&lt;RegExp&gt;/source/type](./resources.charts.__RegExp__.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/charts/&lt;RegExp&gt;/source/src](./resources.charts.__RegExp__.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/charts/&lt;RegExp&gt;/source/talker](./resources.charts.__RegExp__.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/routes](./resources.routes.md)

**Title:** route

**Description:** A holder for routes, each named with a UUID

---

### [/resources/routes/&lt;RegExp&gt;](./resources.routes.__RegExp__.md)

**Description:** A route, named with a UUID

---

### [/resources/routes/&lt;RegExp&gt;/name](./resources.routes.__RegExp__.name.md)

**Description:** Route's common name

---

### [/resources/routes/&lt;RegExp&gt;/description](./resources.routes.__RegExp__.description.md)

**Description:** A description of the route

---

### [/resources/routes/&lt;RegExp&gt;/distance](./resources.routes.__RegExp__.distance.md)

**Units:** m

**Description:** Total distance from start to end

---

### [/resources/routes/&lt;RegExp&gt;/start](./resources.routes.__RegExp__.start.md)

**Description:** The waypoint UUID at the start of the route

---

### [/resources/routes/&lt;RegExp&gt;/end](./resources.routes.__RegExp__.end.md)

**Description:** The waypoint UUID at the end of the route

---

### [/resources/routes/&lt;RegExp&gt;/feature](./resources.routes.__RegExp__.feature.md)

**Title:** Feature

**Description:** A Geo JSON feature object which describes the route between the waypoints

---

### [/resources/routes/&lt;RegExp&gt;/feature/type](./resources.routes.__RegExp__.feature.type.md)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/geometry](./resources.routes.__RegExp__.feature.geometry.md)

**Title:** LineString

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/geometry/type](./resources.routes.__RegExp__.feature.geometry.type.md)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/geometry/coordinates](./resources.routes.__RegExp__.feature.geometry.coordinates.md)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/properties](./resources.routes.__RegExp__.feature.properties.md)

**Description:** Additional data of any type

---

### [/resources/routes/&lt;RegExp&gt;/feature/id](./resources.routes.__RegExp__.feature.id.md)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/source](./resources.routes.__RegExp__.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/routes/&lt;RegExp&gt;/source/label](./resources.routes.__RegExp__.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/routes/&lt;RegExp&gt;/source/type](./resources.routes.__RegExp__.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/routes/&lt;RegExp&gt;/source/src](./resources.routes.__RegExp__.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/routes/&lt;RegExp&gt;/source/talker](./resources.routes.__RegExp__.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/notes](./resources.notes.md)

**Title:** notes

**Description:** A holder for notes about regions, each named with a UUID. Notes might include navigation or cruising info, images, or anything

---

### [/resources/notes/&lt;RegExp&gt;](./resources.notes.__RegExp__.md)

**Description:** A note about a region, named with a UUID. Notes might include navigation or cruising info, images, or anything

---

### [/resources/notes/&lt;RegExp&gt;/title](./resources.notes.__RegExp__.title.md)

**Description:** Note's common name

---

### [/resources/notes/&lt;RegExp&gt;/description](./resources.notes.__RegExp__.description.md)

**Description:** A textual description of the note

---

### [/resources/notes/&lt;RegExp&gt;/region](./resources.notes.__RegExp__.region.md)

**Description:** Region related to note. A pointer to a region UUID. Alternative to position or geohash

---

### [/resources/notes/&lt;RegExp&gt;/position](./resources.notes.__RegExp__.position.md)

**Description:** [missing]

---

### [/resources/notes/&lt;RegExp&gt;/position/longitude](./resources.notes.__RegExp__.position.longitude.md)

**Units:** deg

**Description:** Longitude

---

### [/resources/notes/&lt;RegExp&gt;/position/latitude](./resources.notes.__RegExp__.position.latitude.md)

**Units:** deg

**Description:** Latitude

---

### [/resources/notes/&lt;RegExp&gt;/position/altitude](./resources.notes.__RegExp__.position.altitude.md)

**Units:** m

**Description:** Altitude

---

### [/resources/notes/&lt;RegExp&gt;/geohash](./resources.notes.__RegExp__.geohash.md)

**Description:** A geohash (see http://geohash.org)

---

### [/resources/notes/&lt;RegExp&gt;/mimeType](./resources.notes.__RegExp__.mimeType.md)

**Description:** MIME type of the note

---

### [/resources/notes/&lt;RegExp&gt;/url](./resources.notes.__RegExp__.url.md)

**Description:** Location of the note

---

### [/resources/notes/&lt;RegExp&gt;/source](./resources.notes.__RegExp__.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/notes/&lt;RegExp&gt;/source/label](./resources.notes.__RegExp__.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/notes/&lt;RegExp&gt;/source/type](./resources.notes.__RegExp__.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/notes/&lt;RegExp&gt;/source/src](./resources.notes.__RegExp__.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/notes/&lt;RegExp&gt;/source/talker](./resources.notes.__RegExp__.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/regions](./resources.regions.md)

**Title:** region

**Description:** A holder for regions, each named with UUID

---

### [/resources/regions/&lt;RegExp&gt;](./resources.regions.__RegExp__.md)

**Description:** A region of interest, each named with a UUID

---

### [/resources/regions/&lt;RegExp&gt;/geohash](./resources.regions.__RegExp__.geohash.md)

**Description:** geohash of the approximate boundary of this region

---

### [/resources/regions/&lt;RegExp&gt;/feature](./resources.regions.__RegExp__.feature.md)

**Title:** Feature

**Description:** A Geo JSON feature object which describes the regions boundary

---

### [/resources/regions/&lt;RegExp&gt;/feature/type](./resources.regions.__RegExp__.feature.type.md)

**Description:** [missing]

---

### [/resources/regions/&lt;RegExp&gt;/feature/geometry](./resources.regions.__RegExp__.feature.geometry.md)

**Description:** [missing]

---

### [/resources/regions/&lt;RegExp&gt;/feature/properties](./resources.regions.__RegExp__.feature.properties.md)

**Description:** Additional data of any type

---

### [/resources/regions/&lt;RegExp&gt;/feature/id](./resources.regions.__RegExp__.feature.id.md)

**Description:** [missing]

---

### [/resources/regions/&lt;RegExp&gt;/source](./resources.regions.__RegExp__.source.md)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/regions/&lt;RegExp&gt;/source/label](./resources.regions.__RegExp__.source.label.md)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/regions/&lt;RegExp&gt;/source/type](./resources.regions.__RegExp__.source.type.md)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/regions/&lt;RegExp&gt;/source/src](./resources.regions.__RegExp__.source.src.md)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/regions/&lt;RegExp&gt;/source/talker](./resources.regions.__RegExp__.source.talker.md)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/waypoints](./resources.waypoints.md)

**Title:** waypoints

**Description:** A holder for waypoints, each named with a UUID

---

### [/resources/waypoints/&lt;RegExp&gt;](./resources.waypoints.__RegExp__.md)

**Description:** A waypoint, an object with a signal k position object, and GeoJSON Feature object (see geojson.org, and https://github.com/fge/sample-json-schemas/tree/master/geojson)

---

### [/resources/waypoints/&lt;RegExp&gt;/position](./resources.waypoints.__RegExp__.position.md)

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/position/longitude](./resources.waypoints.__RegExp__.position.longitude.md)

**Units:** deg

**Description:** Longitude

---

### [/resources/waypoints/&lt;RegExp&gt;/position/latitude](./resources.waypoints.__RegExp__.position.latitude.md)

**Units:** deg

**Description:** Latitude

---

### [/resources/waypoints/&lt;RegExp&gt;/position/altitude](./resources.waypoints.__RegExp__.position.altitude.md)

**Units:** m

**Description:** Altitude

---

### [/resources/waypoints/&lt;RegExp&gt;/feature](./resources.waypoints.__RegExp__.feature.md)

**Title:** Feature

**Description:** A Geo JSON feature object

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/type](./resources.waypoints.__RegExp__.feature.type.md)

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/geometry](./resources.waypoints.__RegExp__.feature.geometry.md)

**Title:** Point

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/geometry/type](./resources.waypoints.__RegExp__.feature.geometry.type.md)

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/geometry/coordinates](./resources.waypoints.__RegExp__.feature.geometry.coordinates.md)

**Description:** A single position, in x,y order (Lon, Lat)

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/properties](./resources.waypoints.__RegExp__.feature.properties.md)

**Description:** Additional data of any type

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/id](./resources.waypoints.__RegExp__.feature.id.md)

**Description:** [missing]

---

### [/version](./version.md)

**Description:** Version of the Signal K schema/APIs used by the root object.

---


# Signal K Data Model Reference

This document is meant as the human-oriented reference to accompany the actual JSON Schema specification and is produced from the schema files. Any changes to the reference material below should be made to the original schema files.

### [/self](http://signalk.org/specification/master/keys/html/self.html)

**Description:** This holds the key (UUID, MMSI or URL) of this vessel, the actual data is in the vessels array.

---

### [/vessels](http://signalk.org/specification/master/keys/html/vessels.html)

**Description:** A wrapper object for vessel objects, each describing vessels in range, including this vessel.

---

### [/vessels/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.html)

**Title:** vessel

**Description:** An object describing an individual vessel. It should be an object in vessels, named using MMSI or a UUID

---

### [/vessels/&lt;RegExp&gt;/url](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.url.html)

**Description:** A location of a resource, potentially relative. For hierarchical schemes (like http), applications must resolve relative URIs (e.g. './v1/api/'). Implementations should support the following schemes: http:, https:, mailto:, tel:, and ws:.

---

### [/vessels/&lt;RegExp&gt;/mmsi](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.mmsi.html)

**Description:** Maritime Mobile Service Identity (MMSI). Has to be 9 digits. See http://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity for information.

---

### [/vessels/&lt;RegExp&gt;/uuid](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.uuid.html)

**Description:** A unique Signal K flavoured maritime resource identifier (MRN). A MRN is a form of URN, following a specific format: urn:mrn:<issueing authority>:<id type>:<id>. In case of a Signal K uuid, that looks like this: urn:mrn:signalk:uuid:<uuid>, where Signal K is the issuing authority and UUID (v4) the ID type.

---

### [/vessels/&lt;RegExp&gt;/name](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.name.html)

**Description:** The common name of the vessel

---

### [/vessels/&lt;RegExp&gt;/flag](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.flag.html)

**Description:** The country of ship registration, or flag state of the vessel

---

### [/vessels/&lt;RegExp&gt;/port](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.port.html)

**Description:** The home port of the vessel

---

### [/vessels/&lt;RegExp&gt;/registrations](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.html)

**Description:** The various registrations of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/imo](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.imo.html)

**Description:** The IMO number of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/national](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.national.html)

**Description:** The national registration number of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.national.__RegExp__.html)

**Description:** This regex pattern is used for validating the identifier for the registration

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/country](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.national.__RegExp__.country.html)

**Description:** The ISO 3166-2 country code.

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/registration](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.national.__RegExp__.registration.html)

**Description:** The registration code

---

### [/vessels/&lt;RegExp&gt;/registrations/national/&lt;RegExp&gt;/description](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.national.__RegExp__.description.html)

**Description:** The registration description

---

### [/vessels/&lt;RegExp&gt;/registrations/local](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.local.html)

**Description:** A local or state registration number of the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.local.__RegExp__.html)

**Description:** This regex pattern is used for validating the identifier for the registration

---

### [/vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;/registration](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.local.__RegExp__.registration.html)

**Description:** The registration code

---

### [/vessels/&lt;RegExp&gt;/registrations/local/&lt;RegExp&gt;/description](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.local.__RegExp__.description.html)

**Description:** The registration description

---

### [/vessels/&lt;RegExp&gt;/registrations/other](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.other.html)

**Description:** Other registration or permits for the vessel.

---

### [/vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.other.__RegExp__.html)

**Description:** This regex pattern is used for validating the identifier for the registration

---

### [/vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;/registration](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.other.__RegExp__.registration.html)

**Description:** The registration code

---

### [/vessels/&lt;RegExp&gt;/registrations/other/&lt;RegExp&gt;/description](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.registrations.other.__RegExp__.description.html)

**Description:** The registration description

---

### [/vessels/&lt;RegExp&gt;/communication](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.html)

**Title:** communication

**Description:** Schema describing the communication child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/communication/callsignVhf](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.callsignVhf.html)

**Description:** Callsign for VHF communication

---

### [/vessels/&lt;RegExp&gt;/communication/callsignHf](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.callsignHf.html)

**Description:** Callsign for HF communication

---

### [/vessels/&lt;RegExp&gt;/communication/phoneNumber](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.phoneNumber.html)

**Description:** Phone number of skipper

---

### [/vessels/&lt;RegExp&gt;/communication/emailHf](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.emailHf.html)

**Description:** Email address to be used for HF email (Winmail, Airmail, Sailmail)

---

### [/vessels/&lt;RegExp&gt;/communication/email](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.email.html)

**Description:** Regular email for the skipper

---

### [/vessels/&lt;RegExp&gt;/communication/satPhoneNumber](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.satPhoneNumber.html)

**Description:** Satellite phone number for vessel.

---

### [/vessels/&lt;RegExp&gt;/communication/skipperName](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.skipperName.html)

**Description:** Full name of the skipper of the vessel.

---

### [/vessels/&lt;RegExp&gt;/communication/crewNames](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.communication.crewNames.html)

**Description:** Array with the names of the crew

---

### [/vessels/&lt;RegExp&gt;/environment](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.html)

**Title:** environment

**Description:** Schema describing the environmental child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/environment/outside](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/temperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.temperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/dewPointTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.dewPointTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/apparentWindChillTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.apparentWindChillTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/theoreticalWindChillTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.theoreticalWindChillTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/heatIndexTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.heatIndexTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/pressure](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.pressure.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/outside/humidity](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.outside.humidity.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/temperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.temperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/humidity](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.humidity.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/engineRoom](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.engineRoom.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/mainCabin](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.mainCabin.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/refrigerator](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.refrigerator.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/freezer](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.freezer.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/inside/heating](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.inside.heating.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.water.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/temperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.water.temperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/salinity](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.water.salinity.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/liveWell](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.water.liveWell.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/water/baitWell](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.water.baitWell.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.depth.html)

**Title:** depth

**Description:** Depth related data

---

### [/vessels/&lt;RegExp&gt;/environment/depth/belowKeel](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.depth.belowKeel.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/belowTransducer](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.depth.belowTransducer.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/belowSurface](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.depth.belowSurface.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/transducerToKeel](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.depth.transducerToKeel.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/depth/surfaceToTransducer](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.depth.surfaceToTransducer.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/current](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.current.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/current/drift](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.current.drift.html)

**Units:** m/s

**Description:** The speed component of the water current vector

---

### [/vessels/&lt;RegExp&gt;/environment/current/setTrue](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.current.setTrue.html)

**Units:** rad

**Description:** The direction component of the water current vector referenced to true (geographic) north

---

### [/vessels/&lt;RegExp&gt;/environment/current/setMagnetic](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.current.setMagnetic.html)

**Units:** rad

**Description:** The direction component of the water current vector referenced to magnetic north

---

### [/vessels/&lt;RegExp&gt;/environment/tide](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.tide.html)

**Title:** tide

**Description:** Tide data

---

### [/vessels/&lt;RegExp&gt;/environment/tide/heightHigh](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.tide.heightHigh.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/tide/heightNow](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.tide.heightNow.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/tide/heightLow](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.tide.heightLow.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/tide/timeLow](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.tide.timeLow.html)

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

### [/vessels/&lt;RegExp&gt;/environment/tide/timeHigh](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.tide.timeHigh.html)

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

### [/vessels/&lt;RegExp&gt;/environment/heave](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.heave.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.html)

**Title:** wind

**Description:** Wind data.

---

### [/vessels/&lt;RegExp&gt;/environment/wind/angleApparent](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.angleApparent.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/angleTrueGround](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.angleTrueGround.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/angleTrueWater](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.angleTrueWater.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/directionChangeAlarm](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.directionChangeAlarm.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/directionTrue](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.directionTrue.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/directionMagnetic](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.directionMagnetic.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/speedTrue](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.speedTrue.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/speedOverGround](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.speedOverGround.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/wind/speedApparent](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.wind.speedApparent.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/environment/time](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.html)

**Description:** A time reference onboard.

---

### [/vessels/&lt;RegExp&gt;/environment/time/millis](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.millis.html)

**Title:** Epoch time

**Description:** Milliseconds since the UNIX epoch (1970-01-01 00:00:00)

---

### [/vessels/&lt;RegExp&gt;/environment/time/timezone](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.timezone.html)

**Title:** Timezone offset

**Description:** Timezone offset in hours and minutes (-)hhmm

---

### [/vessels/&lt;RegExp&gt;/environment/time/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/environment/time/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.time.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/environment/mode](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.mode.html)

**Description:** Mode of the vessel based on the current conditions. Can be combined with navigation.state to control vessel signals eg switch to night mode for instrumentation and lights, or make sound signals for fog.

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.mode.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.mode.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.mode.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.mode.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/environment/mode/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.environment.mode.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.html)

**Title:** navigation

**Description:** Schema describing the navigation child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/navigation/lights](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.lights.html)

**Title:** Navigation lights

**Description:** Current state of the vessels navigation lights

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.lights.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.lights.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.lights.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.lights.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/lights/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.lights.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/courseOverGroundMagnetic](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.courseOverGroundMagnetic.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/courseOverGroundTrue](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.courseOverGroundTrue.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/courseRhumbline](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.courseRhumbline.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/courseGreatCircle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.courseGreatCircle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/startLineStb](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.startLineStb.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/startLinePort](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.startLinePort.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/distanceStartline](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.distanceStartline.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timeToStart](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.timeToStart.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timePortDown](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.timePortDown.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timePortUp](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.timePortUp.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timeStbdDown](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.timeStbdDown.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/timeStbdUp](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.timeStbdUp.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/racing/distanceLayline](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.racing.distanceLayline.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/magneticVariation](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.magneticVariation.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/magneticVariationAgeOfService](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.magneticVariationAgeOfService.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/destination](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.html)

**Title:** destination

**Description:** The intended destination of this trip

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/eta](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.eta.html)

**Units:** ISO-8601 (UTC)

**Description:** ISO-8601 (UTC) string representing date and time.

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/destination/waypoint](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.destination.waypoint.html)

**Description:** UUID of destination waypoint

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.html)

**Title:** gnss

**Description:** Global satellite navigation meta information

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/methodQuality](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.methodQuality.html)

**Description:** Quality of the satellite fix

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/integrity](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.integrity.html)

**Description:** Integrity of the satellite fix

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/satellites](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.satellites.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/antennaAltitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.antennaAltitude.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/horizontalDilution](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.horizontalDilution.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/positionDilution](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.positionDilution.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/geoidalSeparation](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.geoidalSeparation.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/differentialAge](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.differentialAge.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/gnss/differentialReference](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.gnss.differentialReference.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/headingMagnetic](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.headingMagnetic.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/headingTrue](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.headingTrue.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/position](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.position.html)

**Title:** position

**Description:** The position in 3 dimensions

---

### [/vessels/&lt;RegExp&gt;/navigation/position/longitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.position.longitude.html)

**Units:** deg

**Description:** Longitude

---

### [/vessels/&lt;RegExp&gt;/navigation/position/latitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.position.latitude.html)

**Units:** deg

**Description:** Latitude

---

### [/vessels/&lt;RegExp&gt;/navigation/position/altitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.position.altitude.html)

**Units:** m

**Description:** Altitude

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.attitude.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude/roll](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.attitude.roll.html)

**Units:** rad

**Description:** Vessel roll, +ve is list to starboard

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude/pitch](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.attitude.pitch.html)

**Units:** rad

**Description:** Pitch, +ve is bow up

---

### [/vessels/&lt;RegExp&gt;/navigation/attitude/yaw](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.attitude.yaw.html)

**Units:** rad

**Description:** Yaw, +ve is heading change to starboard

---

### [/vessels/&lt;RegExp&gt;/navigation/rateOfTurn](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.rateOfTurn.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/speedOverGround](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.speedOverGround.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/speedThroughWater](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.speedThroughWater.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/log](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.log.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/logTrip](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.logTrip.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/state](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.state.html)

**Title:** state

**Description:** Current navigational state of the vessel

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.state.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.state.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.state.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.state.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/state/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.state.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.html)

**Title:** anchor

**Description:** The anchor data, for anchor watch etc

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/maxRadius](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.maxRadius.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/currentRadius](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.currentRadius.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.position.html)

**Title:** position

**Description:** The position in 3 dimensions

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position/longitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.position.longitude.html)

**Units:** deg

**Description:** Longitude

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position/latitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.position.latitude.html)

**Units:** deg

**Description:** Latitude

---

### [/vessels/&lt;RegExp&gt;/navigation/anchor/position/altitude](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.anchor.position.altitude.html)

**Units:** m

**Description:** Altitude

---

### [/vessels/&lt;RegExp&gt;/navigation/datetime](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.datetime.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/navigation/datetime/gnssTimeSource](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.navigation.datetime.gnssTimeSource.html)

**Description:** Source of GNSS Date and Time

---

### [/vessels/&lt;RegExp&gt;/propulsion](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.html)

**Title:** propulsion

**Description:** An engine, named by a unique name within this vessel

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.html)

**Description:** This regex pattern is used for validation of the identifier for the propulsion unit

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.label.html)

**Description:** Human readable label for the propulsion unit

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/state](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.state.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/revolutions](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.revolutions.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/temperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.temperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/oilTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.oilTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/oilPressure](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.oilPressure.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/alternatorVoltage](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.alternatorVoltage.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/runTime](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.runTime.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/coolantTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.coolantTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/coolantPressure](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.coolantPressure.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/boostPressure](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.boostPressure.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/engineLoad](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.engineLoad.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/engineTorque](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.engineTorque.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.transmission.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/gear](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.transmission.gear.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/gearRatio](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.transmission.gearRatio.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/oilTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.transmission.oilTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/transmission/oilPressure](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.transmission.oilPressure.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.drive.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.drive.type.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/trimState](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.drive.trimState.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/thrustAngle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.drive.thrustAngle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/drive/propeller](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.drive.propeller.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.type.html)

**Description:** Fuel type

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/used](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.used.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/pressure](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.pressure.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/rate](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.rate.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/economyRate](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.economyRate.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/fuel/averageRate](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.fuel.averageRate.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/propulsion/&lt;RegExp&gt;/exhaustTemperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.propulsion.__RegExp__.exhaustTemperature.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.html)

**Title:** Electrical Properties

**Description:** Schema describing the electrical child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.html)

**Title:** temperature

**Description:** Additional / unique temperatures associated with a battery

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitDischargeLower](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitDischargeLower.html)

**Units:** K

**Description:** Operational minimum temperature limit for battery discharge, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitDischargeUpper](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitDischargeUpper.html)

**Units:** K

**Description:** Operational maximum temperature limit for battery discharge, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitRechargeLower](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitRechargeLower.html)

**Units:** K

**Description:** Operational minimum temperature limit for battery recharging, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/temperature/limitRechargeUpper](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.temperature.limitRechargeUpper.html)

**Units:** K

**Description:** Operational maximum temperature limit for battery recharging, in degrees Celsius

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.html)

**Title:** capacity

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/nominal](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.nominal.html)

**Units:** J

**Description:** The capacity of battery as specified by the manufacturer

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/actual](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.actual.html)

**Units:** J

**Description:** The measured capacity of battery. This may change over time and will likely deviate from the nominal capacity.

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/remaining](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.remaining.html)

**Units:** J

**Description:** Capacity remaining in battery

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/dischargeLimit](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.dischargeLimit.html)

**Units:** J

**Description:** Minimum capacity to be left in the battery while discharging

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/stateOfCharge](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.stateOfCharge.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/stateOfHealth](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.stateOfHealth.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/dischargeSinceFull](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.dischargeSinceFull.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/capacity/timeRemaining](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.capacity.timeRemaining.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/lifetimeDischarge](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.lifetimeDischarge.html)

**Units:** C

**Description:** Cumulative charge discharged from battery over operational lifetime of battery

---

### [/vessels/&lt;RegExp&gt;/electrical/batteries/&lt;RegExp&gt;/lifetimeRecharge](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.batteries.__RegExp__.lifetimeRecharge.html)

**Units:** C

**Description:** Cumulative charge recharged into battery over operational lifetime of battery

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.inverters.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.inverters.__RegExp__.html)

**Title:** Inverter

**Description:** DC to AC inverter, one or many, within the vessel

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/dc](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.inverters.__RegExp__.dc.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/ac](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.inverters.__RegExp__.ac.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/inverters/&lt;RegExp&gt;/mode](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.inverters.__RegExp__.mode.html)

**Description:** Mode of inverter

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.mode.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/electrical/chargers/&lt;RegExp&gt;/mode/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.chargers.__RegExp__.mode.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/electrical/ac](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.ac.html)

**Description:** AC buses

---

### [/vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.ac.__RegExp__.html)

**Title:** AC bus

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;/phase](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.ac.__RegExp__.phase.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/electrical/ac/&lt;RegExp&gt;/phase/(single)|([A-C])](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.electrical.ac.__RegExp__.phase.(single)|([A-C]).html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/notifications](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.html)

**Title:** notifications

**Description:** Notifications currently raised. Major categories have well-defined names, but the tree can be extended by any hierarchical structure

---

### [/vessels/&lt;RegExp&gt;/notifications/mob](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.mob.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/mob/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.mob.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/fire](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.fire.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/fire/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.fire.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/sinking](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.sinking.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/sinking/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.sinking.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/flooding](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.flooding.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/flooding/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.flooding.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/collision](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.collision.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/collision/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.collision.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/grounding](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.grounding.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/grounding/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.grounding.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/listing](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.listing.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/listing/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.listing.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/adrift](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.adrift.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/adrift/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.adrift.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/piracy](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.piracy.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/piracy/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.piracy.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/abandon](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.abandon.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/abandon/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.abandon.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/notifications/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.__RegExp__.html)

**Title:** notifications

**Description:** Notifications, their state, and actions. The notification limits are set in any Signal K key.meta.zones array.

---

### [/vessels/&lt;RegExp&gt;/notifications/&lt;RegExp&gt;/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.notifications.__RegExp__.__RegExp__.html)

**Description:** Reference to the source under vessel's sources. A dot spearated path to the data. eg [type].[bus].[device]

---

### [/vessels/&lt;RegExp&gt;/steering](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.html)

**Title:** steering

**Description:** Schema describing the steering child-object of a vessel.

---

### [/vessels/&lt;RegExp&gt;/steering/rudderAngle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.rudderAngle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/rudderAngleTarget](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.rudderAngleTarget.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.html)

**Title:** autopilot

**Description:** Autopilot data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.state.html)

**Description:** Autopilot state

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.state.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.state.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.state.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.state.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/state/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.state.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.mode.html)

**Description:** Operational mode

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.mode.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.mode.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.mode.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.mode.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/mode/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.mode.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/targetHeadingNorth](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.targetHeadingNorth.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/targetHeadingMagnetic](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.targetHeadingMagnetic.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.headingSource.html)

**Description:** Current source of heading information

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.headingSource.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.headingSource.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.headingSource.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.headingSource.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/headingSource/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.headingSource.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/deadZone](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.deadZone.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/backlash](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.backlash.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/gain](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.gain.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/maxDriveCurrent](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.maxDriveCurrent.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/maxDriveRate](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.maxDriveRate.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/portLock](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.portLock.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/steering/autopilot/starboardLock](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.steering.autopilot.starboardLock.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.html)

**Description:** A tank, named by a unique identifier

---

### [/vessels/&lt;RegExp&gt;/tanks/freshWater](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.freshWater.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/wasteWater](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.wasteWater.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/blackWater](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.blackWater.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/fuelWater](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.fuelWater.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/fuel](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.fuel.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/lubrication](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.lubrication.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/tanks/liveWell](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.tanks.liveWell.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.html)

**Title:** design

**Description:** An object describing the vessels primary dimensions and statistics.

---

### [/vessels/&lt;RegExp&gt;/design/displacement](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.displacement.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/draft](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.html)

**Title:** draft

**Description:** The draft of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/draft/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/draft/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/design/draft/minimum](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.minimum.html)

**Units:** m

**Description:** The minimum draft of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/draft/maximum](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.maximum.html)

**Units:** m

**Description:** The maximum draft of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/draft/canoe](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.draft.canoe.html)

**Units:** m

**Description:** The draft of the vessel without protrusions such as keel, centerboard, rudder

---

### [/vessels/&lt;RegExp&gt;/design/length](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.html)

**Title:** length

**Description:** The various lengths of the vessel

---

### [/vessels/&lt;RegExp&gt;/design/length/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/length/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/length/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/length/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/length/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/design/length/overall](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.overall.html)

**Units:** m

**Description:** Length overall

---

### [/vessels/&lt;RegExp&gt;/design/length/hull](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.hull.html)

**Units:** m

**Description:** Length of hull

---

### [/vessels/&lt;RegExp&gt;/design/length/waterline](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.length.waterline.html)

**Units:** m

**Description:** Length at waterline

---

### [/vessels/&lt;RegExp&gt;/design/keel](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.html)

**Title:** keel

**Description:** Information about the vessel's keel

---

### [/vessels/&lt;RegExp&gt;/design/keel/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.type.html)

**Description:** The type of keel.

---

### [/vessels/&lt;RegExp&gt;/design/keel/angle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.angle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/keel/lift](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.lift.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/keel/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/keel/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.keel.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/design/beam](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.beam.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/airHeight](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.airHeight.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/design/rigging](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.html)

**Title:** rigging

**Description:** Information about the vessel's rigging

---

### [/vessels/&lt;RegExp&gt;/design/rigging/configuration](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.configuration.html)

**Description:** The configuration of the rigging

---

### [/vessels/&lt;RegExp&gt;/design/rigging/masts](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.masts.html)

**Description:** The number of masts on the vessel.

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/design/rigging/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.design.rigging.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/sails](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.html)

**Title:** sails

**Description:** An object describing the vessels sails if the vessel is a sailboat.

---

### [/vessels/&lt;RegExp&gt;/sails/inventory](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.html)

**Description:** An object containing a description of each sail available to the vessel crew

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.html)

**Description:** 'sail' data type.

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/name](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.name.html)

**Description:** An unique identifier by which the crew identifies a sail

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.type.html)

**Description:** The type of sail

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/material](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.material.html)

**Description:** The material the sail is made from (optional)

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/brand](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.brand.html)

**Description:** The brand of the sail (optional)

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/active](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.active.html)

**Description:** Indicates wether this sail is currently in use or not

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/area](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.area.html)

**Units:** m2

**Description:** The total area of this sail in square meters

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/minimumWind](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.minimumWind.html)

**Units:** m/s

**Description:** The minimum wind speed this sail can be used with

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/maximumWind](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.maximumWind.html)

**Units:** m/s

**Description:** The maximum wind speed this sail can be used with

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/label](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/type](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/src](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/vessels/&lt;RegExp&gt;/sails/inventory/&lt;RegExp&gt;/source/talker](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.inventory.__RegExp__.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/vessels/&lt;RegExp&gt;/sails/area](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.area.html)

**Description:** An object containing information about the vessels' sails.

---

### [/vessels/&lt;RegExp&gt;/sails/area/total](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.area.total.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/sails/area/active](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sails.area.active.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/sensors](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.html)

**Title:** sensors

**Description:** Sensors, their state, and data.

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.__RegExp__.html)

**Title:** sensor

**Description:** An object describing an individual sensor. It should be an object in vessel, named using a unique name or UUID

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/name](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.__RegExp__.name.html)

**Description:** The common name of the sensor

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/sensorType](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.__RegExp__.sensorType.html)

**Description:** The datamodel definition of the sensor data. FIXME - need to create a definitions lib of sensor datamodel types

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/sensorData](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.__RegExp__.sensorData.html)

**Description:** The data of the sensor data. FIXME - need to ref the definitions of sensor types

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/fromBow](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.__RegExp__.fromBow.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/sensors/&lt;RegExp&gt;/fromCenter](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.sensors.__RegExp__.fromCenter.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.html)

**Title:** performance

**Description:** Schema describing the performance child-object of a Vessel.

---

### [/vessels/&lt;RegExp&gt;/performance/polarSpeed](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.polarSpeed.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/polarSpeedRatio](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.polarSpeedRatio.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/velocityMadeGood](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.velocityMadeGood.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/velocityMadeGoodToWaypoint](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.velocityMadeGoodToWaypoint.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/beatAngle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.beatAngle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/beatAngleVelocityMadeGood](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.beatAngleVelocityMadeGood.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/beatAngleTargetSpeed](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.beatAngleTargetSpeed.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/gybeAngle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.gybeAngle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/gybeAngleVelocityMadeGood](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.gybeAngleVelocityMadeGood.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/gybeAngleTargetSpeed](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.gybeAngleTargetSpeed.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/targetAngle](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.targetAngle.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/targetSpeed](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.targetSpeed.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/leeway](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.leeway.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/tackMagnetic](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.tackMagnetic.html)

**Description:** [missing]

---

### [/vessels/&lt;RegExp&gt;/performance/tackTrue](http://signalk.org/specification/master/keys/html/vessels.__RegExp__.performance.tackTrue.html)

**Description:** [missing]

---

### [/sources](http://signalk.org/specification/master/keys/html/sources.html)

**Title:** sources

**Description:** Metadata about the sources, eg. buses and connected sensors

---

### [/sources/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/sources.__RegExp__.html)

**Description:** [missing]

---

### [/sources/&lt;RegExp&gt;/label](http://signalk.org/specification/master/keys/html/sources.__RegExp__.label.html)

**Description:** Sources unique name e.g. [type-bus].[id], N2000-01.034

---

### [/sources/&lt;RegExp&gt;/type](http://signalk.org/specification/master/keys/html/sources.__RegExp__.type.html)

**Description:** Type of interface i.e. signalk, NMEA0183 or NMEA2000

---

### [/sources/&lt;RegExp&gt;/manufacturer](http://signalk.org/specification/master/keys/html/sources.__RegExp__.manufacturer.html)

**Description:** Manufacturer of the source device

---

### [/sources/&lt;RegExp&gt;/productFunction](http://signalk.org/specification/master/keys/html/sources.__RegExp__.productFunction.html)

**Description:** NMEA2000 Product Function Code

---

### [/sources/&lt;RegExp&gt;/productClass](http://signalk.org/specification/master/keys/html/sources.__RegExp__.productClass.html)

**Description:** NMEA2000 Product Class Code

---

### [/sources/&lt;RegExp&gt;/productCode](http://signalk.org/specification/master/keys/html/sources.__RegExp__.productCode.html)

**Description:** NMEA2000 Product Code

---

### [/sources/&lt;RegExp&gt;/productName](http://signalk.org/specification/master/keys/html/sources.__RegExp__.productName.html)

**Description:** Product Name or Model Number

---

### [/sources/&lt;RegExp&gt;/softwareVersion](http://signalk.org/specification/master/keys/html/sources.__RegExp__.softwareVersion.html)

**Description:** Version of the device's Software/Firmware

---

### [/sources/&lt;RegExp&gt;/hardwareVersion](http://signalk.org/specification/master/keys/html/sources.__RegExp__.hardwareVersion.html)

**Description:** Version of the device's Hardware

---

### [/sources/&lt;RegExp&gt;/serialNo](http://signalk.org/specification/master/keys/html/sources.__RegExp__.serialNo.html)

**Description:** Device's Serial Number

---

### [/sources/&lt;RegExp&gt;/installationNote1](http://signalk.org/specification/master/keys/html/sources.__RegExp__.installationNote1.html)

**Description:** Product Installation Note 1 i.e. 'Wired on Navigation Switch/Circuit'

---

### [/sources/&lt;RegExp&gt;/installationNote2](http://signalk.org/specification/master/keys/html/sources.__RegExp__.installationNote2.html)

**Description:** Product Installation Note 2 i.e. 'Located under forward bunk'

---

### [/sources/&lt;RegExp&gt;/manufacturerInfo](http://signalk.org/specification/master/keys/html/sources.__RegExp__.manufacturerInfo.html)

**Description:** Manufacturer's Info i.e. 'http://digitalyachtamerica.com Tel:+44 1179 554474'

---

### [/sources/&lt;RegExp&gt;/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/sources.__RegExp__.__RegExp__.html)

**Description:** [missing]

---

### [/resources](http://signalk.org/specification/master/keys/html/resources.html)

**Title:** resources

**Description:** Resources to aid in navigation and operation of the vessel

---

### [/resources/charts](http://signalk.org/specification/master/keys/html/resources.charts.html)

**Title:** chart

**Description:** A holder for charts, each named with their chart code

---

### [/resources/charts/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.html)

**Description:** A chart

---

### [/resources/charts/&lt;RegExp&gt;/name](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.name.html)

**Description:** Chart common name

---

### [/resources/charts/&lt;RegExp&gt;/identifier](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.identifier.html)

**Description:** Chart number

---

### [/resources/charts/&lt;RegExp&gt;/description](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.description.html)

**Description:** A description of the chart

---

### [/resources/charts/&lt;RegExp&gt;/tilemapUrl](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.tilemapUrl.html)

**Description:** A url to the tilemap of the chart for use in TMS chartplotting apps

---

### [/resources/charts/&lt;RegExp&gt;/region](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.region.html)

**Description:** Region related to note. A pointer to a region UUID. Alternative to geohash

---

### [/resources/charts/&lt;RegExp&gt;/geohash](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.geohash.html)

**Description:** A geohash (see http://geohash.org)

---

### [/resources/charts/&lt;RegExp&gt;/chartUrl](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.chartUrl.html)

**Description:** A url to the chart file's storage location

---

### [/resources/charts/&lt;RegExp&gt;/scale](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.scale.html)

**Description:** The scale of the chart, the larger number from 1:200000

---

### [/resources/charts/&lt;RegExp&gt;/chartFormat](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.chartFormat.html)

**Description:** The format of the chart

---

### [/resources/charts/&lt;RegExp&gt;/source](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/charts/&lt;RegExp&gt;/source/label](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/charts/&lt;RegExp&gt;/source/type](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/charts/&lt;RegExp&gt;/source/src](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/charts/&lt;RegExp&gt;/source/talker](http://signalk.org/specification/master/keys/html/resources.charts.__RegExp__.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/routes](http://signalk.org/specification/master/keys/html/resources.routes.html)

**Title:** route

**Description:** A holder for routes, each named with a UUID

---

### [/resources/routes/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.html)

**Description:** A route, named with a UUID

---

### [/resources/routes/&lt;RegExp&gt;/name](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.name.html)

**Description:** Route's common name

---

### [/resources/routes/&lt;RegExp&gt;/description](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.description.html)

**Description:** A description of the route

---

### [/resources/routes/&lt;RegExp&gt;/distance](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.distance.html)

**Units:** m

**Description:** Total distance from start to end

---

### [/resources/routes/&lt;RegExp&gt;/start](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.start.html)

**Description:** The waypoint UUID at the start of the route

---

### [/resources/routes/&lt;RegExp&gt;/end](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.end.html)

**Description:** The waypoint UUID at the end of the route

---

### [/resources/routes/&lt;RegExp&gt;/feature](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.html)

**Title:** Feature

**Description:** A Geo JSON feature object which describes the route between the waypoints

---

### [/resources/routes/&lt;RegExp&gt;/feature/type](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.type.html)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/geometry](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.geometry.html)

**Title:** LineString

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/geometry/type](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.geometry.type.html)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/geometry/coordinates](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.geometry.coordinates.html)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/feature/properties](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.properties.html)

**Description:** Additional data of any type

---

### [/resources/routes/&lt;RegExp&gt;/feature/id](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.feature.id.html)

**Description:** [missing]

---

### [/resources/routes/&lt;RegExp&gt;/source](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/routes/&lt;RegExp&gt;/source/label](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/routes/&lt;RegExp&gt;/source/type](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/routes/&lt;RegExp&gt;/source/src](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/routes/&lt;RegExp&gt;/source/talker](http://signalk.org/specification/master/keys/html/resources.routes.__RegExp__.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/notes](http://signalk.org/specification/master/keys/html/resources.notes.html)

**Title:** notes

**Description:** A holder for notes about regions, each named with a UUID. Notes might include navigation or cruising info, images, or anything

---

### [/resources/notes/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.html)

**Description:** A note about a region, named with a UUID. Notes might include navigation or cruising info, images, or anything

---

### [/resources/notes/&lt;RegExp&gt;/title](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.title.html)

**Description:** Note's common name

---

### [/resources/notes/&lt;RegExp&gt;/description](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.description.html)

**Description:** A textual description of the note

---

### [/resources/notes/&lt;RegExp&gt;/region](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.region.html)

**Description:** Region related to note. A pointer to a region UUID. Alternative to position or geohash

---

### [/resources/notes/&lt;RegExp&gt;/position](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.position.html)

**Description:** [missing]

---

### [/resources/notes/&lt;RegExp&gt;/position/longitude](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.position.longitude.html)

**Units:** deg

**Description:** Longitude

---

### [/resources/notes/&lt;RegExp&gt;/position/latitude](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.position.latitude.html)

**Units:** deg

**Description:** Latitude

---

### [/resources/notes/&lt;RegExp&gt;/position/altitude](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.position.altitude.html)

**Units:** m

**Description:** Altitude

---

### [/resources/notes/&lt;RegExp&gt;/geohash](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.geohash.html)

**Description:** A geohash (see http://geohash.org)

---

### [/resources/notes/&lt;RegExp&gt;/mimeType](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.mimeType.html)

**Description:** MIME type of the note

---

### [/resources/notes/&lt;RegExp&gt;/url](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.url.html)

**Description:** Location of the note

---

### [/resources/notes/&lt;RegExp&gt;/source](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/notes/&lt;RegExp&gt;/source/label](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/notes/&lt;RegExp&gt;/source/type](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/notes/&lt;RegExp&gt;/source/src](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/notes/&lt;RegExp&gt;/source/talker](http://signalk.org/specification/master/keys/html/resources.notes.__RegExp__.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/regions](http://signalk.org/specification/master/keys/html/resources.regions.html)

**Title:** region

**Description:** A holder for regions, each named with UUID

---

### [/resources/regions/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.html)

**Description:** A region of interest, each named with a UUID

---

### [/resources/regions/&lt;RegExp&gt;/geohash](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.geohash.html)

**Description:** geohash of the approximate boundary of this region

---

### [/resources/regions/&lt;RegExp&gt;/feature](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.feature.html)

**Title:** Feature

**Description:** A Geo JSON feature object which describes the regions boundary

---

### [/resources/regions/&lt;RegExp&gt;/feature/type](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.feature.type.html)

**Description:** [missing]

---

### [/resources/regions/&lt;RegExp&gt;/feature/geometry](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.feature.geometry.html)

**Description:** [missing]

---

### [/resources/regions/&lt;RegExp&gt;/feature/properties](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.feature.properties.html)

**Description:** Additional data of any type

---

### [/resources/regions/&lt;RegExp&gt;/feature/id](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.feature.id.html)

**Description:** [missing]

---

### [/resources/regions/&lt;RegExp&gt;/source](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.source.html)

**Description:** Source of data, a record of where the data was received from. An object containing at least the properties defined in 'properties', but can contain anything beyond that.

---

### [/resources/regions/&lt;RegExp&gt;/source/label](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.source.label.html)

**Description:** A label to identify the source bus, eg serial-COM1, eth-local,etc . Can be anything but should follow a predicatable format

---

### [/resources/regions/&lt;RegExp&gt;/source/type](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.source.type.html)

**Description:** A human name to identify the type. NMEA0183, NMEA2000, signalk

---

### [/resources/regions/&lt;RegExp&gt;/source/src](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.source.src.html)

**Description:** NMEA2000 src value or any similar value for encapsulating the original source of the data

---

### [/resources/regions/&lt;RegExp&gt;/source/talker](http://signalk.org/specification/master/keys/html/resources.regions.__RegExp__.source.talker.html)

**Description:** Talker id of the source NMEA0183 sentence, $[GP]RMC,092750.000,A,5321.6802,N,00630.3372,W,0.02,31.66,280511,,,A*43

---

### [/resources/waypoints](http://signalk.org/specification/master/keys/html/resources.waypoints.html)

**Title:** waypoints

**Description:** A holder for waypoints, each named with a UUID

---

### [/resources/waypoints/&lt;RegExp&gt;](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.html)

**Description:** A waypoint, an object with a signal k position object, and GeoJSON Feature object (see geojson.org, and https://github.com/fge/sample-json-schemas/tree/master/geojson)

---

### [/resources/waypoints/&lt;RegExp&gt;/position](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.position.html)

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/position/longitude](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.position.longitude.html)

**Units:** deg

**Description:** Longitude

---

### [/resources/waypoints/&lt;RegExp&gt;/position/latitude](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.position.latitude.html)

**Units:** deg

**Description:** Latitude

---

### [/resources/waypoints/&lt;RegExp&gt;/position/altitude](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.position.altitude.html)

**Units:** m

**Description:** Altitude

---

### [/resources/waypoints/&lt;RegExp&gt;/feature](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.html)

**Title:** Feature

**Description:** A Geo JSON feature object

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/type](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.type.html)

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/geometry](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.geometry.html)

**Title:** Point

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/geometry/type](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.geometry.type.html)

**Description:** [missing]

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/geometry/coordinates](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.geometry.coordinates.html)

**Description:** A single position, in x,y order (Lon, Lat)

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/properties](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.properties.html)

**Description:** Additional data of any type

---

### [/resources/waypoints/&lt;RegExp&gt;/feature/id](http://signalk.org/specification/master/keys/html/resources.waypoints.__RegExp__.feature.id.html)

**Description:** [missing]

---

### [/version](http://signalk.org/specification/master/keys/html/version.html)

**Description:** Version of the Signal K schema/APIs used by the root object.

---


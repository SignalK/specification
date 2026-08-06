# J1939 Engine Data and Signal K

Many marine engines — Volvo Penta, Yanmar, Cummins, Scania and others — do not
speak NMEA 2000 natively. They speak **SAE J1939**, the same application layer
used on trucks and industrial diesels. A gateway sits between the engine's
J1939 bus and the boat's NMEA 2000 backbone and translates a subset of J1939
parameters into NMEA 2000 engine PGNs, which a Signal K server then maps onto
`propulsion.<id>.*` paths.

This appendix documents that chain end to end. It exists because the middle
step — which J1939 parameter becomes which NMEA 2000 field — is not written
down anywhere in the Signal K specification, and implementers repeatedly
rediscover it. Knowing the mapping matters for two reasons:

- **Precision is bounded by the middle step, not by Signal K.** Engine speed
  arrives as a 0.125 rpm/bit J1939 value and leaves as a 0.25 rpm/bit NMEA 2000
  field. No amount of care downstream recovers the difference.
- **Some parameters have no NMEA 2000 home at all.** They are visible to a
  server reading J1939 directly, but disappear through a gateway. Those are
  listed at the end.

Nothing here changes the Signal K schema. It is reference material for people
writing gateways, servers, or J1939 connections.

## Vocabulary

J1939 identifies a message by **PGN** (Parameter Group Number) and each value
inside it by **SPN** (Suspect Parameter Number). An SPN is a stable, globally
unique identifier for a physical quantity — SPN 110 is engine coolant
temperature on every J1939 engine ever built. NMEA 2000 also uses the word
"PGN" but numbers its messages differently, so the two PGN spaces are unrelated
and must not be conflated: J1939 PGN 65262 and NMEA 2000 PGN 127489 are
different messages.

The SPN is the useful anchor. A Signal K implementation that records which SPN
a value came from can round-trip it; one that records only the NMEA 2000 field
cannot always say what the engine actually reported.

## The engine measurement chain

The table below gives the mapping for the parameters that reach Signal K. Read
it as: the engine sends *SPN* inside *J1939 PGN*; the gateway writes it into
*NMEA 2000 PGN* / field; the server publishes it at *Signal K path*.

| SPN | J1939 parameter | NMEA 2000 PGN | Signal K path |
|----:|---|---:|---|
| 190 | Engine Speed | 127488 | `propulsion.<id>.revolutions` |
| 102 | Boost Pressure | 127488 | `propulsion.<id>.boostPressure` |
| 100 | Engine Oil Pressure | 127489 | `propulsion.<id>.oilPressure` |
| 175 | Engine Oil Temperature 1 | 127489 | `propulsion.<id>.oilTemperature` |
| 110 | Engine Coolant Temperature | 127489 | `propulsion.<id>.temperature`<br>and `.coolantTemperature` |
| 109 | Engine Coolant Pressure | 127489 | `propulsion.<id>.coolantPressure` |
| 167 | Charging System Potential | 127489 | `propulsion.<id>.alternatorVoltage` |
| 168 | Battery Potential | 127489 | `propulsion.<id>.alternatorVoltage` |
| 158 | Keyswitch Battery Potential | 127489 | `propulsion.<id>.alternatorVoltage` |
| 183 | Engine Fuel Rate | 127489 | `propulsion.<id>.fuel.rate` |
| 247 | Engine Total Hours of Operation | 127489 | `propulsion.<id>.runTime` |
| 94 | Engine Fuel Delivery Pressure | 127489 | `propulsion.<id>.fuel.pressure` |
| 92 | Engine Percent Load At Current Speed | 127489 | `propulsion.<id>.engineLoad` |
| 513 | Actual Engine Percent Torque | 127489 | `propulsion.<id>.engineTorque` |
| 189 | Engine Rated Speed | 127498 | — (static, no path) |
| 237 | Software Identification | 127498 | — |
| 234 | Vehicle Identification Number | 127498 | — |
| 523 | Transmission Current Gear | 127493 | `propulsion.<id>.transmission.gear` |
| 123 | Transmission Clutch 1 Pressure | 127493 | `propulsion.<id>.transmission.oilPressure` |
| 127 | Transmission 1 Oil Pressure | 127493 | `propulsion.<id>.transmission.oilPressure` |
| 177 | Transmission 1 Oil Temperature 1 | 127493 | `propulsion.<id>.transmission.oilTemperature` |

Two groups of SPNs collapse onto a single NMEA 2000 field: 167, 168 and 158 all
land in `alternatorVoltage`, and 123 and 127 both land in the transmission
pressure field. A gateway picks whichever the engine actually reports, so
`alternatorVoltage` is not guaranteed to be alternator output on every
installation.

Note that SPN 110 feeds both `temperature` and `coolantTemperature`. On a
water-cooled marine diesel these are the same measurement, and the duplication
is historical.

## Resolution changes across the boundary

Where the two encodings disagree, the coarser one wins. These are the cases
worth knowing:

| Quantity | J1939 resolution | NMEA 2000 resolution | Effect |
|---|---|---|---|
| Engine speed | 0.125 rpm/bit | 0.25 rpm/bit | halved |
| Engine hours | 0.05 h/bit (180 s) | 1 s | *finer* downstream; the extra digits are interpolation, not measurement |
| Coolant temperature | 0.03125 K/bit | 0.01 K/bit | preserved |
| Oil temperature | 0.03125 K/bit | 0.1 K/bit | coarsened ~3× |
| Fuel rate | 0.05 L/h per bit | 0.1 L/h per bit | halved |
| Percent load / torque | 1 %/bit, −125 % offset | 1 %/bit | preserved; note the J1939 offset |

Engine hours deserves care. J1939 counts in 0.05 hour steps — 3 minutes — so a
`runTime` value in Signal K that changes by one second is reporting a
conversion artefact, not a real increment. Consumers computing rates from
`runTime` should not assume second-level truth behind a gateway.

Percent torque (SPN 513) is transmitted with a −125 % offset, so the raw byte
must be biased before use. A value that looks like 125 % load on an idling
engine is this offset being missed.

Transmission gear (SPN 523) carries the same −125 offset, which works out
conveniently: after biasing, the value *is* the gear number, with reverse gears
negative and 0 meaning neutral. Miss the offset and every gear reads as roughly
125. J1939 also transmits the selected and current *range* as two-character
ASCII (`D`, `N`, `R`) alongside the numeric gear, which is often the more
useful field on a marine transmission with no multi-speed gearbox.

## Engine alarms

NMEA 2000 PGN 127489 carries two 16-bit discrete status fields. A gateway
populates individual bits from J1939 lamp and warning SPNs:

| SPN | J1939 condition | Status bit |
|----:|---|---:|
| 623 | Red Stop Lamp | 3 |
| 624 | Amber Warning Lamp | 4 |
| 987 | Protect Lamp | 5 |
| 1213 | Malfunction Indicator Lamp | 2 |
| 3038 | Engine Derate | 6 |
| 3039 | Engine Shutdown | 7 |
| 3040 | Engine Warning | 8 |
| 3041 | Engine Protection | 9 |
| 1214 | Engine Over Speed | 10 and 12 |
| 1215 | Engine Over Temperature | 11 |
| 1216 | Engine Low Oil Pressure | 13 |
| 1706 | Engine Coolant Level Low | 14 |

This is a lossy summary. J1939 reports faults as **DM1** (PGN 65226) — a list
of active diagnostic trouble codes, each identified by the SPN that failed and
an FMI (Failure Mode Identifier) saying how. Collapsing that into a handful of
lamp bits discards which component failed.

Signal K models the structured form directly under
`propulsion.<id>.diagnostics`: the four lamp booleans plus an `activeCodes`
array of `{spn, fmi, occurrenceCount}`. A server reading J1939 directly should
populate it; a server behind a gateway generally can only set the lamps.

An FMI is a 5-bit value (0–31), and several J1939 aftertreatment messages carry
"Preliminary FMI" fields inline at 5-bit width rather than byte-aligned. Decoders
that assume byte alignment there will silently misread every field after it.

## Parameters with no NMEA 2000 equivalent

A gateway forwards roughly fifty J1939 parameters. An engine typically
broadcasts several hundred. The following are commonly present on the J1939 bus,
carry real diagnostic value, and have no NMEA 2000 engine PGN to travel in —
they are reachable only by a Signal K server with a direct J1939 connection:

- **Exhaust gas temperatures per bank** (PGN 65031) — bank 1 and bank 2 turbine
  temperatures, the primary indicator of a failing injector or turbo.
- **Fuel rail and injection pressures** (PGN 65243) — common-rail health.
- **Intake manifold temperatures 2–6** (PGN 65189) and **turbocharger boost per
  turbo** (PGN 65190) — only a single aggregate boost figure survives the
  gateway.
- **Aftertreatment / SCR data** (PGNs 64800, 64908, 64946–64948) — DPF
  differential pressure and regeneration state on modern Tier III engines.
- **Engine operating state and derate request** (PGN 64914) — why the engine
  reduced power, as opposed to merely that it did.
- **Idle hours and idle fuel** (PGN 65244), **trip fuel** (PGN 65257).

Signal K has paths for some of these already (`exhaustTemperature`,
`intakeManifoldTemperature`); others have no path yet. Where a path is missing,
that is a gap to be filled by a specification proposal rather than by inventing
a private key — see [How Can I Help?](how_to_help.md).

## Implementation notes

**Engine instance.** NMEA 2000 engine PGNs carry an instance field that
distinguishes port from starboard. J1939 has no such concept: instance is
assigned by the gateway, usually from the engine's J1939 source address or a
configuration switch. A Signal K server reading J1939 directly must derive
`<id>` itself, conventionally from the source address, and should keep that
assignment stable across restarts.

**Address claiming.** J1939 devices claim a bus address at startup and can
change it. A server keying engine identity on source address alone will
occasionally see an engine "move". The 64-bit ISO NAME from the address claim
(PGN 60928) is the stable identifier.

**Units.** Signal K is strict SI: kelvin, pascal, hertz, seconds, and ratios in
0–1 rather than percent. J1939 uses degrees Celsius, kPa, rpm and percent
throughout, so every value in the tables above needs conversion, not just
rescaling.

## References

- SAE J1939-71, *Vehicle Application Layer* — the authoritative definition of
  the PGN and SPN layouts referenced here.
- SAE J1939DA, *Digital Annex* — the machine-readable parameter registry.
- [canboat](https://github.com/canboat/canboat) carries an open J1939 PGN
  database (`database/j1939/pgns/`) alongside its NMEA 2000 one, including the
  engine and aftertreatment PGNs listed above.

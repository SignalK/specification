# Metadata

A key part of Signal K is the ability for data consumers such as apps or MFDs to automatically configure themselves
based on settings retrieved from the server. The metadata component of Signal K facilitates this through an optional
`meta` object attached to each key in the Signal K data model.

## Rationale

In an environment where various critical pieces of information are displayed in multiple locations it becomes quite
difficult to ensure that all of these devices use the same scale and react the same way to changes in the data. This is
especially true in an environment where these devices are not tied to the boat. A crew member may bring a personal
tablet with them for their tactician role during a Wednesday evening race or a harbor pilot may bring a laptop on board
loaded with local charts. If these devices can load critical configuration data from a central server on the boat, this
saves time and prevents costly or even disastrous mistakes from occurring due to misconfigured devices.

## Metadata for a Data Value

The `meta` object exists at the same level as `value` and `$source` in each key in the Signal K data model.

[>]: # (mdpInsert ```json fsnip ../samples/full/docs-data_model_metadata.json --snip meta --prettify 2 85)
```json
{
  "displayName": "Port Tachometer",
  "longName": "Engine 2 Tachometer",
  "shortName": "Tacho",
  "description": "Engine revolutions (x60 for RPM)",
  "units": "Hz",
  "timeout": 1,
  "displayScale": {"lower": 0, "upper": 75, "type": "linear"},
  "alertMethod": ["visual"],
  "warnMethod": ["visual"],
  "alarmMethod": ["sound", "visual"],
  "emergencyMethod": ["sound", "visual"],
  "zones": [
    {"upper": 4, "state": "alarm", "message": "Stopped or very slow"},
    {"lower": 4, "upper": 60, "state": "normal"},
    {"lower": 60, "upper": 65, "state": "warn", "message": "Approaching maximum"},
    {"lower": 65, "state": "alarm", "message": "Exceeding maximum"}
  ]
}
```
[<]: #
In the example `meta` object above, a definition is provided for an analog RPM gauge for the port engine. It provides a
few different options for the consumer to use to display the name of the measurement and explicitly calls out the unit
of measure.

###`description`

This is the description for the Signal K path and must always be the same as the description property within the Signal K
Schema for that path.

###`displayName`

This is used on or near any display or gauge which shows the data. Units can change and are presented separately, therefore no
indication of units should be included in displayName. eg. "Port"

###`longName` `shortName`

These are human readable names for the particular instance of this value. Presented to users to identify the value. The short
version may be used by consumers where space is at a premium. As with displayName units should not be included.

###`timeout`

The `timeout` property tells the consumer how long it should consider the value valid. This value is specified
in seconds, so for a high speed GPS sensor it may 0.1 or even 0.05.

The `displayScale` object provides information regarding the recommended type and extent of the scale used for displaying
values. The `lower` and `upper` indicate the extent of the scale to be shown. Some values are better shown on a non linear
scale, for example logarithmic for luminosity, depth, signal strength, etc. whilst others may be better on a squareroot
scale eg. depth, windspeed. `type` has possible values of `linear` (default), `logarithmic`, `squareroot` or `power`. When
`"type": "power"` is specified an additional property `power` must be present to define the power. Note that a power of
0.5 is equivalent to `squareroot` and a power of 1 is equivalent to linear. In using these scales the type defines the
function which is applied to all values in order to calculate % scale deflection of the pointer/needle/plot:

| Type        | Formula for % deflection             |
| ----------- | ------------------------------------ |
| linear      | (V - L)/(U - L)                      |
| logarithmic | (log(V) - log(L) / (log(U) - log(L)) |
| squareroot  | (√V - √L) / (√U - √L)                |
| power (P)   | (Vᴾ - Lᴾ) / (Uᴾ - Lᴾ)                |

Where: V = value, L = lower bound of the gauge, U = upper bound of the gauge and P = power

Note that on a logarithmic scale neither L nor U can be zero. 

The `alertMethod`, `warnMethod`, `alarmMethod` and
`emergencyMethod` properties tell the consumer how it should respond to an abnormal data condition. Presently the
values for these properties are `sound` and `visual` and the method is specified as an array containing one or both of
these options. It is up to the consumer to decide how to convey these alerts.

###`alertMethod`, etc
The `alertMethod`, `warnMethod`, `alarmMethod` and `emergencyMethod` properties tell the consumer how it should respond to an
abnormal data condition. Presently the values for these properties are `sound` and `visual` and the method is specified as an
array containing one or both of these options. It is up to the consumer to decide how to convey these alerts.

###`zones`
The last property in the `meta` object is the `zones` array. This provides a series of hints to the consumer which can
be used to properly set a range on a display gauge and also color sectors of a gauge to indicate normal or dangerous
operating conditions. It also tells the consumer which state the data is in for a given range. Combined with the alert
method properties, all Signal K consumers can react the same way to a given state.

The possible states in ascending order of severity are:

| State/Zone | Description |
|------------|--------|--------|
| nominal    | this is a special type of normal state/zone (see below)        |
| normal     | the normal operating range for the value in question (default)            |
| alert      | Indicates a safe or normal condition which is brought to the operators attention to impart information for routine action purposes |
| warn       | Indicates a condition that requires immediate attention but not immediate action |
| alarm      | Indicates a condition which is outside the specified acceptable range. Immediate action is required to prevent loss of life or equipment damage |
| emergency  | the value indicates a life-threatening condition |

`nominal`: A example use of this is for engine monitoring eg. coolant temperature where there is a normal (no warnings)
(green) zone between say 70C and 110C, but when the temperature is between 80C and 90C (`nominal`) the needle doesn't move at
all (typically remains vertical or horizontal). This is really useful if you have many gauges (multiple motors with multiple
sensors) where it is very easy to spot that every needle is pointing in exactly the same direction. Use of nominal will only
be relevant if the gauge/display design permits it.

The `upper` and `lower` values in the zones do not need to be contiguous, they don't have to both be present in a zone, nor do
they need to be within the bounds of the `upper` and `lower` specified in `displayScale`. When they are outside of the
`displayScale` range they will still give rise to alerts. Both `upper` and `lower` values are considered to be inclusive.

If zones overlap each other the state/zone with the highest severity will take precedence. This is true for both alerts and
gauge/display rendering. Any part of the range which is not explicitly within a zone is considered to be `normal` (the default).
As such, zones with a state of `normal` have no effect and their removal would result in no changes to either displays or alerts.

There can be multiple zones with the same `state`, for example if a different message is required, or if they are on different parts of the scale.

Signal K servers will use the `zone` information to monitor any data which has a `meta` object and
raise a generic alarm event. See the section on [Alarm Handling](notifications.md) for more.

## Implicit Metadata

All keys in the Signal K specification must have a `description`, and where the key is a numeric value it must have
`units`.

If a client requests the `meta` property for a valid Signal K key via the HTTP REST interface, the server must return
the `description` and, if applicable, `units`, even if no value has ever been generated for that key.

If a key has values determined by an enum, the server should include the enum in the meta. NB. in future versions
it is likely that this will become a mandatory requirement for the server.

```javascript
// GET /signalk/v1/api/vessels/self/environment/depth/belowKeel/meta

{
  "units": "m",
  "description": "Depth below keel"
}
```

See [keyswithmetadata.json](https://github.com/SignalK/specification/blob/_version_/keyswithmetadata.json)

## Default Configuration

Signal K does not provide a default set of metadata, it is up to the owner or their installer to configure their Signal
K environment appropriately for their vessel. However, by centralizing this configuration they will only need to do it
one time and any future consumers will automatically use this configuration.

## Alarm Management

An alarm watch is set by setting the `meta.zones` array appropriately. A background process on the server checks for
alarm conditions on any attribute with a `meta.zones` array. If the keys value is within a zone the server sets an
alarm key similar to `vessels.self.notifications.[original_key_suffix]`, e.g. an alarm set on
`vessels.self.navigation.courseOverGroundTrue` will become
`vessels.self.notifications.navigation.courseOverGroundTrue`.

The object found at this key should contain the following:

```json
{
  "message": "any text",
  "state": "[normal|alert|warn|alarm|emergency]"
}
```

## Other Benefits

While not strictly part of the Signal K specification, metadata configuration could be shared between boats or even
provided by manufacturers of production boats or by component suppliers such as engine or refrigerator manufacturers.
Also, any device which implements Signal K should provide a baseline metadata configuration. As this standard becomes
more widespread, less individual configuration will need to be performed.

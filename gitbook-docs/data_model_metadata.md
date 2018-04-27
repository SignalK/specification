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
  "longName": "Engine 2 Tachometer (x60 for RPM)",
  "shortName": "Revs",
  "description": "Revolutions in HZ, measured via the W terminal on the alternator",
  "gaugeType": "analog",
  "units": "Hz",
  "timeout": 1,
  "alertMethod": ["visual"],
  "warnMethod": ["visual"],
  "alarmMethod": ["sound", "visual"],
  "emergencyMethod": ["sound", "visual"],
  "zones": [
    {"upper": 50, "state": "alarm", "message": "Stopped or very slow"},
    {"lower": 50, "upper": 300, "state": "normal"},
    {"lower": 300, "upper": 350, "state": "warn", "message": "Approaching maximum"},
    {"lower": 350, "state": "alarm", "message": "Exceeding maximum"}
  ]
}
```
[<]: #
In the example `meta` object above, a definition is provided for an analog RPM gauge for the port engine. It provides a
few different options for the consumer to use to display the name of the measurement and explicitly calls out the unit
of measure. It also specifies a recommended display format via `gaugeType`.

The `timeout` property tells the consumer how long it should consider the value valid. This value is specified
in seconds, so for a high speed GPS sensor it may 0.1 or even 0.05. The `alertMethod`, `warnMethod`, `alarmMethod` and
`emergencyMethod` properties tell the consumer how it should respond to an abnormal data condition. Presently the
values for these properties are `sound` and `visual` and the method is specified as an array containing one or both of
these options. It is up to the consumer to decide how to convey these alerts.

The last property in the `meta` object is the `zones` array. This provides a series of hints to the consumer which can
be used to properly set a range on a display gauge and also color sectors of the gauge to indicate nominal or dangerous
operating conditions. It also tells the consumer which state the data is in for a given range. Combined with the alert
method properties, all Signal K consumers can react the same way to a given state.

It is also possible for a Signal K server to use this information to monitor any data which has a `meta` object and
raise a generic alarm event. See the section on [Alarm Handling](notifications.md) for more.

## Implicit Metadata

All keys in the Signal K specification must have `units` and a `description`. If a client requests the `meta` property
for a valid Signal K key via the HTTP REST interface, the server must return the `units` and `description`, even if no
value has ever been generated for that key.

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

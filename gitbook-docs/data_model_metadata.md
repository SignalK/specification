### The Use Cases

Let's assume we have engine1.rpm as a key/value in Signal K. We want to display it on our dashboard, and monitor alarms for temp, oil, rpm etc.

We can drop a generic dial gauge on our dash and display rpm, but it can't know maxRpm, or alarms unless its an engine-specific gauge, and knows where to look in the Signal K schema. So we will end up with a profusion of role specific gauges to maintain. We also have non standard key names for max, min, high, low, etc. which pollute the schema.

Currently the Signal K server has a set of specific alarm keys. These grow over time and are becoming awkward. The server can only monitor these specific keys at present as there is no mechanism for arbitrary alarm definition.

### Metadata for a Data Value

Each data key should have an optional ```.meta``` object. This holds data in a standard way which enables the max/min/alarm and display to be automatically derived.
```json
{
  "displayName": "Tachometer, Engine 1",
  "shortName": "RPM",
  "warnMethod": "visual",
  "warnMessage": "any text",
  "alarmMethod": "sound",
  "alarmMessage": "any text",
  "zones": [
    {"lower":0.0,"upper":500,"state":"alarm", "message":"Stopped or very slow Rpm"},
    {"lower":500,"upper":3000,"state":"normal", "message":""},
    {"lower":3000,"upper":3500,"state":"warn", "message":"Approaching maximum rpm"},
    {"lower":3500,"upper":9999,"state":"alarm", "message":"Exceeding maximum rpm"}
  ]
}
```
Since the settings object is always the same, the tachometer can now limit its range, and display green, yellow, and red sectors. The generic gauge can now perform this role, with correct labels etc.

The alarms problem is also improved, as the server can run a background process to monitor any key that has a ```.meta``` object, and raise a generic alarm event. By recursing the tree the alarm monitoring can find the source (engine1), giving the alarm context. See [[Alarm Handling]]

The alarms functionality then becomes generic, and grows with the spec. This is may be the case for other functionality also.

###Default Configuration

Other than a few standard keys it is unlikely that the ```.meta``` can have global defaults, as it is very vessel specific (e.g. a sail boat will have speeds from 0-15kts, a ski boat will have 0-50kts). So the values will have to be configured by the user on the individual vessel as required.

It is probably possible to have profiles that set a range of default ```.meta```, e.g. sail vessel, or motor vessel, and if two vessels have the same engine, then the engine profiles will also tend to be the same.

###Alarm Management

An alarm watch is set by setting the `meta.zones` array appropriately. A background process on the server checks for alarm conditions on any attribute with a `meta.zones` array. If the keys value is within a zone the server sets an alarm key similar to `vessels.self.notifications.[original_key_suffix]`, eg an alarm set on `vessels.self.navigation.courseOverGroundTrue` will become `vessels.self.notifications.navigation.courseOverGroundTrue`.

The object found at this key should contain the following:
```json
{
  "message": "any text",
  "state": "[normal|alert|warn|alarm|emergency]"
}
```
###Other Benefits

The common profiles should be exportable and importable. This would allow manufacturers or other users to create profiles for specific products or use cases, which could then be imported to a vessel.

This may also have possibilities for race control or charter management. For instance a limit on lat/lon would raise an 'Out of Bounds' email on a charter vessel.

A lot of the current max/min/alarm values could be removed to simplify and standardise the spec.
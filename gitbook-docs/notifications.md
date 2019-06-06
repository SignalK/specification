# Alarm, Alert, and Notification Handling

Handling alarms, alerts, and notifications in Signal K is a multi-stage process. Alarms, alerts and notifications are
all handled the same way, and are all referred to as alarms below.

We need a flexible model to define alarm conditions, and a standard way to announce and record them.

## Alarm Process

* Define alarm states as zones in the meta object attached to any Signal K value. See [[Metadata for Data Values]]
* If the value is within an alarm zone raise the defined alarm.
* If the value goes out of the zone, remove the alarm by setting its value to null
* Alarms are raised by placing an alarm object in the `vessels.self.notifications` tree

## Expected implementation behaviour

* The server (or device) should monitor the current value and compare it to the defined zones.
* If a value enters an alarm zone, then a key is written to `vessels.self.notifications..`
* If a value leaves an alarm zone, then the key is removed from `vessels.self.notifications..`
* Alarms raised are monitored by an alarm process on the server, which takes appropriate action, sounding alarms, or
  displaying messages.
* Clients interested in alarms can subcribe to the `vessels.self.notifications...` tree in the usual way and be informed
  of alarms in the same way as normal signalk keys.
* When an alarms is removed, a delta should be sent to subscribers with the path and a null value.

## Example

eg If we exceed our anchor alarm radius: `vessels.self.navigation.anchor.currentRadius` enters
`vessels.self.navigation.anchor.currentRadius.meta.zones : [ {lower: "0", upper: maxRadius, state : "normal"}, {lower: maxRadius, upper: 999999, state: "alarm"}]`

The alarm is : `vessels.self.notifications.navigation.anchor.currentRadius`

The alarm object is

[>]: # (mdpInsert ``` fsnip ../samples/full/docs-notifications.json --snip currentRadius --ellipsify timestamp "'$..['\$source']'")
```
{
  "value": {
    "method": ["sound"],
    "state": "alarm",
    "message": "Dragging anchor!"
  },
  "timestamp": "...",
  "$source": "..."
}
```
[<]: #
The server alarm manager will see this new entry and turn on the alarm. Using a manager process allows flexibility in
situations where multiple alarms are triggered and your vessel is a mass of flashing and beeping. eg A single 'Pause'
button can give you 5-10 minutes to take action, stopping annoying noise, and removing popup messages from screens.

Since the `vessels.self.notifications` tree mirrors the other data in the signal k model, we can selectively watch or
react to specific branches or keys. When displaying multiple alarms a screen can also sort and filter them.

## Other Alarms

Above we have discussed monitoring existing values and raising alarms. There are other alarms that must be considered,
eg MOB, fire, sinking etc, and misc alerts "GPS signal lost".etc.

The `vessels.[uuid].notifications` tree is the same as any other Signal k branch. Keys can be added and removed as
required in the usual way. Since the branch is being monitored we only need to add a key of any sort to create a
suitable alarm.

In the case of an emergency, create a unique key: The alarm is : `vessels.[uuid].notifications.[alarm.key]`

The alarm object is

[>]: # (mdpInsert ``` fsnip ../samples/full/docs-notifications.json --snip mob --ellipsify $ ~value)
```
{
  "value": {
    "method": ["visual", "sound"],
    "state": "emergency",
    "message": "Man Overboard!"
  },
  ...
}
```
[<]: #
Alarm objects that have been raised this way must be cleared manually, or by the process that created them. You can use
any suitable path, keeping in mind the context of the alarm.

eg In the case of an alert, create a unique key by generating a path: The alarm is :
`vessels.[uuid].notifications.navigation.gnss`

The alarm object is

[>]: # (mdpInsert ``` fsnip ../samples/full/docs-notifications.json --snip gnss --ellipsify $ ~value)
```
{
  "value": {
    "method": ["visual"],
    "state": "alert",
    "message": "GPS signal lost!"
  },
  ...
}
```
[<]: #
### Well Known Names

Some alarms are especially important, eg MOB. This is a list of keys for special alarms.
 * `..notifications.mob.*`
 * `..notifications.fire.*`
 * `..notifications.sinking.*`
 * `..notifications.flooding.*`
 * `..notifications.collision.*`
 * `..notifications.grounding.*`
 * `..notifications.listing.*`
 * `..notifications.adrift.*`
 * `..notifications.piracy.*`
 * `..notifications.abandon.*`

An example to send an MOB alarm from an N2K source, the gateway would convert and send something like:

[>]: # (mdpInsert ``` fsnip ../samples/delta/docs-notifications.json --delKeys $.updates[1] --ellipsify source)
```
{
  "context": "vessels.urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "updates": [
    {
      "source": {...},
      "timestamp": "2017-08-15T16:00:05.200Z",
      "values": [
        {
          "path": "notifications.mob",
          "value": {
            "message": "MOB",
            "state": "emergency",
            "method": ["visual", "sound"]
          }
        }
      ]
    }
  ]
}
```
[<]: #
The resulting full signalk tree would be:

[>]: # (mdpInsert ``` fsnip ../samples/full/docs-notifications.json --ellipsify $ ~vessels --delKeys navigation --ellipsify uuid "'$..['\$source']'")
```
{
  "vessels": {
    "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d": {
      "uuid": "...",
      "notifications": {
        "mob": {
          "value": {
            "method": ["visual", "sound"],
            "state": "emergency",
            "message": "Man Overboard!"
          },
          "timestamp": "2017-04-10T08:33:53Z",
          "$source": "..."
        }
      }
    }
  },
  ...
}
```
[<]: #
To clear the alarm condition, send:

[>]: # (mdpInsert ``` fsnip ../samples/delta/docs-notifications.json --delKeys $.updates[0] --ellipsify source)
```
{
  "context": "vessels.urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "updates": [
    {
      "source": {...},
      "timestamp": "2017-08-15T16:00:05.538Z",
      "values": [
        {
          "path": "notifications.mob",
          "value": null
        }
      ]
    }
  ]
}
```
[<]: #
## Multiple cases of the same alarm

Should multiple cases of the same alarm occur (eg a gps loses signal, then a second gps loses signal) the alarms are
handled the same as any other multiple values in signalk. However alarms will tend to be re-issued whenever the
underlying data changes.

The servers alarm monitoring processes are expected to be smart enough to know that the anchor alarm is triggered, and
its not necessary to raise a second copy of the same alarm, after all there is only one boat dragging!

This may be handled differently for notifications. It may be useful to know that your gps's are all failing
intermittently, or that . Hence the handling of multiple copies of alarms is an implementation issue, and may vary.

## The key should be unique

If we have an alarm `vessels.self.notifications.navigation.anchor.currentRadius` and we attempt to write another higher
in the same tree at `vessels.self.notifications` it must not replace or remove the existing alarm. Since the
`meta.zones` structure is only valid on signalk leaf values this occurs naturally in most circumstances. But it is
possible to set an alarm value arbitrarily (eg MOB) and care should be taken in implementations that keys do not
overwrite existing paths.

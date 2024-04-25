# Notifications

Signal K handles notifications through a multi-stage process, treating all notifications uniformly. Notifications originate from two sources:

1. Path value state information
2. Vessel and crew information

A flexible model is required to define various informative and alarming severities, along with a standard method for announcement and management.

## Notification Process

* The definition of an "alarming" notification is defined by the notification's state severity.
* The lowest state severity is considered normal - not alarming.
* Notification states are defined as zone segments (array items) in the meta object attached to any Signal K path. See [[Metadata for Data Values]].
* If `meta.zones` contains at least one item, the server deternies the value's state and sends a notification.
* When a value doesn't fall within any `meta.zones`, the server raises a default notification indicating a normal value state.
* If the value transitions to or enters a zone, the server raises the defined notification.
* If the value leaves all zones, the server sends a normal state value notification.
* Notifications are raised by placing a notification object in the `vessels.self.notifications` tree.

## Expected Implementation Behavior

* The server (or device) should monitor the current value and compare it to the defined meta zones.
* If the value changes zone, a key is written to `vessels.self.notifications..`.
* If the value matches no zone, a key indicating normal state is written to `vessels.self.notifications..`.
* Notifications raised are monitored by a notification process on the server, which takes appropriate action, such as sounding alarms or displaying messages.
* Clients interested in alarms can subscribe to the `vessels.self.notifications...` tree in the usual way and be informed of notifications in the same way as normal Signal K keys.
* When a notification is cleared, a delta should be sent to subscribers indicating the notification has returned to its normal state.

## Severity and Presentation Definition

* Every notification must include a `state` property to specify its severity level.
* Every notification must include a `method` array property to determine if the notification should result in a sound, visual, both, or no presentation.

| State | Description |
|------------|--------|
| normal     | Server generated - The normal value (default) |
| nominal    | All systems OK |
| alert      | Indicates a safe or normal condition which is brought to the operators attention to impart information |
| warn       | Indicates a condition that requires immediate attention but not immediate action |
| alarm      | Indicates a condition which is outside the specified acceptable range. Immediate action is required to prevent loss of life or equipment damage |
| emergency  | The value indicates a life-threatening condition |

## Resolving and silencing notifications
* To silence a notification, the serve or clients, send delta notification replica without the `sound` item the method array.
* To resolve a notification, the serve or clients, send delta notification replica with a state value of `normal`. Alarming notifications are difined by there state severity, not by their existance.

## Example

eg If we exceed our anchor alarm radius: `vessels.self.navigation.anchor.currentRadius` enters
`vessels.self.navigation.anchor.currentRadius.meta.zones : [ {lower: "0", upper: maxRadius, state : "normal"}, {lower: maxRadius, upper: 999999, state: "alarm"}]`

The notification is : `vessels.self.notifications.navigation.anchor.currentRadius`

The notification object is

[>]: # (mdpInsert ``` fsnip ../../samples/full/docs-notifications.json --snip currentRadius --ellipsify timestamp "'$..['\$source']'")
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
The server notification manager will see this new entry and turn on the sound. Using a manager process allows flexibility in
situations where multiple notifications of various severity are triggered and your vessel is a mass of flashing and beeping. eg A single 'Pause'
button can give you 5-10 minutes to take action, stopping annoying noise, and removing popup messages from screens.

Since the `vessels.self.notifications` tree mirrors the other data in the signal k model, we can selectively watch or
react to specific branches or keys. When displaying multiple notifications a screen can also sort and filter them.

## Other notifications

Above we have discussed monitoring existing values and raising notification. There are other notifications that must be considered,
eg MOB, fire, sinking etc, and misc alerts "GPS signal lost".etc.

The `vessels.[uuid].notifications` tree is the same as any other Signal k branch. Keys can be added and removed as
required in the usual way. Since the branch is being monitored we only need to add a key of any sort to create a
suitable alarm.

In the case of an emergency, create a unique key: The notification is : `vessels.[uuid].notifications.[alarm.key]`

The notification object is

[>]: # (mdpInsert ``` fsnip ../../samples/full/docs-notifications.json --snip mob --ellipsify $ ~value)
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
Notification objects that have been raised this way must be cleared manually, or by the process that created them. You can use
any suitable path, keeping in mind the context of the notification.

eg In the case of an alert, create a unique key by generating a path: The notification is :
`vessels.[uuid].notifications.navigation.gnss`

The notification object is

[>]: # (mdpInsert ``` fsnip ../../samples/full/docs-notifications.json --snip gnss --ellipsify $ ~value)
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

Some notifications are especially important, eg MOB. This is a list of keys for special notifications.
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

An example to send an MOB notification alarm from an N2K source, the gateway would convert and send something like:

[>]: # (mdpInsert ``` fsnip ../../samples/delta/docs-notifications.json --delKeys $.updates[1] --ellipsify source)
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

The resulting full Signal K tree would be:

[>]: # (mdpInsert ``` fsnip ../../samples/full/docs-notifications.json --ellipsify $ ~vessels --delKeys navigation --ellipsify uuid "'$..['\$source']'")
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

To clear the notification condition, send:

[>]: # (mdpInsert ``` fsnip ../../samples/delta/docs-notifications.json --delKeys $.updates[0] --ellipsify source)
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
            "message": "",
            "state": "normal",
            "method": []
          }
        }
      ]
    }
  ]
}
```
[<]: #

## Multiple cases of the same notification

Should multiple cases of the same notification occur (eg a gps loses signal, then a second gps loses signal) the notifications are
handled the same as any other multiple values in Signal K. However notification will tend to be re-issued whenever the
underlying data changes.

The servers notification monitoring processes are expected to be smart enough to know that the anchor notification of state alarm is triggered, and
its not necessary to raise a second copy of the same notification and state, after all there is only one boat dragging!

This may be handled differently for notifications. It may be useful to know that your gps's are all failing
intermittently, or that . Hence the handling of multiple copies of notifications is an implementation issue, and may vary.

## The key should be unique

If we have a notification `vessels.self.notifications.navigation.anchor.currentRadius` and we attempt to write another higher
in the same tree at `vessels.self.notifications` it must not replace or remove the existing notification. Since the
`meta.zones` structure is only valid on Signal K leaf values this occurs naturally in most circumstances. But it is
possible to set a notification value arbitrarily (eg MOB) and care should be taken in implementations that keys do not
overwrite existing paths.

## Notification Management

An notification watch is set by setting the `meta.zones` array appropriately. A background process on the server checks for
notification conditions on any attribute with a `meta.zones` array. If the keys value is within a zone the server sets a notification key similar to `vessels.self.notifications.[original_key_suffix]`, e.g. a notification set on
`vessels.self.navigation.courseOverGroundTrue` will become
`vessels.self.notifications.navigation.courseOverGroundTrue`.

The object found at this key should contain the following:

```json
{
  "message": "any text",
  "state": "[normal|alert|warn|alarm|emergency]"
}
```

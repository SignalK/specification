# Permissions Model

**This is a proposed addition to Signal K. It is not supported in the Node.js Reference Server and not standardized for
version 1.0 of the standard.**

The permissions model for Signal K is based on the UNIX [file permissions
model ↪](http://www.tutorialspoint.com/unix/unix-file-permission.htm).

Each key in Signal K has an optional `_attr` value.
```javascript
{
  "vessels": {
    "self":{
      // the usual Signal K keys, navigation, environment, etc
      "_attr":{          // filesystem specific data
        "mode": 750,     // UNIX style permissions
        "owner": "self", // owner
        "group": "self"  // group
      }
    }
  }
}
```

In the example above, the entire `vessels` object has permissions applied which can be interpreted as read and write
for the owner, read only for the group `self` and no access for anyone else. A request for data by anyone who is not
authenticated and a member of the `self` group or the `self` user would receive no data.

> **Note:** Keys beginning with `_` are always stripped from Signal K messages

The permissions apply recursively to all sub-keys, unless specifically overwritten. You can only provide a
_narrowing_ change in permissions, that is you can remove permissions, but cannot grant them. In the above case if the
permissions for `vessels.self.navigation.position` were set to `"mode" : 755`, it would have no effect as access is
blocked at the `vessels.self` key. The `vessels.self._attr` must now also be `"mode" : 755`, and all its other subkeys
explicitly set to `"mode" : 640`.

Because this security model is based on the UNIX model, the "execute" bit must be set on containers in order for
clients to traverse the tree. Good initial permissions in a shared environment would be a `mode` of 750 for all
containers and 640 for all leaf nodes.

**The implementation of proper security is the responsibility of the Signal K software implementation provider.**

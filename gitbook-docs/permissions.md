## Security Model

The security model for Signal K is based on the UNIX file permissions model. This was first developed in the late 1970's and is still perfectly suited to the internet today, so its got to be a pretty sound model!. 

So we adapted it for Signal K. See http://www.tutorialspoint.com/unix/unix-file-permission.htm

Each key in Signal K has an optional `_attr` value.
```javascript
"vessels": {
    "self":{
             //the usual signal k keys, navigation, environment, etc
            
       "_attr":{                 // filesystem specific data, eg security, possibly more later
                "_mode": 640,         // unix style permissions, often written in `owner:group:other` form, `-rw-r-----`
                "_owner" : "self",    // owner, surprisingly. The user who created the item, sometimes a virtual user like 'self'
                "_group": "self"      // group
             }
           }
        }
```
By default the `vessels.self` key has the above `_attr`. This effectively means that only the current vessels 'owner' can read and write from this key or any of its sub-keys. It also allows users in group `self` to read the data. This provides a way to give additional programs or users read-only access. In the above case an external user connecting from outside the vessel and requesting vessel data would receive `{}`, eg nothing. 

__Note:keys beginning with `_` are always stripped from signal k messages__

Since the above is a default, Signal K devices that lack the resources to implement security should always be installed behind a suitable gateway that can provide security. Again, the simplest security is the default read-write only within the local vessel (typically the current network). This makes a basic implementation as simple as possible.

The permissions apply recursively to all sub-keys, unless specifically overwritten. You can only provide a __narrowing__ change in permissions, eg less than the parent directory. In the above case if the permissions for `vessels.self.navigation.position` were set to `"_mode" : 644`, it would have no effect as access is blocked at the `vessels.self` key. The `vessels.self` _attr must now also be `"_mode" : 644`, and all its other subkeys explicitly set to `"_mode" : 640`

Hence setting complex permissions are likely beyond the typical user. For this reason we believe there should be a choice of default permission 'templates' for the signal K tree. Users would select their preference from a config screen. A paranoid user may prefer the above setup, another may chose to allow basic data similar to AIS (position, cog, speed, etc), and others may expose much more.

Templates also allow sharing of data for specific uses or needs, like a social group, or a marina.

Exposing everything (`"_mode" : 666`) would be dangerous - it would potentially allow external users to gain control of the vessels systems, however it is useful for demos and software development. All signal K implementations should always consider the potential danger of such permissions, and protect users if possible.

**The implementation of proper security is the responsibility of the Signal K software implementation provider.**

By manipulating the `_attr` values for the signalk keys, and creating suitable users and groups a sophisticated and well proven security model for vessel data can be created.
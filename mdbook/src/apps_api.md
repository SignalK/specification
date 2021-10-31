# Apps API

When a Signal K server provides webapps (rather than just data) it SHOULD implement the Apps API. This provides a standard way to list installed webapps, 
search for new webapps, and install or remove them. 

This allows different server implementations to share webapps, which gives webapps wider markets, and reduces 'brand' dependency. Basically any 
Signal K webapp should work on any Signal K server. This API standardises the management of those apps.

To be compatible with any Signal K server Signal K webapps are required to be HTML5 webapps, which rely only on static files served from a web server, 
and a connection to a Signal K server which supplies json data via the Signal K REST and websocket connections.

## API root

The Apps API root is `signalk/v1/apps/`

## List

`signalk/v1/apps/list` lists the currently install webapps. It is typically used to create app menus, and manage installed app lists.
It returns a json array in the form:
```
[{
//mandatory.
// [server_apps_root] is the location of installed apps from server html root.
	"name": "Kip",
	"description": "Really cool instrument app!!",
	"location": "[server_apps_root]/@mxtommy/kip/package/public/index.html",
	"_location": "[server_apps_root]/@mxtommy/kip/package/public/index.html", //DEPRECATED
// if available include manifest.json
	"manifest": {..content of manifest.json..}
//recommended
	"licence": "",
	"author": "Thomas St.Pierre <thomas@samoht.ca>",
	"repository": "https://github.com/npm/npm.git",
	"version": "0.1.8"
},
....
]
```

## Search

`signalk/v1/apps/search?keyword=signalk-webapp` finds the currently available webapps from npm. It is typically used to list available apps for installation.
By default it makes a call to `https://api.npms.io/v2/search?size=250&q=keywords:signalk-webapp`
It returns a json array in the form:
```
{
  "total": 25,
  "results": [
    {
      "package": {
        "name": "@signalk/freeboard-sk",
        "scope": "signalk",
        "version": "1.3.1",
        "description": "Openlayers chartplotter implementation for Signal K",
        "keywords": [
          "signalk-webapp"
        ],
        "date": "2019-02-24T03:04:34.287Z",
        "links": {
          "npm": "https://www.npmjs.com/package/%40signalk%2Ffreeboard-sk",
          "homepage": "https://github.com/SignalK/freeboard-sk#readme",
          "repository": "https://github.com/SignalK/freeboard-sk",
          "bugs": "https://github.com/SignalK/freeboard-sk/issues"
        },
        "author": {
          "name": "AdrianP"
        },
        "publisher": {
          "username": "panaaj",
          "email": "panaaj@hotmail.com"
        },
        "maintainers": [
          {
            "username": "fabdrol",
            "email": "fabian@decipher.industries"
          },
          {
            "username": "panaaj",
            "email": "panaaj@hotmail.com"
          },
          {
            "username": "rob42",
            "email": "robert@42.co.nz"
          },
          {
            "username": "sbender",
            "email": "scott@scottbender.net"
          },
          {
            "username": "timmathews",
            "email": "tim@signalk.org"
          },
          {
            "username": "tkurki",
            "email": "teppo.kurki@iki.fi"
          }
        ]
      },
      "score": {
        "final": 0.6330183377625871,
        "detail": {
          "quality": 0.8424154349617554,
          "popularity": 0.08661443147842339,
          "maintenance": 0.9999390178760352
        }
      },
      "searchScore": 0.00028367416
    },
		....
	]
}
```

# Install

`signalk/v1/apps/install?appName=@signalk/freeboard-sk&appVersion=1.3.1`, with params selected from above. This will install the app into
the preferred location on the Signal K server, from which the `list` call can be used to generate the app menu.

# Uninstall

`signalk/v1/apps/uninstall?appName=@signalk/freeboard-sk`, with params selected from `list`. This will uninstall the app.


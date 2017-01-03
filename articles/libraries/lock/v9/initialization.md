---
section: libraries
description: Lock V9 guide to initialization.
---

<%= include('../_includes/_lock-version-9') %>

# Lock: Initialization

```javascript
// Initialize with clientID and domain
var lock = new Auth0Lock(clientID, domain);

// Initialize with options
var lock = new Auth0Lock(clientID, domain, options);
```

- **clientID {String}**: Your application clientID in Auth0.
- **domain {String}**: Your Auth0 domain. Usually ```<account>.auth0.com```.

- **options {Object}**:
  - _**cdn {String}**_: Use as CDN base url. Defaults to `domain` if it doesn't equal `*.auth0.com`.
  - _**assetsUrl {String}**_: Use as assets base url. Defaults to `domain` if it doesn't equal `*.auth0.com`.
  - _**useCordovaSocialPlugins {boolean}**_: When Lock is used in a Cordova/Phonegap application, it will try authenticating with social connections using a native plugin. The only plugin supported is [phonegap-facebook-plugin](https://github.com/Wizcorp/phonegap-facebook-plugin) but more will come soon.

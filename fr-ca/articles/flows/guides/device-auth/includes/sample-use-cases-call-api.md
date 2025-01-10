## Sample Use Cases

### Detect Device Authorization Flow Use

You can use [Rules](/rules) to detect whether the current transaction is using the Device Authorization Flow. To do so, check the `context` object's `protocol` property:

```javascript
function (user, context, callback) {
   if (context.protocol === 'oauth2-device-code') {
      ...
   }
 
   callback(null, user, context);
}
```

### Sample Implementations

* [Device Authorization Playground](https://auth0.github.io/device-flow-playground/)
* [AppleTV (Swift)](https://github.com/pushpabrol/auth0-device-flow-appletv): Simple application that shows how Auth0 can be used with the Device Authorization Flow from an AppleTV.
* [CLI (Node.js)](https://gist.github.com/panva/652c61e7d847e0ed99926c324fa91b36): Sample implementation of a CLI that uses the Device Authorization Flow instead of the Authorization Code Flow. The major difference is that your CLI does not need to host a webserver and listen on a port.
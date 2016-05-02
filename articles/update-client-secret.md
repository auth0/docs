# Changing your application's client_secret

The `client_secret` of an application protects a service by only giving tokens to authorized applications. Client secrets should be protected, and if your `client_secret` has been compromised then you will need to generate a new one. Remember that all authorized apps will need to be updated with the new `client_secret`.

## Generating a new client_secret

If your `client_secret` needs to be replaced you will need to generate a new one on your own. It should be a cryptographically strong random string. There are many ways to do this such as using a library that creates a GUID, a hashing function, etc.

Here is an example of how a new `client_secret` can be generated:

```javascript
var crypto = require('crypto');

var base64uid = function(length, done){
  crypto.randomBytes(length, function(ex, buff){
    if (ex){
      return done(ex);
    }
    done(null, buff.toString('base64'));
  });
};

var urlEscapedBase64uid = function(length, done) {
  base64uid(length, function(err, result){
    var r = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    done(null, r);
  });
};

var generateClientSecret = function(done) {
  urlEscapedBase64uid(48, done);
};
```

## Using the API to set the new client_secret

After you have created a new `client_secret` you can then update it for your application by using [Update a client](https://auth0.com/docs/api/v2#!/Clients/patch_clients_by_id) in the Management API.  Set the `id` of the client you are updating, and then in the `body` section enter your new `client_secret` as a JSON field.

**Note:** The `client_secret` can only be updated with the `update:client_keys` scope.

You can get your `client_id` and `client_secret` by choosing your application in the [Applications](${uiURL}/#/applications) section of the dashboard.

Or you can update a `client_secret` by creating your own request to the API:

```har
{
    "method": "PATCH",
    "url": "https://YOURACCOUNT.auth0.com/api/v2/clients/YOUR_CLIENT_ID",
    "headers": [
      { "name": "Content-Type", "value": "application/json" }
    ],
    "d" : {
      "client_secret": "NEW_CLIENT_SECRET"
    }
}
```

## Updating authorized applications

Once you have changed your application's `client_secret` you will need to update any authorized applications to have the new value. To make sure the authorized application does not have any downtime with connecting to your application, we suggest you store the new `client_secret` as a fallback to the previous secret. So if the connection does not work with the old secret, use the new secret. The secrets can be stored in a list or similar structure to keep track of keys until they are no longer needed. Once you are sure an old secret is no longer used, it can safely be taken out of the application.
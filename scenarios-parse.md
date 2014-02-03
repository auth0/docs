# Extended Authentication for Parse Apps

Mobile Backend as a Service (MBaaS) platforms such as [Parse](www.parse.com) have become very popular as they allow developers to very quickly develop and deploy apps. They achieve this through higher level abstractions and through common app services such as storage, cross-device UI frameworks, and automated app lifecycle management.

Most offer fairly straightforward user management capabilities, with objects in their backend that represent users, and with basic credential and access management. This works well for a large number of apps, but many other apps require integration with existing identity systems. Apps that will be used in corporate environments, will very likely need integration with systems like LDAP or Active Directory. Apps targeting consumers or individuals, would benefit from integration with social netowrks like Facebook, Twitter, LinkedIn and similar.  

While advanced MBaaS, like __Parse__, do not offer this out-of-the-box, they have built extensibility points in their platforms to allow integration with systems offering more elaborate authentication.

Auth0 is also designed with great extenisbility features. In this article we show how easy it is to integrate Auth0 with Parse, and enable user authentication with __LDAP__, __Active Directory__, __Google Apps__, __Office365__, or any of the [supported Identity Providers](identityproviders).

##How it works?

![](https://docs.google.com/drawings/d/1E8pGVnDjuLw_eh4TPw-JvOB8BHBzWUJLGG1nwCC2CxU/pub?w=831&amp;h=372)

###1. Authenticate users
In the first step, users are authenticated. You can use any of Auth0's supported identity systems. All these are available through a single, simple to use, standards based API.

###2. Get a Parse Session Token
After successful authentication, Auth0 will call [Parse's user APIs](https://parse.com/docs/rest#users-login) and get a session token associated with this user. This is done by calling the `login` endpoint. If the user doesn't exist (signaled by the 404 response from the login method), Auth0 will provision a new User in Parse.

The result of this, is a `Session Token` associated with the user, that can be used to call Parse's API.

All this is achieved through a very simple Auth0 Rule:

```
function rule(user, context, callback) {
  // Run this only for the Parse application
  // if (context.clientID !== 'PARSE CLIENT ID IN AUTH0') return callback(null, user, context);

  var PARSE_APP_ID = 'PLACE HERE YOUR PARSE APP ID';
  var PARSE_API_KEY = 'PLACE HERE YOUR PARSE REST API KEY';
  var PARSE_USER_PASSWORD = 'PARSE_USER_MASTER_KEY'; // you can use this to generate one http://www.random.org/strings/

  var username = user.email || user.name || user.user_id; // this is the Auth0 user property that will be mapped to the username in the db

  request.get({
    url: 'https://api.parse.com/1/login',
    qs: {
      username: username,
      password: PARSE_USER_PASSWORD
    },
    headers: {
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_API_KEY
    }
  }, 
  function (err, response, body) {
    if (err) return callback(err);

    // user was found, add sessionToken to user profile
    if (response.statusCode === 200) {
      user.parse_session_token = JSON.parse(body).sessionToken;
      return callback(null, user, context);
    }

    // Not found. Likely the user doesn't exist, we provision one
    if(response.statusCode === 404) {
      request.post({
        url: 'https://api.parse.com/1/users',
        json: {
          username: username,
          password: PARSE_USER_PASSWORD
        },
        headers: {
          'X-Parse-Application-Id': PARSE_APP_ID,
          'X-Parse-REST-API-Key': PARSE_API_KEY,
          'Content-Type': 'application/json'
        }
      }, 
      function (err, response, body) {
        if (err) return callback(err);

        // user created, add sessionToken to user profile
        if (response.statusCode === 201) {
          user.parse_session_token = body.sessionToken;
          return callback(null, user, context);
        }
        return callback(new Error('The user provisioning returned an unkonwn error. Body: ' + JSON.stringify(body)));
      });
    }
    else
    {
      return callback(new Error('The login returned an unkonwn error. Status: ' + response.statusCode + 'Body: ' + body));
    }
  });
}
```

The `Session Token` is returned to the app as part of the User Profile in the `user.parse_session_token` property.

###3. Call Parse hosted API
Equiped with the new User Profile object (containing the `Session Token`), the app can now call Parse's API. Parse offers an API's to _become a User_ with a `Session Token`, so the call will be executed in teh context of this particular user:

```
Parse.User.become("session-token-here").then(function (user) {
  // The current user is now set to user.
}, function (error) {
  // The token could not be validated.
});
```

That's it!





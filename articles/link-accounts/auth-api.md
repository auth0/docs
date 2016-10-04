---
description: How to link accounts using the Authentication API (Deprecated) 
---

# Link Accounts using Authentication API (Deprecated) 

**NOTE:** This method of linking accounts using the linking endpoint of the [Authentication API](/auth-api#!#get--link), either through **Lock** or by manually calling the API, is **deprecated** and should no longer be used.

## Link through Auth0 Login Widget

```js
<script src="${lock_url}"></script>
<script type="text/javascript">
  var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

  function signin () {
    lock.show({
      callbackURL:  '${account.callback}',
      dict: {
        signin: {
          title: 'Link with another account'
        }
      },
      authParams: {
        access_token: '...LOGGED_IN_USER_ACCESS_TOKEN...'
      }
    })
  }
</script>

<a href="javascript:signin()">Add account</a>
```

**NOTE:** Notice the `access_token` fragment of the URL that is normally not present. Auth0 generates this `access_token` when a user logs in and uses it to uniquely identify the user.

## Manual initiation

The following example will manually initiate the authentication transaction:

`https://${account.namespace}/authorize?response_type=code&scope=openid`
`&client_id=${account.clientId}`
`&redirect_uri=${account.callback}`
`&access_token=...LOGGED_IN_USER_ACCESS_TOKEN...`

## Obtain an authenticated user's *access_token*

The SDK for your platform should make the `access_token` available in simplest way for your platform. For example:

* If you are using Lock in [Popup Mode](/libraries/lock/v10/popup-mode) in a SPA, the `access_token` is available as a callback parameter:

	```js
	var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
	
	lock.show(function(err, profile, id_token, access_token) {
	  //save access_token here for linking other accounts
	})
	```

* If you are using [passport-auth0](https://github.com/auth0/passport-auth0) in a regular Node.js web app, the `access_token` is available in the `strategy` callback and can be saved to the session for later use: 

  ```js
  var Auth0Strategy = require('passport-auth0'),
      passport = require('passport');

  var strategy = new Auth0Strategy({
     domain:       '${account.namespace}',
     clientID:     '${account.clientId}',
     clientSecret: '${account.clientSecret}',
     callbackURL:  '${account.callback}',
     passReqToCallback: true //need this to save the accessToken to session
    },
    function(req, accessToken, refreshToken, extraParams, profile, done) {
      // save accessToken to session to be able to link accounts later
      req.session.accessToken = accessToken;
      // profile has all the information from the user
      return done(null, profile);
    }
  );

  passport.use(strategy);
  ```

* If you are using ASP.NET, the `access_token` is available as a claim:
	
  ```
  ${'<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>'}
  ```

* If you are building your own implementation, the `access_token` will be available through the standard OAuth2 flow:

	1. User logs in and returns to the app with a `code`
	2. The app exchanges the `code` for the `access_token`

  The details of these exchanges are available at [Identity Protocols supported by Auth0](/protocols).

## Unlinking Accounts

To unlink a specific account, POST request to the following url:

`https://${account.namespace}/unlink`

The body should be:

```
{
    access_token: "LOGGED_IN_USER_ACCESS_TOKEN", // Primary identity access_token
    user_id: "LINKED_USER_ID" // (provider|id)
}
```

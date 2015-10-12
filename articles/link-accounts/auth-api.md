# Linking Accounts using Authentication API (Deprecated) 

> This way of linking accounts using the linking endpoint of the [Authentication API](https://auth0.com/docs/auth-api#!#get--link), either through **Lock** or manually calling the API, is **deprecated** and should not be used anymore.

## Linking through Auth0 Login Widget

```
<script src="${widget_url}"></script>
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

> Notice the `access_token` fragment of the URL that is normally not present. This is the `access_token` Auth0 will generate when a user logs in. It identifies a logged in user uniquely in Auth0.

## Manually initiating the authentication transaction

`https://${account.namespace}/authorize?response_type=code&scope=openid`
`&client_id=${account.clientId}`
`&redirect_uri=${account.callback}`
`&access_token=...LOGGED_IN_USER_ACCESS_TOKEN...`

## How to obtain the access_token of the user logged in?

The SDKs should make this very easy. The SDK for your platform will make it available in the most natural way for said platform. For example:

* If you are using Lock in [popup-mode](https://auth0.com/docs/libraries/lock/types-of-applications#popup-mode) in a SPA, the `access_token` is available as a callback param:

	```
	var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
	
	lock.show(function(err, profile, id_token, access_token) {
	  //save access_token here for linking other accounts
	})
	```

* If you are using [passport-auth0](https://github.com/auth0/passport-auth0) in a regular Node.js web app, the `access_token` is available in the Strategy callback and can be saved to the session for later use: 

  ```
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

* If you are using ASP.NET, the access_token is available as a claim:
	
  ```
  ${'<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>'}
  ```

* If you are rolling your own implementation, it will be available through the standard OAuth2 flow:

	1. User logs in and returns to the app with a `code`
	2. The app exchanges the `code` for the `access_token`

  The details of these exchanges are available in the [protocols section](/protocols).

## Unlinking Accounts

To unlink a specific account, POST request to the following url:

`https://${account.namespace}/unlink`

Body should be:

```
{
    access_token: "LOGGED_IN_USER_ACCESS_TOKEN", // Primary identity access_token
    user_id: "LINKED_USER_ID" // (provider|id)
}
```
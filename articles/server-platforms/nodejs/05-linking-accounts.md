---
title: Linking Accounts
description: This tutorial demonstrates how to integrate Auth0 with NodeJS to link accounts
budicon: 345
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '05-Linking-Accounts',
  requirements: [
    'NodeJS 4.3 or superior',
    'Express 4.11'
  ]
}) %>

There may be situations where your users want to log in with multiple accounts that they own. In these cases, you may want to link these accounts together so that they are all reflected in the user's Auth0 profile. For example, if a user has signed up with email and password (which provides very little information about the user), you can ask the user to link their account to an OAuth provider like Facebook or Google to gain access to their social profile.

In this step, we'll modify the application we created in the [Login](/quickstart/server-platforms/nodejs/01-login) step to allow users to link or unlink other OAuth providers to their account.

## Show Linked Accounts Information

The user profile contains an array of identities which consists of profile information from all linked providers. You can verify this by accessing the Auth0 [Users page](${manage_url}/#/users), selecting a user and scrolling down to `identities` under **Identity Provider Attributes**.

This is how a profile looks after linking to Gmail:

![User identities](/media/articles/users/user-identities-linked.png)

If you fetch a profile containing linked accounts, you will have all this information available.

## Linking Accounts

To link accounts, call the [Link a user account](/api/management/v2#!/Users/post_identities) Auth0 API endpoint. To complete the request, you must provide the primary account Auth0 JWT (the token provided when the user logged in), the user id (from the JWT or the profile API) and the JWT of the account you want to link (secondary account).

In order to get the user tokens we must make a small modification to the `Auth0Strategy` configuration so that
the user tokens are stored in the user object.

```js
// app.js

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // Store the profile and tokens in the user object.
    return done(null, {
      profile: profile,
      extraParams: extraParams,
    });
  });
```

We need a new view called `callback.jade` that will help us store the primary user's JWT after a successful login in the client's `localStorage`.

```jade
extends layout

block content

  script.
    // Use local storage to keep track of the user's token and id.
    localStorage.setItem('idToken', '#{user.extraParams.id_token}')
    localStorage.setItem('userId', '#{user.profile.id}')

    window.location.href = '/user/';
```

Modify `routes/index.js` so that the `/callback` route renders the new template.

```js
// routes/index.js

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/url-if-something-fails',
  }),
  function(req, res) {
    res.render('callback', {
      env: env,
      user: req.user,
    });
  });
```

We now need to provide a means for the user to link another account. Let's add a `Link Account` button to `views/user.jade`
that uses `Auth0Lock` to perform the secondary login.

```jade
// views/user.jade

extends layout

block content
  img(src="#{user.profile.picture}")
  h2 Welcome #{user.profile.nickname}!
  br
  a(href='/logout') Logout
  br
  button(onclick="signin()") Link Account

  script.
    var lock = new Auth0Lock(
      '#{env.AUTH0_CLIENT_ID}',
      '#{env.AUTH0_DOMAIN}', {
        auth: {
          redirectUrl: 'http://localhost:3000/link',
          responseType: 'token',
        }
      }
    );

    function signin() {
      lock.show();
    }
```

Let's now add a `/link` endpoint and create the template to be rendered when `/link` is reached.

```jade
// views/link.jade

extends layout

block content
  // We're using jQuery to do the POST request
  script(src="https://code.jquery.com/jquery-3.1.0.min.js")

  script.
    var lock = new Auth0Lock(
      '#{env.AUTH0_CLIENT_ID}',
      '#{env.AUTH0_DOMAIN}'
    );

    lock.on("authenticated", function(authResult) {
      linkAccount(authResult.idToken);
    });

    function linkAccount(secondaryJWT){
      // At this point you can fetch the secondary user_metadata for merging
      // with the primary account. Otherwise it will be lost after linking the accounts
      var primaryJWT = localStorage.getItem('idToken');
      var primaryUserId = localStorage.getItem('userId');
      $.ajax({
        type: 'POST',
        url: 'https://' + '#{env.AUTH0_DOMAIN}' + '/api/v2/users/' + primaryUserId + '/identities',
        data: {
          link_with: secondaryJWT
        },
        headers: {
          'Authorization': 'Bearer ' + primaryJWT
        }
      }).then(function(identities){
        alert('linked!');
        window.location.href = '/user/';
      }).fail(function(jqXHR){
        alert('Error linking Accounts: ' + jqXHR.status + " " + jqXHR.responseText);
      });
    }
```

The `linkAccount()` function is in charge of sending a `POST` request to the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint with both user tokens.

The `/link` endpoint simply renders the template. Add the following route to `routes/index.js`

```js
// routes/index.js

...

router.get('/link',
  ensureLoggedIn,
  function(req, res) {
    res.render('link', {env: env});
  });
```

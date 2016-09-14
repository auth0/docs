---
title: Linking Accounts
description: This tutorial will show you how to integrate Auth0 with NodeJS to link accounts.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nodejs-webapp-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgBranch: 'master',
  pkgPath: '05-Linking-Accounts',
  pkgType: 'server'
}) %>

In some situations, you may want the ability to link multiple user accounts. For example, if a user has signed up with email and password (which provides very little information about the user), you can ask the user to link their account to an OAuth provider like Facebook or Google to gain access to their social profile.

In this step, you will modify the application you created in the [Login](/quickstart/server-platforms/nodejs/01-login) step to allow users to link or unlink other OAuth providers to their account.

## 1. Show Linked Accounts Information

The user profile contains an array of identities which consists of profile information from all linked providers. You can verify this by accessing the Auth0 [Users page](${manage_url}/#/users), selecting a user and scrolling down to `identities` under **Identity Provider Attributes**.

This is how a profile looks after linking to Gmail:

![User identities](/media/articles/users/user-identities-linked.png)

If you fetch a profile containing linked accounts, you will have all this information available.

## 2. Linking Accounts

To link accounts, call the [Link a user account](/api/management/v2#!/Users/post_identities) Auth0 API endpoint. To complete the request, you must provide the primary account Auth0 JWT (the token provided when the user logged in), the user id (from the JWT or the profile API) and the JWT of the account you want to link (secondary account).

In order to get the user tokens we must make a small modification to the `Auth0Strategy` configuration so that
the user tokens are stored in the user object.

```js
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

Add a new view `views/callback.jade` that will help us store the primary user's JWT after a successful login in the client's localStorage.

```jade
extends layout

block content
  script(src="https://cdn.auth0.com/js/lock/10.0/lock.min.js")

  script.
    // Use local storage to keep track of the user's token and id.
    localStorage.setItem('idToken', '#{user.extraParams.id_token}')
    localStorage.setItem('userId', '#{user.profile.id}')

    window.location.href = '/user/';
```

Modify `routes/index.js` so that the `/callback` route renders the new template.

```js
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

We now need to provide a means for the user to link another account, let's add a `Link Account` button to `views/user.jade`
that uses `Auth0Lock` to perform the secondary login.

```jade
extends layout

block content
  script(src="https://cdn.auth0.com/js/lock/10.0/lock.min.js")
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

Let's now add a `/link` endpoint.
First we need to create the template we are going to render when `/link` is reached, create a `views/link.jade` file with the following contents.

```jade
extends layout

block content
  script(src="https://cdn.auth0.com/js/lock/10.0/lock.min.js")
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

The `linkAccount()` function is in charge of sending a `POST` request to the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint with
both user tokens.

The `/link` endpoint simply renders the template.
Add the following route to `routes/index.js`

```js
router.get('/link',
  ensureLoggedIn,
  function(req, res) {
    res.render('link', {env: env});
  });
```

---
name: "Getting Started with Lock 3-- Redirect vs Popup mode"
description: "This screencast shows the two modes Lock has, and how to implement them."
timeInSeconds: 449
videoId: ezt4g1ho7m
---

In this episode, we're going to talk about the two mode Lock has of interacting: redirect mode and popup mode. We'll also talk about how to implement these modes in regular webapps and single-page applications.

The rule of thumb for when to use these modes is determining where you store state in your web application; if your state is stored on the client and page refreshes affect your app's ability to run, popup mode will work with your app. However, **redirect mode is the recommended mode for Lock**, and you can implement it on a single-page application. There are almost no reasons not to use redirect mode when writing a regular web application, as page refreshes are already part of the architecture there.

First, we'll talk about implementing redirect mode on a regular webapp. This will look very familiar to viewers who watched episode 1.

We're going to make some assumptions here: one is that you have routes on your server that manage user state at `/login`, `/logout`, and an oauth-style callback at `/callback`. You can find an example of these routes [in our quickstarts for regular web applications](https://auth0.com/docs/quickstart/webapp/) We also assume you have added `http://localhost:3000/callback` to your Allowed Callbacks list in the App Dashboard.

As for your javascript, you need to keep in mind that *we do not explicitly tell Lock which mode it needs to run in.* Instead, we send a `callbackURL` parameter in our options object in order to designate redirect mode. Your `lock.show()` call should look something like this:

```javascript
var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

lock.show({
  callbackURL: 'http://localhost:3000/callback'
});
```
That's it! You can now log in with redirect mode in regular webapps. Next, we'll look at implementing popup mode in a single-page application.

In order to do this, I made some modifications to my jade template:

```jade
  h1= title
  p Welcome to #{title}
    span.username
  img.user-avatar
  br
  button#login Login
  button#logout Logout
```

This is because we'll be staying on this page instead of being redirected to a user page like the last example. As for the javascript, in order to set Lock into popup mode, you pass a callback as the second parameter to `lock.show()`:

```javascript
lock.show({}, function(err, profile, id_token){
  if(err){
    console.log('error logging in', err);
    return;
  }
  $('#login').hide();
  $('#logout').show();
  $('.username').html(', ' + profile.nickname + '!');
  $('.user-avatar').attr('src', profile.picture);   
});
```

This callback recieves an error `err` (`null` if successful), a `profile` object representing our logged-in user, and an `id_token`: this is the JWT that will authenticate your user, and is useful if you will be making calls to APIs that you protect with JWT authentication. You can then modify the DOM, or your application state, or whatever you need with the profile information. 

**Please remember that redirect mode is the recommended use of Lock [due to browser compatibility issues](https://auth0.com/docs/libraries/lock/authentication-modes#popup-mode). Please only use popup mode if you must.**

Finally, we'll talk about implementing redirect mode in a single-page application. The best way to go about this is to check your application hash for an ID token on your callback page, then, if it is found, use that ID token to get the user's profile from Auth0. To parse and use the ID token from the hash, Lock provides `lock.parseHash()` and `lock.getProfile()`:

```javascript
var hash = lock.parseHash(window.location.hash);

if(hash){
  if(hash.error){
    console.log('error logging in.');
  }
  if(hash.id_token){
    lock.getProfile(hash.id_token, function(err, profile){
      if(err){
        console.log('error fetching profile!', err);
      } else {
        $('#login').hide();
        $('#logout').show();
        $('.username').html(', ' + profile.nickname + '!');
        $('.user-avatar').attr('src', profile.picture);
      }
    });
  }
}
```

To finish this, we'll need to modify our `lock.show()` call. First, we'll set the `callbackURL` to the URL of our single-page application. We'll set the `responseType` to `token`-- this usually defaults to `code`, but we need an ID token in order to get the user profile.

```javascript
lock.show({
  callbackURL: 'http://localhost:3000/',
  responseType: 'token'
});
```

And now you have redirect mode set up on your single-page application!

In the next episode of this series, we'll talk about customizing Lock's UI further to suit your application's needs.

I'm Kassandra with Auth0, thanks for reading!

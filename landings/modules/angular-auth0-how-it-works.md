---
public: false
budicon: 330
color: "#4E92DF"
title: "AngularJS Authentication with Auth0 - How It Works"
---

With Auth0, your AngularJS app only needs to talk to our API when the user logs in. All other API calls go directly to your server as they normally would.

Using either our Lock Widget or your own custom login screen, your users send their credentials to our API to be authenticated. Upon success, a JWT is returned and saved in their browser’s local storage.

```js
auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }
});
```

API endpoints that you wish to secure are protected with middleware that requires a valid JWT to be sent in HTTP requests. The user’s JWT is sent as an `Authorization` header and is verified against your secret key. A `jwtInterceptor` is configured to send the user’s JWT on all requests.

```js
jwtInterceptorProvider.tokenGetter = ['store', function(store) {
  // Return the saved token
  return store.get('token');
}];

$httpProvider.interceptors.push('jwtInterceptor');
```
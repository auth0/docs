---
section: libraries
title: Migrating from Lock v9 to v11
description: How to migrate from Lock v9 to v11
toc: true
---
# Migrating from Lock v9 to v11

This guide includes all the information you need to update your Lock 9 applications to [Lock 11](/libraries/lock).

## Migration Steps

Given that Lock 10 is very similar to Lock 11 you can read the [Lock 9 to Lock 10 migration guide](/libraries/lock/v10/migration-guide).

Building Single Page Applications with Lock 9 has some key differences with the way they should be built in Lock 11. Lock 11 uses OIDC conformant APIs that are more secure, and some of the coding patterns with Lock 9 need to be changed.

<%= include('../../_includes/_get_lock_latest_version') %>

### Using Lock in SPAs with Popup Mode

In Lock 9 the code to use `popup mode` looked like:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
function login()
{
    lock.show({
            responseType : "token",
            authParams: {
                scope: 'openid email offline_access'
            }
        },
        function (err, profile, id_token, access_token, state, refresh_token) {
            if (!err) {
                setSession(profile, id_token, access_token, refresh_token);
                lock.getProfile(hash.id_token, function(err, userInfo) {
                    if (!err) {
                        /// use the userInfo
                    }
                });
            }
        }
    })
}
```

In Lock 11, the code should look like:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
        {
            popup: true,
            auth: {
                responseType: 'token id_token',
                audience: 'https://' + '${account.namespace}' + '/userinfo',
                params: {
                    scope: 'openid email profile'
                }
            }
        }
    );

lock.on('authenticated', function(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);

        lock.getUserInfo(authResult.accessToken, function(err, userInfo) {
             if (!err) {
                // use the userInfo
            }
        });
    }
});
function login()
{
    lock.show()
}
```

Note that the parameters that were passed to `show()` are used to initialize Lock, and that the callback specified in `show()` is replaced by an `authenticated` event handler. 

### Using Lock in SPAs with Redirect Mode

In Lock 9 the code to use `redirect mode` looked like:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
var hash = lock.parseHash();

if (hash) {
    if (!hash.error) {
        setSession(hash.profile, hash.id_token, hash.access_token, hash.refresh_token);

        lock.getProfile(hash.id_token, function(err, userInfo) {
            if (!err) {
                // use the userInfo
            }
        });
    } 
}

function login() {
    lock.show({
        callbackURL: '${account.callback}',
        responseType : "token",
        authParams: {
            scope: 'openid email offline_access'
        }
    });
}
```

In Lock 11, the code should look like:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
        {
            auth: {
                redirectUrl: '${account.callback}',
                responseType: 'token id_token',
                params: {
                    scope: 'openid email profile'
                }
            }
        }
    );

lock.on('authenticated', function(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        // use authResut.idTokenPayload for profile information
    }
});

function login() {
    lock.show()
}
```

Note that the parameters that were passed to `show()` are used to initialize Lock, and that instead of calling parseHash(), you need to write an `authenticated` event handler.

### Using Lock in Web Applications

When using Lock 9 for Web Applications, the code would look like:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

function login() {
    lock.show({
     auth: {
      redirectUrl: '${account.callback}',
      responseType: 'code',
      params: {
        scope: 'openid profile email' 
      }
    }
  }
```

In Lock 9, the code should look like:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    {
        auth: {
            redirectUrl: '${account.callback}',
            responseType: 'code',
            params: {
                scope: 'openid email profile'
            }
        }
    }
);

function login() {
    lock.show()
}
```

Note that the parameters that were passed to `show()` are used to initialize Lock.

<%= include('../../_includes/_configure_embedded_login') %>

### Migrating from Legacy Authentication Flows

The OIDC-conformant flows disallow certain practices that were common when developing applications with Lock 9, like using [Refresh Tokens](tokens/refresh-token), [ID Tokens](/tokens/id-token) to call APIs, and accessing non-standard claims in the user profile.

Follow the steps in the [Migration from Legacy Authentication Flows](/libraries/lock/v11/migration-legacy-flows) to learn what changes do you need to make in your application.

<%= include('../../_includes/_change_get_profile') %>

## Behavioral Changes in Lock v11

<%= include('../../_includes/_hosted_pages') %>
<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_default_values_lock') %>
<%= include('../../_includes/_ip_ranges') %>

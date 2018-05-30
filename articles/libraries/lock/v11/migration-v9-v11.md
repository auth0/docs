---
section: libraries
title: Migrating from Lock v9 to v11
description: How to migrate from Lock v9 to v11
toc: true
tags:
  - libraries
  - lock
  - migrations
---
# Migrating from Lock v9 to v11

This guide includes all the information you need to update your Lock v9 applications to [Lock v11](/libraries/lock).

## Migration Steps

Given that Lock v10 is very similar to Lock v11 you can read the [Lock v9 to Lock v10 migration guide](/libraries/lock/v10/migration-guide).

Building Single Page Applications with Lock v9 has some key differences with the way they should be built in Lock v11. Lock v11 uses OIDC conformant APIs that are more secure, and some of the coding patterns with Lock v9 need to be changed.

<%= include('../../_includes/_get_lock_latest_version') %>

### Using Lock in SPAs with Popup Mode

In Lock v9 the code to use `popup mode` looked similar to the below example.

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

In Lock v11, the code would instead use the following format.

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

Note that the parameters that were passed to `show()` in Lock v9 are used to initialize Lock in Lock v11, and that the callback specified in `show()` is replaced by an `authenticated` event handler. 

### Using Lock in SPAs with Redirect Mode

In Lock v9 the code to use `redirect mode` looked similar to the below example.

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

In Lock v11, the code should instead use the following format.

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
        // use authResult.idTokenPayload for profile information
    }
});

function login() {
    lock.show()
}
```

Note that the parameters that were passed to `show()` in Lock v9 are used to initialize Lock in Lock v11, and that instead of calling `parseHash()`, you need to write an `authenticated` event handler.

### Using Lock in Web Applications

When using Lock v9 for Web Applications, the code would be similar to the below example.

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

In Lock v11, the code should instead use the following format.

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

Note that, once more, the parameters that were passed to `show()` in Lock v9 are used to initialize Lock in Lock v11.

<%= include('../../_includes/_configure_embedded_login', { library : 'Lock v11'}) %>
<%= include('../../_includes/_legacy_flows') %>
<%= include('../../_includes/_change_get_profile') %>

## Behavioral Changes in Lock v11

<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_default_values_lock') %>
<%= include('../../_includes/_ip_ranges') %>

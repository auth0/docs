---
section: libraries
title: Migrating from Lock v9 to v11
description: How to migrate from Lock v9 to v11
toc: true
---
# Migrating from Lock v9 to v11

This guide includes all the information you need to update your Lock 9 applications to [Lock 11](/libraries/lock).

## Migration Steps

Given that Lock 10 is very similar to Lock 11 you can read the [Lock 9 to Lock 10 migration guide](/libraries/lock/v10/migration-guide) for a complete description of the changes. On the other hand, the way you build Single Page Applications with Lock 9 has some key differences with the way they should be built in Lock 11. Lock 11 uses OIDC conformant APIs that are more secure, and some of the coding patterns with Lock 9 need to be changed. This guide will go through those scenarios which are not covered.

<%= include('../../_includes/_get_lock_latest_version') %>

### Using Lock in Popup Mode

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
                audience: 'https://aaguiar.auth0.com/userinfo',
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

Note that the parameters that were passed to 'show()' are used to initialize Lock, and that the callback specified in 'show()' is replaced by an 'authenticated' event handler. 

### Using Lock in Redirect Mode

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

function login()
{
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

function login()
{
    lock.show()
}
```

Note that the parameters that were passed to 'show()' are used to initialize Lock, and that instead of calling parseHash(), you need to write an 'authenticated' event handler.

### Handling Refresh Tokens

Lock 9 applications used [Refresh Tokens](tokens/refresh-token) and the `refreshToken()` function as a way to get new tokens upon expiration. The code would be like:

```js
function renewToken() {
    refresh_token = localStorage.getItem('refresh_token');   // Assumes the refresh_token is stored in localStorage
    lock.getClient().refreshToken(refresh_token, function (err, delegationResult) {
        if (!err)
        {
            var expires_at = JSON.stringify(delegationResult.expires_in* 1000 + new Date().getTime());
             // Assumes you want to keep the time the token will expire and the id_token in localStorage
            localStorage.setItem('expires_at', expires_at); 
            localStorage.setItem('id_token', delegationResult.id_token);
        }
    );
}
```

In Lock 11 you need to use [Silent Authentication](/api-auth/tutorials/silent-authentication) and `checkSession()`. The code would be like  'https://' + '${account.namespace}' + '/userinfo',

```js
function renewToken() {
    lock.checkSession({}, function(err, result) {
        if (!err) {
            var expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
            // Assumes you want to store access token, id token and expiration time in local Storage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
        }
    });
}
```

Check the  [Silent Authentication docs](/api-auth/tutorials/silent-authentication) for more information on how to fully implement it in different SPA frameworks.

### Calling APIs

Most Lock 9 applications an [id-token](/tokens/id-token) to invoke APIs. You can keep doing that in Lock 11 applications, but [it is a bad practice](/api-auth/why-use-access-tokens-to-secure-apis) and we recommend you to start using [Access Tokens](/tokens/access-token).

You can look at 'Calling an API' section of our [SPA Quickstarts]((/quickstarts/backend) for more information on how to call APIs from SPAs.

You will also need to migrate your backend API implementation to use access_tokens. You can look at our [API Quickstarts](/quickstarts/backend) for instructions on how to do it.

<%= include('../../_includes/_configure_embedded_login') %>
<%= include('../../_includes/_change_get_profile') %>
<%= include('../../_includes/_oidc_conformant') %>

## Behavioral Changes in Lock v11

<%= include('../../_includes/_hosted_pages') %>
<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_default_values_lock') %>
<%= include('../../_includes/_ip_ranges') %>

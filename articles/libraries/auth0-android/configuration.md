---
section: libraries
toc: true
description: How to configure Auth0.Android to meet your application's needs
tags:
  - libraries
  - android
---
# Auth0.Android Configuration Options

Auth0.Android can be configured with a variety of options, listed below.

## withConnection

The `withConnection` option allows you to specify a connection that you wish to authenticate with.

```java
WebAuthProvider.init(account)
                .withConnection("twitter")
                .start(this, authCallback);
```

## useCodeGrant

Code grant is the default mode, and will always be used unless calling `useCodeGrant` with `false`, or unless the device doesn't support the signing/hashing algorithms.

Before you can use `Code Grant` in Android, make sure to go to your [Dashboard](${manage_url}/#/applications) and check in the application's settings that `Application Type` is `Native`.

```java
WebAuthProvider.init(account)
                .useCodeGrant(true)
                .start(this, authCallback);
```

## withScope

Using scopes can allow you to return specific claims for specific fields in your request. Adding parameters to `withScope` will allow you to add more scopes. You should read our [documentation on scopes](/scopes) for further details about them.

```java
WebAuthProvider.init(account)
                .withScope("openid email profile")
                .start(this, authCallback);
```

::: panel Scope
Note that the default scope used is `openid`
:::

## withConnectionScope

There may be times when you need to authenticate with particular connection scopes, or permissions, from the Authentication Provider in question. Auth0 has [documentation on setting up connection scopes for external Authentication Providers](/tutorials/adding-scopes-for-an-external-idp). However, if you need specific access for a particular situation in your app you can do so by passing parameters to `withConnectionScope`. A full listing of available parameters can be found in that connection's settings in your [Dashboard](${manage_url}), or from the Authentication Providers's documentation. The scope requested here is added on top of the ones specified in the connection's settings in the Dashboard.

```java
WebAuthProvider.init(account)
                .withConnectionScope("email", "profile", "calendar:read")
                .start(this, authCallback);
```

## withParameters

To send additional parameters on the authentication, use `withParameters`:

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
WebAuthProvider.init(account)
                .withParameters(parameters)
                .start(this, authCallback);
```

## withScheme

If you are not using Android "App Links" or you want to use a different scheme for the redirect URI, then use `withScheme`. Note that you'll need to update the `auth0Scheme` Manifest Placeholder in the `app/build.gradle` file and the whitelisted **Allowed Callback URLs** on the [Dashboard](${manage_url}) in the Application's settings to match the chosen scheme.

```java
WebAuthProvider.init(account)
                .withScheme("myapp")
                .start(this, authCallback);
```

::: note
Scheme must be lowercase!
:::

## withAudience

To provide an audience, use `withAudience`.

```java
WebAuthProvider.init(account)
                .withScope("openid")
                .withAudience("https://${account.namespace}/userinfo")
                .start(this, authCallback);
```

## withState

By default a random [state](/protocols/oauth2/oauth-state) is always generated and sent. If you need to use a custom value instead, use `withState`:

```java
WebAuthProvider.init(account)
                .withState("my-custom-state")
                .start(this, authCallback);
```

## withNonce

By default a random [nonce](/api-auth/tutorials/nonce) is generated and sent when the response type includes `id_token`. If you need to use a custom value instead, use `withNonce`:

```java
WebAuthProvider.init(account)
                .withNonce("my-custom-nonce")
                .start(this, authCallback);
```

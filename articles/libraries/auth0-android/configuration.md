```java
WebAuthProvider.init(account)
                .withAudience("https://${account.namespace}/userinfo")
                .start(this, authCallback);
```

The authentication result will be delivered to the callback.

### Authenticate with a specific Auth0 connection

The `withConnection` option allows you to specify a connection that you wish to authenticate with.

```java
WebAuthProvider.init(account)
                .withConnection("twitter")
                .start(this, authCallback);
```

### Authenticate using a code grant with PKCE

Code grant is the default mode, and will always be used unless calling `useCodeGrant` with `false`, or unless the device doesn't support the signing/hashing algorithms.

Before you can use `Code Grant` in Android, make sure to go to your [client's section](${manage_url}/#/applications) in dashboard and check in the Settings that `Client Type` is `Native`.

```java
WebAuthProvider.init(account)
                .useCodeGrant(true)
                .start(this, authCallback);
```

### Authenticate using a specific scope

Using scopes can allow you to return specific claims for specific fields in your request. Adding parameters to `withScope` will allow you to add more scopes. You should read our [documentation on scopes](/scopes) for further details about them.

```java
WebAuthProvider.init(account)
                .withScope("openid email profile")
                .start(this, authCallback);
```

::: panel Scope
Note that the default scope used is `openid`
:::

### Authenticate using specific connection scopes

There may be times when you need to authenticate with particular connection scopes, or permissions, from the Authentication Provider in question. Auth0 has [documentation on setting up connection scopes for external Authentication Providers](/tutorials/adding-scopes-for-an-external-idp), but if you need specific access for a particular situation in your app, you can do so by passing parameters to `withConnectionScope`. A full listing of available parameters can be found in that connection's settings in your dashboard, or from the Authentication Providers's documentation. The scope requested here is added on top of the ones specified in the Dashboard's Connection settings.

```java
WebAuthProvider.init(account)
                .withConnectionScope("email", "profile", "calendar:read")
                .start(this, authCallback);
```

### Authenticate using custom authentication parameters

To send additional parameters on the authentication, use `withParameters`:

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
WebAuthProvider.init(account)
                .withParameters(parameters)
                .start(this, authCallback);
```

### Use a custom scheme for the Redirect URI

If you're not using Android "App Links" or you just want to use a different scheme for the _redirect uri_ then use `withScheme`. Note that you'll need to update the `auth0Scheme` Manifest Placeholder in the `app/build.gradle` file and the whitelisted Callback URL in the dashboard to match the chosen scheme:

```java
WebAuthProvider.init(account)
                .withScheme("myapp")
                .start(this, authCallback);
```

**Scheme must be lowercase**

### Specify Audience

```java
WebAuthProvider.init(account)
                .withScope("openid")
                .withAudience("https://${account.namespace}/userinfo")
                .start(this, authCallback);
```

### Specify state

By default a random state is always sent. If you need to use a custom one, use `withState`:

```java
WebAuthProvider.init(account)
                .withState("my-custom-state")
                .start(this, authCallback);
```

### Specify nonce

By default a random nonce is sent when the response type includes `id_token`. If you need to use a custom one, use `withNonce`:

```java
WebAuthProvider.init(account)
                .withNonce("my-custom-nonce")
                .start(this, authCallback);
```

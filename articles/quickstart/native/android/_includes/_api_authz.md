## Configuring Your Application

<%= include('./_gradle.md') %>

## Configuration

First, you need to update `AndroidManifest.xml` with the following:

```xml
<activity android:name=".MainActivity"
  android:launchMode="singleTask">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:host="${account.namespace}"
            android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
            android:scheme="demo" />
    </intent-filter>
</activity>
```

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.


Also include following permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Finally, open the Dashboard and make sure the Allowed Callback URLs for your application contains a URL with the following format:

`demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback`

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.


## Initiate Authentication and Authorization

First create an instance of Auth0 with your application information:

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
account.setOIDCConformant(true);
```

Next, you need to use the `WebAuthProvider` to initiate the authentication and authorization. Note that we customize the scheme to `demo` as required by the Callback URL defined also in the intent-filter.

```java
public void startAuth() {
    WebAuthProvider.login(account)
        .withConnection("Username-Password-Authentication")
        .withScope("openid profile {API_SCOPES}")
        .withAudience("${apiIdentifier}")
        .withScheme("demo")
        .start(MainActivity.this, authCallback);
}

private AuthCallback authCallback = new AuthCallback() {
    @Override
    public void onSuccess(Credentials credentials) {
        // here you have access to the tokens
        // payload.getAccessToken()
        // payload.getIdToken()
        // payload.getRefreshToken()
    }

    @Override
    public void onFailure(Dialog dialog) {
        // Called when the failure reason is displayed in a android.app.Dialog
    }

    @Override
    public void onFailure(AuthenticationException exception) {
        //Called with an AuthenticationException that describes the error
    }
};
```

The `audience` parameter should contain your API identifier from the Dashboard. If you don't send this, the runtime will take it from the tenant settings (`tenant.default_audience` or you can set it in the Dashboard). The `scope` parameter should include one or more scopes you defined in the Dashboard for your API, in addition to any of the standard [OpenID scopes](https://auth0.com/docs/scopes).

You also need to override the `onNewIntent` method in your Activity to resume the flow once the user has finished in the Browser:

```java
@Override
protected void onNewIntent(Intent intent) {
    if (WebAuthProvider.resume(intent)) {
        return;
    }
    super.onNewIntent(intent);
}
```

## Making an Authenticated API Call

Use the Access Token to invoke your Resource Server (API). In this example we are using the [Unirest library for Java](http://unirest.io/java.html):

```java
HttpResponse<String> response = Unirest.get("https://someapi.com/api")
    .header("content-type", "application/json")
    .header("Authorization", "Bearer {ACCESS_TOKEN}")
    .asString();
```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json]. You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quickstart tutorial. More information can be found [in our documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).

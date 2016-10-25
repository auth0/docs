## Configuring Your Application

## Dependences

This quickstart uses the Auth0.Android SDK to help you add authentication and API authorization to your Android app. To install it, simply add the following line to your module build.gradle file:

```gradle
dependencies {
    compile "com.auth0.android:auth0:1.1.0"
}
```

Next, Syncronize bundle.gradle in Android Studio or run `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).


## Configuration

First, you need to update `AndroidManifest.xml` with the following:

```xml
...

<activity android:name=".MainActivity" android:launchMode="singleTask">
    <intent-filter>
...


        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:host="{YOUR AUTH0 DOMAIN}"
            android:pathPrefix="/android/{YOUR PACKAGE NAME}/callback"
            android:scheme="https" />

...

    </intent-filter>
</activity>

...
```

Also include following permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Finally, open the Dashboard and make sure the Allowed Callback URLs for your client contains a URL with the following format:

`https://{YOUR_AUTH0_DOMAIN}/android/{YOUR PACKAGE NAME}/callback`

## Initiate Authentication and Authorization

First create an instance of Auth0 with your client information:

```java
Auth0 account = new Auth0("{YOUR_CLIENT_ID}", "{YOUR_DOMAIN}");
```

Next, you need to use the WebAuthProvider to initate the authentication and authorization. You also need to define a constant like `WEB_REQ_CODE` that holds the request code (an `int`), that will be sent back with the intent once the auth is finished in the webview:

```java
public static final int WEB_REQ_CODE=1234;

public void startAuth() {

    Map<String, Object> params = new HashMap<String, Object>();
    params.put("audience", "{YOUR API IDENTIFIER}");

    WebAuthProvider.init(account)
            .withConnection("Username-Password-Authentication")
            .withScope("openid profile {API SCOPES}")
            .withParameters(params)
            .useCodeGrant(true)
            .start(MainActivity.this, authCallback , WEB_REQ_CODE);
}

private AuthCallback authCallback = new AuthCallback() {
    @Override
    public void onSuccess(Credentials payload) {
        // here you have access to the tokens
        // payload.getAccessToken()
        // payload.getIdToken()
        // payload.getRefreshToken()
    }

    @Override
    public void onFailure(Dialog d) {
        // Called when the failure reason is displayed in a android.app.Dialog
    }

    @Override
    public void onFailure(AuthenticationException e) {
        //Called with an AuthenticationException that describes the error
    }
};
```

The `audience` parameter should contain your API identifier from the Dashboard. If you don't send this, the runtime will take it from the tenant settings (`tenant.default_audience` or you can set it in the Dashboard). The `scope` parameter should include one or more scopes you defined in the Dashboard for your API, in addition to any of the standard [OpenID scopes](https://auth0.com/docs/scopes).

You also need to override the `onNewIntent` method in your Activity to resume the flow once the user has finished in the WebView:

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

Use the `access_token` to invoke your Resource Server (API):

```java
HttpResponse<String> response = Unirest.get("https://someapi.com/api")
  .header("content-type", "application/json")
  .header("Authorization", "Bearer {ACCESS_TOKEN}")
  .asString();
```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json]. You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quickstart tutorial. More information can be found [in our documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).
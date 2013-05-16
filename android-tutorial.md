# Using Auth0 with Android

Integrating Auth0 with Android based apps relies on the common method of instantiating a [WebView]() inside the native app to drive all interactions with the authentication providers, and then extracting security tokens once they become available. 

Because we are using the `implicit flow`, the access token is sent as an URL fragment in the final redirect:

	@@account.callback@@#access_token=123456789098765432&id_token=324314355465564534314...

This sample works by intercepting the final redirect to the defined callback address (`@@account.callback@@`) and parsing the URL to extract the tokens.

> The `access_token` is a regular OAuth Access Token. `id_token` is a Json Web Token (JWT) and it is signed by Auth0. If you have the __Windows Azure Mobile Services__ (WAMS) add-on enabled, Auth0 will sign the JWT with WAMS `masterkey`. Also the JWT will be compatible with the format expected by WAMS.

##Before you start

1. You will need an Android development environment.
2. We also assume you have some connection enabled in your Auth0 account. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.
3. [Get the sample](https://github.com/auth0/Auth0-Android-Sample).

> The easiest way is to run `git clone https://github.com/auth0/Auth0-Android-Sample.git` on your terminal.

##Open the project and update your settings

Open the project and locate the file `MainActivity.java`. Replace these constants with:

```java
static final String ClientID = "@@account.clientId@@";
static final String Tenant = "@@account.tenant@@";
static final String Callback = "@@account.callback@@";
static final String Connection = "google-oauth2";  //change to "paypal", "linkedin", etc
```
##Run the sample

The sample shows two buttons for Login. The one labeled __Login__, will initiate the login process with the connection specified in the constant `Connection` (google_oauth2 in this sample). The button labeled __Login With Widget__ will display the __Auth0 Login Widget__ and allow you to choose any configured Identity Provider.

![](img/android-tutorial.png)

##Using the library

All functionality is encapsulated in the `AuthenticationActivity` class. Calling it requires just a couple lines of code:

```java
Intent authActivity = new Intent(MainActivity.this,
                                 com.auth0.sdk.auth0sample.AuthenticationActivity.class);

AuthenticationActivitySetup setup;
//setup = new AuthenticationActivitySetup(Tenant, ClientID, Callback, Connection);
setup = new AuthenticationActivitySetup(Tenant, ClientID, Callback);

authActivity.putExtra(AuthenticationActivity.AUTHENTICATION_SETUP, setup);

startActivityForResult(authActivity, AuthenticationActivity.AUTH_REQUEST_COMPLETE);
```

`AuthenticationActivity` is an [Android Activity]() and responses are handled with the standard `onActivityResult` method. If authentication is successful, `resultCode` will be equal to `RESULT_OK`, and an object of type `AuthenticationActivityResult` will be available. It contains two properties: `access_token` and `JsonWebToken`:

```java
 @Override
protected void onActivityResult(int requestCode, int resultCode, Intent authActivityResult) {
    super.onActivityResult(requestCode, resultCode, authActivityResult);

    switch(requestCode)
    {
        case AuthenticationActivity.AUTH_REQUEST_COMPLETE:
            if(resultCode==RESULT_OK)
            {
                AuthenticationActivityResult result;
                result = (AuthenticationActivityResult) authActivityResult.getSerializableExtra(AuthenticationActivity.AUTHENTICATION_RESULT);

                ((TextView) findViewById(R.id.access_token)).setText(result.accessToken);
                ((TextView) findViewById(R.id.jwt)).setText(result.JsonWebToken);
            }
            break;
    }
}
```

> Remember that the `returnUrl` parameter must also be defined in your Auth0 [settings](@@uiURL@@/#/settings). This sample uses __https://localhost/client__

Congratulations!

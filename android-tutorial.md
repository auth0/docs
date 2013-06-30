# Using Auth0 with Android

Integrating Auth0 with Android based apps relies on the common method of instantiating a [WebView](http://developer.android.com/reference/android/webkit/WebView.html) inside the native app to drive all interactions with the authentication providers, and then extracting security tokens once they become available. 

##Before you start

1. You will need an Android development environment ([Eclipse with ADT](http://developer.android.com/sdk/installing/studio.html#download) or [Android Studio](http://developer.android.com/sdk/installing/studio.html)).
2. Download the [zip](https://github.com/auth0/Auth0-Android/archive/master.zip) or [clone from github](https://github.com/auth0/Auth0-Android)

##Open the project and update your settings

Open the project and locate the file `MainActivity.java`. Replace these constants with:

```java
static final String ClientID = "@@account.clientId@@";
static final String Tenant = "@@account.tenant@@";
static final String Callback = "@@account.callback@@";
static final String Connection = "google-oauth2";  //change to "paypal", "linkedin", etc or leave empty to show the widget
```
##Run the sample

The sample shows two buttons for Login. The one labeled __Login__, will initiate the login process with the connection specified in the constant `Connection` (google-oauth2 in this sample). The button labeled __Login With Widget__ will display the __Auth0 Login Widget__ and allow you to choose any configured Identity Provider.

![](https://dl.dropboxusercontent.com/u/21665105/android.png)

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

`AuthenticationActivity` is an [Android Activity](http://developer.android.com/reference/android/app/Activity.html) and responses are handled with the standard `onActivityResult` method. If authentication is successful, `resultCode` will be equal to `RESULT_OK`, and an object of type `AuthenticationActivityResult` will be available. It contains two properties: `access_token` and `JsonWebToken`:

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

                // result have two properties `accessToken` and `JsonWebToken`. You can use the `accessToken` to call the Auth0 API and retrieve the profile of the user that just logged in
                // the `JsonWebToken` is a signed JSON that can be sent to your APIs
                
                String userInfoUrl = String.format("https://api.auth0.com/userinfo?access_token=%s", result.accessToken);
                new AsyncTask<String, Void, JSONObject>() {
                    @Override
                        protected JSONObject doInBackground(String... url) {
                           JSONObject json = RestJsonClient.connect(url[0]);
		      
                           return json;
                        }
		    
                    @Override
                    protected void onPostExecute(JSONObject user) {
                        try {
                                ((TextView) findViewById(R.id.user)).setText(user.toString(2));
                        } catch (JSONException e) {
                                e.printStackTrace();
                        }
		            }
		        }.execute(userInfoUrl);
            }
            break;
    }
}
```

Congratulations!

> If you want to connect with a __Windows Azure Mobile Services__ (WAMS) backend, you should create a Windows Azure Mobile application on Auth0 (New App button). When you do that, Auth0 will sign the JsonWebToken with WAMS' `masterkey`, and you will be able to call their endpoints. Notice, that you can delete the Android app on Auth0 and use the WAMS instead and change the `client_id` parameter.

Are you an Android ninja?

> __HEADS UP__ Help us to build an awesome [Android SDK](https://github.com/auth0/Auth0-Android) and get a free license! Checkout the issues in the GitHub project and provide feeback and/or pull requests.

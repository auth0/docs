# Setup the “Continue with Facebook” button

## Requesting Facebook permissions
Your application is already able to sign in with Facebook. But in order to have a rich user profile, the permissions with which the `LoginButton` is set up need to be updated.

Set the requested permissions to "public_profile" and "email". This way, the user email will also be included as part of the response, provided the access request is accepted by the user.

${snippet(meta.snippets.facebookButtonPermissions)}

Now, in order to kick off the authentication process with Auth0, create a new method where you will prepare the payload to be sent. 

In the sample, the method was named `performLogin`. Call this method from the login callback's `onSuccess` method, as shown below:

${snippet(meta.snippets.facebookButtonConfig)}

# Integrate Facebook

When you sign in with Facebook at Auth0, the backend will perform some checks in the background to ensure the user is who they say they are. To achieve this, it needs to be provided with a "Session Token". 

Furthermore, if a user needs to be created on Auth0 to represent this Facebook user, it will require some of their information such as their name, last name and email. The email, if provided, can be automatically verified by the backend and marked as such on the Auth0 user profile. 

In order to obtain the Session Token and the user profile, two additional requests need to be made against the Facebook API.

## Fetch Facebook session token
Make use of the Facebook SDK's `GraphRequest` class to create a new GET request against their API using the grant type `fb_attenuate_token`. The request path is `oauth/access_token`. Set the access token received upon log in as the `fb_exchange_token` parameter, and don't forget to indicate the Facebook's app id value as the `client_id` parameter. This value comes from the Facebook Developer's dashboard and should already be in use in your application in order to have integrated Facebook Sign In successfully.

Put the logic from this step on its own method. You will be calling it later from the previously added method.

```kotlin
private fun fetchSessionToken(token: String, callback: (String?) -> Unit) {
    val params = Bundle()
    params.putString("grant_type", "fb_attenuate_token")
    params.putString("fb_exchange_token", token)
    params.putString("client_id", getString(R.string.facebook_app_id))

    val request = GraphRequest()
    request.parameters = params
    request.graphPath = "oauth/access_token"
    request.callback = GraphRequest.Callback { response ->
        if (response.error != null) {
            Log.e(TAG, "Failed to fetch session token. ${response.error.errorMessage}")
            callback.invoke(null)
            return@Callback
        }
        val fbSessionToken = response.jsonObject.getString("access_token")
        callback.invoke(fbSessionToken)
    }
    request.executeAsync()
}
```

## Fetch Facebook user profile
Just like in the step above, create another `GraphRequest`, this time for fetching the user profile. The path will match the Facebook's user id value taken from the Facebook login result. Set the access token received upon log in as the `access_token` parameter, and indicate the `fields` from the user profile that you'd like to obtain back in the response. These are directly tied to the Facebook `LoginButton` permissions that were configured at the begginning. When a permission is optional, the user must first consent to give access to it. For the purpose of signing up a user at Auth0, their full name and email will suffice. 

```kotlin
private fun fetchUserProfile(token: String, userId: String, callback: (String?) -> Unit) {
    val params = Bundle()
    params.putString("access_token", token)
    params.putString("fields", "first_name,last_name,email")

    val request = GraphRequest()
    request.parameters = params
    request.graphPath = userId
    request.callback = GraphRequest.Callback { response ->
        if (response.error != null) {
            Log.w(TAG, "Failed to fetch user profile: ${response.error.errorMessage}")
            callback.invoke(null)
            return@Callback
        }
        callback.invoke(response.rawResponse)
    }
    request.executeAsync()
}
```


# Integrate Auth0

Now that the required artifacts have been obtained you are ready to trade them for Auth0 user credentials. Before getting there, you must set up the SDK to make that last request.

## Get your application keys
Open the Auth0 dashboard at https://manage.auth0.com/. Go to the "Applications" section and select the existing application in which you had enabled "Sign in with Facebook". If you need help with this step, make sure to check the requirements listed at the top of this article.

Take the **Domain** and **Client ID** values from the application settings page. These are required by the SDK to properly initialize and communicate against Auth0.

Go ahead and create two new resources in your Android application's `strings.xml` file to store them. The name of the keys must match the ones used below:

```xml
<resources>
    <string name="com_auth0_domain">{{TENANT}}</string>
    <string name="com_auth0_client_id">{{CLIENT_ID}}</string>
</resources>
```

## Install the Auth0 SDK
In your Android application, add this line to the `app/build.gradle` file

```gradle
dependencies {
    implementation 'com.auth0.android:auth0:1.+'
}
```

If your application does not plan to make use of the Web Authentication module provided by the SDK, you will need to remove the unused activity from the `AndroidManifest.xml` file to prevent Manifest Placeholder issues. That can be achieved by adding an activity declaration and annotating it with `tools:node="remove"`.

```xml
<application>
<!-- Add the activity declaration line below -->
  <activity
    android:name="com.auth0.android.provider.AuthenticationActivity"
  tools:node="remove" />
  
</application>
```

However, if you do plan to support Web Authentication, head over [here](https://auth0.com/docs/libraries/auth0-android#authentication-via-universal-login) to learn how to declare the Manifest Placeholders.

Now is time to run the Gradle Sync task in order to refresh the project and its dependencies.
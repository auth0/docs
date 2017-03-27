---
title: Calling APIs
description: This tutorial will show you how to use the Auth0 tokens to make authenticated API calls.
seo_alias: android
budicon: 546
---

This tutorial demonstrates how to use a previously saved token to authenticate your API calls.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '08-Calling-APIs',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

You should already know how to manage the `Credentials` object, as explained in the [Session Management](03-session-handling) tutorial.

## Get a Token

Your first step is to get the `Credentials` object, i.e. using Lock.

```java
private LockCallback callback = new AuthenticationCallback() {
  @Override
  public void onAuthentication(Credentials credentials) {
    // Save your newly obtained credentials
  }

  ...

};
```

## Attach the Token

First, prepare the request. In this example we use the library [volley](https://github.com/google/volley).

```java
RequestQueue queue = Volley.newRequestQueue(this);
//Replace the url with your own API endpoint
String url = "YOUR API URL";
```

Next you need to add the token to the request header so that authenticated requests can be made. Retrieve the credentials from where you saved them.

```java
String accessToken = sendToken ? CredentialsManager.getCredentials(this).getAccessToken() : null;
AuthorizationRequestObject authorizationRequest = new AuthorizationRequestObject(Request.Method.GET, url, accessToken, null, new Response.Listener<JSONObject>() {

    @Override
    public void onResponse(JSONObject response) {
        // Parse response
    }
}, new Response.ErrorListener() {

    @Override
    public void onErrorResponse(VolleyError error) {
      // Parse error
    }
});
```

The customized `AuthorizationRequestObject` looks like:

```java
public class AuthorizationRequestObject extends JsonObjectRequest {
    private String accessToken;

    AuthorizationRequestObject(int method, String url, String accessToken, JSONObject jsonRequest, Response.Listener listener, Response.ErrorListener errorListener) {
        super(method, url, jsonRequest, listener, errorListener);
        this.accessToken = accessToken;
    }

    @Override
    public Map getHeaders() throws AuthFailureError {
        Map headers = new HashMap();
        if (accessToken != null) {
            headers.put("Authorization", "Bearer " + accessToken);
        }
        return headers;
    }
}
```

> This customized request is meant to manipulate the header of the `JsonObjectRequest`.

Notice that how you configure your authorization header should match the standards that you're using in your API, this is just an example of what it could look like.

## Send the Request

At this point, you only need to schedule the request.

```java
// Add the request to the RequestQueue.
queue.add(authorizationRequest);
```

From here, check that the request was made and that the response came back as expected. You will need to configure your server-side to protect your API endpoints with the secret key for our Auth0 application. As in this example we're using the Auth0's issued `access_token`, you can use this same token to call Auth0 API's.

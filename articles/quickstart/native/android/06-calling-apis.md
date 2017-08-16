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
  path: '06-Calling-APIs',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>__

## Before Starting

You should already know how to handle the `Credentials` object, as explained in the [Session Management](/quickstart/native/android/03-session-handling) tutorial.

This sample assumes that you have already setup a backend application as API. If you haven't done so, you can follow any backend quickstart defined [here](https://auth0.com/docs/quickstart/backend). Then obtain the endpoint in which you're expecting the user to be first authenticated and declare it as a constant in the current class.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

private static final String API_URL = "localhost:8080/secure";
```

## Get a Token

Your first step is to get an `access_token`. Use the basic [Login](/quickstart/native/android/00-login) tutorial if you need some guidance.


## Attach the Token

To prepare the request in this example we use the [OkHttp](https://github.com/square/okhttp) library. Create the `OkHttpClient` instance and a new `Request`. We use the provided builder to customize the request Http method, URL and headers. Here we set the **Authorization Header** with the token type and the `access_token` that identifies the logged-in user.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder()
    .get()
    .url(API_URL)
    .addHeader("Authorization", "Bearer " + accessToken);
    .build();
```

::: note
Notice that how you configure your authorization header should match the standards that you're using in your API, this is just an example of what it could look like.
:::

## Send the Request

Finally we tell the client to create a new `Call` with the given request, and then invoke `enqueue` to execute the request asynchronously.

```java
// app/src/main/java/com/auth0/samples/LoginActivity.java

client.newCall(request).enqueue(new Callback() {
    @Override
    public void onFailure(Request request, IOException e) {
        //show error
    }

    @Override
    public void onResponse(final Response response) throws IOException {
        if (response.isSuccessful()) {
            //API call success
        } else {
            //API call failed. Check http error code and message
        }
    }
});
```

From here, check that the request was made and that the response came back as expected. You will need to configure your server-side to protect your API endpoints with the secret key for our Auth0 application. As in this example we're using the Auth0's issued `access_token`, you can use this same token to call Auth0 API's.

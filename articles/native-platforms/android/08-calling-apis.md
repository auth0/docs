---
title: Call you API
description: This tutorial will show you how to use the Auth0 tokens to make authenticated API calls.
seo_alias: android
---

In this tutorial you will learn how to use a previously saved token, to authenticate in your API calls.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::


### Before Starting

You should already know how to manage the `Credentials` object, as explained in [Session Management](03-session-handling.md) tutorial.

### 1. Get a token

Your first step is to save the `Credentials` object, here is a small memo of this step.

```java
private LockCallback callback = new AuthenticationCallback() {
	@Override
	public void onAuthentication(Credentials credentials) {
		// Save your newly obtained credentials
	}

	...
            
};
```
You can use any of the token strings contained in the `Credentials` object.

### 2. Attach the token

First you need to prepare the request:

```java
RequestQueue queue = Volley.newRequestQueue(this);
String url = "YOUR API URL";
```

Then need to add the token as a mean of authentication to the request header. In this example we use Android's `Volley` and a custom `JsonObjectRequest`.
   
```java     
// Retrieve the credentials from where you saved them
String tokenID = getCredentials.getTokenID();

AuthorizationRequestObject authorizationRequest = new AuthorizationRequestObject(Request.Method.GET,url, 
App.getInstance().getUserCredentials().getIdToken(), null, new Response.Listener<JSONObject>() {
	@Override
	public void onResponse(JSONObject response) {
		// Parse Response
	}
}, new Response.ErrorListener() {

	@Override
	public void onErrorResponse(VolleyError error) {

	}
});
```

The customized `AuthorizationRequestObject` looks like:

```java
	public class AuthorizationRequestObject extends JsonObjectRequest
    {
        private String headerTokenID = null;

        public AuthorizationRequestObject(int method, String url, String tokenID, JSONObject jsonRequest, Response.Listener listener, Response.ErrorListener errorListener)
        {
            super(method, url, jsonRequest, listener, errorListener);
            headerTokenID = tokenID;
        }

        @Override
        public Map getHeaders() throws AuthFailureError {
            Map headers = new HashMap();
            headers.put("Bearer \\"+headerTokenID, "Authorization");
            return headers;
        }

    }
```
	
> This customized request is meant to manipulate the header of the `JsonObjectRequest`.	
	
Notice that how you configure your authorization header should match the standards that you're using in your API, this is just an example of what it could look like.
	
       
### 3. Send the request

At this point, you only need to schedule the request.

```java
		// Add the request to the RequestQueue.
        queue.add(authorizationRequest);        
        }      
```

### Done!

And that's all! Check the response to see if everything went ok.
Don't forget to configure your server-side accordingly.

> For further information on authentication API on the server-side, check [the official documentation](https://auth0.com/docs/api/authentication).


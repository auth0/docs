---
title: Calling APIs
description: This tutorial will show you how to use the Auth0 tokens to make authenticated API calls.
seo_alias: android
---

In this tutorial you will learn how to use a previously saved token, to authenticate in your API calls.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/08-Calling-APIs',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '08-Calling-APIs',
  pkgFilePath: '08-Calling-APIs/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>

### Before Starting

You should already know how to manage the `Credentials` object, as explained in the [Session Management](03-session-handling.md) tutorial.

### 1. Get a token

Your first step is to get the `Credentials` object.

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

First you need to prepare the request.

```java
RequestQueue queue = Volley.newRequestQueue(this);
String url = "YOUR API URL";
```

Next you need to add the token to the request header so that authenticated requests can be made. In this example we use Android's `Volley` and a custom `JsonObjectRequest`.
   
```java     
// Retrieve the credentials from where you saved them
String tokenID = getCredentials.getTokenID();

AuthorizationRequestObject authorizationRequest = new AuthorizationRequestObject(Request.Method.GET,url, 
	tokenID, null, new Response.Listener<JSONObject>(){
	
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
public class AuthorizationRequestObject extends JsonObjectRequest{
	private String headerTokenID = null;

	public AuthorizationRequestObject(int method, String url, String tokenID, JSONObject jsonRequest, 
	Response.Listener listener, Response.ErrorListener errorListener){
		super(method, url, jsonRequest, listener, errorListener);
		headerTokenID = tokenID;
	}

	@Override
	public Map getHeaders() throws AuthFailureError {
		Map headers = new HashMap();
		headers.put("Authorization", "Bearer " + headerTokenID);
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
```

From here, check that the request was made and that the response came back as expected. You will need to configure your server-side to protect your API endpoints with the secret key for our Auth0 application.

> For further information on authentication API on the server-side, check [the official documentation](https://auth0.com/docs/api/authentication).




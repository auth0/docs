---
description: How to call an Identity Provider API.
---

# Call an Identity Provider API

Upon successful authentication of a user with an external Identity Provider (Facebook, Github, etc.), the IdP often provides an access token with the appropriate scope in the user profile that can be used to call their API. 

To avoid leaking in the browser, this access token has been removed from the user profile. If you need to get the user's IDP access token, you will need to call the [Get Users by ID](/api/management/v2#!/Users/get_users_by_id) endpoint with `read:user_idp_tokens` scope.

This document details the recommended method for calling a third-party IdP without exposing the access token. 

The basic flow is the following:

1. Create a client that will be used to get an access token with the `read:user_idp_tokens` scope valid to obtain authorized access to the Auth0 Management API. 

2. Create an endpoint that will handle your request to the external IdP API. This endpoint will:  
    1. Execute the client credentials exchange to get a valid APIv2 access token.
    2. Use the access token to execute the request to the `/api/v2/users/{user_id}` endpoint.
    3. Use the IdP access token extracted from `user.identities[0].access_token` to call the IdP API.

3. Call the endpoint from your application logic. 

## Create the client

To create a client to interact with the Auth0 Management API, see: [API Authorization: Using the Management API](/api-auth/using-the-management-api).

**NOTE:** Make sure that you create the client under the Auth0 Management API and that this new client can be granted the `read:user_idp_tokens` scope.

## Obtain an access token from the backend

Your new client endpoint will execute a client credentials grant to obtain authorized access to the Auth0 Management API and store this token for future requests. Then you will use this token to get the full user profile by calling the `/api/v2/users/{user-id}` endpoint.

**NOTE:** For the simplicity, this example uses Auth0 Webtasks, but you can use the platform of your choice.

### Helper functions

Begin by defining helper functions. 

#### getAccessToken function

Create a new file called `proxy.js` and create a new function called `getAccessToken` that will execute the client credentials flow and get an access token to get authorized access to the Auth0 Management API. 

```js
function getAccessToken(context, cb){
  context.storage.get(function (err, data) {
    if (err) return cb(err);
      
    if (data && data.access_token && jwt.decode(data.access_token).exp < Date.now()){
      // Token didn't expire, use it again
      return cb(null, data.access_token);
    }
      
    const options = {
      url: 'https://' + context.data.ACCOUNT_NAME + '.auth0.com/oauth/token',
      json: {
        audience: 'https://' + context.data.ACCOUNT_NAME + '.auth0.com/api/v2/',
        grant_type: 'client_credentials',
        client_id: context.data.CLIENT_ID,
        client_secret: context.data.CLIENT_SECRET
      }
    };

    return request.post(options, function(err, response, body){
      if (err) return cb(err);
        
      // Store token in context
      context.storage.set({ access_token: body.access_token }, function(err){
        return cb(err, body.access_token);
      });
    });
  });
}
```

**NOTE:** `context.storage` is being used to store the access token get a new token only when the stored token has expired. `context.data.CLIENT_ID` and `context.data.CLIENT_SECRET` are the keys from client that you created in the [previous step](#obtain-an-access-token-from-the-backend).

#### getUserProfile function

Create another function called `getUserProfile` to call the `/api/v2/users/{user-id}` endpoint from the Auth0 Management API and get the user profile containing the IdP access token.

```js
function getUserProfile(context, userId, token, cb){
  const options = {
    url: 'https://' + context.data.ACCOUNT_NAME + '.auth0.com/api/v2/users/' + userId,
    json: true,
    headers: {
      authorization: 'Bearer ' + token
    }
  };

  return request.get(options, function(error, response, user){
    return cb(error, user);
  });
}
```

Now, create the endpoint. This example uses [webtask-tools](https://github.com/auth0/webtask-tools) to create a simple express API that exposes a single endpoint.

```js
"use latest";
  ​
const jwt     = require('jsonwebtoken');  
const request = require('request');
const express = require('express');
const Webtask = require('webtask-tools');
const app     = express();
  ​
app.get('/:id', function (req, res) {
  // TODO: Make sure this request is authorized/authenticated

});
  ​
module.exports = Webtask.fromExpress(app);
```

::: panel-warning Public endpoint
This will expose a public endpoint. In your app logic, make sure that the request has been authenticated and authorized beforehand.
:::

With the access token and the user id taken from the request parameters, invoke the `getUserProfile` method to get the full user profile containing the IdP access token:

```js
app.get('/:id', function (req, res) {
  // TODO: Make sure this request is authorized/authenticated  
  const context = req.webtaskContext;
  
  return getAccessToken(context, function(err, access_token){
    if (err) return res.status(400).json(err);

    return getUserProfile(context, decoded.sub, access_token, function(err, user){
      if (err) return res.status(400).json(err);

      const access_token = user.identities[0].access_token;

      // TODO : call IdP external API

      return res.status(200);
    });
  }); 
});
```

**NOTE:** In most cases, there will be only one identity in the identities array, but if you have used the [account linking feature](/link-accounts), there may be several.

The access token obtained here will have access to call the APIs you specified in the Auth0 dashboard when creating the connection.

To deploy the webtask, you have to use `wt-cli` specifying your own secrets, as in the following example:

```bash
wt create proxy.js \
    --secret ACCOUNT_NAME=[your-account] \
    --secret CLIENT_ID=[non-interactive-client-id] \
    --secret CLIENT_SECRET=[non-interactive-client-secret]
```

**NOTE:** Once the webtask is created, you will be get a message with the webtask URL. Save this URL for use in the next section.

## Call the endpoint  

Now, when you authenticate in your application you will use the token to call the proxy backend, as shown in the following code:

```js
lock.show(function(err, token, profile) {
  
  // call your proxy API
  $.ajax({
    url: '[your webtask url]' + '/' + profile.user_id,
      method: 'GET'
  }).then(function(data) {
    // successful call
  }, function(err) {
    alert("Error calling External IdP API");
  });
})
```

**NOTE:** You may need to specific scopes/permissions to call an Idp API, see: [Add scopes/permissions to call Identity Provider's APIs](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp). 

### Third-party libraries

When you need to call an external IdP that uses OAuth, you can use a third-party library that does the work for you. A non-exhaustive list of such libraries is available at [OAuth 1 and 2 Libraries](http://oauth.net/code/).

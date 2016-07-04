---
description: How to call an Identity Provider API.
---

# Calling an Identity Provider API

When we authenticate using an external IdP (Facebook, Github, etc.), the IdP usually provides an access token with the appropriate scope to consume their API. To avoid leaking this access token to the browser we decided to removed it from the user profile. If you need to get the user's IDP access token, you will need to call the `/api/v2/users/{user-id}` endpoint with `read:user_idp_tokens` scope.

This document shows the recommended way to call a third-pary social service without leaking the access token. The basic flow the following:

1. Create a client that will be used to get an access\_token with the `read:user_idp_tokens` scope valid to obtain authorized access to the Auth0 Management API. 
2. Create an endpoint that will handle your request to the external IdP API. This endpoint will:  
    1. Execute the client credentials exchange to get a valid APIv2 access token.
    2. Use the access token to execute the request to `/api/v2/users/{user_id}` API.
    3. Use the IdP access token (`user.identities[0].access_token`) to call the IdP External API.
3. Call the endpoint from your application logic 

## Create the client to obtain authorized access to the Auth0 Management API

To create a client to interact with the Auth0 Management API you can check the document [API Authorization: Using the Management API](https://auth0.com/docs/api-auth/using-the-management-api).

> Make sure that you create the client under Auth0 Management API and that this new client can be granted the `read:user_idp_tokens` scope.

## How to obtain access tokens from the backend to make API calls to an External IdP ?

The endpoint will do a client credentials grant to get authorized access to the Auth0 Management API and store the access token for future requests. Then we'll use this token to get the complete user profile by calling the `/api/v2/users/{user-id}` endpoint.

> For the simplicity of this scenario we will show you how to do it using Auth0 Webtasks, but you can choose any other platform of your choice.

We will start by defining our helper functions. Create a new file called `proxy.js` and create a new function called `getAccessToken` that will execute the client credentials flow and get an access token to get authorized access to the Auth0 Management API. 

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

  > Notice that we are using `context.storage` to store the access token and only get a new one when the access token expired. `context.data.CLIENT_ID` and `context.data.CLIENT_SECRET` are the keys from client that you have created in the previous step.

Create another function called `getUserProfile` to call the `/api/v2/users/{user-id}` endpoint from the Auth0 Management API and get the user profile with the IdP access token.

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

Now, lets create the endpoint. We will use [webtask-tools](https://github.com/auth0/webtask-tools) to create a simple express API that exposes a single endpoint

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

  > Notice that this will expose a public endpoint so make sure that the request is authenticated/authorized as the first step (this will depend on your app logic).

With the access token and the user id taken from the request parameters, we will invoke the `getUserProfile` method to get the full user profile with the IdP access token.

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

  > Most of the times, there's going to be just one identity in the identities array, but if you've used the [account linking feature](/link-accounts) there might be more than one.

The `access_token` we get here will have access to call the APIs you've specified in the Auth0 dashboard when creating the connection.

To deploy the webtask you have to use `wt-cli` specifying your own secrets, like in the following example.

```bash
wt create proxy.js \
    --secret ACCOUNT_NAME=[your-account] \
    --secret CLIENT_ID=[non-interactive-client-id] \
    --secret CLIENT_SECRET=[non-interactive-client-secret]
```

> Once the webtask is created, you will be get a message with the webtask URL. Copy that URL as you will use it in the next section.

## Call the endpoint from your application logic  

Now when you authenticate in your application you just need to use the token to call the proxy backend, as shown in the following code.

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

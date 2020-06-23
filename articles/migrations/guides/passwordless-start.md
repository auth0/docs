---
title: Migration Guide for the Use of /passwordless/start from Confidential Applications
description: Auth0 is deprecating the usage of the /passwordless/start endpoint from confidential applications without a client secret in the request.
topics:
  - passwordless
  - migrations
contentType:
  - concept
  - how-to
useCase:
  - customize-connections
---
# Migration Guide: Use of /passwordless/start from Confidential Applications

Auth0 is deprecating the use of the `/passwordless/start` endpoint from confidential applications when Auth0 cannot authenticate that the call is made on behalf of the application.

OAuth uses the term 'confidential' for applications that can store secrets. In Auth0, those are 'Regular Web Applications', which serve web pages from a backend app. Single Page Applications and Native Applications are considered 'public' applications, and are not affected by this change.

Auth0 can authenticate calls to `/passwordless/start` when they include a `client_secret` as a parameter, or when the calls are made from the custom login page in Universal Login and forward the `state` parameter.

## Does this affect me?

If any of your applications currently call the `/passwordless/start` endpoint directly to begin passwordless authentication from a Web Application, and you are not sending the `client_secret` as a parameter, this deprecation does affect you. 

If you are implementing passwordless authentication through the Universal Login page and you changed the default way Auth0 libraries are initialized, it might also affect you too.

You can verify whether you are affected by checking the [tenant logs](${manage_url}/#/logs), filtering by "Deprecation Notice" and check for logs saying "Enforce client authentication for passwordless connections". You can also perform this search directly with the following query: `type:depnote AND description:*passwordless*`. Note that this specific query will only work for public cloud tenants, as private cloud logs cannot be searched on the description field.

## What do I need to do?

If you are calling the `/passwordless/start` endpoint without proper application authentication you should:

- Follow the instructions described below to adjust the code to properly call `/passwordless/start`.
- Check your [tenant logs](${manage_url}/#/logs) to verify the change was made correctly and no deprecation logs are being generated for "Enforce client authentication for passwordless connections".
- In the **Migrations** section of Advanced Tenant Settings, turn on the **Enforce client authentication for passwordless connections** toggle.

## How I need to change my code?

There are a few use cases that might be affected, but for each, the migration path is fairly straightforward:

### 1. API calls from your backend

For any calls from your backend to the `/passwordless/start` endpoint, your call must include the client secret as a parameter.

If making a POST request directly to `/passwordless/start`, include the `client_secret` as part of the payload: 

```json
POST https://YOUR_AUTH0_DOMAIN/passwordless/start
Content-Type: application/json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "connection": "email|sms",
  "email": "EMAIL", //set for connection=email
  "phone_number": "PHONE_NUMBER", //set for connection=sms
  "send": "link|code",
  "authParams": { 
    "scope": "openid",
    "state": "YOUR_STATE"
  }
}
```

If you are using an SDK, add the parameter to the method that initiates the passwordless flow. This is different for each SDK, and not all SDKs have been updated yet. If you are using an SDK that was not updated, you can make the HTTP call directly until that work is completed.

### 2. Using Auth0.js or Lock.js in the Universal Login page

If the Universal Login page is used for Passwordless Authentication for a Web Application, it will be making calls to the `/passwordless/start` endpoint, by either using Lock.js or Auth0.js.

Given you can't store a client secret in a web page, the way to authenticate the call is by forwarding the `state` parameter that is received in the Universal Login page to the `/passwordless/start` endpoint. That parameter is stored in the `config.internalOptions` field in the custom login page. 

The default templates for customizing the login page use it in the following way when initializing Lock.js or auth0.js:

```js
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  auth: {
    // .. other fields set
    params: config.internalOptions
  })
```

```js
var params = Object.assign({
  // .. some fields set
}, config.internalOptions);

var webAuth = new auth0.WebAuth(params);
```

Please check in your custom page implementation to verify that you have not removed that code.

### 3. Calling /passwordless/start from the client in a web application

We found that some customers are calling the `/passwordless/start` endpoint from a page using JavaScript (for example, they might be using auth0.js on the page) from Regular Web Applications. This will not be possible, as you cannot specify a client secret in a call made using JavaScript. If this is currently the case for your application, you will need to change your applications so that `/passwordless/start` is called from the backend of your web application, rather than from the frontend.

## Rate Limits

A consequence of adding client authentication to `/passwordless/start` is that Auth0 can trust the headers sent with the request. Auth0 takes into account the `auth0-forwarded-for` header when enforcing rate limits. If you set that header with the end user's IP address when making the call from the server, Auth0 will rate limit the endpoint based on the end user's IP, instead of the server IP.

You can read more about this in the [passwordless endpoints](/connections/passwordless/reference/relevant-api-endpoints#rate-limiting-in-passwordless-endpoints) documentation.

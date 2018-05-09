---
description: API and SPA Configuration for the SPA + API architecture scenario
toc: true
---

# SPA + API: API and SPA Configuration

In this section we will see how we can implement an API for our scenario.

::: note
For simplicity reasons we will keep our implementation solely focused on the authentication and authorization part. As you will see in the samples the input timesheet entry will be hard-coded and the API will not persist the timesheet entry, simply echo back some of the info.
:::

## Define the API endpoints

First we need to define the endpoints of our API.

::: panel What is an API endpoint?
An **API endpoint** is a unique URL that represents an object. In order to interact with this object you need to point your application towards that URL. For example, if you had an API that could return either order or customers, you might configure two endpoints: `/orders` and `/customers`. Your application would interact with these endpoints using different HTTP methods, for example `POST /orders` to create a new order, or `GET /orders` to retrieve the dataset of one or more orders.
:::

For this implementation we will only define 2 endpoints; one for retrieving a list of all timesheets for an employee, and another which will allow an employee to create a new timesheet entry.

An `HTTP GET` request to the `/timesheets` endpoint will allow a user to retrieve their timesheets, and an `HTTP POST` request to the `/timesheets` endpoint will allow a user to add a new timesheet.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#1-define-the-api-endpoints)
:::

### Secure the Endpoints

When an API receives a request with a bearer Access Token as part of the header, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request must be rejected with a `Missing or invalid token` error message to the calling app.

The validations that the API should perform are:

- Check that the JWT is well formed
- Check the signature
- Validate the standard claims

::: note
[JWT.io](https://jwt.io/) provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims.
:::

Part of the validation process is to also check the Application permissions (scopes), but we will address this separately in the next paragraph of this document.

For more information on validating Access Tokens, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

::: note
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#2-secure-the-api-endpoints)
:::

### Check the Application's Permissions

By now we have verified that the JWT is valid. The last step is to verify that the application has the permissions required to access the protected resources.

To do so, the API needs to check the [scopes](/scopes) of the decoded JWT. This claim is part of the payload and it is a space-separated list of strings.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#3-check-the-client-permissions)
:::

### Determine user identity

For both endpoints (retrieving the list of timesheets, and adding a new timesheet) we will need to determine the identity of the user.

For retrieving the list of timesheets this is to ensure that we only return the timesheets belonging to the user making the request, and for adding a new timesheet this is to ensure that the timesheet is associated with the user making the request.

One of the standard JWT claims is the `sub` claim which identifies the principal that is the subject to the claim. In the case of the Implicit Grant flow this claim will contain the user's identity, which will be the unique identifier for the Auth0 user. You can use this to associate any information in external systems with a particular user.

You can also use a custom claim to add another attribute of the user - such as their email address - to the `access_token` and use that to uniquely identify the user.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/spa-api/api-implementation-nodejs#4-determine-the-user-identity)
:::

## Implement the SPA

In this section we will see how we can implement a SPA for our scenario.

### Authorize the user

To authorize the user we will be using the [auth0.js library](/libraries/auth0js). You can initialize a new instance of the Auth0 application as follows:

```js
var auth0 = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  responseType: 'token id_token',
  audience: 'YOUR_API_IDENTIFIER',
  redirectUri: '${account.callback}',
  scope: 'openid profile read:timesheets create:timesheets'
});
```

You need to pass the following configuration values:

- __clientID__:The value of your Auth0 Client Id. You can retrieve it from the Settings of your Application at the [Dashboard](${manage_url}/#/applications}).
- __domain__: The value of your Auth0 Domain. You can retrieve it from the Settings of your Application at the [Dashboard](${manage_url}/#/applications}).
- __responseType__: Indicates the Authentication Flow to use. For a SPA which uses the __Implicit Flow__, this should be set to `token id_token`. The `token` part, triggers the flow to return an `access_token` in the URL fragment, while the `id_token` part, triggers the flow to return an `id_token` as well.
- __audience__: The value of your API Identifier. You can retrieve it from the [Settings of your API](${manage_url}/#/apis}) at the Dashboard.
- __redirectUri__: The URL to which Auth0 should redirect to after the user has authenticated.
- __scope__: The [scopes](/scopes) which determine the information to be returned in the `id_token` and `access_token`. A scope of `openid profile` will return all the user profile information in the `id_token`. You also need to request the scopes required to call the API, in this case the `read:timesheets create:timesheets` scopes. This will ensure that the `access_token` has these scopes.

To initiate the authentication flow you can call the `authorize()` method:

```js
auth0.authorize();
```

After the authentication, Auth0 will redirect back to the __redirectUri__ you specified when configuring the new instance of the Auth0 application. At this point you will need to call the `parseHash()` method which parses a URL hash fragment to extract the result of an Auth0 authentication response.

The contents of the authResult object returned by parseHash depend upon which authentication parameters were used. It may include the following:

- __idToken__: An `id_token` JWT containing user profile information
- __accessToken__: An `access_token` for the API, specified by the __audience__.
- __expiresIn__: A string containing the expiration time (in seconds) of the `access_token`.

You also need to store the tokens returned by the authentication result in local storage to keep track of the fact that the user is logged in. You can also subsequently retrieve the `access_token` from local storage when calling your API.

```js
this.auth0.parseHash((err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    window.location.hash = '';
    // Store the authResult in local storage and redirect the user elsewhere
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  } else if (err) {
    // Handle authentication error, for example by displaying a notification to the user
  }
});
```

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#2-authorize-the-user)
:::

### Get the User Profile

::: panel Extract info from the token
This section shows how to retrieve the user info using the `access_token` and the [/userinfo endpoint](/api/authentication#get-user-info). To avoid this API call, you can just decode the `id_token` [using a library](https://jwt.io/#libraries-io) (make sure you validate it first). If you need additional user information consider using [our Management API](/api/management/v2#!/Users/get_users_by_id) from your backend.
:::

The `client.userInfo` method can be called passing the returned `authResult.accessToken` in order to retrieve the user's profile information.  It will make a request to the [/userinfo endpoint](/api/authentication#get-user-info) and return the `user` object, which contains the user's information, similar to the example below:

```json
{
    "email_verified": "false",
    "email": "test@example.com",
    "clientID": "AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH",
    "updated_at": "2017-02-07T20:50:33.563Z",
    "name": "tester9@example.com",
    "picture": "https://gravatar.com/avatar/example.png",
    "user_id": "auth0|123456789012345678901234",
    "nickname": "tester9",
    "created_at": "2017-01-20T20:06:05.008Z",
    "sub": "auth0|123456789012345678901234"
}
```

You can access any of these properties in the callback function passed when calling the `userInfo` function:

```js
const accessToken = localStorage.getItem('access_token');
 
auth0.client.userInfo(accessToken, (err, profile) => {
  if (profile) {
    // Get the user’s nickname and profile image
    var nickname = profile.nickname;
    var picture = profile.picture;
  }
});
```

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#3-get-the-user-profile)
:::

### Display UI Elements Conditionally Based on Scope

Based on the `scope` of the user, you may want to show or hide certain UI elements. To determine the scope issued to a user, you will need to store the scope which was initially requested during the authorization process. When a user is authorized, the `scope` will also be returned in the `authResult`. 

If the `scope` in the `authResult` is empty, then all the scopes which was requested was granted. If the `scope` in the `authResult` is not empty, it means a different set of scopes were granted, and you should use the ones in `authResult.scope`.

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#4-display-ui-elements-conditionally-based-on-scope)
:::

### Call the API

To access secured resources from your API, the authenticated user's `access_token` needs to be included in requests that are sent to it. This is accomplished by sending the `access_token` in an `Authorization` header using the `Bearer` scheme. 

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#5-call-the-api)
:::

### Renew the Access Token

As a security measure, it is recommended that the lifetime of a user's `access_token` be kept short. When you create an API in the Auth0 dashboard, the default lifetime is `7200` seconds (2 hours), but this can be controlled on a per-API basis.

Once expired, an `access_token` can no longer be used to access an API. In order to obtain access again, a new `access_token` needs to be obtained.

Obtaining a new `access_token` can be done by repeating the authentication flow, used to obtain the initial `access_token`. In a SPA this is not ideal, as you may not want to redirect the user away from their current task to complete the authentication flow again.

In cases like this you can make use of [Silent Authentication](/api-auth/tutorials/silent-authentication). Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. This does however require that the user was already logged in via [SSO (Single Sign-On)](/sso).

::: note
See the implementation in [Angular 2](/architecture-scenarios/application/spa-api/spa-implementation-angular2#6-renew-the-access-token)
:::

<%= include('./_stepnav', {
 prev: ["2. Auth0 Configuration", "/architecture-scenarios/application/spa-api/part-2"], next: ["Conclusion", "/architecture-scenarios/application/spa-api/part-4"]
}) %>
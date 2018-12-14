---
title: Redirect Users With State Parameters
description: Learn how to redirect users with the 0Auth 2.0 state parameter. 
topics:
  - users
  - user-management
  - state-parameter
  - redirection
contentType: how-to
useCase: manage-users
---
# Redirect Users with State Parameters

You can store the application state parameter before you redirect users to authenticate, so you can redirect them to a URL. For example, if a user intends to access a protected page in your application, and that action triggers the request to authenticate, you can store that URL to redirect the user back to their intended page after the authentication finishes.

Use the `state` parameter to lookup and restore the previous state of your application.

1. Generate the `nonce` that you will use to protect against CSRF attacks as explained before. Store the `nonce` locally, using it as the key to store all the other application state like the URL where the user intended to go. For example:

```json
{
  "xyzABC123" : {
    redirectUrl: '/protectedResource',
    expiresOn: [...]
  }
}
```

2. Authenticate the user, sending the generated `nonce` as the state.

3. As part of the callback processing and response validation, verify that the state returned matches the nonce stored locally. If it does, retrieve the rest of the application state (like the `redirectUrl`). 

4. Once you complete the callback processing redirect the user to the URL previously stored.

Again, how you store the nonce and the URL or other information pertinent to the application state depends on your application's type. It can be local storage in single page or native apps or a cookie in a regular web app. 

::: panel Obtain State Parameters From Rules
You can access the `state` parameter value within a [rule](/rules). How you can get this value will depend on the type of flow used; either from the body of the request or from the query string. You can obtain it using the following:

```js
var state = context.request.query.state || context.request.body.state;
```

:::

## Keep reading

* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [API Authorization](/api-auth)
* [State Parameter](/protocols/oauth2/oauth-state)

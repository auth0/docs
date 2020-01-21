---
section: exercises
description: Auth0 digital identity Lab 2, Exercise 3: Working with Refresh Tokens
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
  - index
  - concept
---
# Lab 2, Exercise 3: Working with Refresh Tokens

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/02-calling-an-api) and read through the instructions before getting started.
:::

Right now, if your users stay logged in for too long and try to refresh the `/expenses` page, they will face a problem. Access tokens were conceived to be exchanged by different services through the network (which makes them more prone to leakage), so they should expire quickly. When an access token is expired, your API won't accept it anymore, and your web application won't be able to fetch the data needed. A token expired error will be returned instead.

To change this behavior, you can make your web app take advantage of yet another token: the refresh token. A refresh token is used to obtain new access tokens and/or ID tokens from the authorization server. In this exercise, we're going to modify the application to obtain a refresh token and use it to get a new access token when it expires.

1. Navigate to the [APIs screen](${manage_url}/#/apis) in your Auth0 Dashboard and open the API created in the last exercise. Scroll down, turn on the **Allow Offline Access** option, and click **Save**:

![Allow API to grant offline access](/media/articles/identity-labs/lab-02-api-allow-offline.png)

2. Now, Open the `webapp/server.js` file and add `offline_access` to the `authorizationParams.scope` field passed to the `auth()` middleware:

```js
// webapp/server.js

app.use(auth({
  required: false,
  auth0Logout: true,
  appSessionSecret: false,
  authorizationParams: {
    response_type: 'code id_token',
    response_mode: 'form_post',
    audience: process.env.API_AUDIENCE,

    // Change only the line below 👇
    scope: 'openid profile email read:reports offline_access'

  },

  // ... keep the rest

}));
```

3. Now, find the following line in the `/expenses` endpoint code and replace it with the following:

```js
// webapp/server.js

app.get('/expenses', requiresAuth(), async (req, res, next) => {
  try {

    let tokenSet = req.openid.makeTokenSet(req.session.openidTokens);

    // Add the code block below 👇
    if (tokenSet.expired()) {
      tokenSet = await req.openid.client.refresh(tokenSet);
      tokenSet.refresh_token = req.session.openidTokens.refresh_token;
      req.session.openidTokens = tokenSet;
    }

    // ... keep the rest
  }
  // ...
});
```

This change will update your endpoint to check if the `tokenSet` is expired. If it is, the `Issuer` class will create a client that is capable of refreshing the `tokenSet`. To see the refreshing process in action, you will have to make a small change to your Auth0 API configuration.

4. Navigate to the [APIs screen](${manage_url}/#/apis) in your Auth0 Dashboard and open the API created in the last exercise. Set both the **Token Expiration (Seconds)** and **Token Expiration For Browser Flows (Seconds)** values to 10 seconds or less and click **Save**:

![Access token expiration time](/media/articles/identity-labs/lab-02-api-token-expiration.png)

5. Back in your editor, add a log statement to `api/api-server.js` to show when the new access token was issued:

```js
// api/api-server.js

app.get('/', requiredScopes('read:reports'), (req, res) => {

  // Add the line below 👇
  console.log(new Date(req.auth.claims.iat * 1000));

  // ...
});
```

6. Restart both the application and API (`[CTRL]` + `[c]`, then `npm start`).

7. Log out and log in again. This will get you a complete set of tokens (ID token, access token, and refresh token). Note, at this point, you will see a new consent screen for the offline_access scope, which you need to accept.

Open [localhost:3000/expenses](http://localhost:3000/expenses) in your browser and refresh the page. You will see that your API logs a timestamp in the terminal. The same timestamp will be logged every time you refresh the page as long as your token remains valid. Then, if you wait a few seconds (more than ten) and refresh the view again, you will see that your API starts logging a different timestamp, which corresponds to the new token retrieved. This shows that you are getting a different access token every ten seconds and that your web application uses the refresh token automatically to get them.

::: note
If you see an error in your console about an ID token used too early, this is likely a clock skew issue in your local environment. Try restarting your machine and walking through the login steps again from the beginning. You can also try going to "Date & Time" settings, unlock them if needed by clicking on the lock icon at the bottom, and disable and re-enable the "Set date and time automatically" option.
:::

::: note
If you don't see changes in the "Issued At" claim in the console, make sure you have logged out and logged in again after applying the changes above.
:::

::: note
If you are using PowerShell in Windows and you see blank lines instead of the timestamp logging in the terminal, it could be the font color of the logs is the same as the background. As an alternative, you can run the API server from the Windows command line, or change the background color in PowerShell.
:::

🎉 **You have completed Lab 2 by building a web application that calls an API with refresh capability!** 🎉

<a href="/identity-labs/" class="btn btn-transparent">← All Identity Labs</a>

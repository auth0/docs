---
section: exercises
classes: topic-page
title: Exercise 3: Working with Refresh Tokens
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

Right now, if your users stay logged in for too long and try to refresh the `/expenses` page, they will face a problem. Access tokens were conceived to be exchanged by different services through the network (which makes them more prone to leakage) so they should expire quickly. When an access token is expired, your API won't accept it anymore and your web application won't be able to fetch the data needed. A token expired error will be returned instead.

To change this behavior, you can make your web app take advantage of yet another token: the refresh token. A refresh token is used to obtain new access tokens and/or ID tokens from the authorization server. In this exercise, we're going to modify the application to obtain a refresh token and use it to get a new access token when it expires.

1. Navigate to the [APIs screen](${manage_url}/#/apis) in your Auth0 Dashboard and open the API created in the last exercise. Scroll down, turn on the **Allow Offline Access** option, and click **Save**:

![](/media/articles/identity-labs/lab-02-api-allow-offline.png)

2. Open the terminal where you are running the web application and stop with `[CTRL]` + `[c]`. Install version 2 of the `openid-client` library using npm as well. This library is an OpenID client implementation for Node.js:

```bash
# Continuing from previous terminal session ...
listening on http://localhost:3000
^C # Command to stop the server
# Make sure we're in the right directory
❯ pwd
/Users/username/identity-102-exercises/lab-02/begin/webapp

❯ npm install openid-client@2
# Ignore any warnings

+ openid-client@2.5.0 # Version number should start with 2
added 1 package in 3.761s
```

3. Now, Open the `webapp/server.js` file and add a statement to import the `Issuer` class provided by the `openid-client library`:

```js
// webapp/server.js

require('dotenv').config();
// ... other required packages

// Add the code below 👇
const { Issuer } = require('openid-client');
```

4. Add `offline_access` to the `authorizationParams.scope` field passed to the `auth()` middleware:

```js
// webapp/server.js

app.use(auth({
  required: false,
  auth0Logout: true,
  authorizationParams: {
    response_type: 'code id_token',
    audience: process.env.API_AUDIENCE,

    // Change the line below 👇
    scope: 'openid profile email read:reports offline_access'
  }
}));
```

5. Find the following line in the `/expenses` endpoint code and replace it with the following:

```js
// webapp/server.js

app.get('/expenses', requiresAuth(), async (req, res, next) => {
  try {

    // Replace this code ❌
    /*
    const tokenSet = req.openid.tokens;
    */

    // ... with this 👇
    let tokenSet = req.openid.tokens;
    if (tokenSet.expired()) {
      const issuer = await Issuer.discover(process.env.ISSUER_BASE_URL);
      const client = new issuer.Client({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      });
      tokenSet = await client.refresh(tokenSet.refresh_token);
      tokenSet.refresh_token = req.openid.tokens.refresh_token;
      req.openid.tokens = tokenSet;
    }

    // ...
  }
  // ...
});
```

This change will update your endpoint to check if the `tokenSet` is expired. If it is, the `Issuer` class will create a client that is capable of refreshing the `tokenSet`. To see the refreshing process in action, you will have to make a small change to your Auth0 API configuration.

6. Navigate to the [APIs screen](${manage_url}/#/apis) in your Auth0 Dashboard and open the API created in the last exercise. Set both the **Token Expiration (Seconds)** and **Token Expiration For Browser Flows (Seconds)** values to 10 seconds or less and click **Save**:

![](/media/articles/identity-labs/lab-02-api-token-expiration.png)

7. Back in your editor, add a log statement to `api/api-server.js` to show when the new access token was issued:

```js
// api/api-server.js

app.get('/', requiredScopes('read:reports'), (req, res) => {

  // Add the code below 👇
  console.log(new Date(req.auth.claims.iat * 1000));

  // ...
});
```

8. Restart both the application and API (`[CTRL]` + `[c]`, then `npm start`).

9. Log out and log in again. This will get you a complete set of tokens (ID token, access token, and refresh token). Note, at this point, you will see a new consent screen for the offline_access scope, which you need to accept.

Open http://localhost:3000/expenses in your browser and refresh the page. You will see that your API logs a timestamp in the terminal. The same timestamp will be logged every time you refresh the page as long as your token remains valid. Then, if you wait a few seconds (more than ten) and refresh the view again, you will see that your API starts logging a different timestamp, which corresponds to the new token retrieved. This shows that you are getting a different access token every ten seconds and that your web application uses the refresh token automatically to get them.

::: note
If you see an error in your console about an ID token used too early, this is likely a clock skew issue in your local environment. Try restarting your machine and walking through the login steps again from the beginning. You can also try going to "Date & Time" settings, unlock them if needed by clicking in the lock icon at the bottom, and disable and re-enable the "Set date and time automatically" option.
:::

::: note
If you don't see changes in the "Issued At" claim in the console, make sure you have logged out and logged in again after applying the changes above.
:::

::: note
If you are using PowerShell in Windows and you see blank lines instead of the timestamp logging in the terminal, it could be the font color of the logs is the same than the background. As an alternative, you can run the API server from the Windows command line, or change the background color in PowerShell.
:::

You now have a web application calling an API with refresh capability!

<a href="/identity-labs/" class="btn btn-transparent">← All Identity Labs</a>

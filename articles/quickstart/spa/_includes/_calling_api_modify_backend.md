<!-- markdownlint-disable MD002 MD041 -->

## Modify the Backend API

For this tutorial, let's modify the API to include a new endpoint that expects an Access Token to be supplied.

::: note
In a real scenario, this work would be done by the external API that is to be called from the frontend. This new endpoint is simply a convenience to serve as a learning exercise.
:::

Open `server.js` and add a new Express route to serve as the API endpoint, right underneath the existing one:

```js
// server.js

// ... other code

// This is the existing endpoint for sample 2
app.get("/api/private", checkJwt, (req, res) => {
  res.send({
    msg: "Your ID Token was successfully validated!"
  });
});

// Add the new endpoint here:
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});
```

Notice that it continues to use the same `checkJwt` middleware in order to validate the Access Token. The difference here is that the Access Token must be validated using the API identifier, rather than the client ID that we used for the ID Token.

::: note
The API identifier is the identifer that was specified when the API was created in the [Auth0 dashboard](${manage_url}/#/apis).
:::

Therefore, modify the `checkJwt` function to include the API identifier value in the `audience` setting:

```js
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://<%= "${authConfig.domain}" %>/.well-known/jwks.json`
  }),

  // Modify the audience to include both the client ID and the audience from configuration in an array
  audience: [authConfig.clientID, authConfig.audience],
  issuer: `https://<%= "${authConfig.domain}" %>/`,
  algorithm: ["RS256"]
});
```

::: note
As the `audience` property accepts an array of values, both the client ID and the API identifier can be given, allowing both the ID Token and the Access Token to be verified using the same middleware.
:::

Finally, modify the `authConfig` object to include your `audience` value:

```js
const authConfig = {
  domain: "${account.namespace}",
  clientID: "${account.clientId}",
  audience: "${apiIdentifier}"
};
```

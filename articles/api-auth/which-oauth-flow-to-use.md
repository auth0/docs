# Which OAuth 2.0 flow should I use?

OAuth 2.0 supports several different **grants**. By grants we mean ways of retrieving an access token. Deciding which one is suited for your case depends mostly on your Client's type, but other parameters weight in as well, like the level of trust for the Client, or the experience you want your users to have.

Follow this flow to identify the grant that best matches your case.

![Flowchart for OAuth 2.0 Grants](/media/articles/api-auth/oauth2-grants-flow.png)

::: panel-info Quick refresher - OAuth 2.0 terminology
- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.
- **Client**: an application requesting access to a protected resource on behalf of the Resource Owner.
- **Resource Server**: the server hosting the protected resources. This is the API you want to access.
- **Authorization Server**: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.
- **User Agent**: the agent used by the Resource Owner to interact with the Client, for example a browser or a native application.
:::

## Is the Client the Resource Owner?

The first decision point is about whether the party that requires access to resources is a machine. In this case of machine to machine authorization, the Client is also the Resource Owner. No end-user authorization is needed in this case. An example is a cron job that uses an API to import information to a database. In this example the cron job is the Client and the Resource Owner since it holds the Client Id and Client Secret and uses them to get an access token from the Authorization Server.

If this case matches your needs, then for more information on how this flow works and how to implement it refer to: [Client Credentials Grant](/api-auth/grant/client-credentials).

## Is the Client a web app executing on the server?

If the Client is a regular web app executing on a server then the **Authorization Code Grant** is the flow you should use. Using this the Client can retrieve an access token and, optionally, a refresh token. It's considered the safest choice since the access token is passed directly to the web server hosting the Client, without going through the user's web browser and risk exposure.

If this case matches your needs, then for more information on how this flow works and how to implement it refer to: [Authorization Code Grant](/api-auth/grant/authorization-code).

## Is the Client absolutely trusted with user credentials?

This decision point may result to suggesting the **Resource Owner Password Credentials Grant**. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is later on sent to the Client and the Authorization Server. It is therefore imperative that the Client is absolutely trusted with this information.

## Is the Client a native app or a SPA?

If the Client is a Single Page Application (meaning an application running in a browser using a scripting language such as Javascript) then the [Implicit Grant](/api-auth/grant/implicit) should be used. In this case, instead of getting an authorization code that needs to be exchanged for an access token, the Client retrieves directly an access token. On the plus side, this is more efficient since it reduces the number of round trips required to get an access token. However, a security consideration is that the access token is exposed on the client side. Also, it should be noted that **Implicit Grant** does not return a refresh token because the browser cannot keep it private. You need to get a new access token, using the `/authorize` endpoint of the [Auth0 Authentication API](/api/authentication), each time the old expires.

If the Client is an SPA, then for more information on how this flow works and how to implement it refer to: [Implicit Grant](/api-auth/grant/implicit).

**NOTE:** While SPAs cannot use refresh tokens, they can take advantage of other mechanics that provide the same function. A workaround to improve user experience is to use `prompt=none` when you invoke the `/authorize` endpoint. This will not display the login dialog or the consent dialog. In addition to that if you call `/authorize` from a hidden iframe and extract the new access token from the parent frame, then the user will not see the redirects happening.

If the Client is a native app then the [Authorization Code Grant using Proof Key for Code Exchange](/api-auth/grant/authorization-code-pkce) is used. What this grant adds to Authorization Code Grant, is the concept of `code_verifier`. When at first the client asks for an **Authorization Code** it generates a `code_verifier` and its transformed value called `code_challenge`. The `code_challenge` is sent along with the request. A `code_challenge_method` is also sent. Afterwards, when the client wants to exchange the Authorization Code for an access token, it also sends along the `code_verifier`. The Authorization Server transforms this and if it matches the originally sent `code challenge` it returns an access token.

If the Client is a native app, then for more information on how this flow works and how to implement it refer to: [Authorization Code Grant (PKCE)](/api-auth/grant/authorization-code-pkce).

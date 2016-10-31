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

## Is the Client a web app executing on the server?

If the Client is a regular web app executing on a server then the **Authorization Code Grant** is the flow you should use. Using this the Client can retrieve an access token and, optionally, a refresh token. It's considered the safest choice since the access token is passed directly to the web server hosting the Client, without going through the user's web browser and risk exposure.

## Is the Client absolutely trusted with user credentials?

This decision point may result to suggesting the **Resource Owner Password Credentials Grant**. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is later on sent to the Client and the Authorization Server. It is therefore imperative that the Client is absolutely trusted with this information.

## Is the Client a native app or a SPA?

If the Client is a Single Page Application (meaning an application running in a browser using a scripting language such as Javascript) then most of the times the **Implicit Grant** is used. In this case, instead of getting an authorization code that needs to be exchanged for an access token, the Client retrieves directly an access token. On the plus side, this is more efficient since it reduces the number of round trips required to get an access token. However, a security consideration is that the access token is exposed on the client side. Since we are talking about applications running in a browser, viewing the access token is fairly easy. Also, it should be noted that **Implicit Grant** does not return a refresh token because the browser cannot keep it private. One counter measure is to use [the `state` authentication parameter](/protocols/oauth-state).

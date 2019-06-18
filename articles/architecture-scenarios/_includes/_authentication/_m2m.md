There are many scenarios that require an application that is not a user-interactive session to get an access token.  In these scenarios you are authenticating the client instead of the user.  Some common times where this is needed:
* There is a cron job or other service that needs to communicate with your API.  For example the system needs to generate a daily report and email it to an administrator.
* There is a separate API the supports privileged access.  This API is not exposed to users directly, but instead to a backend only.
* In certain microservice architectures some layers of APIs need to communicate to other API layers without a user involvement, or after a user token has expired.
* A privileged API may need to be called before a user has authenticated (i.e. from a rule or custom DB script in your Auth0 tenant)

::: panel best practice
Back in the day, people would often create a special "service account".  A user with a username and password that was stored in configuration for services that needed to be non-interactive.  That is no longer a recommended approach for many reasons.  The current best practice is to use [OAuth 2.0 Client Credentials Grant](https://auth0.com/docs/flows/concepts/client-credentials)
:::

In these scenarios, OAuth 2.0 provides a nice grant type to make this easy.  This grant type is called the client credentials grant type.  See [client credentials](https://auth0.com/docs/flows/concepts/client-credentials) for a more in-depth description of where it is and is not appropriate to use this grant type.

::: warning
Though the client credentials hook can be used to add custom claims, it is important to consider the purpose for which client credentials was created and avoid extending it beyond its intended purpose as this can result in new vectors for attackers to exploit.
:::

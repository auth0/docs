There are many scenarios that require an application _without_ any user-interactive session to obtain an access token in order to call an API. In such scenarios you must authenticate the client instead of the user, and OAuth 2 provides the [client credentials](/flows/concepts/client-credentials) grant type to make this easy to achieve. Some common examples of where this is required include:
* A cron job or other service that needs to communicate with your API (e.g. where a daily report needs to be generated and emailed it to an administrator).
* A separate API the supports privileged access (e.g. the API is not exposed to users directly, but instead to a backend only).
* In certain microservice architectures, where some API layers need to communicate to other API layers without a user involvement, or after a user token has expired.
* A privileged API that may need to be called before a user has authenticated (i.e. from a rule or custom DB script in your Auth0 tenant)

::: panel best practice
Traditionally, a special "service account" would have been created in order to cater for these scenarios: a user with a username and password that was configured for services which supported non-interactive use cases. That is no longer a recommended approach for many reasons, and the current best practice is to use [OAuth 2.0 Client Credentials Grant](/flows/concepts/client-credentials) in these situations.
:::

::: warning
Though the [Client Credentials Exchange Hook](/hooks/extensibility-points/client-credentials-exchange) in Auth0 can be used to add custom claims, it's important to consider the purpose for which a token was requested and to avoid extending use of the token beyond its intended purpose. Doing otherwise can result in the creation of unintended attack vectors for attackers to exploit.
:::

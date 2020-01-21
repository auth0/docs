---
description: Explore sample use cases to understand how sessions work with authentication in Auth0.
topics:
  - sessions
  - sample-use-case
contentType: concept
useCase:
  - build-an-app
---
# Session Use Cases

## For SPAs using Authorization Code grant

Auth0 maintains a login session for any user who authenticates via an application. When a user performs a new standard login, it resets the login session.

When you build an application that requires authentication, you can use [sessions](/sessions) to determine if a user is authenticated each time a request is made. These examples are for SPAs that have a lightweight backend and are using the Authorization Code grant (also, native apps and regular web apps. 

Let's say you've built an OIDC-compliant e-commerce website called Storezero.io. 

![View Sample Web Site: Storezero.io](/media/articles/sessions/use-case-storezero.png)

When checking out, a user can optionally log in to the site, but to view the "My Account" pages, the user _must_ log in.

Before checking out, a user wants to view their previous orders, so they navigate to the "All Orders" section in the "My Account" pages.

### User logs in with username and password

1. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint).
2. Your Auth0 Authorization Server creates a session, then redirects the user to the login and authorization prompt.
3. The user authenticates using their username and password and may see a consent page listing the permissions Auth0 will give to the application.
4. Your Auth0 Authorization Server updates the previously-created session to indicate that the user is logged in.
5. Your Auth0 Authorization Server redirects the user back to the application, along with either an ID Token or code (depending on which flow that you use).
6. The application authenticates the user and creates a local session.

Two sessions are created:

* The local session (storezero.io): Allows the application to know if a user is authenticated.

* The session on the Authorization Server (storezero.auth0.com): Allows the Authorization Server to know if a user is authenticated and optionally, tracks other information. For example, the Authorization Server can track whether a user has authenticated using [Multi-factor Authentication (MFA)](/multifactor-authentication). If so, the next time the user arrives at the Authorization Server, they won't need to see a login page or be prompted to use MFA again.

### User logs in with identity provider

Let's say that instead of using their username and password, the user decides to log in with Facebook. 

1. Auth0's SDK creates a local session and redirects the user to the Auth0 Authorization Server (**/authorize** endpoint).
2. Your Auth0 Authorization Server creates a session.
3. Your Auth0 Authorization Server redirects the user to the login prompt.
4. The user chooses to log in with Facebook. 
5. Your Auth0 Authorization Server redirects the user to Facebook's server.
6. Facebook creates a session, then authenticates the user, and updates the session to indicate that the user is logged in.
7. Facebook redirects the user back to the Authorization Server, where the Authorization Server updates its session to indicate that the user is logged in.
8. The Authorization Server redirects the user back to the application, along with either an ID Token or code (depending on which flow you use).
9. The application authenticates the user and updates it's local session to indicate that the user is logged in.

In addition to the two sessions created in the previous example, a third session is created:

* The session on Facebook's server (facebook.com): Allows Facebook to know if the user is authenticated and if so, provides a <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> experience for the user. Since there’s a high probability that the user is already logged in to Facebook, if they choose to log in to storezero.io using Facebook, they will likely not be prompted to enter their credentials.

## For SPAs with no backend using the Implicit grant

When you build an application that requires authentication, you can use [sessions](/sessions) to determine if a user is authenticated each time a request is made. This example is accurate for SPAs that have no backend and are using the Implicit grant. 

Let's say you've built an OIDC-compliant e-commerce website called Storezero.io. 

![View Sample Web Site: Storezero.io](/media/articles/sessions/use-case-storezero.png)

When checking out, a user can optionally log in to the site, but to view the "My Account" pages, the user _must_ log in.

Before checking out, a user wants to view their previous orders, so they navigate to the "All Orders" section in the "My Account" pages.

### User logs in with identity provider

Let's say that the user decides to log in with Facebook. 

1. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint).
2. Your Auth0 Authorization Server creates a session.
3. Your Auth0 Authorization Server redirects the user to the login prompt.
4. The user chooses to log in with Facebook. 
5. Your Auth0 Authorization Server redirects the user to Facebook's server.
6. Facebook creates a session, then authenticates the user, and updates the session to indicate that the user is logged in.
7. Facebook redirects the user back to the Authorization Server, where the Authorization Server updates its session to indicate that the user is logged in.
8. The Authorization Server redirects the user back to the application, passing an ID Token and Access Token.
9. The application authenticates the user.

Since we are using the Implicit Grant, the client (storezero.io) can consume the ID Token to authenticate the user and can use the Access Token to interact with the API (until it expires). So no local session is created to keep the user logged in.

### Keep the user logged in without a local session

Since we have no local session to keep the user logged in, we can use the session on the Authorization Server to determine whether to force the user to reauthenticate. We do this through [Silent Authentication](/api-auth/tutorials/silent-authentication).

We create a hidden iframe that redirects to the Authorization Server adding the `prompt=none` parameter, which tells the server not to prompt the user for any input. If the session on the Authorization Server has not expired, the transaction continues seamlessly, and the client gets a new Access Token through WMRM (Web Message Response Mode), which leverages postMessage.

If the session on the Authorization Server has expired or the user logs out, the redirect in the iframe will return an error, indicating that the application needs to redirect the user to the Authorization Server to reauthenticate.

## Keep reading

* [Sessions](/sessions)
* [Session Layers](/sessions/concepts/session-layers)
* [Cookies](/sessions/concepts/cookies)
* [sameSite Cookie Attributes](/sessions/concepts/cookie-attributes)
* [Session Lifetime](/sessions/concepts/session-lifetime)
* [Logout](/logout)
* [Example: Application Sessions and SSO Sessions Workflow](/sessions/references/example-short-lived-session-mgmt)

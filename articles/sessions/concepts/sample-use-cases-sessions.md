---
title: Sample Use Cases: Sessions
description: Explore sample use cases to understand how sessions work with authentication in Auth0.
topics:
  - sessions
  - sample-use-case
contentType: concept
useCase:
  - build-an-app
---
# Sample Use Cases: Sessions

Auth0 maintains a login session for any user who authenticates via an application. When a user performs a new standard login, it resets the login session.

When you build an application that requires authentication, you can use [sessions](/sessions) to determine if a user is authenticated each time a request is made. Let's look at an example. 

::: note
This example is accurate for native apps, regular web apps, and single-page apps (SPAs) with a lightweight backend that are using the Authorization Code grant. For SPAs with no backend, see [Sample Use Cases: Sessions and Single-Page Apps](/sessions/concepts/sample-use-cases-sessions-spas).
:::

Let's say you've built an OIDC-compliant e-commerce website called Storezero.io. 

![View Sample Web Site: Storezero.io](/media/articles/sessions/use-case-storezero.png)

When checking out, a user can optionally log in to the site, but to view the "My Account" pages, the user _must_ log in.

Before checking out, a user wants to view their previous orders, so they navigate to the "All Orders" section in the "My Account" pages.

## User logs in with Username and Password

1. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint).
2. Your Auth0 Authorization Server creates a session, then redirects the user to the login and authorization prompt.
3. The user authenticates using their username and password and may see a consent page listing the permissions Auth0 will give to the application.
4. Your Auth0 Authorization Server updates the previously-created session to indicate that the user is logged in.
5. Your Auth0 Authorization Server redirects the user back to the application, along with either an ID Token or code (depending on which flow that you use).
6. The application authenticates the user and creates a local session.

Two sessions are created:

* The local session (storezero.io): Allows the application to know if a user is authenticated.

* The session on the Authorization Server (storezero.auth0.com): Allows the Authorization Server to know if a user is authenticated and optionally, tracks other information. For example, the Authorization Server can track whether a user has authenticated using [Multi-factor Authentication (MFA)](/multifactor-authentication). If so, the next time the user arrives at the Authorization Server, they won't need to see a login page or be prompted to use MFA again.

## User logs in with Identity Provider

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

In addition to the two session created in the previous example, a third session is created:

* The session on Facebook's server (facebook.com): Allows Facebook to know if the user is authenticated and if so, provides a [Single Sign-On (SSO)](/sso) experience for the user. Since there’s a high probability that the user is already logged in to Facebook, if they choose to log in to storezero.io using Facebook, they will likely not be prompted to enter their credentials.

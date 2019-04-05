---
title: Sample Use Cases - Sessions and Single-Page Apps
description: Explore sample use cases to understand how sessions work with single-page applications (SPAs) that have no backend and authentication in Auth0.
toc: true
topics:
  - sessions
  - single-page-apps
  - sample-use-case
contentType: concept
useCase:
  - build-an-app
---
# Sample Use Cases: Sessions and Single-Page Apps

When you build an application that requires authentication, you can use [sessions](/sessions) to determine if a user is authenticated each time a request is made. Let's look at an example. 

::: note
This example is accurate for single-page apps (SPAs) that have no backend and are using the Implicit grant. For SPAs that have a lightweight backend and are using the Authorization Code grant (also, native apps and regular web apps), see [Sample Use Cases: Sessions](/sessions/concepts/use-cases-sessions).
:::

Let's say you've built an OIDC-compliant e-commerce website called Storezero.io. 

![View Sample Web Site: Storezero.io](/media/articles/sessions/use-case-storezero.png)

When checking out, a user can optionally log in to the site, but to view the "My Account" pages, the user _must_ log in.

Before checking out, a user wants to view their previous orders, so they navigate to the "All Orders" section in the "My Account" pages.

## User logs in with Identity Provider

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

## Keep the user logged in without a local session

Since we have no local session to keep the user logged in, we can use the session on the Authorization Server to determine whether to force the user to reauthenticate. We do this through [Silent Authentication](/api-auth/tutorials/silent-authentication).

We create a hidden iframe that redirects to the Authorization Server adding the `prompt=none` parameter, which tells the server not to prompt the user for any input. If the session on the Authorization Server has not expired, the transaction continues seamlessly, and the client gets a new Access Token through WMRM (Web Message Response Mode), which leverages postMessage.

If the session on the Authorization Server has expired or the user logs out, the redirect in the iframe will return an error, indicating that the application needs to redirect the user to the Authorization Server to reauthenticate.
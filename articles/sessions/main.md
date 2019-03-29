---
title: Sessions
description: Understand what sessions are and how to implement them.
toc: true
topics:
  - sessions
contentType: concept
useCase:
  - build-an-app
---
# Sessions

A session is a group of interactions between a user and an application that take place within a given timeframe. A single session can contain multiple activities (such as page views, events, social interactions, and e-commerce transactions), all of which the session temporarily stores while the user is connected.

By default, when a user leaves a website or closes their browser, their session ends. To keep users from having to log in every time they return, applications will typically extend sessions by storing session information in a [cookie](/sessions/concepts/cookies). Sessions are then effectively ended when a user logs out or when [session lifetime limits](/sessions/concepts/session-lifetime) are reached.

## Use sessions with authentication in Auth0

When you build an application that requires authentication, you can use sessions to determine if a user is authenticated each time a request is made. Let's look at an example. 

Let's say you've built an OIDC-compliant e-commerce website called Storezero.io. When checking out, a user can optionally log in to the site, but to view the "My Account" pages, the user _must_ log in.

Before checking out, a user wants to view their previous orders, so they navigate to the "All Orders" section in the "My Account" pages.

1. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint).
2. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
3. The user authenticates using their username and password and may see a consent page listing the permissions Auth0 will give to the application.
4. Your Auth0 Authorization Server creates a session stating that the user is logged in.
5. Your Auth0 Authorization Server redirects the user back to the application, along with either an ID Token or code (depending on which flow that you use).
6. The application authenticates the user and creates a local session.

In this case, two sessions are created:

* The local session (storezero.io): Allows the application to know if a user is authenticated.

* The session on the Authorization Server (storezero.auth0.com): Allows the Authorization Server to know if a user is authenticated and optionally, tracks other information. For example, the Authorization Server can track whether a user has authenticated using Multi-factor Authentication. If so, the next time the user arrives at the Authorization Server, they won't need to see a login page or be prompted to use multi-factor authentication again.

Let's say that instead of using their username and password, the user decides to log in with Facebook. 

1. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint).
2. Your Auth0 Authorization Server redirects the user to the login prompt.
3. The user chooses to log in with Facebook. 
4. Your Auth0 Authorization Server redirects the user to Facebook's server.
5. Facebook authenticates the user and creates a session stating that the user is logged in.
6. Facebook redirects the user back to the Authorization Server, where the Authorization Server creates a session stating that the user is logged in.
7. The Authorization Server redirects the user back to the application, along with either an ID Token or code (depending on which flow you use).
8. The application authenticates the user and creates a local session.

In this case, a third session is created:

* The session on Facebook's server (facebook.com): Allows Facebook to know if the user is authenticated and if so, provides a [Single Sign-On (SSO)](/sso) experience for the user. Since there’s a high probability that the user is already logged in to Facebook, if they choose to log in to storezero.io using Facebook, they will likely not be prompted to enter their credentials.

## Keep reading 

- Learn how to [configure your session lifetime settings](/sessions/guides/dashboard/configure-session-lifetime-settings).
---
title: Cookies
description: Understand what cookies are and how they can be used with sessions to track user authentication.
toc: true
topics:
  - cookies
  - sessions
  - authentication
contentType: concept
useCase:
  - build-an-app
---
# Cookies

Cookies are strings of data that a web server sends to the browser. When a browser sends a future request to the web server, it sends the same string to the web server along with its request.

Websites typically use cookies to ensure that users are recognized when they move between pages, so they don't get asked to log in again every time. Websites also use cookies to remember information users have entered. For example, e-commerce sites use cookies to remember the items placed in a shopping cart. 

Users can choose whether to accept cookies by changing the settings in their browser.

## Use cookies with authentication

When you build an application that requires authentication, you can use [sessions](/sessions) and cookies to determine if a user is authenticated each time a request is made. To do this, you can choose to use either stateful or stateless cookies.

### Stateful cookies

Stateful cookies contain a pointer to a database record that stores the session information.

**Pros**:

* Have no limitations on amount of session information stored.
* Can easily clear a user's session--just remove the record from the database.

**Cons**:

* Requires a database to store the session data (but most web applications already have this).
* Increases latency because you have to make database calls to read the session (and sometimes write it) for each HTTP request a user makes.
* Can be challenging to scale when you have many users and therefore many reads/writes to your database.

### Stateless cookies

Stateless cookies are self-contained; they include all session information that you need (for authenticated users, the user ID) and reside on the client. To prevent external tampering, stateless cookies should be encrypted (or at least signed).

**Pros**:

* Can implement easily; doesn’t require a special backend.
* Reduces latency because you don't have to call a database.
* Easy to scale.

**Cons**:

* Must restrict stored session information because cookies are limited in size (max 4KB in most browsers). Although session information may be split between multiple cookies, we don't recommend it.
* Makes it difficult to revoke a session, because there is no record in a database you can delete; you’ll need to find other methods to forcefully clear a session.
* If using multiple web servers, must make sure all servers have the key to encrypt/decrypt or sign the cookie.

## Keep reading

* [Auth0 Privacy & Cookie Policy](https://auth0.com/privacy)
* [Sessions](/sessions)
* [Session Layers](/sessions/concepts/session-layers)
* [Session Lifetime](/sessions/concepts/session-lifetime)
* [sameSite Cookie Attributes](/sessions/concepts/cookie-attributes)
* [Logout](/logout)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
* [Example: Short-lived session management workflow](/sessions/references/example-short-lived-session-mgmt)

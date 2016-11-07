---
order: 02
title: Mobile + API
image: /media/articles/architecture-scenarios/mobile-api.png
extract: Mobile Application “Client” which talks to an API (“Resource Server”). The application will use OpenID Connect with the Authorization Grant Flow (with the PKCE extension) to authenticate users.
description: Explains the architecture scenario with a mobile application client communicating with an API.
---

# Mobile + API

![](/media/articles/architecture-scenarios/mobile-api.png)

In this scenario you have a Mobile Application “Client” which talks to an API (“Resource Server”). The application will use OpenID Connect with the Authorization Grant Flow (with the PKCE extension) to authenticate users.

When a user logs in, Auth0 will return to the application an access_token, an id_token, and optionally a refresh_token. The access_token is used to securely call the API on behalf of the user, whereas the id_token is consumed only by the client and contains user profile data. Alternatively the user profile can be obtained by calling the /userinfo endpoint in the Auth0 Authentication API with the access_token.

If a refresh_token was obtained (by including the “offline_access” value in the scope query parameter), the Client can use it to obtain a new access_token whenever a previous one expires.

The application will usually store the information about the user’s session (i.e. whether they are logged in, their tokens, user profile data, etc) inside some sort of Local Storage on the mobile device.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Native Apps](/quickstart/native/)
* [Lock for iOS and OS X](/libraries/lock-ios)
* [Lock for Android](/libraries/lock-android)
* [API Authentication and Authorization](/api-auth)
* [API Auth: Authorization Code Grant](/api-auth/grant/authorization-code)
* [Auth0 access_token](/tokens/access_token)
* [Auth0 id_token](/tokens/id_token)
* [Auth0 refresh_token](/tokens/refresh_token)

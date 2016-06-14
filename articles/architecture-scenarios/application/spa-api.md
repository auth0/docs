---
order: 01
title: SPA + API
image: /docs/media/articles/architecture-scenarios/spa-api.png
extract: Single Page Web Application “Client” which talks to an API (“Resource Server”). The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.
---

# SPA + API

![](/media/articles/architecture-scenarios/spa-api.png)

In this scenario you have a Single Page Web Application “Client” which talks to an API (“Resource Server”). The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.

When a user logs in, Auth0 will return to the application an access_token as well as an id_token. The access_token is used to securely call the API on behalf of the user, whereas the id_token is consumed only by the client and contains user profile data. Alternatively the user profile can be obtained by calling the /userinfo endpoint in the Auth0 Authentication API with the access_token.

The application will usually store the information about the user’s session (i.e. whether they are logged in, their tokens, user profile data, etc) inside some sort of storage such a Local Storage.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Single Page App](https://auth0.com/docs/quickstart/spa/)
* [Lock](https://auth0.com/docs/libraries/lock)
* [API Authentication and Authorization](https://auth0.com/docs/api-auth)
* [API Auth: Implicit Grant](https://auth0.com/docs/api-auth/grant/implicit)
* [Auth0 access_token](https://auth0.com/docs/tokens/access_token)
* [Auth0 id_token](https://auth0.com/docs/tokens/id_token)
 
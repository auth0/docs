---
order: 04
title: Regular Web App (using OIDC)
image: /docs/media/articles/architecture-scenarios/web-oidc.png
extract: Traditional web application which needs to authenticate users using OpenID Connect.
---

# Regular Web APP (using OIDC)

![](/media/articles/architecture-scenarios/web-oidc.png)

In this scenario you have a traditional web application which needs to authenticate users using OpenID Connect. The web application will use the Authorization Code Flow to authenticate the user, and can then subsequently use the id_token which is returned to obtain information about the user.

The application will also typically create a user session which is stored in one or more cookies to keep track of the user which is logged in.

**Note:** In this scenario an access_token is also returned but it is rarely used since there is no API involved against which the user needs to be authenticated.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Regular Web App](https://auth0.com/docs/quickstart/webapp/)
* [Lock](https://auth0.com/docs/libraries/lock)
* [Auth0 id_token](https://auth0.com/docs/tokens/id_token)

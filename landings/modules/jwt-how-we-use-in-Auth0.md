---
public: false
image: "/media/landings/jwt-in-auth0/jwt-in-auth0.png"
imageAlt: "How JSON Web Tokens are used in Auth0."
imagePosition: "center"
budicon: 608
color: "#2F383D"
title: "How we use JSON Web Tokens in Auth0?"
---

In Auth0, we issue JWTs as a result of the authentication process. When the user logs in using Auth0, a JWT is created, signed, and sent to the user. Auth0 supports signing JWT with both HMAC and RSA algorithms. This token will be then used to authenticate and authorize with APIs which will grant access to their protected routes and resources.

We also use JWTs to perform authentication and authorization in Auth0's API v2, replacing the traditional usage of regular opaque API keys. Regarding authorization, JSON Web Tokens allow granular security, that is the ability to specify a particular set of permissions in the token, which improves debuggability.
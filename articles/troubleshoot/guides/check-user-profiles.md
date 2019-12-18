---
title: Check User Profiles
description: 
topics:
  - login-issues
contentType: how-to
useCase: troubleshooting
---

# Check User Profiles

* Is user profile information correct at the source (authorization server)?
* Check the HTTP Archive, look for an `id_token`.
* Decode the `id_token` at [JWT.io](https://jwt.io) to see if it has the correct information.
* Check any custom database scripts or rule logic.
* Check if you called `/tokeninfo` endpoint and have a custom domain configured within Auth0. If so, you need to use `/userinfo` endpoint instead
* Check if you called `/userinfo` endpoint properly. You should pass an access token. You should call this endpoint with the default Auth0 domain even if the tenant has a custom domain enabled.  
* Check if you specified the correct [scope](/scopes) to get an Access Token?

## Keep reading

* 
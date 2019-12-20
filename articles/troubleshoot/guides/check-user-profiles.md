---
title: Check User Profiles
description: Learn how to check user profiles to troubleshoot issues. 
topics:
  - login-issues
contentType: how-to
useCase: troubleshooting
---

# Check User Profiles

1. Is user profile information correct at the source (authorization server)?
2. Generate and check the [HAR file](/troubleshoot/guides/generate-har-files), look for an `id_token`.
3. Decode the `id_token` at [JWT.io](https://jwt.io) to see if it has the correct information.
4. Check any custom database scripts or rule logic.
5. Check if you called `/tokeninfo` endpoint and have a custom domain configured within Auth0. If so, you need to use `/userinfo` endpoint instead
6. Check if you called `/userinfo` endpoint properly. You should pass an access token. You should call this endpoint with the default Auth0 domain even if the tenant has a custom domain enabled.  
7. Check if you specified the correct [scope](/scopes) to get an Access Token.

<%= include('../_includes/_log_events_link') %>

## Keep reading

* [User Profiles Overview](/users/concepts/overview-user-profile)
* [Normalized User Profiles](/users/normalized/auth0)
* [User Profile Structure](/users/references/user-profile-structure)

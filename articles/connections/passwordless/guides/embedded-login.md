---
title: Passwordless Authentication with Embedded Login
description: Passwordless Authentication with Embedded Login
toc: true
topics:
    - connections
    - passwordless
    - authentication
---
# Passwordless Authentication with Embedded Login

Auth0 supports two way of implementing authentication: *Embedded Login* and *Universal Login*. 

The industry is aligned in that redirecting to the [Universal Login](/connections/passwordless/guides/universal-login) page is the proper way to implement authentication in all apps, but in the case of Native Applications, sometimes customers prefer to implement Embedded Login for UX reasons. 

If you need to embed the login user interface in your application, you can do it by using our [Embedded Passwordless API](/connections/passwordless/reference/relevant-api-endpoints) or our SDKs. 

Depending on the kind of application you want to build, you'll need to implement it differently:

- For Single Page Applications (e.g. Angular / React), refer to [Embedded Passwordless Login in Single Page Applications](/connections/passwordless/guides/embedded-login-spa).
- For Native applications (iOS, Android, desktop applications) refer to [Embedded Passwordless Login in Native Applications](/connections/passwordless/guides/embedded-login-native). 
- For Regular Web Applications (NodeJS, Java, Rails, .NET) please check [Embedded Passwordless Login in Regular Web Applications](/connections/passwordless/guides/embedded-login-webapps).

## Keep reading
 * [Passwordless Authentication Overview](/connections/passwordless)
 * [Best practices for Passwordless Authentication](connections/passwordless/guides/best-practices)
 * [Passwordless API Documentation](/connections/passwordless/reference/relevant-api-endpoints)
 * [Migrating from deprecated Passwordless endpoints](/migrations/guides/migration-oauthro-oauthtoken-pwdless)

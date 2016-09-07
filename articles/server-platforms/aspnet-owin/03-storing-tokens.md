---
title: Storing Tokens
description: This tutorial will show you how store the tokens returned from Auth0 in order to use them later on.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-mvc-sample',
  pkgBranch: 'master',
  pkgPath: '03-Storing-Tokens',
  pkgFilePath: '03-Storing-Tokens/MvcApplication/MvcApplication/web.config',
  pkgType: 'replace'
}) %>

The Auth0 OAuth2 middleware will automatically add the `id_token` and `access_token` as claims on the `ClaimsIdentity`.

This means that inside any of your controllers you can simply cast the `User.Identity` property to a `ClaimsIdentity`, and then find the particular claim by querying the `Claims` property.

The sample code below shows how you can extract the claims for the `access_token` and `id_token` respectively:

``` csharp
var claimsIdentity = User.Identity as ClaimsIdentity;

// Extract tokens
string accessToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "access_token")?.Value;
string idToken = claimsIdentity?.Claims.FirstOrDefault(c => c.Type == "id_token")?.Value;
```

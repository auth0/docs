---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Java Spring Security SDK to add authentication and authorization to your API.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
* Spring 4.2.4
* Spring Security 4.0.1
:::

<%= include('../../_includes/_package', {
githubUrl: 'https://github.com/auth0-samples/auth0-spring-security-api-sample',
pkgOrg: 'auth0-samples',
pkgRepo: 'auth0-spring-security-api-sample',
pkgBranch: 'master',
pkgPath: null,
pkgFilePath: null,
pkgType: 'none'
}) %>

If you have an existing application, please follow the steps below. You can find some useful information on our [GitHub library](https://github.com/auth0/auth0-spring-security-api).


### 2. Configure Spring to use Auth0

Add these annotations to your application class:

${snippet(meta.snippets.configure)}


### 3. Create the controllers

Now, you can create the controllers. Every controller that has a route inside `/secured/` will ask for the JWT.

${snippet(meta.snippets.use)}

### 4. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT [id_token](/tokens#auth0-id_token-jwt-).

```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

Before making the request you should replace the port (`8000`) with the one on which your app is listening.

### 5. You're done!

You have configured your Java Spring Security API to use Auth0. Congrats, you're awesome!

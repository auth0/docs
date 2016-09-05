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

In this step we will see how we can add role based authorization to our API, using [Rules](/rules).

## 1. Create a Rule to assign roles

In our example we will create a simple rule that assigns two roles (`ROLE_ADMIN` and `ROLE_USER`) to any user. Of course you can change our sample code to match your needs.

To create a new rule, navigate to the [new rule page](${uiURL}/#/rules/new) and select the __Set Roles To A User__ template, under _Access Control_. Then, replace the sample script with the following:

${snippet(meta.snippets.newRule)}

The first condition of this rule makes sure that it runs only for a specific `CLIENT_ID`. Make sure the value matches the `CLIENT_ID` of the Client you are using for this API.

## 2. Secure the endpoints

For our sample, we will allow anyone to call our `ping` endpoint. We will also allow both `ROLE_USER` and `ROLE_ADMIN` to perform `GET` operations on our `/api/v1/profiles/**` endpoints. However, we will restrict the `POST`, `PUT` and `DELETE` operations to strictly `ROLE_ADMIN` role privilege.

Add the following code at the `AppConfig.java`:

${snippet(meta.snippets.AppConfig)}

### 3. Call Your API

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

### 4. You're done!

You have configured your Java Spring Security API to use Auth0. Congrats, you're awesome!

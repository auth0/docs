---
title: Authenticate
description: This tutorial will show you how to use the Auth0 WCF SDK to add authentication and authorization to your API.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Visual Studio 2015
:::

<%= include('../../_includes/_signup') %>

This tutorial explains how to consume a WCF service, validating the identity of the caller.

When calling a Web Service (or an API in general) there are two ways users are typically authenticated:

* Through a client that has access to a key that can be used to obtain a token.
* Through a client that has access to a token that was obtained through some other method.

The first scenario usually happens on trusted clients (e.g. a script, a desktop application). The second scenario is more often a browser, or a mobile native app.

For this tutorial, we will assume the standard WCF template with a `basicHttpBinding`.

## Using Auth0 generated JsonWebTokens with WCF services

The integration consists of adding a `ServiceAuthorizationManager` (which is an extensibility point offered by WCF). This class intercepts all calls to a specific service and extracts the HTTP `Authorization` header that contains the JsonWebToken. Then it validates the token using a symmetric or asymmetric key, checks that it's not expired, and finally verifies that the `audience` is correct. If all these are correct, control is transfered to the user code with a `ClaimsPrincipal` object set for the app to use.

### 1. Install Auth0-WCF-Service-JWT NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-MVC** package, running the command:

${snippet(meta.snippets.dependencies)}

> This package creates the `ServiceAuthorizationManager` and will add a set of configuration settings.

### 2. Completing your app Web.Config with Auth0 settings

${snippet(meta.snippets.setup)}

### 3. Accessing user information

Once the user is successfully authenticated with the application, a `ClaimsPrincipal` will be generated which can be accessed through the `User` or `Thread.CurrentPrincipal` properties:

${snippet(meta.snippets.use)}

### 4. Attaching a token on the client

Install the NuGet package on the client side

```
Install-Package Auth0-WCF-Client
```

Extract the `id_token` from the `ClaimsPrincipal` and attach it to the WCF request

```cs
// get JsonWebToken from logged in user
string token = ClaimsPrincipal.Current.FindFirst("id_token").Value;

// attach token to WCF request
client.ChannelFactory.Endpoint.Behaviors.Add(new AttachTokenEndpointBehavior(token));

// call WCF service
// client.CallService();
```

> **Note**: the above asumes that the WCF service is protected with the same client secret as the web site. If you want to call a service protected with a different secret you can obtain a delegation token as shown below:

```cs
// get JsonWebToken from logged in user
string token = ClaimsPrincipal.Current.FindFirst("id_token").Value;

// create an Auth0 client to call the /delegation endpoint using the client id and secret of the caller application
var auth0 = new Auth0.Client("...caller client id...", "...caller client secret...", "${account.namespace}");
var result = auth0.GetDelegationToken(token, "${account.clientClient}");

// attach token to WCF request
client.ChannelFactory.Endpoint.Behaviors.Add(new AttachTokenEndpointBehavior(result));
```

**Congratulations!**

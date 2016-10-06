---
title: Authenticate
description: This tutorial will show you how to use the Auth0 ASP.NET Web API SDK to add authentication and authorization to your API.
---

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-aspnet',
  pkgBranch: 'master',
  pkgPath: 'examples/webapi',
  pkgFilePath: 'examples/webapi/Api/Web.config',
  pkgType: 'replace'
}) %>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API app to use it with Auth0.**

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* MicroSoft Visual Studio 2015
* WebApi.JsonWebToken NuGet Package v0.2.0
* Auth0-ASPNET NuGet Package v1.4.0
* Microsoft.AspNet.WebApi.Cors NuGet Package v5.2.3
:::



### 1. Install the WebApi.JsonWebToken &amp; Auth0-ASPNET packages

You can either run the following commands or install them via **Package Manager**.

${snippet(meta.snippets.dependencies)}

### 2. Configure the JsonWebToken message handler

Open the **WebApiConfig.cs** file located in the **App_Start** folder and add the following `using` statements:
```cs
using YOUR_WEBAPI_PROJECT_NAME.App_Start;
using System.Web.Configuration;
```
Remember to replace the placeholder for your project name in the first `using` statement.

Add the following code snippet inside the `Register` method.

${snippet(meta.snippets.use)}

### 3. Update the web.config file with your app's credentials
Open the **Web.config** file located at the project's root.

Locate the following entries inside the `<appSettings>` section.

${snippet(meta.snippets.setup)}

Set the respective values.

### 4. Securing your API
All you need to do now is add the `[System.Web.Http.Authorize]` attribute to the controllers/actions for which you want to verify that users are authenticated.

### 5. Call Your API
You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

### 6. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!


### Optional Steps
#### Configuring CORS

One of the requirements is package Microsoft.AspNet.WebApi.Cors. You can use the following command from VS2013 Package Manager Console:

`Install-Package Microsoft.AspNet.WebApi.Cors`

For more details, you can follow [this article](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api) to configure CORS in your application.

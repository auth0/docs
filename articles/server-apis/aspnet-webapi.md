---
title: ASP.NET Web API Tutorial
name: ASP.NET Web API
alias:
  - webapi
  - asp.net webapi
  - aspnet webapi
language:
  - Visual Basic .Net
  - C#
framework:
  - WebAPI
thirdParty: false
image: /media/platforms/asp.png
lodash: true
tags:
  - quickstart
snippets:
  dependencies: server-apis/aspnet-webapi/dependencies
  setup: server-apis/aspnet-webapi/setup
  use: server-apis/aspnet-webapi/use
---

## ASP.NET Web API Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-aspnet',
  pkgBranch: 'master',
  pkgPath: 'examples/webapi',
  pkgFilePath: 'examples/webapi/Api/Web.config',
  pkgType: 'replace' + account.clientParam
}) %>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API app to use it with Auth0.**

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

### 5. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!


### Optional Steps
#### Configuring CORS

One of the requirements is package Microsoft.AspNet.WebApi.Cors. You can use the following command from VS2013 Package Manager Console:

`Install-Package Microsoft.AspNet.WebApi.Cors`

For more details, you can follow [this article](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api) to configure CORS in your application.

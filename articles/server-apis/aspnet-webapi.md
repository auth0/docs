---
title: ASP.NET Web API Tutorial
name: ASP.NET Web API
thirdParty: false
image: //auth0.com/lib/platforms-collection/img/asp.png
lodash: true
tags:
  - quickstart
snippets:
  dependancies: server-apis/aspnet-webapi/dependancies
  setup: server-apis/aspnet-webapi/setup
  use: server-apis/aspnet-webapi/use
---

## ASP.NET Web API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0.net/master/create-package?path=examples/webapi&filePath=examples/webapi/Api/Web.config&type=replace@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
        <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API app to use it with Auth0.**

### 1. Install the WebApi.JsonWebToken &amp; Auth0-ASPNET packages

You can either run the following commands or install them via **Package Manager**.

@@snippet(meta.snippets.dependancies)@@

### 2. Configure the JsonWebToken message handler

Open the **WebApiConfig.cs** file located in the **App_Start** folder and add the following `using` statements:
```cs
using Api.App_Start;
using System.Web.Configuration;
```

Add the following code snippet inside the `Register` method.

@@snippet(meta.snippets.use)@@

### 3. Update the web.config file with your app's credentials
Open the **web.config** file located at the solution's root.

Add the following entries as children of the `<appSettings>` element.

@@snippet(meta.snippets.setup)@@

### 4. Securing your API
All you need to do now is add the `[System.Web.Http.Authorize]` attribute to the controllers/actions for which you want to verify that users are authenticated.

### 5. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!


### Optional Steps
#### Configuring CORS

One of the requirements is package Microsoft.AspNet.WebApi.Cors. You can use the following command from VS2013 Package Manager Console:

`Install-Package Microsoft.AspNet.WebApi.Cors`

For more details, you can follow [this article](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api) to configure CORS in your application.

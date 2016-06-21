---
title: Authenticate
description: This tutorial will show you how to use the ASP.NET Core JWT Middleware to add authentication and authorization to your API.
---

## ASP.NET Core Web API Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Microsoft Visual Studio 2015
* .NET Core RC2
* .NET Core RC2 Tools for Visual Studio 2015 (Preview 1)

If you do not have the correct tools installed, please [follow the instructions](https://www.microsoft.com/net/core#windows) on the .NET Core Website.
:::

### 1. Creating a new web project in Visual Studio

In Visual Studio, create a new project by selecting File > New > Project. Under the .NET Core section, select ASP.NET Core Web application:

![](/media/articles/aspnet-core-webapi/new-project.png)

Next, select Web API:

![](/media/articles/aspnet-core-webapi/aspnet-project-type.png)

### 2. Setup NuGet dependencies

Install and update the following NuGet packages:

${snippet(meta.snippets.dependencies)}

### 3. Configure RS256 JSON Web Tokens

The first thing you need to do is to ensure that your Auth0 Application is configured to use RS256 to sign the JSON Web Token, which will sign the tokens using your Application's Client Secret.

Go to the Application in your Auth0 Dashboard and go to Settings > Advanced Settings > OAuth and ensure the **JsonWebToken Signature Algorithm** is set to **RS256**.

### 4. Specify Auth0 Settings

While in the Application settings area of your Auth0 Dashboard, copy the **Domain** and **Client ID** values for your application and add them to your `appsettings.json` file:

``` json
{
  "auth0": {
    "domain": "${account.namespace}",
    "clientId": "${account.clientId}"
  }
}
```

## 5. Configure JWT middleware

Next you need to configure the JWT Middleware in the `Configure` method of your `Startup` class:

``` csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    loggerFactory.AddConsole(Configuration.GetSection("Logging"));
    loggerFactory.AddDebug();

    var options = new JwtBearerOptions
    {
        Audience = Configuration["auth0:clientId"],
        Authority = $"https://{Configuration["auth0:domain"]}/"
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
}
```

## 6. Secure your Controller Actions

Next you can secure the controller actions for which a user needs to be authenticated by adding the `[Authorize]` attribute to the Action:

``` csharp
public class ValuesController : Controller
{
    [HttpGet]
    [Route("ping")]
    public string Ping()
    {
        return "All good. You don't need to be authenticated to call this.";
    }

    [Authorize]
    [HttpGet]
    [Route("secured/ping")]
    public string PingSecured()
    {
        return "All good. You only get this message if you are authenticated.";
    }
}
```

## 7. Test your application

You can test your application by obtaining an `id_token` from Auth0 and then passing that token in the `Authorization` header of a request as a Bearer token.

Here is a sample RAW request:

``` bash
GET /secured/ping HTTP/1.1
Host: localhost:5000
Authorization: Bearer <your token>
```

Or using [RestSharp](http://restsharp.org/):

``` csharp
var client = new RestClient("http://localhost:5000/secured/ping");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer <your token>");
IRestResponse response = client.Execute(request);
```

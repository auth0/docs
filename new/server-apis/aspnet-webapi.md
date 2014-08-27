---
lodash: true
---

## ASP.NET Web API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="https://docs.auth0.com/auth0.net/master/create-package?path=examples/webapi&type=net@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %> 
        <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a> 
  </blockquote>
</div>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API app to use it with Auth0.**

### 1. Install the WebApi.JsonWebToken package

You can either run the following command or install it via **Package Manager**.
````Powershell
Install-Package WebApi.JsonWebToken
```

### 2. Configure the JsonWebToken message handler

Open the **WebApiConfig.cs** file located in the **App_Start** folder and add the following `using` statements:
````CSharp
using Api.App_Start;
using System.Web.Configuration;
```

Add the following code snippet inside the `Register` method.
````CSharp
var clientID = WebConfigurationManager.AppSettings["Auth0ClientID"];
var clientSecret = WebConfigurationManager.AppSettings["Auth0ClientSecret"];

config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
{
    Audience = clientID,
    SymmetricKey = clientSecret
});
```

### 3. Update the web.config file with your app's credentials
Open the **web.config** file located at the solution's root.

Add the following entries as children of the `<appSettings>` element. 
````xml
<add key="Auth0ClientID" value="<%= account.clientId %>"/>
<add key="Auth0ClientSecret" value="<%= account.clientSecret %>"/>
```

### 4. Securing your API
All you need to do now is add the `[System.Web.Http.Authorize]` attribute to the controllers/actions for which you want to verify that users are authenticated.

### 5. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!


### Optional Steps
#### Configuring CORS

You can follow [this article](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api) to configure CORS in your application.

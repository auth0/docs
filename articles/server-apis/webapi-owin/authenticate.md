---
title: Authenticate
description: This tutorial will show you how to use the Auth0 ASP.NET Web API OWIN SDK to add authentication and authorization to your API.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Visual Studio 2015
* .NET Framework 4.5.2
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-aspnet-owin',
  pkgBranch: 'master',
  pkgPath: 'examples/WebApi',
  pkgFilePath: 'examples/WebApi/Api/Web.config',
  pkgType: 'replace'
}) %>

**Otherwise, please follow the steps below to configure your existing ASP.NET Web API OWIN app to use it with Auth0.**

### 1. Setup NuGet dependencies

Install and update the following NuGet packages:

${snippet(meta.snippets.dependencies)}

### 2. Configure Json Web Token authentication

Open the **Startup.cs** class located inside the **App_Start** folder.

Add the following using statements
```cs
using Microsoft.Owin.Security.Jwt;
using System.Web.Http;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security;
using WebConfigurationManager = System.Web.Configuration.WebConfigurationManager;
```

Update the `Configuration` method with the following code:

> Important: The JWT handler *must* be registered before `app.UseWebApi(config)` as ordering of OWIN middleware is important.

${snippet(meta.snippets.use)}

### 3. Update the web.config file with your app's credentials
Open the **web.config** file located at the solution's root.

Add the following entries as children of the `<appSettings>` element.

${snippet(meta.snippets.setup)}

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

### 6. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Optional Steps
#### Configuring CORS

To configure CORS you need to first install the `Microsoft.Owin.Cors` NuGet package. Once that is done you can simply update the configuration method in your **Startup** class as shown in the following snippet:
```cs
app.UseCors(CorsOptions.AllowAll);
```

> Important: The CORS policy used in the previous code snippet is not recommended for a production. You will need to implement the `ICorsPolicyProvider` interface.

#### Working with claims
If you want to read/modify the claims that are populated based on the JWT you can use the following extensibility points:
```cs
string token = string.Empty;

// Api controllers with an [Authorize] attribute will be validated with JWT
app.UseJwtBearerAuthentication(
    new JwtBearerAuthenticationOptions
    {
        AuthenticationMode = AuthenticationMode.Active,
        AllowedAudiences = new[] { audience },
        IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
        {
            new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
        },
        Provider = new OAuthBearerAuthenticationProvider
        {
            OnRequestToken = context =>
            {
                token = context.Token;
                return Task.FromResult<object>(null);
            },
            OnValidateIdentity = context =>
            {
                if (!string.IsNullOrEmpty(token))
                {
                    var notPadded = token.Split('.')[1];
                    var padded = notPadded.PadRight(notPadded.Length + (4 - notPadded.Length % 4) % 4, '=');
                    var urlUnescaped = padded.Replace('-', '+').Replace('_', '/');
                    var claimsPart = Convert.FromBase64String(urlUnescaped);

                    var obj = JObject.Parse(Encoding.UTF8.GetString(claimsPart, 0, claimsPart.Length));

                    // simple, not handling specific types, arrays, etc.
                    foreach (var prop in obj.Properties().AsJEnumerable())
                    {
                        if (!context.Ticket.Identity.HasClaim(prop.Name, prop.Value.Value<string>()))
                        {
                            context.Ticket.Identity.AddClaim(new Claim(prop.Name, prop.Value.Value<string>()));
                        }
                    }
                }

                return Task.FromResult<object>(null);
            }
        }
    });
```

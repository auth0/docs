---
description: How to use Auth0 with Microsoft Azure.
url: /azure-tutorial
topics:
  - integrations
  - microsoft
  - azure
contentType:
- how-to
- index
useCase: integrate-saas-sso
---
# Using Auth0 with Microsoft Azure

Auth0 is as simple to integrate in an application deployed on [Microsoft Azure](https://azure.microsoft.com) as it is for any other environment. To get started, please consider these tutorials:

* [ASP.NET application](/quickstart/backend/aspnet-core-webapi-v1_1) <br />
Simple non-intrusive integration with any version of ASP.NET.

* [Node.js application](/quickstart/backend/nodejs) <br />
Integration using [passport](http://passportjs.org/).

* [Microsoft Azure Mobile Services](https://auth0.com/blog/Authenticate-Azure-Mobile-Services-apps-with-Everything-using-Auth0/) <br />
Blog post explaining how to integrate with a Microsoft Azure Mobile Services backend.

---

### Tip: change Auth0 configuration when deploying to Microsoft Azure

Configuration changes are necessary when deploying to Microsoft Azure. Auth0 recommends creating one application per environment. For example, an application may exist in three environments: "Dev", "Test", and "Production".

Each environment will want to have a different `Client Id` , `Client Secret`, and with an appropriate `Callback URL`. For ASP.NET applications, we recommend utilizing [Web.config transformations](http://msdn.microsoft.com/en-us/library/dd465326.aspx) to make configuration changes targeted for each environment. Application settings that appear in the transformed `web.config` will depend on the build target name used at compilation and deployment.

Below we will compile and deploy our application. We first have our base configuration of `Web.config`, followed by the transformations in `Web.Release.Config`. We want to utilize the `Release` build and are targeting our "Production" environment.

`Web.config`
```xml
<add key="auth0:ClientId" value="YOUR_DEV_CLIENT_ID" />
<add key="auth0:ClientSecret" value="YOUR_DEV_CLIENT_SECRET" />
<add key="auth0:CallbackUrl" value="http://localhost:port/LoginCallback.ashx" />
```

`Web.Release.config`
```xml
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <appSettings>
    <add key="auth0:ClientId" value="YOUR_PROD_CLIENT_ID" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="auth0:ClientSecret" value="YOUR_PROD_CLIENT_SECRET" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="auth0:CallbackUrl" value="http://mysite.azurewebsites.net/LoginCallback.ashx" xdt:Transform="Replace" xdt:Locator="Match(key)" />
  </appSettings>
</configuration>
```

Any need to reference the `Client Id`, `Client Secret` or `Callback URL` from .NET can be accomplished using the [`ConfigurationManager`](https://docs.microsoft.com/en-us/dotnet/api/system.configuration.configurationmanager?view=netframework-4.7.2) class. Below is an example of using the `ConfigurationManager` within an ASP.NET MVC Razor view.

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
    var lock = new Auth0Lock('@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]', '${account.namespace}');

    lock.show({
      callbackURL: '@System.Configuration.ConfigurationManager.AppSettings["auth0:CallbackUrl"]'
    });
</script>
```

Create appropriate builds in your ASP.NET application for "Dev" and "Test" to target the other environments in our example.

Running  `web.config` transformations are helpful whether deploying to a [Microsoft Azure App Service](https://azure.microsoft.com/en-us/services/app-service/) or a [Microsoft Azure Cloud Service](https://azure.microsoft.com/en-us/services/cloud-services/).

::: note
Use the [Web.config Transformation Tester](http://webconfigtransformationtester.apphb.com/) to verify the results of any `web.config` transformations.
:::
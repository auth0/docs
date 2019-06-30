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

Auth0 is as simple to integrate in an application deployed on [Microsoft Azure](https://azure.microsoft.com) as it is for any other environment. To get started, please see:

* [ASP.NET application](/quickstart/backend/aspnet-core-webapi-v1_1) <br />
Simple non-intrusive integration with any version of ASP.NET.

* [Node.js application](/quickstart/backend/nodejs) <br />
Integration using [passport](http://passportjs.org/).

* [Microsoft Azure Mobile Services](https://auth0.com/blog/Authenticate-Azure-Mobile-Services-apps-with-Everything-using-Auth0/) <br />
Blog post explaining how to integrate with a Microsoft Azure Mobile Services backend.

---

### Tip: change Auth0 configuration when deploying to Microsoft Azure

You'll need to make some configuration changes when deploying to Microsoft Azure. Auth0 recommends creating one application per environment (e.g. Development, Test, Production). This is because each environment should have and use a different `Client Id` and `Client Secret`, as well as the appropriate <dfn data-key="callback">`Callback URL`</dfn>.

For ASP.NET applications, we recommend utilizing [Web.config transformations](http://msdn.microsoft.com/en-us/library/dd465326.aspx) to make configuration changes targeted for each environment. Application settings that appear in the transformed `web.config` will depend on the build target name used at compilation and deployment.

The following is an example of how you can compile and deploy your application. The example focuses on deploying to Production, but you can use it to create builds in your ASP.NET application targeting your other environments.


This is the base configuration in `Web.config`:

```xml
<add key="auth0:ClientId" value="YOUR_DEV_CLIENT_ID" />
<add key="auth0:ClientSecret" value="YOUR_DEV_CLIENT_SECRET" />
<add key="auth0:CallbackUrl" value="http://localhost:port/LoginCallback.ashx" />
```

The following snippet, `Web.Release.config`, contains the necessary transformations. We want to utilize the `Release` build and are targeting Production.

```xml
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <appSettings>
    <add key="auth0:ClientId" value="YOUR_PROD_CLIENT_ID" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="auth0:ClientSecret" value="YOUR_PROD_CLIENT_SECRET" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="auth0:CallbackUrl" value="http://mysite.azurewebsites.net/LoginCallback.ashx" xdt:Transform="Replace" xdt:Locator="Match(key)" />
  </appSettings>
</configuration>
```

If you need to refer to the `Client Id`, `Client Secret` or `Callback URL`, you can do so using the [`ConfigurationManager`](https://docs.microsoft.com/en-us/dotnet/api/system.configuration.configurationmanager?view=netframework-4.7.2) class. Below is an example of using the `ConfigurationManager` within an ASP.NET MVC Razor view.

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
    var lock = new Auth0Lock('@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]', '${account.namespace}');

    lock.show({
      callbackURL: '@System.Configuration.ConfigurationManager.AppSettings["auth0:CallbackUrl"]'
    });
</script>
```

Running  `web.config` transformations are helpful whether deploying to a [Microsoft Azure App Service](https://azure.microsoft.com/en-us/services/app-service/) or a [Microsoft Azure Cloud Service](https://azure.microsoft.com/en-us/services/cloud-services/).

::: note
Use the [Web.config Transformation Tester](http://webconfigtransformationtester.apphb.com/) to verify the results of any `web.config` transformations.
:::

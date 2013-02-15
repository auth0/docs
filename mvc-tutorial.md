# Using Auth0 with ASP.NET MVC 4

Integrating Auth0 with ASP.NET MVC4 is simple. MVC4 ships with out-of-the-box support for external identity providers using the [DotnetOpenAuth library](http://www.dotnetopenauth.net/). Auth0 plugs into this infrastructure.

##Before you start

1. You will need Visual Studio 2012 and MVC4
2. We also assume you have Google OAuth2 connection enabled. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.

##Integrating Auth0 with MVC4

####1. Create a simple MVC website and install Auth0 client

For this example, we will use the standard template that ships with Visual Studio 2012. Select __"FILE -> New project -> MVC 4 Web Application -> Internet Application"__

Once the default template unfolds, use NuGet to install the **DotNetOpenAuth-Auth0**, running the command:

	Install-Package DotNetOpenAuth-Auth0

![](img/install-dotnetopenauth-auth0-nuget.png)

> [DotNetOpenAuth-Auth0](https://nuget.org/packages/DotNetOpenAuth-Auth0) is a helper class that plugs into DotNetOpenAuth. Most of the heavylifting is actually done by the __OAuth2Client__ though. Our helper just makes sure you are using the right endpoints and sending the right parameters to Auth0.
>

####2. Register Auth0Client in the AuthConfig

Open the AuthConfig.cs file (under `App_Start` folder), and look for the ```RegisterAuth``` method:

    public static class AuthConfig
    {
        public static void RegisterAuth()
        {
            
            Auth0.OpenAuthClient.RegisterAllSocialProviders(
                    "@@account.clientId@@",
                    "@@account.clientSecret@@",
                    "@@account.namespace@@"); 

        }
    }

> This will query the Auth0 HTTP Api and list all the social providers you have enabled. Then it will register in DotNetOpenAuth a client per each provider. 


####3. Setup the callback URL in Auth0

Go to [Settings](https://app.auth0.com/#/settings) and make sure to set the callback URL to this:

```
http://localhost:port/Account/ExternalLoginCallback
```

![](img/settings-callback.png)
 
## Testing the app:

Open a browser, navigate to the website and press the login button. You should see "Google" in the right panel.

Congratulations! 

####4. Widget

This step is optional. We have a beautiful widget that you can integrate in your application and replace the default from Asp.Net MVC.

Open the ```views\shared\_LoginPartial.cshtml``` and change its content to something as follows:

    @if (Request.IsAuthenticated) {
    <text>
        Hello, @Html.ActionLink(User.Identity.Name, "Manage", "Account", routeValues: null, htmlAttributes: new { @class = "username", title = "Manage" })!
        @using (Html.BeginForm("LogOff", "Account", FormMethod.Post, new { id = "logoutForm" })) {
            @Html.AntiForgeryToken()
            <a href="javascript:document.getElementById('logoutForm').submit()">Log off</a>
        }
    </text>
    } else {
        <ul>
            <li><a href="javascript:window.Auth0.signIn({onestep: true})">login</a></li>
        </ul>
        <script src="https://sdk.auth0.com/auth0.js#client=@@account.clientId@@"></script>
    }

> Notice that we have changed the ```else``` code block to use our auth0 widget.

Next time, when you press the login button, you should see something like this:

![](img/widget-in-aspnet.png)

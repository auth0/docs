# Using Auth0 with ASP.NET MVC 4

Integrating Auth0 with ASP.NET MVC4 is simple. MVC4 ships with out-of-the-box support for external identity providers using the [DotnetOpenAuth library](http://www.dotnetopenauth.net/). Auth0 plugs into this infrastructure.

##Before you start

1. You will need Visual Studio 2012 and MVC4
2. We also assume you have Google OpenID enabled. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.

##Integrating Auth0 with MVC4

####1. Create a simple MVC website and install Auth0 client

For this example, we will use the standard template that ships with Visual Studio 2012. Select __"FILE -> New project -> MVC 4 Web Application"__

Once the default template unfolds, use NuGet to install the Auth0Client, running the command:

	Install-Package Auth0Client

![](img/install-auth0client-nuget.png)

> [__Auth0Client__](https://nuget.org/packages/Auth0Client) is a helper class that plugs into DotNetOpenAuth. Most of the heavylifting is actually done by the __OAuth2Client__ though. Our helper just makes sure you are using the right endpoints and sending the right parameters to Auth0.
>

####2. Register Auth0Client in the AuthConfig

Open the AuthConfig.cs file (under `App_Start` folder), and look for the ```RegisterAuth``` method:

    public static class AuthConfig
    {
        public static void RegisterAuth()
        {
            OAuthWebSecurity.RegisterClient(new Auth0Client("@@account.clientId@@", "@@account.clientSecret@@", "@@account.namespace@@", "google-openid"), "Auth0", null);

            ...

        }
    }

> Notice the `connection` parameter passed in the constructor of Auth0Client? This is used by Auth0 to determine which identity provider to use. This process is also known as the _"home realm discovery"_. The example above assumes you enabled the "google-openid" connection.  


####3. Setup the callback URL in Auth0

Make sure the __callback address__ in Auth0 is configured with the app's callback URL. 

![](img/settings-callback.png)
 
## Testing the app:

Open a browser an navigate to the login URL (e.g. http://localhost:3000/login)

Congratulations! 
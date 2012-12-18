---
title: Auth0 and MVC4
---
# Using Auth0 with ASP.NET MVC 4

Integrating Auth0 with ASP.NET MVC4 is simple. MVC4 ships with out-of-the-box support for external identity providers using the [DotnetOpenAuth library](http://www.dotnetopenauth.net/). Auth0 plugs into this infrastructure.

##Before you start

1. You will need Visual Studio 2012 and MVC4
2. We also assume you have a [connection](https://app.auth0.com/#/connections) named "MyNewConnection". If you don't have one, this [tutorial](createconnection) shows how to create one.

##Integrating Auth0 with MVC4

####1. Create a simple MVC website and install Auth0 client

For this example, we will use the standard template that ships with Visual Studio 2012. Just __"FILE -> New project -> MVC 4 Web Application"__

Once the default template unfolds, use NuGet to install the Auth0Client:

![](http://markdownr.blob.core.windows.net/images/8210773982.png)

>__Auth0Client__ is a helper class that plugs into DotNetOpenAuth. Most of the heavylifting is actually done by the __OAuth2Client__ though. Our helper just makes sure you are using the right endpoints and sending the right parameters to Auth0.
>

####2. Register Auth0Client in the Auth

        public static class AuthConfig
        {
            public static void RegisterAuth()
            {
                OAuthWebSecurity.RegisterClient(new Auth0Client(@@account.clientId@@, @@account.clientSecret@@}, @@account.namespace@@, "MyNewConnection"), "Auth0", null);

                ...

            }
        }

> Notice the 'connection' parameter passed in the constructor of Auth0Client? This is used by Auth0 to determine which identity provider to use. This process is also known as the _"home realm discovery"_. The example above assumes you created a "MyNewConnection" connection.  


####3. Setup the callback URL in Auth0

Make sure the __callback address__ in Auth0 is configured with the app's callback URL. In this case it will be something like http://localhost:PORT


![](http://markdownr.blob.core.windows.net/images/9043628631.png)
 
## Testing the app:

Open a browser an navigate to the login URL (e.g. http://localhost:3000/login)

Congratulations! 
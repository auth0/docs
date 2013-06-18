---
title: Windows Store Auth0 Tutorial
layout: doc.nosidebar.tutorial
---

# Authenticating Users Anywhere with Auth0 

## Goals

1. Build a Windows Store app that authenticates users with any identity provider (e.g. Facebook, Google, MS Account, Twitter, PayPal, LinkedIn, Office365, Google Apps, etc)

2. Once authenticated, call Auth0 API to retrieve user's information. 

> The tutorial will take 15 minutes approximately.

## Before you start

This tutorial assumes you are familar with C# & Visual Studio 2012.

## Create an Auth0 Account

1. Open an account with [Auth0](https://www.auth0.com)
2. You can login with a Google, Github or a Microsoft Account:

![](https://puu.sh/3dmCI.png)

3. After login, enter a name for your account. This will uniquely identify you in Auth0.

![](https://puu.sh/3dmFE.png)

4. Choose the type of application you are building. Select __Windows 8__:

![](https://puu.sh/3drhv.png)

Keep Auth0 open. You will later need information from the dashboard to test your app.

## Build the Windows Store App

###1. Open Visual Studio 2012 and create a new blank Windows Store App:

![](https://puu.sh/3doIO.png)

###2. Add a basic UI to the app

Open the `MainPage.xaml` file and drop a `Button` control from the Toolbox:

![](https://puu.sh/3dpG0.png)

###3. Add an Auth0Client class

This class will encapsulate all access to Auth0. Add a new class named `Auth0Client` to the project:

![](https://puu.sh/3dpIT.png)

Make the class public, and add the following properties and a constructor:

```cs
	public class Auth0Client
	{
		private string Tenant { get; set; }
        private string ClientId { get; set; }
        private string Callback { get; set; }

        public string AuthenticationToken { get; set; }
        public string AccessToken { get; set; } 

        public Auth0Client(string tenant, string clientId, string callback)
        {
            this.Tenant = tenant;
            this.ClientId = clientId;
            this.Callback = callback;
        }
    }
```

Add a __LoginAsync__ method:

```cs
    public async Task<string> LoginAsync()
    {
        var auth0Url = string.Format("https://{0}.auth0.com/login?client={1}&redirect_uri={2}&response_type=token&scope=openid",
                            this.Tenant, this.ClientId, this.Callback);

        var result = await WebAuthenticationBroker.AuthenticateAsync(WebAuthenticationOptions.None, new Uri(auth0Url), new Uri(this.Callback)).AsTask();

        if (result.ResponseStatus == WebAuthenticationStatus.Success)
        {
            var tokens = parseResult(result.ResponseData);

            this.AuthenticationToken = tokens["id_token"];
            this.AccessToken = tokens["access_token"];

            return this.AccessToken;
        }

        return null;
    }
```

And then add this helper method to extract the `tokens`:

```cs
    private static Dictionary<string, string> parseResult(string result)
    {
        Dictionary<string, string> tokens = new Dictionary<string, string>();

        //result will be: https://callback#id_token=1234&access_token=12345&...
        var strTokens = result.Split('#')[1].Split('&');

        foreach (var t in strTokens)
        {
            var tok = t.Split('=');
            tokens.Add(tok[0], tok[1]);
        }

        return tokens;
    }
```

`WebAuthenticationBroker` belongs to the namespace `Windows.Security.Authentication.Web`, before compiling add the following using statement:

```
using Windows.Security.Authentication.Web;
```

Compile the solution to verify everything is working fine.

###4. Wire-up UI controls to Auth0Client

Add the following code to the Button_Click event handler:

```cs
var client = new Auth0Client("{YOUR TENANT NAME}", "{YOUR CLIENT ID}", "http://localhost/win8");

client.LoginAsync()
		.ContinueWith(ts => {
			var token = ts.Result;
		});

```

Replace __{YOUR TENANT NAME}__ with the name you used when you created the account with Auth0. And __{YOUR CLIENT ID}__ with the `clientId` value you can get from your settings page:

![](https://puu.sh/3dqSy.png)

###5. Compile and test the application:

When you run the application you will see the Login Screen with the __Auth0 Login Widget__:

![](https://puu.sh/3drsI.png)

It will show "Google" as an option to authenticate. Place a breakpoint in the `var token=ts.Result` line and complete authentication. If everything is successful, you will see the `access_token`.

###6. Enable other identity providers 

Go back to [Auth0](https://app.auth0.com) and select __Connections__, __Social__:

![](https://puu.sh/3drDu.png)

Enable any of the providers available by clicking on the `Disabled` button.

Run the app again and you will see the providers you just enabled on the login screen:

![](https://puu.sh/3drIj.png) 

Congratulations!!

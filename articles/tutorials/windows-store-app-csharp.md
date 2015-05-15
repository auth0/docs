---
title: Using Auth0 with Windows App Store
description: This tutorial explains how to integrate Auth0 with a Windows App Store using the Auth0.Windows8.Cs Nuget package.
---

# Authenticating Users Anywhere with Auth0

## Goals

1. Build a Windows Store app that authenticates users with any identity provider (e.g. Facebook, Google, MS Account, Twitter, PayPal, LinkedIn, Office365, Google Apps, etc)

2. Once authenticated, call Auth0 API to retrieve user's information.

> The tutorial will take 10 minutes approximately. You are just 10 minutes away from the (W) token :). You shouldn't, but if you need help: http://chat.auth0.com

## Before you start

This tutorial assumes you are familiar with C# & Visual Studio 2012.

## Create an Auth0 Account

1. Open an account with [Auth0](https://developers.auth0.com)
2. You can login with a Google, Github or a Microsoft Account:

![](../media/articles/windowsstore-auth0-tutorial/3dmCI.png)

3. After login, enter a name for your account. This will uniquely identify you in Auth0. We will refer to this as {YOUR_TENANT_NAME} later in the tutorial.

![](../media/articles/windowsstore-auth0-tutorial/3dmFE.png)

4. Choose the type of application you are building. Select __Windows 8__:

![](../media/articles/windowsstore-auth0-tutorial/3drhv.png)

Keep Auth0 open. You will later need information from the dashboard to test your app.

## Build the Windows Store App

###1. Open Visual Studio 2012 and create a new blank Windows Store App:

![](../media/articles/windowsstore-auth0-tutorial/3doIO.png)

###2. Add a basic UI to the app

Open the `MainPage.xaml` file and drop a `Button` control from the Toolbox:

![](../media/articles/windowsstore-auth0-tutorial/3iwYD.png)

###3. Add an Auth0Client class

This class will encapsulate all access to Auth0. Add a new class named `Auth0Client` to the project:

![](../media/articles/windowsstore-auth0-tutorial/3dpIT.png)

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

![](//cdn.auth0.com/docs/img/win8-cs-step1.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:

```csharp
var user = await auth0.LoginAsync("auth0waadtests.onmicrosoft.com")' // connection name here
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password (only for providers that support this)

```csharp
var user = await auth0.LoginAsync(
	"my-db-connection", 	// connection name here
	"username",
	"password");
```

Replace __{YOUR TENANT NAME}__ with the name you used when you created the account with Auth0. And __{YOUR CLIENT ID}__ with the `clientId` value you can get from your settings page:

![](../media/articles/windowsstore-auth0-tutorial/3dqSy.png)

###5. Compile and test the application:

When you run the application you will see the Login Screen with the __Auth0 Login Widget__:

![](../media/articles/windowsstore-auth0-tutorial/3drsI.png)

It will show "Google" as an option to authenticate. Place a breakpoint in the `var token=ts.Result` line and complete authentication. If everything is successful, you will see the `access_token`.

###6. Enable other identity providers

Go back to [Auth0](https://app.auth0.com) and select __Connections__, __Social__:

![](../media/articles/windowsstore-auth0-tutorial/3drDu.png)

Enable any of the providers available by clicking on the `Disabled` button.

Run the app again and you will see the providers you just enabled on the login screen:

![](../media/articles/windowsstore-auth0-tutorial/3drIj.png)

###7. Getting user attributes

Open the `MainPage.xaml` file and drop a `TextBox` control from the Toolbox after the `Button`, name it `UserInfo`, clean `Text` and set `IsReadOnly` to `true`:

![](../media/articles/windowsstore-auth0-tutorial/windowsstore-step7.1.png)

Open the `Auth0Client.cs` file and add the __GetUserInfoAsync__ method:

```cs

public async Task<string> GetUserInfoAsync()
{
    var userInfoUrl = string.Format("https://{0}.auth0.com/userinfo?access_token={1}", this.Tenant, this.AccessToken);
    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(userInfoUrl);

    string result = null;
    using (WebResponse response = await request.GetResponseAsync())
    using (Stream responseStream = response.GetResponseStream())
    using (StreamReader reader = new StreamReader(responseStream))
    {
        result = reader.ReadToEnd();
    }

    return result;
}
```

Before compiling add the following using statement:

```
using System.IO;
using System.Net;
```

Go to the Button_Click event handler and replace `var token = ts.Result;` to the following code:

```cs

client.GetUserInfoAsync().ContinueWith(task =>
    {
        this.UserInfo.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => this.UserInfo.Text = task.Result);
    });
```

Run the app again, and you will see the user info after login:

![](../media/articles/windowsstore-auth0-tutorial/windowsstore-step7.png)

Congratulations!!

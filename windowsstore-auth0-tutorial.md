# Authenticating Users Anywhere with Auth0 

## Goals

1. Build a Windows Store app that authenticates users with any identity provider (e.g. Facebook, Google, MS Account, Twitter, PayPal, LinkedIn, Office365, Google Apps, etc)

2. Once authenticated, call Auth0 API to retrieve user's information. 

> The tutorial will take 15 min.

## Before you start

This tutorial assumes you are familar with C# & Visual Studio 2012.

## Create an Auth0 Account

1. Open an account with [Auth0](https://www.auth0.com)
2. You can login with a Google or a Microsoft Account:

![](http://puu.sh/3dmCI.png)

3. After login, enter a name for your account. This will uniquely identify you in Auth0.

![](http://puu.sh/3dmFE.png)

4. Choose the type of application you are building. Select __Windows Store__:

![]()

Keep Auth0 open. You will later need information from the dashboard to test your app.

## Build the Windows Store App

1. Open Visual Studio 2012 and create a new blank Windows Store App:

![](http://puu.sh/3doIO.png)

2. Add a basic UI to the app

Open the `MainPage.xaml` file and drop a `Button` and a `TextBlock` control from the Toolbox:

![](http://puu.sh/3dpG0.png)

3. Add an Auth0Client class

This class will encapsulate all access to Auth0. Add a new class named `Auth0Client` to the project:

![](http://puu.sh/3dpIT.png)

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

And then this helper method to extract the `tokens`

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
Conpile the solution to verify everything is working fine.

4. Wire-up UI controls to Auth0Client

Add the following code to the Button_Click event handler:

```cs
var client = new Auth0Client("{YOUR TENANT NAME}", "{YOUR CLIENT ID}", "http://localhost/win8");

client.LoginAsync()
		.ContinueWith(ts => {
			var token = ts.Result;
		});

```

Replace __{YOUR TENANT NAME}__ with the name you used when you created the account with Auth0. And __{YOUR CLIENT ID}__ with the `clientId` value yuo can get from your settings page:

~[](http://puu.sh/3dqSy.png)

5. Compile and test the application:








This adds a few properties and a `LoginAsync` method.  

4. Wire up the Login Button with Auth0


The key to Win8 integration is the [Windows.Security.Authentication.Web.WebAuthenticationBroker](http://msdn.microsoft.com/en-US/library/windows/apps/windows.security.authentication.web.webauthenticationbroker) class.

This class automates the popular method of instantiating a web browser in native apps to perform all interactions with the authentication providers, and then extracting security tokens once they become available (usually through a POST or after a redirect).

The sample uses the `implicit flow` protocol. See the [protocols](protocols) document for more details.

##Before you start

1. You will need Visual Studio 2012 
2. We also assume you have Google OAuth2 connection enabled. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.

##Integrating Auth0 with a WinRT C# App

###1. Create a new Application
Open Visual Studio and create new blank C# Windows Store app:

![](img/win8-step1.png)

###2. Add UI controls
Open the __default.html__ file and paste the following content inside the `<body>` element:

	<div data-win-control="Input">
        <div class="item" id="auth0Input">
            <H2>Connect to Auth0</H2>
            <br />
            <label for="clientID">Client ID: </label>
            <input type="text" id="clientId" value="@@account.clientId@@" />
            <br/>
            <label for="callbackURL">Callback URL: </label>
            <input type="text" id="callbackUrl" value="https://localhost/client" />
            <br/>
            <label for="connection">Connection: </label>
            <input type="text" id="connection" value="google-oauth2" />
            <br/>
            <br/><button class="action" id="start">Start</button>
            <br /><br />
        </div>
    </div>
    <div data-win-control="Output">
		<textarea id="auth0DebugArea" rows="15" cols="150"></textarea>
    </div>

Add reference to the JavaScript code in the __default.html__, include the following line in the `<head>` element: 

    <script src="/js/auth0.js"></script>

###3. Add code to invoke the WebAuthenticationBroker
Under the __js__ folder, create new file named __auth0.js__ with the following content:

	(function () {
	    "use strict";
	    var page = WinJS.UI.Pages.define("/default.html", {
	        ready: function (element, options) {
	            document.getElementById("start").addEventListener("click", startAuthentication, false);
	        }
	    });

	    function startAuthentication() {

	        var auth0Url = "https://@@account.namespace@@/authorize";

	        var clientId = document.getElementById("clientId").value;
	        var connection = document.getElementById("connection").value;
	        var callbackUrl = document.getElementById("callbackUrl").value;

	        auth0Url += "?client_id=" + clientId + "&redirect_uri=" + callbackUrl + "&response_type=token&scope=openid&" + "connection=" + connection;

	        var startUri = new Windows.Foundation.Uri(auth0Url);
	        var endUri = new Windows.Foundation.Uri(callbackUrl);

	        log("Navigating to: " + auth0Url);

	        Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
	            Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startUri, endUri)
	            .done(function (result) {

	                if (result.responseStatus === Windows.Security.Authentication.Web.WebAuthenticationStatus.errorHttp) {
	                    log("Error returned: " + result.responseErrorDetail);
	                    return;
	                }

	                log("Status returned by WebAuth broker: " + result.responseStatus);
	                log("Token: " + result.responseData);

	                // Quick and dirty parsing of the access_token
	                var access_token = result.responseData.split("#")[1].split("&")[0];
	                WinJS.xhr({ url: "https://@@account.namespace@@/userinfo/?" + access_token, responseType: "json" })
	                            .done(function complete(result) {
	                                log("User Profile: " + result.responseText);
	                            },
	                                  function (err) {
	                                      log("Error in getting user profile: " + err.responseData);
	                                  });
	                
	                // quick and dirty parsing of id_token
	                var id_token = result.responseData.split("#")[1].split("&")[1].split("=")[1]; // get jwt
	                // use jwt to call your APIs
	            }, function (err) {
	                log("Error Message: " + err.message);
	            });
	    }

	    function log(msg) {
	        document.getElementById("auth0DebugArea").value += msg + "\r\n";
	    }
	})();

> Remember that the 'callBackUrl' must be defined in your Auth0 [settings](@@uiURL@@/#/settings). This sample uses __https://localhost/client__

> Also note that we are using `scope=openid` on the URL. This will return not only the access_token but also an id_token, which is a JWT, that can be used to call and authenticate users with an API. This JWT will only have the user id, but if you want the whole user profile, you should use `scope=openid%20profile`.

## Testing the app:

Compile the App and run it. Assuming your connection (__google-openid__ in this tutorial) is enabled, you should see the standard login screen:

![](img/win8-step2.png) 

After authentication the returned token will appear on the debug area together with the user profile (notice the chained call to the __https://@@account.namespace@@/userinfo__ endpoint):

![](img/win8-step3.png) 

Congratulations! 

## Adding more flexibility
This tutorial works with a specific connection (__google-oauth2). What if you have more than one connection, and you'd want to dynamically offer these connections as login options to your users? Auth0 makes it very easy with the Login Widget. 

In the `StartAuthenticationMethod` replace the StartUri to:

	https://@@account.namespace@@/login/?client=" + clientId + "&response_type=token&scope=openid";

Once you start the login process you will see the Login Widget displayed:

![](img/win8-step4.png)


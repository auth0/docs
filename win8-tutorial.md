# Using Auth0 with Windows 8 in JavaScript

The key to Win8 integration is the [Windows.Security.Authentication.Web.WebAuthenticationBroker](http://msdn.microsoft.com/en-US/library/windows/apps/windows.security.authentication.web.webauthenticationbroker) class.

This class automates the popular method of instantiating a web browser in native apps to perform all interactions with the authentication providers, and then extracting security tokens once they become available (usually through a POST or after a redirect).

The sample uses the `implicit flow` protocol. See the [protocols](protocols) document for more details.

##Before you start

1. You will need Visual Studio 2012
2. We also assume you have a [connection](https://app.auth0.com/#/connections) named "MyNewConnection". If you don't have one, this [tutorial](createconnection) shows how to create one.

##Integrating Auth0 with a WinRT JavaScript App

####1. Create a new Application
Open Visual Studio and create new blank JavaScript Windows Store app:

![](img/win8-step1.png)

####2. Add UI controls
Open the __default.html__ file and paste the following content inside the `<body>` element:

	<div data-win-control="Input">
        <div class="item" id="auth0Input">
            <H2>Connect to Auth0</H2>
            <br />
            <label for="clientID">Client ID: </label>
            <input type="text" id="clientID" value="@@account.clientId@@" />
            <br/>
            <label for="callbackURL">Callback URL: </label>
            <input type="text" id="callbackURL" value="https://localhost/client" />
            <br/>
            <label for="connection">Connection: </label>
            <input type="text" id="connection" value="MyNewConnection" />
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

####2. Add code to invoke the WebAuthenticationBroker
Under the __js__ folder, create new file named __auth0.js__ with the following content:

	(function () {
	    "use strict";
	    var page = WinJS.UI.Pages.define("/default.html", {
	        ready: function (element, options) {
	            document.getElementById("start").addEventListener("click", startAuthentication, false);
	        }
	    });

	    function startAuthentication() {

	        var auth0URL = "https://@@account.namespace@@/authorize";

	        var clientID = document.getElementById("clientID").value;
	        var connection = document.getElementById("connection").value;
	        var callbackURL = document.getElementById("callbackURL").value;

	        auth0URL += "?client_id=" + clientID + "&redirect_uri=" + callbackURL + "&response_type=token&" + "connection=" + connection;

	        var startURI = new Windows.Foundation.Uri(auth0URL);
	        var endURI = new Windows.Foundation.Uri(callbackURL);

	        log("Navigating to: " + auth0URL);

	        Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
	            Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI, endURI)
	            .done(function (result) {

	                log("Status returned by WebAuth broker: " + result.responseStatus);
	                log("Token: " + result.responseData);

	                if (result.responseStatus === Windows.Security.Authentication.Web.WebAuthenticationStatus.errorHttp) {
	                    log("Error returned: " + result.responseErrorDetail);
	                }

	            }, function (err) {
	                log(" Error Message: " + err.message);
	            });
	    }

	    function log(msg) {
	        document.getElementById("auth0DebugArea").value += msg + "\r\n";
	    }
	})();

> Remember that the 'callBackUrl' must be defined in your Auth0 [settings](https://app.auth0.com/#/settings).  

## Testing the app:

Compile the App and run it. Assuming your connection (__MyNewConnection__ in this turorial) is configured to use Google you will see the standard login screen:

![](img/win8-step2.png) 

After authentication the returned token will appear on the debug area:

![](img/win8-step3.png) 

Congratulations! 

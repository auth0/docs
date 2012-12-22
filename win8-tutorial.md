# Using Auth0 with Windows 8 in JavaScript

The key to Win8 integration is the [Windows.Security.Authentication.Web.WebAuthenticationBroker](http://msdn.microsoft.com/en-US/library/windows/apps/windows.security.authentication.web.webauthenticationbroker) class.

This class automates the popular method of instantiating a web browser in native apps to perform all authentication, and then extracting security tokens once they become available (usually through a POST or redirects).

This sample is based on the WebAuthenticationBroker sample you can download from [here](http://code.msdn.microsoft.com/windowsapps/Web-Authentication-d0485122).

The sample uses the `implicit flow` protocol. See the [protocols](protocols) document for more details.

##Before you start

1. You will need Visual Studio 2012
2. We also assume you have a [connection](https://app.auth0.com/#/connections) named "MyNewConnection". If you don't have one, this [tutorial](createconnection) shows how to create one.
3. Download the [WebAuthenticationBroker sample](http://code.msdn.microsoft.com/windowsapps/Web-Authentication-d0485122)

##Integrating Auth0 with a WinRT JavaScript App

####1. Add a oAuthAuth0.html file

Under the __html__ folder add a new file named __oAuthAuth0.html__ with the following content:

	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	    <title></title>    
	    <script src="/js/oAuthAuth0.js"></script>
	</head>
	<body>
	    <div data-win-control="SdkSample.ScenarioInput">
	        <div class="item" id="oAuthAuth0Input">
	            <p>Connect Auth0</p>
	            <label for="Auth0ClientID">Client ID: </label>
	            <input type="text" id="Auth0ClientID" value="@@account.clientId@@"/>
	            <br/>
	            <label for="Auth0CallbackURL">Callback URL: </label>
	            <input type="text" id="Auth0CallbackURL" value="http://localhost/client"/>
	            <br/>
	            <label for="Auth0Connection">Connection: </label>
	            <input type="text" id="Auth0Connection" value="MyNewConnection"/>
	            <br/>
	            <br/><button class="action" id="oAuthAuth0Launch">Launch</button>
	            <br /><br />
	        </div>
	    </div>
	    <div data-win-control="SdkSample.ScenarioOutput">
	        <div class="item" id="oAuthAuth0Output">
	            <table class="outputTable">
	            <tr>
	                <td class="labelTD"><label for="Auth0ReturnedToken">Token: </label></td>
	                <td><input type="text" size="106" id="Auth0ReturnedToken"/></td>
	            </tr>
	            <tr>
	                <td class="labelTD"><label for="Auth0DebugArea">Debug Output: </label></td>
	                <td><textarea id="Auth0DebugArea" rows="15" cols="80"></textarea></td>
	            </tr>
	            </table>
	        </div>
	    </div>
	</body>
	</html>


####2. Add an oAuthAuth0.js file

Under the __js__ folder, create new file named __oAuthAuth0.js__ with the following content:

	(function () {
	    "use strict";
	    var page = WinJS.UI.Pages.define("/html/oAuthAuth0.html", {
	        ready: function (element, options) {
	            document.getElementById("oAuthAuth0Launch").addEventListener("click", launchAuth0DesktopAuth, false);
	        }
	    });

	    function isValidUriString(uriString) {
	        var uri = null;
	        try {
	            uri = new Windows.Foundation.Uri(uriString);
	        }
	        catch (err) {
	        }
	        return uri !== null;
	    }

	    var authzInProgress = false;
	    
	    function launchAuth0DesktopAuth() {
	        var auth0URL = "https://@@account.namespace@@/authorize";

	        var clientID = document.getElementById("Auth0ClientID").value;
	        var connection = document.getElementById("Auth0Connection").value;
	        
	        if (clientID === null || clientID === "") {
	            WinJS.log("Please enter a ClientID for Auth0", "Web Authentication SDK Sample", "error");            
	            return;
	        }

	        var callbackURL = document.getElementById("Auth0CallbackURL").value;
	        if (!isValidUriString(callbackURL)) {
	            WinJS.log("Enter a valid Callback URL for Auth0", "Web Authentication SDK Sample", "error");
	            return;
	        }

	        if (authzInProgress) {
	            document.getElementById("Auth0DebugArea").value += "\r\nAuthorization already in Progress ...";
	            return;
	        }

	        auth0URL += "?client_id=" + clientID + "&redirect_uri=" + callbackURL + "&response_type=token&" + "connection=" + connection;

	        document.getElementById("Auth0DebugArea").value += "Navigating to: " + auth0URL + "\r\n";
	        var startURI = new Windows.Foundation.Uri(auth0URL);
	        var endURI = new Windows.Foundation.Uri(callbackURL);

	        authzInProgress = true;
	        Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
	            Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI, endURI)
	            .done(function (result) {
	                document.getElementById("Auth0ReturnedToken").value = result.responseData;
	                document.getElementById("Auth0DebugArea").value += "Status returned by WebAuth broker: " + result.responseStatus + "\r\n";
	                if (result.responseStatus === Windows.Security.Authentication.Web.WebAuthenticationStatus.errorHttp) {
	                    document.getElementById("Auth0DebugArea").value += "Error returned: " + result.responseErrorDetail + "\r\n";
	                }
	                authzInProgress = false;
	            }, function (err) {
	                WinJS.log("Error returned by WebAuth broker: " + err, "Web Authentication SDK Sample", "error");
	                document.getElementById("Auth0DebugArea").value += " Error Message: " + err.message + "\r\n";
	                authzInProgress = false;
	            });
	    }
	})();

> Remember that the 'callBackUrl' must be defined in your Auth0 [settings](https://app.auth0.com/#/settings).  

####3. Add the Auth0 option to the samples list:

    var scenarios = [
        { url: "/html/oAuthFacebook.html", title: "Authenticate to Facebook" },
        { url: "/html/oAuthTwitter.html", title: "Sign in with Twitter" },
        { url: "/html/oAuthFlickr.html", title: "Using OAuth with Flickr" },
        { url: "/html/oAuthGoogle.html", title: "Obtain Access Token from Google" },
        { url: "/html/oAuthAnyService.html", title: "Connect to any service" },
        { url: "/html/oAuthAuth0.html", title: "Connect to Auth0" }
    ];

## Testing the app:

Compile the App and run it. Select Auth0 and login. If successful, you should see the issued `Access token` on the screen:

![](img/win8-response.png) 

Congratulations! 
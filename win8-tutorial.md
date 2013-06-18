# Using Auth0 with Windows 8 in JavaScript

The key to Win8 integration is the [Windows.Security.Authentication.Web.WebAuthenticationBroker](http://msdn.microsoft.com/en-US/library/windows/apps/windows.security.authentication.web.webauthenticationbroker) class.

This class automates the popular method of instantiating a web browser in native apps to perform all interactions with the authentication providers, and then extracting security tokens once they become available (usually through a POST or after a redirect).

The sample uses the `implicit flow` protocol. See the [protocols](protocols) document for more details.

##Before you start

1. You will need Visual Studio 2012
2. We also assume you have Google OAuth2 connection enabled. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.

##Integrating Auth0 with a WinRT JavaScript App

###1. Create a new Application
Open Visual Studio and create new blank JavaScript Windows Store app:

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
            <input type="text" id="callbackUrl" value="http://localhost/win8" />
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

> Remember that the 'callBackUrl' must be defined in your Auth0 [settings](@@uiURL@@/#/settings). This sample uses __http://localhost/win8__

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


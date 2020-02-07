---
section: exercises
description: Auth0 digital identity Lab 3, Exercise 1: Adding Authentication
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
  - index
  - concept
---
# Lab 3, Exercise 1: Adding Authentication

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/03-mobile-native-app) and read through the instructions before getting started.
:::

In this exercise, you will add authentication to an existing iOS application. A simple iOS application has been provided to get you started. This is a single-view application with a button to launch the Auth0 authentication process.

1. Launch Xcode, go to **File > Open**, and open `/lab-03/exercise-01/begin/exercise-01.xcworkspace` in your locally-cloned copy of the [identity exercise repo](https://github.com/auth0/identity-102-exercises/).

<%= include('../_includes/_git-clone-note') %>

::: note
If the project complains about a missing dependency, you might have opened `exercise-01.xcodeproj` instead of `exercise-01.xcworkspace` (note the extension).
:::

This project is a bare-bones application that imports the [Auth0.swift](https://github.com/auth0/auth0.swift) dependency to provide the OpenID Connect implementation. There is also a stub method called `actionLogin` for processing the touch of the login button.

2. In the bar at the top of the project window, click the device selector and pick a late-model iPhone, then click the Play button (or **Product > Run** from the Xcode menu) to run the app.

![Device simulator selection](/media/articles/identity-labs/lab-03-choose-device-and-run.png)

The simulator may take a few moments to load the first time, and then you should see the following:

![First time running iOS application](/media/articles/identity-labs/lab-03-first-run.png)

3. Touch the **Log In** button. This will output a "Log In" message to the Debug area in Xcode. If you don’t see the Debug view, you can enable it with **View > Debug Area > Show Debug Area**.

![iOS application debug console in Xcode](/media/articles/identity-labs/lab-03-first-debug-area.png)

4. Before any calls are made to the Auth0 authorization server, you need to set up a new Auth0 Application for handling Native Applications. Log into the Auth0 Dashboard, go to the [Applications page](${manage_url}/#/applications), and click the **Create Application** button.

5. Enter a descriptive name, select **Native** as the application type, and click **Create**.

6. Click on the **Settings** tab and scroll down to the **Allowed Callback URLs** field. Enter the value below (modified with your tenant domain):

```text
com.auth0.identity102://${account.namespace}/ios/com.auth0.identity102/callback
```

7. Scroll down and click **Show Advanced Settings**, then **OAuth**. Make sure **JsonWebToken Signature Algorithm** is set to `RS256`.

8. Click **Save Changes**

You might be wondering why the callback URL is in this format. There are two parts to this:

- The first element is the scheme of the application, which for the purposes of this exercise, is defined as `com.auth0.identity102`. Whenever Safari needs to handle a request with this scheme, it will route it to our application (you will set up this custom URL scheme URL later in the lab).
- The rest of the URL is in a format that the Auth0.swift SDK specifies for callbacks.

9. Now the sample iOS application needs to be configured with the **Client ID** and **Domain** values from the Auth0 Application. Return to Xcode and open the `exercise-01/Auth0.plist` file. You should see value placeholders for **ClientId** and **Domain**. Replace these with the values from the Auth0 Application created above.

![iOS application plist values](/media/articles/identity-labs/lab-03-plist.png)

::: note
The domain must not have any prefix like in the previous labs. Enter it exactly as it is provided in the Auth0 dashboard.
:::

To be able to use the callback that was configured in the Auth0 dashboard, a URL scheme handler needs to be registered in our iOS application so that it can respond to requests made to the callback URL.

10. In the file navigator on the left, click on `exercise-01` to open the project settings, then click on the **Info** tab.

![Project settings for iOS application](/media/articles/identity-labs/lab-03-project-settings-info-tab.png)

11. Scroll down to **URL Types**, expand the section, click the **+** button, and enter or select the following details:

- **Identifier**: `auth0`
- **URL Schemes**: `$(PRODUCT_BUNDLE_IDENTIFIER)`
- **Role**: `None`

Just as `http` is a URL Scheme that will launch a browser, the bundle identifier of the app has a URL Scheme (which will resolve to `com.auth0.identity102`) will tell iOS that any time this scheme is used in a URL, it must be routed to our application. That will be the case of the callback used by Auth0 after you log in.

12. Now, the application needs to have the Auth0.swift SDK handle the callback in order to proceed with the authentication flow. In the Project Navigator on the left, open `exercise-01/AppDelegate.swift` and add the following import statement just below the other one:

```swift
// exercise-01/AppDelegate.swift

import UIKit

// Add the line below 👇
import Auth0
```

13. In the same file, add the following method inside the `AppDelegate` class:

```swift
// exercise-01/AppDelegate.swift
// ...
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    // Add the code below 👇
    func application(_
        app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey : Any]
        ) -> Bool {
        return Auth0.resumeAuth(url, options: options)
    }

    // ... other existing methods
}
```

When another app requests a URL containing the custom scheme, the system will launch your app if necessary, bring it to the foreground, and call the method above. The iOS Framework provides the delegate method above for you to implement so that you can parse the contents of the URL and take appropriate action. In this case, you need this information to continue the authentication flow process. You will see later in this exercise why this step is needed.

Now that the iOS application is configured with your Auth0 application credentials and is able to receive and process callbacks, complete the following steps to see how to construct the OpenID Connect request to the authorization server.

14. Open `exercise-01/ViewController.swift` and add the following code inside the `actionLogin` method, after the line that prints the "Log In" message to the console:

```swift
// exercise-01/ViewController.swift
// ...
  @IBAction func actionLogin(_ sender: Any) {
      print("Log In")

      // Add the code below 👇
      Auth0
        .webAuth()
        .scope("openid profile email")
        .logging(enabled: true)
        .start { response in
            switch(response) {
                case .success(let result):
                    print("Authentication Success")
                    print("Access Token: \(result.accessToken ?? "No Access Token Found")")
                    print("ID Token: \(result.idToken ?? "No ID Token Found")")
                case .failure(let error):
                    print("Authentication Failed: \(error)")
                }
           }
  }
// ...
```

15. Run the app again by clicking the Play button (or **Product > Run** from the Xcode menu). Once the app has launched, touch the **Log In** button. You should see a permission prompt from iOS. Touch **Continue** to proceed to the Auth0 login page, which is rendered within a browser.

![Universal login page loaded](/media/articles/identity-labs/lab-03-login-confirmation.png)

16. Log in using your database user, and you will be taken back to the app. Nothing will have changed visually, but if you take a look at the Debug Area in Xcode you will see something like this:

```text
Authentication Success
Access Token: vxPp0Xtg3wkZJudFZWzqMQByYF98Qyer
ID Token: eyJ0eX[..].eyJodH[..].kLtZDg[..]
```

To view the contents of your ID Token, you can copy and paste it into [jwt.io](https://jwt.io/) to view the claims.

Now that you have an ID token, it's important to validate it to ensure that it can be trusted. A helper method `isTokenValid` is already included in the project; you can review its code in `Extras/Utils.swift` to learn how the validation is performed. It should be called after obtaining the token, to illustrate how it is used.

17. Back in the `actionLogin` method in `ViewController.swift`, add the line below:

```swift
// exercise-01/ViewController.swift
// ...

  @IBAction func actionLogin(_ sender: Any) {
      print("Log In")

      Auth0
        // ...
              case .success(let result):
                  // ... other print statements

                  // Add the line below 👇
                  print("ID Token Valid: \(isTokenValid(result.idToken!))")

              // ... failure case
      }
  }
// ...
```

18. Run the app again, log in, and take a look at the logs in Xcode. You should see an entry "ID Token Valid:" with the status of the validation (true or false).

Congratulations! You have successfully added Auth0 authentication to your native iOS app using an authorization code grant!

The authorization code grant by itself has some security issues when implemented on native applications. For instance, a malicious attacker can intercept the authorization code returned by Auth0 and exchange it for an access token. The Proof Key for Code Exchange (PKCE) is a technique used to mitigate this authorization code interception attack.

With PKCE, for every authorization request, the application creates a cryptographically random key called the **code verifier**, hashes that value into a **code challenge**, and sends the **code challenge** to the authorization server to get the authorization code. When the application receives the code after a successful login, it will send the code and the code verifier to the token endpoint to exchange them for the requested tokens.

Since you previously enabled logging in our `WebAuth` call with the `logging()` method, it is easy to see the process flow in the Debug Area.

19. Run the iOS Application, touch the **Log In** button, and then take a look at the Debug Area. The iOS application initiates the flow and redirects the user to the `/authorize` endpoint, sending the `code_challenge` and `code_challenge_method` parameters. It also sends a `response_type` of `code` (line breaks added below for readability):

```text
SafariAuthenticationSession:
https://${account.namespace}/authorize
?code_challenge=VsPaQ0gJjnluA2vwV0piY-D-DTCltGI9GbYkBNHvPHQ
&response_type=code
&redirect_uri=com.auth0.identity102://${account.namespace}/ios/com.auth0.identity102/callback
&state=RFnNyPj4NOZMUW8IpDBr-j3UgO4gCbhBZtLpWB_vmDo
&client_id=${account.clientId}
&scope=openid%20profile
&code_challenge_method=S256
&auth0Client=eyJzd2lmdC12ZXJzaW9uIjoiMy4wIiwibmFtZSI6IkF1dGgwLnN3aWZ0IiwidmVyc2lvbiI6IjEuMTMuMCJ9
```

20. Once again, enter your credentials and log in. Auth0 redirects the user back to the iOS application by calling the callback with the authorization code in the query string:

```text
iOS Safari:
com.auth0.identity102://${account.namespace}/ios/com.auth0.identity102/callback
?code=6SiMHrJHbG2aAPrj
&state=RFnNyPj4NOZMUW8IpDBr-j3UgO4gCbhBZtLpWB_vmDo
```

21. The Auth0.swift SDK will process the query string and send the authorization `code` and `code_verifier` together with the `redirect_uri` and the `client_id` to the token endpoint of the authorization server:

```text
POST /oauth/token

{"grant_type":"authorization_code",
"redirect_uri":"com.auth0.identity102:\/\/${account.namespace}\/ios\/com.auth0.identity102\/callback",
"code":"6SiMHrJHbG2aAPrj",
"code_verifier":"qiV8gYUrPco3qBlejLeZzgC9DMtXZY1GddzZpmVxyxw",
"client_id":"${account.clientId}"}
```

22. The authorization server validates this information and returns the requested access and ID tokens. If successful, you will see the following response containing your tokens:

```text
Content-Type: application/json

{"access_token":"ekhGPSE7xdhOTJuTo2dV-TYyJV-OTYrO",
"id_token":"eyJ0eX[..].eyJodH[..].1kZccn[..]",
"expires_in":86400,
"token_type":"Bearer"}
```

In the next exercise, you will use a token to validate and authorize the user and authorize against a protected API.

<a href="/identity-labs/03-mobile-native-app/exercise-02" class="btn btn-transparent">Next →</a>

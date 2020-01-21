---
section: exercises
description: Auth0 digital identity Lab 3, Exercise 3: Working with Refresh Tokens
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
  - index
  - concept
---
# Lab 3, Exercise 3: Working with Refresh Tokens

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/03-mobile-native-app) and read through the instructions before getting started.
:::

In this exercise, you will explore the use of refresh tokens. A refresh token is a special kind of token that can be used to obtain a renewed access token. You are able to request new access tokens until the refresh token is blacklisted. It’s important that refresh tokens are stored securely by the application because they essentially allow a user to remain authenticated forever.

For native applications such as our iOS application, refresh tokens improve the authentication experience significantly. The user has to authenticate only once, through the web authentication process. Subsequent re-authentication can take place without user interaction, using the refresh token.

1. Go to **File > Open** in Xcode and select `lab-03/exercise-03/begin/exercise-03.xcworkspace` (make sure you pick the right file extension), then open `exercise-03/ViewController.swift`. This code picks up where the previous exercise left off and adds a new button to refresh the access token.

2. Open the `exercise-03/Auth0.plist` file and replace the placeholder values for **ClientId** and **Domain** with the ones from the Auth0 Application created before.

3. Click the Play button (or **Product > Run** from the Xcode menu) to run the app. Touch the **Refresh Token** button and look for a “Refresh Token” message to the Debug area in Xcode.

![Refresh token button in iOS application](/media/articles/identity-labs/lab-03-refresh-token-button.png)

You are now going to add the `offline_access` scope, which gives the iOS application access to resources on behalf of the user for an extended period of time. Before you can use this scope, you need to make sure that Auth0 will allow applications to ask for refresh tokens for your API.

4. Navigate to the [APIs screen in your Auth0 Dashboard](${manage_url}/#/apis). Open the API that you created to represent your expenses API and ensure the **Allow Offline Access** option is on.

![Allow offline access for API](/media/articles/identity-labs/lab-03-allow-offline-access.png)

5. Next, we're going to add the `offline_access` scope to the authentication request. Open `exercise-03/ViewController.swift` and, in the `actionLogin` method, add `offline_access` to the `.scope()` method.

```swift
// exercise-03/ViewController.swift
// ...
  @IBAction func actionLogin(_ sender: Any) {
      Auth0
          .webAuth()

          // Replace this line ❌
          // .scope("openid profile read:reports")

          // ... with the line below 👇
          .scope("openid profile read:reports offline_access")

          // ...
      }
  }
// ...
```

6. Click the Play button (or **Product > Run** from the Xcode menu) to run the app. Log in again and check the Debug area in Xcode for the response.

```js
{
  "access_token":"3tjDJ3hsFOSyCr02spWHUhHNajxLRonv",

  // Here is the refresh token we asked for 👇
  "refresh_token":"sAvc4BJyOGs2I6Yc4e6r9NmReLp0kc-I6peiauDEt-usE",

  "id_token": "eyJ0eX[..].eyJodH[..].thhf0M[..]",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

7. We're going to send the refresh token to the authorization server using a `refresh_token` grant to get a new access token. In `ViewController.swift` and create a private variable in the `ViewController` class to create a way for `actionRefresh` method to access the refresh token.

```swift
// exercise-03/ViewController.swift
// ...
class ViewController: UIViewController {

   private var accessToken: String?

   // Add the line below 👇
   private var refreshToken: String?

   // ...
}
// ...
```

8. Assign the refresh token obtained during authentication to this private variable in the `.success` code block.

```swift
// exercise-03/ViewController.swift
// ...
    @IBAction func actionLogin(_ sender: Any) {
        // ...
                    case .success(let result):
                        // ...
                        self.accessToken = result.accessToken

                        // Add the line below 👇
                        self.refreshToken = result.refreshToken

                    case .failure(let error):
                        // ...
    }  
// ...   
```

9. In the `actionRefresh` method, check that the user has authenticated and that a refresh token is available before making any calls to the authentication API. In the code below, the class-scoped property `refreshToken` is assigned to a local `refreshToken` variable. If the class-scoped property is empty, an error will be returned.

```swift
// exercise-03/ViewController.swift
// ...
    @IBAction func actionRefresh(_ sender: Any) {
        print("Refresh Token")

        // Add the code below 👇
        guard let refreshToken = self.refreshToken else {
           print("No Refresh Token found")
           return
        }
    }
// ...   
```

10. The Auth0.swift SDK makes available a `.renew()` method, which takes a refresh token as a parameter and performs a call to the authorization server's token endpoint using the `refresh_token` grant. Add the following code to the `actionRefresh` method after the code from the previous step.

```swift
// exercise-03/ViewController.swift
// ...
    @IBAction func actionRefresh(_ sender: Any) {
        // ... code from the previous steps

        // Add the code below 👇
        Auth0
            .authentication()
            .logging(enabled: true)
            .renew(withRefreshToken: refreshToken)
            .start { response in
                switch(response) {
                    case .success(let result):
                          print("Refresh Success")
                          print("New Access Token: \(result.accessToken ?? "No Access Token Found")")
                          self.accessToken = result.accessToken
                    case .failure(let error):
                          print("Refresh Failed: \(error)")
                }
            }
    }
// ...   
```

11. Click the Play button (or **Product > Run** from the Xcode menu) to re-run the app. Tap **Log In** and, after successful authentication, touch the **Refresh Token** button. Look in the Xcode the debug area for the request. You should see a `POST` to the token endpoint, showing the refresh token grant in action.

```text
POST https://${account.namespace}/oauth/token HTTP/1.1
Auth0-Client: eyJuYW1lIjoiQXV0aDAuc3dpZnQiLCJ2ZXJzaW9uIjoiMS4xMy4wIiwic3dpZnQtdmVyc2lvbiI6IjMuMCJ9
Content-Type: application/json

{"grant_type":"refresh_token","client_id":"${account.clientId}","refresh_token":"2CNxaPe0UIkX_PZkLEkKuoAuRsP6Ycg81XR1jQlTyn1dt"}
```

12. Look for the response after the request above. You should see a response including a new `access_token`, new `id_token`, and a new `expires_in` time (some of the trace was omitted for brevity).

```text
HTTP/1.1 200
Content-Type: application/json
Date: Tue, 27 Aug 2019 16:25:26 GMT
x-ratelimit-remaining: 29
x-ratelimit-reset: 1566923126
x-ratelimit-limit: 30
Content-Length: 1923

{"access_token":"eyJ0eX[..].eyJpc3[..].Smqrd7[..]",
"id_token":"eyJ0eX[..].eyJua[..].Ff5Q5[..]",
"scope":"openid profile read:reports offline_access",
"expires_in":3600,"token_type":"Bearer"}
```

Notice that you don’t receive a new `refresh_token` in the response from the authorization server. The `refresh_token` from the initial authentication must be retained. Also, note that in the code added to the `actionRefresh` method the `access_token` received is stored in the `self.accessToken` class property. This is so the new access token can be used in other methods. If you try calling the API again, the request will be made with your new access_token.

Now that you are able to obtain a fresh access token by using the refresh token, it’s time to see what happens when a token expires.

13. Navigate to the [APIs screen in your Auth0 Dashboard](${manage_url}/#/apis) and open the expenses API. Set both the **Token Expiration** and the **Token Expiration For Browser Flows** fields to 10 seconds and save the changes.

14. In your app simulator, tap **Log In** to walk through the authentication process again and get a new access token with the shorter expiration. Immediately tap the **Call API** button to see the API call succeed.

15. Wait 10 seconds for the token to expire and click the **Call API** button again. You should see the API call fail with a `Status Code: 401` in the debug area.

```text
<NSHTTPURLResponse: 0x600001f34460> { URL: http://localhost:3001/ } { Status Code: 401, Headers {
    Date =     (
        "Tue, 27 Aug 2019 16:36:10 GMT"
    );
    "www-authentication" =     (
        "Bearer realm=\"api\", error=\"invalid_token\", error_description=\"invalid token\""
    );
} }
```

16. Tap **Refresh Token** and check the debug area to see the refresh token grant happen. Then, tap **Call API**, and you should get a `Status Code: 200` along with the expenses data again.

🎉 **You have completed Lab 3 by building a native mobile application calling a secure API with refresh capability!** 🎉

<a href="/identity-labs/" class="btn btn-transparent">← All Identity Labs</a>

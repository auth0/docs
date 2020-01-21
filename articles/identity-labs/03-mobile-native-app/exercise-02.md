---
section: exercises
description: Auth0 digital identity Lab 3, Exercise 2: Calling a Secured API
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
  - concept
---
# Lab 3, Exercise 2: Calling a Secured API

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/03-mobile-native-app) and read through the instructions before getting started.
:::

In this exercise, you are going to enable the native application to authorize against the protected API backend that was built in [Lab 2, Exercise 2](/identity-labs/02-calling-an-api/exercise-02). In that lab, you set up an Auth0 API server for your Expenses API with an audience value of `https://expenses-api`.

If you have already completed lab 2, you can use the same Auth0 configuration and local files to run the API needed for this lab. Just go to `/lab-02/begin/api` in your locally-cloned copy of the [identity exercise repo](https://github.com/auth0/identity-102-exercises/) and run `npm start` in your terminal before beginning this exercise. Make sure your token expiration times in Auth0 are back to normal (at least an hour for both).

::: panel If you did not complete Lab 2
If you are doing this lab by itself, you can use the completed exercise sample code:

1. Go to `/lab-02/end/api` and run `npm install` in your terminal.

2. Follow steps 1-3 on [this page](/identity-labs/02-calling-an-api/exercise-02) to create an API in Auth0.

3. Create a copy of the `.env` file in the same directory as above, change the `ISSUER_BASE_URL` value to include your tenant name, and save the file.

4. Back in the terminal, run `npm start`.

```bash
# Starting from the Lab 3 begin folder...
❯ cd ../../../lab-02/end/api

❯ pwd
/Users/username/identity-102-exercises/lab-02/end/api

❯ cp .env-sample .env

❯ vim .env
# Change the ISSUER_BASE_URL value ...

❯ npm install

added XX packages in X.XXs

❯ npm start

listening on http://localhost:3001
```

:::

Regardless of which API codebase you're using, you should now be able to load [localhost:3001](http://localhost:3001/) in your browser and see an error saying `UnauthorizedError: bearer token is missing`.

5. For this exercise, we're going to open a different project in Xcode than the one we used in exercise 1. Go to **File > Open** in Xcode and select `lab-03/exercise-02/begin/exercise-02.xcworkspace` (make sure you pick the right file extension), then open `exercise-02/ViewController.swift`. This code picks up where the previous exercise left off and adds a new button to call the API.

6. Open the `exercise-02/Auth0.plist` file and replace the placeholder values for **ClientId** and **Domain** with the ones from the Auth0 Application created before.

7. Click the Play button (or **Product > Run** from the Xcode menu) to run the app.

![iOS application Call API button](/media/articles/identity-labs/lab-03-call-api-button.png)

8. Touch the **Call API** button, and you should see a "Call API" message in the Debug area in Xcode.

![Call API debug message in Xcode console](/media/articles/identity-labs/lab-03-call-api-debug-area.png)

You will now add code to make the API call from the mobile app. However, before doing so, you need to modify the authentication code to include the API's audience for authorization and the necessary scopes so that the required permissions are requested.

9. In the `actionLogin` method, which contains our authentication call, include the audience for the API we want to access. With this in place, there will be an additional audience inside the access token after successful authentication.

```swift
// exercise-02/ViewController.swift
// ...

    @IBAction func actionLogin(_ sender: Any) {
        Auth0
            .webAuth()
            .scope("openid profile")

            // Add the line below 👇
            .audience("https://expenses-api")

            // ...
        }
    }
// ...
```

10. Run the app from Xcode again, click **Log In**, and check the debug logs. You should see a block of output like below:

```text
Authentication Success
Access Token: eyJ0eXA[..].eyJpc3[..].XeiZaS[..]
ID Token: eyJ0eXA[..].eyJodH[..].Lv1TY8[..]
Token Valid: true
```

11. Copy and paste the value of the **Access Token** into [jwt.io](https://jwt.io). Notice the `scope` value of `openid profile`. In Lab 2, the additional scope `read:reports` was added, which is not present in the token yet:

```js
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|1234567890",
  "aud": [

    // New audience 👇
    "https://expenses-api",
    "https://${account.namespace}/userinfo"
  ],
  "iat": 1566840738,
  "exp": 1566840746,
  "azp": "${account.clientId}",

  // Existing scopes 👇
  "scope": "openid profile"
}
```

12. Now, add the `read:reports` scope to the parameter in the `scope()` method within `actionLogin`:

```swift
// exercise-02/ViewController.swift
// ...

  @IBAction func actionLogin(_ sender: Any) {
      Auth0
          .webAuth()

          // Replace this line ❌
          // .scope("openid profile")

          // ... with the line below 👇
          .scope("openid profile read:reports")

          // ...
      }
  }
```

13. Run the app again, log in, and check the access token in [jwt.io](https://jwt.io) once more. You should now see the `read:reports` scope in the payload. It’s time to make a call to the API!

14. To use the access token we obtained during login in the `actionAPI` method, you need a way to access this variable. Create a private variable in the `ViewController` class:

```swift
// exercise-02/ViewController.swift
// ...
import Auth0

class ViewController: UIViewController {

    // Add the line below 👇
    private var accessToken: String?

    // ...
}      
```

15. In the `.success` code block of the `actionLogin` method, set the new `accessToken` value to be what was returned from the token endpoint:

```swift
// exercise-02/ViewController.swift
// ...
    @IBAction func actionLogin(_ sender: Any) {
        // ...
                    case .success(let result):
                        // ...

                        // Add the line below 👇
                        self.accessToken = result.accessToken

                    case .failure(let error):
                        // ...
    }  
// ...   
```

16. In the `actionAPI` method in the same class, check that the user has authenticated and that you have an access token before making a call to the API:

```swift
// exercise-02/ViewController.swift
// ...
    @IBAction func actionAPI(_ sender: Any) {
        print("Call API")

        // Add the code below 👇
        guard let accessToken = self.accessToken else {
            print("No Access Token found")
            return
        }
    }
// ...
```

Here, you are assigning the class-scoped property `accessToken` to a local `accessToken` variable. If the class-scoped property is empty, an error will be returned.

17. Again in the `actionAPI` method, add the code below to start an API request:

```swift
// exercise-02/ViewController.swift
// ...
    @IBAction func actionAPI(_ sender: Any) {
        // ... code from above

        // Add the code below 👇
        let url = URL(string: "http://localhost:3001")!
        var request = URLRequest(url: url)
    }
// ...
```

::: note
If your API is running on a different port or URL, make sure to change that above.
:::

18. You also need a way to send the access token to the API. This is done by adding an HTTP Authorization request header:

```swift
// exercise-02/ViewController.swift
// ...
    @IBAction func actionAPI(_ sender: Any) {
        // ... code from above

        // Add the code below 👇
        request.addValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.log()
    }
// ...
```

19. Finally, the request needs to be executed. You will use the functionality built into the iOS framework - `URLSession` - to perform the network operation:

```swift
// exercise-02/ViewController.swift
// ...
    @IBAction func actionAPI(_ sender: Any) {
        // ... code from above

        // Add the code below 👇
        let task = URLSession.shared.dataTask(with: request) {
            data, response, error in
                print(response ?? "No Response")
        }
        task.resume() // Execute the request
    }
// ...
```

20. Let's try calling the API from our mobile app. Save your changes from above, run the app, and tap **Log In**. After successfully authenticating, tap the **Call API** button and check the logs in the Debug area for the API response:

```text
Call API
GET http://localhost:3001
Headers:
 Optional(["Authorization": "Bearer eyJ0eX[..].eyJpcM[..].dpN8sK[..]"])
<NSHTTPURLResponse: 0x6000010dfdc0> { URL: http://localhost:3001/ } { Status Code: 200, Headers {
    Connection =     (
        "keep-alive"
    );
    "Content-Length" =     (
        195
    );
    "Content-Type" =     (
        "application/json; charset=utf-8"
    );
    Date =     (
        "Tue, 27 Aug 2019 14:53:40 GMT"
    );
    Etag =     (
        "W/\"c3-oBamo6wQLwSzwYwQczXJ+w5tl5o\""
    );
    "X-Powered-By" =     (
        Express
    );
} }
```

The `Status Code: 200` (OK) lets us know the request was executed successfully. If you want to see it fail, simply comment out the line that adds the Authorization Bearer header, re-rerun the app, and try logging in again. You will see a `Status Code: 401` (Unauthorized).

21. You can see from the `Content-Length` header that there is a body in the response; output the raw data from the API by updating the `dataTask` closure with the following code:

```swift
// exercise-02/ViewController.swift
// ...
    @IBAction func actionAPI(_ sender: Any) {
        // ... code from above

        let task = URLSession.shared.dataTask(with: request) {
            data, response, error in
                print(response ?? "No Response")

                // Add the code below 👇
                if let data = data {
                    print(String(data: data, encoding: .utf8) ?? "No Body")
                }
        }
        // ...
    }
// ...
```

22. Re-run the app, login, and call the API once more. You should now see the expenses in the debug area in Xcode:

```js
[{"date":"2019-08-27T15:02:04.838Z","description":"Pizza for a Coding Dojo session.","value":102},
{"date":"2019-08-27T15:02:04.838Z","description":"Coffee for a Coding Dojo session.","value":42}]
```

You have now integrated your native application frontend with a protected API backend! In the next exercise, you will look at how the access token can be refreshed without having the user go through the web-based authentication flow each time.

<a href="/identity-labs/03-mobile-native-app/exercise-03" class="btn btn-transparent">Next →</a>

---
title: Sign In With Apple
description: This tutorial will show you how to add a Sign In With Apple button and receive tokens from Auth0
budicon: 345
topics:
  - quickstarts
  - native
  - ios
  - swift
  - sign-in-with-apple
github:
  path: 09-Sign-In-With-Apple
contentType: tutorial
useCase: quickstart
requirements:
  - CocoaPods
  - Xcode 11 Beta 6
  - iOS 13 Beta 8 Device
---

<!-- markdownlint-disable MD002 MD041 -->

## Before You Start

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have integrated [Auth0.swift](https://github.com/auth0/Auth0.swift/) as a dependency in your project. 
* You are familiar with presenting the login screen. To learn more, see the [Login](/quickstart/native/ios-swift/00-login) tutorial.
* You have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).
* You have configured your Auth0 tenant and application client to enable **Sign In With Apple** to work. See [Add Sign In with Apple to Your Native App](/articles/connections/references/apple-native/guides/add-siwa-to-native-app) for details on how to do this.

## Add the "Sign In With Apple" Button

As an example of adding the sign-in button to your view, add a `UIStackView` to your main storyboard and create an outlet in `ViewController.swift`:

```swift
 @IBOutlet weak var loginProviderStackView: UIStackView!
```

Next, add the `AuthenticationServices` Framework to your `ViewController.swift`:

```swift
import AuthenticationServices
```

Add a function that attaches a `ASAuthorizationAppleIDButton` button to the stack view:

```swift
func setupProviderLoginView() {
  // Create Button
  let authorizationButton = ASAuthorizationAppleIDButton()

  // Add Callback on Touch
  authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)

  //Add button to the UIStackView
  self.loginProviderStackView.addArrangedSubview(authorizationButton)
}
```

Call this function in `viewDidLoad`:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    setupProviderLoginView()
}
```

## Handle Authorization

The following code shows the implemention of a button handler that initializes an authorization request and launches
the native SIWA flow:

```swift
@objc
func handleAuthorizationAppleIDButtonPress() {
    // Create the authorization request
    let request = ASAuthorizationAppleIDProvider().createRequest()

    // Set scopes
    request.requestedScopes = [.email, .fullName]

    // Setup a controller to display the authorization flow
    let controller = ASAuthorizationController(authorizationRequests: [request])

    // Set delegates to handle the flow response.
    controller.delegate = self
    controller.presentationContextProvider = self

    // Action
    controller.performRequests()
}
```

:::note
At this time the only supported scopes are `email` and `fullname`. For more information, see [ASAuthorization.scope](https://developer.apple.com/documentation/authenticationservices/asauthorization/scope).
:::

At this point you will have a few compile errors to deal with. Before moving forward with all the code, let's remove those errors by providing some basic delegates.

### Add authorization extensions

Add the following to the end of the `ViewController.swift` file. This enables the authorization flow UI to be displayed from our controller:

```swift
extension ViewController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}
```

Next, add a stub delegate for the `ASAuthorizationController` to the end of the `ViewController.swift` file. This code will handle the response sent to the `ASAuthorizationController`. You will come back to this one later.

```swift
extension ViewController: ASAuthorizationControllerDelegate {
}
```

### Add the Sign In With Apple capability

To enable Sign In With Apple in your application, you need to enable this capability to your app, as shown:

![Add capabilities](/media/articles/ios/swift/add-capability.png)

:::panel Checkpoint
Start the application and click the **Sign In With Apple** button. You should see the default sign-in dialog appear.
:::

## Processing the Authorization Response

Add the following to the end of your `ViewController.swift` file.

```swift
extension ViewController: ASAuthorizationControllerDelegate {

    // Handle authorization success
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {

        if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
            // Success
        }
    }

    // Handle authorization failure
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print("SIWA Authorization Failed: \(error)")
    }
}
```

### Inspecting the response

Upon successful authorization, you will be able to access the following information:

- UUID, team-scoped user ID
- Verification Data
  - ID Token, Authorization Code
- Account Information
  - Name, Verified Email Address (Original or relay address)
- Real user indiciator
  - High confidence indicator that the user is who they say they are

:::note
The Account Information is ONLY sent on the first successful authorization
:::

## Auth0 Token Exchange

Now that you have a successful SIWA authorization response, you can use the `authorizationCode` information to perform a token exchange for Auth0 tokens, as in the following example:

```swift
if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
    // Convert Data -> String
    guard let authorizationCode = appleIDCredential.authorizationCode, let authCode = String(data: authorizationCode, encoding: .utf8) else
    {
        print("Problem with the authorizationCode")
        return
    }

    // Auth0 Token Exchange
    Auth0
        .authentication()
        .tokenExchange(withAppleAuthorizationCode: authCode).start { result in
            switch(result) {
            case .success(let credentials):
                print("Auth0 Success: \(credentials)")
            case .failure(let error):
                print("Exchange Failed: \(error)")
            }

    }
}
```

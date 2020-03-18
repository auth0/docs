<!-- markdownlint-disable MD002 MD041 -->

<%= include('../../_includes/_getting_started', { library: 'Swift' }) %>

Add your credentials in the `Auth0.plist` file. If the file does not exist in your project yet, create one with the information below ([Apple documentation on Property List Files](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html)):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ClientId</key>
  <string>${account.clientId}</string>
  <key>Domain</key>
  <string>${account.namespace}</string>
</dict>
</plist>
```

<%= include('../../_includes/_ios_dependency_centralized') %>

## Add the "Sign In With Apple" Button

As an example of adding the sign-in button to your view, add a `UIStackView` to your main storyboard and create an outlet in `ViewController.swift`:

```swift
 @IBOutlet weak var loginProviderStackView: UIStackView!
```

Next, add the `AuthenticationServices` Framework to your `ViewController.swift`:

```swift
import AuthenticationServices
```

Add a function that attaches an `ASAuthorizationAppleIDButton` button to the stack view:

```swift
func setupProviderLoginView() {
  // Create Button
  let authorizationButton = ASAuthorizationAppleIDButton()

  // Add Callback on Touch
  authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)

  // Add button to the UIStackView
  loginProviderStackView.addArrangedSubview(authorizationButton)
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

The following code shows the implementation of a button handler that initializes an authorization request and launches
the native Sign In With Apple flow:

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
At this time the only scopes that Apple support are `email` and `fullName`. For more information, see [ASAuthorization.scope](https://developer.apple.com/documentation/authenticationservices/asauthorization/scope).
:::

At this point, you will have a few compile errors to deal with. Before moving forward with all the code, let's remove those errors by providing some basic delegates.

### Add authorization extensions

Add the following to the end of the `ViewController.swift` file. This enables the authorization flow UI to be displayed from the controller:

```swift
extension ViewController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return view.window!
    }
}
```

Next, add a stub delegate for the `ASAuthorizationController` to the end of the `ViewController.swift` file. This code will handle the response sent to the `ASAuthorizationController`. You will come back to this one later.

```swift
extension ViewController: ASAuthorizationControllerDelegate {

}
```

### Add the Sign in with Apple capability

To enable Sign In With Apple in your application, you need to enable this capability to your app, as shown:

![Add capabilities](/media/articles/ios/swift/add-capability.png)

:::panel Checkpoint
Start the application and click the **Sign In With Apple** button. You should see the default sign-in dialog appear:

![Default sign-in dialog](/media/articles/ios/swift/authz-dialog.png)
:::

## Process the Authorization Response

Add the following methods to the `ASAuthorizationControllerDelegate` delegate stub at the end of your `ViewController.swift` file.

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
        print("Authorization Failed: \(error)")
    }
}
```

### Inspect the response

Upon successful authorization, you will be able to access the following information:

- UUID, team-scoped user ID
- Verification Data
  - ID Token, Authorization Code
- Account Information
  - Name, Verified Email Address (Original or relay address)
- Real user indicator
  - High confidence indicator that the user is who they say they are

:::note
The Account Information is ONLY sent on the first successful authorization. This information should be saved by your app if you wish to use it when a user leaves and reloads your application.
:::

## Auth0 Token Exchange

Now that you have a successful authorization response, you can use the `authorizationCode` to perform a token exchange. The token exchange will give you access to Auth0 credentials, such as the ID and Access Tokens. For example:

```swift
if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
    // Convert Data -> String
    guard let authorizationCode = appleIDCredential.authorizationCode,
        let authCode = String(data: authorizationCode, encoding: .utf8) else {
            print("Problem with the authorizationCode")
            return
    }

    // Auth0 Token Exchange
    Auth0
        .authentication()
        .tokenExchange(withAppleAuthorizationCode: authCode).start { result in
            switch result {
            case .success(let credentials):
                print("Auth0 Success: \(credentials)")
            case .failure(let error):
                print("Exchange Failed: \(error)")
            }
    }
}
```

## Renew Authentication

When users return to your app, you can log them in automatically if their login session is still valid. This involves:

* Calling `ASAuthorizationAppleIDProvider.getCredentialState` to make sure the user is still authorized
* Retrieving Auth0 credentials

To do this, you're going to:

* Use `CredentialsManager` to store the Auth0 credentials
* Use `SimpleKeychain` to store the Apple user ID
* Check the credential state using Apple's APIs before retrieving Auth0 credentials

### Store credentials

The credentials manager retrieves stored credentials from the keychain and checks if the Access Token is still valid:

* If the current credentials are still valid, the credentials manager returns them
* If the Access Token has expired, the credentials manager renews them using the Refresh Token and returns them

First, import the `SimpleKeychain` Framework into your `ViewController.swift` file:

```swift
import SimpleKeychain
```

Then, add a `CredentialsManager` and `SimpleKeychain` instance as follows:

```swift
let credentialsManager = CredentialsManager(authentication: Auth0.authentication())
let keychain = A0SimpleKeychain()

// Add a place to store credentials locally once they're renewed
var credentials: Credentials?
```

Next, modify the token exchange call you added earlier to store credentials when the user logs in:

```swift
Auth0
    .authentication()
    .tokenExchange(withAppleAuthorizationCode: authCode).start { result in
        switch result {
        case .success(let credentials):
            // NEW - store the user ID in the keychain
            self.keychain.setString(appleIDCredential.user, forKey: "userId")

            // NEW - store the credentials locally
            self.credentials = credentials

            // NEW - store the credentials in the credentials manager
            self.credentialsManager.store(credentials: credentials)
        case .failure(let error):
            print("Exchange Failed: \(error)")
        }
}
```

### Renew authentication state

Add a function that tries to renew the user's login session. Here, `getCredentialState` is called to find out whether the user is still authorized for Sign In With Apple. If they are **unauthorized**, you should consider their access revoked, their access and refresh tokens should be removed, and the user should log into the application again. Otherwise, the credentials that were previously stored inside `CredentialsManager` can be returned, as in the following example:

```swift
func tryRenewAuth(_ callback: @escaping (Credentials?, Error?) -> ()) {
    let provider = ASAuthorizationAppleIDProvider()

    // Try to fetch the user ID
    guard let userID = keychain.string(forKey: "userId") else {
        return callback(nil, nil)
    }

    // Check the Apple credential state
    provider.getCredentialState(forUserID: userID) { state, error in
        switch state {
        case .authorized:
            // Try to get credentials from the creds manager (ID token, Access Token, etc)
            self.credentialsManager.credentials { error, credentials in
                guard error == nil, let credentials = credentials else {
                    return callback(nil, error)
                }

                self.credentials = credentials

                callback(credentials, nil)
            }
        default:
            // User is not authorized
            self.keychain.deleteEntry(forKey: "userId")

            // Remove their credentials from the store
            self.credentialsManager.clear()

            callback(nil, error)
        }
    }
}
```

:::note
Calling `credentialsManager.credentials` _automatically renews_ the Access Token if it has expired, using the refresh token. This call should only be executed if `getCredentialState` returns `authorized`, so that the refresh token is only used by an authorized user. Otherwise, the credentials must be cleared and the login session thrown away.
:::

Finally, call this function from `viewDidLoad`. If no credentials are found, the user should be shown the login screen once more. Otherwise, they should continue on into the app:

```swift
tryRenewAuth { credentials, error in
    guard error == nil, credentials != nil else {
        print("Unable to renew auth: \(String(describing: error))")

        // The user should be asked to log in again

        return
    }

    // Set up any post-login UI or segue here
}
```

## Next Steps

Now that you're able to use Sign In With Apple and exchange the authorization code for Auth0 credentials, you can use these credentials to perform various tasks:

* Use the Access Token to [Call APIs](/quickstart/native/ios-swift/04-calling-apis)
* [Assign roles to users](/quickstart/native/ios-swift/05-authorization)
* Use the Access Token to [link accounts](/quickstart/native/ios-swift/07-linking-accounts)

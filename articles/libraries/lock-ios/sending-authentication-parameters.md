# Lock iOS: Sending Authentication Parameters

Authentication parameters are just additional data that you can send with your authentication requests.

You can add anything you want, for instance:

```swift
let parameters = A0AuthParameters(dictionary: ["my_awesome_parameter": "foo", "another_parameter": "bar"])
```

```objective-c

```

This example generates two **custom** parameters, with their respective values. This would be analogous to triggering the login with `https://{$domain}/authorize?my_awesome_parameter=foo&another_parameter=bar&...`.

## Available Parameters

There is a list of **default parameters** that Lock supports, which are useful for specific scenarios:

- `scopes`
  - Scope values to send to the API. 
  - If it's `nil`, it will be reset to its default values. 
  - Default values are `"openid"` and `"offline_access"`.
- `device`
  - Device name, it will only be set when `offline_access` is one of the `scopes`. 
  - By default, it contains the string returned by `UIDevice.currentDevice().name`.
- `accessToken`
  - Access token used when linking an account with an existing one. 
  - By default, it is `nil`.
- `protocol`
  - Protocol used for authentication. 
  - By default, it is `nil` (the same as using `oauth2`).
- `nonce`
  - Value used to avoid a replay attack that is part of the _OpenID_ protocol.
  - By default, it is `nil`.
- `offlineMode`
  - Offline mode for authentication. 
  - By default, it is `nil`.
- `state`
  - Arbitrary state value that will be mantained across redirects. It is useful to mitigate XSRF attacks and for any contextual information (such as a *return URL*) that you might need after the authentication process is finished.
  - By default, it is `nil`.
- `connectionScopes`
  - Specify scopes for connections. For example, ask Facebook for user's email. 
  - By default, it is `nil`. 

> There are other extra parameters that will depend on the provider. For instance, Google allows you to get back a `refresh_token` only if you explicitly ask for `access_type=offline`.

## Example

Here's an example of configuring your Lock controller so that it sends authentication requests with both **default** and **custom** parameters.

```swift
// Instantiate parameters object
let parameters = A0AuthParameters()

// Modify default parameters
parameters.scopes = ["openid", "name", "email", "picture"]
parameters.connectionScopes = ["facebook": ["public_profile", "user_friends"]
parameters.accessToken = nil

// Add custom parameters
parameters.addValuesFromDictionary(["my_awesome_parameter": "foo", "another_parameter": "bar"])

// Attach parameters to Lock controller
let controller = A0Lock.sharedLock().newLockViewController()
controller.authenticationParameters = parameters

// Configure Lock controller
controller.onAuthenticationBlock { profile, token in
    // ...
}

// Present Lock controller
A0Lock.sharedLock().presentLockController(controller, fromController: self)
```

```objective-c

```

As an alternative, `A0AuthParameters` also supports [**subscripting**](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Subscripts.html), so, this line:

```swift
parameters.addValuesFromDictionary(["my_awesome_parameter": "foo", "another_parameter": "bar"])
```

is equivallent to do:

```swift
parameters["my_awesome_parameter"] = "foo"
parameters["another_parameter"] = "bar"
```


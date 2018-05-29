---
section: libraries
toc: true
description: Using Database Connections with Auth0.Swift
tags:
  - libraries
  - swift
  - db-connections
---
# Using Database Connections with Auth0.Swift

The Authentication API provides methods to authenticate and sign up database users.

## Signing up with a database connection

Signing up requires calling the  `createUser` method, passing the user's given `email`, `password`, and the `connection` name to initiate the signup process. You can also specify additional user metadata to store.

```swift
Auth0
    .authentication()
    .createUser(
        email: "support@auth0.com",
        password: "secret-password",
        connection: "Username-Password-Authentication",
        userMetadata: ["first_name": "First",
                       "last_name": "Last"]
    )
    .start { result in
        switch result {
        case .success(let user):
            print("User Signed up: \(user)")
        case .failure(let error):
            print("Failed with \(error)")
        }
    }
```

## Login with a database connection

Logging in with a database connection requires calling `login` with the user's username/email, password, and the name of the connection (such as `Username-Password-Authentication`) you wish to authenticate with. The response will be a Credentials object.

```swift
Auth0
    .authentication()
    .login(
        usernameOrEmail: "support@auth0.com",
        password: "secret-password",
        realm: "Username-Password-Authentication",
        scope: "openid")
     .start { result in
         switch result {
         case .success(let credentials):
            print("Obtained credentials: \(credentials)")
         case .failure(let error):
            print("Failed with \(error)")
         }
     }
```

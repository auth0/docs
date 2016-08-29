# Lock iOS: Password Reset

You can allow users to reset their password for any database connections. 

> Passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those platforms.

## Using Lock

If you are **using the Lock UI**, you can hide or show a "Reset password" button by setting the `disableResetPassword` property from your `A0LockViewController` instance to `false` . Since its actual default value is `false`, **you have to do nothing** in order to get a password reset feature in your app.

## Using Your Own UI

However, if you are **implementing your own UI**, you need to send a password reset email to the user through an `A0APIClient` instance, like this:

```swift
let client = A0Lock.sharedLock().apiClient()
let params = A0AuthParameters.newDefaultParams()
params[A0ParameterConnection] = "Username-Password-Authentication" // Or your configured DB connection name
client.requestChangePasswordForUsername("user@email.com",
                                        parameters: params, success: { () in
                                            print("Please check your email!")
    }, failure: { (error: NSError) in
        print("Oops something went wrong: \(error)")
})
```

```objective-c

```

> **NOTE**: Please, take a look at [Password Strength in Auth0 Database Connections](/connections/database/password-strength) before implementing password reset.
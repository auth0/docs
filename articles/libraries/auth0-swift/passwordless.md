---
section: libraries
toc: true
description: Using Auth0.Swift in Passwordless mode
topics:
  - libraries
  - swift
  - passwordless
contentType: how-to
useCase: enable-mobile-auth
---
# Passwordless Authentication with Auth0.Swift

<%= include('../../_includes/_native_passwordless_warning') %>

<dfn data-key="passwordless">Passwordless</dfn> can be done via email or via SMS, and either by sending the user a code, or sending them a link which contains a code. All of these methods of Passwordless authentication will require two steps - requesting the code, and then inputting the code for verification. Auth0 recommends that you use one of the above linked methods to implement native passwordless authentication.

## How Passwordless works

Passwordless requires two steps:

1. Request the code
2. Input the code

When using links, the same thing happens, but in a slightly different way, because the user does not have to input a code themselves. The code is included in the URL.

### Step 1: Request the code

In this example, requesting the code is done by calling `startPasswordless` with the user's email, and the type of connection. The `type` parameter will default to `Code`. On success, you'll probably display a notice to the user that their code is on the way, and perhaps route them to a view to input that code.

```swift
Auth0
   .authentication()
   .startPasswordless(email: "support@auth0.com", connection: "email")
   .start { result in
       switch result {
       case .success:
           print("Sent OTP to support@auth0.com!")
       case .failure(let error):
           print(error)
       }
   }
```

### Step 2: Input the code

Once the user has a code, they can input it. Call the `login` method, and pass in the user's email, the code they received, and the name of the connection in question. Upon success, you will receive a Credentials object in the response.

```swift
Auth0
   .authentication()
   .login(
       usernameOrEmail: "support@auth0.com", 
       password: "123456", 
       realm: "Username-Password-Authentication"
       )
   .start { result in
       switch result {
       case .success(let credentials):
           print("access_token: \(credentials.accessToken)")
       case .failure(let error):
           print(error)
       }
   }
```

## Passwordless parameters

Passwordless authentication can be started with a variety of different parameters.

For example:

```swift
.startPasswordless(email: String, type: String, connection: String)
```

or

```swift
.startPasswordless(phoneNumber: String, type: String, connection: String)
```

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `email` | required | (String) Either `email` or `phoneNumber` is required (not both), depending on which will be used. |
| `phoneNumber` | required | (String) Either `email` or `phoneNumber` is required (not both), depending on which will be used. |
| `type` | optional | (String)  The type of Passwordless transaction to use, either `.Code` or `.iOSLink`. Defaults to `.Code`. |
| `connection` | optional | (String)  The name of the connection to use for the Passwordless authentication. Defaults to `sms`. |

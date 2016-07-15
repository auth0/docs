---
title: Calling APIs
description: This tutorial will show you how to manage tokens to make authenticated API calls, using NSURLSession.
---

The reason for implementing authentication, in the first place, is to protect information. In this case, your information is a resource served from a server of any sort. Auth0 provides a squad of tools to assist you with end-to-end authentication in an application. We recommend that you conform to RFC standards by sending valid authentication tokens through an authorization header.

In this tutorial, you'll learn how to get a token, attach it to a request (using the authorization header), and call any API you need to authenticate with.

### 1. Get a token

In order to make an authenticated request, you first need to obtain a token, against which your API can compare to detect whether or not the request is properly authenticated.

You should already know how to get an [A0Token](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0Token.h) instance from the [login tutorial](01-login.md). Anyway, here's a quick recap:

```swift
import Lock
```

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.onAuthenticationBlock = { profile, token in
    // Upon successfull login, you get an A0Token instance
    // You will usually save it for later use
    controller.dismissViewControllerAnimated(true, completion: nil)
}
A0Lock.sharedLock().presentLockController(controller, fromController: self)
```

In order to make authenticated requests, you can use any of the token strings inside that `A0Token` instance you just obtained; which one is up to you.

### 2. Attach the token

Supposing you have decided to use the `idToken` value, here is what you would do:

```swift
let token = ... // The A0Token instance you got upon login
let url = NSURL(string: "your api url")!
let request = NSMutableURLRequest(URL: url)
// Configure your request here (method, body, etc)
request.addValue("Bearer \(token.idToken)", forHTTPHeaderField: "Authorization")
let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
    // Parse the response
}
```

Notice that how you configure your authorization header should match the standards that you're using in your API; this is just an example of what it could look like.

### 3. Send the request

Don't forget to actually send the request you just created, by executing:

```swift
task.resume()
```

### Done!

That's just it. 

### Sample Project Configuration

When testing the sample project, make sure you configure your URL request in the `ProfileViewController.swift` file:

```swift
let url = NSURL(string: "your api url")!
let request = NSMutableURLRequest(URL: url)
// Configure your request here (method, body, etc)
```

Once you send a request and your API returns a response, its status code is going to be displayed in an alert view.

> You can use your own API to test, or, if you want, you can use [this sample server](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/Server), which is quickly configurable.
>
> For further information on authentication API on the server-side, check [the official documentation](https://auth0.com/docs/api/authentication).
---
title: Calling APIs
description: This tutorial will show you how to manage tokens to make authenticated API calls, using NSURLSession.
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '04-Calling-APIs',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>

The reason for implementing authentication, in the first place, is to protect information. In this case, your information is a resource served from a server of any sort. Auth0 provides a squad of tools to assist you with end-to-end authentication in an application. We recommend that you conform to RFC standards by sending valid authentication tokens through an authorization header.

In this tutorial, you'll learn how to get a token, attach it to a request (using the authorization header), and call any API you need to authenticate with.

## Get the user's credentials

In order to make an authenticated request, you first need to obtain a token, against which your API can compare to detect whether or not the request is properly authenticated.

You should already know how to get an [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance from the [Login Guide](/quickstart/native/ios-swift/00-login). Anyway, here's a quick recap:

First, import the `Auth0` module in the file where you want to present the hosted login page.

${snippet(meta.snippets.setup)}

Then present the hosted login screen, like this:

```swift
Auth0
    .webAuth()
    .scope("openid profile")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            guard let accessToken = credentials.accessToken, let idToken = credentials.idToken else { return }
            // Good time to store the tokens
        }
}
```

In order to make authenticated requests, you can use any of the token strings inside that `Credentials` instance you just obtained. Which one depends on the application usage.

## Attach the Token

Supposing you need to use the `accessToken` value, here is what you would do:

```swift
let token  = ... // The accessToken you stored after authentication
let url = URL(string: "your api url")!
var request = URLRequest(url: url)
// Configure your request here (method, body, etc)
request.addValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
let task = URLSession.shared.dataTask(with: request) { data, response, error in
    // Parse the response
}
```

Notice that how you configure your authorization header should match the standards that you're using in your API. This is just an example of what it could look like.

## Send the Request

Don't forget to actually send the request you just created, by executing:

```swift
task.resume()
```

### Sample Project Configuration

When testing the sample project, make sure you configure your URL request in the `ProfileViewController.swift` file:

```swift
let url = URL(string: "your api url")!
var request = URLRequest(url: url)
// Configure your request here (method, body, etc)
```

Once you send a request and your API returns a response, its status code is going to be displayed in an alert view.

> For further information on authentication API on the server-side, check [the official documentation](/api/authentication).

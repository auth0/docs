---
title: Calling APIs
description: This tutorial will show you how to manage tokens to make authenticated API calls, using URLSession.
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '04-Calling-APIs',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>

Auth0 provides a set of tools for protecting your resources with end-to-end authentication in your application. 

This tutorial shows you how to get an access token, attach it to a request with an authorization header and call an API. We recommend you use this method for the best security and compliance with RFC standards. 

::: note
Read more about authentication API on the server-side in [the API documentation](/api/authentication).
:::

## Get the User's Credentials

You need an access token for your API to check if the request is authenticated. 

You can retrieve the token from an [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance. Read the [Login](/quickstart/native/ios-swift/00-login) article for instructions on how to get credentials.

## Attach the Token

This example shows how to use the `accessToken` value. 

::: note
Depending on the standards in your API, you configure the authorization header differently. The code below is just an example.
:::

To attach an access token to a request: 

```swift
// ProfileViewController.swift

let token  = ... // The accessToken you stored after authentication
let url = URL(string: "your api url")!
var request = URLRequest(url: url)
// Configure your request here (method, body, etc)
request.addValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
let task = URLSession.shared.dataTask(with: request) { data, response, error in
    // Parse the response
}
```

## Send the Request

Send the request you created:

```swift
// ProfileViewController.swift

task.resume()
```

### Sample project configuration

When you are testing the sample project, configure your URL request in the `ProfileViewController.swift` file:

```swift
// ProfileViewController.swift

let url = URL(string: "your api url")!
var request = URLRequest(url: url)
// Configure your request here (method, body, etc)
```

After you send a request and receive a response from your API, the request status code will be displayed in an alert view. 

---
title: Calling APIs
description: This tutorial will show you how to use Access Tokens to make authenticated API calls.
budicon: 546
github:
  path: 04-Calling-APIs
---

Auth0 provides a set of tools for protecting your resources with end-to-end authentication in your application. 

In this tutorial, you'll learn how to get a token, attach it to a request (using the authorization header), and call any API you need to authenticate with. 

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have completed the [Session Handling](/quickstart/native/ios-swift/03-user-sessions) tutorial and you know how to handle the `Credentials` object.
* You have set up a backend application as API. To learn how to do it, follow one of the [backend tutorials](/quickstart/backend).

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Get the User's Access Token

To retrieve an access token that is authorized to access your API, you need to specify the **API Identifier** value you created in the [Auth0 APIs Dashboard](https://manage.auth0.com/#/apis).

Present the Hosted Login Page:

::: note
Depending on the standards in your API, you configure the authorization header differently. The code below is just an example.
:::

```swift
// HomeViewController.swift
let APIIdentifier = "API_IDENTIFIER" // Replace with the API Identifier value you created

Auth0
    .webAuth()
    .scope("openid profile")
    .audience(APIIdentifier)
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            // Do something with credentials e.g.: save them.
            // Auth0 will automatically dismiss the hosted login page
            print("Credentials: \(credentials)")
        }
}
```

## Attach the Access Token

To give the authenticated user access to secured resources in your API, include the user's access token in the requests you send to the API.

```swift
// ProfileViewController.swift

let token  = ... // The accessToken you stored after authentication
let url = URL(string: "your api url")! // Set to your Protected API URL
var request = URLRequest(url: url)

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
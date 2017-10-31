---
title: Calling APIs
description: This tutorial will show you how to use the Auth0 tokens to make authenticated API calls.
budicon: 546
---

You may want to restrict access to your API resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

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

This tutorial shows you how to get an Access Token, attach it to a request with an authorization header and call an API. We recommend you use this method for the best security and compliance with RFC standards. 

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
let APIIdentifier = API_IDENTIFIER // Replace with the API Identifier value you created

    .audience(APIIdentifier)
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
---
title: Calling APIs
description: This tutorial will show you how to manage tokens to make authenticated API calls, using NSURLSession.
budicon: 546
github:
    path: 04-Calling-APIs
---

You may want to restrict access to your API resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

Auth0 provides a set of tools for protecting your resources with end-to-end authentication in your application. 

This tutorial shows you how to get an Access Token, attach it to a request with an authorization header and call an API. We recommend you use this method for the best security and compliance with RFC standards. 

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have completed the [Session Handling](/quickstart/native/ios-objc/03-user-sessions) tutorial and you know how to handle the `Credentials` object.
* You have set up a backend application as API. To learn how to do it, follow one of the [backend tutorials](/quickstart/backend).

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Get the User's Access Token

To retrieve an access token that is authorized to access your API, you need to specify the **API Identifier** value you created in the [Auth0 APIs Dashboard](https://manage.auth0.com/#/apis).

Present the Hosted Login Page:

```objc
// HomeViewController.m

HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid profile" connection:nil audience:"API_IDENTIFIER" callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error) {
            NSLog(@"Error: %@", error);
        } else if (credentials) {
          // Do something with credentials such as save them.
          // Auth0 will dismiss itself automatically by default.
        }
    });
}];
```

## Attach the Access Token

To give the authenticated user access to secured resources in your API, include the user's access token in the requests you send to the API.

::: note
Depending on the standards in your API, you configure the authorization header differently. The code below is just an example.
:::

To attach an Access Token to a request: 

```objc
// ProfileViewController.m

NSString* token = ... // The accessToken you stored after authentication
NSString *url = @"https://localhost/api"; // Set to your Protected API URL
NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
// Configure your request here (method, body, and so on)

[request addValue:[NSString stringWithFormat:@"Bearer %@", token] forHTTPHeaderField:@"Authorization"];
[[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    // Parse the response
}] resume];
```

### Sample project configuration

When you are testing the sample project, configure your URL request in the `ProfileViewController.swift` file:

```objc
// ProfileViewController.m

NSString *url = @"https://localhost/api"; // Change to your API
NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
// Configure your request here (method, body, and so on)
```

After you send a request and receive a response from your API, you can check the request status code in an alert view. 

::: note
Read more about authentication API on the server-side in [the API documentation](/api/authentication).
:::

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

Auth0 provides a set of tools for protecting your resources with end-to-end authentication in your application. 

This tutorial shows you how to get an access token, attach it to a request with an authorization header and call an API. We recommend you use this method for the best security and compliance with RFC standards. 

## Get the User's Credentials

You need a token for your API to check if the request is authenticated. 

You can retrieve the token from an [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance. Read the [Login](/quickstart/native/ios-objc/00-login) article for instructions on how to get credentials.

Depending on what you need, you can use any of the token strings inside the `Credentials` instance to make authenticated requests.

Then, present the login screen:

```objc
// HomeViewController.m

HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid profile" connection:nil callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error) {
            NSLog(@"Error: %@", error);
        } else if (credentials) {
          // Do something with credentials e.g.: save them.
          // Auth0 will dismiss itself automatically by default.
        }
    });
}];
```

## Attach the Token

This example shows how to use the `accessToken` value. 

::: note
Depending on the standards in your API, you configure the authorization header differently. The code below is just an example.
:::

To attach an access token to a request: 

```objc
// ProfileViewController.m

NSString* token = ... // The accessToken you stored after authentication
NSString *url = @"https://localhost/api"; // Change to your API
NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
// Configure your request here (method, body, etc)

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
// Configure your request here (method, body, etc)
```

After you send a request and receive a response from your API, you can check the request status code in an alert view. 

::: note
Read more about authentication API on the server-side in [the API documentation](/api/authentication).
:::

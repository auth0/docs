---
toc_title: Delegation API
description: Integrate with third-party apps with the delegation API.
---

# Lock iOS: Delegation API

After a successful authentication, you can request credentials to access third party apps like Firebase or AWS that are configured in your Auth0 App's Add-On section. In order to do that you need to make a request to our [Delegation API](/auth-api#!#post--delegation) using a valid JWT.

Here's an example
```objc
A0Lock *lock = ...; // your shared, single instance of A0Lock
A0Token *token = ...; // a parameter in Lock's onAuthenticationBlock
NSString *idToken = token.idToken;
A0AuthParameters *parameters = [A0AuthParameters newWithDictionary:@{
                                                                     @"id_token": idToken,
                                                                     A0ParameterAPIType: @"firebase",
                                                                     }];
[[lock apiClient] fetchDelegationTokenWithParameters:parameters success:^(NSDictionary *delegationToken) {
    NSLog(@"Firebase credentials %@", delegationToken);
} failure:^(NSError *error) {
    NSLog(@"Something went wrong");
}];
```

The only two parameters required are `id_token` and the `api_type` (the value of `A0ParameterAPIType` constant).

`api_type` specifies the API credentials we want to retrieve, and the API supported are:

* app: Your Auth0 application. This will get a new JWT token.
* aws: Amazon Web Services API.
* azure_sb: Windows Azure Service Bus.
* firebase: Firebase API.
* salesforce_api: Salesforce API.
* salesforce_sandbox_api: Salesforce Sandbox API.
* sap_api: SAP OData.
* wams: Windows Azure Mobile Services.

Please check our examples on how to connect with [Firebase](https://github.com/auth0/Lock.iOS-OSX/tree/master/Examples/Firebase) or [AWS](https://github.com/auth0/Lock.iOS-OSX/tree/master/Examples/AWS)

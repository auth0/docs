---
section: libraries
toc_title: Delegation API
description: Integrate with third-party apps with the delegation API.
---

# Lock iOS: Delegation API

After a successful authentication, you can request credentials to access third party apps like Firebase or AWS that are configured in your Auth0 App's Add-On section. In order to do that you need to make a request to our [Delegation API](/api/authentication/reference#delegation) using a valid JWT.

Here's an example
```objc
A0Lock *lock = [A0Lock sharedLock];
NSString *token = ...; // Auth0's id_token obtained on login
A0AuthParameters *parameters = [A0AuthParameters newWithDictionary:@{
                                                                     @"id_token": token,
                                                                     A0ParameterAPIType: @"firebase",
                                                                     }];
[[lock apiClient] fetchDelegationTokenWithParameters:parameters success:^(NSDictionary *delegationToken) {
    // delegationToken will have your firebase token
} failure:^(NSError *error) {
    // Something went wrong
}];
```

```swift
let client = A0Lock.sharedLock().apiClient()
let token = ...; // Auth0's id_token obtained on login
let parameters = A0AuthParameters.newWithDictionary([
        "id_token": token,
        A0ParameterAPIType: "firebase"
    ])
client.fetchDelegationTokenWithParameters(parameters,
    success: { payload in
        // payload will have your firebase token
    },
    failure: error in {
        // Something went wrong
    })
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

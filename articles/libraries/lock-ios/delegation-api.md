# Lock iOS: Delegation API

After a successful authentication, you can request credentials to access third party apps (such as Firebase or AWS) that are configured in your [application's add-ons dashboard](${uiURL}/#/applications/${appID}/addons). In order to do that, you need to make a request to our [Delegation API](/auth-api#!#post--delegation) using a valid [JWT](/jwt).

> For further reference on the delegation process, you should check out the [Delegation Tokens](/tokens/delegation) documentation.

Here's an example of how to use the Delegation API:

```swift
let client = A0Lock.sharedLock().apiClient()
let token = ... // Auth0's id_token obtained on login
let parameters = A0AuthParameters(dictionary: ["id_token": token, A0ParameterAPIType: "firebase"])
client.fetchDelegationTokenWithParameters(parameters,
    success: { payload in
        // payload will have your firebase token
    },
    failure: { error in
        // Something went wrong
    })
```

```objective-c

```



The only two parameters required are `id_token` and the `api_type`. This last one is represented by the `A0ParameterAPIType` constant, and specifies the API credentials you want to retrieve. 

Here is a list of the supported APIs:

- `app`: Your Auth0 application. This will get a new JWT token.
- `aws`: Amazon Web Services API.
- `azure_sb`: Windows Azure Service Bus.
- `firebase`: Firebase API.
- `salesforce_api`: Salesforce API.
- `salesforce_sandbox_api`: Salesforce Sandbox API.
- `sap_api`: SAP OData.
- `wams`: Windows Azure Mobile Services.
---
description: Integrate with third-party apps with the delegation API.
---

::: panel-warning Version Warning
This document is not yet updated to use [Lock for Android](https://github.com/auth0/Lock.Android) 2.0. It will be soon!
:::

# Lock Android: Delegation API

After a successful authentication, you can request credentials to access third party apps like Firebase or AWS that are configured in your Auth0 App's Add-On section. In order to do that you need to make a request to our [Delegation API](/auth-api#!#post--delegation) using a valid JWT.

Here's an example
```java
Lock lock = LockContext.getLock(this);
AuthenticationAPIClient client = lock.getAuthenticationAPIClient();
String apiType = "firebase";
String token = .... //Your Auth0 id_token of the logged in User
Map<String, Object> parameters = ParameterBuilder.newEmptyBuilder()
        .set("id_token", token)
        .set("api_type", apiType)
        .asDictionary();
client
    .delegation()
    .addParameters(parameters).start(new BaseCallback<Map<String, Object>>() {
        @Override
        public void onSuccess(Map<String, Object> payload) {
            //Your Firebase token will be in payload        
        }

        @Override
        public void onFailure(Throwable error) {
            //Delegation call failed
        }
    });
```

> The delegation response is a generic Map since the structure of it will depend of the `api_type` used for delegation

The only two parameters required are `id_token` and `api_type`, the former is the token returned by Auth0 after a successful authentication, the latter specifies the API credentials we want to retrieve, and these are its supported values:

* app: Your Auth0 application. This will get a new JWT token.
* aws: Amazon Web Services API.
* azure_sb: Windows Azure Service Bus.
* firebase: Firebase API.
* salesforce_api: Salesforce API.
* salesforce_sandbox_api: Salesforce Sandbox API.
* sap_api: SAP OData.
* wams: Windows Azure Mobile Services.

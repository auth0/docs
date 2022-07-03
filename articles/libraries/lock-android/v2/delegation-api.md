---
section: libraries
title: Lock for Android v2 Delegation API
description: Integrate with third-party apps with the delegation API.
topics:
  - libraries
  - lock
  - android
contentType:
  - how-to
  - reference
useCase:
  - add-login
  - enable-mobile-auth
---
# Lock Android: Delegation API

<%= include('../../../_includes/_deprecate-delegation') %>

After a successful authentication, you can request credentials to access third party apps like Firebase or AWS that are configured in your Auth0 App's Add-On section. In order to do that you need to make a request to our [Delegation API](/api/authentication/reference#delegation) using a valid JWT.

Here's an example

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
String apiType = "firebase";
String token = //Your Auth0 ID Token of the logged in User
client.delegationWithIdToken(token, apiType)
  .start(new BaseCallback<Map<String, Object>, AuthenticationException>() {
        @Override
        public void onSuccess(Map<String, Object> payload) {
            //Your Firebase token will be in payload
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Delegation call failed
        }
    });
```

::: note
The delegation response is a generic Map since the structure of it will depend of the `api_type` used for delegation
:::

The only two parameters required are `id_token` and `api_type`, the former is the token returned by Auth0 after a successful authentication, the latter specifies the API credentials we want to retrieve, and these are its supported values:

* app: Your Auth0 application. This will get a new JWT token.
* aws: Amazon Web Services API.
* azure_sb: Windows Azure Service Bus.
* firebase: Firebase API.
* salesforce_api: Salesforce API.
* salesforce_sandbox_api: Salesforce Sandbox API.
* sap_api: SAP OData.
* wams: Windows Azure Mobile Services.

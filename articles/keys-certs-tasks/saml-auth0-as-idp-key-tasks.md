---
url: /saml/auth0-as-idp
---

## Auth0 as Identity Provider (Application with SAML Addon)

When you use Auth0 as Identity Provide (IDP) there are some tasks that you may need to perform, with regards to keys:
+ Upload public key/certificate from Service Provider (SP) to Auth0 to validate signed authentication requests coming from SP
+ Download public key/certificate from Auth0 to give to SP to validate SAML authentication response from Auth0
+ Upload public key/certificate from SP so Auth0 can encrypt authentication responses it sends to SP.
+ Upload a custom keypair if the Auth0-generated certificate is not acceptable for some reason.  
+ Updating certificates

::: panel-info More information on Auth0 as an IDP
This article describes only those tasks are related to keys and certificates. For detailed information on how to configure Auth0 as an IDP, please refer to the document [Auth0 as Identity Provider](/saml-idp-generic).
:::
---
url: /saml/auth0-as-sp
---

## Auth0 as Service Provider (SAML connection)

When you use Auth0 as Service Provider there are some tasks that you may need to perform, with regards to keys.

> 

+ Download public key/certificate to give to IDP to sign SAML authentication request to IDP
+ Upload public key/certificate from IDP to Auth0 to validate signed authentication responses coming from IDP
+ Download public key/certificate to give to IDP so it can encrypt authentication responses it sends to Auth0.
+ Upload a custom keypair or private key if the Auth0-generated certificate is not acceptable for some reason.  
+ Updating certificates


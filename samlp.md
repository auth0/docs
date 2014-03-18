---
title: SAML
layout: doc.nosidebar
---
# SAML Identity Provider Configuration

These are the parameters used to configure a SAML Identity Provider:

* The __post-back URL__ (also called __Assertion Consumer Service URL__) is: **https://@@account.namespace@@/login/callback**
* The __Entity ID__ of the Service Provider is: **urn:auth0:@@account.tenant@@**
* The __SAML Request Binding__ (sent to the IdP from Auth0): **HTTP-Redirect**
* The __SAML Response Binding__ (how the SAML token is received by Auth0 from IdP): **HTTP-Post**
* The __NameID format__: **unspecified**
* The SAML assertion, and the SAML response can be individually or simultaneously signed.
* Optional: Assertions can be encrypted. Use this public key to configure the IdP: [CER](https://@@account.namespace@@/cer) | [PEM](https://@@account.namespace@@/pem) | [PKCS#7](https://@@account.namespace@@/pb7)

> If you want **IdP-Initiated SSO**, please make sure to include the connection parameter in the post-back URL: `https://@@account.namespace@@/login/callback?connection={YOUR_CONNECTION_NAME}`

Some SAML Identity Providers can accept importing metadata directly with all the required information. You can access the metadata for your connection in Auth0 here: `https://@@account.namespace@@/samlp/metadata?connection={YOUR_CONNECTION_NAME}`. Replace `{YOUR_CONNECTION_NAME}` with the name you've given to the SAML connection.

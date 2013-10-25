---
title: SAML
layout: doc.nosidebar
---
# SAML Identity Provider Configuration

These are the paramters to configure on the SAML Identity Provider:

* The post-back URL (also called Assertion Consumer Service URL) is: **https://@@account.namespace@@/login/callback**
* The Entity ID of the Service Provider is: **urn:auth0:@@account.tenant@@**
* Binding for SAML Request (sent to IdP): **HTTP-Redirect**
* Binding for the SAML Response (received from IdP): **HTTP-Post**
* NameID format: **unspecified**
* The SAML assertion, the SAML response, or both can be signed.

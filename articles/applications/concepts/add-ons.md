---
description: Learn about add-ons and how they are related to Auth0-registered Applications.
topics:
  - applications
  - add-ons
contentType: reference
useCase:
  - build-an-app
  - integrate-third-party-apps
---

# Add-ons

Add-ons are plugins associated with an application registered with Auth0. Usually, they are third-party APIs used by application(s) for which Auth0 generates Access Tokens (e.g., Salesforce, Azure Service Bus, Azure Mobile Services, SAP).

Some typical scenarios for using add-ons include:

* **Accessing External APIs**: Using the Delegation endpoint, you can exchange your application's Access Token for a third-party service's (e.g., Salesforce, Amazon) Access Token.

* **Integrating with Applications using SAML2/WS-Federation**: Since Add-ons allow you to configure every aspect of the SAML2/WS-Federation integration, they allow you to integrate with any custom or SSO integration that does not currently enjoy built-in Auth0 support.

![Addons Example Diagram](/media/articles/applications/applications-addon-types.png)


## Keep reading

- [View All Available Add-ons for an Application](/applications/guides/view-addons-for-app)
- [How to Configure an Add-On for an Application](/addons)

---
description: Explains what Add-ons are and how they are associated with Auth0 Clients.
---

# Client Add-ons

Add-ons are plugins associated with a client in Auth0. Usually, they are third-party APIs used by the client(s) that Auth0 generates access tokens for (for example, Salesforce, Azure Service Bus, Azure Mobile Services, SAP and more).

To view all the available add-ons for a client navigate to [Dashboard > Clients > Addons](${manage_url}/#/clients/${account.clientId}/addons).

![Client Addons List](/media/articles/applications/addons-dashboard-list.png)

Some typical scenarios for using add-ons include:

* **Accessing External APIs**: Using the Delegation endpoint, you can exchange a Client's access token for a third-party service's (such as Salesforce or Amazon) access token.

* **Integrating with Applications Using SAML2/WS-Federation**: Add-ons allow you to integrate with any custom or SSO integration that does not currently enjoy built-in Auth0 support, since they allow you to configure every aspect of the SAML2/WS-Federation integration.

![Addons Example Diagram](/media/articles/applications/applications-addon-types.png)

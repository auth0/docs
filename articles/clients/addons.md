---
description: Explains what Addons are and how they are associated with Auth0 Clients.
---

# Addons

![Addons Example Diagram](/media/articles/applications/applications-addon-types.png)

Addons are extensions associated with clients. They are typically third-party APIs used by the client(s) for which Auth0 generates access tokens.

![Client Addons List](/media/articles/applications/addons-dashboard-list.png)

Some typical scenarios include:

* **Accessing External APIs**: Using the Delegation endpoint, you can exchange a Client's access token for a third-party service's (such as Salesforce or Amazon) access token.

* **Integrating with Applications Using SAML2/WS-Federation**: Addons allow you to integrate with any custom or SSO integration that does not currently enjoy built-in Auth0 support, since they allow you to configure every aspect of the SAML2/WS-Federation integration.

![SSO Integrations Overview](/media/articles/applications/applications-sso-integrations-overview.png)

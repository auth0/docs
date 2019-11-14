---
title: Custom Domains
description: Understand how Auth0 custom domains work so that you can map your tenant domain to a domain of your choosing instead of redirecting users to Auth0's domain. 
topics:
  - custom-domains
contentType: index
useCase: customize-domains
---
# Custom Domains

<%= include('./_subscription') %>

Auth0 allows you to map the domain for your tenant to **one custom domain** of your choosing. This allows you to maintain a consistent experience for your users by keeping them on your domain instead of redirecting or using Auth0's domain. You must register and own the domain name to which you are mapping your Auth0 domain. For example, if your Auth0 domain is **travel0.auth0.com**, you can have your users to see, use, and remain on **login.travel0.com**.

We recommend that you use custom domains with Universal Login for the most seamless and secure experience for your users. Check the [Universal Login documentation](/hosted-pages/login) to see if your plan and use case support custom domains. 

The following Auth0 features and flows support the use of custom domains:

::: note
Features not in the list are **not supported** by Auth0 with custom domains.
:::

* OAuth 2.0/OIDC-Compliant flows (those using the [`/authorize`](/api/authentication#authorize-application) and [`/oauth/token`](/api/authentication#get-token) endpoints)
* Guardian (MFA Widget Version 1.3.3/Guardian.js Version 1.3.0 or later)
* Emails (the links included in the emails will use your custom domain)
* Database and social connections
* Lock 11 with cross-origin authentication
* <dfn data-key="passwordless">Passwordless</dfn> connections with Universal Login (The email link will be sent using the custom domain if the option is enabled in **Tenant Settings > Custom Domains**)
* G Suite connections
* <dfn data-key="security-assertion-markup-language">SAML</dfn> connections and applications
* WS-Fed clients (Auth0 as IDP using WS-Fed Add-on)
* Azure AD connections
* ADFS connections
* AD/LDAP connections
* All multi-factor authentication factors

## Token issuance

Auth0 issues tokens with the **iss** claim of whichever domain you used with the request. For example, if you used **https://travel0.auth0.com/authorize...** to obtain an Access Token, the **iss** claim of the token you receive will be **https://travel0.auth0.com/**. If you used your custom domain **https://login.travel0.com/authorize...**, the **iss** claim value will be **https://login.travel0.com/**. 

If you get an Access Token for the [Management API](/api/management/v2) using an authorization flow with your custom domain, you **must** call the Management API using the custom domain (your token will be considered invalid otherwise).
:::

## Certificate management

Auth0 offers two certificate management options:

* **Auth0-Managed Certificates**: [Auth0-managed certificates](/custom-domains/auth-managed-certificates) are those where Auth0 will manage the creation and renewal of the certificates for your custom domain. This is the simplest custom domains deployment option, and the scope of this document

* **Self-Managed Certificates**: [Self-managed certificates](/custom-domains/self-managed-certificates) are available for enterprise customers only. Choosing this option means that you are responsible for managing your SSL/TLS certificates and configuring a reverse proxy to handle SSL termination and forwarding requests to Auth0.

## Exceptions

You can use either your `${account.namespace}` domain to access Auth0 or your custom domain. There are, however, a few exceptions:

- If you are using embedded Lock or an SDK, the configuration is pre-defined as using either your custom domain or the `${account.namespace}` domain, so you have to use one or the other.
- If you start a session in `${account.namespace}`, and go to `custom-domain.com`, the user will have to login again.

## Whitelisting

Auth0 does not provide a static list of IP addresses as they are subject to change. We recommend that you whitelist your custom domain instead.

---
title: Custom Domains
description: Understand how Auth0 custom domains work so that you can map your tenant domain to a domain of your choosing instead of redirecting users to Auth0's domain. 
topics:
  - custom-domains
  - whitelisting
  - custom-domain features
  - certificates
contentType: 
  - index
  - concept
useCase: customize-domains
---
# Custom Domains

<%= include('./_subscription') %>

Auth0 allows you to map the domain for your tenant to **one custom domain** of your choosing. This allows you to maintain a consistent experience for your users by keeping them on your domain instead of redirecting or using Auth0's domain. You must register and own the domain name to which you are mapping your Auth0 domain. For example, if your Auth0 domain is **travel0.auth0.com**, you can have your users to see, use, and remain on **login.travel0.com**.

We recommend that you use custom domains with Universal Login for the most seamless and secure experience for your users. See [Universal Login](/hosted-pages/login) to determine if your use case requires custom domains. 

## Token issuance

Auth0 issues tokens with the **iss** claim of whichever domain you used with the request. For example: 

| If you use | **iss** claim value with custom domain |
| -- | -- |
| `https://travel0.auth0.com/authorize...` | `https://travel0.auth0.com/` |
| `https://login.travel0.com/authorize...` | `https://login.travel0.com/` |

::: note
If you get an Access Token for the [Management API](/api/management/v2) using an authorization flow with your custom domain, you **must** call the Management API using the custom domain (your token will be considered invalid otherwise).
:::

## Whitelisting

Be aware that Auth0 does not provide a static list of IP addresses because they are subject to change. We recommend that you whitelist your custom domain instead.

## Exceptions

You can use either your `${account.namespace}` domain to access Auth0 or your custom domain. There are, however, a few exceptions:

- If you use embedded Lock or an SDK, the configuration is pre-defined to use either your custom domain or the `${account.namespace}` domain, so you have to use one or the other.
- If you start a session in `${account.namespace}`, and go to `custom-domain.com`, the user will have to login again.

## Auth0 features that use custom domains

The following Auth0 features can use custom domains. See [Configure Custom Domains for Specific Features](/custom-domains/additional-configuration) for details. 

::: note
Features not in the list are **not supported** by Auth0 with custom domains.
:::

| Features/Flows | Details |
| -- | -- |
| Universal Login | For a seamless and secure user experience |
| MFA | All factors |
| Guardian | MFA Widget version 1.3.3/Guardian.js version 1.3.0 or later |
| Emails | Links included in the emails use your custom domain |
| Connections | Database, social, G Suite, Azure AD, ADFS, AD/LDAP |
| <dfn data-key="lock">Lock</dfn> | Version 11 with cross-origin authentication |
| <dfn data-key="passwordless">Passwordless</dfn> | With Universal Login (The email link sent using the custom domain if the option is enabled in **Tenant Settings > Custom Domains**.) |
| <dfn data-key="security-assertion-markup-language">SAML</dfn> | Connections and applications |
| WS-Federation | Auth0 as identity provider using WS-Fed add-on |
| OAuth 2.0/OIDC-Compliant flows | Using the [`/authorize`](/api/authentication#authorize-application) and [`/oauth/token`](/api/authentication#get-token) endpoints |

## Certificate management options

Auth0 offers two certificate management options that you can configure:

* [Auth0-managed certificates](/custom-domains/auth-managed-certificates) where Auth0 manages the creation and renewal of the certificates for your custom domain. This is the simplest custom domains deployment option.

* [Self-managed certificates](/custom-domains/self-managed-certificates) are available for Auth0 Enterprise customers only. This option means that you are responsible for managing SSL/TLS certificates and configuring a reverse proxy to handle SSL termination and forwarding requests to Auth0.

## Keep reading

* [Configure Custom Domains for Specific Features](/custom-domains/additional-configuration)
* [Universal Login](/hosted-pages/login)
* [Multi-factor Authentication](/multifactor-authentication)
* [Emails in Auth0](/email)
* [Connections](/identityproviders)
* [Lock v11 for Web](/libraries/lock/v11)
* [Passwordless Authentication](/api-auth/passwordless)
* [SAML](/protocols/saml)
* [WS-Federation](/protocols/ws-fed)
* [Which OAuth 2.0 Flow Should I Use?](/api-auth/which-oauth-flow-to-use)

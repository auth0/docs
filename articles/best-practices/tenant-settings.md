---
title: Tenant Settings Best Practices
description: Learn about recommended tenant settings in Auth0.
topics:
  - best-practices
  - configuration
  - settings
  - tenant
contentType:
    - reference
useCase:
  - best-practices
  - tenant
  - tenant-settings
---
# Tenant Settings Best Practices

Here are some best practices for configuring [tenants](/getting-started/the-basics#account-and-tenants).

## Specify a production tenant

Visit [Auth0 Support Center > Tenants](https://support.auth0.com/tenants/public) and specify your production tenant. Production tenants get higher rate limits than non-production tenants. On non-enterprise plans, only one tenant per subscription can be set as a production tenant.

## Set up branding configuration

Go to your [tenant's general settings](${manage_url}/#/tenant) and provide your branding information:

- your application or company name
- a URL to your logo image
- your company's support email address
- your company's support URL

The support email address and URL is shown on the default error page, so users can contact your support if they have an issue. You can also [host your own custom error page](/hosted-pages/custom-error-pages) and configure Auth0 to use it instead. Using your own error page, you can provide more complete and customized explanations to users about what to do in the event of an error. Setting up your own custom error page is recommended, but not required.

## Set up Custom Domain

You can configure [custom domains](/custom-domains) in your tenant settings.

If you want to use a custom domain name for the <dfn data-key="universal-login">Universal Login</dfn> [page](/hosted-pages/login), set up the custom domain at the start to minimize changes you’ll need to make later.

For <dfn data-key="security-assertion-markup-language">SAML</dfn> connections that authenticate users against remote SAML Identity Providers, you should set up the custom domain before configuring any SAML providers as changing the domain across multiple SAML providers is challenging.

## Set Single Sign-on session timeout

The <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> [session timeout value](/dashboard/reference/settings-tenant#login-session-management) in your tenant settings specifies the time until a user's session expires. By default the value is 7 days. During this time, users can access your Auth0-integrated applications without re-entering their credentials.

Adjust this value to fit your application’s desired user experience and security requirements.

For example, enterprise environments may choose 8 hours or shorter to ensure users authenticate at least once per shift. But for customer-facing environments, where long sessions are desirable for the user experience, the value might be set to much longer than 7 days.

## Periodically review dashboard admins 

On a regular basis, review the list of [dashboard administrators](/dashboard/reference/settings-tenant#dashboard-admins) with access to your Auth0 tenant and make sure that:

- each person has a legitimate need for admin access
- admins are registered with a company account
- former employees no longer have access
- there's more than one dashboard admin

For further protection, turn on <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> for your dashboard admins. If a Dashboard Admin is locked out and needs their MFA reset, another Dashboard Admin should open an Auth0 [support ticket](/support/tickets) on their behalf. Auth0 can reset MFA for that admin after a verification process.

## Turn off Enable Application Connections

In your [tenant's advanced settings](${manage_url}/#/tenant/advanced), turn off **Enable application connections**.

If this setting is on, all configured connections are enabled for new applications you create, so users may be able to login to an application with an unintended connection. By having connections disabled by default, you can explicitly enable the connections appropriate for each application.

## Turn on Anomaly Detection

To protect against brute force attacks and breached passwords, [turn on and configure Auth0 Anomaly Detection](/anomaly-detection/guides/set-anomaly-detection-preferences). 

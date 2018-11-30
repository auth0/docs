---
description: Recommended tenant settings in Auth0.
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

Hear are some best practices for configuring [tenants](/getting-started/the-basics#account-and-tenants).

## Specify a production tenant

Visit [Auth0 Support Center > Tenants](https://support.auth0.com/tenants/public) and specify your production tenant. Production tenants get higher rate limits than non-production tenants. Only one tenant per subscription can be set as a production tenant.

## Set up branding configuration

Go to your [tenant's general settings](${manage_url}/#/tenant) and provide your branding information:

- your application or company name
- a URL to your logo image
- your company's support email address
- your company's support URL

The support email address and URL is shown on the default error page, so users can contact your support if they have an issue. You can also [host your own custom error page](/hosted-pages/custom-error-pages) and configure Auth0 to use it instead. Using your own error page, you can provide more complete and customized explanations to users about what to do in the event of an error. Setting up your own custom error page is recommended, but not required.

## Set up Custom Domain

You can configure [custom domains](/custom-domains) in your tenant settings.

If you want to use a custom domain name for the [Universal Login page](/hosted-pages/login), set up the custom domain at the start to minimize changes you’ll need to make later.

For SAML connections that authenticate users against remote SAML Identity Providers, you should set up the custom domain before configuring any SAML providers as changing the domain across multiple SAML providers is challenging.

## Set SSO session timeout

The [SSO session timeout value](/dashboard/dashboard-tenant-settings#session-timeout) in your tenant settings specifies the time until a user's session expires. By default the value is 7 days. During this time, users can access your Auth0-integrated applications without re-entering their credentials.

Adjust this value to fit your application’s desired user experience and security requirements.

For example, enterprise environments may choose 8 hours or shorter to ensure users authenticate at least once per shift. But for customer-facing environments, where long sessions are desirable for the user experience, the value might be set to much longer than 7 days.

## Periodically review dashboard admins 

On a regular basis, review the list of [dashboard administrators](/dashboard/dashboard-tenant-settings#dashboard-admins) with access to your Auth0 tenant and make sure that:

- each person has a legitimate need for admin access
- admins are registered with a company account
- former employees no longer have access
- there's more than one dashboard admin

For further protection, turn on Multi-Factor Authentication (MFA) for your dashboard admins. There is the possibility of an admin being locked out if they lose their phone, but if you have multiple dashboard admins, another admin can temporarily disable the MFA for the admin who lost their phone.

## Turn off Enable Application Connections

In your [tenant's advanced settings](${manage_url}/#/tenant/advanced), turn off **Enable application connections**.

If this setting is on, all configured connections are enabled for new applications you create, so users may be able to login to an application with an unintended connection. By having connections disabled by default, you can explicitly enable the connections appropriate for each application.

## Turn on Anomaly Detection

To protect against brute force attacks, [turn on and configure Auth0 Anomaly Detection](/anomaly-detection). Also configure [Breached Password Protection](/anomaly-detection/breached-passwords) in Anomaly Detection, if you have purchased it.

---
description: Explains what features and settings can be changed in the Account Settings page of the dashboard.
url: /dashboard-account-settings
---
# Account Settings in the Auth0 Management Dashboard

This page explains all the features and settings that can be changed in the [Account Settings](${manage_url}/#/account) page of the dashboard.

## General

### Your Profile

Here you can view the fields set for your account. If you have multiple accounts, you can change your **Default Account** by selecting your choice from the dropdown.

### Multifactor 

Multifactor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. You can enable Multifactor Authentication for your account by clicking on the _Enroll your device now_ link.

This will walk you through the steps for [enrolling with MFA](/multifactor-authentication/guardian/user-guide).

### Settings

Use this section to customize your account.

**Friendly Name**: This is the name you want to be displayed to your users, usually the name of your company or organization.
**Logo URL**: In this field, enter the URL where you have a square image saved. This image will appear to your users on various screens and pages.
**Support Email**: The email used to contact your support team.
**Support URL**: The link to your company/organization support page.

Click **SAVE** when finished to submit your changes.

### API Authorization Settings

**Default Audience**: This is the endpoint for the default audience for the [API Authorization](/api-auth). This setting is equivalent to appending the audience to every authorization request made to the tenant for every client. This will cause new behaviour that might result in breaking changes for some of your clients. Please contact support if you require assistance.

**Default Directory**: Name of the connection to be use for [Password Grant exchanges](/api-auth/tutorials/password-grant). The `default_directory` value should be the exact name of an existing connections of one of the following strategies: auth0-adldap, ad, auth0, email, sms, waad or adfs.

### Error Pages

[Learn about Custom Error Pages](/hosted-pages/custom-error-pages).

## Subscription and Payment

[Learn about changing your Subscription](/support/subscription).

## Active Users

Comprehensive usage reporting is now available in [Support Center](https://support.auth0.com/reports/quota).

## Dashboard Admins

[Learn about Dashboard Admins](/tutorials/manage-dashboard-admins).

## Webtasks

The Auth0 rules engine uses [webtask.io](https://webtask.io/). This section explains about how to build apps and extensions on top of webtask.

[Learn more about Webtasks](https://webtask.io/).

## Advanced

### Logout

**Allowed Logout URLs**

A set of URLs that are valid to redirect to after logout from Auth0 when no `client_id` is specified on the logout endpoint invocation. It's useful as a global list when SSO is enabled. 

Learn more about [Logout](/logout).

### Session Timeout

**SSO Cookie Timeout**

This value is the login session lifetime, which is how long the session will stay valid measured in minutes. The default value is 10080 minutes (or 7 days).

### Global Client Information

The **Global Client ID** and **Global Client Secret** are used to generate tokens for legacy Auth0 APIs. Typically, you will not need these values. If you need to have the global client secret changed, please [contact support](https://support.auth0.com).

### Settings

**Change Password flow v2**: Turning this on enables a new version of the change password flow. The previous alternative has been deprecated and we strongly recommend enabling v2. This flag is presented only for backwards compatibility and once enabled you won't be able to disable it. 

You can configure how the Change Password widget will look like at the [Password Reset](${manage_url}/#/password_reset) tab inside the [Hosted Pages](${manage_url}/#/login_page) section of the dashboard.

**Enable Client Connections**: This flag determines whether all current connections shall be enabled when a new [Client](${manage_url}/#/clients) is created.

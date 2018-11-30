---
title: Multi-factor Authentication in Auth0
description: The basics of multi-factor authentication and the different methods of implementing it with Auth0.
url: /multifactor-authentication
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# Multi-factor Authentication

## What is multi-factor authentication?

Multi-factor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user **knows** (such as a password)
* **Possession**: Something the user **has** (such as a mobile device)
* **Inheritance**: Something the user **is** (such as a fingerprint or retina scan)

## Implement MFA with Auth0

Enabling MFA for your tenant is a fairly straightforward process. First, you toggle on the factors you choose to enable on your tenant, such as push notifications or SMS. Next, you perform any further setup required to configure that factor, and last, you choose whether you wish to force MFA for all users or not. See the instructions below for details.

You can also [customize your MFA flow](/multifactor-authentication/custom) with [Auth0 Rules](/rules), to allow MFA to only be required in specific circumstances or force a particular factor to be used.

### 1. Enable the factors you require

In the [Dashboard > Multifactor Auth](${manage_url}/#/mfa), head to the Multifactor Auth section. Here you will find a series of toggles for the MFA factors supported by Auth0. 

![MFA Dashboard Page](/media/articles/multifactor-authentication/mfa-dashboard-1.png)

Any or all of these factors can be enabled simultaneously. When logging in the first time, the user will be shown the most secure factor available, but will be allowed to choose another factor to use if you have more than one factor enabled in the Dashboard. 

::: note
When you enable the SMS or the Duo factor, you will have to click on it and fill in a few further settings related specifically to that factor before continuing.
:::

#### Always require multi-factor authentication

![MFA Dashboard Page](/media/articles/multifactor-authentication/mfa-dashboard-2.png)

The **Always require Multi-factor Authentication** setting, when enabled, will force all your applications to prompt for MFA during the authentication flow. Users will be able to use any of the factors enabled in the Dashboard.

### 2. Set up your services

<%= include('./factors/_factors-index') %>

## Customizing multi-factor authentication

### Customizing MFA

::: note
These customizations do not apply to Duo, which has its own UI.
:::

The hosted page for MFA can also be customized. You may change the logo and the name that is displayed to your users. To do so, make the appropriate changes to the Guardian page's settings on the **General** tab in [Dashboard > Tenant Settings](${manage_url}/#/tenant). You can also reach the Tenant Settings page by clicking on your tenant name on the top right of the page and then selecting **Settings** from the dropdown menu.

* **Friendly Name**: the name of the app that you want displayed to users
* **Logo URL**: the URL that points to the logo image you want displayed to users

Additionally, you can [customize the MFA hosted page](/hosted-pages/guardian) as well.

### Customizing via Rules

If you need to customize the multi-factor experience you are offering to your users, you may do so via [custom rules configurations for multi-factor authentication](/multifactor-authentication/custom). This might be needed, for example, if you wish to trigger MFA for only specific applications, or for specific users based on user metadata or on IP addresses.

### MFA API

Additionally, the [MFA API](/multifactor-authentication/api) is available for other customized MFA requirements.

## Recovery methods

With most MFA factors, upon signup, the end user will be given a recovery code which should be noted, and kept secret. They will need this code to login if they do not have their device or are temporarily unable to use their normal MFA. If they have lost their recovery code and device, you will need to [reset the user's MFA](/multifactor-authentication/reset-user).

![MFA Recovery Code](/media/articles/multifactor-authentication/recovery-code.png)

::: note
If a recovery code is used, a new recovery code will be provided at that time.
:::

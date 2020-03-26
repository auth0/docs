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

Any or all of these factors can be enabled simultaneously. When logging in the first time, the user will be shown the most secure factor available, but will be allowed to choose another factor to use if you have more than one factor enabled in the Dashboard. The SMS and the Duo factors require further setup. You will have to click on the factor and fill in a few further settings before continuing.

::: note
Duo will only be available to end-users as a factor if it is the only factor that is enabled.
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

The Multi-factor Authentication pages can be customized by adjusting the Universal Login branding options in the [Universal Login Settings](${manage_url}/#/login_settings) section.

If you need further customization, you can also customize [the full HTML content](/universal-login/multifactor-authentication#customizing-the-html-for-the-mfa-page) to reflect your organization's particular UX requirements, if using Classic Universal Login.

#### MFA with New Universal Login

With the New Universal Login Experience, MFA is presented even more simply to the user. Once they have entered their credentials to log in, they are presented with the MFA screen. If they have no MFA factor enrolled, they will be asked to enroll, and if they do, they will be asked to present their MFA credential.

![MFA with New UL](/media/articles/universal-login/new-ul-mfa1.png)

Note that in addition to complying with the requested factor, a user can also click the link at the bottom and be taken to a screen which presents all available MFA factors for this application, and select another to enroll or use.

![MFA with New UL - Select a Factor](/media/articles/universal-login/new-ul-mfa2.png)

### Customizing via Rules

If you need to customize the multi-factor experience you are offering to your users, you may do so via [custom rules configurations for multi-factor authentication](/multifactor-authentication/custom). This might be needed, for example, if you wish to trigger MFA for only specific applications, or for specific users based on user metadata or on IP addresses.

### MFA API

Additionally, the [MFA API](/multifactor-authentication/api) is available for other customized MFA requirements.

## Recovery methods

With most MFA factors, upon signup, the end user will be given a recovery code which should be noted and kept secret. They will enter this code, after their username and password, to login if they do not have their device or are temporarily unable to use their normal MFA. 

![MFA Recovery Code](/media/articles/multifactor-authentication/recovery-code.png)

::: note
If a recovery code is used, a new recovery code will be provided at that time.
:::

If they have lost their recovery code and device, you will need to [reset the user's MFA](/multifactor-authentication/reset-user).

If a user uninstalls then later re-installs Guardian, they may be prompted to enter their recovery code. If the recovery code has been lost, the user can perform a new installation of the app by disabling automatic restoration of their Guardian backup. To do so, the user will need to uninstall Guardian, temporarily disable automatic restoration of backups within their device settings (steps to do so will vary according to the device), then re-install the app. They will then need to add their MFA account(s) to the app as if performing a first-time setup. If automatic backups or automatic restoration are not enabled on the user's device, re-installation of the app will not prompt for a recovery code and the user will be required to add their MFA account(s) as in a first-time setup.

## Troubleshooting

See the [MFA Troubleshooting Guide](/multifactor-authentication/troubleshooting) for help troubleshooting common end-user issues.

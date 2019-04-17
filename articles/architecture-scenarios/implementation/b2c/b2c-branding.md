---
title: Branding
description: Understand how you can configure Auth0 items to reflect your brand and desired user experience
toc: true
topics:
    - b2c
    - ciam
    - branding
    - universal-login
    - login-pages
    - change-password-pages
    - custom-domains
    - error-pages
contentType: concept
useCase:
    - user-logout
---
# Branding

## Planning

To help you with planning your implementation, we've put together some [planning guidance](#) that details our recommended strategies.

## Overview

Auth0 can be customized with a look and feel that aligns with your organization's brand requirements and user expectations. The consistency in appearance improves your customer's experience, and alos gives them the peace of mind that the product you are providing can be trusted and is secure.

::: panel Best Practice
Branding Auth0 collateral provides a consistent look and feel to the user experience for your customers as well as giving them the peace of mind that they’re using a product from a trusted and secure provider.
:::

Auth0 also provides support for [internationalization (I18N)](/i18n) and localization (L10N), both of which are important if you work with an international clientele. Out-of-box collateral, such as the Auth0 Lock UI widget, comes ready enabled for multiple language support, with built-in extensibility for adding more languages if what you require [doesn’t already exist](/libraries/lock/v11/i18n).
 
::: panel Best Practice
Almost all applications need Internationalization and/or Localization in one form or another. Auth0 makes it easy to add, but you need to account for it up front: retro-fitting localization, for example, can be a painful process if left too late.
:::

When considering the items you want to brand, as well as how best to brand them, there are a number of things you'll want to review:

* Will you brand your login page?
* Will you need to localize your login page?
* Will you customize emails so that they're not just branded, but vary based on user preference?
* How will users know that they're still on your domain when they see your login page?
* What do you need to do to provide additional browser security (e.g., implement Extended Validation)?
* How will you direct users in the event of errors?

Auth0 provides tremendous flexibility when it comes to customizing and configuring Auth0 pages such as [Universal Login](/architecture-scenarios/implementation/b2c/b2c-branding#universal-login-and-login-pages) and [Change Password](/architecture-scenarios/implementation/b2c/b2c-branding#change-password-page-customization). So you can pretty much set up whatever UX look and feel you require. For many, the out-of-the-box experience - with perhaps a little alteration - is all that's required. However, for others the value of their brand and brand awareness requires more extensive customization. This flexibility extends to not only Auth0 pages, but via extensibility can also be applied to the [email templates](/architecture-scenarios/implementation/b2c/b2c-branding#email-template-customization). Auth0 [Custom Domain](/architecture-scenarios/implementation/b2c/b2c-branding#custom-domain-naming) functionality further enhances consumer awareness by providing users with the confidence and peace of mind when it comes to safety and security. 

While Auth0 provides for default information when it comes to error situations, out-of-the-box information can be somewhat cryptic as the context that can only be provided by you is missing. Auth0 [error page customization](/architecture-scenarios/implementation/b2c/b2c-branding#error-page-customization) guidance can however help mitigate that by allowing you to provide information of a more context-specific nature via your own support organization. 

::: panel Best Practice
To provide users with helpful resources if they experience problems you should also configure a friendly name and a suitable logo, as well as the support email and support URL for your organization. See [Dashboard Tenant Settings](/dashboard/dashboard-tenant-settings#settings) for further details.
:::

## Universal login and login pages

[Universal Login](/universal-login) is the recommended method for authenticating users, and it centers around use of the Login page. You can customize the Login page via the Dashboard to support your organization's branding requirements [Simple customizations](/universal-login#simple-customization) can be made that include changes to the logo, primary color, or background color, as well as more [advanced customizations](/universal-login#advanced-customization) that require you to directly modify the script powering the page itself.

::: panel Best Practice
If you choose to customize Universal Login page script then we strongly recommend that you make use of version control, and deploy to your Auth0 tenant via [deployment automation](/architecture-scenarios/implementation/b2c/b2c-deployment) or one of the [alternative strategies](/universal-login/version-control).
:::

Auth0 widgets, such as Lock (https://auth0.com/lock), integrate seamlessly with Universal Login to provide out-of-box support for user login and sign up; Lock also has built-in support for multiple languages which can be leveraged to satisfy the requirements of an [international audience](/libraries/lock/v11/i18n). Alternatively the Auth0 JavaScript SDK (/libraries/auth0js) can be utilized when providing for a fully customized UX, using technologies such as React or Angular.  

::: warning
[Universal Login advanced customization](/universal-login#advanced-customization) allows you to modify page script for greater customization flexibility. However you will be responsible for maintaining the page thereafter, including updating the version of any Auth0 widget - such as Lock - or Auth0 SDK used. You should also exercise caution regarding the use of third-party JavaScript on your Login Page, since sensitive security-related information often flows through the page and the introduction of cross-site scripting ([XSS](/security/common-threats#cross-site-request-forgery)) vulnerabilities is of particular concern.
:::

## Change password page customization

The Change Password page is used whenever a user takes advantage of the [password reset](/universal-login/password-reset) functionality and, as with the login page, you can customize the [Change Password](/universal-login/password-reset#edit-the-password-reset-page) page to reflect your organization's branding. 

## Error page customization

If there are issues encountered during user interactive workflow (e.g. user sign up or login), Auth0 provides error messages that indicate what the problem is under the hood. The default messages are somewhat cryptic, especially to the end user, since they will likely be missing context that only you can supply. As such, we recommend [customizing your error pages](/universal-login/custom-error-pages) to provide the missing context-specific information directly to your users. Furthermore, customizing your error pages allows you to display your branding, not Auth0's, as well as provide useful information to your users as to what should be done next. This information might include a link to a FAQ or how to get in touch with your company's support team or help desk.

::: panel Best Practice
Out-of-the-box there is no user interface for customizing Auth0 provided error pages, but you can use the [Tenant Settings endpoint of the Management API](/api/management/v2#!/Tenants/patch_settings) to configure them. Alternatively, if you can create and host your own error page, then you can have Auth0 direct users to that page instead of using the Auth0-hosted option. 
:::

## Custom domain naming

By default, the URL associated with your tenant will include its name and possibly a region-specific identifier. For example, tenants based in the US have the a URL similar to `https://example.auth0.com` while those based in Europe have something that is of the fashion `https://example.eu.auth0.com`. A [Custom Domain](/custom-domains) offers a way of providing your users with a consistent experience by using a name that’s consistent with your organization's brand.

::: warning
Only one custom Domain Name can be applied per Auth0 Tenant, so if you absolutely must have independent domain name branding then you will require an [architecture](/architecture-scenarios/implementation/b2c/b2c-architecture) where multiple Auth0 Tenants are deployed to production.
:::

In addition, Custom Domain functionality offers you complete control over the [certificate management](/custom-domains#certificate-management) process. By default, Auth0 provides standard SSL certificates, but if you configure a custom domain, you can use Extra Validation (EV) SSL certificates or similar to provide the visual, browser-based cues that offer your visitors additional peace of mind.

In general, we see customers having the most success when they use a centralized domain for authentication - this is especially the case if the company offers multiple products or service brands. By using a centralized domain, you can provide end users with a consistent user experience while also minimizing the need to maintain multiple production tenants in Auth0.

## Email template customization

Auth0 makes extensive use of email to provide both user notifications and to drive the functionality needed for secure identity management (for example, email verification, account recovery, and brute force protections), and Auth0 provides a number of templates for these.

::: note
Before customizing email templates, please set up your [Email Provider](/architecture-scenarios/implementation/b2c/b2c-operations#email-provider-setup).
:::

Out of the box, the email templates used contain standard verbiage and Auth0 branding. However, you can configure almost every aspect of these templates to reflect the verbiage and user experience you want and make changes to things like the preferred language, accessibility options, and so forth.

Email templates are customized using [Liquid syntax](/email/liquid-syntax). If you are interested in customizing your templates based on user preferences, you will also have access to the [metadata](/users/concepts/overview-user-metadata) located in users' profiles, as well as any specific application metadata too. 

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)

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

You can customize Auth0 with a look and feel that aligns with your organization's brand requirements and user expectations. The consistency in appearance improves your customer's experience, giving them peace of mind that the pages they're using can be trusted and are secure.

Some of the items that you can brand include:

* Login, Change Password, and Error pages
* Custom domains
* Email templates

Auth0 also supports [internationalization (I18N)](/i18n) and localization (L10N), both of which are important if you work with an international clientele.

## Design considerations

For some users, the out-of-box experience -- perhaps with just a touch of alteration -- is more than sufficient. However, for those wanting more control over appearance and user experience, Auth0 provides extensive flexibility when it comes to customizing and configuring the user experience look and feel you need.

When considering the items you want to brand, as well as how best to brand these items, you'll want to consider the following.

* Will you brand your login page?
* Will you need to localize your login page?
* Will you customize emails so that they're not just branded, but vary based on user preference?
* How will users know that they're still on your domain when they see your login page?
* What do you need to do to provide additional browser security (e.g., implement Extended Validation)?
* How will you direct users in the event of errors?

The answers to these questions and more are detailed in the [Universal login and login pages](#universal-login-and-login-pages), [Custom domains](#custom-domains), and [Email templates](#email-templates) sections below. 

### Universal login and login pages

The [Universal Login](/universal-login) process is the recommended method for authenticating users, and it centers around the Login Page. You can customize the Login Page via the Dashboard to support your organization's branding requirements. You can make [simple changes](/universal-login#simple-customization) that include changes to the logo, primary color, or background color, or you can make more [advanced changes](/universal-login#advanced-customization) that require you to directly modify the script powering the page itself.

If you opt to customize the Login Page script, we strongly recommend that you:

* [Use version control](/universal-login/version-control) to maintain prior versions
* Deploy changes to your script via automated deployments

Once modified, you are responsible for maintaining the script powering your Login Page, including updating the versions of any links to any Auth0 collateral used (such as the Lock widget or JavaScript SDK).

::: warning
Exercise caution regarding the use of third-party JavaScript on your Login Page, since sensitive security-related information often flows through the page and the introduction of cross-site scripting (XSS) vulnerabilities is of particular concern.
:::

The Login Page comes with [multi-language support](/libraries/lock/v11/i18n) provided by default. In our experience, almost all applications need internationalization/localization, and while it is fairly simple to add during the development phases, it can become difficult at a later stage. As such, we recommend, at the very least, accounting for this need if you do not implement either feature during this phase.

#### Custom login pages

For those who want to build and use a fully-customized user interface using technologies like React or Angular.js, the Auth0 JavaScript SDK ([auth0js](/libraries/auth0js) allows you to add Auth0 functionality to your custom login page.

### Change password

The Change Password page is used whenever a user takes advantage of the [password reset](/universal-login/password-reset) functionality. Like the login page, you can customize the Change Password page to reflect your organization's branding. 

### Errors

If there are issues with user sign up or login, Auth0 provides error messages that indicate what the problem is under the hood. The default messages are somewhat cryptic, especially to the end user, since they will likely be missing context that only you can supply. As such, we recommend customizing your error pages to provide the missing context-specific information directly to your users.

Furthermore, customizing your error pages allows you to display your branding, not Auth0's, as well as provide useful information to your users as to what should be done next. This information might include a link to a FAQ or how to get in touch with your company's support team or help desk.

At the minimum, we recommend that you provide your visitors with:

* Visual indicators like a friendly-name and your logo for display
* An email address and URL for your organization's Support team

Out-of-the-box there is no user interface for customizing your error pages, but you can use the [Tenant Settings endpoint of the Management API](/api/management/v2#!/Tenants/patch_settings) to configure them. Alternatively, if you can create and host your error page then you can have Auth0 direct users to that page instead of using the Auth0-hosted option. 

### Custom domains

By default, the URL associated with your tenant will include its name and possibly a region-specific identifier. For example, tenants based in the US have the URL **example.auth0.com** while those based in Europe have **example.eu.auth0.com**.

If you want to use a name that is consistent with your company's brand, you can configure a [custom domain](/custom-domains). Each tenant can support one custom domain name.

Moreover, the custom domain functionality offers you complete control over the [certificate management](/custom-domains#certificate-management) process. By default, Auth0 provides standard SSL certificates, but if you configure a custom domain, you can use Extra Validation (EV) SSL certificates or similar to provide the visual, browser-based cues that offer your visitors additional peace of mind.

In general, we see customers having the most success when they use a centralized domain for authentication -- this is especially the case if the company offers multiple products or service brands. By using a centralized domain, you can provide end users with a consistent user experience while also minimizing the need to maintain multiple production tenants in Auth0.

### Email templates

::: note
Before customizing email templates, please set up your [Email Provider](/email/providers).
:::

Auth0 makes extensive use of email to provide both user notifications and to drive the functionality needed for secure identity management (for example, email verification, account recovery, and brute force protections).

Out of the box, the email templates used contain standard verbiage and Auth0 branding. However, you can configure almost every aspect of these templates to reflect the verbiage and user experience you want and make changes to things like the preferred language, accessibility options, and so forth.

Email templates are customized using [Liquid syntax](/email/liquid-syntax). If you are interested in customizing your templates based on user preferences, you will also have access to the [metadata](/user/concepts/overview-user-metadata) located in users' profiles, as well as any specific application metadata too. 

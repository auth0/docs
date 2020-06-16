---
description: New Universal Login UI Customization
topics:
  - login
  - universal-login
  - customization
  - hosted-pages
contentType: how-to
toc: true
useCase: customize-hosted-pages
---
# New Universal Login UI Customization

## Simple Customization

![Customization Settings for Login Page](/media/articles/universal-login/settings.png)

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Universal Login](${manage_url}/#/login_setting) and looking at the Settings tab.

The settings available here are:

* Logo (recommended size: 150 x 150 pixels)
* Primary Color
* Background Color

You can also configure the favicon URL and a custom font URL using [the Branding API](/api/management/v2#!/Branding). 

## Page Templates

You can further the New <dfn data-key="universal-login">Universal Login</dfn> pages by providing a Page Template using the [Liquid template language](https://shopify.github.io/liquid/). Learn more in the [Page Template documentation](/universal-login/page-templates).

## Combining New Universal Login and Classic Universal Login

Given the Classic Universal Login experience is still more flexible than the New Universal Login experience, you could want to combine pages from both flows. 

For example, if you want to implement Passwordless with MFA, you can use the 'Classic' login page for Passwordless and the 'New' MFA page for MFA, you can do so as follows:

1. Enable the New Universal Login Experience.
1. Customize the HTML page of the Login page with whatever content you want, for example, the `Auth0LockPasswordless` widget. 

In this case, users will get a customized Classic behavior login page that allows them to log in via a passwordless connection, but will get the MFA page that looks like the New Universal Login page.

Check the [Classic Universal Login customization documentation](/universal-login/customization-classic) to learn more.

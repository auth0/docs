---
description: Overview of advanced customization of the login page for the Universal Login classic experience.
topics:
  - login
  - universal-login
  - customization
  - hosted-pages
contentType: how-to
toc: true
useCase: customize-hosted-pages
---
# Auth0 Universal Login - Advanced Customization

![Login Page](/media/articles/universal-login/login.png)
	
In addition to the simple settings that are set in the Dashboard, such as logo and colors, when using the **Classic Experience**, the actual code of the page may be altered and added to. The Universal Login page works for many use cases without customizing its code, but if the customization toggle is enabled, you are able to modify the page at will.

::: panel-warning Responsibility for Updates
When the customization toggle is flipped on, you then become responsible for updates and maintenance of the script, as it can no longer be automatically updated by Auth0. This includes updating the version numbers for any included Auth0 SDK or widget.

If you have enabled customization to inspect the page code, and then decide **not** to customize your login page, you should make sure to disable the **Customize Login Page** toggle, to allow your page to receive the updates it might need from Auth0.
:::

## Choose a template to begin

If you intend to perform advanced customization to the content of the login page, you'll first want to choose the template that you would like to start from. You will find these templates in a dropdown just above the code editor for the login page, if you have toggled customization on. 

The templates use the libraries linked below to provide the login experience for the end-user. Feel free to read the documentation for each library below, to better understand how they can be customized for your needs. 

::: note
These libraries can be used within the Universal Login page, but they can also be embedded directly into an application. While in this case we are discussing using them as part of the Universal Login flow, if you read their documentation, you will notice both use cases being explained.
:::

- [Lock](/libraries/lock) - Lock is a pre-built, customizable login widget that will allow your users to quickly and easily login to your application.
- [Lock (Passwordless Mode)](/libraries/lock/v11#passwordless) - Lock in Passwordless Mode uses the same Lock interface, but rather than offering identity providers as login options, will simply ask the user to enter an email or SMS number to begin a passwordless authentication transaction.
- [Auth0.js](/libraries/auth0js) - Auth0.js is the SDK used for interacting with the Auth0 [authentication API](/api/authentication). Primarily, you would use the SDK if you need to build your own custom login UI, or implement more complex functionality than simply allowing your users to login. 

## Modify the code of the login page

If you are using the default login page and just wish to modify it a bit further than the simple customization options allow, you may want to take a look at the [Lock Configuration Guide](/libraries/lock/v11/configuration) for help configuring the Lock widget which is used in the page.

If you intend to significantly change the page, you may wish to use the Auth0.js template instead. You can use the example in the template as a guideline for how to get the values and information you need into the login page, and how to use the SDK, and do the styling and layout in whatever manner you wish. You may perform whatever CSS customizations that you like, as long as they are included in this one file, as there is no option to host a separate CSS file on your Auth0 tenant.
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

In addition to the simple settings that are set in the Dashboard, such as logo and colors, the actual code of some <dfn data-key="universal-login">Universal Login</dfn> pages may be altered and added to. You can customize the HTML code for Login, Password Reset and MFA pages.

Note that if you use the New Universal Login experience and decide to customize the login page using <dfn data-key="lock">Lock</dfn>, it will not have the same look and feel by default. The login page will look similar to the Classic Universal Login experience and the rest of the pages will look like the New Universal Login experience. Given that the New Experience still does not have feature parity with the Classic one, this provides a way to mix both approaches (e.g. customizing the Login page so you can use <dfn data-key="passwordless">Passwordless</dfn> or Home Realm Discovery with the Lock widget, but use the MFA page from the New Experience to support multiple factors).

![Login Page](/media/articles/universal-login/login.png)

::: panel-warning Responsibility for Updates
When the customization toggle is flipped on, you then become responsible for updates and maintenance of the pages, as it can no longer be automatically updated by Auth0. This includes updating the version numbers for any included Auth0 SDK or widget.

If you have enabled customization to inspect the page code, and then decide **not** to customize your login page, you should make sure to disable the **Customize Login Page** toggle, so Auth0 will render the default pages.
:::

## Login

### Choose a template to begin

If you intend to perform advanced customization to the content of the login page, you'll first want to choose the template that you would like to start from. You will find these templates in a dropdown just above the code editor for the login page, if you have toggled customization on. 

The templates use the libraries linked below to provide the login experience for the end-user. Feel free to read the documentation for each library below, to better understand how they can be customized for your needs. 

::: note
These libraries can be used within the Universal Login page, but they can also be embedded directly into an application. While in this case we are discussing using them as part of the Universal Login flow, if you read their documentation, you will notice both use cases being explained.
:::

- [Lock](/libraries/lock) - Lock is a pre-built, customizable login widget that will allow your users to quickly and easily login to your application.
- [Lock (Passwordless Mode)](/libraries/lock/v11#passwordless) - Lock in Passwordless Mode uses the same Lock interface, but rather than offering identity providers as login options, will simply ask the user to enter an email or SMS number to begin a passwordless authentication transaction.
- [Auth0.js](/libraries/auth0js) - Auth0.js is the SDK used for interacting with the Auth0 [authentication API](/api/authentication). Primarily, you would use the SDK if you need to build your own custom login UI, or implement more complex functionality than simply allowing your users to login. 


### Modify the code of the login page

If you are using the default login page and just wish to modify it a bit further than the Simple Customization options allow, you may want to modify the behavior of the Lock widget used on the Universal Login page. The Lock widget can be configured to behave or appear in many ways, including the following:

- Show the user the signup page by default instead of the login page
- Have different colors, text, or languages shown by default on the login widget
- Show specific connections only

To learn more about how to do these, and many other customizations, take a look at the [Lock Configuration Guide](/libraries/lock/v11/configuration) for help configuring the Lock widget which is used in the page.

If you intend to significantly change the page's appearance, you may wish to use the Custom Login Form template instead of the Lock template. You can use the example in the Custom Login Form template as a guideline that shows you how to get the values and information you need into the login page and how to use the Auth0.js SDK to do so, then do the styling and layout in whatever manner you wish. You may perform whatever CSS customizations that you like, as long as they are included in this one file, as there is no option to host a separate CSS file on your Auth0 tenant.

## Other facets of Universal Login

Auth0 offers you the ability to customize and display several other pages containing Auth0-related functionality and to which Auth0 redirects your users during the authorization process, beyond just the login page described above. You can modify the following types of pages from your [Dashboard](${manage_url}):

* [Customize Hosted Password Reset Page](/universal-login/password-reset)
* [Multi-factor Authentication Page](/universal-login/multifactor-authentication)
* [Error Pages](/universal-login/error-pages)

While Auth0 hosts these custom pages, you can still [manage your pages using the version control system of your choice](/universal-login/version-control).

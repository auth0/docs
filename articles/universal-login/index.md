---
description: Overview of Universal Login with Auth0
topics:
  - login
  - universal-login
  - password-reset
  - guardian
  - mfa
  - error-pages
  - hosted-pages
contentType: index
toc: true
useCase: customize-hosted-pages
---
# Auth0 Universal Login

Auth0's Universal Login is the most secure way to authenticate users for your applications. Universal Login centers around your Auth0 login page. The login page appearance and behavior is customizable right from the [Dashboard](${manage_url}). By default, the login page internally uses Auth0's [Lock Widget](/libraries/lock) to authenticate your users, but the code of the login page can be customized to replace the standard Lock widget with the Lock (Passwordless Mode) widget, or an entirely custom UI can be built in its place, using the [Auth0.js SDK](/libraries/auth0js) for authentication.

In the Universal Login flow, the user will click a login button or link in your application, which will call the `/authorize` endpoint at Auth0. If there is no session detected for the end user, Auth0 will redirect them to the login page, where they will be able to login or signup using the connections you configure, such as databases or social connections. Once the user is authenticated (or if they were already signed in) the login page will redirect them to your application, along with the requisite credentials.

::: note
If the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the login page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.
:::

For information on the diffences between Universal Login and traditional embedded login within your application, see [our comparison guide](/guides/login/universal-vs-embedded).

## Implementing Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to set up a connection(s) and set up your application in Auth0's dashboard. You will also need to configure your application's code to call Auth0's `/authorize` endpoint in order to trigger Universal Login, and then to deal with the response.

For step by step instructions on setting up your application to use Universal Login, check out our [Quickstart guides](/docs/quickstart).

### Simple Customization

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Hosted Pages](${manage_url}/#/login_page) and looking at the tab for the Login Page.

The settings available here are:

* Logo
* Primary Color
* Background Color

These settings, once changed, will take effect on your login page if you have not enabled customization of the login page code, or if you have enabled customization but are using the predefined templates and have not changed those options in the code.

### Advanced Customization

In addition to the settings above, the actual code of the page may be altered and added to. The login page works for many use cases without customizing its code, but if the customization toggle is enabled, you are able to modify it at will. Any configuration or customization changes made to the login page will affect the entire tenant, not just a single application on that tenant.

When the customization toggle is flipped on, you then become responsible for updates and maintenance of the script, as it can no longer be automatically updated by Auth0. This includes updating the version numbers for any included scripts, such as Lock or Auth0.js.

::: note
If you have enabled customization to inspect the page code, and then decide **not** to customize your login page, you should make sure to disable the **Customize Login Page** toggle, to allow your page to receive the updates it might need from Auth0.
:::

#### Choose a template to begin

If you intend to customize the login page, you'll first want to choose the template for the technology that you'd like to use to power it. You will find these templates in a dropdown just above the code editor for the login page, if you have toggled customization on. 

Click one of the links below to get started. If you do not intend to customize your login page, it will use the default experience, which incorporates the Lock widget, and you may skip this step.

- [Lock](/hosted-pages/login/lock) - Lock is a pre-built, customizable login widget that will allow your users to quickly and easily login to your application.
- [Lock (Passwordless Mode)](/hosted-pages/login/lock-passwordless) - Lock in Passwordless Mode uses the same Lock interface, but rather than offering identity providers as login options, will simply ask the user to enter an email or SMS number to begin a passwordless authentication transaction.
- [Auth0.js](/hosted-pages/login/auth0js) - Auth0.js is the SDK used for interacting with the Auth0 [authentication API](/api/authentication). Primarily, you would use the SDK if you need to build your own custom login UI, or implement more complex functionality than simply allowing your users to login. 

#### Modify the code of the login page

If you intend to customize the login page, once you have chosen a template, you may use it as a guide. If you are using Lock or Auth0.js in your login page, you may look at the [Lock Configuration Guide](/libraries/lock/v11/configuration) or the [Auth0.js documentation](/libraries/auth0js/v9).

You may perform whatever CSS customizations that you like, as long as they are included in this one file.

## Other facets of Universal Login

Auth0 offers you the ability to customize and display several pages containing Auth0-related functionality and to which Auth0 redirects your users during the authorization process, other than just the login page. You can modify the following types of pages from your [Dashboard](${manage_url}):

* [Login Page](#auth0-universal-login)
* [Password Reset Page](/universal-login/password-reset)
* [Guardian Multi-factor Page](/universal-login/guardian)
* [Error Pages](/universal-login/error-pages)

While Auth0 hosts these custom pages, you can still [manage your pages using the version control system of your choice](/universal-login/version-control).

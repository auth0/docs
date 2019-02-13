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

Auth0's Universal Login is the most secure way to authenticate users for your applications. Universal Login centers around your Auth0 login page. The login page appearance and behavior is customizable right from the [Dashboard](${manage_url}). 

In the Universal Login flow, the user will click a login button or link in your application, which will redirect to the `/authorize` route at the Auth0. If there is no session detected for the end user, Auth0 will redirect them to the login page, where they will be able to login or signup using the connections you configure, such as databases or social connections. Once the user is authenticated (or if they were already signed in) Auth0 will redirect them to your application, along with the requisite credentials.

::: note
If the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the login page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.
:::

For information on the differences between Universal Login and traditional embedded login within your application, see [our comparison guide](/guides/login/universal-vs-embedded).

## Implementing Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to set up a connection(s) and set up your application in Auth0's dashboard. You will also need to configure your application's code to call Auth0's `/authorize` endpoint in order to trigger Universal Login, and then to deal with the response.

For step by step instructions on setting up your application to use Universal Login, check out our [Quickstart guides](/docs/quickstart).


### Customization

![Login Page](/media/articles/universal-login/login.png)
	
You can customize the login pages by altering the actual code of the pages. The Universal Login pages work for many use cases without customizing their code, but if the customization toggle is enabled, you are able to modify each page at will.

When the customization toggle is flipped on, you then become responsible for updates and maintenance of the script, as it can no longer be automatically updated by Auth0. This includes updating the version numbers for any included Auth0 SDK or widget.

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

Auth0 offers you the ability to customize and display several other pages containing Auth0-related functionality and to which Auth0 redirects your users during the authorization process, beyond just the login page described above. You can modify the following types of pages from your [Dashboard](${manage_url}):

* [Password Reset Page](/universal-login/password-reset)
* [Guardian Multi-factor Page](/universal-login/guardian)
* [Error Pages](/universal-login/error-pages)

While Auth0 hosts these custom pages, you can still [manage your pages using the version control system of your choice](/universal-login/version-control).

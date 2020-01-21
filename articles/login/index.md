---
description: Overview of Universal Login with Auth0
topics:
  - login
  - universal-login
  - password-reset
  - mfa
  - error-pages
  - hosted-pages
contentType: index
toc: true
useCase: customize-hosted-pages
---
# Login with Auth0

Auth0 provides two ways to implement authentication for your applications: 

* Universal Login: users log in to your application through a page hosted by Auth0.
* Embedded Login: users log in to your application through a page you host.

For the vast majority use cases, we recommend Universal Login. It's safe and easy to implement. Check out [our comparison guide](/guides/login/universal-vs-embedded) for more on the differences between Universal Login and Embedded Login within your application.

## Universal Login

Universal Login is Auth0's implementation of the login flow, which is the key feature of an Authorization Server. With Universal Login, users are redirected from your application to a login page hosted by Auth0. Auth0 then authenticates the user and returns them to your application. Since login and authentication take place on the same domain, credentials are not sent across origins, increasing security and protecting against attacks such as phishing and man-in-the-middle.

Universal Login functionality and features are driven from web pages served by Auth0, so you can adjust the login experience in real-time without changing your application code. Universal Login page appearance and behavior is customizable right from the [Dashboard](${manage_url}).

### Classic or New?

There are two versions of Universal Login:

* Classic Universal Login: Auth0 hosted pages built with [Lock.js](/libraries/lock) and other Javascript widgets, or with a library like [Auth0.js](/libraries/auth0js). HTML and CSS can also be customized.
* New Universal Login: Auth0 hosted pages, rendered server-side, that do not use [Lock.js](/libraries/lock) or other Javascript widgets and libraries. Can only be customized based on the configuration available. HTML, CSS, and JS cannot be customized.

In the [Dashboard](${manage_url}), the dialog shown below lets you select which Experience will be used for default, non-customized pages:

![Login Page](/media/articles/universal-login/experience-picker.png)

To learn more about each experience and their differences, check out the following articles:

* [Classic Universal Login Experience](/universal-login/classic) 
* [New Universal Login Experience](/universal-login/new)
* [New Universal Login Limitations](/universal-login/new-experience-limitations)

### Implementing Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to complete a few other steps:

1. Set up a connection(s) in the [Dashboard](${manage_url}) (Choose **Connections** in the Dashboard's sidebar, then choose a type and pick one to configure, such as a database or a social login provider). 
1. Set up your application in the [Dashboard](${manage_url}/#/applications). 
1. Configure your application's code to call Auth0's [`/authorize`](/api/authentication#login) endpoint in order to trigger Universal Login, and then to deal with the response. You can either do this directly or use one of our SDKs to make the process easier.

For step by step instructions on setting up your application to use Universal Login, check out our [Quickstart guides](/quickstarts).

### Simple Customization

![Customization Settings for Login Page](/media/articles/universal-login/settings.png)

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Universal Login](${manage_url}/#/login_setting) and looking at the Settings tab.

The settings available here are:

* Logo
* Primary Color
* Background Color

These settings, once changed, will take effect on all your Universal Login pages if you have not enabled customization of the pages' code. The settings will also work if you have enabled customization but are using the predefined templates and have not changed those options in the code.

If you select the New Universal Login Experience, you can also configure the favicon URL and a custom font URL using [the Branding API](/api/management/v2#!/Branding).

## Embedded Login

Embedded Login refers to implementations where users log in on a page hosted by your application, and credentials are sent to Auth0. There are security concerns with this approach since login and authentication take place on the different domains. If you need to implement Embedded Login, you need to have a [custom domain](/custom-domains) set up, so that this can be mitigated. You can then use one of our libraries (Such as the [Lock Widget](/libraries/lock) or [auth0.js SDK](/libraries/auth0js)) to implement login in your application, or do it via our [API](/api/authentication).

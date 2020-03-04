---
title: Cross-Origin Authentication
description: An explanation of cross-origin authentication in Auth0 and its compatibility with browsers.
topics:
  - cors
contentType:
    - index
    - concept
useCase: 
  - strategize
---
# Cross-Origin Authentication

Auth0 strongly recommends that authentication transactions be handled via [Universal Login](/hosted-pages/login). Doing so offers [the easiest and most secure way to authenticate users](guides/login/universal-vs-embedded). However, some situations may require that authentication forms be directly embedded in an application. Although not recommended, cross-origin authentication provides a way to do this.

## What is cross-origin authentication?

When authentication requests are made from your application (via the Lock widget or a custom login form) to Auth0, the user's credentials are sent to a domain which differs from the one that serves your application. Collecting user credentials in an application served from one origin and then sending them to another origin can present certain security vulnerabilities, including the possibility of a phishing attack.

Auth0 provides a cross-origin authentication flow which makes use of [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies). The use of third-party cookies allows Lock and Auth0's backend to perform the necessary checks to allow for secure authentication transactions across different origins. This helps to prevent phishing when creating a <dfn data-key="single-sign-on">Single Sign-on</dfn> experience with the Lock widget or a custom login form in your application and it also helps to create a secure login experience even if SSO is not the goal.

::: note
Cross-origin authentication is not recommended and is only necessary when authenticating against a directory using a username and password. Social IdPs and enterprise federation use a different mechanism, redirecting via standard protocols like OpenID Connect and <dfn data-key="security-assertion-markup-language">SAML</dfn>. Additionally, cross-origin authentication is only applicable to embedded login on the web (using Lock or auth0.js). Native applications using embedded login make use of the standard OAuth 2.0 token endpoint.
:::

## Limitations

Because cross-origin authentication is achieved using third-party cookies, disabling third-party cookies will make cross-origin authentication fail. Some browsers, such as the newest version of Firefox, disable third-party cookies by default, meaning that cross-origin authentication will not work for users on Firefox. The only way to make embedded login work for Firefox users is to use a custom domain, as described below.

There are two approaches you can follow to remediate the issue:

- Enable a [Custom Domain](/custom-domains) on your tenant and host your web application in a domain that has the same top-level domain as your Auth0 custom domain. For example, you host an application at `https://northwind.com` and set your Auth0 custom domain as `https://login.northwind.com`. This way the cookies are no longer third-party (because both your Auth0 tenant and your application are using the same top-level domain), and thus, are not blocked by browsers.
- Provide a [cross-origin verification page](#create-a-cross-origin-verification-page) that will make cross-origin authentication work in a **limited number of browsers** even with third-party cookies disabled (see the [browser testing information](#browser-testing-support) below).

These issues are another reason why the more practical solution is to use [Universal Login](/hosted-pages/login).

## Configure your application for cross-origin authentication

Configuring your application for cross-origin authentication is a process that requires a few steps:

1. Ensure that the **Allowed Web Origins** field in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) is set to the domain making the request. Note that the URLs specified for Allowed Web Origins **cannot** contain wildcards or relative paths after the domain.
1. Ensure that your application is using [Lock](/libraries/lock) 11 or higher, or [Auth0.js](/libraries/auth0js) version 9 or higher.
1. If you don't enable [Custom Domains](/custom-domains), you will need to create a page which uses auth0.js to act as a fallback for the cross-origin transaction. More information on setting up this page is provided below.

## Create a cross-origin verification page

There are some cases when third-party cookies will not be available. Certain browser versions do not support third party cookies and, if they do, there will be times that they will be disabled in a user's settings. You can use auth0.js in your application on a dedicated page to properly handle cases when third-party cookies are disabled. **This page must be served over SSL**.

Using `crossOriginVerification` as a fallback will only work if the browser is on the support matrix as **Yes** under **Third-Party Cookies Disabled**. For some browsers, such as **Chrome**, **Opera**, and **Safari**, when third-party cookies are disabled, cross-origin authentication will not work at all unless you enable [Custom Domains](/custom-domains).

::: note
**Safari's** configuration is labeled as "Prevent cross-site tracking" and uses [Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/). Unfortunately, this also prevents third-party cookies from being useful in authentication scenarios. Here's an example of how it affects [token renewal](/api-auth/token-renewal-in-safari).
:::

Provide a page in your application which instantiates `WebAuth` from [auth0.js](/libraries/auth0js). Call `crossOriginVerification` immediately. The name of the page is at your discretion.

```html
<!-- callback-cross-auth.html -->

<head>
  <script src="${auth0js_url}"></script>
  <script type="text/javascript">
    var auth0Client = new auth0.WebAuth({
      clientID: '${account.clientId}',
      domain: '${account.namespace}'
    });
    auth0Client.crossOriginVerification();
  </script>
</head>
```

When third party cookies are not available, auth0.js renders an `iframe` to call a different cross-origin verification flow.

Add the URL of this callback page to the **Cross-Origin Verification Fallback** field in your Application's settings in the [Dashboard](${manage_url}), under the **Advanced > OAuth** panel.

For production environments, verify that the Location URL for the page does not point to localhost.

::: note
See the [cross-origin auth sample](https://github.com/auth0/lock/blob/master/support/callback-cross-auth.html) for more information.
:::

<%= include('../_includes/_co_authenticate_errors', { library : 'Auth0.js v9 (and Lock v11)'}) %>

## Browser testing support

The following browsers can use cross-origin authentication when third-party cookies are disabled:

* Microsoft Internet Explorer
* Microsoft Edge

<%= include('../_includes/_samesite_none') %>

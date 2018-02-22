---
toc: true
title: Cross-Origin Authentication
description: An explanation of cross-origin authentication in Auth0 and its compatibility with browsers
---
# Cross-Origin Authentication

For most situations, Auth0 recommends that authentication transactions be handled at the [Hosted Login Page](/hosted-pages/login). Doing so offers [the easiest and most secure way to authenticate users](guides/login/centralized-vs-embedded). However, it is understood that some situations may require that authentication forms be directly embedded in an application. Cross-origin authentication provides a way to do this securely.

## What is Cross-Origin Authentication? 

When authentication requests are made from your application (via the Lock widget or a custom login form) to Auth0, the user's credentials are sent to a domain which differs from the one that serves your application. Collecting user credentials in an application served from one origin and then sending them to another origin can present certain security vulnerabilities, including the possibility of a phishing attack. 

Auth0 provides a [cross-origin authentication flow](https://raw.githubusercontent.com/jaredhanson/draft-openid-connect-cross-origin-authentication/master/Draft-1.0.txt) which makes use of [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies). The use of third-party cookies allows Lock and Auth0's backend to perform the necessary checks to allow for secure authentication transactions across different origins. This helps to prevent phishing when creating a single sign-on experience with the Lock widget or a custom login form in your application and it also helps to create a secure login experience even if single sign-on is not the goal.

::: note
Cross-origin authentication is only necessary when authenticating against a directory using a username and password. Social IdPs and enterprise federation use a different mechanism, redirecting via standard protocols like OpenID Connect and SAML. Additionally, cross-origin authentication is only applicable to embedded login on the web (using Lock or auth0.js). Native applications using embedded login make use of the standard OAuth 2.0 token endpoint.
:::

## Limitations of Cross-Origin Authentication

Because cross-origin authentication is achieved using third-party cookies, disabling third-party cookies will make cross-origin authentication fail. 

There are two approaches you can follow to remediate the issue:
- Enable [Custom Domains](/custom-domains) and host your web application in a domain that has the same top level domain as the Auth0 custom domain. This way the cookies are no longer third-party and are not blocked by browsers.
- Provide a [Cross-Origin fallback page](#create-a-cross-origin-fallback-page) that will make cross-origin authentication work **in some browsers** even with third-party cookies disabled (see the [browser testing matrix](#browser-testing-matrix) below).

Additionally, cross-origin authentication is only enabled for [first-party clients](/clients/client-types#first-party-client).

These issues are another reason why the more practical solution is to use the [Hosted Login Page](/hosted-pages/login).

## Configure Your Client for Cross-Origin Authentication

Configuring your client for cross-origin authentication is a process that requires a few steps:

1. Ensure that the **Allowed Web Origins** field is set to the domain making the request. You can find this field in the [Client Settings](${manage_url}/#/clients/${account.clientId}/settings). Please note that the URLs specified for Allowed Web Origins **cannot** contain wildcards.
1. Ensure that your application is using [Lock](/libraries/lock) 11 or higher, or [Auth0.js](/libraries/auth0js) version 9 or higher.
1. If you don't enable [Custom Domains](/custom-domains), you will need to author a page which uses auth0.js to act as a fallback for the cross-origin transaction. More information on setting up this page is provided below.

## Create a Cross-Origin Verification Page

There are some cases when third party cookies will not be available. Certain browser versions do not support third party cookies and, if they do, there will be times that they will be disabled in a user's settings. You can use **auth0.js** in your application on a dedicated page to properly handle cases when third-party cookies are disabled. **This page must be served over SSL**.

::: note
Note that using `crossOriginVerification` as a fallback will only work if the browser is on the support matrix as **Yes** under "Third-Party Cookies Disabled". For some browsers, such as **Chrome** and **Opera** (Desktop & Android versions of both), when third party cookies are disabled, cross-origin authentication will not work at all unless you enable [Custom Domains](/custom-domains).
:::

Provide a page in your application which instantiates `WebAuth` from [auth0.js](/libraries/auth0js). Call `crossOriginVerification` immediately. The name of the page is at your discretion.

```html
<!-- callback-cross-auth.html -->

<head>
  <script src="${auth0js_url}"></script>
  <script type="text/javascript">
    var auth0 = new auth0.WebAuth({
      clientID: '${account.clientId}',
      domain: '${account.namespace}'
    });
    auth0.crossOriginVerification();
  </script>
</head>
```

When third party cookies are not available, **auth0.js** will render an `iframe` which will be used to call a different cross-origin verification flow.

Add the URL of this callback page to the **Cross-Origin Verification Fallback** field in your Client's settings in the [Dashboard](${manage_url}), under the **Advanced > OAuth** panel.

::: note
See the [cross-origin auth sample](https://github.com/auth0/lock/blob/master/support/callback-cross-auth.html) for more detail.
:::

## Browser Testing Matrix

This table lists which browsers can use cross-origin authentication when third-party cookies are disabled.

<!-- markdownlint-disable MD033 -->
<table class="table"> 
  <thead> 
    <tr> 
      <th><strong>OS</strong></th>
      <th><strong>Browser</strong></th>
      <th><strong>Third-Party Cookies Disabled</strong></th> 
    </tr> 
  </thead> 
  <tbody> 
    <tr> 
      <td>Windows</td>
      <td>IE</td>
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Edge</td>
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Chrome</td>
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Opera</td>
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS</td>
      <td>Chrome</td>
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS</td>
      <td>Opera</td>
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td>  
    </tr> 
    <tr> 
      <td>iOS (iPad)</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td>  
    </tr> 
    <tr> 
      <td>iOS (iPad)</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>Android Galaxy S7</td>
      <td>Chrome</td>
      <td class="danger" align="center">No</td> 
    </tr> 
    <tr> 
      <td>Android Galaxy S7</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
    </tr>    
  </tbody> 
</table> 
<!-- markdownlint-enable MD033 -->

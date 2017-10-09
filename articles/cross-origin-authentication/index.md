---
toc: true
title: Cross-Origin Authentication
description: An explanation of cross-origin authentication in Auth0 and its compatibility with browsers
---
# Cross-Origin Authentication

For most situations, Auth0 recommends that authentication transactions be handled at the [Hosted Login Page](/hosted-pages/login). Doing so offers the easiest and most secure way to authenticate users. It is, however, understood that some scenarios necessitate that the Lock widget or a custom login form be directly embedded in an application. Cross-origin authentication provides a way to do this securely.

## What is Cross-Origin Authentication? 

When authentication requests are made from your application (via the Lock widget or a custom login form) to Auth0, the user's credentials are sent to a domain which differs from the one that serves your application. Collecting user credentials in an application served from one origin and then sending them to another origin can present certain security vulnerabilities, including the possibility of a phishing attack. 

Auth0 provides a [cross-origin authentication flow](https://github.com/jaredhanson/draft-openid-connect-cross-origin-authentication/blob/master/Draft-1.0.txt) which makes use of [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies). The use of third-party cookies allows Lock and Auth0's backend to perform the necessary checks to allow for secure authentication transactions across different origins. This helps to prevent phishing when creating a single sign-on experience with the Lock widget or a custom login form in your application and it also helps to create a secure login experience even if single sign-on is not the goal.

## Limitations of Cross-Origin Authentication

Because cross-origin authentication is achieved using third-party cookies, the user must have a browser that supports third-party cookies. Additionally, in some browsers, disabling third-party cookies will make cross-origin authentication fail (see the [browser testing matrix](#browser-testing-matrix) below). 

If you wish to use cross-origin authentication, in order to avoid situations in which your users would be unable to authenticate, you may wish to ask your users to leave third party cookies enabled or to switch browsers. You could also simply inform users of the non-support of those browsers when third party cookies are disabled. 

This limitation is another reason why the more practical solution, where possible, is to use the [Hosted Login Page](/hosted-pages/login) and circumvent this issue entirely.

## Configure Your Client for Cross-Origin Authentication

Configuring your client for cross-origin authentication is a process that requires a few steps:

1. In the [client settings](${manage_url}/#/applications/${account.clientId}/settings) for your application, click **Show Advanced Settings** > **OAuth** and find the **Cross Origin Authentication Mode** switch. Ensure that the switch is in the on position.
1. Also ensure that the **OIDC Conformant** switch is toggled on in the same settings panel. 
  ![Cross-Origin Authentication switch](/media/articles/cross-origin-authentication/cross-origin-switch.png)
1. Ensure that your application is using [Lock](/libraries/lock) version 10.22 or higher, or [Auth0.js](/libraries/auth0js) version 8.7 or higher.
1. If you are using Lock, make sure that you are using the [oidcconformant](/libraries/lock/v10/customization#oidcconformant-boolean-) option.
1. Third-party cookies do not work in some browsers. To handle these cases, you will need to author a page which uses **auth0.js** to act as a fallback for the cross-origin transaction. More information on setting up this page is provided below.

::: note
Using `oidcconformant: true` option in Lock without toggling the **Cross Origin Authentication Mode** on in the client's settings will not work.
:::

## Create a Cross-Origin Fallback Page

There are some cases when third party cookies will not be available. Certain browser versions do not support third party cookies and, if they do, there will be times that they will be disabled in a user's settings. You can use **auth0.js** in your application on a dedicated page to properly handle cases when third-party cookies are disabled. **This page must be served over SSL.**

::: note
Note that using `crossOriginAuthenticationCallback` as a fallback will only work if the browser is on the support matrix as **Yes** under "Third-Party Cookies Disabled" - the browsers which are marked **No** will never work if third party cookies are disabled.
:::

Provide a page in your application which instantiates `WebAuth` from [auth0.js](/libraries/auth0js). Call `crossOriginAuthenticationCallback` immediately. The name of the page is at your discretion.

```html
<!-- callback-cross-auth.html -->

<head>
  <script src="${auth0js_urlv8}"></script>
  <script type="text/javascript">
    var auth0 = new auth0.WebAuth({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
      redirectUri: '${account.callback}'
    });
    auth0.crossOriginAuthenticationCallback();
  </script>
</head>
```

When third party cookies are not available, **auth0.js** will render an `iframe` which will be used to call a different cross-origin verification flow.

::: note
Please see the [cross-origin auth sample](https://github.com/auth0/lock/blob/master/support/callback-cross-auth.html) for more detail.
:::

## Browser Testing Matrix

This table lists which browsers can use cross-origin authentication when third-party cookies are enabled and also when they are disabled.

<!-- markdownlint-disable MD033 -->
<table class="table"> 
  <thead> 
    <tr> 
      <th><strong>OS</strong></th>
      <th><strong>Browser</strong></th>
      <th><strong>Third-Party Cookies Enabled</strong></th>
      <th><strong>Third-Party Cookies Disabled</strong></th> 
    </tr> 
  </thead> 
  <tbody> 
    <tr> 
      <td>Windows</td>
      <td>IE</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Edge</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Opera</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS</td>
      <td>Opera</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td>  
    </tr> 
    <tr> 
      <td>iOS (iPad)</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td>  
    </tr> 
    <tr> 
      <td>iOS (iPad)</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>Android Galaxy S7</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr> 
    <tr> 
      <td>Android Galaxy S7</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>    
  </tbody> 
</table> 
<!-- markdownlint-enable MD033 -->

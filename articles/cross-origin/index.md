---
toc: true
title: Cross-Origin Authentication
description: An explanation of cross-origin authentication in Auth0 and its compatibility with browsers
---
# Cross-Origin Authentication

For most situations, Auth0 recommends that authentication transactions be handled at the [Hosted Login Page](/hosted-pages/login). Doing so offers the easiest and most secure way to authenticate users. It is, however, understood that some scenarios necessitate that the Lock widget or a custom login form be directly embedded in an application. In these cases, cross-origin authentication can be used.

Cross-origin authentication is done by creating security checks using [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies). This helps to prevent phishing when creating an SSO experience using embedded login forms on multiple domains and also helps to create a secure login experience and a way to acquire tokens on those embedded login forms, even if SSO is not the goal.

## Configure Your Client for Cross-Origin Authentication

Enable **Cross Origin Authentication Mode** in the settings for your client.

![Cross-Origin Authentication switch](/media/articles/cross-origin/cross-origin-switch.png)

Third-party cookies do not work in some browsers. To handle these cases, you will need to author a page which uses **auth0.js** to act as a fallback for the cross-origin transaction. More information on setting up this page is provided below.

Provide the URL for a page hosting the above-mentioned fallback. This page must be served over SSL.

![Cross-Origin Authentication switch](/media/articles/cross-origin/cross-origin-https.gif)

## Create a Cross-Origin Fallback Page

There are some cases when third party cookies will not be available. Certain browser versions do not support third party cookies and, if they do, there will be times that they will be disabled in a user's settings.

When third party cookies are not available, **auth0.js** will render an `iframe` which will be used to call a different cross-origin verification flow. Auth0 takes care of most of the details but you need to provide a page which calls the `crossOriginAuthenticationCallback` from **auth0.js**.

Provide a page which instantiates `WebAuth` from **auth0.js**. Call `crossOriginAuthenticationCallback` immediately. The name of the page is at your discretion.

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

When this page is reached, **auth0.js** will process the cross-origin authentication transaction with an alternative flow which provides support for cases when third-party cookies are disabled.

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
      <td>macOS Sierra</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
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
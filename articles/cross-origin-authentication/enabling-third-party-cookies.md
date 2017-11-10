---
title: How to Enable Third-Party Cookies
description: An explanation of how to enable third party cookies in certain web browsers
---
# How to Enable Third-Party Cookies

In order to authenticate securely with applications and websites which use "embedded login" with Auth0, a feature called "third-party cookies" needs to be enabled in your web browser. Third-party cookies are cookies (data) that is saved on your computer by the site you are visiting. In this case, they can be used to help make the authentication process safe and secure.

If you are using Chrome and Opera on desktop or Android devices, signing in via an embedded login form (which uses a technology called [cross-origin authentication](/cross-origin-authentication)) will fail if third-party cookies are disabled in your browser.

If you're reading this document, it's entirely possible that third-party cookies in **your** browser are disabled. Usually, third-party cookies are enabled by default, but if yours are disabled, for whatever reason, you can follow the below instructions to enable them.

## Enable Third-Party Cookies in Chrome

In Chrome, to enable third-party cookies, head to your Chrome Settings, and then click the **Advanced** tab at the bottom.

![Advanced Chrome Settings](/media/articles/cross-origin-authentication/third-party-cookies-chrome-1.png)

Next, click **Content Settings**.

![Advanced Chrome Settings](/media/articles/cross-origin-authentication/third-party-cookies-chrome-2.png)

Then, open up the **Cookies** menu, and uncheck the **Block third-party cookies** option

![Advanced Chrome Settings](/media/articles/cross-origin-authentication/third-party-cookies-chrome-3.png)

## Enable Third-Party Cookies in Opera

In Opera, to enable third-party cookies, open your Opera Settings panel, and click the **Privacy & Security** tab on the left.

![Advanced Chrome Settings](/media/articles/cross-origin-authentication/third-party-cookies-opera.png)

Then, ensure that **Block third-party cookies and site data** is unchecked.
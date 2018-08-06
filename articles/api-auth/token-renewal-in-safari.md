---
description: Issues with token renewal in Safari when ITP is enabled.
topics:
    - safari
    - tokens
    - token-renewal
    - custom-domains
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Renew Tokens When Using Safari

Renewing tokens with the **checkSession()** function does not work correctly with the latest version of the Safari browser.

## Background

Recent versions of the Safari browser introduced a new featured called [Intelligent Tracking Prevention (ITP)](https://webkit.org/blog/8142/intelligent-tracking-prevention-1-1/). ITP is designed to prevent websites from tracking user activity across multiple websites.

By default, ITP is active. You can determine if the Safari version you're using has ITP by going to **Preferences > Privacy** tab and seeing if the **Prevent cross-site tracking** option is checked.

![Safari privacy preferences pane](/media/articles/api-auth/safari-privacy-preferences.png)

## ITP and Browser Behavior

Enabling ITP causes the browser to behave as if you'd disabled third-party cookies in the browser: **checkSession()** is unable to access the current user's session, which makes it impossible to obtain a new token without displaying anything to the user.

This is akin to the way OpenID Connect uses iFrames for handling sessions in single page applications (SPAs). Auth0 is working with [OpenID Connect AB/Connect Working Group](http://openid.net/wg/connect/) to determine if this issue can be addressed at the standards level.

## Solution

There is currently no solution that will work with all use cases.

You can work around the issues posed by ITP by using Auth0s [custom domains](/custom-domains) functionality, particularly if the custom domain lives on a *subdomain* of the application's website domain. For example, if your application is hosted on **example.com**, the custom domain would need to be of the format **subdomain.example.com**.
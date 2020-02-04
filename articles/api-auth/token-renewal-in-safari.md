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

Recent versions of the Safari browser introduced a new featured called [Intelligent Tracking Prevention (ITP)](https://webkit.org/blog/category/privacy/). ITP is designed to prevent websites from tracking user activity across multiple websites.

By default, ITP is active. You can determine if the Safari version you are using has ITP by going to **Preferences > Privacy** tab and seeing if the **Prevent cross-site tracking** option is checked.

![Safari privacy preferences pane](/media/articles/api-auth/safari-privacy-preferences.png)

## ITP and browser behavior

Enabling ITP causes the browser to behave as if you had disabled third-party cookies in the browser: **checkSession()** is unable to access the current user's session, which makes it impossible to obtain a new token without displaying anything to the user.

This is akin to the way <dfn data-key="openid">OpenID Connect (OIDC)</dfn> uses iframes for handling [sessions](/sessions) in single-page applications (SPAs).

## Workaround

There is currently no solution that will work with all use cases.

You can work around the issues posed by ITP by using Auth0's [custom domains](/custom-domains) functionality, particularly if the custom domain lives on a *subdomain* of the application's website domain. For example, if your application is hosted on **example.com**, the custom domain would need to be of the format **subdomain.example.com**.

## ITP debug mode

[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) offers an "Intelligent Tracking Prevention Debug Mode" that you can use to troubleshoot ITP issues. You can find instructions on how to debug ITP on [this blog post from WebKit](https://webkit.org/blog/8387/itp-debug-mode-in-safari-technology-preview-62/).

**NOTE**: The instructions mention how to permanently classify a custom domain as having tracking abilities for testing purposes. In later versions of Safari Technology Preview, though, the domain to store the User Defaults for this setting changed from `com.apple.SafariTechnologyPreview` to `com.apple.WebKit.Networking`. If you are having trouble with the commands mentioned in the instructions, try these:

* Classify a site as having tracking abilities:
```
defaults write com.apple.WebKit.Networking ResourceLoadStatisticsManualPrevalentResource example.com
```

* Inspect the setting:
```
defaults read com.apple.WebKit.Networking ResourceLoadStatisticsManualPrevalentResource
```

* Delete the setting:
```
defaults delete com.apple.WebKit.Networking ResourceLoadStatisticsManualPrevalentResource
```

You will need to restart Safari Technology Preview every time you make changes for the settings to take effect.

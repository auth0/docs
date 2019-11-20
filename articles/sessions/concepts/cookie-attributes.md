---
description: Understand how browser changes, such as the samesite cookie attribute, affects your web applications that embed content from third-party domains. 
topics:
  - saml
  - identity-providers
  - oidc
  - cookies
  - samesite
  - google-chrome
  - microsoft-edge
contentType:
  - concept
useCase:
  - third-party-content
  - use-samesite-cookie-attribute
  - maintain-browser-compatiblity
---
# Cookie Attribute Considerations

Cookies, primarily used for authentication and maintaining sessions, can be secured by setting cookie attributes. [Auth0 cookies](https://auth0.com/privacy#cookie-policy) are secured by setting certain attributes to ensure that *writers note - more needed here*. 

## `SameSite` attribute changes

If you using a web application with sessions (e.g. for saving user preferences, shopping carts, etc.), and you allow users to sign in using identity providers such as Google, Apple or Auth0, then you rely on cookies to achieve that functionality. There are browser cookie behavior changes that may break your user experience. Google Chrome, for example, is going to be the first browser vendor to roll out a change that might not be compatible with your web application.

You may notice that the Google Chrome and Microsoft Edge specs for setting `SameSite` to undefined has changed from `SameSite` defaulting to `none` to `lax` instead. 

As an example, you are building a new UI and have several services that you proxy to via an Auth0 gateway. At this gateway, you create a cookie session. If you make a cross-origin request, you may see this warning in the js console:

``` text
A cookie associated with a cross-site resource (URL) was set without the SameSite attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with SameSite=None and Secure. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032
```

Previously, in Auth0, SameSite attribute options were listed as `true`, `false`, `strict` or `lax`. If you did not set the attribute, the default would be `false`. Now, we have also added the ability for you to set the attribute to `none`.

## Keep reading

* [Web Apps vs Web APIs/Cookies vs Tokens](/design/web-apps-vs-web-apis-cookies-vs-tokens)
* [Cross-Origin Authentication](/cross-origin-authentication)
* [Manage Users](/users)
* [Session Layers](/sessions/concepts/session-layers)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
* [Security](/security)

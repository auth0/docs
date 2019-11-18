---
description: Understand how browser changes, such as the samesite cookie attribute, affects your web applications that embed content from third-party domains. 
topics:
  - saml
  - identity-providers
  - oidc
  - cookies
  - samesite
  - google-chrome
contentType:
  - reference
useCase:
  - third-party-content
  - use-samesite-cookie-attribute
  - maintain-browser-compatiblity
---
# Cookie Attributes Best Practices

If you using a web application with sessions (e.g. for saving user preferences, shopping carts, etc.), and you allow users to sign in using identity providers such as Google, Apple or Auth0, then you rely on cookies to achieve that functionality. There are browser cookie behavior changes that may break your user experience. Google Chrome, for example, is going to be the first browser vendor to roll out a change that might not be compatible with your web application.

## Google Chrome sameSite attribute changes

You may notice that the Chrome spec for setting sameSite to undefined has changed from sameSite defaulting to `none` to `lax` instead. 

As an example, you are building a new UI and have several services that you proxy to via an Auth0 gateway. At this gateway, you create a cookie session. If you make a cross-origin request, you may see this warning in the js console:

`A cookie associated with a cross-site resource at <myappurl.com> .was set without the SameSite attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with SameSite=None and Secure. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032`

Previously, in Auth0, sameSite attribute options were listed as `true`, `false`, `strict` or `lax`. If you did not set the attribute, the default would be `false`. Now, we have also added the ability for you to set the attribute to `none`.

## 

---
description: Understand how logout works with Auth0. 
topics:
  - logout
contentType: index
useCase:
  - manage-logout
---

# Logout

You can log a user out of the Auth0 session and (optionally) from the identity provider (IdP) session. When you're implementing the logout functionality, there are typically three session layers you need to consider:

1. **Application Session Layer**: The first layer is the session inside your application. Though your application uses Auth0 to authenticate users, you'll still need to track that the user has logged in to your application. In a regular web application, you achieve this by storing information inside a cookie. [Log users out of your applications](/logout/guides/logout-applications) by clearing their session. You should handle the application session in your application.

2. **Auth0 Session Layer**: Auth0 also maintains a session for the user and stores their information inside a cookie. The next time a user is redirected to the Auth0 Lock screen, the user's information will be remembered. [Log users out of Auth0](/logout/guides/logout-auth0) by clearing the <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> cookie.

3. **Identity Provider Session Layer**: The last session layer is the identity provider layer (for example, Facebook or Google). When users attempt to sign in with any of these providers and they are already signed into the provider, they will not be prompted again to sign in. The users may be asked to give permission to share their information with Auth0 and, in turn, your application. It is not necessary to log the users out of this session layer, but you can force the logout. (For more information, see [Log Users Out of Identity Providers](/logout/guides/logout-idps) and [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps).)

## Quickstarts for logout functionality

For guidance on how to implement logout functionality in your specific type of application and sample code, refer to our [Quickstarts](/quickstarts) for the following types of applications:

### Native/Mobile Apps

* [Android](/quickstart/native/android/03-session-handling#log-out)
* [Chrome Extension](/quickstart/native/chrome)
* [Cordova](/quickstart/native/cordova)
* [Ionic 3+](/quickstart/native/ionic3)
* [iOS Objective-C](/quickstart/native/ios-objc/03-user-sessions#on-logout-clear-the-keychain)
* [iOS Swift](/quickstart/native/ios-swift/03-user-sessions#on-logout-clear-the-keychain)

### Single-Page Apps

* [Angular 2+](/quickstart/spa/angular2)
* [JavaScript](/quickstart/spa/vanillajs)
* [React](/quickstart/spa/react)
* [Vue](/quickstart/spa/vuejs)

### Web Apps

* [ASP.NET (OWIN)](/quickstart/webapp/aspnet-owin/01-login#add-login-and-logout-methods)
* [ASP.NET Core](/quickstart/webapp/aspnet-core/01-login#add-login-and-logout-methods)
* [Java](/quickstart/webapp/java)
* [Java Spring MVC](/quickstart/webapp/java-spring-mvc)
* [Java Spring Security](/quickstart/webapp/java-spring-security-mvc)
* [NancyFX](/quickstart/webapp/nancyfx)
* [Node.js](/quickstart/webapp/nodejs)
* [PHP (Laravel)](/quickstart/webapp/laravel)
* [PHP (Symfony)](/quickstart/webapp/symfony)
* [Python](/quickstart/webapp/python#6-logout)
* [Ruby on Rails](/quickstart/webapp/rails/02-session-handling#logout-action)

## Redirect users after logout

After users log out, you can [redirect users](/logout/guides/redirect-users-after-logout) to a specific URL. You need to register the redirect URL in your tenant or application settings. Auth0 only redirects to whitelisted URLs after logout. If you need different redirects for each application, you can whitelist the URLs in your application settings.

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)

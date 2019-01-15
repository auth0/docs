---
description: Understand how logout works with Auth0. 
topics:
  - logout
contentType: index
useCase:
  - manage-logout
---

# Logout

You can log a user out of the Auth0 session and (optionally) from the Identity Provider session. 

## Session Layers

When you're implementing the logout functionality, there are typically three session layers you need to consider:

1. **Application Session Layer**: The first layer is the session inside your application. Though your application uses Auth0 to authenticate users, you'll still need to track that the user has logged in to your application. In a regular web application, this is achieved by storing information inside a cookie. You need to log out the user from your application by clearing their session.

2. **Auth0 Session Layer**: Auth0 also keep a session for the user and stores their information inside a cookie. The next time a user is redirected to the Auth0 Lock screen, the user's information will be remembered. To log out a user from Auth0, you need to clear the single sign-on (SSO) cookie.

3. **Identity Provider session**: The last layer is the Identity Provider, such as Facebook or Google. When users attempt to sign in with any of these providers and they are already signed into the provider, they will not be prompted again to sign in. They may simply be asked to give permissions to share their information with Auth0 and in turn, your application.

You should handle the application session in your application. 

## Logout functionality within your applications

For guidance on how to implement logout functionality in your application and sample code, please refer to our [Quickstarts](/quickstarts):

### Native/Mobile Apps

* [Android](/quickstart/native/android/03-session-handling#log-out)
* [Chrome Extension](/quickstart/native/chrome)
* [Cordova](/quickstart/native/cordova)
* [Ionic 3+](/quickstart/native/ionic3)
* [iOS Objective-C](/quickstart/native/ios-objc/03-user-sessions#on-logout-clear-the-keychain)
* [iOS Swift](/quickstart/native/ios-swift/03-user-sessions#on-logout-clear-the-keychain)

### Single Page Apps

* [Angular 2+](/quickstart/spa/angular2)
* [JavaScript](/quickstart/spa/vanillajs)
* [React](/quickstart/spa/react)
* [Vue](/quickstart/spa/vuejs)

### Web Apps

* [ASP.NET (OWIN)](/quickstart/webapp/aspnet-owin/01-login#add-login-and-logout-methods)
* [ASP.NET (System.Web)](/quickstart/webapp/aspnet#logout)
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

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Redirect Users After Logout](/logout/guides/redirect-users-after-logout)

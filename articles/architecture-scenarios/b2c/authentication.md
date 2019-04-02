---
title: User Authentication
description: Architect how you will make authentication work in your CIAM implementation.
toc: true
topics:
    - b2c
    - ciam
    - authentication
    - universal-login
contentType: concept
useCase:
    - authentication
---
# User Authentication

In order to provide services to your users, you must be able to identify who those users are. This process is called authentication. You must provide your users a way to verify that they are who they are. There are a number of ways to do this such as social media accounts, username/password, and passwordless authentication. In most cases, it is also recommended that you add a second factor for authenticating.

When designing the authentication experience, you will need to determine:

* Where users will enter their credentials
* How you will keep user credentials safe
* How you will maintain your authentication system
* How you will provide password authentication for your users
* If you will integrate social logins for my users
* How you will prevent hackers from trying to log in as your users
* How you want to implement authentication in different kinds of applications using Auth0
* If you want to make login easy for your users when they come from different language backgrounds
* How you will provide a good user experience as you migrate away from my legacy authentication system

The answers to these questions, and others, are detailed below in sections on [Universal Login](#universal-login), [Username Password Authentication](#username-password-authentication), [Anomaly Detection](#anomaly-detection), and [Application Integration](#application-integration).

## Universal Login

Auth0's Universal Login makes authenticating users a short, three-step process (all of our [quickstarts](/quickstart) demonstrate this):

1. Determine how and when you want to [redirect from your application](#application-integration).
2. [Set up the appropriate branding and/or customized HTML](/universal-login) in your Auth0 configuration.
3. Set up your application to [receive and handle the response](#application-integration) from the Authorization Server.

::: note
If you have more than one application, the best practice is to redirect to a centralized authorization server to authenticate the user (at Auth0, this means taking advantage of Universal Login). This comes with many security and user experience benefits, including SSO. See the [Universal Login](/universal-login) documentation for more information.
:::

## Username Password Authentication

Nearly every B2C application provides the ability for their customers to create a new set of credentials. This is a common form of authentication that all users are familiar with.

Username Password Authentication can come in multiple flavors at Auth0. If your application is a greenfield application with no existing user base, then a simple Auth0 OOTB database connection will give you everything you need to start authenticating your users. However if you have a legacy user store (such as your own database of users or an existing LDAP system) you have a couple of different options for migrating your users, see here for more information.

However you end up provisioning the users for your database connection, the authentication of those users is quite similar. It requires you to present the users with a form to enter their username and password. As mentioned in the universal login section, the simplest and safest way to authenticate users with a username and password is to redirect them to a centralized login page and collect their username and password there. This allows your authorization server to determine whether they have already authenticated and skip the login form entirely when it is not needed.

::: note
Collecting credentials only at the centralized login page will reduce the surface area for a potential leak of user secrets. It will also reduce the need to collect credentials unnecessarily.  See [Universal Login](#universal-login) for more information.
:::

## Anomaly Detection

The reason that authentication systems are important is to prevent bad actors from accessing applications and user data that they should not. We want to place as many barriers in between those bad actors and access to our system as possible. One of the easiest ways to do this is to ensure that your anomaly detection with Auth0 is configured correctly. Take a moment to [read the docs on anomaly detection](/anomaly-detection) and ensure it is working correctly for you behind the scenes.

::: note
Anomaly Detection is handled by Auth0 and provides a great security feature for your product. If you are going to utilize it, ensure that you have set up your SMTP provider and configured your email templates before turning on email delivery to your users.
:::

## Application Integration

Once you have figured out how you want to authenticate your users, the next step is to determine how and when you will initiate that authentication. Each application may have its own starting point.

::: warning
Native Mobile Applications (and desktop applications) should use the system browser for authentication, or they open themselves up to additional security risks.
:::

As discussed, OpenID Connect (OIDC) is the most frequently used industry standard protocol when it comes to customer facing applications. Figuring out which OIDC flow to use is your first task, and you will want to start by reviewing guidance concerning the various grant types here.  

If you want to allow anonymous users access to any part of our application then you need to determine if you will be redirecting right away or prompting your users to redirect only when required (or perhaps some combination of both; see here for further discussion). If users can deep link to a protected version (or area) of your site then you will need to determine the links to your application that will result in an automatic redirect to Auth0 (see here for further information). 

### Anonymous Access

It is important to consider the user experience when someone first comes to the application. If your application supports anonymous user access (quite common for eCommerce applications) there are different scenarios to consider:

* They are returning to the application after having already logged in, or
* This is the first time they are accessing the application:
    * They have already accessed a different application that uses the same Auth0 tenant,
    * They have never (or not in a long time) authenticated on this device or browser.

When an anonymous user accesses your application, it can often be desirable for the application to discover if the user has already logged into a different application in the same family, or to remember this user even if the application is a SPA with no state. For example, if you can determine that the user is already logged in, you might decide to have the header of the application skip displaying a login button and instead have an account or profile menu for the user. To accomplish this you will want to utilize "silent authentication". Silent authentication will allow you to check to see if the user is logged in without prompting them to log in if they are not. Then the application can present a login button if necessary. If the user is logged in already, however, then you will receive tokens and will not have to present the user with a login button again.

::: note
Checking for a login session by redirecting to Auth0 can be really helpful for your application, but if this will result in a lot of requests it is important to employ some sort of throttling mechanism to avoid latency and/or rate limiting.
:::

### Deep linking to protected endpoints

There are a variety of reasons why someone might link directly to a particular page within your application that is only accessible by authenticated users. If this is possible for your application you should automatically redirect your user to Auth0 if they are not authenticated. Once they authenticate and the authorization server returns them to your application, you can [redirect them](/users/guides/redirect-users-after-login) to where they intended to go in the first place.

::: note
Most modern authentication frameworks support execution of middleware for redirecting to an authorization server such as Auth0. Ensure yours is configurable, can check expirations, and (for confidential clients) supports refresh tokens.
:::

### Authenticating the user

Authentication is the process of verifying who a user is (that they are who they say they are). The result of authentication in this context is an ID Token. This token contains information about the user and should only be able to be obtained if the user authenticates using one or multiple factors as defined by the authorization server (the most common form being user id and password as discussed here). There are a few things you may also need to consider in addition to obtaining an ID Token:

* Do we also need an Access Token in order to call a shared API?
* Is our application a Native application (mobile or desktop) or do I need a Refresh Token?
    * If Yes, for more information see Authorization Code Grant with PKCE
    * If No, for more information see Implicit Grant

::: warning
Before you go live, you should ensure that only the grants that you are using for each application [are enabled in your configuration for the client](/applications/guides/update-grant-types-dashboard).
:::

### Implicit Grant

If all your application needs is the ID Token and you are using a browser-based application, then you can always use the Implicit Grant to get your ID Token. This is a simple authentication flow and should be supported by your SDK (depending on the language you are developing in).

If you need a refresh token so that you can re-check whether any of the information about the user has changed, then you must use the [authorization code grant](/api-auth/tutorials/authorization-code-grant).

### Authorization Code Grant (with or without PKCE)

If your SDK only supports the authorization code grant, or you need an Access Token or Refresh Token, authorization code grant (with or without PKCE) can also be used to retrieve an ID Token.  The authorization code grant includes an additional API call to exchange the code for a token which can result in additional unnecessary latency if all you need is the ID Token. In many cases the [hybrid flow](/api-auth/tutorials/hybrid-flow_) is implemented to provide optimum access to the ID Token while still leveraging the authorization code grant workflow for the secure and safe retrieval of Access and Refresh Tokens.

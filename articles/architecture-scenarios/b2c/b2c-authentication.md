---
title: Authentication
description: Understand how authentication works in your CIAM implementation.
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
# Authentication

In order to provide services to your users, you must be able to identify who those users are. This process is called User  Authentication. There are a number of ways to perform authentication of a user - via social media accounts, username & password, passwordless - and it's often recommended that you go beyond a first factor for authenticating the user by adding a second factor as well (a.k.a. Multi-factor Authentication).

::: panel Best Practice
It's important to consider both security and user experience when designing how you will authenticate your users. Providing them multiple primary factors and/or enforcing more than one factor during authentication are ways that you can provide both.
:::

It’s important to consider both security and user experience when designing how you will authenticate your users, and so there are a number of things you will want to consider when looking at functionality and workflow:

* Where users will enter their credentials
* How you will keep user credentials safe
* How you will maintain your authentication system
* How you will provide password authentication for your users
* How you will prevent hackers from trying to log in as your users
* How you want to implement authentication in different kinds of applications using Auth0
* What to do if you want to make login easy for your users when they come from different language backgrounds
* How you will provide a good user experience as you migrate away from any legacy authentication system
* What do you need to consider when integrating your applications with Auth0?

Auth0 [Universal Login](#universal-login) provides users with a safe and secure experience - no matter whether you choose to provide for user ID/password credentials sign in, or allow the so-called Bring Your Own Identity scenarios provided via [Social Login](https://auth0.com/learn/social-login/). There are also brand recognition benefits to centralizing the login experience with Universal Login, even if you feel you will also have product-specific [branding](/architecture-scenarios/implementation/b2c/b2c-branding) requirements. The Auth0 UI widgets typically used with Universal Login also provide out-of-the-box support with regards to [internationalization](/libraries/lock/v11/i18n) for users with different language requirements, and out-of-the-box support for Auth0 features such as [MFA](/multifactor-authentication) and [anomaly detection](#anomaly-detection) allow you to put barriers in place in order to prevent hackers attempting to access users' accounts. 

Providing sign in via user ID and password credentials means that you are not reliant on the status of any third-party identity provider in order for users to access your system. It also gives you the control to align with your corporate policies for credentials. Auth0 provides you with a number of options in support of user ID and password login, and the guidance provided by the section on [username and password authentication](#username-and-password-authentication) will help you understand how you can leverage these. If you have an existing legacy identity store then you’ll also want to see the section on [user migration](/architecture-scenarios/implementation/b2c/b2c-provisioning#user-migration), which discusses the advantages of migrating to the safety and security of Auth0’s managed identity storage. Adding social login at some point as an additional primary authentication factor provides for added flexibility, and can help you to understand more about your users without the need to question them further.

OpenID Connect ([OIDC](/protocols/oidc)) is the most frequently used industry standard protocol when it comes to customer facing applications, and OIDC has first-class citizen support in Auth0. Various different approaches for integrating various different applications are supported. See [application integration](#application-integration) for information you'll need to make an informed choice. 

## Universal Login

Do you have, or will you have, more than one application in your system? If the answer to this question is yes, then you will want a centralized sign in experience. To achieve a seamless SSO experience between multiple applications, it is critical to have a centralized location to redirect your users for authentication. This allows you a way to provide your users with a consistent experience if you add social authentication in the future, add third party applications to your system, or add multi-factor authentication as an option (or requirement) for your users - and also allow you to take advantage of new features for improving your users’ experience with little, if any, added development effort.

::: panel Best Practice
If you have more than one application, the best practice is to redirect to a [centralized location](/hosted-pages/login) to authenticate the user. With Auth0, this means taking advantage of [Universal Login](/universal-login), which provides many security and user experience benefits out-of-the-box, including [SSO](/sso/current).
:::

Auth0 Universal Login makes authenticating users a short, easy process which can be accomplished in three easy steps (all of our Quickstarts demonstrate this and our SDKs hide the complexity for you too):

1. Determine how and when you want to [redirect from your application](#application-integration).
2. Set up the appropriate [branding](/architecture-scenarios/implementation/b2c/b2c-branding) and/or customized HTML in your Auth0 configuration.
3. Set up your application to [receive and handle the response](#application-integration) from the Authorization Server.

## Username and password authentication

Nearly every B2C application provides the ability for their customers to create a new set of credentials. This is a common form of authentication that all users are familiar with.

Username password authentication comes in multiple flavors at Auth0. If your application is a green-field application with no existing user base, then a simple Auth0 out-of-the-box [Database Connection](/connections/database) will give you everything you need to start authenticating your users. However, if you have a legacy user store (such as your own database of users or an existing LDAP system) you have a couple of different options for migrating your users as discussed in our guidance on [User migration](/architecture-scenarios/implementation/b2c/b2c-provisioning#user-migration).

However you end up provisioning the users for your database connection, the authentication of those users is quite similar. It requires you to present the users with a form to enter their username and password. As mentioned in the guidance concering [Universal Login](#universal-login), the simplest and safest way to authenticate users with a username and password is to redirect them to a centralized login page and collect their username and password there. This allows Auth0 to determine whether they have already authenticated and skip the login form entirely when it's not needed.

::: panel Best Practice
Collecting credentials only at the centralized login page will reduce the surface area for potential leak of user secrets. It will also reduce the need to collect credentials unnecessarily. See [Universal Login](#universal-login) for more information.
:::

## Anomaly detection

The reason that authentication systems are important is to prevent bad actors from accessing applications and user data that they should not. We want to place as many barriers as possible between those bad actors and access to our systems. One of the easiest ways to do this is to ensure that your [anomaly detection](/anomaly-detection) with Auth0 is configured correctly, so take a moment to read the guidance on this subject and ensure that it's working correctly for you.

::: panel Best Practice
Anomaly detection is handled behind the scenes by Auth0 and provides a great security feature for your product. If you're going to utilize it, ensure that you have set up your [Email Provider](/architecture-scenarios/implementation/b2c/b2c-operations#email-provider-setup) and configured your [Email Templates](/architecture-scenarios/implementation/b2c/b2c-branding#email-template-customization) before turning on email delivery to your users.
:::

## Application integration

Once you've figured out how you want to authenticate your users, the next step is to determine how you will initiate that authentication. Each application will typically have its own starting point.

::: warning
Native mobile applications (and desktop applications) should use the system browser for authentication, or they open themselves up to additional security risks. See [Native vs. Browser Login on Mobile](/design/browser-based-vs-native-experience-on-mobile) for more information. 
:::

As discussed, we've found that most of our customers use OpenID Connect ([OIDC](/protocols/oidc)) as the industry-standard protocol when it comes to their customer facing applications. Figuring out which [OIDC flow](/api-auth/intro) to use is your first task, and you will want to start by reviewing the our [grant mapping](/applications/reference/grant-types-auth0-mapping) guidance in the first instance.  

If you want to allow anonymous users access to any part of our application then you need to determine if you will be redirecting right away or prompting your users to redirect only when required (or perhaps some combination of both; see [Redirect Users After Login](/users/guides/redirect-users-after-login) for further discussion). If users can [deep link](#deep-linking-to-protected-endpoints) to a protected version (or area) of your site then you will need to determine the links to your application that will result in an automatic redirect to Auth0. 

### Anonymous access

It is important to consider the user experience when someone first comes to your application. If your application supports anonymous user access (quite common for eCommerce applications) there are different scenarios to consider:

* Are they returning to the application after having already logged in, or
* If this is the first time they are accessing the application:
  * Have they already accessed a different application that uses the same Auth0 tenant,
  * Have they ever (or perhaps not in a long time) authenticated on this device or browser.

When an anonymous user accesses your application, it can often be desirable for the application to discover if the user has already logged into a different application in the same family, or to remember this user even if the application is a [SPA](/quickstart/spa) with no state. For example, if you can determine that the user is already logged in, you might decide to have the UI header in the application skip displaying a login button and instead have an account or profile menu for the user. To accomplish this you will want to utilize "[silent authentication](/api-auth/tutorials/silent-authentication)". Silent authentication will allow you to check to see if the user is logged in without prompting them to log in if they are not. Then the application can present a login button if necessary. If the user is logged in already, however, then you will receive tokens and will not have to present the user with a login button again.

::: warning
Checking for a login session by redirecting to Auth0 can be really helpful for your application, but if this will result in a lot of requests it is important to employ some sort of throttling mechanism to avoid latency and/or rate limiting. <%= include('../../_includes/_rate-limit-policy.md') %>
:::

### Deep linking to protected endpoints

There are a variety of reasons why someone might link directly to a particular page within your application that is only accessible by authenticated users. If this is possible for your application you should automatically redirect your user to Auth0 if they are not authenticated. Once they authenticate and the authorization server returns them to your application, you can [redirect them](/users/guides/redirect-users-after-login) to where they intended to go in the first place.

::: panel Best Practice
Most modern authentication frameworks support middleware for redirecting to an authorization server such as Auth0. Ensure yours:

* Is configurable
* Can check expirations
* Supports refresh tokens (for confidential clients)
:::

### Authenticating the user

Authentication is the process of determining user identity. The result of authentication in an OIDC context is an ID Token. This token contains information about the user and should only be able to be obtained if the user authenticates using one or more factors as defined by the authorization server (the most common form being [user ID and password](#username-and-password-authentication)). There are a few things you may also need to consider in addition to obtaining an ID Token:

* Do we also need an [Access Token](/tokens/overview-access-tokens) in order to call a shared API?
* Is your application a single-page application and only requires an [ID Token](/tokens/id-token)? See [Implicit Grant](/api-auth/tutorials/implicit-grant) for more information. 
* Is your application a native application (mobile or desktop) and/or do you need a [Refresh Token](/tokens/refresh-token/current)? See [Authorization Code Grant with PKCE](/api-auth/tutorials/authorization-code-grant-pkce) for more information. 

::: warning
Before you go live, you should ensure that **only** the grants that you are using for each application are enabled in your [configuration for your Application](/dashboard/guides/applications/update-grant-types).
:::

### Implicit grant

If all your application needs is the ID Token and the application is browser-based, then you can always use the [implicit grant](/api-auth/tutorials/implicit-grant) to get your ID Token. This is a simple authentication flow and should be supported by your SDK (depending on the language you are developing in).

::: warning
If you need a [Refresh Token](/tokens/refresh-token/current) so that you can obtain a new Access Token or ID Token without having to re-authenticate the user, then you must use the [authorization code grant](/api-auth/tutorials/authorization-code-grant).
:::

### Authorization code grant (with or without PKCE)

If your SDK only supports the Authorization Code grant, or you need an Access Token or Refresh Token, then Authorization Code grant (with or without [PKCE](/flows/concepts/auth-code-pkce)) can also be used to retrieve an ID Token.  The Authorization Code grant includes an additional API call to exchange the code for a token which can result in additional unnecessary latency if all you need is the ID Token. In many cases the [hybrid flow](/api-auth/tutorials/hybrid-flow) is implemented to provide optimum access to the ID Token while still leveraging Authorization Code grant workflow for the secure and safe retrieval of Access and Refresh Tokens.

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)

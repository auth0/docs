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

<%= include('../../_includes/_authentication/_introduction.md') %>

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

However you end up provisioning the users for your database connection, the authentication of those users is quite similar. It requires you to present users with a form to enter their username and password. As mentioned in the guidance concerning [Universal Login](#universal-login), the simplest and safest way to authenticate users with a username and password is to redirect them to a centralized login page and collect their username and password there. This allows Auth0 to determine whether they have already authenticated and skip the login form entirely when it's not needed.

::: panel Best Practice
Collecting credentials only at the centralized login page will reduce the surface area for potential leak of user secrets. It will also reduce the need to collect credentials unnecessarily. See [Universal Login](#universal-login) for more information.
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

## Anomaly detection

The reason that authentication systems are important is to prevent bad actors from accessing applications and user data that they should not. We want to place as many barriers as possible between those bad actors and access to our systems. One of the easiest ways to do this is to ensure that your [anomaly detection](/anomaly-detection) with Auth0 is configured correctly, so take a moment to read the guidance on this subject and ensure that it's working correctly for you.

::: panel Best Practice
Anomaly detection is handled behind the scenes by Auth0 and provides a great security feature for your product. If you're going to utilize it, ensure that you have set up your [Email Provider](/architecture-scenarios/implementation/b2c/b2c-operations#email-provider-setup) and configured your [Email Templates](/architecture-scenarios/implementation/b2c/b2c-branding#email-template-customization) before turning on email delivery to your users.
:::

## Social authentication

The “bring your own identity” scenario offered by Facebook, Google, etc., is a valuable way of simplifying the user authentication experience without compromising security, and using [Universal Login](#universal-login) makes it easy to start adding support for [Social Connections](https://auth0.com/docs/identityproviders#social) with minimal disruption. 

::: warning
Auth0 provides a simple way to test social connections using [pre-configured developer keys](https://auth0.com/docs/connections/social/devkeys). However these have [limitations] (https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys), and before going into production, you’ll need to set up your own application-specific keys by following the [instructions] (https://auth0.com/docs/identityproviders#social) for your chosen social provider(s).
:::

With [social](https://auth0.com/learn/social-login/) support, user identities and credentials are managed by the social provider, as well as certain identity claims - which Auth0 will use to populate the user [profile](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt). Auth0 can also provide access to Social Identity Providers (Social IdP) [Access tokens](https://auth0.com/docs/tokens/overview-idp-access-tokens), so that your application can also call 3rd party Social IdP APIs on behalf of the user.  

::: panel Best Practice
Social is a great feature to provide, but when you offer more than one way to sign-in, you need to consider the possibility that your customers will actually use more than one way to sign-in. By default, every user identity in Auth0 has its own user profile, so you’ll probably want to consider Auth0's capability to [Link User Accounts](https://auth0.com/docs/link-accounts) (a.k.a. Account Linking) to provide an effective way of associating one user profile with multiple identities.
:::

The Auth0 [Custom Social Connections extension](https://auth0.com/docs/extensions/custom-social-extensions) extends social authentication even further by allowing you to connect with any OpenID Connect ([OIDC](/protocols/oidc)) 3rd-party compliant vendor not supported out-of-box. For example, support for the government-issued-identity provider [SwissID](https://www.swissid.ch/) can be configured in Auth0 by using a Custom Social Connection and by following the guidance described in our [SwissID blog post](https://auth0.com/blog/configuring-swissid-login-into-custom-applications/). 

## Multi-factor authentication (MFA)

In an era where misuse of user credentials is at an all-time high, protecting _your_ systems when it’s so common for hackers to steal users identity information in general is a challenge. One of the most effective ways though is to provide users with the ability to configure a second factor for protecting their account. More commonly referred to as [Multi-Factor Authentication](/multifactor-authentication). This will ensure that only a valid user can access his/her account, even if they use a username and password that may have been compromised from a different application.

::: panel Best Practice
It's quite common for customer facing applications to provide users with an _option_ for adding a second factor rather than _forcing_ them to use a second factor. For more information regarding this, see [providing your users with an option to add MFA](https://auth0.com/learn/multifactor-authentication-customers/).
:::

Auth0 supports a number of different options when it comes to enabling MFA for protecting user account access, and there are several practices to ensure that you will truly be providing a flexible second factor barrier to access:

* Auth0 [Guardian](https://auth0.com/multifactor-authentication): a service that provides both _Push_ notification generation and an application for allowing or denying requests. _Push_ sends notification to a user’s pre-registered device - typically a mobile or tablet - from which a user can immediately allow or deny account access via the simple press of a button.
* Time-based One-Time Password ([TOTP](https://auth0.com/blog/from-theory-to-practice-adding-two-factor-to-node-dot-js/)): allows you to register a device - such as Google Authenticator - that will generate a one-time password which changes over time and which can be entered as the second factor to validate a user’s account.
* [SMS](/multifactor-authentication/factors/sms): for sending a one-time code over SMS which the user is then prompted to enter before they can finish authenticating.
* [DUO](/multifactor-authentication/factors/duo): allows you to use your DUO account for multi-factor authentication.

Whilst MFA worflow using technologies such as Guardian or Google Authenticator is typically provided via a separate application that runs on a mobile or tablet device, if you don’t want your customers to have to download a separate application Auth0 also provides you with an [SDK](https://auth0.com/blog/announcing-guardian-whitelabel-sdk/) that you can use to build second factor workflow right in your existing mobile devce application(s).

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

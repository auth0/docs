---
title: Add Login to My Native/Mobile App
description: Everything you need to know to implement login for a native/mobile app.
ctaText: Quickstart
ctaLink: /docs/quickstarts/native
template: microsite
topics:
  - authentication
  - oauth2
  - mobile-apps
  - desktop-apps
  - native-apps
useCase:
  - add-login
---

So you have a native/mobile app, and you need a way for users to log in. Let’s add login functionality with Auth0.

## What can Auth0 do for you?

Auth0 can help you:

- Register and authenticate users with multiple authentication sources.
- Authorize users (e.g., manage groups and permissions).
- Implement multi-factor authentication.
- Customize your login experience and process.

Auth0 also provides flexible ways to add login, using one of the following methods:

- [Auth0 SDKs](/libraries): The simplest way to implement login for your application's specific technology is to use one of our SDKs which will do most of the heavy-lifting for you. Our [Quickstarts](/quickstart/native) will walk you through the process.
- [Authentication API](/api/authentication): If you prefer to roll your own, keep reading to learn how to call our API directly.

::: prerequisites
Before we begin, you will need to:

- Log in to the Auth0 Dashboard. If you don’t already have an Auth0 account, [sign up for one now](${manage_url}).
:::

::: steps
1. Understand how your app will retrieve tokens
1. Register your application with Auth0 using the Dashboard
1. Enable the login options you want to offer your users 
1. Edit your application code to redirect to Auth0 when a user wants to authenticate
1. Retrieve your token(s)
1. Extract user information
1. Return your user to their desired place in your application
:::

## Understand how your app will retrieve tokens
First, let's understand how login works with Auth0.

When a user clicks Log In or Sign Up:

2. Your app redirects the user to a login page hosted by Auth0. The login page displays your configured login prompts (like Username and Password, or Login with Google).
2. Auth0 verifies your user's identity.
2. Auth0 redirects the user to your app's configured callback URL, along with a signed ID token containing their basic profile information.
Since the prize you seek is a token, you need a way to retrieve tokens, otherwise known as a grant type. The one we use for native/mobile apps is the Authorization Code Grant using Proof Key for Code Exchange (PKCE) (pronounced "pixie"). With the Authorization Code Grant, you make two calls: one to get an authorization code and one to exchange that code for your token. PKCE adds enhanced security to make sure no other process can intercept and use the authorization code.

To find out more about grant types and when each one is used, our handy flowchart, Which OAuth 2.0 Flow Should I Use?, is a great starting point.

## Register your application with Auth0
Before you can use Auth0 to add login to your app, you need to register your application with Auth0 using the Dashboard. Be sure to choose Native as the application type; when you do, Auth0 automatically configures your app to allow the Authorization Code Grant type.

Once created, make sure to set the allowed callback URL. Auth0 will redirect to this URL after a user has authenticated, and it must be a part of your application.

On the Settings tab, make note of your application's assigned Client ID. Later, you will need this when you redirect to Auth0 for authentication and retrieve your tokens.

Make sure to follow our best practices when setting up your application.

## Enable the login options you want to offer your users
By default, each Auth0 tenant includes a basic user profile data store; however, you can also connect social identity providers (like Google or Facebook) and enterprise directories (like Active Directory), or use other database connections. You will need to configure the options you want to offer your users in the Auth0 Dashboard. When you enable a new connection, Auth0 will ask you which applications you would like to use it with; by default, all applications are selected.

You may also want to enable multi-factor authentication with Guardian or configure other options.

## Edit your application code to redirect to Auth0 when a user wants to authenticate
When a user wants to authenticate, your application will need to redirect them to Auth0. You can do this by creating a code verifier and a code challenge, then including these when calling the endpoint directly through Auth0's Authentication API. After a successful call, you will receive an authorization code, which you can then exchange for your token(s).

## Retrieve your token(s)
After it successfully receives an authorization code, your application will need to extract the code, then exchange it and the code verifier for token(s). To retrieve your token(s), you will need to make another call to Auth0's Authentication API. The ID Token is what you will need to retrieve for your native/mobile app, but if you also plan to call an API from your application, you can also retrieve an Access Token in the same call.

Once retrieved, make sure you store your token(s) securely.

## Extract user information
To extract the returned user information, you will need to validate and decode the returned ID Token.

To see for yourself what is inside the ID Token, use the JWT.io Debugger. It will allow you to manually inspect the information contained within.

::: note
To programmatically parse the ID Token, you can either:

- manually implement all the checks as described in specification RFC 7519 > 7.2 Validating a JWT
- choose a third-party library from JWT.io
- use any existing middleware for your web framework

If you choose a third-party library, remember to pick a library that supports the signing algorithm selected for your application; when you register an app, Auth0 automatically selects RS256. (To find out why, read all about signing algorithms.) Also, since you will probably use this library when you validate the token, be aware that not all libraries validate all claims. At JWT.io, you can see which validations each library supports (look for the green check marks).
:::

## Return your user to their desired place in your application
Finally, you'll want to return your user to their desired place in your application. For example, if they were trying to access their profile information when you asked them to log in, you will want to return them to their profile information once they have authenticated. Once there, you can use the extracted user information to personalize the user's experience.

Auth0 will assist you in authenticating a user, but it is up to you to keep track of your application's previous state, including whether or not a user is logged in and where to redirect the user after a successful login. However, if you have not implemented another way of doing so, when you retrieve your token(s), you can use a parameter in your call to help restore state. 

::: whats-next
Now that you've added login to your native/mobile app, you may want to learn how to Call an API from a Native/Mobile App, Manage Users, or add custom social connections. You can also learn about SSO with Auth0, or explore how to customize Auth0-hosted pages, emails for database connections, and the login process using rules and hooks.
:::

:::: further-reading
::: guides
- Customize Login Pages
- Customize Password Reset Pages
- Customize Guardian Multi-factor Login Pages
- Customize Error Pages
- Implement Authorization Code Grant Using PKCE
- Single Sign On (SSO)
- Validate ID Tokens
- Configure Multiple Pages Using Separate Tenants
- Get Access Tokens
- Add Custom Claims to ID Tokens
- Where to Store Tokens
- Common Threats and How to Prevent Them
:::

::: concepts
- Multi-factor Authentication
- Passwordless Authentication
- Authentication for Mobile Apps
- About Universal Login
- OpenID Connect
- ID Token
- OAuth 2.0
- Access Token
- Which OAuth 2.0 flow should I use?
- Calling APIs from Mobile Apps
- JSON Web Tokens (JWTs) in Auth0
- Architecture scenario: Mobile + API
:::

::: references
- Identity Providers supported by Auth0
- SDKs
-- Angular Auth0
-- Auth0.js
-- angular2-jwt
-- angular-jwt
-- angular-storage
- APIs
-- Auth0 Authentication API
-- Auth0 Management API
:::
::::

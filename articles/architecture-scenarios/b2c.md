---
order: 04
title: Business to Consumer Identity Scenarios
image: /media/articles/architecture-scenarios/b2c.png
extract: Usually eCommerce or SAAS applications which have end users (consumers) as customers and the application typically used OpenID Connect as a protocol to communicate with Auth0.
description: Explains the architecture scenario B2C with an eCommerce or SAAS application.
topics:
    - b2c
    - architecture
    - db-connections
    - passwordless
    - saml
contentType: concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# Business to Consumer Identity Scenarios

Customer identity management doesn't need to be overwhelming. This guide outlines some common requirements for business to consumer (B2C) applications and how Auth0 can help you meet them.

Here you'll find tips on setting up user signup/login, enriching user profiles, obtaining consent for user data, and more. Let's get started!

## User signup

One of the first things you'll want to set up is a user signup and login page. The [Universal Login page](/hosted-pages/login) with Lock gives you secure user authentication out-of-the-box. It supports single sign-on, passwordless login, and is customizable from the Dashboard. By using Universal Login you can focus more on the core value of your application instead of user signup.

## Progressive profiling

First name, last name, email, confirm email, username, password, confirm password, phone number, company name, country, address line 1, address line 2, city, state, zip code, date of birth, favorite color, shoe size, highest scrabble score.

A signup screen with 10-20 fields makes users hesitate before signing up. Many may not even sign up at all. To reduce barriers to entry, only require the minimum fields for signup and collect more information later. This is called [progressive profiling](/users/guides/implement-progressive-profiling). There are two ways you can perform progressive profiling with Auth0: the Management API and Rules.

With the Auth0 Management API you can update user profiles at any time after signup. You can collect data while a user uses your application, then make incremental updates their profile.

You can have users provide more information by adding a profile collection form into the login process. To do this, create [a Rule that redirects users](/rules/current/redirect) to the form and then returns them to Auth0. Once returned, finish authentication and update the profile.

Any information captured during signup or progressive profiling can be stored in the Auth0 user profile. You can pass this information to the application through authentication tokens or get it using the Auth0 APIs.

## Social login

Auth0 makes it easy to enable [login with social identity providers](/identityproviders#social). After a few simple configuration steps, users can log in with their Google, Facebook, LinkendIn, or other social accounts.

Social login removes potential barriers for users. Instead of giving a username and password, login becomes a single click. Once a user logs into a social provider their browser keeps a single sign-on session for them. This lets them access other applications that use the same provider without typing in their credentials again and again.

Social login also provides consent screens. So if users give consent, your application can access select user profile attributes about the user.

## Single sign-on

If you offer a suite of applications, you may need [single sign-on (SSO)](/sso/current) across them, so users only have to log in once.

Auth0 supports integration with applications that externalize authentication using  industry standard identity protocols: OIDC/OAuth, SAML2 or WS-Fed. Once integrated and configured, your connected applications can use other social identity providers, an Auth0 database, or a database that stores user identities. Auth0 serves as the broker between the applications and the different identity providers.

Now when a user signs in to one of your applications, they can access other applications integrated with Auth0 without having to log in again. This will be true until their SSO session expires. You should configure the SSO session length within Auth0 to meet security policies.

## Account linking

Social logins are convenient for users, but social providers may only have a few user profile attributes. You'd like to build rich user profiles, store them in Auth0, but not lose the convenience of social logins. You can do this with [account linking](/link-accounts).

Account linking lets users link one or more social logins to their Auth0 profile. This creates a merged user profile with attributes from the social provider and from the user profile from Auth0. When a user logs in through a social provider, your application sees the merged profile.

## Extensibility with augmented user profiles

You may want to enrich user profiles with data obtained from other sources. [Auth0 Rules](/rules) enable you to write small snippets of code that execute during the authentication transaction. This lets you call other services for user information, then add it to the Auth0 user profile.

## Passwordless login

Sometimes users forget their passwords. [Passwordless login](/connections/passwordless) lets users authenticate with a one-time code sent via SMS or email. This is useful for applications that aren't used very often or primarily used on small mobile devices where it is cumbersome to enter a password.

Auth0 supports several forms of passwordless login. So based on the needs of your users and application, you can choose the ones that fit. Note that using passwordless login may require you to get additional services. For example, a service to send SMS messages.

## Multi-factor authentication

Is your application handling sensitive content? You may want to offer [multi-factor authentication](/mfa) to your users. With malware threats and data breaches, multi-factor authentication is more popular among users.

Auth0 provides a variety of ways to implement multi-factor authentication. For more flexibility, you can use Rules to turn it on only for users who opt-in for it.

## Branding

Branding is an important part of any application. Your logo, colors and styles should be consistent in all parts of the application. You can [customize](/hosted-pages#customize-your-hosted-page) the login, signup, and error pages displayed by Auth0 so it matches your application. Add your own logo, text, and colors. There's also I18N/L10N support for global rollouts. [Emails for verification or password resets](/email/templates) are customizable too. 

Login screens should appear to come from your application’s branded domain name. To maintain consistency, you can define a [custom domain name](/custom-domains) for the login screen displayed by Auth0.

## Privacy consent page

If your application is used by consumer users, your application is very likely subject to many privacy regulations. These may include the obligation to [provide privacy notices and obtain user consent](/compliance/gdpr/features-aiding-compliance/user-consent), track consent and provide users with access to their data, among others.

To help with privacy-related requirements, Auth0 provides support for showing consent pages, obtaining and tracking consent, and providing access to user profile information held about a user.

## GDPR support

If your application is likely to store data about users in the European Union, then your application is subject to the requirements of the [General Data Protection Regulation (GDPR)](/compliance/gdpr), which took effect on May 25th 2018. The GDPR adds some new requirements and significant new fines, so make sure your application complies with the regulations.

Auth0 has [features to help you meet GDPR obligations](/compliance/gdpr/features-aiding-compliance). You can display a consent page and track the user’s consent via the Lock widget. The consent status can then be stored in the Auth0 user profile for each consenting user. With the Management API you can get users to satisfy data access requests, as well as give data to users in JSON format to satisfy data portability requirements.

## Anomaly Detection

An unfortunate part of modern life on the internet is hackers. Hackers are constantly trying to find a way into applications. For example, they may try to log in using common passwords. Or they may use credentials stolen from elsewhere, hoping that users re-used the same passwords at other sites.

Auth0's [Anomaly Detection](/anomaly-detection) detects these situations for Auth0 Database Connections and provides options for how to respond. Turn on Anomaly Detection and configure the response options so you can respond appropriately if such an event occurs.

## Github Deployment 

Do you manage a lot of your application code in Github? You can deploy code for rules, hooks, or custom database access from there with Auth0's [Github Deployment extension](/extensions/github-deploy).

If you have a full continuous integration/continuous deployment pipeline, use the [Auth0 Deploy CLI tool](https://github.com/auth0/auth0-deploy-cli) for greater flexibility.

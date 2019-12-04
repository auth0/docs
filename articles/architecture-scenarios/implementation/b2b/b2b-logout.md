---
title: Logout
description: User logout planning considerations for your B2B IAM implementation.
topics:
    - b2b
    - b2biam
    - logout
    - sessions
contentType: concept
useCase:
    - user-logout
---
# Logout

<%= include('../../_includes/_logout/_introduction.md', { platform: 'b2b' }) %>

## Single Logout

If you are doing [Federated Logout](#federated-logout) you will likely also want to do Single Logout (SLO).

::: warning
SLO can add complexity to your system, so you need to ensure that you really need it before adding the extra development and maintenance time to your system.
:::

There are two main approaches you can take to Single Logout:

### Short-lived tokens

This is by far the simplest approach to Single Logout.  Each application enforces a short time that a user can use the system (5-10 minutes) and then on each action by that user if the time has expired, it will either redirect to Auth0 (for regular web apps), or use [Silent Authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication) for client side tokens.  This will ensure that eventually (within a minute or two) all other applications will fail to get their refreshed token because the SSO session has been removed through logout.

::: best practice
You want to avoid making too many calls to your Auth0 tenant to avoid rate limiting and poor performance.  A best practice is to only request new tokens if tokens have expired and a user takes an action.  This will avoid applications that are simply open, but not in use, from continually polling for new tokens.
:::

::: warning
If you are automatically forwarding the user directly to their own IdP as part of an enterprise connection using the connection parameter, this can break this technique unless you are also doing [Federated Logout](#federated-logout)
:::

### Build a logout service

Another technique you can do is build a logout service that can track and destroy application sessions.  Each application will notify the logout service when it creates and removes a session.  This logout service will either have direct access to all application's server side sessions and destroy them directly, or it will have the ability to make a back-channel call to each application to tell the application that it must remove its session.  This technique can be effective because it has low-latency between when a user calls logout and when they are logged out of all applications, but it can add complexity and development time for its creation.  It will also require some way to ensure that new applications added to the system are added to this service.

## Federated Logout

[Federated User Logout](/logout/guides/logout-idps) may be something that you need to consider for your application.  If you or your customers will be using a third-party IdP (i.e., something other than a [Database Identity Provider](/connections/database)) then the question of whether you need to log the user out of the IdP when they log out of your application is something you will need to answer. The answer depends on what your users would expect. If the application and/or IdP you use is tied closely to a customer organization and a central part of day-to-day operations, then it may be frustrating for users to get logged out of their IdP when they log out of your application. If not, then being logged out of the IdP may be expected, or in some cases even desired. In most B2B scenarios, our customers find that it is preferable *not* to perform federated logout for a user.


## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/implementation/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2b/b2b-authorization)
* [Operations](/architecture-scenarios/implementation/b2b/b2b-operations)

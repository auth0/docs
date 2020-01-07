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

If you are doing [Federated Logout](#federated-logout) you will likely also want to do Single Logout (SLO), and there are two main approaches you can take.

::: warning
SLO can add complexity to your system, so you need to ensure that you really need it before adding the extra development and maintenance time to your system.
:::

### Short-lived tokens

::: panel Best Practice
You want to avoid making too many calls to your Auth0 tenant to avoid rate limiting and poor performance.  A best practice is to only request new tokens if tokens have expired and a user takes an action.  This will avoid applications that are simply open, but not in use, from continually polling for new tokens.
:::

This is by far the simplest approach to Single Logout. Each application enforces a short time within which a user can use the system, say, 5-10 minutes. On each action a user performs, if the time has expired then either a redirect to Auth0 (for regular web apps), or [Silent Authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication) for client side Single Page Applications will be used to obtain new tokens. Ordinarily new tokens will be issued silently due to the Single Sign On (SSO) session. However, after logout, all applications will fail to get new tokens silently because the SSO session will have been removed, and the user will need to re-enter their credentials.

::: warning
If you are automatically forwarding the user directly to their own IdP as part of an enterprise connection using the connection parameter, this can break this technique unless you are also doing [Federated Logout](#federated-logout)
:::

### Build a logout service

Another technique you can use is to build a logout service that can track and destroy application sessions. Each application would notify the logout service when it creates and removes a session. The (logout) service would either have direct access to all application's server side sessions and destroy them directly, or it will have the ability to make a back-channel call to each application to tell the application that it must remove its session.

This technique can be quite effective as there is low-latency between when a user calls logout, and when they are then logged out of all applications. However it can add complexity and also additional development time for implementation. It will also require some way to ensure that new applications added to the system are added to this service.

## Federated Logout

[Federated User Logout](/logout/guides/logout-idps) may be something that you need to consider for your application.  If you or your customers will be using a third-party IdP (i.e., something other than a [Database Identity Provider](/connections/database)) then the question of whether you need to log the user out of the IdP when they log out of your application is something you will need to answer. The answer depends on what your users would expect. If the application and/or IdP you use is tied closely to a customer organization and a central part of day-to-day operations, then it may be frustrating for users to get logged out of their IdP when they log out of your application. If not, then being logged out of the IdP may be expected, or in some cases even desired. In most B2B scenarios, our customers find that it is preferable *not* to perform federated logout for a user.


## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

## Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'logout' }) %>

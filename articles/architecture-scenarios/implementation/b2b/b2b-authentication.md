---
title: Authentication
description: How authentication works in your B2B IAM implementation.
toc: true
topics:
    - b2b
    - b2biam
    - authentication
    - universal-login
contentType: concept
useCase:
    - authentication
---
# Authentication

<%= include('../../_includes/_authentication/_introduction.md', { platform: 'b2b' }) %>

## Universal Login

<%= include('../../_includes/_authentication/_universal-login.md', { platform: 'b2b' }) %>

## Home realm discovery

Home realm discovery (HRD) is the process of identifying which identity provider (or which connection in Auth0) the user belongs to *before* authenticating them. There are two ways HRD can occur:

* Provide a way for the decision to be made at the application
* Have Home Realm Discovery happen on the Universal Login page

Your system may need to do either or both methods so it is important to understand all approaches to HRD so that you can apply the one(s) that make the most sense to your applications.

::: panel Best practice
If you don’t need to know ahead of time (for example, all of your users are in a shared user pool), then you don’t need to do HRD. You can allow users to authenticate first and then determine which organization they belong to using app metadata.  HRD is really only needed if you have multiple connections within your Auth0 tenant.
:::

### Application driven HRD

A common and effective way for determining which realm a user belongs to is when an application is branded for each organization.  The organization has its own instance of the application.  This copy or instance can be physically isolated (running on a separate set of servers) or virtually isolated (running on shared servers, but presented as if it could be isolated), and is generally denoted through either a custom hostname (`companyA.application1.yourcompany.com`) or path (`application1.yourcompany.com/companyA`).

::: warning
This method will only work if you are not sharing users between organizations.  If you are sharing users within organizations, then you must support [Home Realm Discovery on the Universal Login Page](#hrd-through-universal-login)
:::

::: panel Best practice
If your application already knows what connection (IdP) the user needs, then pass that along when you redirect the user to `/authorize` using the connection query parameter.
:::

If this is the case for your application(s) then home realm discovery is a simple matter of storing the Auth0 connection name with the organization specific application configuration and sending that connection name as a parameter when redirecting the user for Universal Login. Sending the connection parameter can be achieved by adding it as a query parameter when you redirect them to the authorize endpoint. For more information see the [Authentication API docs](/api/authentication#authorization-code-flow); however, you will generally accomplish this using the SDK for whichever language your application is written in.

::: panel Best practice
If an organization needs more than one IdP, then you will have to do a second round of Home Realm Discovery once identifying their organization.  This can be achieved with Auth0 through creating a dedicated Auth0 tenant for that organization and creating an enterprise connection to that tenant.
:::

### HRD through Universal Login

There are three main approaches to Home Realm Discovery through Universal Login:

* Discover the realm through the user’s email subdomain.
* Discover the realm by looking up a user identifier in some sort of map of identifier to realm map.
* Allow the user to choose or enter their realm (or organization).

In both of the first two approaches, you may consider doing “Identifier First Login”. This means that you present only the ability to enter an identifier first.  After which you collect the user’s identifier, and then based on the identifier you either automatically redirect the user or present a way for the user to enter their password if redirection is unnecessary.

::: warning
Though it is possible to implement Identifier First Login or allow a user to select their organization at the application instead of on the Universal Login Page, this can add complexity with respect to single sign on as well as complexity associated with replicating that behavior in all of your applications.  Instead Auth0 recommends implementing some form of HRD through Universal Login.
:::

#### HRD through Universal Login using the email subdomain

The simplest way to implement home realm discovery on the universal login page is to utilize the email subdomain of the user’s identifier to map that to their Identity Provider. This, of course, only works in situations where the email subdomain will be a 1:1 mapping to an organization or at least to an Identity Provider.  Auth0’s Lock widget can do this for you if you are using the domain map in an enterprise connection, however if you want to build this yourself, you can, but it requires you to build a mapping of email subdomain to connection.

#### HRD through Universal Login using the Identifier to Realm Map

A second, more complex alternative is to store a map of identifier’s to IdP and provide a public endpoint to access that information.  Then on the Universal Login page you can find the connection and redirect back to /authorize with the connection.  The main drawbacks to this approach are latency, and more importantly security when it comes to identifier discovery: if you’re using email addresses, this makes it much easier for someone to discover whether a particular email address is a user of yours.

::: panel Best practice
Any public endpoint should have rate limiting applied to it to prevent hackers from using it to discover information and to prevent denial of service attacks.
:::

#### HRD through Universal Login using user choice

The other simple option is to allow your users to choose from a list, if you don’t mind making public the list of organizations who use your product, or by allowing the user to enter their organization name explicitly.  Once the user tells you which organization they belong to, you can redirect back to Auth0 with the connection for that organization specified, or simply prompt them for their username and password if the connection is a database connection.

## Username and password authentication

<%= include('../../_includes/_authentication/_username-and-password-authentication.md', { platform: 'b2b' }) %>

## Application integration

<%= include('../../_includes/_authentication/_application-integration.md', { platform: 'b2b' }) %>

## Anomaly detection

<%= include('../../_includes/_authentication/_anomaly-detection.md', { platform: 'b2b' }) %>

## SSO with legacy systems

<%= include('../../_includes/_authentication/_sso-legacy.md', { platform: 'b2b' }) %>

## Enterprise Login

The “bring your own identity” scenario has become a must-have for almost all B2B applications.  Most enterprise companies expect to be able to integrate their IdP into your application so their employees don't need to store another set of credentials.  This is a valuable way of simplifying the user authentication experience without compromising security, and using [Universal Login](#universal-login) makes it easy to start adding support for [Enterprise Connections](/connections/identity-providers-enterprise) with minimal disruption.

::: panel Best Practice
Once you start supporting enterprise connections for users, you must do some form of [Home Realm Discovery](#home-realm-discovery) so that you can determine which connection to send the user to for authentication.
:::

With enterprise connection support, user identities and credentials are managed by the identity provider of your customers' organization, as well as certain identity claims - which Auth0 will use to populate the user [profile](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt).

::: panel Best Practice
"Bring your own identity" is a great feature to provide, but if you don't support this from day one, and sometimes even if you do, you may have an organization that wants to switch to their own IdP after already having used the application for a while.  You will need a way to [link user accounts](/users/concepts/overview-user-account-linking) to provide an effective way of associating the new identity with the old database identity.
:::

## Multi-factor authentication (MFA)

<%= include('../../_includes/_authentication/_mfa.md', { platform: 'b2b' }) %>

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

# Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'authentication' }) %>

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

<%= include('../_includes/_authentication-intro.md') %>

<%= include('../_includes/_bp-authentication.md') %>

## Design considerations

<%= include('../_includes/_authentication-design-considerations.md') %>
* What do yuo do if you need to isolate my users by organization?
* How do you handle identifying which organization your users' belong to?
* What's the benefite of providing enterprise connections for your organization?

<%= include('../_includes/_authentication-design-considerations2.md') %>

Often companies need to segregate their users by organization and sometimes users can have access to more than one organization. Knowing which of these scenarios is relevant to your company will help define how to manage home realm discovery ([HRD](#home-realm-discovery)): whether you need to do it, when you need to do it, and how to accomplish it.

## Universal Login

<%= include('../_includes/_authentication-universal-login.md') %>

## Home realm discovery

Home realm discovery (HRD) is the process of identifying which identity provider the user belongs to *before* authenticating them. There are two ways HRD can occur: 

* Provide a way for the user to tell the application
* HRD through Universal Login

Your system may need to do either or both methods so it is important to understand all approaches to HRD so that you can apply the one(s) that make the most sense to your applications. 

:: panel Best practice
If you don’t need to know ahead of time (for example, all of your users are in a shared user pool), then you don’t need to do HRD. You can allow users to authenticate first and then determine which organization they belong to using app metadata.

### Application driven HRD

A common and effective way for determining which realm a user belongs to is when an application is branded for each organization.  The organization has its own instance of the application.  This copy or instance can be physically isolated (running on a separate set of servers) or virtually (running on shared servers, but presented as if it could be isolated), and is generally denoted through either a custom hostname (companyA.application1.yourcompany.com) or path (application1.yourcompany.com/companyA).

::: panel Best practice
If your application already knows what connection (IDP) the user needs, then pass that along to the redirect to /authorize.
:::

If this is the case for your application(s) then home realm discovery is a simple matter of storing the Auth0 connection name with the organization specific application configuration and sending that connection name as a parameter when redirecting the user for Universal Login. Sending the connection parameter can be achieved by adding it as a query parameter when you redirect them to the authorize endpoint. For more information see the Authentication API docs; however, you will generally accomplish this using the SDK for whichever language your application is written in.

::: panel Best practice
If an organization needs more than one IDP, then you will have to do a second round of Home Realm Discovery once identifying their organization.  This can be achieved easily with Auth0 through creating a dedicated Auth0 tenant for that organization and federating out to it. 
:::

### HRD through Universal Login

There are three main approaches to Home Realm Discovery through Universal Login:

* Discover the realm through the user’s email subdomain.
* Discover the realm by looking up a user identifier in some sort of map of identifier to realm map.
* Allow the user to choose or enter their realm (or organization).

In both of the approaches, you may consider doing “Identifier First Login”. This means that you present only the ability to enter an identifier first.  After which you collect the user’s identifier, and then based on the identifier you either automatically redirect the user or present a way for the user to enter their password if redirection is unnecessary.

::: warning
Though it is possible to implement Identifier First Login or allow a user to select their organization at the application, this can add complexity with respect to single sign on as well as complexity associated with replicating that behavior in all of your applications.  Instead Auth0 recommends implementing some form of HRD through Universal Login.
:::

#### HRD through Universal Login using the email subdomain

The simplest way to implement home realm discovery on the universal login page is to utilize the email subdomain of the user’s identifier to map that to their Identity Provider. This, of course, only works in situations where the email subdomain will be a 1:1 mapping to an organization or at least to an Identity Provider.  Auth0’s Lock widget can do this for you if you are using the domain map in an enterprise connection, however if you want to build this yourself, you can, but it requires you to build a mapping of email subdomain to connection.

#### HRD through Universal Login using the Identifier to Realm Map

A second, more complex alternative is to store a map of identifier’s to IDP and provide a public endpoint to access that information.  Then on the Universal Login page you can find the connection and redirect back to /authorize with the connection.  The main drawbacks to this approach are latency, and more importantly security when it comes to identifier discovery: if you’re using email addresses, this makes it much easier for someone to discover whether a particular email address is a user of yours.

::: panel Best practice
Any public endpoint should have rate limiting applied to it to prevent hackers from using it to discover information and to prevent denial of service attacks.
:::

#### HRD through Universal Login using user choice

The other simple option is to allow your users to choose from a list, if you don’t mind making public the list of organizations who use your product, or by allowing the user to enter their organization name explicitly.  Once the user tells you which organization they belong to, you can redirect back to Auth0 with the connection for that organization specified.

## Username and password authentication

<%= include('../_includes/_authentication-username-password.md') %>

<%= include('../_includes/_bp-credentials-only-auth.md') %>

## Anomaly detection

<%= include('../_includes/_authentication-anomaly-detection.md') %>

::: panel Best Practice
Anomaly detection is handled behind the scenes by Auth0 and provides a great security feature for your product. If you're going to utilize it, ensure that you have set up your [Email Provider](/architecture-scenarios/b2b/b2b-operations#email-provider-setup) and configured your [Email Templates](/architecture-scenarios/b2b/b2b-branding#email-template-customization) before turning on email delivery to your users.
:::

## Application integration

<%= include('../_includes/_authentication-application-integration.md') %>

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/b2b/b2b-provisioning)
* [Branding](/architecture-scenarios/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/b2b/b2b-logout)
* [Operations](/architecture-scenarios/b2b/b2b-operations)

---
url: /scopes/current
section: articles
classes: topic-page
title: Scopes
description: Understand the principle of scopes and explore general examples of their use.
topics:
  - scopes
  - permissions
contentType:
  - concept
  - index
useCase:
  - development
  - add-login
  - secure-api
  - call-api
---
# Scopes

Different pieces of user information are often stored across a number of online resources. Users may upload and store photos with a service like Flickr, keep digital files on Dropbox, and store contacts and events in Google Calendar or on Facebook.

Often, new applications will want to make use of the information that has already been created in an online resource. To do so, the application must ask for authorization to access this information on a user's behalf. _Scopes_ define the specific actions applications can be allowed to do on a user's behalf.

## Ways to use scopes

When an app requests permission to access a resource through an authorization server, it uses the `scope` parameter to specify what access it needs, and the authorization server uses the `scope` parameter to respond with the access that was actually granted (if the granted access was different from what was requested).

Generally, you use scopes in three ways:

* From an [application](/applications), to verify the identity of a user and get basic profile information about the user, such as their email or picture. In this scenario, the scopes available to you include those implemented by the <dfn data-key="openid">OpenID Connect (OIDC) protocol</dfn>. For details, see [OpenID Connect Scopes](/scopes/current/oidc-scopes).

* In an [API](/apis), to implement access control. In this case, you need to define custom scopes for your API and then identify these scopes so that calling applications can use them. For details, see [API Scopes](/scopes/current/api-scopes).

* From an application, to call an API that has implemented its own custom scopes. In this case, you need to know which custom scopes are defined for the API you are calling. For an example of calling a custom API from an application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access)

## Best practices

Understand your use case and choose the most restrictive scopes possible. 

If you are requesting scopes, make sure you ask for enough access for your application to function, but only request what you absolutely need. Are you establishing a user's identity or asking the user to allow you to interact with their data? There's a big difference between importing a user's Facebook profile information and posting to their wall. By only requesting what you need, you are more likely to gain user consent when required since users are more likely to grant access for limited, clearly-specified scopes. 

Similarly, when creating custom scopes for an API, consider what levels of granular access applications may need and design accordingly.

## Requested scopes versus granted scopes

In certain cases, users get to consent to the access being requested. While usually the scopes returned will be identical to those requested, users can edit granted scopes (both during initial consent and sometimes after, depending on the resource), thereby granting an app less access than it requested. 

As an application developer, you should be aware of this possibility and handle these cases in your app. For example, your app could warn the user that they will see reduced functionality. It could also send the user back through the authorization flow to ask for additional permissions. But again, remember that when asked for consent, users can always say no.

::: note
By default, Auth0 skips user consent for first-party applications, which are applications that are registered under the same Auth0 domain as the API they are calling; however, you can configure your API in Auth0 to require user consent from first-party applications. Third-party applications, which are external applications, require user consent.
:::

## Keep reading

- [OpenID Connect Scopes](/scopes/current/oidc-scopes)
- [API Scopes](/scopes/current/api-scopes)
- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Restrict Access to APIs](/api-auth/restrict-access-api)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)

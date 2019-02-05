---
title: Permissions
description: Understand the principle of permissions and explore general examples of their use.
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
# Permissions

Different pieces of user information are often stored across a number of online resources. Users may upload and store photos with a service like Flickr, keep digital files on Dropbox, and store contacts and events in Google Calendar or on Facebook.

Often, new applications will want to make use of the information that has already been created in an online resource. To do so, the application must ask for authorization to access this information on a user's behalf. _Permissions_ (or _scopes_ in the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-3.3)) define the specific actions applications can be allowed to do on a user's behalf.

## Ways to use permissions

When an app requests permission to access a resource through an authorization server, it uses the `scope` parameter to specify what access it needs, and the authorization server uses the `scope` parameter to respond with the access that was actually granted (if the granted access was different from what was requested).

Generally, you use permsissions in three ways:

* From an [application](/applications), to verify the identity of a user and get basic profile information about the user, such as their email or picture. In this scenario, the permissions available to you include those implemented by the [OpenID Connect](/protocols/oidc) protocol, which are known as _scopes_. For details, refer to [OpenID Connect Scopes](/scopes/current/oidc-scopes).

* In an [API](/apis), to implement access control. In this case, you need to define custom permissions for your API and then identify these permissions so that calling applications can use them. For details, refer to [API Permissions](/scopes/current/api-scopes).

* From an application, to call an API that has implemented its own custom permissions. In this case, you need to know which custom permissions are defined for the API you are calling. For an example of calling a custom API from an application, see [Sample Use Cases: Permissions and Claims](/scopes/current/sample-use-cases#request-custom-API-access)

## Best practices

Understand your use case and choose the most restrictive permissions possible. 

If you are requesting permissions, make sure you ask for enough access for your application to function, but only request what you absolutely need. Are you establishing a user's identity or asking the user to allow you to interact with their data? There's a big difference between importing a user's Facebook profile information and posting to their wall. By only requesting what you need, you are more likely to gain user consent when required since users are more likely to grant access for limited, clearly-specified permissions. 

Similarly, when creating custom permissions for an API, consider what levels of granular access applications may need and design accordingly.

## Requested permissions versus granted permissions

In certain cases, users get to consent to the access being requested. While usually the permissions returned will be identical to those requested, users can edit granted permissions (both during initial consent and sometimes after, depending on the resource), thereby granting an app less access than it requested. 

As an application developer, you should be aware of this possibility and handle these cases in your app. For example, your app could warn the user that they will see reduced functionality. It could also send the user back through the authorization flow to ask for additional permissions. But again, remember that when asked for consent, users can always say no.

::: note
By default, Auth0 skips user consent for first-party applications, which are applications that are registered under the same Auth0 domain as the API they are calling; however, you can configure your API in Auth0 to require user consent from first-party applications. Third-party applications, which are external applications, require user consent.
:::

## Keep reading

- [OpenID Connect Permissions](/scopes/current/oidc-scopes)
- [API Permissions](/scopes/current/api-scopes)
- [Sample Use Cases: Permissions and Claims](/scopes/current/sample-use-cases)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [How to Restrict Application or User Requests for API Permissions](/api-auth/restrict-requests-for-scopes)
- [SPA + API Architecture Scenario: Restrict API Permissions Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)

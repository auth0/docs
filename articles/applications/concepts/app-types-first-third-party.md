---
description: Understand the difference between confidential and public application types.
topics:
  - applications
  - application-types
contentType: concept
useCase:
  - build-an-app
---
# First-Party and Third-Party Applications

Applications can be classified as either first-party or third-party, which refers to the ownership of the application. The main difference relates to who has administrative access to your Auth0 domain.

## First-party applications

First-party applications are those controlled by the same organization or person who owns the Auth0 domain. For example, let's say you created both a Contoso API and an application that logs into `contoso.com` and consumes the Contoso API. You would register both the API and application under the same Auth0 domain, and the application would be a first-party application. By default, all applications created via the [Auth0 Dashboard](${manage_url}/#/applications) are first-party applications.

## Third-party applications

Third-party applications are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party applications enable external parties or partners to securely access protected resources behind your API. An example of this is with Facebook, let's say you created an application to get a client ID and secret to integrate with your service. That application is considered third-party because it is not owned by Facebook but a third-party that wants to integrate with Facebook APIs and services. 

::: note
All applications created through [Dynamic Client Registration](/api-auth/dynamic-client-registration) will be third-party.

Third-party applications cannot be created using the Dashboard, but must be created through the [Auth0 Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`.
:::

Third-party applications have the following unique characteristics:

- **User Consent**: You must require user consent when consuming APIs because anyone can create an application. Requiring the user to provide consent improves security.

- **ID Tokens**: [ID Tokens](/tokens/concepts/id-tokens) generated for third-party applications hold only minimum user profile information.

- **Connections**: You can only use tenant-level connections or *domain connections*. For more informations, see [Enable Third-party Applications](/applications/guides/enable-third-party-apps).

## Keep reading

* [View Application Ownership](/api/management/guides/applications/view-ownership)
* [Applications](/applications)
* [Confidential and Public Applications](/applications/concepts/app-types-confidential-public)
* [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping)
* [User consent and third-party applications](/api-auth/user-consent)
 
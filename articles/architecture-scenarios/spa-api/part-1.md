---
description: Solution Overview for the SPA + API architecture scenario
toc: true
topics:
    - architecture
    - spa
    - api-auth
    - authorization-code
    - implicit-grant
contentType: tutorial
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# SPA + API: Solution Overview

<%= include('../_includes/_api-overview-of-solution.md') %>

<%= include('../_includes/_api-authentication-and-authorization.md') %>

## Implicit Grant

OAuth 2.0 provides several __grant types__ for different use cases. In this particular use case, we want to access the API from a [client-side app](/quickstart/spa).

The SPA will use the [Implicit Flow (Implicit Grant)](/flows/concepts/implicit) to do so.

The Implicit Grant (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is similar to the grant used in the [Authorization Code Flow](/flows/concepts/auth-code), but the main difference is that the application receives an Access Token directly, without the need for an `authorization_code`. This happens because the application, which is typically a JavaScript app running within a browser, is less trusted than a web app running on the server, hence cannot be trusted with the `client_secret` (which is required in the Authorization Code Grant).

Once the user authenticates, the application receives the ID Token and Access Token in the hash fragment of the URI. The application can now use the ID Token to obtain information about the user, and Access Token to call the API on behalf of the user.

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

1. The app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#implicit-grant)), so the user can authenticate.

1. Auth0 authenticates the user. The first time the user goes through this flow, and if the application is a third party application, a consent page will be shown where the permissions, that will be given to the Client, are listed (for example, post messages, list contacts, and so forth).

1. Auth0 redirects the user to the app with an Access Token (and optionally an ID Token) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment.

1. The app can use the Access Token to call the API on behalf of the user.

## Authorization Extension

The [Auth0 Authorization Extension](/extensions/authorization-extension) allows you to configure <dfn data-key="role">Roles</dfn>, Groups, and Permissions, and assign them to Users.

- The Permissions are actions that someone can do. For ExampleCo's business needs, we will configure four Permissions: read, create, delete and approve timesheets.
- The Roles are collections of Permissions. ExampleCo's timesheets app will be used by two kinds of users (employees and managers), with different permissions each, so we will configure two Roles: employee and manager.

Since this covers our business case we will not create any Groups.

The Authorization Extension will create a [Rule](/rules) which will read the Roles, Groups, and Permissions assigned to a user and add this information to the [User profile](/rules/current#rule-syntax) during the authentication flow. We can use this information to ensure that the Access Token issued to a user only contains scopes which are allowed. We can later on proceed to customize our app, like disabling the Approve Timesheets functionality if the user does not have the required permission to do so.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/spa-api"], next: ["2. Auth0 Configuration", "/architecture-scenarios/spa-api/part-2"]
}) %>

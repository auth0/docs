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

## Authorization Code Flow with Proof Key for Code Exchange (PKCE)

Because SPAs are public clients and cannot securely store a Client Secret since the source code is available to the browser, you will want to use the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce) with your SPA. 

With this flow, the calling application requests an Access Token over HTTPS with a transformative value&mdash;a Code Verifier (or another type of client secret)&mdash;that can be verified by the authorization server. 


## Implicit Flow

The original specifications for OAuth2 introduced the Implicit Flow, a way for SPAs without a backend to obtain Access Tokens and call APIs directly from the browser. However, mitigation strategies are necessary to use the Implicit Flow because tokens are returned in the URL directly from the authorization endpoint as opposed to the token endpoint. 

We recommend using the [Authorization Code Flow with PKCE](https://auth0.com/docs/flows/authorization-code-flow) rather than Implicit Flow; however, if you are unable to update to the recommended flow, you should implement necessary mitigations to combat the risks. 

## Authorization Extension

The [Auth0 Authorization Extension](/extensions/authorization-extension) allows you to configure <dfn data-key="role">Roles</dfn>, Groups, and Permissions, and assign them to Users.

- The Permissions are actions that someone can do. For ExampleCo's business needs, we will configure four Permissions: read, create, delete and approve timesheets.
- The Roles are collections of Permissions. ExampleCo's timesheets app will be used by two kinds of users (employees and managers), with different permissions each, so we will configure two Roles: employee and manager.

Since this covers our business case we will not create any Groups.

The Authorization Extension will create a [Rule](/rules) which will read the Roles, Groups, and Permissions assigned to a user and add this information to the [User profile](/rules/current#rule-syntax) during the authentication flow. We can use this information to ensure that the Access Token issued to a user only contains scopes which are allowed. We can later on proceed to customize our app, like disabling the Approve Timesheets functionality if the user does not have the required permission to do so.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/spa-api"], next: ["2. Auth0 Configuration", "/architecture-scenarios/spa-api/part-2"]
}) %>

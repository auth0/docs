---
description: Learn about Auth0 advanced features
toc: true
public: false
topics:
  - auth0-101
  - auth0-basics
contentType: concept
useCase:
  - strategize
  - development
  - get-started
---
# What's Next? - UNDER CONSTRUCTION

## An Extensible Platform

Auth0 offers several ways to extend the platform's functionality:

- **Rules**: [Rules](/rules) are functions written in JavaScript or C#, that are executed in Auth0 just after successful authentication and before control returns to your app. Rules can be chained together for modular coding and can be turned on and off individually. They can be used for Access Control, Webhooks, Profile Enrichment, <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn>, and many other things.

- **Hooks**: [Hooks](/hooks) allow you to customize the behavior of Auth0 using Node.js code that is executed against extensibility points (which are comparable to webhooks that come with a server). They are secure, self-contained functions associated with specific [extensibility points](/hooks/extensibility-points) of the Auth0 platform. Auth0 invokes the Hooks at runtime to execute your custom logic. Hooks will eventually replace Rules, the current Auth0 extensibility method. Currently, you can use both Hooks and Rules, but Auth0 will implement new functionality in Hooks.

- **Extensions**: [Auth0 Extensions](/extensions) enable you to install applications or run commands/scripts that extend the functionality of the Auth0 base product. You can either use one of the [pre-defined extensions](/extensions#using-an-auth0-provided-extension), provided by Auth0, or [create your own](/extensions#creating-your-own-extension). Some of the actions you can do with extensions are manage the authorizations for users (using groups, <dfn data-key="role">roles</dfn>, and permissions), import/export users, export logs to other services, deploy scripts from external repositories, and more.
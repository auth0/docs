---
description: Auth0 features that provide extensibility to your authentication and authorization flows.
topics:
  - extensibility
  - rules
  - hooks
  - extensions 
contentType:
  - index
useCase:
  - extensibility-rules
  - extensibility-hooks
  - extensibility-extensions
---

# Extensibility

## Rules

[Rules](/rules) are functions written in JavaScript that are executed in Auth0 as part of the transaction every time a user authenticates to your application. Rules allow you to easily customize and extend Auth0's capabilities. They can be chained together for modular coding and can be turned on and off individually.

Use Rules to:
- [Add roles to a user based on conditions](/rules#add-roles-to-a-user)
- [Deny access based on conditions](/rules#deny-access-based-on-a-condition)
- [Enable multi-factor authentication based on context](/multifactor-authentication/custom) (such as last login, IP address of the user, location, and so on)
- [Redirect users before the authentication transaction is complete](/rules/redirect)
- [and more](https://github.com/auth0/rules/tree/master/rules)

## Hooks

[Hooks](/hooks) allow you to customize the behavior of Auth0 using Node.js code that is executed against extensibility points (which are comparable to webhooks that come with a server). Hooks allow you modularity when configuring your Auth0 implementation, and extend the functionality of base Auth0 features.

Use Hooks to:
- [Change the scopes and add custom claims to the tokens issued during user authentication](/hooks/concepts/credentials-exchange-extensibility-point)
- [Prevent user registration or add custom metadata to a new user](/hooks/concepts/pre-user-registration-extensibility-point)
- [Implement custom actions that execute asynchronously after a new user registers in your app](/hooks/concepts/post-user-registration-extensibility-point)

## Extensions

[Auth0 Extensions](/extensions) enable you to install applications or run commands/scripts that extend the functionality of the Auth0 base product.

Use Extensions to:
- [Manage user authorization using groups, roles and permissions](/extensions/authorization-extension)
- [Monitor your AD/LDAP connectors](/extensions/adldap-connector)
- [Import or export existing users](/extensions/user-import-export)
- [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service)
- [Deploy rules, and other scripts from external repositories](/extensions#deploy-hosted-pages-rules-and-database-connections-scripts-from-external-repositories)
- [and more](/extensions#what-types-of-actions-can-i-do-with-extensions-)

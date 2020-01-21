---
title: Connection Options in the Management API
description: Learn about the options attribute when creating a connection using the Management API.
toc: true
topics:
  - connections
  - mgmt-api
contentType: reference
useCase: add-login
---
# Connection Options in the Management API

When creating or updating a connection in the Management API, you may include a variety of custom options in the `options` attribute, such as a password strength for the connection or provider-specific parameters to pass to an Identity Provider.

The following elements are available for the `options` attribute. These are optional when calling the [Create a Connection endpoint](/api/management/v2#!/Connections/post_connections) or [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id).

| Element | Type | Description |
|-|-|-|
| `validation` | object | <%= include('./_includes/_options-validation.md') %>  Used with [database connections](/connections/database). |
| `passwordPolicy` | string | The strength level of the password. Allowed values include `none`, `low`, `fair`, `good`, and `excellent`. Used with [database connections](/connections/database). |
| `password_complexity_options` | object | <%= include('./_includes/_options-prop-pw-complexity.md') %> Used with [database connections](/connections/database). |
| `password_history` | object | <%= include('./_includes/_options-prop-pw-history.md') %> Used with [database connections](/connections/database). |
| `password_no_personal_info` | object | <%= include('./_includes/_options-prop-pw-no-pers-info.md') %> Used with [database connections](/connections/database). |
| `password_dictionary` | object | <%= include('./_includes/_options-prop-pw-dictionary.md') %> Used with [database connections](/connections/database). |
| `basic_profile` | boolean | Indicates that you want basic profile information (email address and email verified flag) stored in the Auth0 User Profile. Used with social and enterprise connections. |
| `ext_profile` | boolean | Indicates that you want extended profile information (name, public profile URL, photo, gender, birthdate, country, language, and timezone) stored in the Auth0 User Profile. Used with social and enterprise connections. | 
| `ext_admin` | boolean |  Indicates that you want to store whether or not the user is a domain administrator. Used with enterprise connections. |
| `ext_is_suspended` | boolean | Indicates that you want to store whether or not a user's account is suspended. Used with enterprise connections. |
| `ext_agreed_terms` | boolean | Indicates that you want to store whether or not a user has agreed to the terms of service. Used with enterprise connections. |
| `ext_groups` | boolean | Indicates that you want to store the distribution list(s) to which a user belongs. Used with enterprise connections. |
| `ext_assigned_plans` | boolean | Indicates that you want to store a list of the Office 365 assigned plans for the user. Used with the Office 365 enterprise connection, which is deprecated; these connections should be [migrated to Azure AD connections](/integrations/office365-connection-deprecation-guide). |
| `api_enable_users` | boolean | When enabled, allows users to make calls to the Google Directory API. Used with enterprise connections. |
| `upstream_params` | object | <%= include('./_includes/_options-upstream-params.md') %> Used with connections that use [Identity Providers](/connections). |
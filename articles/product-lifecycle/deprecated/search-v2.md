---
description: Describes the deprecation of the User Search v2.
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---
# User Search v2 Deprecation

User search v2 has reached its end of life as of **June 30, 2019**. We highly recommend migrating user search functionality to search engine v3 (`search_engine=v3`) as soon as possible.

## Are you affected?

### Impacted SDKs

The following SDKs make use of the User Search engine. If you are using them, make sure you are using the versions listed below (or a later version), and pass the `search_engine=v3` parameter when performing user search operations.

SDK | Version with support for v3 | Impacted methods | Considerations
----|-----------------------------|------------------|---------------
[Auth0 Java](https://github.com/auth0/auth0-java) | 1.8.0 | com.auth0.client.mgmt.UsersEntity.list | Provide a `UserFilter` with `withSearchEngine("v3")`
[Auth0 Python](https://github.com/auth0/auth0-python) | 3.0.0 | management.Users.list | Provide the parameter `search_engine='v3'`
[Auth0 Node](https://github.com/auth0/node-auth0) | 2.0.0 | UsersManager.getAll, ManagementClient.getUsers | Provide the parameter `search_engine:'v3'`
[Auth0 .NET](https://github.com/auth0/auth0.net) | 3.0.0 or 4.0.0 | Auth0.ManagementApi.IUsersClient.GetAllAsync | Provide a `GetUsersRequest` object with `SearchEngine` = `"v3"`
[Auth0 PHP](https://github.com/auth0/auth0-php) | 5.2.0 | Auth0.SDK.API.Management.Users.getAll | Provide the parameter `'search_engine' => 'v3'`
[Auth0 Ruby](https://github.com/auth0/ruby-auth0) | 4.5.0 | Auth0.Api.V2.Users.users | Provide the parameter `search_engine: 'v3'`

### Impacted Extensions

The following Extensions make use of the User Search engine. If you have them installed, make sure you are using the versions listed below (or a later version).

Extension | Version with support for v3 | Considerations
----------|-----------------------------|---------------
[Authorization Extension](/extensions/authorization-extension/v2) | 2.5.0 | If you are using an earlier version, you need to manually update the extension from the [Extensions](https://manage.auth0.com/#/extensions) page.
[Delegated Administration](/extensions/delegated-admin/v3) | 3.1 | If you are using an earlier version, you need to manually update the extension from the [Extensions](https://manage.auth0.com/#/extensions) page. The `SEARCH_ENGINE` configuration setting no longer exists in 3.1, because only User Search v3 is available.

## Migration

See the [Migration Guide: User Search v3](/product-lifecycle/migration/guides/migrate-search-v2-v3) for details.

<%= include('./_contact-support') %>

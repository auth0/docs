In addition to hosting the [User Profile](/architecture-scenarios/implementation/${platform}/${platform}-profile-mgmt), Auth0 also has the capability to both [proxy](#identity-store-proxy) your own legacy identity store and provide a secure Auth0 hosted replacement. Both of these capabilities are supported via the use of Auth0 [Database Connections](/identityproviders#database-and-custom-connections). If you decide to use Auth0 as a replacement for your legacy identity store then you can migrate users either all at once with [Bulk Migration](users/concepts/overview-user-migration#bulk-user-imports-with-the-management-api), or progressively with [Automatic Migration](users/concepts/overview-user-migration#automatic-migrations).  

::: panel Best Practice
Customers often opt for a two-stage approach to user migration, using Automatic Migration first to migrate as many users as possible, then using Bulk Migration for the users that remain. See [User Migration Scenarios](users/references/user-migration-scenarios) for more information. 
:::

Automatic Migration is preferred as it allows users to be migrated individually and also allows them to retain their existing password in almost all situations. For Bulk Migration, we recommend using the [Management API](api/management/v2#!/Jobs/post_users_imports) over the [User Import/Export extension](/users/concepts/overview-user-migration#migrate-users-with-the-user-import-export-extension) in all but the most simple cases, as the Management API provides for greater flexibility and control.

With Bulk Migration users typically need to **reset their password once migration is complete**, _unless_ passwords are stored hashed in your legacy identity store using bcrypt (or you can generate them in bcrypt form). In this case, you _may_ be able to use bulk migration and **preserve user passwords** as part of the process, depending on the bcrypt algorithm and the number of salt rounds used. See [Bulk Import Database Schema Examples](/users/references/bulk-import-database-schema-examples) for more information. 

::: panel Best Practice
<%= include('../../_includes/_rate-limit-policy.md') %>
:::

### Identity store proxy

Auth0 Database Connection types can also be configured to proxy an existing (legacy) identity store. If you need to keep user identities defined in your own legacy store - for example, if you have one or more business critical applications that you can’t migrate to Auth0, but which still need access to these identities - then you can easily integrate with Auth0. See [Authenticate Users Using Your Database](/connections/database/custom-db) for more information.

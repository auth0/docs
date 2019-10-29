---
title: Custom Database Connections Overview
description: Learn about authenticating users using your database as an identity provider.
toc: true
topics:
    - connections
    - custom-database
    - scripts
contentType: concept
useCase:
    - custom-db-connections
    - legacy-authentication
---
# Custom Database Connections Overview

<%= include('./_includes/_panel-feature-availability') %>

<%= include('../../../_includes/_webtask') %>

Use a custom database connection when you want to provide access to your own independent (legacy) identity data store for the following purposes:

* **Authentication**: Use your database as an identity provider in Auth0 to authenticate users. (Refered to as *legacy authentication*.)
* **Import Users**: Use automatic migration (*trickle* or *lazy* migration)
* **Proxy access to an Auth0 tenant**: Use Auth0 multi-tenant architecture. 

You can create and configure a custom database connection by doing one of the following tasks:

1. Use the [Create connections](/api/management/v2#!/Connections/post_connections) Management API endpoint with the `auth0` strategy.

2. Navigate to the [Connections > Database](${manage_url}/#/connections/database) page in the [Auth0 Dashboard](${manage_url}/), create the connection, and then enable the **Use my own database** option to allow database action script editing. 

![Enable Custom Database Use My Own Database Option](/media/articles/dashboard/connections/database/connections-db-settings-custom-1.png)

## How it works

As shown in the diagram below, you use custom database connections as part of Universal Login workflow in order to obtain user identity information from your own, legacy identity store. 

![Custom Database Connections Anatomy](/media/articles/connections/database/custom-database-connections.png)

In addition to artifacts common for all [database connection](/connections/database) types, a custom database connection allows you to configure action scripts: custom code that’s used when interfacing with your legacy identity store. Auth0 provides [custom database action script templates](/connections/database/custom-db/templates) for configuration, and the ones you use will depend on whether you are creating a custom database connection for legacy authentication or for automatic migration.

::: panel Best practice
Action scripts can be implemented as anonymous functions, however anonymous functions make it hard in debugging situations when it comes to interpreting the call-stack generated as a result of any exceptional error condition. For convenience, we recommend providing a function name for each action script.
:::

### Legacy authentication scenario

In a legacy authentication scenario, no new user record is created; the user remains in the legacy identity store and Auth0 will always use the identity it contains when authenticating the user. 

::: note
Custom database connections are also used outside of Universal Login workflow. For example, a connection's `changePassword` action script is called when a password change operation occurs for a user that resides in a legacy identity store.
:::

### Automatic migration scenario

During automatic or trickle migration, Auth0 creates a new user in an identity store (database) managed by Auth0. From then on, Auth0 always uses the identity in the Auth0 managed identity store for authenticating the user. For this to occur, first Auth0 requires the user be authenticated against the legacy identity store and only if this succeeds will the new user be created. The new user will be created using the same id and password that was supplied during authentication.

::: panel Best practice
Creation of a user in an automatic migration scenario typically occurs after the `login` action script completes. We therefore recommend that you do not attempt any deletion of a user from a legacy identity store as an inline operation (i.e., within the `login` script) but perform the deletion as an independent process. This will prevent accidental deletion of a user should an error condition occur during the migration process. 
:::

In an automatic migration scenario, users remain in the legacy identity store and can be deleted or archived if required. One side effect of this can occur if a user is deleted from Auth0 but still remains present in the legacy identity store. In this case, a login actioned by the deleted user could result in either the `login` and/or `getUser` script being executed and the user being migrated from the legacy identity store once again. 

::: panel Best practice
We recommend marking any legacy user identity as having been migrated before either `login` or `getUser` completes and prior to any eventual legacy store deletion.
:::

## Size

The total size of implementation for any action script should not exceed 100 kB. The larger the size the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. 

::: note
The 100 kB limit does not include any `npm` modules that may be referenced as part of any require statements. 
:::

## Environment

Action scripts execute as a series of called JavaScript functions in an instance of a serverless Webtask container. As part of this, a specific environment is provided, together with a number of artefacts supplied by both the Webtask container and the Auth0 authentication server (your Auth0 tenant) itself.  

### `npm` modules

Auth0 serverless Webtask containers can make use of a [wide range of `npm` modules](https://auth0-extensions.github.io/canirequire/); `npm` modules not only reduce the overall size of action script code implementation, but also provide access to a wide range of pre-built functionality.

Many publicly available `npm` modules are supported out-of-the-box. The list has been compiled and vetted for any potential security concerns. If you require an `npm` module that is not supported out-of-the-box, then you can make a request in the [Auth0 support portal](https://support.auth0.com/) or to your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the user of `npm` modules from private repositories.

### Variables

Auth0 action scripts support environment variables, accessed via what is known as the globally available [`configuration` object](/connections/database/custom-db/create-db-connection#add-configuration-parameters). 

::: panel Best practice
The `configuration` object should be treated as read-only, and should be used for storing sensitive information such as credentials or API keys for accessing external identity stores. This mitigates having security sensitive values hard coded in an action script. 
:::

The configuration object can also be used to support whatever [Software Development Life Cycle (SDLC)](/dev-lifecycle/setting-up-env) strategies you employ by allowing you to define variables that have tenant specific values. This mitigates hard coded values in an action script which may change depending upon which tenant is executing it.

### `global` object

Auth0 serverless Webtask containers are provisioned from a pool that's associated with each Auth0 tenant. Each container instance makes available the `global` object, which can be accessed across all action scripts that execute within the container instance. The `global` object acts as a global variable that’s unique to the container, and that can be used to define information or functions used across all action scripts that run in the container instance.

This means that the `global` object can be used to cache expensive resources as long as those resources are not user-specific. For example, you could use it to store an Access Token for a third-party (e.g., logging) API that provides non-user-specific functionality. Or, you can store an Access Token to your own non-user-specific API defined in Auth0 and obtained via the [Client Credentials](/flows/concepts/client-credentials) flow.

::: warning
An action script may execute in any of the container instances already running, or in a newly created container instance (which may subsequently be added to the pool). There is no container affinity for action script execution in Auth0. This means that you should avoid storing any user-specific information in the `global` object, and should always ensure that any declaration made within the `global` object provides for initialization too.
:::

Each time a Webtask container is recycled, or for each instantiation of a new Webtask container, the `global` object it defines is reset. Thus, any declaration of assignment within the `global` object associated with a container should also include provision for initialization too. 

::: panel Best practice
To provide performance flexibility, serverless Webtask containers are provisioned in Auth0 on an ad-hoc basis and are also subject to various recycle policies. In general, we recommend that you do not consider the life of a `global` object to be anything more than 20 minutes.
:::

## Security

### Access legacy identity storage via custom API

Protecting legacy identity storage from general access is a recommended best practice. Exposing a database directly to the internet, for example, can be extremely problematic: database interfaces for SQL and the like are extremely open in terms of functionality, which violates the principle of least privilege when it comes to security.

::: panel Best practice
We recommend that you implement an API to provide least privilege to your legacy identity store (database), rather than simply opening up general access via the internet. 
:::

The alternative is to create a simple (custom) API, protected via use of an access token, that each action script can call. This would act as the interface to the legacy identity store. Client credentials grant flow can then be used to obtain an access token from within a script, and this can subsequently be cached for reuse in the `global` object in order to improve performance. The API can then provide a discrete number of protected endpoints that perform only the legacy management functionality required (e.g., `read user`, `change password`, etc.) 

::: panel Best practice
By default, Auth0 will give you a token for any API if you authenticate successfully and include the appropriate audience. Restricting access to the legacy identity store API by restricting access token allocation via use of a Rule, will prevent unauthorized usage and mitigate a number of attack vector scenarios, such as where redirect to `/authorize` is intercepted and the audience to the API is added.
:::

### Whitelist access to legacy identity storage

Whether managing access to a legacy identity store via custom API, or using the native interface provided, restricting access to the list of IP addresses associated with your Auth0 tenant. Whitelisting constrains access to the legacy identity store ensuring that only custom database action scripts defined in Auth0 are permitted. 

::: warning
The Auth0 IP address whitelist is shared amongst all Auth0 tenants defined to a region. Never use the whitelist as the sole method of securing access to your legacy identity store; doing so could open up potential security vulnerabilities allowing unauthorized access to your users. 
:::

## Keep reading

* [Create Custom Database Connections](/connections/database/custom-db/create-db-connection)
* [Custom Database Action Script Templates](/connections/database/custom-db/templates)
* [Handle Errors and Troubleshoot Your Custom DB Scripts](/connections/database/custom-db/error-handling)
* [Migrate Your Users to Auth0](/users/concepts/overview-user-migration)

---
title: Custom Database Connections
description: Learn about authenticating users using your database as an identity provider.
classes: topic-page
topics:
    - connections
    - custom-database
    - scripts
contentType: concept
useCase:
    - custom-db-connections
    - authentication
    - database-action-scripts
---
# Custom Database Connections

<%= include('../_includes/_feature-availability') %>

With [Extensibility](/topics/extensibility) you can add custom logic in Auth0 to build out last mile solutions for Identity and Access Management (IdAM). Auth0 extensibility comes in several forms: Rules, Hooks, and scripts for both [custom database connection](/connections/database/custom-db) and custom database connection migration. Each is implemented using `Node.js` running on the Auth0 platform in an Auth0 Tenant. Auth0 extensibility executes at different points in the IdAM pipeline: 

* **Rules** run when artifacts for user authenticity are generated (i.e., an ID Token in OIDC), an Access Token in OAuth 2.0, or an assertion in SAML. 
* **Hooks** provide additional extensibility for when there is an exchange of non-user related artifacts, and for when user identities are created (see both pre user registration and post user registration Hooks for further details). 
* **Custom database scripts** can be used to integrate with an existing user identity store, or can be used where automatic user migration (from an independent legacy identity store) is required. 

Whatever the use case, Auth0 extensibility provides comprehensive and sophisticated capability to tailor IdAM operations to your exact requirements. However, if not used in the right way, this can open up the potential for improper or unintended use which can lead to problematic situations down the line. In an attempt to address matters ahead of time, this article provides best practice guidance to both designers and implementers, and we recommend reading it in its entirety at least once, even if you've already started your journey with Auth0.    

Use a custom database connection when you want to provide access to your own independent (legacy) identity store for the following purposes:

* **Authentication**: Use your database as an identity provider in Auth0 to authenticate users. (Refered to as *legacy authentication*.)
* **Import Users**: Use automatic migration (*trickle* or *lazy* migration)
* **Proxy access to an Auth0 tenant**: Use Auth0 multi-tenant architecture. 

You typically create and configure custom database connections in the [Auth0 dashboard](${manage_url}). You create a database connection and then toggle **Use my own database** to enable database action script editing. Alternatively, you can create and configure a custom database connection using the Auth0 Management API with the `auth0` strategy. 

![Custom Database Connections Dashboard](/media/articles/connections/database/custom-database.png)

## Anatomy

As depicted in the diagram below, you use custom database connections as part of Universal Login workflow in order to obtain user identity information from your own, legacy identity store. This can be for either (a) authentication - often referred to as legacy authentication - or (b) user import via [automatic migration](/users/guides/configure-automatic-migration) (a.k.a trickle or lazy migration). For the purpose of the remaining guidance we will refer to any authentication against an external identity store as “legacy authentication”.

![Custom Database Connections Anatomy](/media/articles/connections/database/custom-database-connections.png)

In addition to artifacts common for all database connection types, a custom database connection allows you to configure action scripts: custom code that’s used when interfacing with your independent (legacy) identity store. For the purpose of this guide, we will refer to any external identity storage as a *legacy identity store*. The scripts available for configuration are described in the [Execution](#execution) section, and will depend on whether you are creating a custom database connection for legacy authentication or for automatic migration.

::: panel Best practice
Action scripts can be implemented as anonymous functions, however anonymous functions make it hard in debugging situations when it comes to interpreting the call-stack generated as a result of any exceptional error condition. For convenience, we recommend providing a function name for each action script, and have supplied some recommended names as part of the Execution section below.
:::

During automatic - a.k.a. Trickle - migration, Auth0 will create a new user in a (database) identity store which is managed by Auth0. From then on Auth0 will always use identity in the Auth0 managed identity store authenticating the user. For this to occur, Auth0 will first require the user be authenticated against the legacy identity store and only if this succeeds will the new user be created. The new user will be created using the same id and password that was supplied during authentication.

::: panel Best Practice
Creation of a user in an automatic migration scenario typically occurs after the login action script completes. We therefore recommend that you do not attempt any deletion of a user from a legacy identity store as an inline operation (i.e. within the login script) but prefer to do this - where required - as an independent process. This will prevent accidental deletion of a user should an error condition occur during the migration process. 
:::

In a legacy authentication scenario, no new user record is created: Auth0 will always use the identity contained in the legacy identity store when authenticating the user. In either case, the user remains in the legacy identity store and can be deleted or archived if required. 

::: note
Custom database connections are also utilized outside of Universal Login workflow. For example, a connections’ changePassword action script will be called whenever a password change operation occurs for a user that resides in a legacy identity store.
:::

## Size

As a best practice, we recommend that the total size of implementation for any action script should not exceed 100 kB. The larger the size the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any npm modules that may be referenced as part of any require statements. 

## Environment

Action scripts execute as a series of called JavaScript functions in an instance of a serverless Webtask container. As part of this, a specific environment is provided, together with a number of artefacts supplied by both the Webtask container and the Auth0 authentication server (a.k.a. your Auth0 tenant) itself.  

### `npm` modules

Auth0 serverless Webtask containers can make use of a wide range of npm modules; npm modules not only reduce the overall size of action script code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available npm modules are supported out-of-the-box. This list has been compiled and vetted for any potential security concerns. If you require an `npm` module that is not supported out-of-the-box, then a request can be made via the Auth0 support portal or via your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the user of npm modules from private repositories.

### Variables

Auth0 action scripts supports the notion of environment variables, accessed via what is defined as the globally available configuration object. The configuration object should be treated as read-only, and should be used for storing sensitive information - such as credentials or API keys for accessing external identity stores. This mitigates having security sensitive values hard coded in an action script. 

The configuration object can also be used to support whatever Software Development Life Cycle (SDLC) best practice strategies you employ by allowing you to define variables that have tenant specific values. This mitigates hard code values in an action script which may change depending upon which tenant is executing it.

### `global` object

Auth0 serverless Webtask containers are provisioned from a pool that's associated with each Auth0 tenant. Each container instance makes available the global object, which can be accessed across all action scripts that execute within the container instance. The global object acts as a global variable and can be used to define information, or to even define functions, that can be used across all action scripts (that run in the container) irrespective of the execution instance.

The global object can also be used to cache expensive resources, such as an Access Token for a third-party (e.g., logging) API that provides non user-specific functionality or an Access Token to your own API defined in Auth0 and obtained by using Client Credentials flow.

For each instantiation of a new Webtask container the global object is reset. Thus, any declaration within the global object should also include provision for initialization.

## Security

### Access legacy identity storage via custom API

Protecting legacy identity storage from general access is a recommended best practice. Exposing a (legacy identity) database directly to the internet, for example, can be extremely problematic: database interfaces for SQL and the like are extremely open in terms of functionality, which violates the principle of least privilege when it comes to security.

::: panel Best practice
We recommend that you implement an API to provide least privilege to your legacy identity storage, rather than simply opening up general access via the internet. 
:::

The alternative is to create a simple (custom) API - protected via use of an Access Token - that each action script can call. This would act as the interface to the legacy identity store. Client credentials grant flow can then be used to obtain an access token from within a script, and this can be subsequently cached for re-use within the global object in order to improve performance. The API can then provide a discrete number of protected endpoints that perform only the legacy (identity) management functionality required - e.g. read user, change password, etc. 

By default, Auth0 will give you a token for any API if you authenticate successfully and include the appropriate audience. Restricting access to the legacy identity store API by restricting access token allocation via use of a Rule, will prevent unauthorized usage and will mitigate a number of attack vector scenarios, such as where redirect to /authorize is intercepted and the audience to the API is added.

::: panel Best practice
Restricting access to the API via Rule will mitigate attack vector scenarios - such as where redirect to /authorize is intercepted and the audience to the API is added - and will ensure that only access using specific client credentials is granted.
:::

### Whitelist access to legacy identity storage

Whether managing access to legacy identity storage via custom API, or using the native interface provided, restricting access to the list of IP addresses associated with with your Auth0 tenant. Whitelisting in this manner constrains access to the legacy identity store, ensuring that only custom database actions scripts defined in Auth0 are permitted. 

::: warning
The Auth0 IP address whitelist is shared amongst all Auth0 tenants defined to a region. Never use the whitelist as the sole method of securing access to your legacy identity store; doing so could open up potential security vulnerabilities allowing unauthorized access to your users. 
:::

## Keep reading

* 


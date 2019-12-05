---
title: Custom Database Action Script Environment Best Practices
description: Learn about best practices for the custom database action script environment.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Action Script Environment Best Practices

Action scripts execute as a series of called JavaScript functions in an instance of a serverless Webtask container. As part of this, a specific environment is provided, together with a number of artifacts supplied by both the Webtask container and the Auth0 authentication server (your Auth0 tenant) itself.

## `npm` modules

Auth0 serverless Webtask containers can make use of a wide range of [`npm`](https://www.npmjs.com/) modules; `npm` modules not only reduce the overall size of action script code implementation, but also provide access to a wide range of pre-built functionality.

By default, a large list of publicly available `npm` modules are [supported out-of-the-box](https://auth0-extensions.github.io/canirequire/). This list has been compiled and vetted for any potential security concerns. If you require an `npm` module that is not supported out-of-the-box, then a request can be made via the [Auth0 support portal](https://support.auth0.com/) or your Auth0 representative. Auth0 will evaluate your request to determine suitability. There is currently no support in Auth0 for the user of npm modules from private repositories.

## Variables

Auth0 action scripts support the notion of environment variables, accessed via what is defined as the globally-available [`configuration`](/connections/database/custom-db/create-db-connection#step-3-add-configuration-parameters) object. The `configuration` object should be treated as read-only and should be used for storing sensitive information, such as credentials or API keys for accessing external identity stores. This mitigates having security-sensitive values hard coded in an action script. 

The `configuration` object can also be used to support whatever [Software Development Life Cycle (SDLC)](/dev-lifecycle/setting-up-env) best practice strategies you employ by allowing you to define variables that have tenant-specific values. This mitigates hard coded values in an action script, which may change depending upon which tenant is executing it.

## `global` object

Auth0 serverless Webtask containers are provisioned from a pool that is associated with each Auth0 tenant. Each container instance makes available a global object, which can be accessed across all action scripts that execute within it (the container instance). The global object acts as a global variable that is unique to the container and that can be used to define information&mdash;or even functions&mdash;that can be used across all action scripts that run in it (the container instance).

This means that the global object can be used to cache expensive resources, as long as those resources are not user-specific. For example, an Access Token for a third-party (e.g., logging) API that provides non user-specific functionality could be stored. Or it could be used to store an Access Token to your own non user-specific API defined in Auth0 and obtained via use of the Client Credentials flow.

::: warning
An action script may execute in any of the container instances already running or in a newly-created container instance (which may subsequently be added to the pool). There is no container affinity *per-se* for action script execution in Auth0. This means that you should avoid storing any user-specific information in the global object and should always ensure that any declaration made within the global object provides for initialization too.
:::

Each time a Webtask container is recycled, or for each instantiation of a new Webtask container, the global object it defines is reset. Thus, any declaration of assignment within the global object associated with a container should also include provision for initialization. To provide performance flexibility, serverless Webtask containers are provisioned in Auth0 on an ad-hoc basis and are also subject to various recycle policies. In general, we recommend that you do not consider the life of a global object to be anything more than 20 minutes.

## Custom database connection environment checklist

* Make sure that your database has the appropriate fields to store user profiles attributes, such as **id**, **nickname**, **email**, and **password**. See [Normalized User Profile](/users/normalized) for details on Auth0's user profile schema and the expected fields. Also, see [Update User Profile Using Your Database](/users/guides/update-user-profiles-using-your-database) for more information.
* You can use return errors resulting from your custom database connection for troubleshooting purposes. See [Custom Database Error Handling and Troubleshooting](/connections/database/custom-db/error-handling) for basic troubleshooting steps.
* The `id` (or alternatively `user_id`) property in the returned user profile will be used by Auth0 to identify the user. If you are using multiple custom database connections, then the **id** value **must be unique across all the custom database connections** to avoid **user ID** collisions. Our recommendation is to prefix the value of **id** with the connection name (omitting any whitespace). See [Identify Users](/users/normalized/auth0/identify-users) for more information on user IDs.
* Latency will be greater compared to Auth0-hosted user stores.
* The database or service must be reachable from the Auth0 servers. You will need to configure inbound connections if your store is behind a firewall.

## Keep reading

<%= include('../../_includes/_topic-links', { links: [
  'best-practices/custom-db-connections/execution',
  'best-practices/error-handling',
  'best-practices/debugging',
  'best-practices/testing',
  'best-practices/deployment',
  'best-practices/performance',
  'best-practices/custom-db-connections/security'
] }) %>
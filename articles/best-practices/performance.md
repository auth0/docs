---
description: Best practices for performance.
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
  - rules
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
  - rules
---

# Performance

Rules execute as part of a pipeline where artifacts for authenticity are generated, as described in the [Anatomy](#anatomy) section above. As such, an enabled rule will execute for every login operation (interactive or otherwise), every silent authentication, and every time a user-credentials-related Access Token is generated for an API call. This means that even in small scale deployments, performance can be a concern, which will only be exacerbated as the scale of deployment increases.

## Avoid unnecessary execution

Prefer to implement execution based on conditional logic. For example, to run a rule for only specific applications, check on a specific [`clientID`](/rules/references/context-object) or for specific [`clientMetadata`](/rules/references/context-object)&mdash;especially when checking against a single `clientMetadata` value, common across multiple applications. Using `clientMetadata` can also make adding new clients (as well as reading rule code) easier, especially if you have a large number of applications defined, by reducing the code changes or configuration values needed between environments.

::: note
Client metadata for an application can be set manually via the Dashboard, by going to [Application Settings -> Advanced Settings -> Application Metadata](${manage_url}/#/applications/) or programmatically via use of the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

## Exit early
For optimal performance, prefer to write rules that complete as soon as possible. For example, if a rule has three checks to decide if it should run, use the first check to eliminate the majority of cases, followed by the check to eliminate the next largest set of cases, and so on and so forth. At the end of each check, remember to execute the [callback](#callback-function) function, ideally combined with a (JavaScript) `return` in order to exit the (rule) function.

## Minimize API requests
Calls to APIs, especially calls to third-party APIs, can slow down login response time and can cause rule timeout failures due to call latency, ultimately leading to authentication error situations. We recommend keeping API requests to a minimum wherever possible within a rule and avoiding excessive calls to paid services](#limit-calls-to-paid-services). We also recommend you avoid potential security exposure by [limiting what is sent](#don-t-send-entire-context-object-to-external-services) to any API&mdash;third party or otherwise.

::: panel Best Practice
The [`global`](#global-object) object can be used to cache information from API calls, which can subsequently be used across all rules that execute in the pipeline. Prefer to use this to store information instead of repeatedly calling an API. Additionally, the `global` object can also be used to cache other information between executing rules as described in the [section](#global-object) above.
:::

### Limit calls to paid services
If you have rules that call paid services, such as sending SMS messages via Twilio, make sure that you only use those services when necessary. This not only provides performance enhancement, but also helps to avoid extra charges. To help reduce calls to paid services:

* Disallow public sign-ups to reduce the number of users who can sign up and trigger calls to paid services.
* Ensure that a rule only gets triggered for an authorized subset of users or other appropriate conditions. For example, you may want to add logic that checks if a user has a particular email domain, role/group, or subscription level before triggering the call to the paid service.

### Limit calls to the Management API
Prefer to avoid calls to the Auth0 Management API. The Auth0 Management API is [rate limited](/policies/rate-limits#management-api-v2), which will still be a consideration even when using the `auth0` object (so be sure to use it sparingly). In addition, Management API functions take varying degrees of time to perform, so will incur varying degrees of latency; executing [user search](/api/management/v2#!/Users/get_users) functionality, for example, should be kept to a minimum and performed only where absolutely necessary&mdash;even when executed via the `auth0` object.

### Avoid calls to the Management API for Connection-related details

We've recently expanded [connection-related properties](/rules/references/context-object) available to the rules [`context`](#context-object) object. You should now be able to obtain connection info from the `context` object instead of needing to call the Auth0 Management API.

By way of example, if you are using the **Check if user email domain matches configured domain** rule template, check out the latest version [on Github](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) or in the [Auth0 Dashboard](${manage_url}/#/rules/new) to see this in action. Note: the changes won't alter functionality but will improve the performance of rules that had once relied on calls to the Management API.

Removing calls to the Management API (as well as the extra call required to get the appropriate <dfn data-key="access-token">Access Token</dfn>) will make your rule code perform better and be more reliable.

## Consider use of explicit timeouts when making API calls

When calling APIs or accessing external services, consider specifying explicit timeout(s). The specific timeout value you choose will typically vary based on your user case, but in general, choosing one that's as low as possible&mdash;while bearing in mind the performance characteristics of the external service&mdash;is advised.

::: panel Best Practice
Whether you choose to employ use of explicit timeouts or you choose to opt for implicit timeout processing, always be sure to cater to [error](#error-handling) and/or [exception](#exceptions) conditions that may occur as a result of any timeout period expiration.
:::

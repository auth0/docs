---
title: Deprecation Error Reference
description: A listing of errors and descriptions relating to deprecations.
toc: true
topics:
    - errors
    - deprecation
contentType:
  - reference
  - concept
  - how-to
useCase: error-management
---
# Deprecation Error Reference

When Auth0 features are deprecated, there may be errors or notices in the tenant logs that show up to indicate that your applications are using the deprecated features. This guide will provide assistance with searching your logs for deprecation related messages as well as explanations of potential causes and resolutions for particular items.

## How to search logs for deprecation warnings

There are two different ways to search for warning messages showing usage of deprecated features: The Dashboard or the Management API. Note that in either case, the [log retention period](/logs/references/log-data-retention) is governed by the subscription level of your account.

### Search logs via the Dashboard

If your application uses a deprecated feature, a Deprecation Notice message will show up in the Logs section of the [Dashboard](${manage_url}/#/).

::: note
In order to not overwhelm the logs with repetitive messages, deprecation notes will only be shown once per hour (the first time it occurs within that hour) rather than for each authentication transaction involving the deprecated feature.
:::

Navigate to the **Logs** screen in the Dashboard. Search for deprecation related messages by entering `type:depnote` in the query box.

![Dashboard - Logs](/media/articles/errors/depnotes-logs.png)

A list of deprecation related warning messages from your logs will be shown, if any exist.

The **Description** field provides information on the particular deprecated feature used. Clicking on the link in the **Event** column for each item will show additional information such as the client id which identifies the client application using the deprecated feature.

Clicking each item and selecting **Context Data** will give you details about the item:

![Dashboard - Logs](/media/articles/errors/depnotes-legacy-lock-context-data.png)

![Dashboard - Logs](/media/articles/errors/depnotes-ssodata-context-data.png)

### Search logs via the Management API

Customers can also use the Management API to search through logs for such messages by looking for  "Type" = "depnote".

To check your logs using the Management API, go to the [Management API](/api/management/v2).

If you have not already done so, [get and get an API token](/api/management/v2/tokens).

![Management API - Token Setup](/media/articles/errors/libraries/management-api-set-token.png)

On the left, navigate to **Logs > Search log events** and then scroll down to **Parameters**.

![Management API - Logs](/media/articles/errors/libraries/management-api-logs.png)

In the **q** field enter: `type:"depnote"`

Click on the **TRY** button. If successful, you should see a screen similar to the one below.

![Management API - Logs - Results](/media/articles/errors/libraries/management-api-logs-results.png)

* The results will match one of the messages + descriptions below.
* The **Client ID** field in the results will indicate which application (client) on your tenant is using the deprecated feature.

## Deprecation Log Messages 

### up-idp-initiated

![Management API - Legacy Lock Results](/media/articles/errors/depnotes-mgt-api-legacy-lock.png)

**Error Description:** "Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application."

| Cause | Resolution |
| --- | --- |
| You are using a legacy version of embedded Lock or Auth0.js SDK. | [Migrate away from the deprecated library versions](/migrations/guides/legacy-lock-api-deprecation) as soon as possible. |
| Calling the /usernamepassword/login endpoint directly. | Use the Lock or Auth0.js libraries instead. |
| Automatic monitoring tools making requests to login page | If you have an automatic monitoring tool making requests to the login page, the tool will likely not preserve state correctly and will cause the Legacy Lock API error to occur in your logs. Use of the tool should either be discontinued, or accounted for when considering causes of the log notices. |
| Coding errors in a customized [Universal Login Page](/hosted-pages/login) | Make sure the `state` and `_csrf` fields are passed to Lock or Auth0.js in your customized login page. They are by default included in the `config.internalOptions` object, but if this is removed during customization, the error occurs. |

### ssodata

![Management API - getSSOData Results](/media/articles/errors/depnotes-mgt-api-ssodata.png)

**Error Description:** "SSOdata endpoint: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application."

| Cause | Resolution |
| --- | --- |
| Either calling the /ssodata directly or using old versions of embedded Lock or Auth0.js SDK to call a function which called the /ssodata endpoint. | [Migrate to Universal Login](/guides/login/migration-embedded-universal) or [migrate to Lock v11 or Auth0.js v9](/migrations#introducing-lock-v11-and-auth0-js-v9). |

## Legacy Lock API troubleshooting

Tenant log entries regarding the Legacy Lock API may include the referrer and information about the SDK used. This information can be used to see if any of your applications use outdated libraries.

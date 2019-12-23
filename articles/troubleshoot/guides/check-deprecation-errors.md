---
title: Check Deprecation Errors
description: Learn how to search logs for deprecation errors. 
topics:
    - errors
    - deprecation
contentType: how-to
useCase: error-management
---
# Check Deprecation Errors

There are two different ways to search for warning messages showing usage of deprecated features: The Dashboard or the Management API. Note that in either case, the [log retention period](/logs#how-long-is-log-file-data-available-) is governed by the subscription level of your account.

## Search logs using the Dashboard

If your application uses a deprecated feature, a Deprecation Notice message will show up in the Logs section of the [Dashboard](${manage_url}/#/).

::: note
So the logs aren't full of repetitive messages, they only show deprecation notes once per hour the first time it occurs within that hour.
:::

1. Navigate to the **Logs** screen in the Dashboard. 

2. Enter `type:depnote` in the query box. 

    A list of deprecation related warning messages from your logs will be shown, if any exist. The **Description** field provides information on the particular deprecated feature used. 

2. Click the link in the **Event** column for each item to show additional information such as the client id which identifies the client application using the deprecated feature.

3. Click each item and select **Context Data** for details about the item.

## Search logs using the Management API

Use the Management API to search through logs for deprecation messages by looking for  "Type" = "depnote".

1. Go to the [Management API](/api/management/v2) console.

2. If you have not already done so, [get and get an API token](/api/management/v2/tokens).

3. On the left, navigate to **Logs > Search log events** and then scroll down to **Parameters**.

4. In the **q** field enter `type:"depnote"`.

5. Click on the **TRY** button. If successful, you should see a screen similar to the one below.

![Management API - Logs - Results](/media/articles/errors/libraries/management-api-logs-results.png)

    * The results will match one of the messages + descriptions below.
    * The **Client ID** field in the results will indicate which application (client) on your tenant is using the deprecated feature.

## Deprecation log messages 

### Legacy Lock API

**Log entry**: `up-idp-initiated`

**Error Message:** "Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application."

| Cause | Resolution |
| --- | --- |
| You are using a legacy version of embedded Lock or Auth0.js SDK. | [Migrate away from the deprecated library versions](/migrations/guides/legacy-lock-api-deprecation) as soon as possible. |
| Calling the /usernamepassword/login endpoint directly. | Use the Lock or Auth0.js libraries instead. |
| Automatic monitoring tools making requests to login page | If you have an automatic monitoring tool making requests to the login page, the tool will likely not preserve state correctly and will cause the Legacy Lock API error to occur in your logs. Use of the tool should either be discontinued, or accounted for when considering causes of the log notices. |
| Coding errors in a customized [Universal Login Page](/hosted-pages/login) | Make sure the `state` and `_csrf` fields are passed to Lock or Auth0.js in your customized login page. They are by default included in the `config.internalOptions` object, but if this is removed during customization, the error occurs. |

Tenant log entries regarding the Legacy Lock API may include the referrer and information about the SDK used. This information can be used to see if any of your applications use outdated libraries.

### SSOdata endpoint

**Log entry**: `ssodata`

**Error Message:** "SSOdata endpoint: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application."

**Cause**: Either calling the `/ssodata` endpoint directly or using old versions of embedded Lock or Auth0.js SDK to call a function which called the `/ssodata` endpoint. 

**Resolution**: [Migrate to Universal Login](/guides/login/migration-embedded-universal) or [migrate to Lock v11 or Auth0.js v9](/migrations#introducing-lock-v11-and-auth0-js-v9).

---
title: Deprecation Error Reference
description: A listing of errors and descriptions relating to deprecations.
toc: true
---
# Deprecation Error Reference

When Auth0 features are deprecated, there may be errors or notices in the tenant logs that show up to indicate that your applications are using the deprecated features. This guide will provide assistance with searching your logs for deprecation related messages as well as explanations of potential causes and resolutions for particular items.

## How to search logs for deprecation warnings

There are two different ways to search for warning messages showing usage of deprecated features: The Dashboard or the Management API. Note that in either case, the [log retention period](/logs#how-long-is-log-file-data-available-) is governed by the subscription level of your account.

### Search logs via the Dashboard

If your application uses a deprecated feature, a Deprecation Notice message will show up in the Logs section of the [Dashboard](/${manage_url}).

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

If you have not already done so, [get and set up your API token](/api/management/v2/tokens#get-a-token-manually) in the API explorer.

![Management API - Token Setup](/media/articles/errors/libraries/management-api-set-token.png)

On the left, navigate to **Logs > Search log events** and then scroll down to **Parameters**.

![Management API - Logs](/media/articles/errors/libraries/management-api-logs.png)

In the **q** field enter: `type:"depnote"`

Click on the **TRY** button. If successful, you should see a screen similar to the one below.

![Management API - Logs - Results](/media/articles/errors/libraries/management-api-logs-results.png)

* The results will match one of the messages + descriptions below.
* The **Client ID** field in the results will indicate which application (client) on your tenant is using the deprecated feature.

## Deprecation Messages 

### up-idp-initiated

![Management API - Legacy Lock Results](/media/articles/errors/depnotes-mgt-api-legacy-lock.png)

**Error Description:** "Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application."

| Cause | Resolution |
| --- | --- |
| You are using a legacy version of embedded Lock or Auth0.js SDK. | [Migrate to Universal Login](/guides/login/migration-embedded-universal) if possible or [upgrade to Lock v11 / Auth0.js v9](/migrations#introducing-lock-v11-and-auth0-js-v9) (Reference guide for [Lock v11](/libraries/lock/v11) and for [Auth0.js v9](/libraries/auth0js/v9)). |
| Calling /login endpoint directly. | Migrate to use a form of the [/authorize endpoint](/api/authentication?http#login) as the start of authentication transactions. |
| Users bookmarking the login URL and trying to initiate login from that bookmarked link at a later time. | Educate users to bookmark instead the place in your app to which they want to return (such as the home page). Depending on your design choices, and if there's no valid session for the user in the app, the app will either start the authorization process or show a login button. |
| Users hitting the back button in the middle of a login transaction. | Educate users to start the login transaction again, starting from the initial login button/link, rather than using the back or forward button. |
| Calling the /usernamepassword/login endpoint directly. | Use the Lock or Auth0.js libraries instead. |

### ssodata

![Management API - getSSOData Results](/media/articles/errors/depnotes-mgt-api-ssodata.png)

**Error Description:** "SSOdata endpoint: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application."

| Cause | Resolution |
| --- | --- |
| Either calling the /ssodata directly or using old versions of embedded Lock or Auth0.js SDK to call a function which called the /ssodata endpoint. | [Migrate to Universal Login](/guides/login/migration-embedded-universal) or [migrate to Lock v11 or Auth0.js v9](/migrations#introducing-lock-v11-and-auth0-js-v9). |

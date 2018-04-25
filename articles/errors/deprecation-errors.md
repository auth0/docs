---
title: Deprecation Error Reference
description: A listing of errors and descriptions relating to deprecations.
toc: true
---
# Deprecation Error Reference

## How to search logs for deprecation warnings

There are two different ways to search for warning messages showing usage of deprecated features: The Auth0 Dashboard or the Auth0 Management API. Note that in either case, the [log retention period](/logs#how-long-is-log-file-data-available-) is governed by the subscription level of your account.

### Search logs via the Dashboard

In the [Auth0 Dashboard](/${manage_url}), if any deprecated features are being used, a "Deprecation Notice" message will show up in the **Logs** section of the dashboard. 

::: note
In order to not overwhelm the logs with repetetive messages, deprecation error messages will only be shown once per hour (the first time it occurs within that hour) rather than for each authentication transaction involving the deprecated feature.
:::

Navigate to the **Logs** screen in the Dashboard. Search for deprecation related messages by entering "type:depnote" in the query box.

![Auth0 Dashboard - Logs](/media/articles/errors/libraries/dashboard-logs.png)

A list of deprecation related warning messages from your logs will be shown, if any exist.

The **Description** field provides information on the particular deprecated feature used. Clicking on the link in the **Event** column for each item will show additional information such as the client id which identifies the client application using the deprecated feature.

### Search logs via the Management API

Customers can also use the Management API to search through logs for such messages by looking for  "Type" = "depnote".

To check your logs using the Management API, go to the [Management API](/api/management/v2).

If you have not already done so, [get and set up your API token](/api/management/v2/tokens#get-a-token-manually) in the API explorer.

![Management API - Token Setup](/media/articles/errors/libraries/management-api-set-token.png)

On the left, navigate to **Logs > Search log events** and then scroll down to **Parameters**.

![Management API - Logs](/media/articles/errors/libraries/management-api-logs.png)

In the "q" field enter: `type:"depnote"`

Click on the **TRY** button. If successful, you should see a screen similar to the one below.

![Management API - Logs - Results](/media/articles/errors/libraries/management-api-logs-results.png)

* The results will match one of the messages + descriptions below.
* The "Client ID" field will indicate which application (client) on your tenant is using the deprecated feature.

## Deprecation Messages 

### up-idp-initiated

#### Description

Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application.

#### Causes and Resolutions

* **Cause:** You are using a legacy version of embedded Lock or Auth0.js SDK. 
    * **Resolution:** [Migrate to Universal Login](/guides/login/migration-embedded-universal) if possible or [upgrade to Lock v11 / Auth0.js v9](/migrations#introducing-lock-v11-and-auth0-js-v9) (Reference guide for [Lock v11](/libraries/lock/v11) and for [Auth0.js v9](/libraries/auth0js/v9)).
* **Cause:** Calling /login endpoint directly. 
    * **Resolution:** Migrate to use a form of the [/authorize endpoint](/api/authentication?http#login) as the start of authentication transactions. 
* **Cause:** Users bookmarking the login URL and trying to initiate login from that bookmarked link at a later time. 
    * **Resolution:** Educate users to bookmark instead the place in your app to which they want to return (such as the home page). Depending on your design choices, and if there's no valid session for the user in the app, the app will either start the authorization process or show a login button.
* **Cause:** Users hitting the back button in the middle of a login transaction. 
    * **Resolution:** Educate users to start the login transaction again, starting from the initial login button/link, rather than using the back or forward button.
* **Cause:** Calling the /usernamepassword/login endpoint directly. 
    * **Resolution:** Use the Lock or Auth0.js libraries instead.

### ssodata

#### Description 

SSOdata endpoint: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application.

#### Cause and Resolution

* **Cause:** Either calling the /ssodata directly or using old versions of embedded Lock or Auth0.js SDK to call a function which called the /ssodata endpoint. 
    * **Resolution:** [Migrate to Universal Login](/guides/login/migration-embedded-universal) or [migrate to Lock v11 or Auth0.js v9](/migrations#introducing-lock-v11-and-auth0-js-v9).

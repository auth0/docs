---
description: How to handle declined authorization permissions and how to re-prompt for these permissions.
topics:
  - connections
  - social
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Handling Declined Authorization Permissions

When your users are authorizing your application, some providers (such as Facebook) allow the user to select the attributes they wish to share.

By default, this selection is made only when the user authorizes the app for the first time. If your user chooses to *not* allow certain attributes (such as their email) that are required by your application, the user will not be able to access your application.

In such instances, your user will need to be re-prompted to grant permission to the required attribute(s) to login.

## How to re-prompt for permissions

By setting the **prompt=consent** parameter when calling the [/authorize](/api/authentication/reference#social) endpoint of the [Authorization API](/api/authentication), your user will be prompted again to grant permissions for your application.

This parameter can also be set using <dfn data-key="lock">Lock</dfn> as an [Authentication Parameter](/libraries/lock/sending-authentication-parameters) with **prompt: 'consent'**.

Alternatively, you can set this with [Auth0.js](https://github.com/auth0/auth0.js) using **prompt: 'consent'**.

## Learn More

::: next-steps
* [Click here to learn more about handling declined Facebook permissions.](https://developers.facebook.com/docs/facebook-login/handling-declined-permissions)
* [Click here to learn more about GitHub scopes](https://developer.github.com/v3/oauth/#scopes)
:::
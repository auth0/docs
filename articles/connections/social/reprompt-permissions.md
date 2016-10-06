---
description: How to handly declinded authorization permissions and how to reprompt for this permissions.
---

# Handling Declined Authorization Permissions

When your users are authorizing your application some providers such as Facebook allow the user to be selective over which attributes they wish to share. By default, this selection is only made when the user is first authorizing the app. If your user chooses not to allow certain attributes which are required by your application(such as email) the user will not be able to access your application. Your user will need to be reprompted for permissions and grant the required attribute to be able to login.

## How to Reprompt for Permissions

By setting the `prompt=consent` parameter for [/authorize](/api/authentication#!#get--authorize_social) in the [Authorization API](/api/authentication), your user will be prompted to grant permissions for your application again.

This parameter can also be set using [Lock](/libraries/lock) as an [Authentication Parameter](/libraries/lock/sending-authentication-parameters) with `prompt: 'consent'`.

Or it can be set with [Auth0.js](https://github.com/auth0/auth0.js), with `prompt: 'consent'`.

## Learn More
[Click here to learn more about handling declined Facebook permissions.](https://developers.facebook.com/docs/facebook-login/handling-declined-permissions)
[Click here to learn more about GitHub scopes](https://developer.github.com/v3/oauth/#scopes)

---
title: Track consent with custom UI
description: This tutorial describes how you can use either Auth0.js or the Auth0 APIs to capture consent information when you use your own custom UI for logins
toc: true
---
# Track Consent with Custom UI

In this tutorial we will see how you can use Auth0.js or the Auth0 APIs to ask for consent information and save the input at the user's [metadata](/metadata).

## Overview

We will configure a simple JavaScript Single Page Application and a database connection (we will use Auth0's infrastructure, instead of setting up our own database).

For the sake of simplicity, instead of building and hosting an app, we will use [Auth0's Hosted Login Page](/hosted-pages/login) so we can implement a [Universal Login experience](/guides/login/centralized-vs-embedded).

We will capture consent information, under various scenarios, and save this at the user's metadata, as follows:

```text
{
  "consentGiven": true
}
```

We will see four different implementations for this:
- one that displays a flag, works for database connections, and uses [Auth0.js](/libraries/auth0js) to create the user
- one that displays a flag, works for database connections, and uses the [Authentication API](/api/authentication#signup) to create the user
- one that displays a flag, works for social connections, and uses the [Management API](/api/management/v2) to update the user's information
- one that displays links to other pages where the Terms & Conditions and/or privacy policy information can be reviewed

All implementations will have the same final result, a `consentGiven` property saved at the [user's metadata](/metadata).

## Configure the application

1. Go to [Dashboard > Clients](${manage_url}/#/clients) and create a new [client](/clients). Choose `Single Web Page Applications` as type.

1. Go to **Settings** and set the **Allowed Callback URLs** to `http://localhost:3000`. 

    :::note
    This field holds the set of URLs to which Auth0 is allowed to redirect the users after they authenticate. Our sample app will run at `http://localhost:3000` hence we set this value.
    :::

1. Copy the **Client Id** and **Domain** values. You will need them in a while.

1. Go to [Dashboard > Connections > Database](https://manage.auth0.com/#/connections/database) and create a new connection. Click **Create DB Connection**, set a name for the new connection, and click **Save**. You can also [enable a social connection](/identityproviders#social) at [Dashboard > Connections > Social](${manage_url}/#/connections/social) (we will [enable Google login](/connections/social/google) for the purposes of this tutorial).

1. Go to the connection's **Clients** tab and make sure your newly created client is enabled.

## Option 1: Use Auth0.js

In this section, we will customize the login widget to add a flag which users can use to provide consent information.

This works **only** for database connections.

1. Go to [Dashboard > Hosted Pages](${manage_url}/#/login_page). At the **Login** tab enable the toggle. 

1. At the **Default Templates** dropdown make sure that `Custom Login Form` is picked. The code is prepopulated for you.


---
title: Okta
description: How to configure Okta for use as an OpenID Connect identity provider.
toc: true
---


# Configure Okta as an OpenID Connect Identity Provider

This article walks you through configuring Okta for use as an OpenID Connect identity provider.

## Configure Okta

Log in to your Okta account. If you don't already have one, you will need to create one.

On the general Okta dashboard, click **Admin**. This takes you to the Okta Admin Dashboard.

![Okta Dashboard](/media/articles/oidc/identity-providers/okta/okta-dashboard.png)

Using the list of shortcuts at the right-hand side of the screen, click **Add Applications**.

![Okta Admin Dashboard](/media/articles/oidc/identity-providers/okta/okta-admin-dashboard.png)

On the *Add Application* page, select **Create New App**.

![Create New Okta App](/media/articles/oidc/identity-providers/okta/create-new-app.png)

On the *Create a New Application Integration* pop-up window, select the **Platform** for your application, and choose **Open ID Connect** as the *Sign on method*. Click **Create** to proceed.

![Create OpenID Connect Integration](/media/articles/oidc/identity-providers/okta/new-app-integration.png)

You will now create your OpenID Connect integration. On the *General Settings* page, provide the following:

* **App name**;
* **App logo** (optional);

![OpenID Connect Integration General Settings](/media/articles/oidc/identity-providers/okta/oidc-general-settings.png)

Click **Next** to proceed.

Next, you will see the *Configure OpenID Connect* page. Enter the following values into the appropriate fields:

* **Redirect URI**: `https://${account.namespace}/login/callback`

![OpenID Connection Integration Configure](/media/articles/oidc/identity-providers/okta/oidc-settings.png)

Click **Next** to proceed.

You'll be directed to the *General* page for your newly-created app.

![General Configuration Information](/media/articles/oidc/identity-providers/okta/config-info.png)

Scroll down to the **Client Credentials** section and take note of the **Client ID** and **Client Secret**.

## Configure Auth0

At this point, you will configure the integration from the Auth0 side.

Auth0 supports creating custom OpenID Connections by using the [Custom Social Connections Extension](/extensions/custom-social-extensions). Follow the guide to [Setup a New Social Connection](https://auth0.com/docs/extensions/custom-social-extensions#set-up-a-new-social-connection) and use the following values for the connection settings:

- __Name__: The name of the connection. Use a name that clearly identify the okta account, you are free to name the connection whatever you would like;
- __Client ID__: Use the **Client ID** you obtained in the *General* page of your application in Okta;
- __Client Secret__: Use the **Client Secret** you obtained in the *General* page of your application in Okta;
- __Authorization URL__: Set `https://{okta-account}/oauth2/v1/authorize`, replacing *{okta-account}* with the DNS name of the Okta account where you registered the application;
- __Token URL__: Set `https://{okta-account}/oauth2/v1/token`, replacing *{okta-account}* with the DNS name of the Okta account where you registered the application;
- __Scope__: The scope parameters to get the profile, as a first approach you can use `openid email profile`;
- __Fetch User Profile Script__: Use the following Script, replacing *{okta-account}* with the DNS name of the Okta account where you registered the application.
    ```javascript
    function(accessToken, ctx, cb) {
      request({
        url: "https://{okta-account}/oauth2/v1/userinfo",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
        },
        function(e, r, b) {
        if (e) return cb(e);
        if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));
        profile = JSON.parse(b);
        profile.user_id = profile.sub;
        delete profile.sub;
        cb(null, profile);
        }
      );
    }
    ```
- __Custom Headers__: Leave it empty

Click **Save** to proceed and then continue following the instructions to enable the [connection in your applications](https://auth0.com/docs/extensions/custom-social-extensions#new-connection-apps)


---
description: How to configure Okta for use as an OpenID Connect identity provider.
toc: true
tags:
    - protocols
    - oidc
    - okta
---
# Configure Okta as an OpenID Connect Identity Provider

This article walks you through configuring Okta for use as an OpenID Connect identity provider.

## 1. Create an Okta Application

First, [log in to your Okta account](https://login.okta.com) and head to your Okta dashboard. 

Select **Applications** on the top menu. On the Applications page, click the **Add Application** button to create a new app.

![Okta Applications Dashboard](/media/articles/oidc/identity-providers/okta/okta-app-dashboard.png)

On the **Create New Application** page, select the **Platform** for your application.

![Okta Create Application Select Platform](/media/articles/oidc/identity-providers/okta/okta-create-app-platform.png)

Next, provide the following information for your application settings:

Field | Description
------|------------
Name | The name of your application.
Base URIs (optional) | The domain(s) of your application.
Login redirect URIs | This should be set to `https://${account.namespace}/login/callback`.
Group assignments (optional) | The user groups that can sign in to this application.
Grant type allowed | The grant types to enable for your application.

::: note
The application settings fields may differ depending on the platform your choose.
:::

![Okta Create Application Settings](/media/articles/oidc/identity-providers/okta/okta-create-app-settings.png)

Click **Done** to proceed. You'll be taken to the **General** page of your app.

## 2. Get Your Client ID and Client Secret

Go to the **General** page of your app and scroll down to the **Client Credentials** section. This section contains the **Client ID** and **Client Secret** to be used in the next step.

## 3. Create a Custom OpenID Connection with Auth0

At this point, you will configure the integration from the Auth0 side.

Auth0 supports creating custom OpenID Connections by using the [Custom Social Connections Extension](/extensions/custom-social-extensions). Follow the guide to [Setup a New Social Connection](/extensions/custom-social-extensions#set-up-a-new-social-connection) and use the following values for the connection settings:

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

Click **Save** to proceed and then continue following the instructions to enable the [connection in your applications](/extensions/custom-social-extensions#new-connection-apps).

## 4. Create an Okta Authorization Server

To retrieve custom claims from Okta, ensure you've set up an Okta authorization server and configured your custom claims in the authorization server settings.

::: note
For more information on creating an Okta authorization server and adding claims, check out the [Set Up an Authorization Server](https://developer.okta.com/docs/how-to/set-up-auth-server.html) page of the Okta documentation.
:::

Once the Okta authorization server is set up, continue with the following sections to update the [custom connection](/extensions/custom-social-extensions) you previously created for Okta.

## 5. Get Your Okta Authorization Server Issuer URI

[Log in](https://login.okta.com) to your Okta dashboard and select **Authorization Servers** from the **API** menu at the top.

![Okta Dashboard API Menu](/media/articles/oidc/identity-providers/okta/okta-dashboard-api-menu.png)

On the **Authorization Servers** page, locate the authorization server you created, and make note of the **Issuer URI**. The **Issuer URI** should have the following structure:

`https://{okta-account}/oauth2/{authorization-server-id}`

The **Issuer URI** will be used in the next step.

## 6. Update Your Custom Okta Connection

Visit to the [Extensions](${manage_url}/#/extensions) page on the Auth0 dashboard and click **Custom Social Connections**.

![Manage Auth0 Extensions](/media/articles/oidc/identity-providers/okta/extensions.png)

Next, select your custom Okta connection. In the **Settings** section, update the following fields with your **Issuer URI** and the appropriate endpoint:

Field | Value
------|------
Authorization URL | `https://{okta-account}/oauth2/{authorization-server-id}/v1/authorize`
Token URL | `https://{okta-account}/oauth2/{authorization-server-id}/v1/token`

Then, scroll down to the **Fetch User Profile Script**, it should look something like this:

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

Update the `request.url` with your **Issuer URI** and the `/userinfo` endpoint. For example:

```javascript
function(accessToken, ctx, cb) {
  request({
    url: "https://{okta-account}/oauth2/{authorization-server-id}/v1/userinfo",
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

Next, click the **Try** button to test the connection. If accepted, you should see the **It Works!** confirmation page.


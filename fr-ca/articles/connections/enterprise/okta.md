---
connection: Okta
image: /media/connections/okta.png
public: true
seo_alias: okta
description: Learn how to connect to Okta as an OpenID Connect (OIDC) Identity Provider using an enterprise connection.
crews: crew-2
toc: true
topics:
    - okta
    - connections
    - enterprise
    - oidc
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect to Okta as an OpenID Connect Identity Provider

::: warning
If you are using the Lock login widget with an OpenID Connect (OIDC) connection, you must use Lock version 11.16 or higher.
:::

## Prerequisites

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application to an OIDC Identity Provider, you must:

1. [Register your app with Okta](#register-your-app-with-okta).
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

## Register your app with Okta

To allow users to log in using Okta, you'll need to register your application. See [Register your app (Okta Documentation)](https://developer.okta.com/docs/guides/quickstart/website/register-app/) for full instructions.

During registration you'll be prompted for **Sign-in redirect URIs**. Add your <dfn data-key="callback">callback URL</dfn> as a sign-in redirect URI:

```text
https://${account.namespace}/login/callback
```

<%= include('../_find-auth0-domain-redirects.md') %>

Once you finish registering your application with Okta, save the **Client ID** and **Client secret** to use in the next step.

## Create an enterprise connection in Auth0

Next, you will need to create and configure a OIDC Enterprise Connection in Auth0. Make sure you have the **Application (client) ID** and the **Client secret** generated when you set up your app in the OIDC provider.

### Create an enterprise connection using the Dashboard

1. Navigate to [Auth0 Dashboard > Authentication > Enterprise](${manage_url}/#/connections/enterprise), locate **Open ID Connect**, and click its `+`.

![Create Connection Type](/media/articles/connections/dashboard-connections-enterprise-list.png)

2. Enter details for your connection, and select **Create**:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Issuer URL** | URL where Auth0 can find the **OpenID Provider Configuration Document**. For Okta this should be either of the following:

* `https://<YOUR_OKTA_DOMAIN>/.well-known/openid-configuration`
* `https://<YOUR_OKTA_DOMAIN>/oauth2/<AUTH_SERVER_ID>/.well-known/`

You can enter the base URL or the full URL. You will see a green checkmark if it can be found at that location, a red mark if it cannot be found, or an error message if the file is found but the required information is not present in the configuration file. |
| **Client ID** | Unique identifier for your registered Okta application. Enter the saved value of the **Client ID** for the app you registered with the OIDC Identity Provider. |
| **Callback URL** | URL to which Auth0 redirects users after they authenticate. Ensure that this value is configured for the app you registered with the OIDC Identity Provider.
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

<%= include('../_find-auth0-domain-redirects.md') %>

![Enter OIDC Connection Details](/media/articles/connections/dashboard-connections-enterprise-create_oidc_default-empty.png)

3. In the **Settings** view, make additional configuration adjustments, if necessary.

| Field | Description|
| -- | -- |
| **Issuer URL** | Click **Show Issuer Details** to view the Issuer URL **Advanced Settings** and make adjustments. |
| **Type** | Set to **Front Channel** or **Back Channel**. Front Channel uses the OIDC protocol with `response_mode=form_post` and `response_type=id_token`. Back Channel uses `response_type=code`. |
| **Scopes** | A comma-separated list of Auth0 scopes to request when connecting to the Identify Provider. This will affect the data stored in the user profile. You are required to include at least the `openid` scope. Note that the connection does not call `/userinfo` endpoint and expects the user claims to be present in the `id_token`.  |

4. In the **Login Experience** view, configure how users log in with this connection.

<%= include('./_login-experience-tab.md') %>

5. Select **Save Changes**.

::: note
For instructions on creating an enterprise connection using the Management API, see [Connect to OpenID Connect Identity Provider](/connections/enterprise/oidc#create-an-enterprise-connection-using-the-management-api)
:::

## Enable the enterprise connection for your Auth0 application

To use your new enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

## Federate with Auth0

The OpenID Connect enterprise connection is extremely useful when federating to another Auth0 tenant. Just enter your Auth0 tenant URL (for example, `https://<tenant>.us.auth0.com`) in the **Issuer** field, and enter the Client ID for any application in the tenant to which you want to federate in the **Client ID** field. 

::: note
New tenants will have `us` as part of the URL. Tenants created before the regional domain addition will continue to work. For example, `https://{YOUR ACCOUNT}.auth0.com`.
:::

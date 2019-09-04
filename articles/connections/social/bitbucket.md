---
connection: Bitbucket
image: /media/connections/bitbucket.png
seo_alias: bitbucket
description: This page shows you how to connect your Auth0 app to Bitbucket. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
topics:
  - connections
  - social
  - bitbucket
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect your App to Bitbucket

To connect your Auth0 app to Bitbucket, you will need to generate a *Key* and *Secret* in a Bitbucket app, copy these keys into your Auth0 settings, and enable the connection.

::: note
  This connection will only work with <dfn data-key="lock">Lock</dfn> version 9.2 or higher.
:::

1. Login to [Bitbucket](https://bitbucket.org/). Click on your account icon in the lower left and select **Bitbucket settings**. Select **OAuth**  in the left nav.

2. To create your app, click **Add consumer**. Provide a name for your app. In the <dfn data-key="callback">**Callback URL**</dfn> field, enter the following:

`https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

3. Select the Permissions you want to enable for this connection. At the very least you will need to select the `Account:Email` and `Account:Read` permissions.

4. Click **Save**.

5. To get your *Key* and *Secret*, on the page that follows, click the name of your app under **OAuth consumers** to reveal your keys.

6. Copy your *Client Id* and *Client Secret* into Auth0. In a separate window, log in to your [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left nav. Select **Bitbucket**:

![](/media/articles/connections/social/bitbucket/bitbucket-05.png)

7. Copy the `Key` and `Secret` from the **OAuth integrated applications** page on Bitbucket into the fields on this page on Auth0. Select the **Permissions** you want to enable. Click **SAVE**.

![](/media/articles/connections/social/bitbucket/bitbucket-06.png)

8. To enable the connection, go to the **Apps** tab of the Bitbucket connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection.

![](/media/articles/connections/social/bitbucket/bitbucket-07.png)

## Test the connection

1. Close the **Settings** window to return to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Bitbucket logo:

![](/media/articles/connections/social/bitbucket/bitbucket-08.png)

2. Click **TRY**.

3. Click **Grant access** to allow your app access. If you have configured everything correctly, you will see the **It works!** page.

![](/media/articles/connections/social/bitbucket/bitbucket-10.png)

<%= include('../_quickstart-links.md') %>

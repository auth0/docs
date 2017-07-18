---
description: Configure Auth0 for use as an OAuth 2.0 server to authenticate users wanting access to an API managed by the Azure API Management service
toc: true
---

# Configure Auth0

To use Auth0 as an [OAuth 2.0 authorization server](/protocols/oauth2#oauth-roles), you'll need to execute the following setup steps:

1. Create an Auth0 API and Non Interactive Client.
2. Create a Connection to store your users.
3. Create a user so that you can test your integration when you've finished setting it up.

### Step 1: Create an API and Non Interactive Client

An API is an entity that represents an external resource that's capable of accepting and responding to requests made by clients. You'll need to create an [Auth0 API](/apis) using the Management Dashboard to represent the API managed by Azure's API Management Service that you want secured by Auth0.

You'll also need a [Non Interactive Client](/client), which represents your application and allows use of Auth0 for authentication. By default, when you create an API, Auth0 automatically creates an associated API. 

To begin, you'll need to log into the Auth0 Management Dashboard. Go the [APIs](${manage_url}/#/apis) and click **Create API**.

![](/media/articles/integrations/azure-api-mgmt/auth0/apis.png)

Set the following parameters to create your new API:

| Parameter | Description |
| --------- | ----------- |
| Name | A descriptive name for your API. In this example, we'll use `Basic Calculator` |
| Identifier | A logical and unique identifier for your API. We recommend using a URL, but it doesn't have to be a publicly-available URL since Auth0 doesn't call your API. You cannot modify this value at a later point. We'll use `basic-calculator` |
| Signing Algorithm | The method used to sign the tokens issued by Auth0. Choose from `HS256` and `RS256` (we'll use the latter for this example). If you choose `RS256`, Auth0 signs your tokens with your private key. See [Signing Algorithms](https://github.com/apis#signing-algorithms) for additional information |

When complete, click **Create**.

![](/media/articles/integrations/azure-api-mgmt/auth0/api-config.png)

When your API is ready, you'll be shown the **Quick Start** page for the API. Switch over to the **Non Interactive Clients** tab. You'll see that Auth0 has also created and enabled a non interactive [client](/clients) for use with your API.

![](/media/articles/integrations/azure-api-mgmt/auth0/api-nic.png)

### Step 2: Create a Connection

After you've created your API and your Client, you'll need to create a [Connection](/clients/connections), which are sources of users. For the purposes of this example, we'll create a [Database Connection](/connections/database).

::: note
If you already have a set of users, you may [import them](/extensions/user-import-export) or create a [custom database connection](https://auth0.com/docs/connections/database/mysql.
:::

Go to the Management Dashboard. Navigate to [**Connections** > **Database Connections**](${manage_url}/#/connections/database), and click **Create DB Connection**.

![](/media/articles/integrations/azure-api-mgmt/auth0/db-connections.png)

The only thing you'll need to provide at this time is a descriptive **Name** for your connection. We suggest choosing a name that reflects the source of users (such as `Facebook` for a Connection that contains users using their Facebook credentials or `site-sign-ups` for a database connection where users sign up on your site).

![](/media/articles/integrations/azure-api-mgmt/auth0/new-db-connection-config.png)

Click **Create** to proceed.

#### Enable the Connection for Your Client

Once Auth0 has created your Connection, you'll be redirected to your Connection's **Settings** page. Switch over to the **Clients** tab, where you'll see a full list of all the Clients you have with this account. You'll need to enable the Connection for use with the Non Interactive Client that you're using with your API.

![](/media/articles/integrations/azure-api-mgmt/auth0/connection-client.png)

### Step 3: Create a User

Finally, we'll create a user that we use later on to test the integration.

Go to the [Users section]((${manage_url}/#/users)) of the Management Dashboard. Click **Create User**.

![](/media/articles/integrations/azure-api-mgmt/auth0/user.png)

Provide an **email** and **password** for your new user. Be sure to indicate that this user should use **BasicCalculator** in the **Connection** field.

Set `Connection` to the connection you created earlier (which, if you're following along with our example, is `BasicCalculator`).

![](/media/articles/integrations/azure-api-mgmt/auth0/create-user.png)

Click **Save** to proceed.

At this point, you've set up Auth0 for use as an OAuth 2.0 authorization server. You will now configure the Azure API Management Service and import an API for use with the service.

<%= include('./_stepnav', {
 prev: ["Integrate Azure API Management Service with Auth0", "/integrations/azure-api-management"]
}) %>

<%= include('./_stepnav', {
 next: ["2. Configure Azure API Management", "/integrations/azure-api-management/configure-azure"]
}) %>
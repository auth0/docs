# Configure Auth0

To use Auth0 as an OAuth 2.0 authorization server, you'll need to execute the following set-up steps:

1. Create an Auth0 API and Non Interactive Client.
2. Create a Connection to store your users.
3. Create a user so that you can test your integration when you've finished setting it up.

### Step 1: Create an API and Non Interactive Client

An API is an entity that represents an external resource that's capable of accepting and responding to requests made by clients. You'll need to create an [Auth0 API](/apis) using the Management Dashboard to represent the API managed by Azure's API Management Service that you want secured by Auth0.

To begin, you'll need to log into the Auth0 [Management Dashboard](${manage_url}). Navigate to **APIs**, and click on **Create API**.

![](/media/articles/integrations/azure-api-mgmt/auth0/apis.png)

You'll be asked to provide values for the following parameters before Auth0 creates your new API:

| Parameter | Description |
| --------- | ----------- |
| Name | A descriptive name for your API |
| Identifier | A logical identifier for your API |
| Signing Algorithm | The method used to sign the tokens issued by Auth0 |

![](/media/articles/integrations/azure-api-mgmt/auth0/new-api-config.png)

When complete, click **Create**.

![](/media/articles/integrations/azure-api-mgmt/auth0/api-config.png)

When your API is ready, you'll be shown the **Quick Start** page for the API. Switch over to the **Non Interactive Clients** tab. You'll see that Auth0 has also created and enabled a non interactive [client](/clients) for use with your API.

![](/media/articles/integrations/azure-api-mgmt/auth0/api-nic.png)

### Step 2: Create a Connection

After you've created your API and your Client, you'll need to create a [Connection](https://auth0.com/docs/clients/connections), which are sources of users. For the purposes of this example, we'll create a [Database Connection](/connections/database).

To begin, you'll need to log into the Auth0 [Management Dashboard](${manage_url}). Navigate to **Connections** > **Database Connections**, and click on **Create DB Connection**.

![](/media/articles/integrations/azure-api-mgmt/auth0/db-connections.png)

The only thing you'll need to provide at this time is a descriptive **Name** for your connection.

![](/media/articles/integrations/azure-api-mgmt/auth0/new-db-connection-config.png)

Click **Create** to proceed.

#### Enable the Connection for Your Client

Once Auth0 has created your Connection, you'll be redirected to your Connection's **Settings** page. Switch over to the **Clients** tab. You'll need to enable the Connection for use with the Non Interactive Client that you're using with your API.

![](/media/articles/integrations/azure-api-mgmt/auth0/connection-client.png)

### Step 3: Create a User

Finally, we will create a user stored in your Connection. You'll use this user's credentials at a later point to test your integration.

To begin, you'll need to log into the Auth0 [Management Dashboard](${manage_url}). Navigate to **Users**, and click on **Create User**.

![](/media/articles/integrations/azure-api-mgmt/auth0/users.png)

Provide an **email** and **password** for your new user. Be sure to indicate that this user should use **BasicCalculator** in the **Connection** field.

![](/media/articles/integrations/azure-api-mgmt/auth0/create-user.png)

Click **Save** to proceed.

At this point, you've set up Auth0 for use as an OAuth 2.0 authorization server. You will now configure the Azure API Management Service and import an API for use with the service.

<%= include('./_stepnav', {
 next: ["2. Configure Azure API Management", "/integrations/azure-api-management//integrations/azure-api-management/configure-azure"]
}) %>
---
title: Enabling API Access to the Authorization Extension
description: How to enable API access to the Authorization Extension
topics:
  - extensions
  - authorization_v2
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---
# Authorization Extension: API Access

::: note
<%= include('../../../_includes/_rbac_methods') %>
:::

Once configured and set up, your extension should contain users, as well as groups, <dfn data-key="role">roles</dfn>, and permissions. You can automate provisioning and query the authorization context of your users in real-time if you enable API access to your extension.

## Enable API Access

Log in to the Management Dashboard, and open up the [Authorization Extension](${manage_url}/#/extensions).

To get to **API** section, click on your Auth0 tenant name on the top right of the **Authorization Dashboard**. Click **API**.

![Click API](/media/articles/extensions/authorization/click-api.png)

On the **Settings** page, use the toggle to enable API Access. 

![Enable API Access](/media/articles/extensions/authorization/enable-api-access.png)

Once enabled, you'll be able to see or control (within the extension) some of the parameters of the tokens issued by the API. You can control the **time to expiration** of the token, as well as view the token's **audience**, **issuer**, and **URL** to access the API.

![API Access Enabled](/media/articles/extensions/authorization/api-access-enabled.png)

## Access the Extension's API

When you enabled API access to the extension, Auth0 automatically created an API for your use in the [Dashboard]({$manage_url}/#/apis). To access the API, you'll need to create a Machine to Machine Application, which is the entity that interacts with the API itself.

### Create the Application

In the [Applications section of the Dashboard](${manage_url}/#/applications), click **Create Application**. Name your new Application, and choose the **Machine to Machine Application** type. Click **Create** to proceed.

You'll be redirected to the **Quick Start** page of the Application, where you can customize the living documentation based on the API with which you'll use the Application. Select the API that Auth0 created for your extension (it should be called **auth0-authorization-extension-api** or similar).

Since this is the first time you're working with the API and Application together, you'll see a message that says, "This application is not authorized for this API." To authorize the application for use with the API, click **Navigate to the API and Authorize**.

![Application Quick Start Page](/media/articles/extensions/authorization/client-quick-start.png)

You'll see a list of Machine to Machine Applications you can use with your API. Click the slider next to the Application you just created to authorize it.

![Authorize Application](/media/articles/extensions/authorization/clients-for-api.png)

Once you've authorized the Application, you'll see the **Grant ID**. You can also select the **Scopes** to be granted to the Application. The scopes you grant depends on the endpoints you want to access. For example, you'd grant `read:users` to [get all users](hapi/authorization-extension#get-all-users).

If you make any changes to the scopes, click **Update** to save.

![Scopes](/media/articles/extensions/authorization/client-scopes.png)

### Get the Access Token

To access the API, you'll need to [ask for and obtain the appropriate token](/flows/guides/client-credentials/call-api-client-credentials#request-token).

### Call the API

You can call the API via:

* An HTML request
* A cURL command

You can also find detailed information about the endpoints, as well as samples on how to call each endpoint using the three methods above, in the [Authorization Extension API Explorer](/api/authorization-extension).

You can also refer to the **API Explorer**, which documents everything you can do via command line once you've enabled access to your extension via API.

Click over to the **Explorer** page for the API documentation.

![Explorer](/media/articles/extensions/authorization/api-explorer.png)

## Keep Reading

::: next-steps
* [Use the Authorization Extension's Data in Rules](/extensions/authorization-extension/v2/rules)
* [Import/Export Data](/extensions/authorization-extension/v2/import-export-data)
* [Troubleshoot Errors](/extensions/authorization-extension/v2/troubleshooting)
:::

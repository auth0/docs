---
description: Learn to register and configure machine-to-machine (M2M) apps using the Auth0 Dashboard.
toc: true
topics:
  - applications
  - m2m
contentType: 
    - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register a Machine-to-Machine Application

To integrate Auth0 with an machine-to-machine (M2M) application, you must first register your app as an M2M App.

<%= include('./_configure', { application_type: 'M2M App', application_type_create: 'Machine to Machine Applications' }) %>

## Settings

By default, most of the settings will be created for you. However, for an M2M application, you must:

- For **Application Type**, choose Machine-to-Machine (M2M) App.

You can explore all available settings at [Dashboard Reference: Application Settings](/reference/dashboard/settings-applications). 

### Advanced Settings

By default, most of the settings will be created for you. However, for an M2M application, you must:

- Be sure that **Trust Token Endpoint IP Header** is enabled to protect against brute-force attacks on the token endpoint.

You can explore all available settings at [Dashboard Reference: Advanced Application Settings](/reference/dashboard/settings-applications-advanced). 


## Create a new Machine to Machine Application

To create a new Machine to Machine Application:

1. Log in to the Dashboard and navigate to [Applications](${manage_url}/#/applications).

2. Click **Create Application**. When asked what type of application you'd like to create, select **Machine to Machine Application**. Click **Create** to proceed.

![Create an Application](/media/articles/applications/m2m-create.png)

2. Select the API you want to call from the application.

*If you haven't created an API yet, learn [how to configure an API in Auth0](/apis#how-to-configure-an-api-in-auth0).*

::: note
There will already be an **Auth0 Management API** that represents Auth0's APIv2. You can authorize applications to request tokens from this API.
:::

![Select an API](/media/articles/applications/m2m-select-api.png)

3. Select the scopes you want to grant to the Machine to Machine Application.

A **scope** is a claim that may be issued as part of the Access Token. With this information, the API can enforce fine-grained authorization. You can define scopes in the [API's scopes tab](/scopes/current#define-scopes-using-the-dashboard).

![Select Scopes](/media/articles/applications/m2m-select-scopes.png)

At this point, you're ready to call your API using the Machine to Machine Application. The Quick Start tab will show you how you can call your API using technologies.

![M2M Quickstarts](/media/articles/applications/m2m-quickstart.png)

To learn how to accept and validate Access Tokens in your API implementation, see the [Backend Quickstarts](/quickstart/backend).

## Settings

The Settings tab lets you edit different application settings:

- **Application Type**: The type of application you are implementing. Select **Machine to Machine Application**.

::: note
After creating your first application, set the environment for your tenant to: development, staging, or production. For more information refer to [Set Up Multiple Environments](/dev-lifecycle/setting-up-env#set-the-environment).
:::

## Next Steps

Once you have configured your Application, some common next steps to take are:

- **Configure a Connection** and enable it for your Application. For details, refer to [Application Connections](/applications/connections). For a list of the supported Identity Providers refer to [Identity Providers Supported by Auth0](/identityproviders).

- **Configure your app** to use your Auth0 Application. For detailed instructions and samples for a variety of technologies, refer to our [quickstarts](/quickstarts). There you can find information on how to implement login and logout (using [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js)), handle your user sessions, retrieve and display user profile information, add [Rules](/rules) to customize your flow, and more.

  ::: note
  For background theory on application authentication flows, refer to [Application Authentication](/application-auth).
  :::

- Use our latest [API Authorization](/api-auth) features to **call an API**.

- **Use [our APIs](/api/info)**.

  - The [Authentication API](/api/authentication) handles all the primary identity related functions (login, logout, get user profile, and so forth). Most users consume this API through our [Quickstarts](/quickstarts), the [Auth0.js library](/libraries/auth0js) or the [Lock widget](/libraries/lock). However, if you are building all of your authentication UI manually, you will have to interact with this API directly.

  - The [Management API](/api/management/v2) can be used to automate various tasks in Auth0 such as creating users.

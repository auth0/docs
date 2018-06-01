---
description: Explains the basics of creating and using Auth0 Machine to Machine applications.
toc: true
---
# Machine to Machine Applications

Machine to Machine applications are used when you want to invoke an API from a non-interactive application like a service, a command line tool, IoT device, etc., using the [OAuth 2.0 Client Credentials Grant](/api-auth/grant/client-credentials).

To create a new Machine to Machine application:

1. Open the Auth0 Management Dashboard and browse to the [Applications section](${manage_url}/#/applications).

2. Click on **Create Application**. You'll be asked what type of application you'd like to create, select **Machine to Machine Application**. Click **Create** to proceed.

![Create an Application](/media/articles/applications/m2m-create.png)

2. Select the API you want to call from the Machine to Machine application. 

![Select an API](/media/articles/applications/m2m-select-api.png)

If you haven't created an API yet, learn [how to configure an API in Auth0)(/apis#how-to-configure-an-api-in-auth0).

::: note
There will already be an `Auth0 Management API` that represents Auth0's APIv2. You can authorize applications to request tokens from this API as well.
:::

3. Select the scopes you want to grant to the Machine to Machine application. 

![Select Scopes](/media/articles/applications/m2m-select-scopes.png)

A scope is a claim that may be issued as part of the Access Token. With this information, the API can enforce fine-grained authorization. If you haven't defined any scope for the API, you can define them in the [API's scopes tab](/scopes/current#define-scopes-using-the-dashboard).

4. Learn how to call your API using the Machine to Machine application.

![Select Scopes](/media/articles/applications/m2m-quickstart.png)

The quickstart tab will show you how to call your API using different programming languages. 

To know how to accept and validate Access Tokens in your API implementation, check the [Backend Quickstarts](/quickstart/backend).

## Settings

The Settings tab lets you edit different application settings:

<%= include('./application-settings/_settings') %>

## APIs

The APIs tab lists all available APIs for the tenant, shows the ones that the Machine to Machine application is authorized to call, and let you authorize more APIs.

![Select Scopes](/media/articles/applications/m2m-select-api.png)

For example, you can authorize the same Machine to Machine application to call your own API and the Management API, with a restricted set of scopes that you want the application to access.

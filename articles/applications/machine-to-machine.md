---
description: Explains the basics of creating and using Auth0 Machine to Machine Applications.
toc: true
---
# Machine-to-Machine Applications

You can use machine-to-machine applications when you want to invoke an API using a non-interactive application, such as a service, command line tool, or IoT device using the [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow).

## Create a new Machine to Machine Application

To create a new Machine-to-Machine Application:

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

<%= include('./application-settings/_settings') %>

- **Application Type**: The type of application you are implementing. Select **Machine to Machine Application**.

<%= include('./application-settings/_token-endpoint-auth-method') %>

<%= include('./application-settings/_settings-pt2') %>

### Advanced Settings

<%= include('./application-settings/_adv-settings') %>

<%= include('./application-settings/_trust-token-endpoint-ip-header') %>

## APIs

The **APIs** tab:

* Lists all available APIs for the tenant
* Shows the ones that the Machine to Machine Application is authorized to call
* Lets you authorize additional APIs

![M2M APIs](/media/articles/applications/m2m-apis.png)

For example, you can authorize the same Machine to Machine Application to call both your own API and the Auth0 Management API.

::: note
Customers can see their [Machine to Machine usage report in the Support Center](${env.DOMAIN_URL_SUPPORT}/reports/quota). Please note that this is not a *user* count, but the number of Access Tokens issued by Auth0 for the Client Credentials grant per calendar month for a given tenant.
:::

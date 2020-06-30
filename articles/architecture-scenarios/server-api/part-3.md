---
description: Application Implementation for the Server + API architecture scenario
toc: true
topics:
    - architecture
    - server-apps
    - api-auth
    - authorization-code
    - client-credentials
contentType: tutorial
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# Server + API: Application Implementation

In this section of the tutorial, we will take an in-depth look into our API and its associated Machine to Machine Application.

::: note
For simplicity, we will keep our implementation solely focused on authentication and authorization. As you will see in the samples, the input timesheet entry will be hard-coded, and the API will not persist the timesheet entry. Instead, it will simply echo back some of the info.
:::

## Define the API endpoints

First, we need to define the endpoints of our API.

::: panel What is an API endpoint?
An **API endpoint** is a unique URL that represents an object. To interact with this object, you need to point your application to its URL. For example, if you had an API that could return either orders or customers, you might configure two endpoints: `/orders` and `/customers`. Your application would interact with these endpoints using different HTTP methods; for example, `POST /orders` could create a new order or `GET /orders` could retrieve the dataset of one or more orders.
:::

We will configure one single endpoint that will be used to create timesheet entries. The endpoint will be `/timesheets/upload` and the HTTP method will be `POST`.

As input, the API will expect a JSON object containing the timesheet information. We will use the following JSON:

```json
{
  'user_id': '007',
  'date': '2017-05-10T17:40:20.095Z',
  'project': 'StoreZero',
  'hours': 5
}
```

The API will print the JSON, so we can verify the contents and echo back a message like the following: `Created timesheet 14 for employee 007`.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#1-define-the-api-endpoint).
:::

### Secure the API endpoints

::: panel-warning Configure the API
To secure your endpoints, you need to have your API configured in the Auth0 Dashboard. To learn how, see the [Configure the API](#configure-the-api) paragraph of this document.
:::

The first step towards securing our API endpoint is to get an Access Token as part of the Header and validate it. If it's not valid, then we should return an HTTP Status 401 (Unauthorized) to the calling process.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#2-secure-the-api-endpoint).
:::

#### Get an Access Token

To get an Access Token without using our application sample implementation, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```json
{
  audience: "YOUR_API_IDENTIFIER",
  grant_type: "client_credentials",
  client_id: "${account.client_id}",
  client_secret: "${account.client_secret}"
}
```

::: note
To learn more, see [API Authorization: Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens).
:::

## Check the application permissions

Now we have secured our API's endpoint with an Access Token, but we still haven't ensured that the process calling the API has the rights to post a new timesheet entry.

As discussed earlier in this doc, each Access Token may include a list of the permissions that have been granted to the client. These permissions are defined using the `scope` request parameter. To learn how to configure this, see the [Configure the Scopes](#configure-the-scopes) paragraph.

For our endpoint, we will require the scope `batch:upload`.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#3-check-the-client-permissions).
:::

### Implement the Machine to Machine Application

In this section, we will see how we can implement a Machine-to-Machine Application for our scenario.

::: note
For simplicity, we  will keep our implementation solely focused on authentication and authorization, and configure our application to send a single hard-coded timesheet entry to the API. Also, we will print in the console, which is something we wouldn't do with a server-running process.
:::

### Get an Access Token

We will start by invoking the Auth0 `/oauth/token` API endpoint to get an Access Token.

To do so, we will need the following configuration values:

- **Domain**: Auth0 Domain, which you can retrieve from the *Settings* of your application in the [Auth0 Dashboard](${manage_url}/#/applications). This value will be a part of the API URL: `https://${account.namespace}/oauth/token`.

- **Audience**: API Identifier, which you can retrieve from the *Settings* of your API in the [Auth0 Dashboard](${manage_url}/#/apis).

- **Client ID**: Auth0 Application's Client ID, which you can retrieve from the *Settings* of your application in the [Auth0 Dashboard](${manage_url}/#/applications).

- **Client Secret**: Auth0 application's Client Secret, which you can retrieve from the *Settings* of your application in the [Auth0 Dashboard](${manage_url}/#/applications).

Our implementation should perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```json
{
  "audience": "YOUR_API_IDENTIFIER",
  "grant_type": "client_credentials",
  "client_id": "${account.client_id}",
  "client_secret": "${account.client_secret}"
}
```

To learn more, see [API Authorization: Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens).

::: note
See the implementation in [Python](/architecture-scenarios/application/server-api/cron-implementation-python#get-an-access-token).
:::

## Invoke the API

Now that we have an Access Token that includes the valid scopes, we can invoke our API.

To do so, we will:
- Build a hard-coded timesheet entry in JSON format.
- Add the Access Token as an `Authorization` header to our request.
- Make the HTTP POST request.
- Parse the response, and print it in the terminal (optional).

::: note
See the implementation in [Python](/architecture-scenarios/application/server-api/cron-implementation-python#invoke-the-api).
:::

<%= include('./_stepnav', {
 prev: ["2. Auth0 Configuration", "/architecture-scenarios/server-api/part-2"], next: ["Conclusion", "/architecture-scenarios/server-api/part-4"]
}) %>
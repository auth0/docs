---
description: Application Implementation for the Server + API architecture scenario
toc: true
---

# Server + API: Application Implementation

In this section of the tutorial, we will take an in-depth look into our API and its associated Machine to Machine Application.

::: note
  For simplicity reasons we will keep our implementation solely focused on the authentication and authorization part. As you will see in the samples the input timesheet entry will be hard-coded and the API will not persist the timesheet entry, simply echo back some of the info.
:::

## Define the API endpoints

First we need to define the endpoints of our API.

::: panel What is an API endpoint?
An **API endpoint** is a unique URL that represents an object. In order to interact with this object you need to point your application towards that URL. For example, if you had an API that could return either order or customers, you might configure two endpoints: `/orders` and `/customers`. Your application would interact with these endpoints using different HTTP methods, for example `POST /orders` to create a new order, or `GET /orders` to retrieve the dataset of one or more orders.
:::

We will configure one single endpoint that will be used for creating timesheet entries. The endpoint will be `/timesheets/upload` and the HTTP method `POST`.

The API will expect a JSON object as input, containing the timesheet information. We will use the following JSON:

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
  See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#1-define-the-api-endpoint)
:::

### Secure the API endpoints

::: panel-warning Configure the API
In order to secure your endpoints you need to have your API configured in the Auth0 Dashboard. For information on how to do that refer to the [Configure the API](#configure-the-api) paragraph of this document.
:::

The first step towards securing our API endpoint is to get an Access Token as part of the Header and validate it. If it's not valid then we should return an HTTP Status 401 (Unauthorized) to the calling process.

::: note
  See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#2-secure-the-api-endpoint)
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
  For more information on this refer to: [API Authorization: Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens).
:::

## Check the application permissions

Now we have secured our API's endpoint with an Access Token but we still haven't ensured that the process calling the API has indeed the rights to post a new timesheet entry.

As discussed earlier in this doc, each Access Token may include a list of the permissions that have been granted to the client. These permissions are defined using the scope request parameter. For more information on how to configure this refer to the [Configure the Scopes](#configure-the-scopes) paragraph.

For our endpoint we will require the scope `batch:upload`.

::: note
  See the implementation in [Node.js](/architecture-scenarios/application/server-api/api-implementation-nodejs#3-check-the-client-permissions)
:::

### Implement the Machine to Machine Application

In this section we will see how we can implement a Machine to Machine Application for our scenario.

::: note
  For simplicity reasons we  will keep our implementations solely focused on the authentication and authorization part and configure our application to send a single hard-coded timesheet entry to the API. Also, we will print in the console, something we wouldn't do with a server running process.
:::

### Get an Access Token

We will start by invoking the Auth0 `/oauth/token` API endpoint in order to get an Access Token.

In order to do so we will need the following configuration values:

- **Domain**: The value of your Auth0 Domain. You can retrieve it from the *Settings* of your application at the [Auth0 Dashboard](${manage_url}/#/applications). This value will be a part of the API URL: `https://${account.namespace}/oauth/token`.

- **Audience**: The value of your API Identifier. You can retrieve it from the *Settings* of your API at the [Auth0 Dashboard](${manage_url}/#/apis).

- **Client ID**: The value of your Auth0 application's Id. You can retrieve it from the *Settings* of your application at the [Auth0 Dashboard](${manage_url}/#/applications).

- **Client Secret**: The value of your Auth0 application's Secret. You can retrieve it from the *Settings* of your application at the [Auth0 Dashboard](${manage_url}/#/applications).

Our implementation should perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```json
{
  "audience": "YOUR_API_IDENTIFIER",
  "grant_type": "client_credentials",
  "client_id": "${account.client_id}",
  "client_secret": "${account.client_secret}"
}
```

For more information on this refer to: [API Authorization: Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens).

::: note
  See the implementation in [Python](/architecture-scenarios/application/server-api/cron-implementation-python#get-an-access-token).
:::

## Invoke the API

Now that we have an Access Token, which includes the valid scopes, we can invoke our API.

In order to do so we will:
- Build a hard-coded timesheet entry in JSON format.
- Add the Access Token as an `Authorization` header to our request.
- Make the HTTP POST request.
- Parse the response and print it in the terminal (optional).

::: note
  See the implementation in [Python](/architecture-scenarios/application/server-api/cron-implementation-python#invoke-the-api).
:::

<%= include('./_stepnav', {
 prev: ["2. Auth0 Configuration", "/architecture-scenarios/application/server-api/part-2"], next: ["Conclusion", "/architecture-scenarios/application/server-api/part-4"]
}) %>
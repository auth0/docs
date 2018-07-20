---
title: Configure an API in Auth0
description: Learn how to configure an API using the Auth0 Dashboard.
topics:
  - api-authentication
  - oidc
  - apis
contentType: how-to
useCase:
  - secure-api
  - call-api
---

# Configure an API in Auth0

To configure an [API](/api-auth/apis.md) in Auth0, you will need to access the [Auth0 Dashboard](${manage.url}). Once you have done so, you can follow the instructions below.

1. From the left menu, click [APIs](${manage_url}/#/apis).

::: note
Inside the API section, you will see one API that has been created automatically--the **Auth0 Management API**. For details about the features of the Management API and its available endpoints, you can visit the [Management API Explorer](/api/management/v2).
:::

2. Click the **+ Create API** button, and provide the following information for your API before clicking **Create**:

- **Name**: a friendly name for the API. Does not affect any functionality.

- **Identifier**: a unique identifier for the API. We recommend using a URL (this doesn't have to be a publicly available URL; Auth0 will not call your API at all). This value **cannot be modified** afterwards.

- **Signing Algorithm**: the algorithm with which to sign the tokens. The available values are `HS256` and `RS256`. When selecting `RS256`, the token will be signed with your tenant's private key. For more details, visit [Signing Algorithms](/api-auth/concepts/signing-algorithms).

![Create a new API](/media/articles/api/overview/create-api.png)

Once you create your API, you will be able to see your API's *Quick Start*, which will guide you through any API code changes you will need to make to implement your API. These generally consist of choosing a JWT library from a pre-defined list and configuring the library to validate the [Access Tokens](/tokens/access-token) in your API. 

You will also see some additional [dashboard views for your API](/api-auth/reference/dashboard/views-apis).

![API Quick Starts](/media/articles/api/overview/quickstarts-view.png)

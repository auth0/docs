---
description: Learn how to use Postman Collections to access Auth0 APIs.
section: apis
topics:
  - management-api
  - authorization-api
  - apis
contentType: how-to
useCase: invoke-api
---

# Use Auth0 APIs with Postman Collections

## Install Postman Collections

To install the Postman Collection, you must first install the Postman App for Windows, Mac, or Chrome. You can download any of these from[Postman Apps](https://www.getpostman.com/apps).

Next, visit [Auth0 APIs](/api/info) and install the Collection you want to use by clicking on the relevant **Run in Postman** button.

![Auth0 API Postman Button](/media/articles/api/postman/auth0-api-landing.png)

Postman will prompt whether you want to open the Collection in Postman for Chrome or Postman for Windows/Mac. Select the application you installed.

Once you make a selection, the selected Postman application will open and the collection will be imported.

Our API Collections are organized into folders that categorize the various API calls according to category. For example, you will find all the Users methods under the **Users** folder in the Management API.

## Configure Postman Environment

The Auth0 Postman Collections make use of environment variables to customize the requests that are sent. To learn more about managing Postman environments, see [Setting up an environment with variables](https://learning.postman.com/docs/postman/variables-and-environments/variables/).

You must create an environment and configure the following variables:

| Variable | Description |
| -- | -- |
| `auth0_domain` | Should contain the domain for your Auth0 tenant, such as `jerrie.auth0.com`. |
| `auth0_token` | Should contain the token needed to make calls to the Management API. Is only required when using the Management API collection. To learn more, see [How to Get an Access Token for the Management API](/api/management/v2/tokens). |

In the screenshot below, you can see a Postman environment configured with both the `auth0_domain` and `auth0_token` variables defined:

![Environment Configured](/media/articles/api/postman/environment-configured.png)

## Execute requests

Once the environment is configured, you can follow these steps to execute an Auth0 API method:

1. Select the environment with which you want to work.
2. Select the relevant API method in the collection folder.
3. Click the **Send** button.

![Execute API Method](/media/articles/api/postman/execute-api-method.png)

You may also have to configure query parameters or the JSON method body, depending on the API call. To learn more, see [Sending Requests](https://learning.getpostman.com/docs/postman/sending-api-requests/requests/).

::: warning
Storing tokens in Postman as environment variables could pose a security risk. If you are signed in to the Postman application, it will automatically try to [synchronize entities such as Collections and Environments with the Postman servers](https://www.getpostman.com/docs/sync_overview). This means that a token, which could allow someone else to gain access to your Management API, is leaving the privacy of your computer and being uploaded to Postman's servers.

That said, Postman has taken measures to ensure that tokens are encrypted and encourages users to store them in Environment Variables. You can read more at [Postman Security](https://www.getpostman.com/security).

If you feel that this still poses too much of a risk, then you will need to sign out of Postman to ensure that environment variables are not synchronized.
:::
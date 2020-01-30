---
description: This page explains how to use Postman Collections to access Auth0 APIs.
section: apis
topics:
    - management-api
    - authorization-api
    - apis
contentType: how-to
useCase: invoke-api
---

# Using the Auth0 API with our Postman Collections

## Installing the Collections

To install the Postman Collection, you must install the Postman App for Windows, Mac or Chrome. You can download any of these from the [Postman Apps page](https://www.getpostman.com/apps).

Next, head over to our new [API Landing Page](/api/info), and install the Collection you want to use by clicking on the relevant **Run in Postman** button.

![](/media/articles/api/postman/auth0-api-landing.png)

Postman will prompt whether you want to open the Collection in Postman for Chrome or Postman for Windows / Mac. Select the application you installed.

![](/media/articles/api/postman/postman-open-with-dialog.png)

Once you make a selection, the selected Postman application will open and the collection will be imported.

![](/media/articles/api/postman/collection-post-install.png)

Our API Collections are organized into folders that categorize the various API calls according to category. For example, you will find all the Users methods under the **Users** folder in the Management API.

## Configuring the Postman Environment

The Auth0 Postman collections make use of environment variables to customize the requests that are sent. More information on managing Postman environments can be found at [Setting up an environment with variables](https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments)

You must create an environment and configure the following variables:

* `auth0_domain`: Should contain the domain for your Auth0 tenant, such as `jerrie.auth0.com`.
* `auth0_token`: Should contain the token needed to make calls to the Management API and is only required when using the Management API collection. For more information, see [How to Get an Access Token for the Management API](/api/management/v2/tokens) 

In the screenshot below, you can see a Postman environment configured with both the `auth0_domain` and `auth0_token` variables defined:

![](/media/articles/api/postman/environment-configured.png)

## Executing a request

Once the environment is configured, you can follow these steps to execute an Auth0 API method:

1. Select the environment you want to work with.
2. Select the relevant API method in the collection folder.
3. Click the **Send** button.

![](/media/articles/api/postman/execute-api-method.png)

You may also have to configure query parameters or the JSON method body, depending on the API call. For more information, please refer to the [Sending Requests page](https://learning.getpostman.com/docs/postman/sending-api-requests/requests/).

## A word about storing tokens in Postman variables

We need to point out that storing tokens in Postman as environment variables could pose a potential security risk. If you are signed in to the Postman application, it will automatically try and [synchronize entities such as Collections and Environments with the Postman servers](https://www.getpostman.com/docs/sync_overview). This means that a token, which could allow someone else to gain access to your Management API, is leaving the privacy of your computer and uploaded Postman's servers.

However, Postman has taken measures to ensure that tokens are encrypted and encourages users to store them in Environment Variables. You can [read more at their Security page](https://www.getpostman.com/security).

If you feel that this still poses too much of a risk, then you will need to sign out of Postman to ensure that environment variables are not synchronized.

---
desription: This page explains how to use Postman Collections to access Auth0 APIs.
section: apis
---

# Using the Auth0 API with our Postman Collections

## Installing the Collections

To install the Postman Collection you will need to have installed the Postman App for Windows, Mac or Chrome. You can download any of these from the [Postman Apps page](https://www.getpostman.com/apps).

Next, head over to our new [API Landing Page](/api/info), and install the Collection you want to use by clicking on the relevant "Run in Postman" button.

![](/media/articles/api/postman/auth0-api-landing.png)

Postman will prompt whether you want to open the Collection in Postman for Chrome or Postman for Windows / Mac. Select the application you have installed.

![](/media/articles/api/postman/postman-open-with-dialog.png)

Once you have made a selection, the selected Postman application will be opened and the collection will be imported.

![](/media/articles/api/postman/collection-post-install.png)

Our API Collections are organized into folders which categorizes the various API calls according to category, so for example, for the Management API you will find all the Users methods under the **Users** folder.

## Configuring the Postman Environment

The Auth0 Postman collections make use of environment variables to customize the requests being sent. More information on managing Postman environments can be found at [Setting up an environment with variables](https://www.getpostman.com/docs/environments)

You will need to create an environment and configure the following variables:

* `auth0_domain`: Should contain the domain for your Auth0 tenant, e.g. **jerrie.auth0.com**.
* `auth0_token`: Should contain the token needed when making calls to the Management API, and is therefore only required when using the Management API collection. More information on how to generate a token can be found at [The Auth0 Management APIv2 Token](https://auth0.com/docs/api/management/v2/tokens) 

In the screenshot below you can see a Postman environment configured with both the `auth0_domain` and `auth0_token` variables defined:

![](/media/articles/api/postman/environment-configured.png)

## Executing a request

Once the environment is configured, you can follow theses steps to execute an Auth0 API method:

1. Select the environment you want to work with
2. Select the relevant API method in the collection folder
3. Click the send button

![](/media/articles/api/postman/execute-api-method.png)

You man also optionally have to configure query parameters or the JSON method body, depending on the API call. For more information please refer to the [Sending Requests](https://www.getpostman.com/docs/requests) document on the Postman website.

## A word about storing tokens in Postman variables

We do need to point out that storing tokens in Postman as environment variables could pose a potential security risk.  If you are signed in to the Postman application it will automatically try and [synchronize some entities such as Collections and Environments with the Postman servers](https://www.getpostman.com/docs/sync_overview). This means that a token, which could allow someone else to gain access to your Management API, is leaving the privacy of your computer and uploaded Postman's servers.

It also has to be said that Postman has taken measures to ensure that this information is encrypted, and indeed encourages users to store this sort of information in Environment Variables. You can [read more about this on their website](https://www.getpostman.com/docs/security).

If you feel that this still poses too much of a risk for you, then you will need to sign out of Postman to ensure that environment variables are not synchronized.

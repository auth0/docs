---
description: This page explains how to use the Authentication API Debugger
---

# Auth0 Extension: Authentication API Debugger

The Authentication API Debugger allows you to test various endpoints of the [Auth0 Authentication API](/api/authentication).

## Authorizing the Extension

When you launch the extension you will be asked to log in to your Auth0 account. Once logged in, you will be presented with a consent dialog which will prompt you for permissions to access the Management API on your behalf. The extension will communicate to the Management API on your behalf to retrieve details about the Clients which you have configured in your Auth0 Dashboard.

![](/media/articles/extensions/authentication-api-debugger/consent.png)

The Client ID and Client Secret for a Client will subsequently be used to call Authentication API endpoints which require that information. 

## Basic Configuration

The basic configuration for all the possible flows can be found on the _Configuration_ tab.

![](/media/articles/extensions/authentication-api-debugger/configuration.png)

* **Domain**: The domain for your tenant. This field is read-only and only displayed for informational purposes.
* **Client**: The Client for which you want to initiate any of the authentication flows. You can manage the list of Clients in the [Clients section](${manage_url}/#/clients) of your Auth0 Dashboard.
* **Callback URL**: The callback URL for this extension. It is important that you add this URL to the **Allowed Callback URLs** under the _Settings_ for the Client.
* **State**: Optional state information which can be sent with the authentication flow.
* **Connection**: Specify the name of the connection which you want to use to log in. You can use this parameter to bypass the main Login screen and go directly for the login screen of the relevant Identity Provider.

## Executing the Flows

Once you have specified the basic configuration, you can switch to the _OAuth2 / OIDC_ tab to execute any of the flows. For some of the flows you may need to specify more settings which can be found by scrolling down the page: 

![](/media/articles/extensions/authentication-api-debugger/oauth-oidc-settings.png) 

These settings will depend on the actual flow which is being executed, and it is suggested that you refer to the [Auth0 Authentication API documentation](/api/authentication) for more information on the applicable parameters for each flow.

Once you have executed a particular flow, you will be presented with a screen which displays the information returned from Auth0. The exact information being returned will depend on the authentication flow which was executed.

In the screenshot below you can see an example of the information which was returned after executing a normal _OAuth2/OIDC Login_ flow:  

![](/media/articles/extensions/authentication-api-debugger/flow-executed.png)

You can execute another flow by selecting the _Login_ tab at the top of the page which will return you to the _Configuration_ screen: 

![](/media/articles/extensions/authentication-api-debugger/select-login.png)
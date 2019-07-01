---
description: This page explains how to use the Authentication API Debugger
topics:
  - extensions
  - auth-api-debugger
contentType:
  - how-to
useCase: extensibility-extensions
---

# Authentication API Debugger Extension

The Authentication API Debugger extension allows you to test various endpoints of the [Auth0 Authentication API](/api/authentication).

## Install the Extension

To install the extension navigate to the [Extensions dashboard](${manage_url}/#/extensions) and click on **Auth0 Authentication API Debugger**. Click **Install** on the pop-up window.

## Authorize the Extension

Once you install the extension, you will be navigated to the [Installed Extensions](${manage_url}/#/extensions) view. Click on **Auth0 Authentication API Debugger** to launch the extension.

At that point, a consent dialog will be displayed, requesting access to your account.

![Consent Screen for Extension](/media/articles/extensions/authentication-api-debugger/consent.png)

::: note
The extension will communicate to the Management API on your behalf to retrieve details about the Applications which you have configured in your Auth0 Dashboard, and use this information to call the Authentication API endpoints.
:::

Once you accept, you will be navigated to the extension's views.

## Basic Configuration

The basic configuration for all flows can be found on the _Configuration_ tab.

![Extension Configuration Screen](/media/articles/extensions/authentication-api-debugger/configuration.png)

* **Domain**: The domain for your tenant. This field is read-only and only displayed for informational purposes.
* **Application**: The Application for which you want to initiate any of the authentication flows. You can manage the list of Applications in the [Applications section](${manage_url}/#/applications) of your Auth0 Dashboard.
* **Callback URL**: The callback URL for this extension. It is important that you add this URL to the **Allowed Callback URLs** under the _Settings_ for the Application.
* **State**: Optional state information which can be sent with the authentication flow.
* **Connection**: Specify the name of the connection which you want to use to log in. You can use this parameter to bypass the main Login screen and go directly for the login screen of the relevant Identity Provider.

## Execute the Flows

Once you have specified the basic configuration, you can switch to the _OAuth2 / OIDC_ tab to execute any of the flows. For some of the flows you may need to specify more settings which can be found by scrolling down the page.

![OAuth2 / OIDC Settings](/media/articles/extensions/authentication-api-debugger/oauth-oidc-settings.png)

These settings will depend on the actual flow which is being executed, and it is suggested that you refer to the [Auth0 Authentication API documentation](/api/authentication) for more information on the applicable parameters for each flow.

Once you have executed a particular flow, you will be presented with a screen which displays the information returned from Auth0. The exact information being returned will depend on the authentication flow which was executed.

In the screenshot below you can see an example of the information which was returned after executing a normal _OAuth2/OIDC Login_ flow.

![Response Example](/media/articles/extensions/authentication-api-debugger/flow-executed.png)

You can execute another flow by selecting the _Login_ tab at the top of the page which will return you to the _Configuration_ screen.

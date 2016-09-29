---
connection: Salesforce
image: /media/connections/salesforce.png
seo_alias: salesforce
index: 6
description: How to obtain a Client Id and Client Secret for Salesforce.
---

# Obtain a *Client Id* and *Client Secret* for Salesforce

To configure a Salesforce OAuth2 connection you will need to register your Auth0 tenant on their **Administer** panel.

## 1. Register a New App

Log into [Salesforce](https://login.salesforce.com/). Click on **Setup** in the upper right, next to your account name. Navigate to **Build > Create > Apps**. Under **Connected Apps**, click **New**:

![](/media/articles/connections/social/salesforce/salesforce-register-1.png)

## 2. Complete the *New Connected App* form

1. Enter the required basic information (*Connected App Name*, *API Name* and *Contact Email*).
2. Select **Enable OAuth Settings**  under **API (Enable OAuth Settings)**.
3. Enter your callback URL: `https://${account.namespace}/login/callback`
4. Add *Access your basic information* to the **Selected OAuth Scopes**.
5. Click **Save**.

  ![](/media/articles/connections/social/salesforce/salesforce-register-2.png)

## 3. Get your *Consumer Key* and *Consumer Secret*

Once your app is registered, the page will diplay your `Consumer Key` and `Consumer Secret`:

![](/media/articles/connections/social/salesforce/salesforce-register-3.png)

## 4. Copy your *Consumer Key* and *Consumer Secret*

Go to your Auth0 [Dashboard](${manage_url}/#/connections/social) and select **Connections > Social**, then choose **Salesforce**.

Copy the `Consumer Key` and `Consumer Secret` from the **Connected App** page of your app on Salesforce into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/salesforce/salesforce-register-4.png)

:: panel-info Salesforce Community Auth

Authenticating users in a Salesforce community uses different endpoints that the regular Salesforce app.

The authorization URL for a Community site will be:

	https://{name of your community}.force.com/{community path}/oauth2/authorize

For example, if your community is names __contoso__ and it is for __customers__:

	https://contoso.force.com/customers/oauth2/authorize?response_type=token&client_id=your_app_id&redirect_uri=your_redirect_uri

Notice that Auth0 will automatically pass all required OAuth2 parameters (e.g. `response_type`, `client_id`, etc) and concatenate other elements to the path (e.g. `oauth2/authorize`). All that is required is that you configure the __base__ community site URL:

	https://contoso.force.com/customers

For full details see this [Salesforce article](http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickstart_communities.htm).

It is common to customize the login page for __Community__ sites. If you do so, remember that the login page is part of the login transaction and you must honor the OAuth2 flow.

[This sample](https://github.com/salesforceidentity/basic-custom-login) provides details on how to do it properly.
::

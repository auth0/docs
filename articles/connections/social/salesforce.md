---
title: Connect your app to Salesforce
connection: Salesforce
image: /media/connections/salesforce.png
seo_alias: salesforce
index: 6
description: How to connect your app to Salesforce using Auth0.
toc: true
topics:
  - connections
  - social
  - salesforce
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Salesforce

To configure a Salesforce OAuth2 connection you will need to register your Auth0 tenant on their **Administer** panel.

## 1. Register a New App

Log into [Salesforce](https://login.salesforce.com/). Click on **Settings > Setup** in the upper right, next to your account name.

![](/media/articles/connections/social/salesforce/salesforce-register-1a.png)

Navigate to **Platform Tools > Apps**. Under **App Manager**, click **New Connected App**:

![](/media/articles/connections/social/salesforce/salesforce-register-1b.png)

## 2. Complete the New Connected App form

1. Enter the required basic information (*Connected App Name*, *API Name* and *Contact Email*).
2. Select **Enable OAuth Settings**  under **API (Enable OAuth Settings)**.
3. Enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

4. Add *Access your basic information* to the **Selected OAuth Scopes**.
5. Click **Save**.

  ![](/media/articles/connections/social/salesforce/salesforce-register-2.png)

## 3. Get your Consumer Key and Consumer Secret

Once your app is registered, the page will display your `Consumer Key` and `Consumer Secret`:

![](/media/articles/connections/social/salesforce/salesforce-register-3.png)

## 4. Copy your Consumer Key and Consumer Secret

Go to your Auth0 [Dashboard](${manage_url}/#/connections/social) and select **Connections > Social**, then choose **Salesforce**.

Copy the `Consumer Key` and `Consumer Secret` from the **Connected App** page of your app on Salesforce into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/salesforce/salesforce-register-4.png)

## Salesforce Community Authentication

Authenticating users in a Salesforce community uses different endpoints that the regular Salesforce app.

The authorization URL for a Community site will be: `https://{name of your community}.force.com/{community path}/oauth2/authorize`.

In this example, the community is named __contoso__ and it is for __customers__: 

```text
https://contoso.force.com/customers/oauth2/authorize?
response_type=token&
client_id=your_app_id&
redirect_uri=your_redirect_uri
```

Notice that Auth0 will automatically pass all required OAuth2 parameters (such as `response_type`, `client_id`, and so on) and concatenate other elements to the path (such as `oauth2/authorize`). All that is required is that you configure the __base__ community site URL: `https://contoso.force.com/customers`.

::: note
For full details refer to this [Salesforce article](http://www.salesforce.com/us/developer/docs/chatterapi/Content/quickstart_communities.htm).
:::

It is common to customize the login page for __Community__ sites. If you do so, remember that the login page is part of the login transaction and you must honor the OAuth2 flow. [This sample](https://github.com/salesforceidentity/basic-custom-login) provides details on how to do it properly.

<%= include('../_quickstart-links.md') %>

---
connection: Salesforce
image: /media/connections/salesforce.png
seo_alias: salesforce
index: 6
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

Go to your Auth0 [Dashboard](${uiURL}/#/connections/social) and select **Connections > Social**, then choose **Salesforce**.

Copy the `Consumer Key` and `Consumer Secret` from the **Connected App** page of your app on Salesforce into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/salesforce/salesforce-register-4.png)

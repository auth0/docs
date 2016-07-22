---
connection: Planning Center
image: /media/connections/planning-center.png
seo_alias: planning-center
---

# Obtain a *Client ID* and *Secret* for Planning Center

To configure an OAuth2 connection with Planning Center Online, you will need to register Auth0 with Planning Center on their Developer portal.

## 1. Log into the Planning Center Developer portal

Go to the [Planning Center Developer](https://api.planningcenteronline.com/) portal. Log in with your credentials and click **Register** on the **Developer Applications** page:

![](/media/articles/connections/social/planning-center/planning-center-api-1.png)

## 2. Complete information about your instance of Auth0

Complete the form. In the **Authorization callback URLs** field, enter this URL:

	https://${account.namespace}/login/callback

and click **Submit**:

![](/media/articles/connections/social/planning-center/planning-center-api-2.png)

## 3. Get your *Client ID* and *Secret*

Once your app is registered, your `Client Id` and `Secret` will be displayed:

![](/media/articles/connections/social/planning-center/planning-center-api-3.png)

## 4. Copy your *Client Id* and *Secret*

Go to the [Social Connections](${uiURL}/#/connections/social) page of your Auth0 Dashboard and select **Planning Center**.

Copy the `Client Id` and `Secret` from the **Developer Applications** page of the Planning Center Developer portal into the fields on this page on Auth0.

![](/media/articles/connections/social/planning-center/planning-center-api-4.png)

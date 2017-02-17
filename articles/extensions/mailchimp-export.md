# Auth0 Extension: MailChimp Export

The Auth0 MailChimp Export Extension allows you to synchronize your Auth0 user base with your MailChimp user base. After you install and enable this Extension, Auth0 will sync the users in both domains using their email addresses.

Get the [MailChimp Export repository](https://github.com/auth0/auth0-mailchimp-export).

**Note**: This tutorial assumes that you already have a MailChimp list with users.

## Create Your MailChimp API Key

1. Log in to your MailChimp account.
2. In the top right corner of the MailChimp dashboard, click on **your name** to open the dropdown menu.
3. Select **Account**.
4. Click the **Extras** tab and select **API keys** from the dropdown menu.
5. Scroll down to the *Your API keys* section, and click **Create A Key**. When your new key is ready, you'll see a green banner at the top of your screen that says, "Your new API key is ready to use."

Make note of your new **API key**, since you will need it to complete configuration of the Auth0 Extensions.

## Auth0

1. Log in to your Auth0 account, and navigate to the Extensions page.
2. Click on **New Extension**.
3. Provide the URL to the GitHub repo that hosts the MailChimp Export Extension files. Click **Continue**
4. You will see the configuration page for the Extension. Provide the following details:

  * **Schedule**: the frenquency with which the Extension (which is a CRON job) runs. You can select from the following time intervals:
    * Every 5 minutes;
    * Every 30 minutes;
    * Every hour;
    * Every day.
  * **AUTH0_DOMAIN**: the domain for your instance of Auth0;
  * **AUTH0_CLIENT_ID**: the ID of your Auth0 Client;
  * **AUTH0_CLIENT_SECRET**: the Secret for your Auth0 Client;
  * **MAILCHIMP_API_KEY**: the API key associated with your MailChimp user account;
  * **MAILCHIMP_LIST_NAME**: the name of the MailChimp List to which you want to export Auth0 user profiles;
  * **AUTH0_CONNECTION_NAME**: the name of the Auth0 Connection associated with the user profiles to which you want exported to MailChimp.

  Click **Install** to finish installing your Extension using the settings you provided.

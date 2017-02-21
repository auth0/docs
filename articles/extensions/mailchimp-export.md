# Auth0 Extension: MailChimp Export

The Auth0 MailChimp Export Extension allows you to synchronize your Auth0 user base with your MailChimp user base. After you install and enable this Extension, Auth0 will sync the users in both domains using their email addresses.

Get the [MailChimp Export Extension](https://github.com/auth0/auth0-mailchimp-export) via GitHub.

**Note**: This tutorial assumes that you already have a MailChimp list with users.

![Mailchimp Subscriber List](/media/articles/extensions/mailchimp-export/mailchimp-subscriber-list.png)

## Create Your MailChimp API Key

1. Log in to your MailChimp account.
2. In the top right corner of the MailChimp dashboard, click on **your name** to open the dropdown menu.

  ![Mailchimp Dashboard](/media/articles/extensions/mailchimp-export/mailchimp-dashboard.png)

3. Select **Account**.
4. Click the **Extras** tab and select **API keys** from the dropdown menu.

  ![Mailchimp API Keys Selection Menu](/media/articles/extensions/mailchimp-export/mailchimp-api-key.png)

5. Scroll down to the *Your API keys* section, and click **Create A Key**.

  ![Mailchimp API Keys Dashboard](/media/articles/extensions/mailchimp-export/mailchimp-api-keys-dashboard.png)

  When your new key is ready, you'll see a green banner at the top of your screen that says, "Your new API key is ready to use."

  ![Mailchimp API Key Ready Banner](/media/articles/extensions/mailchimp-export/mailchimp-new-api-key-ready.png)

Make note of your new **API key**, since you will need it to complete configuration of the Auth0 Extensions.

## Auth0

1. Log in to your Auth0 account, and navigate to the [Extensions](${manage_url}/#/extensions) page.

  ![Extensions Dashboard Page](/media/articles/extensions/mailchimp-export/dashboard-extension-page.png)

2. Click on **New Extension**.

3. Provide the URL to the GitHub repo that hosts the MailChimp Export Extension files. Click **Continue**

  ![Create New Extension Dialog](/media/articles/extensions/mailchimp-export/new-extension.png)

4. You will see the installation page for the Extension.

  ![Install Extension Dialog](/media/articles/extensions/mailchimp-export/new-ext-config.png)

  Provide the following details:

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

5. You will see the MailChimp Export Extension under the *Installed Extensions* tab.

  ![Installed Extensions Tab](/media/articles/extensions/mailchimp-export/mailchimp-install-complete.png)

## Check the Status of the MailChimp Export

You can check the status of your MailChimp Export. To do so, click on **Auth0 MailChimp Export** on the *Installed Extensions* tab.

  ![Installed Extensions Tab](/media/articles/extensions/mailchimp-export/mailchimp-install-complete.png)

This brings up the *Scheduled Jobs* page, which displays the following information for your MailChimp Export, as well as any other CRON jobs you have configured for your Auth0 account:

* **Job name**: the unique identifier for a given CRON job;
* **Created**: the amount of time that has elapsed since you created the job;
* **State**: a slider that indicates whether you have enabled the job or not--you can use this to toggle this setting on/off;
* **Next run**: the amount of time before the job runs next;
* **Last result**: the job result from the previous run.

  ![Scheduled Jobs Page](/media/articles/extensions/mailchimp-export/scheduled-jobs.png)

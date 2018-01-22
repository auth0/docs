---
description: Explains how to install the Auth0 WordPress plugin.
---
# Installation of the Login by Auth0 WordPress Plugin

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/wordpress-plugin-banner.png)

::: note
In order to install or customize plugins, you must use a self-hosted WordPress.org site. Using a WordPress.com site does not allow installing plugins. [More information on the differences here](https://en.support.wordpress.com/com-vs-org/).
:::

Plugins can be added to your WordPress site automatically or manually. Both processes are covered [here in the WordPress Codex](https://codex.wordpress.org/Managing_Plugins#Installing_Plugins).

As soon as the plugin is activated, you are redirected to the start of the Setup Wizard.

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-step-1.png)

If you don't already have an Auth0 account, click the **[Sign Up For Free](https://auth0.com/signup).** button and create one before proceeding. 

## Social Login (basic setup)

Click **Social** then **Manual Setup** to walk through the basic setup.

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-social-modal.png)

In the modal that appears, enter the domain name for your tenant and a valid, manually-generated access token. [Follow the instructions here](/api/management/v2/tokens#get-a-token-manually) - "Get a token manually" section - to create the token and find your domain.  

If the first part of the setup successfully completes, you'll see the "Configure your social connections" screen. If not, to go Auth0 > Settings > Basic, delete your Client ID and domain, then click **Setup Wizard** in the admin menu to start again. Check the Auth0 Error Log in wp-admin for more information about what went wrong and [post in our Community](https://community.auth0.com/topics/wordpress) if you need support. 

Click **Next** to continue the setup process by migrating your administrator account.

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-migrate-admin.png)

This step connects your WordPress user with an Auth0 user that authorizes you to log in. You can choose the same password as your admin account or different but make sure it conforms to the ["Fair" password policy described here](/connections/database/password-strength#password-policies) (the default for this plugin).

When you see the "Done" screen, Auth0 is setup and ready to accept logins and, if configured, sign ups!

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-complete.png)

This is a good time to confirm that the basics are working for your site before changing any of the default settings:

1. Log out of WordPress and confirm that the Auth0 form now appears at /wp-login.php
2. Log in with the Auth0 user created above
3. Log out and try creating an account with a different email address (if you have "Anyone can register" turned on in your General WordPress settings)
4. Try logging in using a social connection (if you've turned those on)

Now you're ready to [Configure](/cms/wordpress/configuration)!

## Read Next

::: next-steps
* [Configuration](/cms/wordpress/configuration)
* [How does it work?](/cms/wordpress/how-does-it-work)
* [JWT Authentication](/cms/wordpress/jwt-authentication)
* [Troubleshoot](/cms/wordpress/troubleshoot)
:::


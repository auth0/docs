---
description: Explains how to install the Auth0 WordPress plugin.
tags:
    - wordpress
    - cms
---
# Installation of the Login by Auth0 WordPress Plugin

::: note
In order to install or customize plugins, you must use a self-hosted WordPress.org site. Using a WordPress.com site does not allow installing plugins. [More information on the differences here](https://en.support.wordpress.com/com-vs-org/).
:::

Plugins can be added to your WordPress site automatically or manually. Both processes are covered [here in the WordPress Codex](https://codex.wordpress.org/Managing_Plugins#Installing_Plugins).

As soon as the plugin is activated, you are redirected to the start of the Setup Wizard.

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-step-1.png)

If you don't already have an Auth0 account, click the **[Sign Up For Free](https://auth0.com/signup).** button and create one before proceeding. 

::: note
Auth0 will not replace your login forms until a **Domain**, **Client ID**, and **Client Secret** have been added to the Basic tab of the settings page.
:::

## Multisite setup

The Login by Auth0 plugin is compatible with WordPress multisite networks. The plugin can be network activated to automatically protect network sites (once configuration is complete) or activated only on a sub-set of the network.

There are a few ways that a network of sites can be setup in Auth0:

1. All sites can share both an Application and a database connection:
	1. Run the Setup Wizard steps to completion for the main site.
	2. Setup all other sites manually using the **Domain**, **Client ID**, and **Client Secret** from the main site in the Basic tab of the Auth0 settings page.
	3. Update the Application's **Allowed Callback URLs**, **Allowed Web Origins** , and **Allowed Logout URLs** to include each site (wildcards can be used if your network uses subdomains).
2. Each site can have it's own Application and share a database connection:
	1. Run the Setup Wizard steps to completion for the main site.
	2. Next, create an Application for each of the sites [manually](/cms/wordpress/configuration) and add each one to the previously-created database connection.
	3. Add the **Domain**, **Client ID**, and **Client Secret** values to the Basic tab of the Auth0 settings page for each site.
3. Each site can have it's own Application and it's own database connection. In this case, Run the Setup Wizard steps to completion for each site.

Each of the options above has trade-offs. Option 1 has the least number of different entities to manage in Auth0 but, if your network has hundreds of sites and you're not using subdomains, you might run into limitations with the number of callback URLs. Option 2 will require managing many different Applications but will allow you to configure each site's Application differently. 

As always, if you have any questions about this setup process, create a post on our [Community](https://community.auth0.com/tags/wordpress) tagged "wordpress."

## Setup Wizard - Standard

Click **Standard** to start the basic Auth0 setup to allow username + password, social, and Passwordless logins.

![WordPress Installation select setup type](/media/articles/cms/wordpress/setup-wizard-select-setup.png)

### Option 1: Standard Setup

This will create and configure an Application and a database connection for this site.

![WordPress Installation standard setup fields](/media/articles/cms/wordpress/setup-wizard-social-modal.png)

In the modal that appears, enter the domain name for your tenant and a valid, manually-generated Access Token. [Follow the instructions here](/api/management/v2/tokens#get-a-token-manually) - "Get a token manually" section - to create the token and find your domain.  

If the first part of the setup successfully completes, you'll see the "Configure your social connections" screen. If not, to go **Auth0 > Settings > Basic**, delete your Client ID and domain, then click **Setup Wizard** in the admin menu to start again. Check the Auth0 Error Log in wp-admin for more information about what went wrong and [post in our Community](https://community.auth0.com/tags/wordpress) if you need support. 

Click **Next** to continue the setup process by migrating your administrator account.

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-migrate-admin.png)

This step connects your WordPress user with an Auth0 user that authorizes you to log in. You can choose the same password as your admin account or different but make sure it conforms to the ["Fair" password policy described here](/connections/database/password-strength#password-policies) (the default for this plugin).

### Option 2: User Migration Setup

This will create and configure an Application and a database connection plus data migration from your WordPress database. This requires an inbound connection from Auth0 servers and cannot be changed later without losing data. [More information here](/cms/wordpress/how-does-it-work#scenario-data-migration).

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/auth0-authorize-app.png)

Once the setup process is complete, log out of your WordPress site and attempt to log back in using your existing WordPress credentials in the Auth0 login form. This should create an Auth0 user linked to your WordPress account. 

### Option 3: Manual Setup

This will skip the automatic setup and allow you to create and configure your own Application and database connection ([see below](#manual-setup)). This should be used if you want this site to use an existing Application or database connection. 

## Setup complete

When you see the "Done" screen, Auth0 is setup and ready to accept logins and, if configured, signups!

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-complete.png)

This is a good time to confirm that the basics are working for your site before changing any of the default settings:

1. Log out of WordPress and confirm that the Auth0 form now appears at `/wp-login.php`.
1. Log in with the Auth0 user created above.
1. Log out and try creating an account with a different email address (if you have "Anyone can register" turned on in your General WordPress settings).
1. Try logging in using a social connection (if you've turned those on).

Now you're ready to [Configure](/cms/wordpress/configuration)!

## Manual setup

The plugin can be configured using the built-in setup wizard (covered below) or manually by creating an Application and 
assigning connections. The completely manual setup process can be used if you're having trouble with the 
wizard, have been through the setup process before, or want to share a database connection between Applications.

1. In your Auth0 [Dashboard](${manage_url}), click **Applications** then **Create Application**
1. Give your Application a descriptive name, select **Regular Web Applications**, then **Create**
1. Follow the [Application setup instructions](/cms/wordpress/configuration) closely through the "Update Auth0 settings in WordPress" section to configure the application for your WordPress installation

Once the steps above are complete, your site will be configured and ready to use!

## Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Troubleshooting](/cms/wordpress/troubleshoot)
* [Extend the plugin](/cms/wordpress/extending)
:::

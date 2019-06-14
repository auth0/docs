---
description: Explains how to install the Auth0 WordPress plugin.
topics:
    - wordpress
    - cms
contentType: how-to
useCase:
  - add-login
  - build-an-app
  - customize-connections
  - secure-an-api
  - manage-users  
---
# Installation of the Login by Auth0 WordPress Plugin

::: note
In order to install or customize plugins, you must use a self-hosted WordPress.org site. Using a WordPress.com site does not allow installing plugins. [More information on the differences here](https://en.support.wordpress.com/com-vs-org/).
:::

This plugin can be added to your WordPress site using the **Plugins** screen in the wp-admin:

1. Log into an existing WordPress site as an administrator.
2. Go to **Plugins > Add New** in the admin menu on the left.
3. Search for "Login by Auth0"
4. For the Login by Auth0 plugin, click **Install Now**, then **Activate**.

This process and other methods are covered [in the WordPress documentation](https://wordpress.org/support/article/managing-plugins/#installing-plugins).

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
	3. Update the Application's **Allowed Callback URLs**, **Allowed Web Origins**, and **Allowed Logout URLs** to include each site (wildcards can be used if your network uses subdomains).
2. Each site can have its own Application and share a database connection:
	1. Run the Setup Wizard steps to completion for the main site.
	2. Next, create an Application for each of the sites [manually](/cms/wordpress/configuration) and add each one to the previously-created database connection.
	3. Add the **Domain**, **Client ID**, and **Client Secret** values to the Basic tab of the Auth0 settings page for each site.
3. Each site can have its own Application and its own database connection. In this case, Run the Setup Wizard steps to completion for each site.

Each of the options above has trade-offs. Option 1 has the least number of different entities to manage in Auth0 but, if your network has hundreds of sites and you're not using subdomains, you might run into limitations with the number of callback URLs. Option 2 will require managing many different Applications but will allow you to configure each site's Application differently.

As always, if you have any questions about this setup process, create a post on our [Community](https://community.auth0.com/tags/wordpress) tagged "wordpress."

## Setup Wizard

The Setup Wizard will attempt to create all the necessary components needed to use Auth0 on your WordPress site. If you have an existing Application or Database Connection you want to use, please see the [Manual Setup](#manual-setup) steps below.

### Option 1: standard setup

This will create and configure an Application and a Database Connection for this site.

First, [follow the instructions](/api/management/v2/get-access-tokens-for-test#get-access-tokens-manually) for generating a Management API token. Once the token is generated, make a note of the domain name used in the **Identifier** field under the **Settings** tab. For example, if your Identifier is `https://tenant-name.auth0.com/api/v2/`, then the tenant domain is `tenant-name.auth0.com`. [More about tenant Domains can be found here](https://auth0.com/docs/getting-started/the-basics#domains).

Back in the WordPress admin's Setup Wizard, click **Standard**. In the modal that appears, click **Start Standard Setup**.

![WordPress Installation standard setup fields](/media/articles/cms/wordpress/setup-wizard-social-modal.png)

Enter the tenant domain and API token from above. This token is only used for the setup process and will not be saved in the database.

If the first part of the setup successfully completes, you'll see the "Configure your social connections" screen. Click **Next** to continue the setup process by migrating your administrator account.

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/setup-wizard-migrate-admin.png)

This step connects your WordPress user with an Auth0 user that authorizes you to log in. You can choose the same password as your admin account or different but make sure it conforms to the ["Fair" password policy described here](/connections/database/password-strength#password-policies) (the default for this plugin).

If the Setup Wizard does not finish successfully, check the Auth0 Error Log in wp-admin for more information about what went wrong.

To start the process over completely, delete any Applications or Database Connections that were created in the Auth0 Dashbaord. In WordPress, to go **Auth0 > Settings > Basic**, delete the Client ID field, and click **Save**. Finally, click **Setup Wizard** in the admin menu to start the process over again.

If you're still not able to install, [please post a thread in our Community](https://community.auth0.com/tags/wordpress) with the error messages you're seeing in the Error Log and we'll be happy to help!

### Option 2: user migration setup

This will create and configure an Application and a database connection plus data migration from your WordPress database. This requires an inbound connection from Auth0 servers and cannot be changed later without losing data. [More information on user migration is here](/cms/wordpress/user-migration).

:::warning
If you have more than one custom database connection in Auth0, you'll need to make sure that the user IDs are namespaced to avoid conflicts. This is done automatically for sites installing version 3.11.0 or later. If your connections are/were being created with an earlier version, please see the [troubleshooting steps here](/cms/wordpress/user-migration#cannot-change-email-or-incorrect-user-data).
:::

![WordPress-Auth0 Plugin Banner](/media/articles/cms/wordpress/auth0-authorize-app.png)

Once the setup process is complete, log out of your WordPress site and attempt to log back in using your existing WordPress credentials in the Auth0 login form. This should create an Auth0 user linked to your WordPress account.

### Option 3: manual setup

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

## Keep reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Troubleshooting](/cms/wordpress/troubleshoot)
* [Extend the plugin](/cms/wordpress/extending)
:::

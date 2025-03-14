---
description: This page explains the user migration feature of the Login by Auth0 WordPress Plugin
toc: true
topics:
    - wordpress
    - cms
---
# User Migration in Login by Auth0

The User Migration functionality uses a core Auth0 feature, [Custom Databases](https://auth0.com/docs/connections/database/custom-db), combined with URL endpoints in the Login by Auth0 plugin to allow users to authenticate with existing WordPress user accounts.

## How It Works

When you enable data migration, the plugin exposes two secure endpoints that allow Auth0 to authenticate users using WordPress accounts. These endpoints are secured with a secret token and can be set only to allow IP addresses used by Auth0.

The login flow is as follows:

1. A user attempts to login with an Auth0 login form (embedded on your site or hosted at Auth0).
2. If Auth0 can't find a user associated with the provided credentials in your database connection, it proceeds to call the migration endpoint on your WordPress site with the user credentials and the migration token.
3. The plugin finds a user in your WordPress database with the provided username/email and verifies the password.
4. If a user can be successfully authenticated, Auth0 creates the user in the database connection for your site, authenticates the user, and logs them in.
5. The next time the user logs in, they will use the Auth0 user, and the migration endpoint will be skipped.

User Migration must be set up when the site is first connected to Auth0. Attempting to turn on or off custom database scripts for a database connection that has already had users will fail. See the **Troubleshooting** section for more information about moving between modes.

## Setup and Configuration

The easiest way to setup User Migration is to use the Setup Wizard when the plugin is first installed. [That process is described here](https://auth0.com/docs/cms/wordpress/installation#option-2-user-migration-setup).

If the User Migration Setup Wizard could not complete or you want to see the process in more detail, follow the steps below. Again, this is starting from scratch with a database connection that does not have any users. The following process should be completed on a site with no traffic or with maintenance mode turned on.

1. Make sure you have an Application [created and configured correctly](https://auth0.com/docs/cms/wordpress/configuration#application-setup) and an empty Database Connection [created and activated for the Application](https://auth0.com/docs/cms/wordpress/configuration#database-connection-setup). These can be the same as the ones created in the [Standard Setup Wizard process](https://auth0.com/docs/cms/wordpress/installation#option-1-standard-setup) or created from scratch.
2. In the **Auth0 > Settings** screen in WordPress, make sure the Application's Domain, Client ID and Client Secret are saved in the correct fields in the **Basic** tab.
3. On the **Advanced** tab, turn on the "User Migration Endpoints" setting and click **Save Changes**. If you are using [constant-based settings](https://auth0.com/docs/cms/wordpress/configuration#php-constant-setting-storage), set `AUTH0_ENV_MIGRATION_WS` to `true` and `AUTH0_ENV_MIGRATION_TOKEN` to a secure random string at least 16 digits long and without single quotes or backslashes.
4. Under the settings, you should now see a **Security Token**. Keep this page open as you will need this value later on in the process.
5. In the Auth0 Dashboard, go to the Database Connection you want to use and turn on **Requires Username** and **Import Users to Auth0**.
6. Now click the **Custom Database** tab and turn on **Use my own database**
7. There should be two tabs below this setting under the "Database Action Scripts" heading, one for **Login** and one for **Get User**
8. Click on the **Login** tab
9. Clear out all the existing code, open [this link](https://raw.githubusercontent.com/auth0/wp-auth0/master/lib/scripts-js/db-login.js) in a new tab, copy all the code there, and paste it into the code editor back in Auth0.
10. **This step is for versions 3.10.0 and earlier:** Look for `{THE_WS_URL}` and replace that with your WordPress instance's site URL, followed by `/index.php?a0_action=migration-ws-login`. The site URL can be found in the **Settings > General** screen in wp-admin. You can test this by pasting the complete URL in your browser. You should see `{"status":401,"error":"Unauthorized"}`.
11. **This step is for versions 3.10.0 and earlier:** Look for `{THE_WS_TOKEN}` and replace that with the token that appears under the "User Migration Endpoints" setting.
12. There should be no errors in the editor. If everything looks good, click **Save** at the top.
13. **This step is for 3.11.0 and later:** Scroll down to **Settings** and add the following configuration variables:
  - `endpointUrl` set to your WordPress instance's site URL (**wp-admin > Settings > General >** "Site URL" field), followed by `/index.php?a0_action=`.
  - `migrationToken` set to the security token value seen in step 4 above.
  - `userNamespace` set to your Application name in Auth0 or any other value only including letters, numbers, and dashes.

![WordPress User Migration - Database Configuration](/media/articles/cms/wordpress/auth0-custom-database-config.png)

14. Click the **Try** button at the top and use a valid WordPress user account in the form that appears. You should see the "The profile is" followed by the user's data. If not, please see the [**Troubleshooting**](#troubleshooting) section below.
15. Now click on the **Get User** tab, clear out all the existing code, open [this link](https://raw.githubusercontent.com/auth0/wp-auth0/master/lib/scripts-js/db-get-user.js) in a new tab, copy all the code there, and paste it into the code editor back in Auth0.
16. **This step is for 3.10.0 and earlier:** Look for `{THE_WS_URL}` and replace that with your WordPress instance's site URL, followed by `/index.php?a0_action=migration-ws-get-user`. The site URL can be found in the **Settings > General** screen in wp-admin. You can test this by pasting the complete URL in your browser. You should see `{"status":401,"error":"Unauthorized"}`.
17. **This step is for 3.10.0 and earlier:** Look for `{THE_WS_TOKEN}` and replace that with the token that appears under the "User Migration Endpoints" setting.
18. There should be no errors in the editor. If everything looks good, click **Save** at the top.
19. Click the **Try** button at the top and use an email with a valid WordPress user account in the form that appears. You should see the "The profile is" followed by the user's data. If not, please see the [**Troubleshooting**](#troubleshooting) section below.
20. In a new browser session, navigate to a login page on the WordPress site and attempt to login (the user should not already exist in the database). You'll notice that the login process takes a little longer than usual at first but should succeed. Subsequent logins will be faster.
21. (OPTIONAL) To turn on additional security for the migration endpoints, go to **Auth0 > Settings** screen in WordPress, turn on "Migration IPs Whitelist," and then **Save Changes**. Attempt to log in with a different user to test that Auth0 can still reach the endpoints.

At this point, the User Migration setup is complete, and existing WordPress users will be trickle migrated to the Auth0 Database Connection.

## Troubleshooting

Issues with the User Migration typically come from a few places:

- Incorrect URL or token in the custom database scripts.
- IP whitelist turned on but with incorrect IP addresses.
- Restricted or cached endpoints on your WordPress instance.

The best way to start troubleshooting the issue is to use the **Try** button for the **Login** script found in the Custom Database tab of the Database Connection being used on [Auth0 Dashboard > Connections > Database Connections](${manage_url}/#/connections/database). The following are the error messages you might see and the steps to take to fix.

### "Unexpected token < in JSON at position 0"

This means the custom script is not getting data back in a format it can use. An incorrect endpoint URL likely causes this in the database script.

First, copy the URL on line 10 in the script and paste it in your browser. If the endpoint is correct, it should display one of the two messages below:

```
{"status":401,"error":"Unauthorized"}

// or

{"status":403,"error":"Forbidden"}
```

If what you're seeing is the home page or a 404, then the URL is incorrect. Look for your site URL under **Settings > General > Site URL** in the WordPress admin. Add `/index.php?a0_action=migration-ws-login` to the end for the Login script and `/index.php?a0_action=migration-ws-get-user` to the end for the Get User script.

- **For versions 3.10.0 and earlier**: The URL value should appear in the script itself as the first parameter in the `request.post` call.
- **For versions 3.11.0 and later**: The token value should be saved in a configuration variable. Add the following to the first line of the function and use the **Try** button to see what is stored for `endpointUrl`:

```js
callback(null, configuration);
```

If you're sure the URLs are correct and are still having this issue, check with your host to make sure those URLs are not cached or restricted in any way.

### "Wrong email or password"

This is the default error shown if anything else goes wrong. The easiest way to troubleshoot what's happening is to temporarily output the error that's being sent back (these are opaque by default to avoid displaying anything that might give attackers something to work with).

On line 30 of the Login script, change:

```js
callback(null);
```

... to:

```js
callback(wpUser.error);
```

... save the script, and try the connection again. You should see one of the following messages and be able to pinpoint the issue with the steps below. Once you've solved the issue, change the script back to what it was.

#### "Forbidden"

This means that the migration endpoints are turned off in your WordPress install. Go to **Auth0 > Settings > Advanced** and turn on the "User Migration Endpoints" setting. Make sure the token that appears there is the same as what is used for both custom database scripts:

- **For versions 3.10.0 and earlier**: The token value should appear in the script itself after `access_token:`
- **For versions 3.11.0 and later**: The token value should be saved in a configuration variable. Add the following to the first line of the function and use the **Try** button to see what is stored for `migrationToken`:

```js
callback(null, configuration);
```

#### "Unauthorized"

This means that the migration IP whitelist is turned on, but the incoming IP address is not on the list. Just below the Login script you should see a list of IP addresses:

![WordPress User Migration - Auth0 IP Addresses](/media/articles/cms/wordpress/auth0-incoming-ip-addresses.png)

Make sure all of those IP addresses appear below the "Migration IPs Whitelist" field under **Auth0 > Settings > Advanced** in the plugin:

![WordPress User Migration - IP Whitelist](/media/articles/cms/wordpress/migration-ip-whitelist-setting-field.png)

If one or more of the IP addresses listed in Auth0 do not appear in WordPress, add the missing ones into the field and save the settings page. Also, please post in the Auth0 [Community](https://community.auth0.com/tags/wordpress) (tagged  `wordpress`) with the missing IP address(es), so we can address the issue.

#### "Unauthorized: missing authorization header"

The security token is either missing in the database script (line 16), or your server is not processing the headers correctly. Check the Login script and make sure that the token exists and matches what is in WordPress. If the token is there and correct, then you'll need to talk to your host to enable the `Authorization` header to be parsed. See [this StackOverflow thread](https://stackoverflow.com/questions/17018586/apache-2-4-php-fpm-and-authorization-headers) for server troubleshooting and use [the plugin code](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_Routes.php#L138) as a reference for how the token is retrieved.

#### "Invalid token"

The security token in the database script is incorrect. Check the Login script line 16 and make sure that the token matches what is in WordPress.

#### "Invalid Credentials"

The email address and/or password being used is incorrect. Check to make sure you're entering the correct email address and that the password is correct. You can reset the user password to something else to make sure you have the correct one.

### Cannot Change Email or Incorrect User Data

If you are using more than one custom database connection in your Auth0 tenant and you're unable to change the email address or are getting user data stored for the wrong user, it's likely that you have overlapping user IDs in Auth0. This problem has been fixed for new sites installing 3.11.0 but, for connections created before then, this will need to be manually fixed by doing one of the following:

* If you don’t have any user data stored that needs to be kept (if you’re only using the connection to support login and not storing any metadata), you can create a new custom database connection using the steps above (using the 3.11.0 notes) and switch the Application to this new connection (make sure to turn the old connection off). The migration will be restarted, and there will be no impact on the user experience.
* If you do have data in Auth0 that needs to be kept, you can use our [User Import/Export Extension](/extensions/user-import-export) to adjust the user data.
  1. Create a new custom database connection using the steps above (using the 3.11.0 notes).
  2. Export all users from the existing connection (we recommend putting your site in maintenance mode while doing the switch-over, so no users are missed).
  3. Change all user IDs to add the namespace used when creating the new connection. User IDs should go from something like `auth0|123` to `auth0|Your-WP-Site-Name|123`. Adjust all other fields you need to follow the [import schema](/users/references/bulk-import-database-schema-examples).
  4. Turn the new connection on and the old connection off for your application.
  5. Import the new user data into the new connection and test.
* If you have a paid account, you can contact our support team to run a database update script to change the user IDs to a namespaced version and add the namespace to your database script at the same time (step 12 in [Setup and Configuration](#setup-and-configuration) above).

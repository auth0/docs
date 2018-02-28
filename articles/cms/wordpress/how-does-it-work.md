---
description: This page explains the scenarios of how Auth0 integrates with WordPress.
---

# Auth0-WordPress Integration

## Login Scenarios

![](/media/articles/cms/wordpress/plugin-auth-page.png)

###  Case 1: Login attempt by user who exists in Auth0 but not in WordPress 
#### Solution : Auth0 creates a new user profile on WordPress and logs the user in.
#### How it works - 
1. The user tries to login to your WordPress site using their login credentials.
2. Auth0 attempts to authenticate the user.
3. On successful login, the Auth0-WordPress plugin receives the user's Auth0 profile.
3. Next the Auth0-WordPress plugin checks to see if there is a user in the WordPress database with credentials that match their Auth0 `user_id`. There are two possibilities here -

   * WordPress user **exists** whose credentials match an Auth0 `user_id`. Next it checks if the `email` address of the user matches.  
   >(What happens if the email address does not match ? Does the user get notified that the user id is taken ?)
   * WordPress user **does not exist** whose credentials match an Auth0 `user_id`, the Auth0-WordPress plugin creates a new user profile and logs the user in.


###  Case 2: Login attempt by user who exists in Auth0 **and** WordPress.
#### Solution : Login successful if either 'user_id' or 'email'(w verification) match.
#### How it works -
Assumption : The user exists in your WordPress database and Auth0 **prior** to installing the Auth0-WordPress plugin.

1. The user tries to login to your WordPress site using their login credentials.
2. Auth0 attempts to authenticate the user.
3. On successful login, the Auth0-WordPress plugin receives the user's Auth0 profile.
3. Next the Auth0-WordPress plugin checks to see if there is a user in the WordPress database with credentials that match their Auth0 `user_id`. There are two possiblities here -
   * WordPress user **exists** whose credentials match an Auth0 `user_id`. 
   * WordPress user **does not exist** whose credentials match Auth0 `user_id` field. In this case it will check if there is a user with matching email address. If a email match is found, the Auth0-WordPress plugin identifies a user with the provided `email`. Next it checks to see if the email is verified by Auto0 user. 
     * If the user has **verified** their email, the Auth0-WordPress plugin will update the WordPress user's `user_id` and log the user in.
     * If the user has **not verified** their email, the Auth0-WordPress plugin will end the authentication process, indicating that the user needs to verify their email prior to proceeding.

### Case 3: Login attempt by user who exists in Auth0 and a newly-created WordPress user.
#### Solution: Login Successful
#### How it works -
1. The user tries to login to your WordPress site using their login credentials.
2. Auth0 attempts to authenticate the user.
3. On successful login, the Auth0-WordPress plugin receives the user's Auth0 profile.
3. Next the Auth0-WordPress plugin checks to see if there is a user in the WordPress database with credentials that match their Auth0 `user_id`.
4. The Auth0-WordPress plugin finds the user in the WordPress database using their Auth0 user_id, so it logs the user in.

### Case 4: Data Migration

If you enable [data migration](/connections/database/migrating), the Auth0-WordPress plugin will expose two secure endpoints that allow Auth0 to authenticate the users. These endpoints are secured with a secret token and only available to IP addresses associated with Auth0. You can change this in the Auth0 Dashboard's Client [Advanced Settings](${manage_url}/#/clients) page.

#### How it works -
1. The user tries to login to your WordPress site using their login credentials.
2. Auth0 can't find a user associated with the provided credentials, so it proceeds to call the migration endpoint.
3. The Auth0-WordPress plugin finds a user in your WordPress database with the provided username/email, so it verifies the password.
4. Auth0 creates the user in your Auth0 account, authenticates the user, and logs them in.

## Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [Install the plugin](/cms/wordpress/installation)
* [Configure the plugin](/cms/wordpress/configuration)
* [JWT API authentication](/cms/wordpress/jwt-authentication)
* [Troubleshooting](/cms/wordpress/troubleshoot)
* [Extend the plugin](/cms/wordpress/extending)
:::

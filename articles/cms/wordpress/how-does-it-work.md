# How Auth0 Integrates with WordPress

There are several business flows that can occur when integrating Auth0 with your WordPress site.

![](/media/articles/cms/wordpress/plugin-auth-page.png)

### Scenario 1: A user that doesn't exist in WordPress, but exists in Auth0, attempts to log in.

1. The user access your WordPress site's login page.
2. The user provides their credentials.
3. Auth0 attempts to authenticate the user.
4. The Auth0-WordPress plugin receives the user's Auth0 profile.
5. The Auth0-WordPress plugin checks to see if there is a user in the WordPress database with credentials that match their Auth0 `user_id`.

  * If there **is** a user whose credentials match an Auth0 `user_id`, the Auth0-Wordpress plugin checks to see if there is a user with the same `email`.
  * If there **is not** a user whose credentials match an Auth0 `user_id`, the Auth0-Wordpress plugin creates a new user profile and logs the user in.


### Scenario 2: A user that exists in WordPress **and** in Auth0 attempts to log in.

In this scenario, the user has existed in your WordPress database and Auth0 *prior* to you installing the Auth0-Wordpress plugin.

1. The user access your WordPress site's login page.
2. The user provides their credentials.
3. Auth0 attempts to authenticate the user.
4. The Auth0-WordPress plugin receives the user's Auth0 profile.
5. The Auth0-WordPress plugin checks to see if there is a user in the WordPress database with credentials that match their Auth0 `user_id`.
6. Because the Auth0-WordPress plugin can't find a user whose WordPress database credentials match any of the Auth0 `user_id` fields, it will check if there is a user with the same `email`.
7. The Auth0-Wordpress plugin identifies a user with the provided `email`.
8. The Auth0-Wordpress plugin checks to see if the Auth0 user has verified their email.

    * If the user has **verified** their email, the Auth0-WordPress plugin will update the WordPress user's `user_id` and log the user in.
    * If the user has **not** verified their email, the Auth0-WordPress plugin will end the authentication process, indicating that the user needs to verify their email prior to proceeding.

### Scenario 3: A newly-created Wordpress user that exists in Auth0 attempts to log in.

1. The user access your WordPress site's login page.
2. The user provides their credentials.
3. Auth0 attempts to authenticate the user.
4. The Auth0-WordPress plugin receives the user's Auth0 profile.
5. The Auth0-WordPress plugin checks to see if there is a user in the WordPress database with credentials that match their Auth0 `user_id`.
6. The Auth0-Wordpress plugin finds the user in the WordPress database using their Auth0 user_id, so it logs the user in.

### Scenario: Data Migration

If you enable [data migration](/connections/database/migrating), the Auth0-WordPress plugin will expose two secure endpoints that allow Auth0 authenticate the users. These endpoints are secured with a secret token and only available to IP addresses associated with Auth0. You can change this in the Auth0 Dashboard's Client [Advanced Settings](${uiUrl}/#/clients) page.

The login flow is as follows:

1. The user access your WordPress site's login page and provides their credentials.
2. Auth0 can't find a user associated with the provided credentials, so it proceeds to call the migration endpoint.
3. The Auth0-WordPress plugin find a user in your WordPress database with the provided username/email, so it verifies the password.
4. Auth0 creates the user in your Auth0 account, authenticates the user, and logs them in.

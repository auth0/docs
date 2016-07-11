# How does it work?

## Regular flow

There are three different scenarios that could take place.

First, a user that not exists in WordPress and it does in your Auth0 account try to log in.

1. A user access your site's login page.
2. (s)he completes his credentials (it could be an existing user in your Auth0 account or a new signup).
3. Auth0 will authenticate the user
4. The plugin gets the user profile.
5. The plugin check if there is a user in the WordPress database with his/her Auth0 user_id.
6. It can't find any, so it will check if there is a user with the same email.
7. It can't find ant, so it will create a new user and log him/her in.

Second, a user that exists in WordPress (this user was created before you installed the plugin) and in your Auth0 account try to log in.

1. A user access your site's login page.
2. (s)he completes his credentials (it could be an existing user in your Auth0 account or a new signup).
3. Auth0 will authenticate the user
4. The plugin gets the user profile.
5. The plugin check if there is a user in the WordPress database with his/her Auth0 user_id.
6. It can't find any, so it will check if there is a user with the same email.
7. There is a user with the same email.
8. It checks if the Auth0 user has verified the email.
  - If the user has not verified the email, the process end here with an error message
9. If the email was verified, it will update the user with the Auth0 user_id and log the user in.

Third, a user that exists in WordPress (this user was created in the scenario one, or updated in the scenario two) and in your Auth0 account try to log in.

1. A user access your site's login page.
2. (s)he completes his credentials (it could be an existing user in your Auth0 account or a new signup).
3. Auth0 will authenticate the user
4. The plugin gets the user profile.
5. The plugin check if there is a user in the WordPress database with his/her Auth0 user_id.
6. It finds the user, and logs him in.

## Data migration

When [data migration](/connections/database/migrating) is enabled, the plugin will expose two secure endpoint to let Auth0 authenticate the users.

This endpoints are secured with a secret token and only available to the Auth0 IPs. You can change this in the plugin advanced settings.

The login flow is the following:

1. A user accesses your site's login page. The user has an account in your wordpress site so they proceed to login using this credentials.
2. Auth0 can't find a user with this credentials in your account, so proceds to call your migration endpoint.
3. The plugin find a user with the same username/email and verifies the password.
4. Auth0 creates the user in your account and authenticate the user successfully.

> Note: the login flow on the plugin side will be the same than the explained in the previous section. Since the user will exists in both places at the same time and we can assume the email as verified since the user's already known its password, it will fit under the second scenario.

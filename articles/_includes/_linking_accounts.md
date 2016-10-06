There may be situations where your users want to log in with multiple accounts that they own. In these cases, you may want to link these accounts together so that they are all reflected in the user's Auth0 profile. For example, if a user has signed up with email and password (which provides very little information about the user), you can ask the user to link their account to an OAuth provider like Facebook or Google to gain access to their social profile. For a detailed description of linking accounts, see the [full documentation](https://auth0.com/docs/link-accounts).

## Linking Accounts

To link accounts, call the [link a user account](/api/management/v2#!/Users/post_identities) endpoint. You will need the `id_token` and `user_id` of the primary account and the `id_token` of the secondary account.

To differentiate the login from the linking login, you will need to create a second instance of `Auth0Lock` to obtain the `id_token` of the secondary account.

Since all instances of `Auth0Lock` will receive the `authenticated` event, you will need a way to determine if the login came from the login or the linking login.

You can use the `auth.params` property of the [options object](https://github.com/auth0/lock#authentication-options) of `Auth0Lock` to add a `state` property with the value `'linking'`.
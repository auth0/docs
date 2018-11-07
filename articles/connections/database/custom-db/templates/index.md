---
description: Custom DB script templates and checklist and troubleshooting
topics:
    - connections
    - custom-database
contentType: index
useCase:
    - customize-connections
---
# Custom Database Script Templates
Auth0 provides custom database script templates that you can use when implementing functionality for use with a custom database.

## Templates
While Auth0 has populated default templates in the Dashboard script editor, you can use the following links to recover the original code and notes once you've made and saved edits.

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create User](/connections/database/custom-db/templates/create)
* [Delete User](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify User](/connections/database/custom-db/templates/verify)

## Script Template Checklist

Use the following checklist to make sure your scripts achieve the results you intend:

1. **Set a `user_id` on the returned user profile that is consistent for the same user every time.**
   In the migration scenario, this is important because if you set a random `user_id` in the `get_user` script, then call `forgot password` and change the password, the user will get duplicated every time they log in.  In the non-migration scenario, if you set a random `user_id` you can end up with duplicate users for every login.

2. **If using a `username`, ensure that you aren't returning the same email address for two different users in the `get_user` or `login` script.**
   Auth0 will produce an error if you do this, but it is better to catch it in the script itself. 

3. **If setting `app_metadata`, call it `metadata` in the script.**
   To support backwards compatibility, `app_metadata` is called `metadata` in custom DB scripts. If you don't use `metadata` in the script, you will get an error where `app_metadata` will work but if you use the API to merge `app_metadata` with a user, it will appear as if all of your metadata was lost. 

   ::: note
   `user_metadata` is not affected by this and can simply be called `user_metadata`.
   :::

4. **If using Auth0 to do machine-to-machine to the legacy database, restrict access to that audience with a rule.**
   As with any API that you create, if you create it solely for client credentials, then you will want to restrict access to the API in a rule. By default, Auth0 gives you a token for any API if you authenticate successfully and include the audience. Someone could intercept the redirect to authorize and add the audience to your legacy database API. If you don’t block this in a rule, they will get an access token.

::: note
You can also update the API to expect the sub of the token to end in `@clients`.
:::

5. **Determine if they are accessing their database directly versus through an API.**
   This item is not a requirement; it is a recommended best practice. A database interface is extremely open. You should add protections between an API endpoint and your database. Most people do not expose their database directly to the internet. Though you can whitelist Auth0 IPs, those IPs are shared in the cloud environment. In general, Auth0 recommends that you protect your database from too many actors directly talking to it. The alternative is to create a simple API endpoint that each script within Auth0 can call. That API can be protected using an access token. You can use the client credentials flow to get the access token from within the rules. 

6. **If enabling trickle migration, ensure the following:**

   * **The `Login` script and the `get_user` script both return the same user profile.**
      Because of the two different flows (logging in, or using forgot password), if the `get_user` and `login` script return different user profiles, then depending on how a user migrates (either by logging in directly, or using the forgot password flow) they will end up with different profile information in Auth0.

   * **If setting `app_metadata` or `user_metadata`, use a rule to fetch the metadata if it is missing.**
      The metadata is not migrated until https://YOUR_TENANT.auth0.com/login/callback is called. However, the user credentials are migrated during the post to `usernamepassword/login`. This means that if the browser is killed, or computer dies or something on a user after they have posted to `usernamepassword/login`, but before login/callback, then they will have a user in the Auth0 database, but their app and user metadata are lost. It is really important, therefore, to create a rule that looks a lot like your `get_user` script to fetch the profile if app and user metadata are blank. This should only execute once per user at most (and usually never).

   * **Use a rule to mark users as migrated.**
      This is not a hard requirement, but it does protect against one scenario in which a user changes their email address, then changes it back to the original email address. A rule should call out to the legacy database to mark the user as being migrated in the original database so that `get_user` can return false. 



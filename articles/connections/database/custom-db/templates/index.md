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

Use the following checklist to make sure you're scripts achieve the results you intend:

1. **Set a `user_id` on the returned user profile that is consistent for the same user every time.**
   In the migration scenario, this is important because if you try to set a random `user_id` for each login and you call `forgot password` twice, and then try to follow the second link, the user is unable to migrate. There is something happening with one of the user stores in Mongo that gets confused if you have the same email address but more than one ID, and you end up with that scenario if you do the forgot password twice. The result is that every time a user logs in, they will get a new user created in the user list. 

   In the non-migration scenario, this is important because you can end up with duplicate users in the Auth0 database.

2. **If using a `username`, ensure that you aren't returning the same email address for two different users in the `get_user` or `login` script.**
   Auth0 will produce an error if you do this, but better to catch it in the script itself. 

3. **If setting `app_metadata`, call it `metadata` in the script.**
   It is called `metadata` in Mongo, but everywhere that it is used it is translated to `app_metadata` except in custom database scripts. So you end up with an error where `app_metadata` will work, but if you ever try to use the API to merge” app_metadata with a user, it will appear as if all of your `app_metadata` was lost because it creates the new metadata field and no longer returns the original `app_metadata`.

4. **If using Auth0 to do machine-to-machine to the legacy database, restrict access in a rule to that audience.**
   Like any API that you create, if you are creating this API solely for the client credentials, then you likely want to restrict access to this API in a rule. By default Auth0 will give you a token for any API if you authenticate successfully and include the audience. Someone could intercept the redirect to authorize and add the audience to your legacy database API. If you don’t block this in a rule, they will get an access token.

::: note
You can also update the API to expect the sub of the token to end in `@clients`.
:::

5. **Determine if they are accessing their database directly versus through an API.**
   This one is not a requirement; it is just a best practice. A database interface is extremely open. There should be protections between an API endpoint and your database. Most people do not expose their database directly to the internet. Though you can whitelist Auth0 IPs, those IPs are shared in the cloud environment as well. In general, it is best practice to protect your database from too many actors directly talking to it. The alternative is to create a simple API endpoint that each script within Auth0 can call. That API can be protected using an access token. You can use the client credentials flow to get the access token from within the rules. 

6. **If enabling trickle migration, ensure the following:**
   a. **`Login` script and `get_user` script both return the same user profile.**
      Because of the two different flows (logging in, or using forgot password), if the `get_user` and `login` script return different user profiles, then depending on how a user migrates (either by logging in directly, or using the forgot password flow) they will end up with different profile information in Auth0.

   b. **If setting `app_metadata` or `user_metadata`, use a rule to fetch the metadata if it is missing.**
      The metadata is not migrated until https://YOUR_TENANT.auth0.com/login/callback is called. However, the user credentials are migrated during the post to `usernamepassword/login`. This means that if the browser is killed, or computer dies or something on a user after they have posted to `usernamepassword/login`, but before login/callback, then they will have a user in the Auth0 database, but their app and user metadata are lost. It is really important, therefore, to create a rule that looks a lot like your `get_user` script to fetch the profile if app and user metadata are blank. This should only execute once per user at most (and usually never).

   c. **Use a rule to mark users as migrated.**
      This is not a hard requirement, but it does protect against one scenario in which a user changes their email address, then changes it back to the original email address. A rule should call out to the legacy database to mark the user as being migrated in the original database so that `get_user` can return false. 



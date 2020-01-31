---
title: Custom  Database Action Script Execution Best Practices
description: Learn about best practices for custom database action script execution.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Action Script Execution Best Practices

As described in [Custom Database Connection Anatomy](/best-practices/custom-db-connections/anatomy), a custom database connection type allows you to configure action scripts, which contain custom code that is used when interfacing with your legacy identity store. Each action script is essentially a named JavaScript function that is passed a number of parameters, with the name of the function and the parameters passed dependent on the script in question. 

Action script execution supports the asynchronous nature of JavaScript, and constructs such as [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects and the like can be used. Asynchronous processing effectively results in suspension-pending completion of an operation, and an Auth0 serverless Webtask container typically has an approximately 20-second execution limit, after which the container may be recycled. Recycling of a container due to this limit will prematurely terminate operation, ultimately resulting in an error condition being returned (as well as resulting in a potential reset of the `global`(/best-practices/rules#global-object) object). 

The `callback` function supplied to each action script effectively acts as a signal to indicate completion of operation. An action script should complete immediately following a call to the callback function&mdash;either implicitly or, preferably, by explicitly executing a (JavaScript) `return` statement&mdash;and should refrain from any other operation. The (Auth0) supplied callback function must be called exactly once; calling the function more than once within an action script will lead to unpredictable results and/or errors.

::: note
Where callback is executed with no parameters, as in `callback()`, the implication is that function has been called as though `callback(null)` had been executed. 
:::

If an action script is making use of asynchronous processing, then a call to the (Auth0) supplied `callback` function must be deferred to the point where asynchronous processing completes and must be the final thing called. Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete; this callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. 

Failure to execute the `callback` function will result in a stall of execution and ultimately, in an error condition being returned. The action script must call the `callback` function exactly once. The `callback` function must be called at least once to prevent stall of execution; however, it must not be called more than once or unpredictable results and/or errors will occur.

## Keep in mind 

* Script templates, including the default templates, are not used until you click **Save**. This is true even if you only modify one script and haven't made changes to any others. You must click **Save** at least once for all the scripts to be in place. 
* Action scripts can be implemented as anonymous functions; however, anonymous functions make it hard in debugging situations when it comes to interpreting the call-stack generated as a result of any exceptional error condition. For convenience, we recommend providing a function name for each action script and have supplied some [recommended names](/best-practices/custom-db-connections/execution#recommended-script-names).
* The total size of implementation for any action script should not exceed 100 kB. The larger the size, the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any `npm` modules that may be referenced as part of any require statements. 
* Database scripts run in the same Webtask container, which is shared with all other extensibility points (such as rules, webtasks, or other databases) belonging to the same Auth0 domain. Therefore, you must carefully code for error handling and throttling.
* An action script may execute in any of the container instances already running or in a newly-created container instance (which may subsequently be added to the pool). There is no container affinity for action script execution in Auth0. This means that you should avoid storing any user-specific information in the `global` object and should always ensure that any declaration made within the `global` object provides for initialization too. Each time a Webtask container is recycled, or for each instantiation of a new Webtask container, the `global` object it defines is reset. Thus, any declaration of assignment within the `global` object associated with a container should also include provision for initialization. To provide performance flexibility, serverless Webtask containers are provisioned in Auth0 on an *ad-hoc* basis and are also subject to various recycle policies. In general, we recommend that you do not consider the life of a `global` object to be anything more than 20 minutes.

## General script checklist

Use the following checklist to make sure your scripts achieve the results you intend.

* When indicating an error condition, we recommend using the `Error` object to provide Auth0 with a clear indication of the error condition. For example, `callback(new Error(“an error message”))`.

* **Set a `user_id` on the returned user profile that is consistent for the same user every time.**
   In the migration scenario, this is important because if you set a random `user_id` in the `get_user` script and then call `forgot password` and change the password, the user will get duplicated every time they log in. In the non-migration scenario, if you set a random `user_id`, you can end up with duplicate users for every login.

* **If using a `username`, ensure that you aren't returning the same email address for two different users in the `get_user` or `login` script.**
   Auth0 will produce an error if you do this, but it is better to catch it in the script itself. 

* **If setting `app_metadata`, call it `metadata` in the script.**
   To support backwards compatibility, `app_metadata` is called `metadata` in custom DB scripts. If you don't use `metadata` in the script, you will get an error where `app_metadata` will work, but if you use the API to merge `app_metadata` with a user, it will appear as if all of your metadata was lost. 

   ::: note
   `user_metadata` is not affected by this and can simply be called `user_metadata`.
   :::

* **If using Auth0 to do machine-to-machine to the legacy database, restrict access to that audience with a rule.**
   As with any API that you create, if you create it solely for client credentials, then you will want to restrict access to the API in a rule. By default, Auth0 gives you a token for any API if you authenticate successfully and include the <dfn data-key="audience">audience</dfn>. Someone could intercept the redirect to authorize and add the audience to your legacy database API. If you don’t block this in a rule, they will get an Access Token.

   ::: note
   You can also update the API to expect the sub of the token to end in `@clients`.
   :::

* **Determine if they are accessing their database directly versus through an API.**
   This item is not a requirement; it is a recommended best practice. A database interface is extremely open. You should add protections between an API endpoint and your database. Most people do not expose their database directly to the internet. Though you can whitelist Auth0 IPs, those IPs are shared in the cloud environment. In general, Auth0 recommends that you protect your database from too many actors directly talking to it. The alternative is to create a simple API endpoint that each script within Auth0 can call. That API can be protected using an Access Token. You can use the client credentials flow to get the Access Token from within the rules.

* **If enabling trickle migration, ensure the following:**

   * **The `Login` script and the `get_user` script both return the same user profile.**
      Because of the two different flows (logging in or using forgot password), if the `get_user` and `login` script return different user profiles, then depending on how a user migrates (either by logging in directly or using the forgot password flow), they will end up with different profile information in Auth0.

   * **If setting `app_metadata` or `user_metadata`, use a rule to fetch the metadata if it is missing.**
      The metadata is not migrated until https://YOUR_TENANT.auth0.com/login/callback is called. However, the user credentials are migrated during the post to `usernamepassword/login`. This means that if the browser is killed or computer dies on a user after they have posted to `usernamepassword/login`, but before login/callback, then they will have a user in the Auth0 database, but their app and user metadata are lost. It is really important, therefore, to create a rule that looks a lot like your `get_user` script to fetch the profile if app and user metadata are blank. This should only execute once per user at most (and usually never).

   * **Use a rule to mark users as migrated.**
      This is not a hard requirement, but it does protect against one scenario in which a user changes their email address, then changes it back to the original email address. A rule should call out to the legacy database to mark the user as being migrated in the original database so that `get_user` can return false.

### Identity provider tokens

If the `user` object returns the `access_token` and `refresh_token` properties, Auth0 handles these slightly differently from other pieces of user information. They will be stored in the `user` object's `identities` property, so retrieving them using the API therefore requires an additional <dfn data-key="scope">scope</dfn>: `read:user_idp_tokens`.

```js
{
  "email": "you@example.com",
  "updated_at": "2019-03-15T15:56:44.577Z",
  "user_id": "auth0|some_unique_id",
  "nickname": "a_nick_name",
  "identities": [
    {
      "user_id": "some_unique_id",
      "access_token": "e1b5.................92ba",
      "refresh_token": "a90c.................620b",
      "provider": "auth0",
      "connection": "custom_db_name",
      "isSocial": false
    }
  ],
  "created_at": "2019-03-15T15:56:44.577Z",
  "last_ip": "192.168.1.1",
  "last_login": "2019-03-15T15:56:44.576Z",
  "logins_count": 3
}
```

## Individual script template best practices

### Recommended script names

You can use action scripts as anonymous functions; however, anonymous functions make it hard to debug when it comes to interpreting the call-stack generated as a result of any exceptional error conditions. For convenience, we recommend providing a function name for each action script and have supplied some recommended names below.

| Script Template | Recommended Name |
| --- | --- |
| Login | `login` |
| Get User | `getUser` |
| Create | `create` |
| Verify | `verify` |
| Change Password | `changePassword` |
| Delete | `deleteUser` |
| Change Email | `changeEmail` |

### Login action scripts

The [Login script](/connections/database/custom-db/templates/login) implements the function executed each time a user is required to authenticate. 

* The profile returned by the **Login** script for a user should be consistent with the profile returned in the **Get User** script and vice versa.
* If you are providing `app_metadata` as part of the user profile, then you should refer to this as "metadata" in the profile object returned. Failure to do this will result in a loss of the metadata if any modifications are made to the users’ `app_metadata` in the future.
* While a user does not need to use an email address to login, it is recommended best practice that they have an email address defined against their user profile. This ensures that Auth0 out-of-box functionality works as designed.
* To update `name`, `nickname`, `given_name`, `family_name`, and/or `picture` attributes associated with the root of the normalized user profile, you must configure user profile sync so that user attributes will be updated from the identity provider. Auth0 does not support update of these attributes for a custom database connection used for legacy authentication.

### Get User action scripts

The [Get User](/connections/database/custom-db/templates/get-user) script implements the function executed to determine the current state of existence of a user. 

* When creating users, Auth0 calls the **Get User** script before the **Create** script. If you are creating new users, be sure to implement both database action scripts.

### Create action scripts

The [Create](/connections/database/custom-db/templates/create) script implements the function executed to create a user in your database. 

* If the custom database connection has `Requires Username` enabled, then `username` also needs to be used by any subsequent `login` or `getUser` script execution, so you should store it in the legacy identity store.
* Unlike with `login`, `app_metadata` is specified as-is and will not be renamed as `metadata`.
* If you create and use [custom fields](/libraries/custom-signup#using-the-api) during the registration process, these properties are included in the `user` object as well.

### Verify action scripts

The [Verify](/connections/database/custom-db/templates/verify) script implements the function executed to mark the verification status of a user’s email address in the legacy identity store.

* The `verify` function is called when a user clicks on the link in the verification email sent by Auth0. Change in email verification status influenced by other operations, such as via user profile modification in the Auth0 Dashboard, is performed via the [Change Email](/connections/database/custom-db/templates/change-email) script.

### Change Password action scripts

The [Change Password](/connections/database/custom-db/templates/change-password) script implements the function executed to change the password associated with the user identity in the your legacy identity store. 

* While it’s not mandatory to implement the `changePassword` function, it is a recommended best practice. The `changePassword` function is required for the password reset workflow recommended for [better customer experience](https://auth0.com/learn/password-reset/).

### Delete action scripts

The [Delete](/connections/database/custom-db/templates/delete) script implements the function executed to delete the specified user identity from the legacy identity store.

* Deleting a user using the Auth0 Dashboard or the Auth0 Management API performs deletion of both the user profile and the user identity. If you do not implement this script correctly, then this will not be done as an atomic operation, which may leave a user identity still in existence even after the user’s profile has been removed. Conversely, deleting a user identity outside of Auth0 will typically leave a disconnected (orphaned) profile in Auth0 that has no associated user identity. This may cause unpredictable issues.

### Change Email action scripts

The [Change Email](/connections/database/custom-db/templates/change-email) script implements the function executed when a change in the email address or email address status for a user occurs. 

* If you change any aspect of a connection via the Dashboard in Auth0 and that connection makes use of a **Change Email** script, then the script will be deleted.

## Keep reading

<%= include('../../_includes/_topic-links', { links: [
  'best-practices/error-handling',
  'best-practices/debugging',
  'best-practices/testing',
  'best-practices/deployment',
  'best-practices/performance',
  'best-practices/custom-db-connections/security'
] }) %>

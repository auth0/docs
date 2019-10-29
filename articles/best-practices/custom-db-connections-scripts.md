---
description: Best practices for custom database connections and database actions scripts.
toc: true
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
# Custom Database Connection and Action Script Best Practices

::: panel Feature availability
Only **Enterprise** subscription plans include the ability to use a custom database for authentication requests. For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

## Custom database connection best practices

* Make sure that your database has the appropriate fields to store user profiles attributes, such as **id**, **nickname**, **email**, and **password**. See [Normalized User Profile](/users/normalized) for details on Auth0's user profile schema and the expected fields. Also, see [Update User Profile Using Your Database](/users/guides/update-user-profiles-using-your-database) for more information.
* You can use return errors resulting from your custom database connection for troubleshooting purposes. See [Custom Database Error Handling and Troubleshooting](/connections/database/custom-db/error-handling) for  basic troubleshooting steps.
* The `id` (or alternatively `user_id`) property in the returned user profile will be used by Auth0 to identify the user. If you are using multiple custom database connections, then **id** value **must be unique across all the custom database connections** to avoid **user ID** collisions. Our recommendation is to prefix the value of **id** with the connection name (omitting any whitespace). See [Identify Users](/users/normalized/auth0/identify-users) for more information on user IDs.
* Latency will be greater compared to Auth0-hosted user stores.
* The database or service must be reachable from the Auth0 servers. You will need to configure inbound connections if your store is behind a firewall.

## Security

* We recommend that you implement an API to provide least privilege to your legacy identity storage, rather than simply opening up general access via the internet. 
* Restricting access to the API via Rule will mitigate attack vector scenarios - such as where redirect to /authorize is intercepted and the audience to the API is added - and will ensure that only access using specific client credentials is granted.
* The Auth0 IP address whitelist is shared amongst all Auth0 tenants defined to a region. Never use the whitelist as the sole method of securing access to your legacy identity store; doing so could open up potential security vulnerabilities allowing unauthorized access to your users. 

## Database action script best practices

* Script templates, including the default templates, are not used until you click **Save**. This is true even if you only modify one script and haven't made changes to any others. You must click **Save** at least once for all the scripts to be in place. 
* Action scripts can be implemented as anonymous functions, however anonymous functions make it hard in debugging situations when it comes to interpreting the call-stack generated as a result of any exceptional error condition. For convenience, we recommend providing a function name for each action script, and have supplied some recommended names.
* The total size of implementation for any action script should not exceed 100 kB. The larger the size the more latency is introduced due to the packaging and transport process employed by the Auth0 serverless Webtask platform, and this will have an impact on the performance of your system. Note that the 100 kB limit does not include any `npm` modules that may be referenced as part of any require statements. 
* Database scripts run in the same [Webtask](https://webtask.io) container, which is shared with all other extensibility points (such as rules, webtasks, or other databases) belonging to the same Auth0 domain. Therefore, you must carefully code for error handling and throttling.
* An action script may execute in any of the container instances already running, or in a newly created container instance (which may subsequently be added to the pool). There is no container affinity for action script execution in Auth0. This means that you should avoid storing any user-specific information in the `global` object, and should always ensure that any declaration made within the `global` object provides for initialization too. Each time a Webtask container is recycled, or for each instantiation of a new Webtask container, the `global` object it defines is reset. Thus, any declaration of assignment within the `global` object associated with a container should also include provision for initialization too. To provide performance flexibility, serverless Webtask containers are provisioned in Auth0 on an *ad-hoc* basis and are also subject to various recycle policies. In general, we recommend that you do not consider the life of a `global` object to be anything more than 20 minutes.

### Script checklist

Use the following checklist to make sure your scripts achieve the results you intend:

* **Set a `user_id` on the returned user profile that is consistent for the same user every time.**
   In the migration scenario, this is important because if you set a random `user_id` in the `get_user` script, then call `forgot password` and change the password, the user will get duplicated every time they log in.  In the non-migration scenario, if you set a random `user_id` you can end up with duplicate users for every login.

* **If using a `username`, ensure that you aren't returning the same email address for two different users in the `get_user` or `login` script.**
   Auth0 will produce an error if you do this, but it is better to catch it in the script itself. 

* **If setting `app_metadata`, call it `metadata` in the script.**
   To support backwards compatibility, `app_metadata` is called `metadata` in custom DB scripts. If you don't use `metadata` in the script, you will get an error where `app_metadata` will work but if you use the API to merge `app_metadata` with a user, it will appear as if all of your metadata was lost. 

   ::: note
   `user_metadata` is not affected by this and can simply be called `user_metadata`.
   :::

* **If using Auth0 to do machine-to-machine to the legacy database, restrict access to that audience with a rule.**
   As with any API that you create, if you create it solely for client credentials, then you will want to restrict access to the API in a rule. By default, Auth0 gives you a token for any API if you authenticate successfully and include the <dfn data-key="audience">audience</dfn>. Someone could intercept the redirect to authorize and add the audience to your legacy database API. If you don’t block this in a rule, they will get an access token.

   ::: note
   You can also update the API to expect the sub of the token to end in `@clients`.
   :::

* **Determine if they are accessing their database directly versus through an API.**
   This item is not a requirement; it is a recommended best practice. A database interface is extremely open. You should add protections between an API endpoint and your database. Most people do not expose their database directly to the internet. Though you can whitelist Auth0 IPs, those IPs are shared in the cloud environment. In general, Auth0 recommends that you protect your database from too many actors directly talking to it. The alternative is to create a simple API endpoint that each script within Auth0 can call. That API can be protected using an access token. You can use the client credentials flow to get the Access Token from within the rules. 

* **If enabling trickle migration, ensure the following:**

   * **The `Login` script and the `get_user` script both return the same user profile.**
      Because of the two different flows (logging in, or using forgot password), if the `get_user` and `login` script return different user profiles, then depending on how a user migrates (either by logging in directly, or using the forgot password flow) they will end up with different profile information in Auth0.

   * **If setting `app_metadata` or `user_metadata`, use a rule to fetch the metadata if it is missing.**
      The metadata is not migrated until https://YOUR_TENANT.auth0.com/login/callback is called. However, the user credentials are migrated during the post to `usernamepassword/login`. This means that if the browser is killed, or computer dies or something on a user after they have posted to `usernamepassword/login`, but before login/callback, then they will have a user in the Auth0 database, but their app and user metadata are lost. It is really important, therefore, to create a rule that looks a lot like your `get_user` script to fetch the profile if app and user metadata are blank. This should only execute once per user at most (and usually never).

   * **Use a rule to mark users as migrated.**
      This is not a hard requirement, but it does protect against one scenario in which a user changes their email address, then changes it back to the original email address. A rule should call out to the legacy database to mark the user as being migrated in the original database so that `get_user` can return false. 

### Identity provider tokens

If the `user` object returns the `access_token` and `refresh_token` properties, Auth0 handles these slightly differently from other pieces of user information. They will be stored in the `user` object's `identities` property, and retrieving them using the API, therefore, requires an additional <dfn data-key="scope">scope</dfn>: `read:user_idp_tokens`.

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

---
title: Migrate Users from Stormpath to Auth0
description: Auth0 supports automatic migration of users to Auth0 from external applications such as Stormpath. This feature adds your users to the Auth0 database as each person logs in and avoids asking your users to reset their passwords due to migration.
crews: crew-2
toc: true
- tags:
  - users
  - user-management
  - migrations
  - stormpath
---

# Migrate Users from Stormpath to Auth0

Auth0 supports [automatic migration](/users/migrations/automatic) of users from a [custom database connection](/connections/database/custom-db) to Auth0. This feature allows you to configure a custom database connection which will migrate users from an external application, such as Stormpath, to Auth0. It allows for a smooth migration of users over time, without requiring users to reset their password as a result of the migration.

For a more detailed overview, also refer to [The Migration Process](/users/migrations/automatic#the-migration-process).

The rest of this document will walk you through the process of configuring a custom database connection which imports users from Stormpath. It assumes that you have a Stormpath account.

::: note
Check out the [Migrating Stormpath Users to Auth0 Demo](https://github.com/auth0-blog/migrate-stormpath-users-to-auth0) on GitHub
:::

## Configuring the Custom Database Connection

### 1. Create a Custom Database

You can create a new database connection in the [Connections > Database](${manage_url}/#/connections/database) section of the Dashboard.

![Create a new Database Connection](/media/articles/users/migrations/create-database-connection.png)

On the **Custom Database** page, enable the **Use my own database** option:

![Database Login Page in Dashboard](/media/articles/users/migrations/own-database.png)

### 2. Turn on Automatic Migration

On the **Settings** page for your database connection, enable the **Import Users to Auth0** option:

![Dashboard Import Users Option](/media/articles/users/migrations/import-users.png)

### 3. Enable Applications

Navigate to the **Applications** tab of your database connection. Here you can choose the applications which will use the database connection.

![Database Connection Applications](/media/articles/users/migrations/enable-clients.png)

### 4. Create the Login Script

The **Login** script is executed when a user attempts to log in, but their account is not found in the Auth0 database. You will need to create a script that calls Stormpath's API to authenticate the user, passing the user credentials as the `username` and `password` parameters.

On successful authentication, the response from Stormpath will include the user account URL. Perform a second request to the account URL to retrieve the user's information. You can then extract the user's information and pass it to Auth0 in the callback function.

```js
function login(username, password, callback) {
  // Replace the YOUR-CLIENT-ID attribute with your Stormpath ID
  var url = 'https://api.stormpath.com/v1/applications/{YOUR-CLIENT-ID}/loginAttempts';

  // Stormpath requires the user credentials be passed in as a base64 encoded message
  var message = username + ':' + password;
  var pass = new Buffer(message).toString('base64');

  // Here we are making the POST request to authenticate a user
  request({
    url: url,
    method: 'POST',
    auth: {
      // Your API Client ID
      user: '{STORMPATH-CLIENT-ID}',
      // YOUR API Client Secret
      password: '{STORMPATH-CLIENT-SECRET}'
    },
    headers: {
      'Content-Type': 'application/json'
    },
    json: {
      type: 'basic',
      // Passing in the base64 encoded credentials
      value: pass
    }
  }, function (error, response, body) {
    // If response is successful we'll continue
    if (response.statusCode !== 200) return callback();
    // A successful response will return a URL to get the user information
    var accountUrl = body.account.href;

    // We'll make a second request to get the user info. This time it will be a GET request
    request({
      url: accountUrl,
      method: 'GET',
      auth: {
        // Your API Client ID
        user: '{STORMPATH-CLIENT-ID}',
        // YOUR API Client Secret
        password: '{STORMPATH-CLIENT-SECRET}'
      }
    }, function (errorUserInfo, responseUserInfo, bodyUserInfo) {
      // If we get a successful response, we'll process it
      if (responseUserInfo.statusCode !== 200) return callback();

      var parsedBody = JSON.parse(bodyUserInfo);
      // To get the user identifier, we'll strip out the Stormpath API
      var id = parsedBody.href.replace('https://api.stormpath.com/v1/accounts/', '');

      // Finally, we'll set the data we want to store in Auth0 and migrate the user
      return callback(null, {
        user_id : id,
        username: parsedBody.username,
        email: parsedBody.email,
        // We set the users email_verified to true as we assume if they were a valid
        // user in Stormpath, they have already verified their email
        // If this field is not set, the user will get an email asking them to verify
        // their account
        email_verified: true,
        // Add any additional fields you would like to carry over from Stormpath
      });
    });
  });
}
```

You can click the **Try** button above the script to test and see whether the script works.

### 5. Create the Get User Script

The **Get User** script is executed when the user attempts to do a password reset but their account is not found in the Auth0 database. You will need to create a script which will call the `/accounts` endpoint of the Stormpath API, passing the user's email as the `email` parameter.

If successful, Stormpath will return a the user's information. You can extract the user's information and pass it to Auth0 in the callback function.

```js
function getByEmail(email, callback) {
  // Replace the YOUR-CLIENT-ID attribute with your Stormpath ID
  var url = 'https://api.stormpath.com/v1/applications/{YOUR-CLIENT-ID}/accounts';

  request({
    url: url,
    method: 'GET',
    auth: {
      // Your API Client ID
      user: '{STORMPATH-CLIENT-ID}',
      // YOUR API Client Secret
      password: '{STORMPATH-CLIENT-SECRET}'
    },
    qs: { q: email }
  }, function (error, response, body) {
    if (response.statusCode !== 200) return callback();

    var parsedBody = JSON.parse(body);
    var user = parsedBody.items[0];

    if (!user) return callback();

    var id = user.href.replace('https://api.stormpath.com/v1/accounts/', '');

    return callback(null, {
      user_id: id,
      username: user.username,
      email: user.email,
      email_verified: true,
      // Add any additional fields you would like to carry over from Stormpath
    });
  });
}
```

You can click the **Try** button above the script to test and see whether the script works.

## Testing the Custom Database Connection

At this point you can test the custom database connection to ensure that it works.

Click on **Try connection**:

![Try Connection](/media/articles/users/migrations/try-connection.png)

The Auth0 Lock widget will appear. Enter the email address and password for the Stormpath user, and click on **Log In**:

![Try Connection - Lock](/media/articles/users/migrations/try-connection-lock.png)

You should see a web page indicating that the connection works, with information about the user:

![Try Connection - Success](/media/articles/users/migrations/try-connection-success.png)

If you navigate to the [Users](${manage_url}/#/users) section in the Auth0 Dashboard, you will see the newly imported user listed:

![Imported User](/media/articles/users/migrations/user-imported.png)

---
title: Migrate Users from Okta to Auth0
description: Auth0 supports automatic migration of users to Auth0 from external applications such as Okta. This feature adds your users to the Auth0 database as each person logs in and avoids asking your users to reset their passwords due to migration.
crews: crew-2
toc: true
- tags:
  - users
  - user-management
  - migrations
  - okta
---

# Migrate Users from Okta to Auth0

Auth0 supports [automatic migration](/users/migrations/automatic) of users from a [custom database connection](/connections/database/custom-db) to Auth0. This feature allows you to configure a custom database connection which will migrate users from an external application, such as Okta, to Auth0. It allows for a smooth migration of users over time, without requiring users to reset their password as a result of the migration.

For a more detailed overview, also refer to [The Migration Process](/connections/database/migrating#the-migration-process).

The rest of this document will walk you through the process of configuring a custom database connection which imports users from Okta. It assumes that you have an Okta account.

## Configuring the Custom Database Connection

### 1. Create a Custom Database

You can create a new database connection in the [Connections > Database](${manage_url}/#/connections/database) section of the Dashboard.

![Create a new DB Connection](/media/articles/connections/database/okta/create-database-connection.png)

On the **Custom Database** page, enable the **Use my own database** option:

![DB Login Page in Dashboard](/media/articles/connections/database/okta/own-database.png)

### 2. Turn on Automatic Migration

On the **Settings** page for your database connection, enable the **Import Users to Auth0** option:

![Dashboard Import Users Option](/media/articles/connections/database/okta/import-users.png)

### 3. Create the Login Script

The **Login** script is executed when a user attempts to log in, but their account is not found in the Auth0 database. You will need to create a script which will call the Okta [Primary Authentication](https://developer.okta.com/docs/api/resources/authn.html#primary-authentication) endpoint, passing the email and password as the `username` and `password` parameters.

On successful authentication, Okta will return an [Authentication Transaction object](https://developer.okta.com/docs/api/resources/authn.html#authentication-transaction-model), containing the [user's profile](https://developer.okta.com/docs/api/resources/authn.html#user-profile-object) in the [embedded resources](https://developer.okta.com/docs/api/resources/authn.html#embedded-resources). You can then simply extract the user's information and pass it to Auth0 in the callback function.

```js
function login (email, password, callback) {
  // Replace YOUR-OKTA-DOMAIN with your own Okta domain
  var url = 'https:/YOUR-OKTA-DOMAIN/api/v1/authn';

  // Make the POST request to authenticate a user
  request({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: {
      username: email,
      password: password,
      options: {
        multiOptionalFactorEnroll: false,
        warnBeforePasswordExpired: false
      }
    },
    json: true
  }, function (error, response, body) {
    // Ensure we have a successful response
    if (response.statusCode !== 200) return callback();
    
    // Get the user from the response body
    var user = body._embedded.user;
    
    // Set the data we want to store in Auth0 and migrate the user
    return callback(null, {
        user_id : user.id,
        username: user.profile.login,
        email: user.profile.login,
        // We set the users email_verified to true as we assume if they were a valid
        // user in Okta, they have already verified their email
        // If this field is not set, the user will get an email asking them to verify
        // their account
        email_verified: true,
        name: user.profile.firstName + ' ' + user.profile.lastName
      });
  });
}
```

You can click the **Try** button above the script to test and see whether the script works.

### 4. Create the Get User Script

The **Get User** script is executed when the user attempts to do a password reset but their account is not found in the Auth0 database. You will need to create a script which will call the Okta [Get User with Login](https://developer.okta.com/docs/api/resources/users.html#get-user-with-login) endpoint, passing the user's email as the `login` parameter.

You will also need to [Create an API token](https://developer.okta.com/docs/api/getting_started/getting_a_token.html) which must be passed to this endpoint in the `Authorization` header.

If successful, Okta will return a [User object](https://developer.okta.com/docs/api/resources/users.html#user-model) with the user's information. Once again, you can extract the user's information and pass it to Auth0 in the callback function.

```js
function getByEmail(email, callback) {
  // Replace YOUR-OKTA-DOMAIN with your own Okta domain
  var url = 'https://YOUR-OKTA-DOMAIN/api/v1/users/' + encodeURIComponent(email);

  // Make a GET request to find a user by email
  // Replace YOUR-OKTA-API-TOKEN with an Okta API Token 
  // (see https://developer.okta.com/docs/api/getting_started/getting_a_token.html) 
  request({
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'SSWS ' + 'YOUR-OKTA-API-TOKEN'
    },
    json: true
  }, function (error, response, body) {
    // Ensure we have a successful response
    if (response.statusCode !== 200) return callback();

    // Set the data we want to store in Auth0 and migrate the user
    return callback(null, {
      user_id: body.id,
      username: body.profile.login,
      email: body.profile.login,
      email_verified: true,
      name: body.profile.firstName + ' ' + body.profile.lastName
    });
  });
}
```

You can click the **Try** button above the script to test and see whether the script works.

## Testing the Custom Database Connection

At this point you can test the custom database connection to ensure that it works.

Click on **Try connection**:

![Try Connection](/media/articles/connections/database/okta/try-connection.png)

The Auth0 Lock widget will appear. Enter the email address and password for the Okta user, and click on **Log In**:

![Try Connection - Lock](/media/articles/connections/database/okta/try-connection-lock.png)

You should see a web page indicating that the connection works, with information about the user:

![Try Connection - Success](/media/articles/connections/database/okta/try-connection-success.png)

If you navigate to the [Users](${manage_url}/#/users) section in the Auth0 Dashboard, you will see the newly imported user listed:

![Imported User](/media/articles/connections/database/okta/user-imported.png)

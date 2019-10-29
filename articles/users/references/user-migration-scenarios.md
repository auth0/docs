---
title: User Migration Scenarios
description: User migrations scenarios from various platforms using multiple methods.
toc: true 
topics:
  - users
  - user-management
  - migrations
  - gigya
  - okta
  - stormpath
contentType:
  - how-to
useCase:
  - manage-users
  - migrate
---
# User Migration Scenarios

Here are some sample scenarios for migrating users from Gigya, Okta, and Stormpath to Auth0. Each of these scenarios assumes that you have accounts on those platforms.

## Prerequisites

Configure the custom database connection.

1. Create a new database connection in the [Connections > Database](${manage_url}/#/connections/database) section of the Dashboard. 
   
![Create a new DB Connection](/media/articles/users/migrations/create-database-connection.png)

2. Connect the database to the application. Navigate to the **Applications** tab of your database settings, under the **Applications Using This Connection** heading you can enable the database connection for each application.
   
![Database Connection Applications](/media/articles/users/migrations/enable-clients.png)

## Scenario 1: Migrate Users from Gigya to Auth0

1. Export Gigya users. Use [Gigya's IdentitySync](https://developers.gigya.com/display/GD/IdentitySync) to transform and export user data to match a target schema. For more details on this process, see [Gigya IdentitySync: Using IdentitySync](https://developers.gigya.com/display/GD/IdentitySync#IdentitySync-apiUsingIdentitySync).

   Follow the instructions to transform your Gigya database's user data to the correct [schema](/users/references/bulk-import-database-schema-examples) and export the transformed data to JSON format.

2. Import your Gigya users into Auth0 with the User Import/Export Extension or the Management API.
   - Go to the [Extensions](${manage_url}/#/extensions) section of the Dashboard. Select the **User Import / Export** extension and install it. Once the extension is installed, you can click it to open an import/export interface that looks like this:

     ![User Import/Export Extension](/media/articles/extensions/user-import-export/import.png)

     Drag your exported Gigya users JSON file into the designated upload area and select the database you created earlier. Click the **Start Importing Users** button to begin your import. For more information, see [User Import/Export Extension](//extensions/user-import-export).
   
   - Alternatively, you can use the Management API. [Create a job](/api/management/v2#!/Jobs/post_users_imports) to import your users to Auth0. For detailed instructions, see [Bulk User Imports](/users/guides/bulk-user-imports).

## Scenario 2: Migrate Users from Okta to Auth0

1. Navigate to the  **Settings** page for your database connection, and enable the **Import Users to Auth0** option:

![Enable Import Users](/media/articles/dashboard/connectionsdatabase/connections-db-settings-main-2.png)

2. Create the [Login script](/connections/database/custom-db/templates/login). The **Login** script is executed when a user attempts to log in, but their account is not found in the Auth0 database. You will need to create a script which will call the Okta [Primary Authentication](https://developer.okta.com/docs/api/resources/authn.html#primary-authentication) endpoint, passing the email and password as the `username` and `password` parameters.

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

3. Create the Get User Script. The **Get User** script is executed when the user attempts to do a password reset but their account is not found in the Auth0 database. You will need to create a script which will call the Okta [Get User with Login](https://developer.okta.com/docs/api/resources/users.html#get-user-with-login) endpoint, passing the user's email as the `login` parameter.

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

Click the **Try** button above the script to test and see whether the script works.

4. Test the custom database connection to ensure that it works.

   - Click on **Try connection**:

      ![Try Connection](/media/articles/connections/database/okta/try-connection.png)

      The Auth0 Lock widget will appear. Enter the email address and password for the Okta user, and click on **Log In**:

      ![Try Connection - Lock](/media/articles/connections/database/okta/try-connection-lock.png)

      You should see a web page indicating that the connection works, with information about the user:

      ![Try Connection - Success](/media/articles/connections/database/okta/try-connection-success.png)

   - Navigate to the [Users](${manage_url}/#/users) section in the Auth0 Dashboard to see the newly imported users listed:

     ![Imported User](/media/articles/connections/database/okta/user-imported.png)

## Scenario 3: Migrate users from Stormpath to Auth0

1. Navigate to the **Settings** page for your database connection, and enable the **Import Users to Auth0** option:

   ![Enable Import Users](/media/articles/dashboard/connectionsdatabase/connections-db-settings-main-2.png)

2. Navigate to the **Applications** tab of your database connection. Here you can choose the applications which will use the database connection.

   ![Database Connection Applications](/media/articles/users/migrations/enable-clients.png)

3. Create the Login Script. The **Login** script is executed when a user attempts to log in, but their account is not found in the Auth0 database. You will need to create a script that calls Stormpath's API to authenticate the user, passing the user credentials as the `username` and `password` parameters.

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

Click the **Try** button above the script to test and see whether the script works.

4. Create the Get User Script. The **Get User** script is executed when the user attempts to do a password reset but their account is not found in the Auth0 database. You will need to create a script which will call the `/accounts` endpoint of the Stormpath API, passing the user's email as the `email` parameter.

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

   Click the **Try** button above the script to test and see whether the script works.

5. Test the custom database connection to ensure that it works.

   - Click on **Try connection**:

     ![Try Connection](/media/articles/users/migrations/try-connection.png)

     The Auth0 Lock widget will appear. Enter the email address and password for the Stormpath user, and click on **Log In**:

     ![Try Connection - Lock](/media/articles/users/migrations/try-connection-lock.png)

     You should see a web page indicating that the connection works, with information about the user:

     ![Try Connection - Success](/media/articles/users/migrations/try-connection-success.png)

   - Navigate to the [Users](${manage_url}/#/users) section in the Auth0 Dashboard, you will see the newly imported user listed:

     ![Imported User](/media/articles/users/migrations/user-imported.png)

## Keep reading

* [Configure Automatic Migration from Your Database](/users/guides/configure-automatic-migration)
* [Login Script Templates](/connections/database/custom-db/templates/login)
* [Bulk User Imports](/users/guides/bulk-user-imports)
* [User Import/Export Extension](/extensions/user-import-export)
* [Migrating Stormpath Users to Auth0 Demo](https://github.com/auth0-blog/migrate-stormpath-users-to-auth0)
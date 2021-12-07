---
description: Custom database action script templates for user login.
toc: true
topics:
    - connections
    - custom-database
contentType: reference
useCase:
    - customize-connections
---
# Login Script Templates

The **Login** script implements the function executed each time a user is required to authenticate. We recommend naming this function `login`. The `login` function is typically used during the Universal Login workflow, but is also applicable in other authentication flow scenarios (such as [Resource Owner Password Grant](/api-auth/tutorials/password-grant)). The script is required for both legacy authentication and for automatic migration. 

The `login` function should be defined as follows:

```js
function login(userNameOrEmail, password, callback) {
  // TODO: implement your script
  return callback(null, profile);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `userNameOrEmail` | The identification credential for the user typically either the email address for the user or the name associated with the user. With default out-of-box Universal Login, support for the use of `username` during login is available only if the **Requires Username** setting is enabled for the database connection.  |
| `password` | Passed to the `login` script in plain text. Do not store it or transport it anywhere in its vanilla form. Use `bcrypt` as described below. |
| `callback` | Executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter indicates that the operation executed successfully, while a non `null` first parameter value indicates that some error condition occurred. If the first parameter is `null` then the second parameter is the profile for the user in JSON format. If the first parameter is non `null` then the second parameter can be omitted. The second parameter is the `profile` for the user. This should be supplied as a JSON object in normalized user profile form. See the example below. |

<%= include('../_includes/_bp-error-object') %>

<%= include('../_includes/_panel-bcrypt-hash-encryption') %>

## `callback` `profile` parameter example 

The second parameter provided to the `callback` function should be the profile for the user. This should be supplied as a JSON object in normalized user profile form. 

::: warning
The profile returned by the `login` script for a user should be consistent with the profile returned in the `getUser` script, and vice-versa.
:::

Additionally, you can also provide metadata for a user as part of the user profile returned. The following is an example of the profile object that can be returned for a user.

```js
{
    "username": "<user name>",
    "user_id": "<user identifier>",
    "email": "jane.doe@example.com",
    "email_verified": false,
    "user_metadata": {
        "language": "en"
    },
    "app_metadata": {
        "plan": "full"
    },
    "mfa_factors": [
      {
        "phone": {
          "value": "+15551234567"
        }
      },
    ]
}
```

| **Parameter** | Description |
| --- | --- |
| `username` | If a custom database connection type has **Requires Username** as an enabled setting then the profile returned for the user must include a `username`. If the setting is not enabled then `username` is optional and can be omitted. |
| `user_id` | The `user_id` value must be specified and provides the unique identifier for a user. For the `auth0` strategy, the strategy used to define a custom database connection, Auth0 automatically decorates whatever `user_id` value is supplied by prefixing the text `auth0|` in order to create the `user_id` in the root of the normalized user profile. The `user_id` value supplied will appear in it’s undecorated form in the identities array associated with the user profile in Auth0. The `user_id` value specified must be unique across all database connections defined in an Auth0 tenant. Failure to observe this will result in user identifier collision which will lead to unpredictable operation. One way to avoid this is to explicitly prefix the supplied `user_id` with the name of, or pseudonym for, the connection (omitting any whitespace). The `user_id` value must also be consistent for any given user; the value returned by the **Login** script  must also be consistent with the value returned by the **Get User** script, and vice-versa. Failure to observe this requirement can lead to duplicate Auth0 user profiles for a user, duplicate identities for any user migrated via automatic migration, and/or unpredictable results when it comes to user operations. |
| `email` | An `email` value should also be specified. While an email address is not mandatory for a user, much of Auth0 out-of-box functionality such as password reset, requires that a user has a valid and verified email address. Email addresses should be returned consistently for all scripts and should also be unique within the context of a single custom database connection (for automatic migration scenarios). Failure to observe either of these requirements will typically lead to unpredictable results when it comes to user operation. |
| `mfa_factors` | (Optional) A list of [MFA enrollments](/mfa) for the imported user, which prevents the need for users to re-enroll in MFA. This field currently supports [SMS](/mfa/concepts/mfa-factors#sms-notifications), [Voice](/mfa/concepts/mfa-factors#voice-notifications), [OTP](/mfa/concepts/mfa-factors#one-time-passwords), and [email](/mfa/concepts/mfa-factors#email-notifications) based factors.|

::: panel Best Practice
While a user does not need to use an email address to login, it’s recommended best practice that they have an email address defined against their user profile. This ensures that Auth0 out-of-box functionality works as designed.  
:::

For a legacy authentication scenario, you can also enable the `Sync user profile at each login` option in the settings for a custom database connection. This allows attribute updates in the Auth0 user profile each time a login for the user occurs for attributes that would otherwise not be available for update via the Auth0 Management API. For legacy authentication scenarios there are a number of root profile attributes which cannot be updated directly via the Management API.

::: note
In order to update `name`, `nickname`, `given_name`, `family_name`, and/or `picture` attributes associated with the root of the normalized user profile, you must configure user profile sync so that user attributes will be updated from the identity provider. Auth0 does not support update of these attributes for a custom database connection used for legacy authentication.   
:::

## Language-specific script examples

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/login#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/login#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/login#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/login#mongodb)
* [MySQL](/connections/database/custom-db/templates/login#mysql)
* [PostgreSQL](/connections/database/custom-db/templates/login#postgresql)
* [SQL Server](/connections/database/custom-db/templates/login#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/login#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/login#request-with-basic-auth)
* [Stormpath](/connections/database/custom-db/templates/login#stormpath)
:::

### JavaScript

```
function login(email, password, callback) {
  // This script should authenticate a user against the credentials stored in
  // your database.
  // It is executed when a user attempts to log in or immediately after signing
  // up (as a verification that the user was successfully signed up).
  //
  // Everything returned by this script will be set as part of the user profile
  // and will be visible by any of the tenant admins. Avoid adding attributes
  // with values such as passwords, keys, secrets, etc.
  //
  // The `password` parameter of this function is in plain text. It must be
  // hashed/salted to match whatever is stored in your database. For example:
  //
  //     var bcrypt = require('bcrypt@0.8.5');
  //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }
  //
  // There are three ways this script can finish:
  // 1. The user's credentials are valid. The returned user profile should be in
  // the following format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema
  //     var profile = {
  //       user_id: ..., // user_id is mandatory
  //       email: ...,
  //       [...]
  //     };
  //     callback(null, profile);
  // 2. The user's credentials are invalid
  //     callback(new WrongUsernameOrPasswordError(email, "my error message"));
  // 3. Something went wrong while trying to reach your database
  //     callback(new Error("my error message"));
  //
  // A list of Node.js modules which can be referenced is available here:
  //
  //    https://tehsis.github.io/webtaskio-canirequire/

  const msg = 'Please implement the Login script for this database connection ' +
    'at https://manage.auth0.com/#/connections/database';
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function login(email, password, callback) {
  const crypto = require('crypto');
  const sqlserver = require('tedious@1.11.0');

  const Connection = sqlserver.Connection;
  const Request = sqlserver.Request;
  const TYPES = sqlserver.TYPES;

  const connection = new Connection({
    userName: 'the username',
    password: 'the password',
    server: 'the server',
    options: {
      database: 'the db name',
      encrypt: true // for Windows Azure
    }
  });

  /**
   * hashPassword
   *
   * This function creates a hashed version of the password to store in the database.
   *
   * @password  {[string]}      the password entered by the user
   * @return    {[string]}      the hashed password
   */
  function hashPassword(password, salt) {
    // the default implementation uses HMACSHA256 and since Key length is 64
    // and default salt is 16 bytes, Membership will fill the buffer repeating the salt
    const key = Buffer.concat([salt, salt, salt, salt]);
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(Buffer.from(password, 'ucs2'));

    return hmac.digest('base64');
  }

  connection.on('debug', function(text) {
    // if you have connection issues, uncomment this to get more detailed info
    //console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function(err) {
    if (err) return callback(err);

    getMembershipUser(email, function(err, user) {
      if (err || !user || !user.profile || !user.password) return callback(err || new WrongUsernameOrPasswordError(email));

      const salt = Buffer.from(user.password.salt, 'base64');

      if (hashPassword(password, salt).toString('base64') !== user.password.password) {
        return callback(new WrongUsernameOrPasswordError(email));
      }

      callback(null, user.profile);
    });
  });


  // Membership Provider implementation used on Microsoft.AspNet.Providers NuGet

  /**
   * getMembershipUser
   *
   * This function gets a username or email and returns a the user membership provider
   * info, password hashes and salt
   *
   * @usernameOrEmail  {[string]}       the username or email, the method will do a
   *                                    query on both with an OR
   *
   * @callback         {[Function]}     first argument will be the Error if any,
   *                                    and second argument will be a user object
   */
  function getMembershipUser(usernameOrEmail, done) {
    var user = null;
    const query =
      'SELECT Memberships.UserId, Email, Users.UserName, Password ' +
      'FROM Memberships INNER JOIN Users ' +
      'ON Users.UserId = Memberships.UserId ' +
      'WHERE Memberships.Email = @Username OR Users.UserName = @Username';

    const getMembershipQuery = new Request(query, function(err, rowCount) {
      if (err || rowCount < 1) return done(err);

      done(err, user);
    });

    getMembershipQuery.addParameter('Username', TYPES.VarChar, usernameOrEmail);

    getMembershipQuery.on('row', function(fields) {
      user = {
        profile: {
          user_id: fields.UserId.value,
          nickname: fields.UserName.value,
          email: fields.Email.value,
        },
        password: {
          password: fields.Password.value,
          salt: fields.PasswordSalt.value
        }
      };
    });

    connection.execSql(getMembershipQuery);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function login(email, password, callback) {
  const crypto = require('crypto');
  const sqlserver = require('tedious@1.11.0');

  const Connection = sqlserver.Connection;
  const Request = sqlserver.Request;
  const TYPES = sqlserver.TYPES;

  const connection = new Connection({
    userName: 'the username',
    password: 'the password',
    server: 'the server',
    options: {
      database: 'the db name',
      encrypt: true // for Windows Azure
    }
  });

  function fixedTimeComparison(a, b) {
    var mismatch = (a.length === b.length ? 0 : 1);
    if (mismatch) {
      b = a;
    }

    for (var i = 0, il = a.length; i < il; ++i) {
      const ac = a.charCodeAt(i);
      const bc = b.charCodeAt(i);
      mismatch += (ac === bc ? 0 : 1);
    }

    return (mismatch === 0);
  }


  /**
   * validatePassword
   *
   * This function gets the password entered by the user, and the original password
   * hash and salt from database and performs an HMAC SHA256 hash.
   *
   * @password      {[string]}      the password entered by the user
   * @originalHash  {[string]}      the original password hashed from the database
   *                                (including the salt).
   * @return        {[bool]}        true if password validates
   */
  function validatePassword(password, originalHash, callback) {
    const iterations = 1000;
    const hashBytes = Buffer.from(originalHash, 'base64');
    const salt = hashBytes.slice(1, 17);
    const hash = hashBytes.slice(17, 49);
    crypto.pbkdf2(password, salt, iterations, hash.length, 'sha1', function(err, hashed) {
      if (err) return callback(err);

      const hashedBase64 = Buffer.from(hashed, 'binary').toString('base64');
      const isValid = fixedTimeComparison(hash.toString('base64'), hashedBase64);

      return callback(null, isValid);
    });
  }


  connection.on('debug', function(text) {
    // if you have connection issues, uncomment this to get more detailed info
    //console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function(err) {
    if (err) return callback(err);
    getMembershipUser(email, function(err, user) {
      if (err || !user || !user.profile) return callback(err || new WrongUsernameOrPasswordError(email));

      validatePassword(password, user.password, function(err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        callback(null, user.profile);
      });
    });
  });


  // Membership Provider implementation used on Microsoft.AspNet.Providers NuGet

  /**
   * getMembershipUser
   *
   * This function gets a username or email and returns a user info, password hashes and salt
   *
   * @usernameOrEamil   {[string]}    the username or email, the method will do a query
   *                                  on both with an OR
   * @callback          {[Function]}  first argument will be the Error if any, and second
   *                                  argument will be a user object
   */
  function getMembershipUser(usernameOrEmail, done) {
    var user = null;
    const query =
      'SELECT webpages_Membership.UserId, UserName, UserProfile.UserName, Password from webpages_Membership ' +
      'INNER JOIN UserProfile ON UserProfile.UserId = webpages_Membership.UserId ' +
      'WHERE UserProfile.UserName = @Username';

    const getMembershipQuery = new Request(query, function(err, rowCount) {
      if (err || rowCount < 1) return done(err);

      done(err, user);
    });

    getMembershipQuery.addParameter('Username', TYPES.VarChar, usernameOrEmail);

    getMembershipQuery.on('row', function(fields) {
      user = {
        profile: {
          user_id: fields.UserId.value,
          nickname: fields.UserName.value,
          email: fields.UserName.value,
        },
        password: fields.Password.value
      };
    });

    connection.execSql(getMembershipQuery);
  }
}
```

### MongoDB

```
function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb://user:pass@mymongoserver.com');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('db-name');
    const users = db.collection('users');

    users.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        client.close();
        return callback(err || new WrongUsernameOrPasswordError(email));
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();

        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
            user_id: user._id.toString(),
            nickname: user.nickname,
            email: user.email
          });
      });
    });
  });
}
```

### MySQL

```
function login(email, password, callback) {
  const mysql = require('mysql');
  const bcrypt = require('bcrypt');

  const connection = mysql({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  const query = 'SELECT id, nickname, email, password FROM users WHERE email = ?';

  connection.query(query, [ email ], function(err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
    const user = results[0];

    bcrypt.compare(password, user.password, function(err, isValid) {
      if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

      callback(null, {
        user_id: user.id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}
```

### PostgreSQL

```
function login(email, password, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  const bcrypt = require('bcrypt');
  const postgres = require('pg');

  const conString = 'postgres://user:pass@localhost/mydb';
  postgres.connect(conString, function (err, client, done) {
    if (err) return callback(err);

    const query = 'SELECT id, nickname, email, password FROM users WHERE email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err || result.rows.length === 0) return callback(err || new WrongUsernameOrPasswordError(email));

      const user = result.rows[0];

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
          user_id: user.id,
          nickname: user.nickname,
          email: user.email
        });
      });
    });
  });
}
```

### SQL Server

```
function login(email, password, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html
  const bcrypt = require('bcrypt');
  const sqlserver = require('tedious@1.11.0');

  const Connection = sqlserver.Connection;
  const Request = sqlserver.Request;
  const TYPES = sqlserver.TYPES;

  const connection = new Connection({
    userName:  'test',
    password:  'test',
    server:    'localhost',
    options:  {
      database: 'mydb'
    }
  });

  const query = 'SELECT Id, Nickname, Email, Password FROM dbo.Users WHERE Email = @Email';

  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    const request = new Request(query, function (err, rowCount, rows) {
      if (err || rowCount < 1) return callback(err || new WrongUsernameOrPasswordError(email));

      bcrypt.compare(password, rows[0][3].value, function (err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        callback(null, {
          user_id: rows[0][0].value,
          nickname: rows[0][1].value,
          email: rows[0][2].value
        });
      });
    });

    request.addParameter('Email', TYPES.VarChar, email);
    connection.execSql(request);
  });
}
```

### Windows Azure SQL Database

```
function login(email, password, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html
  var Connection = require('tedious@1.11.0').Connection;
  var Request = require('tedious@1.11.0').Request;
  var TYPES = require('tedious@1.11.0').TYPES;
  var bcrypt = require('bcrypt');

  var connection = new Connection({
    userName: 'your-user@your-server-id.database.windows.net',
    password: 'the-password',
    server: 'your-server-id.database.windows.net',
    options: {
      database: 'mydb',
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  });

  var query = "SELECT Id, Email, Password " +
    "FROM dbo.Users WHERE Email = @Email";

  connection.on('debug', function (text) {
    // Uncomment next line in order to enable debugging messages
    // console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
    return callback(text);
  }).on('infoMessage', function (text) {
    // Uncomment next line in order to enable information messages
    // console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) { return callback(err); }

    var request = new Request(query, function (err, rowCount, rows) {
      if (err) {
        callback(new Error(err));
      } else if (rowCount < 1) {
        callback(new WrongUsernameOrPasswordError(email));
      } else {
        bcrypt.compare(password, rows[0][2].value, function (err, isValid) {
          if (err) { callback(new Error(err)); }
          else if (!isValid) { callback(new WrongUsernameOrPasswordError(email)); }
          else {
            callback(null, {
              user_id: rows[0][0].value,
              email: rows[0][1].value
            });
          }
        });
      }
    });

    request.addParameter('Email', TYPES.VarChar, email);
    connection.execSql(request);
  });
}
```

### Request with Basic Auth

```
function login(email, password, callback) {
  const request = require('request');

  request.get({
    url: 'https://myserviceurl.com/profile',
    auth: {
      username: email,
      password: password
    }
    //for more options check:
    //https://github.com/mikeal/request#requestoptions-callback
  }, function(err, response, body) {
    if (err) return callback(err);
    if (response.statusCode === 401) return callback();
    const user = JSON.parse(body);

    callback(null, {
      user_id: user.user_id.toString(),
      nickname: user.nickname,
      email: user.email
    });
  });
}
```

### Stormpath

```
function login(username, password, callback) {
  // Replace the YOUR-STORMPATH-CLIENT-ID with your Stormpath ID
  var url = 'https://api.stormpath.com/v1/applications/{YOUR-STORMPATH-CLIENT-ID}/loginAttempts';
  // Add your Stormpath API Client ID and Secret
  var apiCredentials = {
    user : 'YOUR-STORMPATH-API-ID',
    password: 'YOUR-STORMPATH-API-SECRET'
  };

  // Stormpath requires the user credentials be passed in as a base64 encoded message
  var credentials = Buffer.from(username + ':' + password).toString('base64');

  // Make a POST request to authenticate a user
  request({
    url: url,
    method: 'POST',
    auth: apiCredentials,
    json: {
      type: 'basic',
      // Passing in the base64 encoded credentials
      value: credentials
    }
  }, function (error, response, body) {
    // If response is successful we'll continue
    if (response.statusCode !== 200) return callback();
    // A successful response will return a URL to get the user information
    var accountUrl = body.account.href;

    // Make a second request to get the user info.
    request({
      url: accountUrl,
      auth: apiCredentials,
      json: true
    }, function (errorUserInfo, responseUserInfo, bodyUserInfo) {
      // If we get a successful response, we'll process it
      if (responseUserInfo.statusCode !== 200) return callback();

      // To get the user identifier, we'll strip out the Stormpath API
      var id = bodyUserInfo.href.replace('https://api.stormpath.com/v1/accounts/', '');

      // Finally, we'll set the data we want to store in Auth0 and migrate the user
      return callback(null, {
        user_id : id,
        username: bodyUserInfo.username,
        email: bodyUserInfo.email,
        // We set the users email_verified to true as we assume if they were a valid
        // user in Stormpath, they have already verified their email
        // If this field is not set, the user will get an email asking them to verify
        // their account. You can decide how to handle this for your use case
        email_verified: true
        // Add any additional fields you would like to carry over from Stormpath
      });
    });
  });
}
```

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)

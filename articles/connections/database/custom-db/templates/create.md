---
description: Custom database action script templates for user creation.
toc: true
topics:
    - connections
    - custom-database
    - create-users
contentType: reference
useCase:
    - customize-connections
---
# Create Script Templates

The **Create** script implements the function executed to create a user in your database. We recommend naming this function `create`. Use this script if you want new users to sign up via Auth0 so that Auth0 creates the users in your legacy data store. Not using the script doesn't prevent the creation of users by a mechanism external to Auth0.

This script executes when a user signs up or when an administrator creates the user via the Auth0 Dashboard or Management API. When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure to implement both database action scripts if you are creating new users. When the script finishes execution, the **Login** script runs to verify that the user was created successfully.

The `create` function implemented in the script should be defined as follows:

```js
function create(user, callback) {
  // TODO: implement your script
  return callback(null);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `user` | An object containing attributes associated with the user identity to be created. |
| `callback` | Executed with a single parameter. The parameter is an indication of status: a `null` indicates that the operation executed successfully, while a non `null` value indicates that some error condition occurred. |

<%= include('../_includes/_bp-error-object') %>

<%= include('../_includes/_panel-bcrypt-hash-encryption') %>

## `user` object example

```js
{
    client_id: "<ID of creating client (application)>",
    tenant: "<name of creating Auth0 tenant>",
    email: "<email address for the user>",
    password: "<password for the user>",
    username: "<name associated with the user>",
    user_metadata: {
        "language": "en"
    },
    app_metadata: {
        "plan": "full"
    }
}
```

The `user` object can contain the following properties:

| **Property** | **Description** |
| - | - |
| `client_id` | the client ID of the application for which the user signed up, or the API key if the user was created through the Auth0 Dashboard or Management API |
| `tenant` | the name of the Auth0 account |
| `email` | the user's email |
| `password` | the password entered by the user (in plain text) |
| `username` | required only if the custom database connection has [`Requires Username`](/connections/database/require-username) enabled
| `connection` | the name of the database connection |
| `user_metadata` | optional |
| `app_metadata` | optional |

::: panel Best practice
If the custom database connection has [`Requires Username`](/connections/database/require-username) enabled, then `username` also needs to be used by any subsequent `login` or `getUser` execution, so you should store it in the legacy identity store.
:::

While `user_metadata` and `app_metadata` are optional, if supplied, they do not need to be stored in the legacy identity store; Auth0 automatically stores these values as part of the [user profile](/users/concepts/overview-user-profile) record created internally. These values are (optionally) provided as a reference: their contents potentially being influential to legacy identity creation. 

::: note
Unlike with `login`, `app_metadata` is specified as-is and will not be renamed as `metadata`.
:::

Finally, if you [create and use custom fields](/libraries/custom-signup#using-the-api) during the registration process, these properties are included in the `user` object as well.

## Script execution results

There are three ways a **Create** script can finish:

| **Result** | **Description** |
| - | - |
| `callback(null);` | A user was successfully created  |
| `callback(new ValidationError("user_exists", "my error message"));` | This user already exists in your database |
| `callback(new Error("my error message"));` | Something went wrong while trying to reach your database |

## Language-specific script examples

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/create#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/create#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/create#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/create#mongodb)
* [MySQL](/connections/database/custom-db/templates/create#mysql)
* [PostgreSQL](/connections/database/custom-db/templates/create#postgresql)
* [SQL Server](/connections/database/custom-db/templates/create#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/create#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/create#request-with-basic-auth)
:::

### JavaScript

```
function create(user, callback) {
  // This script should create a user entry in your existing database. It will
  // be executed when a user attempts to sign up, or when a user is created
  // through the Auth0 Dashboard or Management API.
  // When this script has finished executing, the Login script will be
  // executed immediately afterwards, to verify that the user was created
  // successfully.
  //
  // The user object will always contain the following properties:
  // * email: the user's email
  // * password: the password entered by the user, in plain text
  // * tenant: the name of this Auth0 account
  // * client_id: the client ID of the application where the user signed up, or
  //              API key if created through the Management API or Auth0 Dashboard
  // * connection: the name of this database connection
  //
  // There are three ways this script can finish:
  // 1. A user was successfully created
  //     callback(null);
  // 2. This user already exists in your database
  //     callback(new ValidationError("user_exists", "my error message"));
  // 3. Something went wrong while trying to reach your database
  //     callback(new Error("my error message"));

  const msg = 'Please implement the Create script for this database connection ' +
    'at https://manage.auth0.com/#/connections/database';
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function create(user, callback) {
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
      encrypt: true,
      // Required to retrieve userId needed for Membership entity creation
      rowCollectionOnRequestCompletion: true
    }
  });

  const applicationId = 'your-application-id-goes-here';

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
    // console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function(err) {
    if (err) {
      return callback(err);
    }
    createMembershipUser(user, function(err, user) {
      if (err) return callback(err); // this will return a 500
      if (!user) return callback(); // this will return a 401

      callback(null, user);
    });
  });

  function createMembershipUser(user, callback) {
    const userData = {
      UserName: user.email,
      ApplicationId: applicationId
    };
    const createUser =
      'INSERT INTO Users (UserName, LastActivityDate, ApplicationId, UserId, IsAnonymous) ' +
      'OUTPUT Inserted.UserId ' +
      'VALUES (@UserName, GETDATE(), @ApplicationId, NEWID(), \'false\')';

    const createUserQuery = new Request(createUser, function(err, rowCount, rows) {
      if (err) return callback(err);

      // No records added
      if (rowCount === 0) return callback(null);

      const userId = rows[0][0].value;
      const salt = crypto.randomBytes(16);
      const membershipData = {
        ApplicationId: applicationId,
        Email: user.email,
        Password: hashPassword(user.password, salt),
        PasswordSalt: salt.toString('base64'),
        UserId: userId
      };

      const createMembership =
        'INSERT INTO Memberships (ApplicationId, UserId, Password, PasswordFormat, ' +
        'PasswordSalt, Email, isApproved, isLockedOut, CreateDate, LastLoginDate, ' +
        'LastPasswordChangedDate, LastLockoutDate, FailedPasswordAttemptCount, ' +
        'FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, ' +
        'FailedPasswordAnswerAttemptWindowsStart) ' +
        'VALUES ' +
        '(@ApplicationId, @UserId, @Password, 1, @PasswordSalt, ' +
        '@Email, \'false\', \'false\', GETDATE(), GETDATE(), GETDATE(), GETDATE(), 0, 0, 0, 0)';

      const createMembershipQuery = new Request(createMembership, function(err, rowCount) {
        if (err) return callback(err);

        if (rowCount === 0) return callback(null);

        callback(null, rowCount > 0);
      });

      createMembershipQuery.addParameter('ApplicationId', TYPES.VarChar, membershipData.ApplicationId);
      createMembershipQuery.addParameter('Email', TYPES.VarChar, membershipData.Email);
      createMembershipQuery.addParameter('Password', TYPES.VarChar, membershipData.Password);
      createMembershipQuery.addParameter('PasswordSalt', TYPES.VarChar, membershipData.PasswordSalt);
      createMembershipQuery.addParameter('UserId', TYPES.VarChar, membershipData.UserId);

      connection.execSql(createMembershipQuery);
    });

    createUserQuery.addParameter('UserName', TYPES.VarChar, userData.UserName);
    createUserQuery.addParameter('ApplicationId', TYPES.VarChar, userData.ApplicationId);

    connection.execSql(createUserQuery);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function create(user, callback) {
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
      encrypt: true,
      // Required to retrieve userId needed for Membership entity creation
      rowCollectionOnRequestCompletion: true
    }
  });

  /**
   * hashPassword
   *
   * This function hashes a password using HMAC SHA256 algorithm.
   *
   * @password    {[string]}    password to be hased
   * @salt        {[string]}    salt to be used in the hashing process
   * @callback    {[function]}  callback to be called after hashing the password
   */
  function hashPassword(password, salt, callback) {
    const iterations = 1000;
    const passwordHashLength = 32;

    crypto.pbkdf2(password, salt, iterations, passwordHashLength, 'sha1', function (err, hashed) {
      if (err) return callback(err);

      const result = Buffer.concat([Buffer.from([0], 1), salt, Buffer.from(hashed, 'binary')]);
      const resultBase64 = result.toString('base64');

      callback(null, resultBase64);
    });
  }

  connection.on('debug', function (text) {
    // if you have connection issues, uncomment this to get more detailed info
    // console.log(text);
  }).on('errorMessage', function (text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    const createUser =
      'INSERT INTO UserProfile (UserName) ' +
      'OUTPUT Inserted.UserId ' +
      'VALUES (@UserName)';

    const createUserQuery = new Request(createUser, function (err, rowCount, rows) {
      if (err || rowCount === 0) return callback(err);

      const userId = rows[0][0].value;
      const salt = crypto.randomBytes(16);

      const createMembership =
        'INSERT INTO webpages_Membership ' +
        '(UserId, CreateDate, IsConfirmed, PasswordFailuresSinceLastSuccess, Password, PasswordSalt) ' +
        'VALUES ' +
        '(@UserId, GETDATE(), \'false\', 0, @Password, \'\')';

      const createMembershipQuery = new Request(createMembership, function (err, rowCount) {
        if (err || rowCount === 0) return callback(err);

        callback(null, rowCount > 0);
      });

      hashPassword(user.password, salt, function (err, hashedPassword) {
        if (err) return callback(err);
        createMembershipQuery.addParameter('Password', TYPES.VarChar, hashedPassword);
        createMembershipQuery.addParameter('PasswordSalt', TYPES.VarChar, salt.toString('base64'));
        createMembershipQuery.addParameter('UserId', TYPES.VarChar, userId);

        connection.execSql(createMembershipQuery);
      });
    });

    createUserQuery.addParameter('UserName', TYPES.VarChar, user.email);

    connection.execSql(createUserQuery);
  });
}
```

### MongoDB

```
function create(user, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb://user:pass@mymongoserver.com');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('db-name');
    const users = db.collection('users');

    users.findOne({ email: user.email }, function (err, withSameMail) {
      if (err || withSameMail) {
        client.close();
        return callback(err || new Error('the user already exists'));
      }

      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          client.close();
          return callback(err);
        }

        user.password = hash;
        users.insert(user, function (err, inserted) {
          client.close();

          if (err) return callback(err);
          callback(null);
        });
      });
    });
  });
}
```

### MySQL

```
function create(user, callback) {
  const mysql = require('mysql');
  const bcrypt = require('bcrypt');

  const connection = mysql({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  const query = 'INSERT INTO users SET ?';

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return callback(err);

    const insert = {
      password: hash,
      email: user.email
    };

    connection.query(query, insert, function(err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback();
      callback(null);
    });
  });
}
```

### PostgreSQL

```
function create(user, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  const bcrypt = require('bcrypt');
  const postgres = require('pg');

  const conString = 'postgres://user:pass@localhost/mydb';
  postgres.connect(conString, function (err, client, done) {
    if (err) return callback(err);

    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      if (err) return callback(err);

      const query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
      client.query(query, [user.email, hashedPassword], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();

        return callback(err);
      });
    });
  });
}
```

### SQL Server

```
  
function create(user, callback) {
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

  const query = 'INSERT INTO dbo.Users SET Email = @Email, Password = @Password';

  connection.on('debug', function(text) {
    console.log(text);
  }).on('errorMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    const request = new Request(query, function (err, rows) {
      if (err) return callback(err);
      callback(null);
    });

    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) return callback(err);
      request.addParameter('Email', TYPES.VarChar, user.email);
      request.addParameter('Password', TYPES.VarChar, hash);
      connection.execSql(request);
    });
  });
}
```

### Windows Azure SQL Database

```
function create (user, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html

  var Connection = require('tedious@1.11.0').Connection;
  var Request = require('tedious@1.11.0').Request;
  var TYPES = require('tedious@1.11.0').TYPES;
  var bcrypt = require('bcrypt');

  var connection = new Connection({
    userName:  'your-user@your-server-id.database.windows.net',
    password:  'the-password',
    server:    'your-server-id.database.windows.net',
    options:  {
      database: 'mydb',
      encrypt:  true
    }
  });

  var query = "INSERT INTO users (Email, Password) VALUES (@Email, @Password)";

  connection.on('debug', function(text) {
    // Uncomment next line in order to enable debugging messages
    // console.log(text);
  }).on('errorMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function(text) {
    // Uncomment next line in order to enable information messages
    // console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) { return callback(err); }

    var request = new Request(query, function (err, rows) {
      if (err) { return callback(err); }
      console.log('rows: ' + rows);
      callback(null);
    });

    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      if (err) { return callback(err); }
      request.addParameter('Email', TYPES.VarChar, user.email);
      request.addParameter('Password', TYPES.VarChar, hashedPassword);
      connection.execSql(request);
    });

  });
}
```

### Request with Basic Auth

```
function create(user, callback) {
  const request = require('request');

  request.post({
    url: 'https://myserviceurl.com/users',
    json: user
    //for more options check:
    //https://github.com/mikeal/request#requestoptions-callback
  }, function(err, response, body) {
    if (err) return callback(err);

    callback(null);
  });
}
```

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Delete](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)

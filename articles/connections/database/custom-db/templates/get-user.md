---
description: Custom database action script templates for user search.
toc: true
topics:
    - connections
    - custom-database
    - get-users
contentType: reference
useCase:
    - customize-connections
---
# Get User Script Templates

The **Get User** script implements the function executed to determine the current state of existence of a user. We recommend naming this function `getUser`. For automatic migration, the script is mandatory. 

For automatic migration, the script is executed during the password reset workflow (e.g., with a forgotten password in Universal Login). For legacy authentication, it is executed whenever the following operations occur: create user, change email, change password, and password reset. 

The `getUser` function should be defined as follows:

```js
function getUser(email, callback) {
  // TODO: implement your script
  return callback(null, profile);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `email` | The email address for the user as the user identifying credential.  If **Requires Username** is enabled for your connection, the **Get User** script may run multiple times for some transactions (ex. Creating a user, or requesting a password reset link). In these cases the value of the parameter will sometimes be a username instead of an email.  Your code should be able to handle either value and always return the same profile for a given user regardless of whether they were looked up by email or username. |
| `callback` | Executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter indicates that the operation executed successfully; a `null` first parameter with no corresponding second parameter indicates that no user was found, while a non `null` first parameter value indicates that some error condition occurred. If the first parameter is `null` then the second parameter should be the profile for the user in JSON format (if a user was found). If the first parameter is `null` and no user was found, or if the first parameter is non `null`, then the second parameter can be omitted. The second parameter is the `profile` for the user. This should be supplied as a JSON object in normalized user profile form. See the [**Login**](/connections/database/custom-db/templates/login#callback-profile-example) script for details. |

<%= include('../_includes/_bp-error-object') %>

::: warning
When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure to implement both database action scripts if you are creating new users.
:::

## Language-specific script examples

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/get-user#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/get-user#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/get-user#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/get-user#mongodb)
* [MySQL](/connections/database/custom-db/templates/get-user#mysql)
* [PostgreSQL](/connections/database/custom-db/templates/get-user#postgresql)
* [SQL Server](/connections/database/custom-db/templates/get-user#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/get-user#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/get-user#request-with-basic-auth)
* [Stormpath](/connections/database/custom-db/templates/get-user#stormpath)
:::

### JavaScript

```
function getByEmail(email, callback) {
  // This script should retrieve a user profile from your existing database,
  // without authenticating the user.
  // It is used to check if a user exists before executing flows that do not
  // require authentication (signup and password reset).
  //
  // There are three ways this script can finish:
  // 1. A user was successfully found. The profile should be in the following
  // format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema.
  //     callback(null, profile);
  // 2. A user was not found
  //     callback(null);
  // 3. Something went wrong while trying to reach your database:
  //     callback(new Error("my error message"));

  const msg = 'Please implement the Get User script for this database connection ' +
    'at https://manage.auth0.com/#/connections/database';
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function getByEmail(email, callback) {
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

  connection.on('debug', function(text) {
    // if you have connection issues, uncomment this to get more detailed info
    //console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function(err) {
    if (err) return callback(err);

    var user = {};
    const query =
      'SELECT Memberships.UserId, Email, Users.UserName ' +
      'FROM Memberships INNER JOIN Users ' +
      'ON Users.UserId = Memberships.UserId ' +
      'WHERE Memberships.Email = @Username OR Users.UserName = @Username';

    const getMembershipQuery = new Request(query, function(err, rowCount) {
      if (err) return callback(err);
      if (rowCount < 1) return callback();

      callback(null, user);
    });

    getMembershipQuery.addParameter('Username', TYPES.VarChar, email);

    getMembershipQuery.on('row', function(fields) {
      user = {
        user_id: fields.UserId.value,
        nickname: fields.UserName.value,
        email: fields.Email.value
      };
    });

    connection.execSql(getMembershipQuery);
  });
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function getByEmail(email, callback) {
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

  connection.on('debug', function(text) {
    // if you have connection issues, uncomment this to get more detailed info
    //console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function(err) {
    if (err) return callback(err);

    var user = {};
    const query =
      'SELECT webpages_Membership.UserId, UserName, UserProfile.UserName from webpages_Membership ' +
      'INNER JOIN UserProfile ON UserProfile.UserId = webpages_Membership.UserId ' +
      'WHERE UserProfile.UserName = @Username';

    const getMembershipQuery = new Request(query, function (err, rowCount) {
      if (err) return callback(err);
      if (rowCount < 1) return callback();

      callback(null, user);
    });

    getMembershipQuery.addParameter('Username', TYPES.VarChar, email);

    getMembershipQuery.on('row', function (fields) {
      user = {
        user_id: fields.UserId.value,
        nickname: fields.UserName.value,
        email: fields.UserName.value
      };
    });

    connection.execSql(getMembershipQuery);
  });
}
```

### MongoDB

```
function getByEmail(email, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb://user:pass@mymongoserver.com');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('db-name');
    const users = db.collection('users');

    users.findOne({ email: email }, function (err, user) {
      client.close();

      if (err) return callback(err);
      if (!user) return callback(null, null);

      return callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}
```

### MySQL

```
function getByEmail(email, callback) {
  const mysql = require('mysql');

  const connection = mysql({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  const query = 'SELECT id, nickname, email FROM users WHERE email = ?';

  connection.query(query, [ email ], function(err, results) {
    if (err || results.length === 0) return callback(err || null);

    const user = results[0];
    callback(null, {
      user_id: user.id.toString(),
      nickname: user.nickname,
      email: user.email
    });
  });
}
```

### PostgreSQL

```
function loginByEmail(email, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  const postgres = require('pg');

  const conString = 'postgres://user:pass@localhost/mydb';
  postgres.connect(conString, function (err, client, done) {
    if (err) return callback(err);

    const query = 'SELECT id, nickname, email FROM users WHERE email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err || result.rows.length === 0) return callback(err);

      const user = result.rows[0];

      return callback(null, {
        user_id: user.id,
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}
```

### SQL Server

```
function getByEmail(email, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html
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

  const query = 'SELECT Id, Nickname, Email FROM dbo.Users WHERE Email = @Email';

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
      if (err) return callback(err);

      callback(null, {
        user_id: rows[0][0].value,
        nickname: rows[0][1].value,
        email: rows[0][2].value
      });
    });

    request.addParameter('Email', TYPES.VarChar, email);
    connection.execSql(request);
  });
}
```

### Windows Azure SQL Database

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### Request with Basic Auth

```
function loginByEmail(email, callback) {
  const request = require('request');

  request.get({
    url: 'https://myserviceurl.com/users-by-email/' + email
    //for more options check:
    //https://github.com/mikeal/request#requestoptions-callback
  }, function(err, response, body) {
    if (err) return callback(err);

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
function getByEmail(email, callback) {
  // Replace the YOUR-STORMPATH-CLIENT-ID with your Stormpath ID
  var url = 'https://api.stormpath.com/v1/applications/{YOUR-STORMPATH-CLIENT-ID}/accounts';
  // Add your Stormpath API Client ID and Secret
  var apiCredentials = {
    user : 'YOUR-STORMPATH-API-ID',
    password: 'YOUR-STORMPATH-API-SECRET'
  };

  // Make a GET request to find a user by email
  request({
    url: url,
    method: 'GET',
    auth: apiCredentials,
    qs: { q: email },
    json: true
  }, function (error, response, body) {
    if (response.statusCode !== 200) return callback();

    var user = body.items[0];

    if (!user) return callback();

    var id = user.href.replace('https://api.stormpath.com/v1/accounts/', '');

    return callback(null, {
      user_id: id,
      username: user.username,
      email: user.email,
      email_verified: true
      // Add any additional fields you would like to carry over from Stormpath
    });
  });
}
```

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)

---
description: Custom database action script templates for user verification.
toc: true
topics:
    - connections
    - custom-database
contentType: reference
useCase:
    - customize-connections
---
# Verify Users Script Templates

The **Verify** script implements the function executed to mark the verification status of a user’s email address in the legacy identity store. Email verification status information is typically returned via `email_verified` as part of any user profile information returned (see [Login](/connections/database/custom-db/templates/login) and [Get User](/connections/database/custom-db/templates/get-user) for further details). The script is executed when a user clicks on the link in the verification email sent by Auth0. We recommend naming this function `verify`. The script is only used in a legacy authentication scenario, and must be implemented if support is required for Auth0 email verification functionality.

While it’s not mandatory to implement the `verify` function, it is a recommended best practice. The function is required to support user email address verification, and a verified email address for a user is critical to a number of the workflow scenarios in Auth0. Implementing the script will provide support for these workflows out-of-box.

::: note
The `verify` function is called when a user clicks on the link in the verification email sent by Auth0. Change in email verification status influenced by other operations, such as via user profile modification in the Auth0 Dashboard, is performed via the [Change Email](/connections/database/custom-db/templates/change-email) script.
:::

The `verify` function should be defined as follows:

```js
function verify(email, callback) {
  // TODO: implement your script
  return callback(null, JSON Object);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `email` | The email address for the user as the user identifying credential. |
| `callback` | Executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter indicates that the operation executed successfully, while a non `null` first parameter value indicates that some error condition occurred. |

## `callback` example

If the first parameter is `null` then the second parameter should be a JSON object in a format similar to the following:

```js
{
    "user_id": "<user identifier>",
    "email": "jane.doe@example.com",
    "email_verified": true
}
```

<%= include('../_includes/_bp-error-object') %>

## Language-specific script examples

Auth0 provides sample scripts for use with the following languages/technologies:

* [JavaScript](#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](#mongodb)
* [MySQL](#mysql)
* [Oracle](#oracle)
* [PostgreSQL](#postgresql)
* [SQL Server](#sql-server)
* [Windows Azure SQL Database](#windows-azure-sql-database)
* [Request with Basic Auth](#request-with-basic-auth)

### JavaScript

```
function verify (email, callback) {
  // This script should mark the current user's email address as verified in
  // your database.
  // It is executed whenever a user clicks the verification link sent by email.
  // These emails can be customized at https://manage.auth0.com/#/emails.
  // It is safe to assume that the user's email already exists in your database,
  // because verification emails, if enabled, are sent immediately after a
  // successful signup.
  //
  // There are two ways that this script can finish:
  // 1. The user's email was verified successfully
  //     callback(null, true);
  // 2. Something went wrong while trying to reach your database:
  //     callback(new Error("my error message"));
  //
  // If an error is returned, it will be passed to the query string of the page
  // where the user is being redirected to after clicking the verification link.
  // For example, returning `callback(new Error("error"))` and redirecting to
  // https://example.com would redirect to the following URL:
  //     https://example.com?email=alice%40example.com&message=error&success=false

  var msg = "Please implement the Verify script for this database connection " +
       "at https://manage.auth0.com/#/connections/database";
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function verify (email, callback) {
  var connection = sqlserver.connect({
    userName:  'username',
    password:  'pwd',
    server:    'server',
    options: {
      database:                         'mydb',
      encrypt:                          true,
      // Required to retrieve userId needed for Membership entity creation
      rowCollectionOnRequestCompletion: true
    }
  });

  connection.on('debug', function(text) {
      // if you have connection issues, uncomment this to get more detailed info
      //console.log(text);
  }).on('errorMessage', function(text) {
      // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) {
      return callback(err);
    }
    verifyMembershipUser(email, function(err, wasUpdated) {
      if (err) {
        return callback(err); // this will return a 500
      }

      callback(null, wasUpdated);
    });
  });

  function verifyMembershipUser(email, callback) {
    // isApproved field is the email verification flag
    var updateMembership =
      'UPDATE Memberships SET isApproved = \'true\' ' +
      'WHERE isApproved = \'false\' AND Email = @Email';

    var updateMembershipQuery = new sqlserver.Request(updateMembership, function (err, rowCount) {
      if (err) {
        return callback(err);
      }
      callback(null, rowCount > 0);
    });

    updateMembershipQuery.addParameter('Email', sqlserver.Types.VarChar, email);

    connection.execSql(updateMembershipQuery);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function verify (email, callback) {
  var connection = sqlserver.connect({
    userName:  'username',
    password:  'pwd',
    server:    'server',
    options: {
      database:                         'mydb',
      encrypt:                          true,
      // Required to retrieve userId needed for Membership entity creation
      rowCollectionOnRequestCompletion: true
    }
  });

  connection.on('debug', function(text) {
      // if you have connection issues, uncomment this to get more detailed info
      //console.log(text);
  }).on('errorMessage', function(text) {
      // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) {
      return callback(err);
    }
    verifyMembershipUser(email, function(err, wasUpdated) {
      if (err) {
        return callback(err); // this will return a 500
      }

      callback(null, wasUpdated);
    });
  });

  function findUserId(email, callback) {
    var findUserIdFromEmail =
      'SELECT UserProfile.UserId FROM ' +
      'UserProfile INNER JOIN webpages_Membership ' +
      'ON UserProfile.UserId = webpages_Membership.UserId ' +
      'WHERE UserName = @Email';

    var findUserIdFromEmailQuery = new sqlserver.Request(findUserIdFromEmail, function (err, rowCount, rows) {
      if (err) {
        return callback(err);
      }

      // No record found with that email
      if (rowCount < 1) {
        return callback(null, null);
      }

      var userId = rows[0][0].value;

      callback(null, userId);

    });

    findUserIdFromEmailQuery.addParameter('Email', sqlserver.Types.VarChar, email);

    connection.execSql(findUserIdFromEmailQuery);

  }

  function verifyMembershipUser(email, callback) {
    findUserId(email, function (err, userId) {
      if (err) {
        return callback(err);
      }

      if(userId === null) {
        return callback();
      }

      // isConfirmed field is the email verification flag
      var updateMembership =
        'UPDATE webpages_Membership SET isConfirmed = \'true\' ' +
        'WHERE isConfirmed = \'false\' AND UserId = @UserId';

      var updateMembershipQuery = new sqlserver.Request(updateMembership, function (err, rowCount) {
        if (err) {
          return callback(err);
        }
        callback(null, rowCount > 0);
      });

      updateMembershipQuery.addParameter('UserId', sqlserver.Types.VarChar, userId);

      connection.execSql(updateMembershipQuery);

    });
  }
}
```

### MongoDB

```
function verify (email, callback) {
  mongo('mongodb://user:pass@mymongoserver.com/my-db', function (db) {
    var users = db.collection('users');
    var query = { email: email, email_verified: false };

    users.update(query, { $set: { email_verified: true } }, function (err, count) {
      if (err) return callback(err);
      callback(null, count > 0);
    });
  });
}
```

### MySQL

```
function verify (email, callback) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'mydb'
  });

  connection.connect();

  var query = "UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = ? ";

  connection.query(query, email, function (err, results) {
    if (err) return callback(err);
    if (results.affectedRows === 0) return callback();

    callback(null, results.length > 0);
  });

}
```

### Oracle

```
function verify(email, callback) {

  var oracledb = require('oracledb');
  oracledb.outFormat = oracledb.OBJECT;

  oracledb.getConnection({
      user: configuration.dbUser,
      password: configuration.dbUserPassword,
      connectString: "CONNECTION_STRING" // Refer here https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
    },
    function(err, connection) {
      if (err) {
        return callback(new Error(err));
      }

      connection.execute(
        "update users set EMAIL_VERIFIED = 'true' " +
        "where EMAIL = :email", [email], { autoCommit: true },
        function(err, result) {
          if (err) {
            doRelease(connection);
            return callback(new Error(err));
          }
          doRelease(connection);
          callback(null, result.rowsAffected > 0);
        });


      // Note: connections should always be released when not needed
      function doRelease(connection) {
        connection.close(
          function(err) {
            if (err) {
              console.error(err.message);
            }
          });
      }
    });
}
```

### PostgreSQL

```
function verify (email, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = "postgres://user:pass@localhost/mydb";
  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    var query = 'UPDATE users SET email_Verified = true ' +
                'WHERE email_Verified = false AND email = $1';

    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err) {
        return callback(err);
      }

      if (result.rowCount === 0) {
        return callback();
      }

      callback(null, result.rowCount > 0);
    });
  });

}
```

### SQL Server

```
function verify (email, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html

  var connection = sqlserver.connect({
    userName:  'test',
    password:  'test',
    server:    'localhost',
    options:  {
      database: 'mydb'
    }
  });

  var query = "UPDATE dbo.Users SET Email_Verified = true WHERE Email_Verified = false AND Email = @Email";

  connection.on('debug', function(text) {
    console.log(text);
  }).on('errorMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    var request = new sqlserver.Request(query, function (err, rows) {
      if (err) return callback(err);
      console.log('rows: ' + rows);
      callback(null, rows > 0);
    });

    request.addParameter('Email', sqlserver.Types.VarChar, email);

    connection.execSql(request);
  });
}
```

### Windows Azure SQL Database

```
function verify (email, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html

  var Connection = require('tedious@1.11.0').Connection;
  var Request = require('tedious@1.11.0').Request;
  var TYPES = require('tedious@1.11.0').TYPES;

  var connection = new Connection({
    userName:  'your-user@your-server-id.database.windows.net',
    password:  'the-password',
    server:    'your-server-id.database.windows.net',
    options:  {
      database: 'mydb',
      encrypt:  true
    }
  });

  var query =
    'UPDATE Users SET Email_Verified=\'TRUE\' ' +
    'WHERE Email_Verified=\'FALSE\' AND Email=@Email';

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
      callback(null, rows > 0);
    });

    request.addParameter('Email', TYPES.VarChar, email);

    connection.execSql(request);
  });
}

```

### Request with Basic Auth

```
function verify (email, callback) {

  request.put({
    url:  'https://myserviceurl.com/users',
    json: { email: email }
    //for more options check:
    //https://github.com/mikeal/request#requestoptions-callback
  }, function (err, response, body) {

    if (err) return callback(err);
    if (response.statusCode === 401) return callback();

    callback(null, body);

  });

}
```

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Change Email](/connections/database/custom-db/templates/change-email)

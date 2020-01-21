---
description: Custom database action script templates for changing a user's password.
toc: true
topics:
    - connections
    - custom-database
contentType: reference
useCase:
    - customize-connections
---
# Change Password Script Templates

The **Change Password** script implements the function executed to change the password associated with the user identity in the your legacy identity store. We recommend naming this function `changePassword`. The script is only used in a legacy authentication scenario. 

This script executes whenever a user tries to change their password; the user will receive the password reset email, which includes the link they need to follow to change their password. This script is **optional** however, a call to `changePassword` is typically preceded by a call to `getUser`, so if you implement the change password script you will also need to implement the [get user script](/connections/database/custom-db/templates/get-user).

::: panel Best practice
While it’s not mandatory to implement the `changePassword` function, it is a recommended best practice. The `changePassword` function is required to for the password reset workflow recommended for [great customer experience](https://auth0.com/learn/password-reset/). 
:::

The script is executed whenever [password reset](/universal-login/password-reset) workflow is performed and also during password change workflow via the Auth0 Dashboard or the Auth0 Management API. 

The `changePassword` function implemented in the **Change Password** script should be defined as follows:

```js
function changePassword(email, newPassword, callback) {
  // TODO: implement your script
  return callback(null, result);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `email` | The email address for the user as the user identifying credential. |
| `password` | The new password credential for the user. The password credential for the user is passed to the script in plain text so care must be taken regarding its use. |
| `callback` | Executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter of `true` indicates that the operation executed successfully; a `null` first parameter with no corresponding second parameter (or one with a value of `false`) indicates that no password change was performed (possibly due to the user not being found). A non `null` first parameter value indicates that some error condition occurred.  |

<%= include('../_includes/_bp-error-object') %>

<%= include('../_includes/_panel-bcrypt-hash-encryption') %>

## Language-specific script examples

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/change-password#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/change-password#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/change-password#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/change-password#mongodb)
* [MySQL](/connections/database/custom-db/templates/change-password#mysql)
* [Oracle](/connections/database/custom-db/templates/change-password#oracle)
* [PostgreSQL](/connections/database/custom-db/templates/change-password#postgresql)
* [SQL Server](/connections/database/custom-db/templates/change-password#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/change-password#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/change-password#request-with-basic-auth)
:::

### JavaScript

```
function changePassword (email, newPassword, callback) {
  // This script should change the password stored for the current user in your
  // database. It is executed when the user clicks on the confirmation link
  // after a reset password request.
  // The content and behavior of password confirmation emails can be customized
  // here: https://manage.auth0.com/#/emails
  // The `newPassword` parameter of this function is in plain text. It must be
  // hashed/salted to match whatever is stored in your database.
  //
  // There are three ways that this script can finish:
  // 1. The user's password was updated successfully:
  //     callback(null, true);
  // 2. The user's password was not updated:
  //     callback(null, false);
  // 3. Something went wrong while trying to reach your database:
  //     callback(new Error("my error message"));
  //
  // If an error is returned, it will be passed to the query string of the page
  // where the user is being redirected to after clicking the confirmation link.
  // For example, returning `callback(new Error("error"))` and redirecting to
  // https://example.com would redirect to the following URL:
  //     https://example.com?email=alice%40example.com&message=error&success=false

  var msg = "Please implement the Change Password script for this database " +
       "connection at https://manage.auth0.com/#/connections/database";
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function changePassword(email, newPassword, callback) {
  var connection = sqlserver.connect({
    userName:  'the username',
    password:  'the password',
    server:    'the server',
    options: {
      database:  'the db name',
      // encrypt: true for Windows Azure enable this
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
    var key = Buffer.concat([salt, salt, salt, salt]);
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(Buffer.from(password, 'ucs2'));
    var hashed = hmac.digest('base64');

    return hashed;
  }

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
    updateMembershipUser(email, newPassword, function(err, wasUpdated) {
      if (err) {
        return callback(err); // this will return a 500
      }

      callback(null, wasUpdated);
    });
  });

  function updateMembershipUser(email, newPassword, callback) {
    var salt            = crypto.randomBytes(16);
    var hashedPassword  = hashPassword(newPassword, salt);

    var updateMembership =
      'UPDATE Memberships '+
      'SET Password=@NewPassword, PasswordSalt=@NewSalt, LastPasswordChangedDate=GETDATE() '+
      'WHERE Email=@Email';

    var updateMembershipQuery = new sqlserver.Request(updateMembership, function (membershipErr, membershipCount) {
      if (membershipErr) {
        return callback(membershipErr);
      }
      callback(null, membershipCount > 0);
    });

    updateMembershipQuery.addParameter('NewPassword', sqlserver.Types.VarChar, hashedPassword);
    updateMembershipQuery.addParameter('NewSalt',     sqlserver.Types.VarChar, salt.toString('base64'));
    updateMembershipQuery.addParameter('Email',       sqlserver.Types.VarChar, email);

    connection.execSql(updateMembershipQuery);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function changePassword(email, newPassword, callback) {
  var connection = sqlserver.connect({
    userName:  'the username',
    password:  'the password',
    server:    'the server',
    options: {
      database:  'the db name',
      // encrypt: true for Windows Azure enable this
    }
  });

  /**
   * hashPassword
   *
   * This function hashes a password using HMAC SHA256 algorythm.
   *
   * @password    {[string]}    password to be hased
   * @salt        {[string]}    salt to be used in the hashing process
   * @callback    {[function]}  callback to be called after hashing the password
   */
  function hashPassword(password, salt, callback) {
    var iterations         = 1000;
    var passwordHashLength = 32;

    crypto.pbkdf2(password, salt, iterations, passwordHashLength, function (err, hashed) {
      if (err) {
        return callback(err);
      }
      var result = Buffer.concat([Buffer.from([0], 1), salt, Buffer.from(hashed, 'binary')]);

      var resultBase64 = result.toString('base64');

      callback(null, resultBase64);
    });

  }

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
    updateMembershipUser(email, newPassword, function(err, wasUpdated) {
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

  function updateMembershipUser(email, newPassword, callback) {
    findUserId(email, function (err, userId) {
      if (err) {
        return callback(err);
      }

      if (userId === null) {
        return callback();
      }

      var salt = crypto.randomBytes(16);

      var updateMembership =
        'UPDATE webpages_Membership '+
        'SET Password=@NewPassword, PasswordChangedDate=GETDATE() '+
        'WHERE UserId=@UserId';

      var updateMembershipQuery = new sqlserver.Request(updateMembership, function (err, rowCount) {
        if (err) {
          return callback(err);
        }

        if (rowCount < 1) {
          return callback();
        }

        callback(null, rowCount > 0);
      });

      hashPassword(newPassword, salt, function (err, hashedPassword) {
        if (err) {
          return callback(err);
        }

        updateMembershipQuery.addParameter('NewPassword',   sqlserver.Types.VarChar, hashedPassword);
        updateMembershipQuery.addParameter('UserId',        sqlserver.Types.VarChar, userId);

        connection.execSql(updateMembershipQuery);
      });
    });
  }
}
```

### MongoDB

```
function changePassword(email, newPassword, callback) {
  mongo('mongodb://user:pass@mymongoserver.com/my-db', function (db) {
    var users = db.collection('users');

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) {
        callback(err);
      } else {
        users.update({ email: email }, { $set: { password: hash } }, function (err, count) {
          if (err) return callback(err);
          callback(null, count > 0);
        });
      }
    });
  });
}
```

### MySQL

```sql
function changePassword (email, newPassword, callback) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'mydb'
  });

  connection.connect();

  var query = "UPDATE users SET password = ? WHERE email = ? ";

  bcrypt.hash(newPassword, 10, function (err, hash) {
    if (err) {
      callback(err);
    } else {
      connection.query(query, hash, email, function (err, results) {
        if (err) return callback(err);
        callback(null, results.affectedRows > 0);
      });
    }
  });
}
```

### Oracle

```sql
function changePassword(email, newPassword, callback) {

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
      bcrypt.hash(newPassword, 10, function(err, hash) {
        if (err) { return callback(err); }
        connection.execute(
          "update users set PASSWORD = :hash " +
          "where EMAIL = :email", [hash, email], { autoCommit: true },
          function(err, result) {
            if (err) {
              doRelease(connection);
              return callback(new Error(err));
            }
            doRelease(connection);
            callback(null, result.rowsAffected > 0);
          });
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
function changePassword (email, newPassword, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = "postgres://user:pass@localhost/mydb";
  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) return callback(err);
      client.query('UPDATE users SET password = $1 WHERE email = $2', [hash, email], function (err, result) {
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
  });
}
```

### SQL Server

```
function changePassword (email, newPassword, callback) {
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

  var query = "UPDATE dbo.Users SET Password = @NewPassword WHERE Email = @Email";

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

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) return callback(err);
      request.addParameter('NewPassword', sqlserver.Types.VarChar, hash);
      request.addParameter('Email', sqlserver.Types.VarChar, email);
      connection.execSql(request);
    });

  });
}
```

### Windows Azure SQL Database

```
function changePassword (email, newPassword, callback) {
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

  var query = 'UPDATE dbo.Users SET Password = @NewPassword ' +
    'WHERE Email = @Email';

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

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) { return callback(err); }
      request.addParameter('NewPassword', TYPES.VarChar, hash);
      request.addParameter('Email', TYPES.VarChar, email);
      connection.execSql(request);
    });
  });
}
```

### Request with Basic Auth

```
function changePassword (email, newPassword, callback) {

  request.put({
    url:  'https://myserviceurl.com/users',
    json: { email: email, password: newPassword }
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

* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)

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

The **Create** script implements the function executed to create a user in your database. We recommend naming this function `create`. The script is only used in a legacy authentication scenario. 

This script executes when a user signs up or when an administrator creates the user via the Dashboard or API. When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure to implement both database action scripts if you are creating new users. When the script finishes execution, the **Login** script runs to verify that the user was created successfully. 

Use this script if you want new users to signup via Auth0 so that Auth0 creates the users in your legacy data store. Not using the script doesn't prevent the creation of users by a mechanism external to Auth0. 

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
| `client_id` | the client ID of the application for which the user signed up, or the API key if the user was created through the Dashboard or API |
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
* [Oracle](/connections/database/custom-db/templates/create#oracle)
* [PostgreSQL](/connections/database/custom-db/templates/create#postgresql)
* [SQL Server](/connections/database/custom-db/templates/create#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/create#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/create#request-with-basic-auth)
:::

### JavaScript

```
function create (user, callback) {
  // This script should create a user entry in your existing database. It will
  // be executed when a user attempts to sign up, or when a user is created
  // through the Auth0 dashboard or API.
  // When this script has finished executing, the Login script will be
  // executed immediately afterwards, to verify that the user was created
  // successfully.
  //
  // The user object will always contain the following properties:
  // * email: the user's email
  // * password: the password entered by the user, in plain text
  // * tenant: the name of this Auth0 account
  // * client_id: the client ID of the application where the user signed up, or
  //              API key if created through the API or Auth0 dashboard
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
function create (user, callback) {
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

  var applicationId = 'your-application-id-goes-here';

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
    // console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) {
      return callback(err);
    }
    createMembershipUser(user, function(err, user) {
      if (err) {
        return callback(err); // this will return a 500
      }
      if (!user) {
        return callback(); // this will return a 401
      }

      callback(null, user);
    });
  });

  function createMembershipUser(user, callback) {
    var userData = {
      UserName:       user.email,
      ApplicationId:  applicationId
    };
    var createUser =
      'INSERT INTO Users (UserName, LastActivityDate, ApplicationId, UserId, IsAnonymous) ' +
      'OUTPUT Inserted.UserId ' +
      'VALUES (@UserName, GETDATE(), @ApplicationId, NEWID(), \'false\')';

    var createUserQuery = new sqlserver.Request(createUser, function (err, rowCount, rows) {
      if (err) {
        return callback(err);
      }

      // No records added
      if (rowCount === 0) {
        return callback(null);
      }

      var userId = rows[0][0].value;
      var salt = crypto.randomBytes(16);

      var membershipData = {
        ApplicationId:  applicationId,
        Email:          user.email,
        Password:       hashPassword(user.password, salt),
        PasswordSalt:   salt.toString('base64'),
        UserId:         userId
      };

      var createMembership =
        'INSERT INTO Memberships (ApplicationId, UserId, Password, PasswordFormat, ' +
        'PasswordSalt, Email, isApproved, isLockedOut, CreateDate, LastLoginDate, ' +
        'LastPasswordChangedDate, LastLockoutDate, FailedPasswordAttemptCount, ' +
        'FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, ' +
        'FailedPasswordAnswerAttemptWindowsStart) ' +
        'VALUES ' +
        '(@ApplicationId, @UserId, @Password, 1, @PasswordSalt, ' +
        '@Email, \'false\', \'false\', GETDATE(), GETDATE(), GETDATE(), GETDATE(), 0, 0, 0, 0)';

      var createMembershipQuery = new sqlserver.Request(createMembership, function (err, rowCount) {
        if (err) {
          return callback(err);
        }

        if (rowCount === 0) {
          callback(null);
        }

        callback(null, rowCount > 0);

      });

      createMembershipQuery.addParameter('ApplicationId', sqlserver.Types.VarChar, membershipData.ApplicationId);
      createMembershipQuery.addParameter('Email',         sqlserver.Types.VarChar, membershipData.Email);
      createMembershipQuery.addParameter('Password',      sqlserver.Types.VarChar, membershipData.Password);
      createMembershipQuery.addParameter('PasswordSalt',  sqlserver.Types.VarChar, membershipData.PasswordSalt);
      createMembershipQuery.addParameter('UserId',        sqlserver.Types.VarChar, membershipData.UserId);

      connection.execSql(createMembershipQuery);

    });

    createUserQuery.addParameter('UserName',      sqlserver.Types.VarChar, userData.UserName);
    createUserQuery.addParameter('ApplicationId', sqlserver.Types.VarChar, userData.ApplicationId);

    connection.execSql(createUserQuery);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function create (user, callback) {
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
    // console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) {
      return callback(err);
    }
    createMembershipUser(user, function(err, user) {
      if (err) {
        return callback(err); // this will return a 500
      }
      if (!user) {
        return callback(); // this will return a 401
      }

      callback(null, user);
    });
  });

  function createMembershipUser(user, callback) {
    var createUser =
      'INSERT INTO UserProfile (UserName) ' +
      'OUTPUT Inserted.UserId ' +
      'VALUES (@UserName)';

    var createUserQuery = new sqlserver.Request(createUser, function (err, rowCount, rows) {
      if (err) {
        return callback(err);
      }

      // No records added
      if (rowCount === 0) {
        return callback(null);
      }

      var userId = rows[0][0].value;
      var salt = crypto.randomBytes(16);

      var membershipData = {
        PasswordSalt:   salt.toString('base64'),
        UserId:         userId
      };

      var createMembership =
        'INSERT INTO webpages_Membership ' +
        '(UserId, CreateDate, IsConfirmed, PasswordFailuresSinceLastSuccess, Password, PasswordSalt) ' +
        'VALUES ' +
        '(@UserId, GETDATE(), \'false\', 0, @Password, \'\')';

      var createMembershipQuery = new sqlserver.Request(createMembership, function (err, rowCount) {
        if (err) {
          return callback(err);
        }

        if (rowCount === 0) {
          return callback(null);
        }

        callback(null, rowCount > 0);

      });

      hashPassword(user.password, salt, function (err, hashedPassword) {
        if (err) {
          return callback(err);
        }

        createMembershipQuery.addParameter('Password',      sqlserver.Types.VarChar, hashedPassword);
        createMembershipQuery.addParameter('PasswordSalt',  sqlserver.Types.VarChar, membershipData.PasswordSalt);
        createMembershipQuery.addParameter('UserId',        sqlserver.Types.VarChar, membershipData.UserId);

        connection.execSql(createMembershipQuery);

      });

    });

    createUserQuery.addParameter('UserName', sqlserver.Types.VarChar, user.email);

    connection.execSql(createUserQuery);
  }
}
```

### MongoDB

```
function create (user, callback) {
  mongo('mongodb://user:pass@mymongoserver.com/my-db', function (db) {
    var users = db.collection('users');

    users.findOne({ email: user.email }, function (err, withSameMail) {

      if (err) return callback(err);
      if (withSameMail) return callback(new Error('the user already exists'));

      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) { return callback(err); }
        user.password = hash;
        users.insert(user, function (err, inserted) {
          if (err) return callback(err);
          callback(null);
        });
      });
    });
  });
}
```

### MySQL

```sql
function create(user, callback) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  var query = "INSERT INTO users SET ?";

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) { return callback(err); }
    var insert = {
      password: hash,
      email: user.email
    };
    connection.query(query, insert, function (err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback();
      callback(null);
    });
  });

}
```

### Oracle

```sql
function create(user, callback) {

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
        "SELECT ID, EMAIL, PASSWORD, EMAIL_VERIFIED, NICKNAME" +
        " FROM Users " +
        " WHERE EMAIL = :email", [user.email],
        function(err, result) {
          if (err) {
            doRelease(connection);
            return callback(new Error(err));
          }
          if (result.rows.length > 0) {
            doRelease(connection);
            return callback(new Error("User already exists"));
          }
          bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) { return callback(err); }
            user.password = hash;
            connection.execute(
              "insert into users (EMAIL, PASSWORD, EMAIL_VERIFIED, NICKNAME) " +
              " values (:email, :password, :email_verified, :nickname)", [
                user.email, user.password, 'false', user.email.substring(0, user.email.indexOf('@'))
              ], {
                autoCommit: true
              },
              function(err, result) {
                if (err) {
                  doRelease(connection);
                  return callback(new Error(err));
                }
                doRelease(connection);
                callback(null);
              });
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
function create(user, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = "postgres://user:pass@localhost/mydb";

  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }
    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      var query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
      client.query(query, [user.email, hashedPassword], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();
        if (err) {
          console.log('error executing query', err);
          return callback(err);
        }
        if (result.rows.length === 0) {
          return callback();
        }
        callback(null);
      });
    });
  });
}
```

### SQL Server

```
function create (user, callback) {
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

  var query = "INSERT INTO dbo.Users SET Email = @Email, Password = @Password";

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
      callback(null);
    });

    var hashedPassword = bcrypt.hashSync(user.password, 10);

    request.addParameter('Email', sqlserver.Types.VarChar, user.email);
    request.addParameter('Password', sqlserver.Types.VarChar, hashedPassword);

    connection.execSql(request);
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
function create (user, callback) {

  request.post({
    url:  'https://myserviceurl.com/users',
    json: user
    //for more options check:
    //https://github.com/mikeal/request#requestoptions-callback
  }, function (err, response, body) {

    if (err) return callback(err);
    if (response.statusCode === 401) return callback();

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

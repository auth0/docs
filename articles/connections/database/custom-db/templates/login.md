---
description: Custom DB script templates for user login
toc: true
topics:
    - connections
    - custom-database
contentType: how-to
useCase:
    - customize-connections
---
# Custom Database Script Templates: Login

Auth0 provides the following custom database login script templates that you can use when implementing user login functionality.

While Auth0 has populated default templates in the Dashboard script editor, you can use the following links to recover the original code and notes once you've made and saved edits.

## Notes

When working on your login script, keep in mind that:

* The script will be executed each time a user attempts to login
* The two parameters, **email** and **password**, are used to validate the authenticity of the user 
* The login script is **mandatory**

## Sample Scripts

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/login#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/login#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/login#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/login#mongodb)
* [MySQL](/connections/database/custom-db/templates/login#mysql)
* [Oracle](/connections/database/custom-db/templates/login#oracle)
* [PostgreSQL](/connections/database/custom-db/templates/login#postgresql)
* [SQL Server](/connections/database/custom-db/templates/login#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/login#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/login#request-with-basic-auth)
* [Stormpath](/connections/database/custom-db/templates/login#stormpath)
:::

### JavaScript

```
function login (email, password, callback) {
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
  // the following format: https://auth0.com/docs/user-profile/normalized
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

  var msg = "Please implement the Login script for this database connection " +
       "at https://manage.auth0.com/#/connections/database";
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function login (email, password, callback) {
  var connection = sqlserver.connect({
    userName:  'the username',
    password:  'the password',
    server:    'the server',
    options: {
      database:   'the db name',
      encrypt:    true // for Windows Azure
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
    getMembershipUser(email, function(err, user) {
      if (err) {
        return callback(err); // this will return a 500
      }
      if (!user.profile) {
        return callback(); // this will return a 401
      }

      var salt = Buffer.from(user.password.salt, 'base64');

      if (hashPassword(password, salt).toString('base64') !== user.password.password) {
        return callback(); // this will return a 401
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
  function getMembershipUser(usernameOrEmail, callback) {
    var query =
      'SELECT Memberships.UserId, Email, Users.UserName, Password, PasswordSalt ' +
      'FROM Memberships INNER JOIN Users ' +
      'ON Users.UserId = Memberships.UserId ' +
      'WHERE Memberships.Email = @Username OR Users.UserName = @Username';

    var getMembershipQuery = new sqlserver.Request(query, function (err, rowCount) {
      if (err) {
        return callback(err);
      }
      if (rowCount < 1) {
        return callback();
      }
    });

    getMembershipQuery.addParameter('Username', sqlserver.Types.VarChar, usernameOrEmail);

    getMembershipQuery.on('row', function (fields) {
      var user = {};

      user.profile = {
        user_id:   fields.UserId.value,
        nickname:  fields.UserName.value,
        name:      fields.UserName.value,
        email:     fields.Email.value,
      };

      user.password = {
        password: fields.Password.value,
        salt: fields.PasswordSalt.value
      };

      callback(null, user);
    });

    connection.execSql(getMembershipQuery);
  }

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
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function login (username, password, callback) {
  var connection = sqlserver.connect({
    userName:  'YOUR_USER@YOUR_SERVER.database.windows.net',
    password:  'YOUR_PASS',
    server:    'YOUR_SERVER.database.windows.net',
    options: {
      database:  'YOUR_DATABASE_NAME',
      encrypt: true
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
    getMembershipUser(username, function(err, user) {
      if (err) {
        return callback(err); // this will return a 500
      }
      if (!user.profile) {
        return callback(); // this will return a 401
      }

      validatePassword(password, user.password.password, function(err, isValid) {
        if (!isValid) {
          return callback(); // unauthorized
        }

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
  function getMembershipUser(usernameOrEmail, callback) {
    var user = {};
    var query =
      'SELECT webpages_Membership.UserId, UserName, UserProfile.UserName, Password from webpages_Membership ' +
      'INNER JOIN UserProfile ON UserProfile.UserId = webpages_Membership.UserId ' +
      'WHERE UserProfile.UserName = @Username';

    var getMembershipQuery = new sqlserver.Request(query, function (err, rowCount) {
      if (err) {
        return callback(err);
      }

      if (rowCount < 1) {
        return callback();
      }

      callback(null, user);
    });

    getMembershipQuery.addParameter('Username', sqlserver.Types.VarChar, usernameOrEmail);

    getMembershipQuery.on('row', function (fields) {
      user.profile = {
        user_id:      fields.UserId.value,
        nickname:     fields.UserName.value,
        email:        fields.UserName.value,
      };

      user.password = {
        password: fields.Password.value
      };
    });

    connection.execSql(getMembershipQuery);
  }

  function fixedTimeComparison(a, b) {
    var mismatch = (a.length === b.length ? 0 : 1);
    if (mismatch) {
      b = a;
    }

    for (var i = 0, il = a.length; i < il; ++i) {
      var ac = a.charCodeAt(i);
      var bc = b.charCodeAt(i);
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
    var iterations = 1000;
    var hashBytes = Buffer.from(originalHash, 'base64');
    var salt = hashBytes.slice(1, 17).toString('binary');
    var hash = hashBytes.slice(17, 49);
    crypto.pbkdf2(password, salt, iterations, hash.length, function(err, hashed) {
      if (err) {
        return callback(err);
      }
      var hashedBase64 = Buffer.from(hashed, 'binary').toString('base64');

      var isValid = fixedTimeComparison(hash.toString('base64'), hashedBase64);
      return callback(null, isValid);

    });
  }
}
```

### MongoDB

```
function login(email, password, callback) {
  mongo('mongodb://user:pass@mymongoserver.com/my-db', function (db) {
    var users = db.collection('users');
    users.findOne({ email: email }, function (err, user) {

      if (err) return callback(err);

      if (!user) return callback(new WrongUsernameOrPasswordError(email));

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err) {
          callback(err);
        } else if (!isValid) {
          callback(new WrongUsernameOrPasswordError(email));
        } else {
          callback(null, {
            user_id: user._id.toString(),
            nickname: user.nickname,
            email: user.email
          });
        }
      });
    });
  });
}
```

### MySQL

```sql
function login(email, password, callback) {
  var connection = mysql({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  var query = "SELECT id, nickname, email, password " +
    "FROM users WHERE email = ?";

  connection.query(query, [email], function (err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
    var user = results[0];

    bcrypt.compare(password, user.password, function (err, isValid) {
      if (err) {
        callback(err);
      } else if (!isValid) {
        callback(new WrongUsernameOrPasswordError(email));
      } else {
        callback(null, {
          id: user.id.toString(),
          nickname: user.nickname,
          email: user.email
        });
      }
    });

  });
}
```

### Oracle

```sql
function login(email, password, callback) {
  var oracledb = require('oracledb');
  oracledb.outFormat = oracledb.OBJECT;

  oracledb.getConnection({
      user: configuration.dbUser,
      password: configuration.dbUserPassword,
      connectString: "CONNECTION_STRING" // Refer here https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
    },
    function(err, connection) {
      if (err) {
        return callback(err);
      }
      connection.execute(
        "SELECT ID, EMAIL, PASSWORD, EMAIL_VERIFIED, NICKNAME" +
        " FROM Users " +
        " WHERE EMAIL = :email", [email],
        function(err, result) {
          if (err) {
            doRelease(connection);
            return callback(new Error(err));
          }
          doRelease(connection);
          if (result.rows.length === 0) {
            return callback(null);
          }
          bcrypt.compare(password, result.rows[0].PASSWORD, function(err, isValid) {
            if (err) {
              return callback(new Error(err));
            } else if (!isValid) {
              callback(new WrongUsernameOrPasswordError(email));
            } else {
              var userProfile = {
                user_id: result.rows[0].ID,
                nickname: result.rows[0].NICKNAME,
                email: result.rows[0].EMAIL,
                email_verified: result.rows[0].EMAIL_VERIFIED
              };
              callback(null, userProfile);
            }
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
function login(email, password, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = "postgres://user:pass@localhost/mydb";
  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    var query = 'SELECT id, nickname, email, password ' +
      'FROM users WHERE email = $1';

    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err) {
        console.log('error executing query', err);
        return callback(err);
      }

      if (result.rows.length === 0) {
        return callback(new WrongUsernameOrPasswordError(email));
      }

      var user = result.rows[0];

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err) {
          callback(err);
        } else if (!isValid) {
          callback(new WrongUsernameOrPasswordError(email));
        } else {
          callback(null, {
            id: user.id,
            nickname: user.nickname,
            email: user.email
          });
        }
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
  var connection = sqlserver.connect({
    userName: 'test',
    password: 'test',
    server: 'your-sql-server.example.com',
    options: {
      database: 'mydb',
      rowCollectionOnRequestCompletion: true
    }
  });

  var query = "SELECT Id, Nickname, Email, Password " +
    "FROM dbo.Users WHERE Email = @Email";

  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    var request = new sqlserver.Request(query, function (err, rowCount, rows) {
      if (err) {
        callback(new Error(err));
      } else if (rowCount < 1) {
        callback(new WrongUsernameOrPasswordError(email));
      } else {
        bcrypt.compare(password, rows[0][3].value, function (err, isValid) {
          if (err) { callback(new Error(err)); }
          else if (!isValid) { callback(new WrongUsernameOrPasswordError(email)); }
          else {
            callback(null, {
              user_id: rows[0][0].value,
              nickname: rows[0][1].value,
              email: rows[0][2].value
            });
          }
        });
      }
    });

    request.addParameter('Email', sqlserver.Types.VarChar, email);
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
function login (email, password, callback) {

  request.get({
    url:  'https://myserviceurl.com/profile',
    auth: {
      username: email,
      password: password
    }
    //for more options check:
    //https://github.com/mikeal/request#requestoptions-callback
  }, function (err, response, body) {

    if (err) return callback(err);
    if (response.statusCode === 401) return callback();
    var user = JSON.parse(body);

    callback(null,   {
      user_id:     user.user_id.toString(),
      nickname:    user.nickname,
      email:       user.email
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
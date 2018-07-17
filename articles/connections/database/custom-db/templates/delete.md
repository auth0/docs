---
description: Custom DB script templates for user deletion
toc: true
---
# Custom Database Script Templates: Delete Users

Auth0 provides the following custom database script templates that you can use when implementing user deletion functionality.

While Auth0 has populated default templates in the Dashboard script editor, you can use the following links to recover the original code and notes once you've made and saved edits.

## Notes

When working on your user creation script, keep in mind that this script will be executed when a user is deleted. 

## Sample Scripts

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/delete#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/delete#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/delete#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/delete#mongodb)
* [MySQL](/connections/database/custom-db/templates/delete#mysql)
* [Oracle](/connections/database/custom-db/templates/delete#oracle)
* [PostgreSQL](/connections/database/custom-db/templates/delete#postgresql)
* [SQL Server](/connections/database/custom-db/templates/delete#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/delete#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/delete#request-with-basic-auth)
:::

### JavaScript

```
function remove (id, callback) {
  // This script remove a user from your existing database.
  // It is executed whenever a user is deleted from the API or Auth0 dashboard.
  //
  // There are two ways that this script can finish:
  // 1. The user was removed successfully:
  //     callback(null);
  // 2. Something went wrong while trying to reach your database:
  //     callback(new Error("my error message"));

  var msg = "Please implement the Delete script for this database " +
       "connection at https://manage.auth0.com/#/connections/database";
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function remove (id, callback) {

  var connection = sqlserver.connect({
    userName: 'username',
    password: 'pwd',
    server: 'server',
    options: {
      database: 'mydb',
      encrypt: true,
      // Required to retrieve userId needed for Membership entity creation
      rowCollectionOnRequestCompletion: true
    }
  });

  connection.on('debug', function (text) {
    // if you have connection issues, uncomment this to get more detailed info
    // console.log(text);
  }).on('errorMessage', function (text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) { return callback(err); }
    executeDelete(['Memberships', 'Users'], function (err) {
      if (err) { return callback(err); }
      callback(null);
    });
  });

  function executeDelete (tables, callback) {
    var query = tables.map(function (table) {
      return 'DELETE FROM ' + table + ' WHERE UserId = @UserId';
    }).join(';');
    var request = new sqlserver.Request(query, function (err) {
      if (err) { return callback(err); }
      callback(null);
    });
    request.addParameter('UserId', sqlserver.Types.VarChar, id);
    connection.execSql(request);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function remove (id, callback) {

  var connection = sqlserver.connect({
    userName: 'username',
    password: 'pwd',
    server: 'server',
    options: {
      database: 'mydb',
      encrypt: true,
      // Required to retrieve userId needed for Membership entity creation
      rowCollectionOnRequestCompletion: true
    }
  });

  connection.on('debug', function (text) {
    // if you have connection issues, uncomment this to get more detailed info
    // console.log(text);
  }).on('errorMessage', function (text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) { return callback(err); }
    executeDelete(['webpages_Membership', 'UserProfile'], function (err) {
      if (err) { return callback(err); }
      callback(null);
    });
  });

  function executeDelete (tables, callback) {
    var query = tables.map(function (table) {
      return 'DELETE FROM ' + table + ' WHERE UserId = @UserId';
    }).join(';');
    var request = new sqlserver.Request(query, function (err) {
      if (err) { return callback(err); }
      callback(null);
    });
    request.addParameter('UserId', sqlserver.Types.VarChar, id);
    connection.execSql(request);
  }
}
```

### MongoDB

```
function remove (id, callback) {

  mongo('mongodb://user:pass@mymongoserver.com/my-db', function (db) {
    var users = db.collection('users');

    users.remove({ _id: id }, function (err) {
      if (err) return callback(err);
      callback(null);
    });
  });

}
```

### MySQL

```
function remove (id, callback) {

  var connection = mysql({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'mydb'
  });

  connection.connect();

  var query = 'DELETE FROM users WHERE id = ?';

  connection.query(query, [id], function (err) {
    if (err) return callback(err);
    callback(null);
  });
}
```

### Oracle

```
function remove(id, callback) {

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
        "delete users " +
        "where ID = :id", [id], { autoCommit: true },
        function(err, result) {
          if (err) {
            doRelease(connection);
            return callback(new Error(err));
          }
          doRelease(connection);
          callback(null);
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
function remove (id, callback) {
  // this example uses the "pg" library
  // more info here: https://github.com/brianc/node-postgres

  postgres('postgres://user:pass@localhost/mydb', function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    client.query('DELETE FROM users WHERE id = $1', [id], function (err) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err) {
        return callback(err);
      }

      callback(null);
    });
  });
}
```

### SQL Server

```
function remove (id, callback) {
  // this example uses the "tedious" library
  // more info here: http://pekim.github.io/tedious/index.html

  var connection = sqlserver.connect({
    userName: 'test',
    password: 'test',
    server: 'localhost',
    options: {
      database: 'mydb'
    }
  });

  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) { return callback(err); }
    var query = 'DELETE FROM dbo.Users WHERE id = @UserId';

    var request = new sqlserver.Request(query, function (err) {
      if (err) { return callback(err); }
      callback(null);
    });

    request.addParameter('UserId', sqlserver.Types.VarChar, id);

    connection.execSql(request);
  });
}
```

### Windows Azure SQL Database

```
function remove (id, callback) {
  // this example uses the "tedious" library
  // more info here: http://pekim.github.io/tedious/index.html

  var Connection = require('tedious@1.11.0').Connection;
  var Request = require('tedious@1.11.0').Request;
  var TYPES = require('tedious@1.11.0').TYPES;

  var connection = new Connection({
    userName: 'your-user@your-server-id.database.windows.net',
    password: 'the-password',
    server: 'your-server-id.database.windows.net',
    options: {
      database: 'mydb',
      encrypt: true
    }
  });

  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) { return callback(err); }
    var query = 'DELETE FROM users WHERE id = @UserId';

    var request = new Request(query, function (err) {
      if (err) { return callback(err); }
      callback(null);
    });

    request.addParameter('UserId', TYPES.VarChar, id);

    connection.execSql(request);
  });
}
```

### Request with Basic Auth

```
function remove (id, callback) {

  request.del({
    url: 'https://myserviceurl.com/users/' + id
    // for more options check:
    // https://github.com/mikeal/request#requestoptions-callback
  }, function (err, response, body) {
    if (err) { return callback(err); }
    callback(null);
  });
}
```
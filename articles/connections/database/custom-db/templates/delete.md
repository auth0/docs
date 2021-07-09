---
description: Custom database action script templates for user deletion.
toc: true
topics:
    - connections
    - custom-database
contentType: reference
useCase:
    - customize-connections
---
# Delete Script Templates

The **Delete** script implements the function executed in order to delete the specified user identity from the legacy identity store. We recommend naming this function `deleteUser` (which will also mitigate clashes with the JavaScript `delete` keyword). The script is only used in a legacy authentication scenario if you want use Auth0 to delete users from your legacy data store. 

::: warning
Deleting a user using the Auth0 Dashboard or the Auth0 Management API performs deletion of both the user profile and the user identity. If you do not implement this script correctly then this will not be done as an atomic operation, which may leave a user identity still in existence even after the user’s profile has been removed. Conversely, deleting a user identity outside of Auth0 will typically leave a disconnected (orphaned) profile in Auth0 that has no associated user identity. This may cause unpredictable issues. 
:::

The `deleteUser` function should be defined as follows:

```js
function deleteUser(id, callback) {
  // TODO: implement your script
  return callback(null);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `id` | The identifier of the user. This is the connection specific identifier returned as the user_id value from either the `login` or `getUser` function. |
| `callback` | Executed with a single parameter. The one and only parameter is an indication of status: a `null` value indicates successful operation, whereas a non `null` value indicates that some error condition occurred.  |

<%= include('../_includes/_bp-error-object') %>

<%= include('../_includes/_panel-bcrypt-hash-encryption') %>

## Sample Scripts

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/delete#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/delete#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/delete#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/delete#mongodb)
* [MySQL](/connections/database/custom-db/templates/delete#mysql)
* [PostgreSQL](/connections/database/custom-db/templates/delete#postgresql)
* [SQL Server](/connections/database/custom-db/templates/delete#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/delete#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/delete#request-with-basic-auth)
:::

### JavaScript

```
function remove (id, callback) {
  // This script remove a user from your existing database.
  // It is executed whenever a user is deleted from the Management API or Auth0 dashboard.
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
function remove(id, callback) {
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

  connection.on('debug', function(text) {
    // if you have connection issues, uncomment this to get more detailed info
    // console.log(text);
  }).on('errorMessage', function(text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function(err) {
    if (err) return callback(err);

    executeDelete(['Memberships', 'Users'], function(err) {
      if (err) return callback(err);

      callback(null);
    });
  });

  function executeDelete(tables, callback) {
    const query = tables.map(function(table) {
      return 'DELETE FROM ' + table + ' WHERE UserId = @UserId';
    }).join(';');
    const request = new Request(query, function(err) {
      if (err) return callback(err);

      callback(null);
    });
    request.addParameter('UserId', TYPES.VarChar, id);
    connection.execSql(request);
  }
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function remove(id, callback) {
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

  connection.on('debug', function (text) {
    // if you have connection issues, uncomment this to get more detailed info
    // console.log(text);
  }).on('errorMessage', function (text) {
    // this will show any errors when connecting to the SQL database or with the SQL statements
    console.log(JSON.stringify(text));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);
    executeDelete(['webpages_Membership', 'UserProfile'], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  });

  function executeDelete(tables, callback) {
    const query = tables.map(function (table) {
      return 'DELETE FROM ' + table + ' WHERE UserId = @UserId';
    }).join(';');
    const request = new Request(query, function (err) {
      if (err) return callback(err);
      callback(null);
    });
    request.addParameter('UserId', TYPES.VarChar, id);
    connection.execSql(request);
  }
}
```

### MongoDB

```
function remove(id, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb://user:pass@mymongoserver.com');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('db-name');
    const users = db.collection('users');

    users.remove({ _id: id }, function (err) {
      client.close();

      if (err) return callback(err);
      callback(null);
    });
  });

}
```

### MySQL

```
function remove(id, callback) {
  const mysql = require('mysql');

  const connection = mysql({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'mydb'
  });

  connection.connect();

  const query = 'DELETE FROM users WHERE id = ?';

  connection.query(query, [ id ], function(err) {
    if (err) return callback(err);
    callback(null);
  });
}
```

### PostgreSQL

```
function remove(id, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  const postgres = require('pg');

  const conString = 'postgres://user:pass@localhost/mydb';
  postgres.connect(conString, function (err, client, done) {
    if (err) return callback(err);

    const query = 'DELETE FROM users WHERE id = $1';
    client.query(query, [id], function (err) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      return callback(err);
    });
  });
}
```

### SQL Server

```
function remove(id, callback) {
  // this example uses the "tedious" library
  // more info here: http://pekim.github.io/tedious/index.html
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

  const query = 'DELETE FROM dbo.Users WHERE id = @UserId';

  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    const request = new Request(query, function (err) {
      if (err) return callback(err);
      callback(null);
    });

    request.addParameter('UserId', TYPES.VarChar, id);

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

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)

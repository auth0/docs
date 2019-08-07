---
description: Custom DB script templates and checklist and troubleshooting
topics:
    - connections
    - custom-database
    - templates
contentType: 
    - index
useCase:
    - customize-connections
    - script-templates
---
# Custom Database Script Templates

::: panel Feature availability
Only **Enterprise** subscription plans include the ability to use a custom database for authentication requests. For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

If you have your own user database, you can use it as an identity provider in Auth0 to authenticate users. 

There are two different types of custom database scripts:

  * **Trickle Migration**: Whenever a user logs into Auth0, if the user is not yet in Auth0, the script will check the legacy database to see if the user is there. If they are there, it will migrate the user to Auth0. This script runs when the **Import users to Auth0** flag is turned on. 

  * **Legacy DB**: Auth0 will always call out to the underlying database anytime a user tries to log in, is created, changes their password, verifies their email, or is deleted. Users stay in the legacy database and do **not** migrate to Auth0.

You can use the following scripts:

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create User](/connections/database/custom-db/templates/create)
* [Delete User](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify User](/connections/database/custom-db/templates/verify)

## Obtain original script code

While Auth0 has populated default templates in the Dashboard script editor, you can use the following links to recover the original code and notes once you've made and saved edits.

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create User](/connections/database/custom-db/templates/create)
* [Delete User](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify User](/connections/database/custom-db/templates/verify)

### IBM DB2 script template example

Users of [IBM's DB2](https://www.ibm.com/analytics/us/en/technology/db2/) product may find [this sample login script](/connections/database/db2-script) to be of interest.

![Database action script templates](/media/articles/connections/database/mysql/db-connection-login-script.png)

For example, the MySQL Login template is as follows:

```js
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
          // This prefix (replace with your own custom DB name)
          // ensure uniqueness across different custom DBs if there's the
          // possibility of collisions (e.g. if the user ID is an email address or an integer)
          id: 'MyConnection1|' + user.id.toString(),
          nickname: user.nickname,
          email: user.email
        });
      }
    });
  });
}
```

The above script connects to a MySQL database and executes a query to retrieve the first user with `email == user.email`.

With the **bcrypt.compareSync** method, it then validates that the passwords match, and if successful, returns an object containing the user profile information including **id**, **nickname**, and **email**.

This script assumes that you have a **users** table containing these columns. The **id** returned by Login script is used to construct the **user ID** attribute of the user profile. 

::: warning
Ensure that the returned user ID is unique across custom databases. See [User IDs](#user-ids) below.
:::

Be sure to **Save** your changes. Note that clicking **Try** to test your script will also save your script.

## Keep reading

* [Script template best practices](/best-practices/custom-database-connections#script-template-best-practices)

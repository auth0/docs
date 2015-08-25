# Importing users to Auth0

Our focus has always been not only greenfield projects but also existing applications that want to extend their Authentication capabilities.

We have released a new feature that enables the gradual migration of users from an existing **Database Connection** to Auth0.

## Enabling automatic migration

Check the "Import Users to Auth0" option in the connection settings:

![](/media/articles/migrating/migrating-1.png)

## Login script

When you write a **login script** in the database connection to authenticate users, for instance:

```javascript
function (email, password, callback) {

  // validate user/password against your existing database
  request.get({
    url:  'https://example.com/existingdatabase/login',
    auth: {
      username: email,
      password: password
    }
  }, function (err, response, body) {
    if (err) return callback(err);
    if (response.statusCode === 401) return callback();
    var user = JSON.parse(body);

    // return the user information that you
    // want to persist into Auth0 as a new user
    callback(null,   {
      user_id:     user.user_id.toString(),
      nickname:    user.nickname,
      email:       user.email
    });
  });
}
```

Then when a user authenticates, the following process takes place:

![](/media/articles/migrating/migrating-2.png)

For example, suppose you have an existing MySQL database and you are hashing passwords with SHA1.
You would define the script that connects to MySQL, gets the user from the DB and then uses `crypto.createHash('sha1')` to hash the password and check against the stored password.
If that was succesful, the user would be automatically created in Auth0's database.
The next time that user attempts to log in, their credentials and information would be retrieved from Auth0 and not your MySQL database.

> Note: Password resets will only affect the users stored in Auth0, and new users will be stored in Auth0 only.

## Get User script

The Get User script will be executed whenever a user performs any of the following actions:

* Attempts to sign up
* Clicks on a valid [password change confirmation](https://auth0.com/docs/email#11) link

This script is needed because none of these actions require authentication; the Get User provides a way of verifying whether a user exists in a legacy database without needing their password.

If an unmigrated user confirms a password change, their user profile will be created in Auth0 with the new password they have just confirmed.
This user profile will contain all the information returned in the Get User script, and any following logins will be performed in Auth0 directly.

# Importing users to Auth0

Our focus has always been not only greenfield projects but also existing applications that want to extend their Authentication capabilities.

We have released a new feature that enables the gradual migration users from an existing **Database Connection** to Auth0.

## How to enable it?

Check the "Import Users to Auth0" option in the connection settings:

![](img/migrating-1.png)

## How does it works?

When you write a **login script** in the database connection to authenticate users, for instance:

```javascript
function (email, password, callback) {

  // validate user/password against your existing database
  request.get({
    url:  'https://myapp.com/existingdatabase/login',
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

Then when a user authenticates, the following process take place:

![](img/migrating-2.png)

Password resets will only affect the users stored in Auth0, and new users will be stored in Auth0 only.

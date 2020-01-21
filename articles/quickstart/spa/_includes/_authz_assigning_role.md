## Assign a Role to a User

Assigning a role to a user with Auth0 can be done with the [rules pipeline](https://auth0.com/docs/rules). After a role is assigned to a user, your application needs to know what that role is. This information can be kept in the user's ID Token and can later be used in your app.

Navigate to the **Rules** area in your Auth0 dashboard, choose **Create Rule** and then choose **Empty Rule**.

The rule logic depends on how you have implemented roles. This simple example checks whether the user has a `@example.com` email address. If the user does, they are assigned a `role` of `admin`, and if they don't, they get a `role` of `user`.

```js
function (user, context, callback) {

  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  const addRolesToUser = function(user) {
    const endsWith = '@example.com';

    if (user.email && (user.email.substring(user.email.length - endsWith.length, user.email.length) === endsWith)) {
      return ['admin']
    }
    return ['user'];
  };

  const roles = addRolesToUser(user);

  user.app_metadata.roles = roles;
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      context.idToken['https://example.com/roles'] = user.app_metadata.roles;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
```

The ID Token is being augmented with an additional claim called `https://<your-domain>.com/role`. Why the `example.com` domain and not just `role`? Per the JWT spec, if you want to use any custom claims in your token, you need to be sure they are unique. [Namespacing Claims](/tokens/guides/create-namespaced-custom-claims) them to your domain ensures that the particular claim won't have collisions elsewhere.

::: note
For more information on how to implement role assignment in an ID Token using rules, see the [claims documentation](api-auth/tutorials/adoption/scope-custom-claims).
:::

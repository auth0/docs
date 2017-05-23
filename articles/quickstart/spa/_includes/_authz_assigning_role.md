## Assign a Role to a User

Assigning a role to a user with Auth0 can be done with the [rules pipeline](https://auth0.com/docs/rules). After a role is assigned to a user, your application needs to know what that role is. This information can be kept in the user's `id_token` and can later be used in your app.

Navigate to the **Rules** area in your Auth0 dashboard, choose **Create Rule** and then choose **Empty Rule**.

The rule logic depends on how you have implemented roles. This simple example checks whether the user has a `gmail.com` email address. If the user does, they are assigned a `role` of `admin`, and if they don't, they get a `role` of `user`.

```js
function (user, context, callback) {
  if (user.email.indexOf('@gmail.com') > -1) {
    context.idToken['https://<your-domain>.com/role'] = 'admin';
  } else {
    context.idToken['https://<your-domain>.com/role'] = 'user';
  }
  callback(null, user, context);
}
```

The `id_token` is being augmented with an additional claim called `https://<your-domain>.com/role`. Why the `example.com` domain and not just `role`? Per the JWT spec, if you want to use any custom claims in your token, you need to be sure they are unique. Namespacing them to your domain ensures that the particular claim won't have collisions elsewhere.

::: note
For more information on how to implement role assignment in an `id_token` using rules, see the [claims documentation](api-auth/tutorials/adoption/scope-custom-claims).
:::

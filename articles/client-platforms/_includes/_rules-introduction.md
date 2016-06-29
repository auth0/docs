Rules are one of the cool features of Auth0. Reason for it's coolness is it's flexibility which gives you the ability to extend what Auth0 has to offer. 
They are JavaScript functions which works like middlewares. To see a detailed description, please refer to [the full docs](https://auth0.com/docs/rules)

#### Create a rule

We are going to create a simple rule to assign roles to our users based on their mail. Just create an empty rule from [rules create page](https://manage.auth0.com/#/rules/create). 

![Empty rule](/media/articles/rules/rule-create-empty.png)


Name the rule whatever suite you in the first text box and update the template snippet to the following:

```js
function (user, context, callback) {
  user.roles = [];
  // only 'test@example.com' is admin
  if (user.email === 'test@example.com') {
    user.roles.push('admin');
  }

  // all users are guest
  user.roles.push('guest');

  callback(null, user, context);
}
```

This simply adds `guest` `roles` to all users except the user with `test@example.com` which will have both `admin` and `guest` added to it's `roles`.

![Empty rule](/media/articles/rules/rule-basic-roles.png)

Save the rule once you are satisfied with how it works. 

Done! You added a basic rule to Auth0 that will add roles to users.

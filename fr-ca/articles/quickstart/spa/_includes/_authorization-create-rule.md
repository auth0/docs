First, create a rule that assigns users to either an `admin` role or a single `user` role. Go to the [New Rule](${manage_url}/#/rules/new) page in the Auth0 dashboard and select the **Set Roles to a User** template under **Access Control**.

By default, this rule will assign the user an `admin` role if the user’s email contains `@example.com`. Otherwise, the user will be assigned a regular `user` role.

You can modify this line in the default script to change the domain name to one suitable for your setup:

```js
if (user.email.indexOf('@example.com') > -1)
```

::: note
You can set roles other than `admin` and `user` and you may customize the rule as needed.
:::

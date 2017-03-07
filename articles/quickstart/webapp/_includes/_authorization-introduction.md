Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

> This tutorial assumes that you've already read the [rules tutorial](${ruleslink}) and you know how to implement a basic rule in your app.

### Create a Rule to assign roles

First, we will create a rule that assigns our users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if the user email contains `@example.com` they will be given an `admin` role, otherwise a regular `user` role.

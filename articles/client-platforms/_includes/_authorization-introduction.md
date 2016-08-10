Many identity providers will supply access claims, like roles or groups, with the user. You can request these in the token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider supplies this type of information. Fortunately, Auth0 has an alternative, which is to create a rule for assigning different roles to different users.

**NOTE**: This tutorial assumes that you have already completed the [rules tutorial](${ruleslink}) and that you know how to implement a basic rule in your app.

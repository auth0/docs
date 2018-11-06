With the email connection, the user is requested to enter their email address. Auth0 then sends an email to that address containing a one-time code.

Once the user enters this code into your application, a new user will be created in the `email` connection. The user is then authenticated by Auth0.

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the email address matches an existing user, Auth0 just authenticates the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

<% if (isMobile) { %>
On mobile platforms, your application will receive an ID Token, the user profile and, optionally, a Refresh Token.
<% } %>

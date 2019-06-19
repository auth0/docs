With an email connection, the user is asked to enter their email address, to which Auth0 sends a one-time code. The user then enters the code into your application.

If the email address attached to the code matches an existing user, Auth0 authenticates the user:

![Existing User Flow](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

If the user is new, their user profile is created for the `email` connection before they are authenticated by Auth0.

![New User Flow](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

<% if (isMobile) { %>
On mobile platforms, your app will receive an ID Token, the user profile, and optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>.
<% } %>

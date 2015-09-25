With the e-mail connection users are requested to enter their e-mail address after which Auth0 will send an email to the user containing the one time code. 

After entering the code in your application, the user will be created in the `email` connection and then authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

<% if (isMobile) { %> 
On mobile platforms this means your application will receive an `id_token`, the user profile and optionally also a `refresh_token`.
<% } %>
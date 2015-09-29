With the SMS connection, the user is requested to enter a phone number. Auth0 then uses [Twilio](http://www.twilio.com) to send a one time code to that number.

Once the user enters this code into your application, a new user will be created in the `sms` connection. The user is then authenticated by Auth0.

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the phone number matches an existing user, Auth0 just authenticates the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

<% if (isMobile) { %> 
On mobile platforms, your application will receive an `id_token`, the user profile and, optionally, a `refresh_token`.
<% } %>
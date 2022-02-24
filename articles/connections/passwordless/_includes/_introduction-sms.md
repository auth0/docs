With an SMS connection, the user is asked to enter a phone number. By default, Auth0 uses [Twilio](https://www.twilio.com) to send a one-time-use code to that phone number. (If you have a custom SMS gateway, you can [modify your connection to use that instead of Twilio](/connections/passwordless/use-sms-gateway-passwordless).)

The user then enters the code into your application. If you are using Universal Login, make sure you [configure Universal Login with Passwordless](/dashboard/guides/universal-login/configure-login-page-passwordless).

If the phone number attached to the code matches an existing user, Auth0 authenticates the user:

![Existing User Flow](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

If the user is new, their user profile is created for the `sms` connection before they are authenticated by Auth0.

![New User Flow](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

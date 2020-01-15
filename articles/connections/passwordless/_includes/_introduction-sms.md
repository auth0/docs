With an SMS connection, the user is asked to enter a phone number, to which Auth0 sends a one-time-use code using [Twilio](https://www.twilio.com). The user then enters the code into your application.

If the phone number attached to the code matches an existing user, Auth0 authenticates the user:

![Existing User Flow](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

If the user is new, their user profile is created for the `sms` connection before they are authenticated by Auth0.

![New User Flow](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

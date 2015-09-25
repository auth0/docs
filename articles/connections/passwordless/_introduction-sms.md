With the SMS connection users are requested to enter their phone number. After entering their phone number, Auth0 will use [Twilio](http://www.twilio.com) to send a one time code to the user. 

After entering the code in your application, the user will be created in the `sms` connection and then authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

<% if (isMobile) { %> 
On mobile platforms this means your application will receive an `id_token`, the user profile and optionally also a `refresh_token`.
<% } %>
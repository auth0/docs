When this code runs it will start by asking the users for their phone number:

![](/media/articles/connections/passwordless/passwordless-sms-request-<%= platform %>.png)

Then Auth0 will use Twilio to send an SMS to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-sms-receive-code-<%= platform %>.png)

Finally the users can enter the one time password in the Lock and, if correct, they will be authenticated.
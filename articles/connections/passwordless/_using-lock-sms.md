When this code runs, it will ask the user for their phone number:

![](/media/articles/connections/passwordless/passwordless-sms-request-${platform}.png)

Then Auth0 will use Twilio to send to the user an SMS containing the one-time code:

![](/media/articles/connections/passwordless/passwordless-sms-receive-code-${platform}.png)

Lastly, the user enters the one-time password into Lock. Then, if the password is correct, the user is authenticated.

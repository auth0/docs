When this code runs it will start by asking the users for their email address:

![](/media/articles/connections/passwordless/passwordless-email-request-<%= platform %>.png)

Then Auth0 will send an email to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code-<%= platform %>.png)

Finally the users can enter the one time password in the Lock and, if correct, the user will be authenticated.
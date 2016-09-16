# User Guide: Passwordless

If you are using an app that allows for **Passwordless** authentication, you can register using either your **email address** or your **mobile phone number** instead of a login/password combination. Depending on which piece of information you provide, you will then access the app using a link that has been emailed to you or by providing a code that has been emailed or sent to you via SMS.

* [Register and Authenticate Using Email](#register-and-authenticate-using-email)
* [Register and Authenticate Using SMS](#register-and-authenticate-using-sms)
* [Troubleshooting](#troubleshooting)

## Register and Authenticate Using Email

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

If you provide your **email address**, you will receive an email containing either:

* a link you click on to authenticate yourself, or;
* a code you provide to the app to authenticate yourself.

### Authentication Using a Magic Link Received via Email

You may opt to register and authenticate yourself using a magic link sent via email. Upon receipt, you will need to click on the link to access the app.

![](/media/articles/connections/passwordless/passwordless-email-receive-link.png)

### Authentication Using a One-time Use Code Received via Email

You may opt to register and authenticate yourself using a one-time use code that you receive via email.

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Once received, you can return to the app to enter the code and authenticate yourself.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

## Register and Authenticate Using SMS

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

If you provide your **mobile phone number**, you will receive a code that you will provide to the app to validate yourself.

![](/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png)

The code can then be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

## Troubleshooting

The following section contains troubleshooting information that might be useful to you.

### Can I share my password with others?

No, because Passwordless authentication removes the need for and use of passwords.

### How long is the one-time use code/link valid?

The amount of time the one-time use authentication code/link is valid can be set and changed by your app's administrator. It is unlikely, however, that the code/link is valid for a very long period of time, so you should use it as soon as possible.

### What if I am using multiple devices?

If you've requested your authentication links or codes via email, you can use any device that is capable of accessing that email account. You simply need to log in to your email account to get the required information and then provide the information when attempting to access the app.

If the device you're using doesn't have access to the required email account, you can forward the email to an account accessible using that device.

If you are requesting an authentication code via SMS message, you can use any device that will receive messages sent to the phone number associated with your account. Once you have that information, you will be able to provide the code to gain access to the application.

### What happens if I don't receive the authentication emails/SMS messages I requested?

If you do not receive your requested email or SMS message, please do not request a new one. Instead, check the following:

#### Email

* Did the email get filed into your junk/spam folder?
* Has there been some type of server delay preventing you from receiving your email?

### SMS Message

* Do you have the connectivity to receive messages?

### What happens if I request and receive multiple authentication emails and/or SMS messages?

If you accidentally request more than one email or SMS message containing magic links or authentication codes, the last **five** codes will be valid. Once you successfully log in using any of the codes/links, **all** of the existing codes/links will be invalidated.

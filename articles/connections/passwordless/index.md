---
title: Using Passwordless SMS & Email Authentication with Auth0
connection: SMS & Email
url: /connections/passwordless
image:
alias:
  - sms
  - email
---

# Passwordless Connections

These connections allow users to login without credentials. They work by using a different channel of authentication like an SMS message or an e-mail.

Using these connections requires two steps:

* First the app must create a __user__ in Auth0, registering the artifact used to authenticate them (e.g. a `phone_number` or an `email`). A one-time code will be sent to them and used in the second step.

* Second, the app will validate the __code__ with Auth0, using either `email` or `phone_number` as the _username_ and the _code_ entered by the user.

Auth0 ships with the following channels today:

## Passwordless with SMS and Twilio

This __Passwordless connection__ uses SMS (sent via [Twilio](http://www.twilio.com)) as the authentication mechanism.

### Setup

####1. Get an account with Twilio

You will need the [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the credentials for the Twilio API that Auth0 will use to send the SMS to the user.

####2. Configure the Connection on the Dashboard

Enter the __Twilio Account SID__ and __Auth Token__.
Enter the __From__ phone number your users will receive the SMS (also configurable in Twilio) and finally a __message__. Notice you can enter the placeholder `password` that refers to the one-time password.

![](/media/articles/connections/passwordless/index/Cz-QfQvjm6.png)

### How to use it

The first step is to __register a user__ using the Auth0 `Users` API:

```
POST https://@@account.namespace@@/api/users/
Authorization: Bearer {Auth0 API Token}
Content-Type: 'application/json'

{
  "connection":     "sms",
  "email_verified": false,
  "phone_number":   "+14251112222"
}
```

> Use [this endpoint](/api/v1#authentication) to obtain the __{Auth0 API Token}__.

The key parameters are `connection` (that must be __sms__ for this connection) and the `phone_number`.

Auth0 will send the SMS message configured on the dashboard to the `phone-number` specified, including the one-time-password (with 10 minutes expiration).

Your application will capture the one-time-password and validate it with Auth0 using the __[Resource Owner](/auth-api#!#post--oauth-ro)__ authentication endpoint:

```
POST https://@@account.namespace@@/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "@@account.clientId@@",
  "username":    "+14251112222",
  "password":    "ONE-TIME-CODE",
  "connection":  "sms",
  "grant_type":  "password",
  "scope":       "openid" //or "openid profile"
}
```

A successful authentication will result in a JWT sent back in the response:

```
{
  "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3lvdXJuYW1lc3BhY2UuYXV0aDAuY29tLyIsInN1YiI6InNtc3w1NDRiZWJiODg3NjIzNDQ1NjcxZjVmN2ExIiwiYXVkIjoiaWNJTVBNamRmaGl1NDNuZWtqZjNqcjRlbmZpT2t5TkZ4dSIsImV4cCI6MTQxNDgxOTUyOSwiaWF0IjoxNDE0NzgzNTI5fQ.y4sIFl82DHFzli3GgT8Q2voZSADVQbcwpOx-DoAwmK4",
  "access_token": "eJ0ck9754nf46f9",
  "token_type": "bearer"
}
```

The actual contents of the `id_token` will depend on the `scope` and on any [rules](/rules) you might have defined.

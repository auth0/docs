# Passwordless Connections

These connections allow users to login without credentials. They work by using a different channel of authentication like an SMS message or an e-mail.

Applications that want to use these connections interact with Auth0 in two steps:

* First the must create a __"user"__ in Auth0, registering the artifact used to authenticate them (e.g. a `phone_number` or an `email`). A one-time code will be sent to them. 

* Later, the app validates the code with Auth0, using either `email` or `phone_number` as the _username_.

Auth0 ships with the following channels today:

## Passwordless with SMS and Twilio

This __Passwordless connection__ uses SMS (sent via [Twilio](www.twilio.com)) as the authentication mechanism.

###Setup

First you must get an account with Twilio. Once you get an account you enter `[Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid)` and a `[Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-it-be-reset)`. 

Enter the `from` phone number your users will receive the SMS (also configurable in Twilio) and finally a message. Notice you can enter the placeholder `@@password@@` that refers to the one time password.

![](https://cldup.com/Cz-QfQvjm6.png)

###How to use it

The first step is to __register a user__ using the Auth0 `Users` API:

```
POST https://@@account.namespace@@/api/users/
Authorization: Bearer {API Auth Token}
Content-Type: 'application/json'

{
	"email":          "",
	"password":       "",
	"connection":     "sms",
	"email_verified": false,
	"phone_number": "+14251112222"
}
``` 

> The {API Auth Token} used to authenticate this request is the __API Token__. See [this endpoint](https://docs.auth0.com/api#authentication) to obtain it.

The important parameters are `connection` (that must be __sms__) and the `phone_number`.

Auth0 will send the message configured on the dashboard to the `phone-number` specified, including the one-time-password.

Your application will capture the one-time-password and validate with Auth0 using the __[Resource Owner](https://docs.auth0.com/auth-api#!#post--oauth-ro)__ authentication endpoint:

```
POST https://@@@@/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "@@account.clientId@@",
  "username":    "+14251112222",
  "password":    "THE ONE TIME CODE",
  "connection":  "sms",
  "grant_type":  "password",
  "scope":       "openid", //or "openid profile"
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

The actual contents of the `id_token` will depend on the `scope` and on any [rules](rules) you might have defined.



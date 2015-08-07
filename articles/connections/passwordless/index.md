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

Passwordless connections allow users to login without the need of a password. These connections work by using an authentication channel like SMS messages or emails.

Passwordless authentication requires two steps:

1. Your app creates a **user** in Auth0 by registering an artifact (e.g. `phone_number` or `email`) provided by the user. A one-time **code** is then sent to the user by Auth0.

2. Your app validates the **code** entered by the user with Auth0, using the `phone_number` or `email` as the **username**.

## Passwordless with SMS and Twilio

This __Passwordless connection__ uses SMS (sent via [Twilio](http://www.twilio.com)) as the authentication mechanism. This type of connection is particulary useful for native mobile applications.

### Setup

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

Passwordless connections can be configured in the Auth0 dashboard, under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless).

On the **SMS (Twilio)** page on Auth0, enter your **Twilio Account SID** and **Auth Token**. Enter the **From** phone number users will see as the sender of the SMS (also configurable in Twilio) and a **message**.

The `@@password@@` placeholder in the message template will be replaced with the one-time password that is sent in a text message to the user.

### Implementation

To implement passwordless login, code your app to follow these steps:

1. Register the user using the [Auth0 serverside API](https://auth0.com/docs/api/v2#!/Users/post_users):

  ```js
  POST https://${account.namespace}/api/v2/users/
  Authorization: Bearer {Auth0 APIv2 Token}
  Content-Type: 'application/json'

  {
    "connection":     "sms",
    "email_verified": false,
    "phone_number":   "+14251112222"
  }
  ```
Go to Connections -> Passwordless -> Enable Twilio SMS. Click in Twilio SMS. Notice that the connection name is __sms__.
Enter the __Twilio Account SID__ and __Auth Token__.
Enter the __From__ phone number your users will receive the SMS (also configurable in Twilio) and finally a __message__. Notice you can enter the placeholder `password` that refers to the one-time password.

![](/media/articles/connections/passwordless/index/Cz-QfQvjm7.png)

### How to use it with Auth0 APIs:
#### First step: __registering a user__

```
POST https://@@account.namespace@@/api/v2/users/
Authorization: Bearer {Auth0 API Token}
Content-Type: 'application/json'

  An APIv2 token can be generated with the [APIv2 explorer](https://auth0.com/docs/api/v2). The token must include the `create:users` scope.

2. Auth0 sends the SMS message you configured in the Auth0 dashboard to the specified phone number, including a one-time password that expires in 10 minutes.

3. Capture the one-time password submitted by the user and validate it with Auth0 using the [Resource Owner](/auth-api#!#post--oauth-ro) authentication endpoint:

  ```js
  POST https://${account.namespace}/oauth/ro
  Content-Type: 'application/json'

  {
    "client_id":   "${account.clientId}",
    "username":    "+14251112222",
    "password":    "ONE-TIME-CODE",
    "connection":  "sms",
    "grant_type":  "password",
    "scope":       "openid" //or "openid profile"
  }
  ```
#### Second Step: Verifying the one-time-password
Your application needs to capture the one-time-password and validate it with Auth0 using the __[Resource Owner](/auth-api#!#post--oauth-ro)__ authentication endpoint:

4. A successful authentication will result in a JWT sent in the response:

  ```JSON
  {
    "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3lvdXJuYW1lc3BhY2UuYXV0aDAuY29tLyIsInN1YiI6InNtc3w1NDRiZWJiODg3NjIzNDQ1NjcxZjVmN2ExIiwiYXVkIjoiaWNJTVBNamRmaGl1NDNuZWtqZjNqcjRlbmZpT2t5TkZ4dSIsImV4cCI6MTQxNDgxOTUyOSwiaWF0IjoxNDE0NzgzNTI5fQ.y4sIFl82DHFzli3GgT8Q2voZSADVQbcwpOx-DoAwmK4",
    "access_token": "eJ0ck9754nf46f9",
    "token_type": "Bearer"
  }
  ```

### Additional Information

* [Using the `scope` parameter to control which claims are returned in the token](/scopes)

### How to use it with Auth0.js (The JavaScript SDK)
#### First step: __registering a user__
You can use our client side javascript SDK [Auth0.js](https://github.com/auth0/auth0.js#with-sms) which has a convenient method named `startPasswordless`:

```
auth0.startPasswordless({
    phoneNumber: $('.phone-input').val()
}, function (err, result) {
    if (err) return alert("something went wrong: " + err.message);
    console.log(result);
});
```

The actual contents of the `id_token` will depend on the `scope` and on any [rules](/rules) you might have defined.

#### Second Step: Verifying the one-time-password
To verify the one-time-password you have to login the user using the method named `login`:

```
auth0.login({
    username: $('.phone-input').val(),
    password: $('.sms-code-input').val(),
    connection: 'sms'
}, function (err, profile, id_token, access_token, state, refresh_token) {
    if (err) return alert("something went wrong: " + err.message);
    console.log(profile, id_token, access_token, state, refresh_token);
});
```
### How to use it with Lock
TBD

## Passwordless with email

This __Passwordless connection__ uses a link sent by email as the authentication mechanism. This type of connection is particulary useful for a web based application. The user enter his email address, he receives and email with a link. The user clicks on the link and he is automatically logged in to the application.

### Setup

#### Configure the Connection on the Dashboard

Go to Connections -> Passwordless -> email. Click in email connection. Notice that the connection name is __email__.
Enter the __From__, the __Subject__ and the __body__ of the mail.

(insert screenshot)

### How to use it with Auth0 APIs:
You can use our client side javascript SDK [Auth0.js](https://github.com/auth0/auth0.js#with-email) which has a convenient method named `startPasswordless`:

```
POST https://@@account.namespace@@/api/v2/users/
Authorization: Bearer {Auth0 API Token}
Content-Type: 'application/json'

{
  "client_id":  "{AUTH0_CLIENT_ID}",  // mandatory
  "connection": "email",              // mandatory
  "email":      "{USER_EMAIL}",       // mandatory
  "send":       "code"                // optional (used as a decision parameter in conn.options.email.*)
}
```
> You can also send other user attributes (`name`, `picture`, `nickname` and `username`)

> Use [this endpoint](/api/v1#authentication) to obtain the __{Auth0 API Token}__.

Auth0 will send a magic link in the email (according to the email template configured in the connection). This link has a 10 minutes expiration policy. The link has the following format:

```
https://@@account.namespace@@/authorize?
  &email={USER_EMAIL}
  &verification_code={USER_VERIFICATION_CODE}
  &connection=email
  &client_id={AUTH0_CLIENT_ID}
  &scope=openid%20profile
  &redirect_uri=https://contoso.com
```

### How to use it with Auth0.js (The JavaScript SDK)
You can use our client side javascript SDK [Auth0.js](https://github.com/auth0/auth0.js#with-sms) which has a convenient method named `startPasswordless`:

```
auth0.startPasswordless({
  email: $('.email-input').val()
}, function (err, result) {
    if (err) return alert("something went wrong: " + err.message);
    console.log(result);
});
```
If the request was successful you should receive an email with the link at the specified address

### How to use it with Lock
TBD

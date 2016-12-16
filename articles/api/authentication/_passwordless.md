# Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time code sent through email or SMS, every time the user logs in.

## Get Code or Link

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start?
  client_id=${account.clientId}&
  connection=email|sms&
  email=EMAIL&
  phone_number=PHONE_NUMBER&
  send=link|code&
  authParams=PARAMS
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/passwordless/start' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "connection":"email|sms", "email":"", "phone_number":"", "send":"link|code", "authParams":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'token'
  });
</script>

//EMAIL: request a link to be sent via email
$('.request-email-link').click(function (ev) {
  ev.preventDefault();
  auth0.requestMagicLink({
    email: $('.email-input').val()
  }, function (err) {
    if (err) {
      alert(err.error_description);
      return;
    }
    // the request was successful and you should receive
    // an email with the link at the specified address
  });
});

//EMAIL: request a code to be sent via email
$('.request-email-code').click(function (ev) {
  ev.preventDefault();

  auth0.requestEmailCode({
    email: $('.email-input').val()
  }, function (err) {
    if (err) {
      alert(err.error_description);
      return;
    }
    // the request was successful and you should receive
    // an email with the code at the specified address
  });
});

//SMS: request a code to be sent via SMS
$('.request-sms-code').click(function (ev) {
  ev.preventDefault();

  auth0.requestSMSCode({
    phoneNumber: $('.phone-input').val()
  }, function (err) {
    if (err) {
      alert(err.error_description);
      return;
    }
    // the request was successful and you should receive
    // a SMS with the code at the specified phone number
  });
});
```

> RESPONSE SAMPLE:

```JSON
//for connection=email
{
  "_id": "5845818fe...",
  "email": "test.account@passwordless.com",
  "email_verified": false
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/passwordless/start",
  "link": "#get-code-or-link"
}) %>

You have three options for [passwordless authentication](/connections/passwordless):
- Send a verification code using email.
- Send a link using email.
- Send a verification code using SMS.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your app. |
| `connection`     | `email` or `sms` |
| `email`          | The user's email address. Applicable when `connection=email`. |
| `phone_number`   | The user's phone number. Applicable when `connection=sms`. |
| `send`           | `link` (default) to send a link or `code` to send a verification code |
| `authParams`     | |


### Remarks

- When you are sending a link using email, you can append or override the link parameters (like `scope`, `redirect_uri`, `protocol`, `response_type`, etc.) using the `authParams` object.
- If you sent a verification code, using either email or SMS, after you get the code, you have to authenticate the user using the [/oauth/ro endpoint](#authenticate-user), using `email` or `phone_number` as the `username`, and the verification code as the `password`.


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /passwordless/start](#post-passwordless-start).


### More Information

- [Passwordless Authentication](/connections/passwordless)
- [Authenticate users with using Passwordless Authentication via Email](/connections/passwordless/email)
- [Authenticate users with a one-time code via SMS](/connections/passwordless/sms)
- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)
- [Passwordless FAQ](/connections/passwordless/faq)


## Authenticate User

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro?
  client_id=${account.clientId}&
  connection=email|sms&
  grant_type=password&
  username=EMAIL_OR_PHONE&
  password=VERIFICATION_CODE&
  scope=YOUR_SCOPE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "connection":"email or sms", "grant_type":"password", "username":"", "password":"", "scope":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'token'
  });
</script>

//EMAIL: authenticate the user when you get the code, using email and code
auth0.verifyEmailCode({
  email: $('.email-input').val(),
  code: $('.email-code-input').val()
}, function (err, result) {
  if (err) {
    alert("something went wrong: " + err.error_description);
    return;
  }
  alert('Hello');
});

//SMS: authenticate the user when you get the code, using phoneNumber and code
auth0.verifySMSCode({
  phoneNumber: $('.phone-input').val(),
  code: $('.sms-code-input').val()
}, function (err, result) {
  if (err) {
    alert("something went wrong: " + err.error_description);
    return;
  }
  alert("Hello");
});
```

> RESPONSE SAMPLE:

```json
{
  "id_token": "eyJ0eXA...",
  "access_token": "5CB7...",
  "token_type": "bearer"
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#authenticate-user"
}) %>

::: panel-warning Deprecation Notice
This endpoint will be deprecated. Customers will be notified and given ample time to migrate once an official deprecation notice is posted. The [POST /oauth/token { grant_type: password }](#resource-owner-password) should be used instead.
:::

Once you have a verification code, use this endpoint to login the user with their phone number/email and verification code. This is active authentication, so the user must enter the code in your app.


### Query Parameters

| Parameter        |Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your client. |
| `connection`     | `sms` or `email` |
| `grant_type`     | `password` |
| `username`      | The user's phone number if `connection=sms`, or the user's email if `connection=email`. |
| `password`      | The user's verification code.  |
| `scope`          | `openid or openid profile email` |


### Remarks

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.
- The `email` scope value requests access to the `email` and `email_verified` Claims.


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).


### More Information
- [Passwordless Authentication](/connections/passwordless)
- [Authenticate users with using Passwordless Authentication via Email](/connections/passwordless/email)
- [Authenticate users with a one-time code via SMS](/connections/passwordless/sms)
- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)
- [Passwordless FAQ](/connections/passwordless/faq)

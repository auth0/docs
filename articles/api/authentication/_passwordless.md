# Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time code sent through email or SMS, every time the user logs in.

## Get Code or Link

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "connection": "email|sms",
  "email": "EMAIL", //set for connection=email
  "phone_number": "PHONE_NUMBER", //set for connection=sms
  "send": "link|code", //if left null defaults to link
  "authParams": { // any authentication parameters that you would like to add
    "scope": "openid",
    "state": "YOUR_STATE"
  }
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/passwordless/start' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "connection":"email|sms", "email":"EMAIL", "phone_number":"PHONE_NUMBER", "send":"link|code", "authParams":{"scope": "openid","state": "YOUR_STATE"}}'
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


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `connection` <br/><span class="label label-danger">Required</span> | How to send the code/link to the user. Use `email` to send the code/link using email, or `sms` to use SMS. |
| `email` | Set this to the user's email address, when `connection=email`. |
| `phone_number` | Set this to the user's phone number, when `connection=sms`. |
| `send` | Use `link` to send a link or `code` to send a verification code. If null, a link will be sent. |
| `authParams` | Use this to append or override the link parameters (like `scope`, `redirect_uri`, `protocol`, `response_type`), when you send a link using email. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Remarks

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
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "connection": "email|sms",
  "grant_type": "password",
  "username": "EMAIL|PHONE", //email or phone number
  "password": "VERIFICATION_CODE", //the verification code
  "scope": "SCOPE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "connection":"email|sms", "grant_type":"password", "username":"EMAIL|PHONE", "password":"VERIFICATION_CODE", "scope":"SCOPE"}'
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

Once you have a verification code, use this endpoint to login the user with their phone number/email and verification code. This is active authentication, so the user must enter the code in your app.


### Request Parameters

| Parameter        |Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `connection` <br/><span class="label label-danger">Required</span> | Use `sms` or `email` (should be the same as [POST /passwordless/start](#get-code-or-link)) |
| `grant_type` <br/><span class="label label-danger">Required</span> | Use `password` |
| `username` <br/><span class="label label-danger">Required</span> | The user's phone number if `connection=sms`, or the user's email if `connection=email`. |
| `password` <br/><span class="label label-danger">Required</span> | The user's verification code.  |
| `scope` | Use `openid` to get an `id_token`, or `openid profile email` to include also user profile information in the `id_token`. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Client** (select the client you want to use for the test) and **Connection** (use `sms` or `email`).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set **Username** to the user's phone number if `connection=sms`, or the user's email if `connection=email`, and **Password** to the user's verification code. Click **Resource Owner Endpoint**.


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

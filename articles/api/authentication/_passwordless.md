<!-- markdownlint-disable MD024 MD033 -->

# Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time code sent through email or SMS, every time the user logs in.

## Get Code or Link

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start
Content-Type: application/json
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
// Script uses auth0.js v8. See Remarks for details.
<script src="${auth0js_urlv8}"></script>
<script type="text/javascript">
  // Initialize client
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Send a verification code using email
  webAuth.passwordlessStart({
      connection: 'email',
      send: 'code',
      email: 'USER_EMAIL'
    }, function (err,res) {
      // handle errors or continue
    }
  );

  // Send a link using email
  webAuth.passwordlessStart({
      connection: 'email',
      send: 'link',
      email: 'USER_EMAIL'
    }, function (err,res) {
      // handle errors or continue
    }
  );

  // Send a verification code using SMS
  webAuth.passwordlessStart({
      connection: 'sms',
      send: 'code',
      phoneNumber: 'USER_PHONE_NUMBER'
    }, function (err,res) {
      // handle errors or continue
    }
  );
</script>
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
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
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

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
Content-Type: application/json
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
// Script uses auth0.js v8. See Remarks for details.
<script src="${auth0js_urlv8}"></script>
<script type="text/javascript">
  // Initialize client
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Verify code sent via email
  webAuth.passwordlessVerify({
      connection: 'email',
      email: 'USER_EMAIL',
      verificationCode: 'VERIFICATION_CODE_SENT'
    }, function (err,res) {
      // handle errors or continue
    }
  );

  // Verify code sent within link using email
  webAuth.passwordlessVerify({
      connection: 'email',
      email: 'USER_EMAIL',
      verificationCode: 'VERIFICATION_CODE_SENT_WITHIN_LINK'
    }, function (err,res) {
      // handle errors or continue
    }
  );

  // Verify code sent via SMS
  webAuth.passwordlessVerify({
      connection: 'sms',
      phoneNumber: 'USER_PHONE_NUMBER',
      verificationCode: 'VERIFICATION_CODE_SENT'
    }, function (err,res) {
      // handle errors or continue
    }
  );
</script>
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#authenticate-user"
}) %>

::: warning
This feature is disabled by default for new tenants as of 8 June 2017. Please see [Client Grant Types](/clients/client-grant-types) for more information.
:::

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
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).

### More Information

- [Passwordless Authentication](/connections/passwordless)
- [Authenticate users with using Passwordless Authentication via Email](/connections/passwordless/email)
- [Authenticate users with a one-time code via SMS](/connections/passwordless/sms)
- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)
- [Passwordless FAQ](/connections/passwordless/faq)

---
description: Describes how to customize the signup process for an invite-only application with Auth0.
toc: true
crews: crew-2
topics:
  - design
contentType: how-to
useCase: invite-only
---
# Implement Invite-Only Applications

User invites are typically used when users do not self-provision (signup) for access to an application. Instead, an administrator creates the user and then invites the user to complete the signup process by creating a password for their account. 

You can invite users to access your applications using Change Password tickets in Auth0. The authorization flow consists of the following steps:

1. User receives an email inviting them to register.
2. User follows a link to the **Set Up Password** page. 
3. User creates and verifies a password.
4. User signs in.
5. User has access to the target application.

A user invitation is not always a transactional email and therefore is not an email Auth0 generates for you. Instead, you can create a link via API to construct the invitation email to be sent with your existing email service provider.

## Prerequisites

* Create a [Auth0 database](/connections/database) user with the `user.email_verified` parameter set to `false`
* [External email service](/email/providers)
* [Management API access token](/api/management/v2/tokens)

## Generate invitations

You can allow a user to access an existing account that you have created on their behalf. Then, send the user a unique link to set their password. You generate the unique link by creating a Password Change ticket by having your invitation app call the /api/v2/tickets/password-change Management API endpoint. 

### Create Password Change tickets

1. Specify the user using `user_id`, `email` or `connection_id`.
2. Specify where the user will be redirected. The `result_url` parameter is the location the user will be redirected to once they have set their password. In this case, this should be back to the target app login page. See [Redirect Users to other URLs](/users/guides/redirect-users-after-login#redirect-users-to-other-urls) for details.
3. Specify the lifespan of the invitation link. Use the `ttl_sec` parameter to set how long the invitation link will remain active. This should align with your relevant security concerns. The link is one time use, so once the user has set their password, it is not vulnerable to reuse.
4. Verify the email address. As long as this invitation is being sent to the email registered to the account, you should set the email as `verified` once the user has set their password. Use the `mark_email_as_verified` parameter as `true`. If this invitation is sent to anywhere other than the user's registered email address, you **should not** set the email verification to `true`. A successful request to this endpont will result in a ticket URL to be returned. The URL will then be used to create the user invitation.

### Add query parameters to the ticket URL

The query parameters are used to customize the password reset UI. The returned URL will have the unique code value that allows the user to set their password followed by a `#`. For the link to work, you do not want to edit anything before the hash. 

1. Add hash parameters to the generated password ticket URL. 
2. Add a parameter to identify that the UI should represent a set password workflow rather than a change password workflow. 
3. Add a parameter to identify the target app in the case that invites might be sent for more than one app. 

### Construct email templates

The email invitation needs to be sent with your existing email service provider. The language in the email should align with your use case. Include the link generated from the steps above. The text in the email should explain:
* The next steps to claiming the user account.
* The expiration of the link.
* Steps to generate a new invite if it has expired.

```js
{% if user.email_verified == false %}
            <h1>Invitation to our awesome app</h1>

            <p>Please verify your email address and set your initial password by clicking the following link:</p>

            <p><a href="{{ url }}">Confirm my account</a></p>

  {% else %}

            <h1>Password Change Request</h1>

            <p>You have submitted a password change request. </p>

            <p>If it wasn't you please disregard this email and make sure you can still login to your account. If it was you, then to <strong>confirm the password change <a href="{{ url }}">click here</a></strong>.</p>

    {% endif %}

            <p>If you have any issues with your account, please don’t hesitate to contact us at 1-888-AWESOMECO.</p>

            <br>
            Thanks!
            <br>
```

```js
function (user, context, callback) {
  const request = require('request');
  const userApiUrl = auth0.baseUrl + '/users/';

  // This rule is only for Auth0 databases
  if (context.connectionStrategy !== 'auth0') {
    return callback(null, user, context);
  }

  if (user.email_verified || !user.last_password_reset) {
    return callback(null, user, context);
  }

  // Set email verified if a user has already updated his/her password
  request.patch({
    url: userApiUrl + user.user_id,
    headers: {
      Authorization: 'Bearer ' + auth0.accessToken
    },
    json: { email_verified: true },
    timeout: 5000
  },
  function(err, response, body) {
    // Setting email verified isn't propagated to id_token in this
    // authentication cycle so explicitly set it to true given no errors.
    context.idToken.email_verified = (!err && response.statusCode === 200);

    // Return with success at this point.
    return callback(null, user, context);
  });
}
```

Next time you send them a password reset email, it will use the "existing user" version of the template. The invitation email password reset link has a configuration TTL which defaults to 5 days, so if they don't accept the invite, it will eventually timeout and they can request another invitation. 

## Customize the Password Reset UI

Once the user has recieved their invitation email, they are expected to set a password for their account. You can use the [Universal Login Password Reset](/universal-login/password-reset) page. You can copy changes to address the set password experience. See [Customize Password Reset Using Query Parameters](/universal-login/password-reset) for details.

## Complete the user experience

In most cases, once the user has set their password, you want to grant them access to the target app. The target app will need to initiate the login sequence with the following steps:

1. User submits password.
2. Change password screen redirects return URL.
3. Target app redirects to /authorize.
4. User submits their credentials.
5. User is authenticated into the app.

The workflow here involves a few redirects, but it is possible for the transition from the set password form to the login form to appear seamless to the end user.

The `return_url` provided when you created the Password Change ticket is where the user will be redirected to after creating their password.  In this case we want the URL to be on the site the user has been invited to so that it can initiate the login workflow.

Your target app will need to parse the `success` parameter to confirm no errors occurred then immediately initiate the redirect back to Auth0 to log the user in.

To optimized the user experience, the target app can also parse the `email` parameter and include it to the authentication request as the `login_hint` parameter to prefill the user's email in the login form.
# Take control of the complete Email flow

The default email flow in Auth0 can address the requirements of most applications, but there might still be cases where you might need more flexibility:

 - Localization
 - Calculated **Redirect To** url based on user/tenant/...
 - Different email templates per application/tenant/...

Our extensiblity points, together with our API allow you to completely take over the email flow and control when and how emails are being sent out.

To get started you will need to disable the Emails [in the dashboard](${uiURL}/#/emails) after which you will be able to implement the different email flows in your own environment.

## Verification Email

The verification email should be sent to every user for which the `email_verified` property is `false`. These are typically users in database connections and users authenticating with Social Providers that don't validate email addresses when users register for a new account.

Using a [Rule](/rules) you can call out to one of your APIs when the user logs in for the first time with an email address which hasn't been verified.

```
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.email_verified || user.app_metadata.verification_email_sent) {
    return callback(null, user, context);
  }

  request.post({
    url: 'https://api.mycompany.com/mails/verification',
    json: {
      user: user,
      context: context,
      secretToken: ";ojhsajk;h;Kh:Jh",
    },
    timeout: 5000
  }, function(err, response, body){
    if (err)
      return callback(new Error(err));

    // Email sent flag persisted in the user's profile.
    user.app_metadata.verification_email_sent = true;
    auth0.users.updateUserMetadata(user.user_id, user.app_metadata)
      .then(function() {
        callback(null, user, context);
      })
      .catch(function(err) {
        callback(err);
      });
    return callback(null, user, context);
  });
}
```

After calling the API you'll [add a flag to the user's profile](https://auth0.com/docs/rules/metadata-in-rules) which specifies that the verification email has already been sent to make sure the email is only sent once.

Since the email will be sent by your own API you now have complete control over the verification email. The only thing you need to keep in mind is that the users still need to click the verification link to verify their email address.

The Auth0 API exposes [the verification endpoint](https://auth0.com/docs/api/v2#!/Tickets/post_email_verification) which makes it possible to generate the email verification link for a specific user. The endpoint also allows you to specify the `resultUrl` which is the URL to which your users will be sent after they validated their email address.

It's also possible to use the Auth0 API to [send verification emails directly](https://auth0.com/docs/api/v2#!/Jobs/post_verification_email), but this will always redirect users to the same URL after clicking on the verification link.
This URL is configurable [in the dashboard](${uiURL}/#/emails).

As a result you now also have complete control over the URL the users will be redirected to after validation. This can be useful when users need to be redirected to specific pages based on their account, on their subscription, on the tenant, ...

## Welcome Email

The welcome email is an email we'll want to send to users with a verified email address and this can also be implemented using a rule.

```
function (user, context, callback) {
  if (!user.email_verified || user.welcome_email_sent) {
    return callback(null, user, context);
  }

  request.post({
    url: 'http://requestb.in/17ef4bb1',
    json: {
      user: user,
      context: context,
      secretToken: ";ojhsajk;h;Kh:Jh",
    },
    timeout: 5000
  }, function(err, response, body){
    if (err)
      return callback(new Error(err));

    // Email sent flag persisted in the user's profile.
    user.persistent.welcome_email_sent = true;
    return callback(null, user, context);
  });
}
```

The rule only runs if the email is verified and if the email hasn't been sent before, to make sure it only runs once.

Since the email will be sent by your own API you now have complete control over the verification email.

## Change Password Confirmation Email

The Change Password functionality does not expose any extensiblity points that allow you to write custom code when users change their password. This means you'll just need to write some code after users changed their password.

To handle this flow you'll need to host a "Change Password" form which captures the new password of the user and posts it to the [change password ticket endpoint](/api/v1#!#post--api-users--user_id--change_password_ticket). When calling this endpoint the password is not updated, but a "change password confirmation" link is generated.

You can now send an email to your users with this link and only when users click this link will their password be updated.

## Other Topics

- [Emails in Auth0](/email)
- [Using your own SMTP provider (SendGrid/Amazon SES/Mandrill)](/email/providers)

---
description: The Auth0 APIs provide endpoints that allow you to completely manage email flow, and control when and how emails are sent.
---

# Custom Email Handling

The default email flow in Auth0 can address the requirements of most applications, but there may be instances where more flexibility is required. For example:

 * Localization
 * Custom **Redirect To** URLs based on the user or tenant
 * Different email templates per application or tenant

The Auth0 Management API provides endpoints that allow you to completely manage email flow, and control when and how emails are sent.

To begin, you will need to disable automatic emails by deselecting **Status** under the **Verification Email** and **Welcome Email** tabs on the [Email Templates](${manage_url}/#/emails) page of the Auth0 dashboard.

![](/media/articles/email/custom/email-custom.png)

## Verification Email

A verification email should be sent to every user for which the `email_verified` property is `false`. Typically, these are users in database connections or users authenticating with Social Providers that do not validate email addresses upon new user registration.

Using a [Rule](/rules), you can call your API when a user logs in for the first time with an email address that has not been verified. After calling your API, [add a flag](/rules/metadata-in-rules) to the user's profile metadata that indicates that the verification email has been sent:

```js
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

### Custom redirect

A custom redirect is useful when you want to direct users to certain URLs based on user attributes or on the tenant.

The Auth0 Management API provides a [post_verification_email](/api/v2#!/Tickets/post_email_verification) endpoint that generates the verification link for each user. This endpoint allows you to specify the `resultUrl` to which users will be redirected after they have validated their email address by clicking the link in the verification email.

::: panel-info Using the Verification Email endpoint
You could call the [post_verification_email](/api/v2#!/Jobs/post_verification_email) endpoint to send a verification email directly from Auth0, even when automatic emails are disabled. However, this endpoint will redirect all users to the same URL that is specified in the `Redirect To` field under the **Verification Email** tab on the [Email Templates](${manage_url}/#/emails) page of the Auth0 dashboard. Since you are already implementing your own email service, this endpoint may not provide all the functionality your app requires.
:::

## Welcome Email

A welcome email is sent to users once they have verified their email address. This can be implemented using a rule which sends the email only if the user's email address has been verified and the email has not been sent previously.

```js
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

## Change Password Confirmation Email

To handle password change requests, you will need to host a form to capture the user's new password and post it to the [change password ticket](/api/management/v2#!/Tickets/post_password_change) endpoint. Calling this endpoint will generate a **Change Password Confirmation** link. 

You can now send an email to the user containing this link. Only when the user clicks this link will their password be updated.

Alternatively, if you invoke the [change password ticket](/api/management/v2#!/Tickets/post_password_change) endpoint without specifying the `new_password` parameter, the link at the email will redirect the user to a page prompting to set a new password.

![](/media/articles/email/custom/change-password.png)

## Additional Information

 * [Emails in Auth0](/email)
 * [Customizing Your Emails](/email/templates)
 * [Using your own SMTP provider (SendGrid/Amazon SES/Mandrill)](/email/providers)

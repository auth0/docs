---
description: Send an enrollment email (Guardian)
---
## Sending a Guardian Enrollment Email to a User

With this, an administrator can send an email to a user with a link for registering their device with Guardian.

To send this email:

1. Find and select the user in the [Users](${manage_url}/#/users) section of the dashboard.
2. Click on the **Actions** button on the top right of the screen. 
3. Select **Send Enrollment Email (Guardian)** from the dropdown.

 ![](/media/articles/mfa/guardian-send-enrollment-email.png)

The user will receive an enrollment email at their registered email address.

 ![](/media/articles/mfa/enrollment-email.png)

Administrators can also [customize the email template](/email/templates) for the enrollment emails.

## Restricting user-initiated enrollments

Some organizations may want to only allow users to enroll a device with Guardian via an enrollment email, and prevent users from self-enrolling upon first sign in. This is possible using the _selfServiceEnrollment_ property on a Guardian rule. When set to true, or when the property is not set, the user may self-enroll. When set to false, the user may only enroll their device via an enrollment email.

To edit the rule, go to the **Multifactor Auth** section and edit appropriately.

```js
function (user, context, callback) {

  context.multifactor = {
    provider: 'guardian', 
    selfServiceEnrollment: false, 
  };

  callback(null, user, context);
}
```

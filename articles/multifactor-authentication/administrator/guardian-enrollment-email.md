---
description: Send enrollment email (Guardian)
---
## Sending a guardian enrollment email to a User.

This allows an administrator to send an email to a particular user with a link that leads to the guardian enrollment step. This step is when a user registers a device with Guardian MFA.  

To send this email:

1. Find and select the user in the [Users](${manage_url}/#/users) section of the dashboard.
2. Once you have selected the affected user, click on the **Actions** button on the top right of the screen. 
3. Select **Send Enrollment Email (Guardian)** from the dropdown.

 ![](/media/articles/mfa/guardian-send-enrollment-email.png)

That will send an email to the user registered email.

## Restrict enrollment

Sometime is useful to prevent the user been able to enroll a device the first time that he logs using lock. That's possible using the _selfServiceEnrollment_ property on Guardian rule. If this property is not found, default behavior is to let the user enroll.

To do edit the rule, go to _Rules_ on the menu, then look for `Multifactor-Guardian-Do-Not-Rename` rule, and click on the edit button.
This is how looks like the default rule with the property added `false`, to only allow enrollment from the _enrollment email_

```js
function (user, context, callback) {

  //var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
  // run only for the specified clients
  // if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'guardian', //required
        selfServiceEnrollment: false, 
        ignoreCookie: true, // optional. Force Auth0 MFA everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
      };
    // }
  //}

  callback(null, user, context);
}
```

---
description: Describes how to customize the signup process for an invite-only application with Auth0.
toc: true
crews: crew-2
topics:
  - design
contentType: how-to
useCase: invite-only
---
# User Invitation Applications

You can restrict users signups to an application. One way to do this is with user invitations as a provisioning workflow, either in conjunction with or as an alternative to self-provisioning. In this case, an administrator creates the user accounts then invites users to complete the signup process by creating passwords for those accounts. The user experience consists of the following steps:

1. User receives an email inviting them to register.
2. User follows a link to the **Set Up Password** page. 
3. User creates and verifies a password.
4. User signs in.
5. User has access to the target application.

A user invitation is basically a change password link repurposed as an invitation. There are two common approaches for this: 

* Send an Auth0 [change password email](/email/custom#change-password-confirmation-email) using a [customized email template](/email/templates)
* Create a password change ticket

## Generate invitations

You can allow a user to access an existing account that you have created on their behalf. Then, send the user a unique link to set their password. You generate the unique link by creating a Password Change ticket where your invitation app calls the /password-change Management API endpoint. You will need to: 

* Create an [Auth0 database](/connections/database) user with the `user.email_verified` parameter set to `false`
* Have access to an [external email service](/email/providers)
* Obtain a [Management API access token](/api/management/v2/tokens)

### Create Password Change tickets

1. Specify the user using `user_id` or `email` and `connection_id`.
2. Specify where the user will be redirected. The `result_url` parameter is the location the user will be redirected to once they have set their password. In this case, this should be back to the target app login page. See [Redirect Users to other URLs](/users/guides/redirect-users-after-login#redirect-users-to-other-urls) for details.
3. Specify the lifespan of the invitation link. Use the `ttl_sec` parameter to set how long the invitation link will remain active. This should align with your relevant security concerns. The link is one time use, so once the user has set their password, it is not vulnerable to reuse.
4. Verify the email address. As long as this invitation is being sent to the email registered to the account, you should set the email as `verified` once the user has set their password. Use the `mark_email_as_verified` parameter as `true`. If this invitation is sent to anywhere other than the user's registered email address, you **should not** set the email verification to `true`. A successful request to this endpoint will result in a ticket URL to be returned. The URL will then be used to create the user invitation.

### Add query parameters to the ticket URL

The query parameters are used to customize the password reset UI. The returned URL will have the unique code value that allows the user to set their password followed by a `#`. For the link to work, you do not want to edit anything before the hash. 

1. Add hash parameters to the generated password ticket URL. 
2. Add a parameter to identify that the UI should represent a set password workflow rather than a change password workflow. 
3. Add a parameter to identify the target app in the case that invites might be sent for more than one app. 

### Create an email template

The email invitation needs to be sent with your existing email service provider. The language in the email should align with your use case. Include the link generated from the steps above. The text in the email should explain:
* The next steps to claiming the user account.
* The expiration of the link.
* Steps to generate a new invite if it has expired.

## Customize the Password Reset UI

Once the user clicks the link in the invitation they will be brought to the [Universal Login Password Reset](/universal-login/password-reset) page. Here they will set a password for their account. Since this page is used both for the forgot password workflow and for your user invitations, you will want to use the query parameters you defined earlier to identify the invite workflow and customize the UI accordingly.

## Complete the user experience

In most cases, once the user has set their password, you grant them access to the target app. The target app initiates the login sequence with the following steps:

1. User submits password.
2. Change password screen redirects return URL.
3. Target app redirects to /authorize.
4. User submits their credentials.
5. User is authenticated into the app.

The workflow involves redirects but it is possible for the transition from the set password form to the login form to appear seamless to the end user.

The `return_url` you set when you created the Password Change ticket is where the user will be redirected after creating their password. In this case you want the URL to be on the site the user has been invited to so that it can initiate the login workflow. Your target app will need to parse the `success` parameter to confirm no errors occurred then immediately initiate the redirect back to Auth0 to log the user in.

To optimize the user experience, you can have the target app parse the `email` parameter and include it with the authentication request as the `login_hint` parameter. This will prefill the user's email in the login form.
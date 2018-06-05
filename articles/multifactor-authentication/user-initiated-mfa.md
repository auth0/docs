---
title: User-Initiated Multifactor Authentication (MFA)
description: How to set up user-initiated multifactor authentication
toc: true
tags:
    - mfa
---
# User-Initiated Multifactor Authentication

In this tutorial, we will show you how to implement and enable user-initiated multifactor authentication (MFA). We will cover how to:

* Enable MFA using Auth0's Management Dashboard
* Programmatically flag new users for MFA
* Set the users up to initiate MFA enrollment when logging in for the first time.

## Enable Multifactor Authentication

You can enable Multifactor Authentication (MFA) using the Dashboard.

Log in to your Auth0 account and navigate to the [**Multifactor Auth** page of the Management Dashboard](${manage_url}/#/guardian).

![](/media/articles/mfa/mfa-home.png)

You'll have the option to enable MFA that uses either **Push Notifications** or **SMS**. You can also use both. Click the slider(s) next to the option(s) you want enabled.

Once you've enabled one or more types of MFA, you'll see the **Customize MFA** section, which is a text editor that allows you to write the code to determine when MFA is necessary. The code runs as part of your [rules](/rules) whenever a user logs in.

![](/media/articles/mfa/mfa-template.png)

To help you get started, you'll see a template you can modify. Additional templates that implement various MFA features are available under **Templates**, which is located to the top right of the code editor.

As an example, the follow code snippet calls for MFA when:

* The application specified is used
* The user's `app_metadata` has a `use_mfa` flag set to `true`

Finally, if the two parameters above are met, MFA occurs every login.

```js
function (user, context, callback) {

    // run only for the specified applications
    var CLIENTS_WITH_MFA = ['REPLACE_WITH_YOUR_CLIENT_ID'];
    
    if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
        if (user.app_metadata && user.app_metadata.use_mfa){

            context.multifactor = {
                // required
                provider: 'guardian', 

                // set to false to force Guardian authentication every login
                allowRememberBrowser: false
            };
        }
    }

    callback(null, user, context);
}
```

## Flag New Users for MFA

In this step, we'll add functionality within the user creation/login process that flags users for MFA.

You'll need to [get an Access Token](/api/management/v2/tokens) to call the [Management API](/api/management/v2) during the user creation process. The only scope that you need to grant to the issued token is `update:users_app_metadata`.

Using this token, you can place a flag on app_metadata that indicates whether MFA is needed whenever that user logs in.  More specifically, you'll be programmatically setting their the user's `app_metadata` field with `use_mfa = true`.

You can do this by making the appropriate `PATCH` call to the [Update a User endpoint of the Management API](/api/management/v2#!/Users/patch_users_by_id). Note that the body of the call omits most of the extra details (such as email and phone number) you might need to include.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/users/USER_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"blocked\": false, \"email_verified\": false, \"email\": \"\", \"verify_email\": false, \"phone_number\": \"\", \"phone_verified\": false, \"verify_phone_number\": false, \"password\": \"\", \"verify_password\": false,\"user_metadata\": {},\"app_metadata\": { \"use_mfa\": true }, \"connection\": \"\", \"username\": \"\",\"client_id\": \"DaM8...rdyX\"}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Initiate Guardian Enrollment

In this step, we'll initiate Guardian Enrollment for users who have been flagged for MFA. Note that you can use any MFA provider that integrates with Auth0 -- you do not necessarily have to use Guardian.

You'll need to [get an Access Token](/api/management/v2/tokens) to call the [Management API](/api/management/v2). The only scope that you need to grant to the issued token is `create:guardian_enrollment_tickets`. You might consider adding both scopes to the Access Token when you make the initial request in the [previous step](#flag-new-users-for-mfa) in lieu of making two separate requests, each resulting in a token with a different scope.

You can enroll a user in Guardian MFA by making the appropriate `POST` call to the [Create a Guardian Enrollment Ticket endpoint of the Management API](/api/management/v2#!/Guardian/post_ticket).

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/guardian/enrollments/ticket",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"user_id\": \"\", \"email\": \"\", \"send_mail\": false }",
		"headersSize": -1,
		"bodySize": -1,
		"comment": ""
	}
}
```

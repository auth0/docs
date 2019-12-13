---
description: How to customize the signup process for an invite-only application with Auth0
toc: true
crews: crew-2
topics:
  - design
contentType: tutorial
useCase: strategize
---
# Invite-Only Applications

Many SaaS apps allow self-service provisioning, where users can register themselves and begin using the app. Other types of apps, however, do not allow such signups. Instead, the customer (typically an organization of some type) pay upfront for a number of users, and only the end user with the appropriate credentials may sign up and access the app. In such cases, you can use an invite-only workflow for authorization purposes.

## Example Scenario: ExampleCo

In this tutorial, we will work through a sample setup for the fictional company, ExampleCo. 

ExampleCo is a multi-tenant SaaS solution offering cloud-based analytics. Customers purchasing licenses send ExampleCo lists of users whom they want to access the application.

You can handle this requirement in Auth0 using an [Enterprise Connection](/connections/identity-providers-enterprise) (using federation) with the individual customers using ADFS, <dfn data-key="security-assertion-markup-language">SAML-P</dfn>, and so on. This allows the customer to authenticate users with their own Active Directory specifying who gets access to the app.

The invite-only authorization flow includes the following steps:

1. Creating new users in ExampleCo and bulk importing the same users into Auth0
1. Triggering the email verification process via Auth0
1. Triggering the password reset process via Auth0

### Set up your Application

You can store all ExampleCo end users in a single database, since everyone will provide their unique corporate email addresses.

![](/media/articles/invite-only/invite-only-connections.png)

To prevent users from signing themselves up and adding themselves to the database connection, be sure to select the **Disable Sign Ups** option on the connection to make sure users can only be created on the backend.
 
You will need to create an [application](/applications) in the [Dashboard](${manage_url}/#/applications) with the correct parameters:

 - **Name**: give your application a clear name as this will be used in the emails being sent out during the invite-only workflow
 - **Application Type**: this will be a regular web application.
 - **Allowed Callback URLs**: this should be the URL of your app

![](/media/articles/invite-only/invite-only-app.png)

Since this application needs to access the [Management API](/api/v2), you'll need to authorize it and set its scopes as follows:

* Go to the [APIs section](${manage_url}/#/apis) of the Dashboard.
* Select **Auth0 Management API**.
* Click over to the **Machine to Machine Applications** tab.
* Find the application you just created, and set its toggle to **Authorized**.
* Use the **down arrow** to open up the scopes selection area. Select the following scopes: `read:users`, `update:users`, `delete:users`, `create:users`, and `create:user_tickets`.
* Click **Update**.

![Authorize Application](/media/articles/invite-only/invite-only-authorize-client.png)

### Import Users

Every user that exists in ExampleCo should be created in your Auth0 database connection as well. Auth0 offers a [bulk user import functionality](/users/bulk-importing-users-into-auth0) for this purpose.

### Email Verification

Once you've created the user in Auth0, send a `POST` request from your app to the [Send an email address verification email](/api/management/v2#!/Jobs/post_verification_email) endpoint that includes:

* `user_id`: the Auth0 user ID to send the verification email to.
* `client_id` (optional): the client ID of your app.

Be sure to update the `MGMT_API_ACCESS_TOKEN` placeholder value below with your [API Access Token](/api/management/v2/tokens).

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/tickets/email-verification",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"user_id\": \"abcd|1234\", \"client_id\": \"xyz789\" }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

### Password Reset

Once you've verified the user's email, you will need to initiate the [password change process](/connections/database/password-change). To do so, your app should make a `POST` request to Auth0's Management API.

Be sure to replace the placeholder values for your [API Access Token](/api/management/v2/tokens), as well as those within the body of the call, including the callback/return URL for your app and the user's details.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/tickets/password-change",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"result_url\": \"YOUR_APP_CALLBACK_URL\", \"user_id\": \"USER_ID\", \"new_password\": \"secret\", \"connection_id\": \"con_0000000000000001\", \"email\": \"EMAIL\", \"ttl_sec\": 0 }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Summary

This tutorial walked you through implementing an invite-only sign-up flow using the [Management API](/api/v2) to customize the sign-up process and the email handling.

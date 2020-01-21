---
title: "GDPR: Track consent with your custom UI"
description: This tutorial describes how you can use either auth0.js or the Auth0 APIs to capture consent information when you use your own custom UI for logins
toc: true
topics:
    - compliance
    - gdpr
contentType: tutorial
useCase: compliance
---
# Track Consent with Custom UI

In this tutorial we will see how you can use auth0.js or the Auth0 APIs to ask for consent information and save the input at the user's [metadata](/users/concepts/overview-user-metadata).

<%= include('../_legal-warning.md') %>

## Overview

We will capture consent information, under various scenarios, and save this in the user's metadata.

All scenarios will save the following properties in the user's metadata:
- `consentGiven` (true/false) shows if the user has provided consent (true) or not (false)
- `consentTimestamp` (Unix timestamp) indicates when the user provided consent

For example:

```text
{
  "consentGiven": "true"
  "consentTimestamp": "1525101183"
}
```

We will see four different implementations for this:

1. one that displays a flag, works for database connections, and uses the [auth0.js](/libraries/auth0js) library to create the user (used by Single-Page Applications)
1. one that displays a flag, works for database connections, and uses the [Authentication API](/api/authentication#signup) to create the user (used by Regular Web Apps)
1. one that displays a flag, works for social connections, and uses the [Management API](/api/management/v2) to update the user's information (used either by SPAs or Regular Web Apps)
1. one that redirects to another page where the Terms & Conditions and/or privacy policy information can be reviewed and consent info can be provided (used either by SPAs or Regular Web Apps)

## Option 1: Use auth0.js

In this section, we will use a simple Single-Page Application and customize the login widget to add a flag which users can use to provide consent information. Instead of building an app from scratch, we will use [Auth0's JavaScript Quickstart sample](/quickstart/spa/vanillajs). We will also use [Auth0's Universal Login Page](/hosted-pages/login) so we can implement a [Universal Login experience](/guides/login/centralized-vs-embedded), instead of embedding the login in our app.

This works **only** for database connections (we will use Auth0's infrastructure, instead of setting up our own database).

1. Go to [Dashboard > Applications](${manage_url}/#/applications) and create a new [application](/applications). Choose `Single Web Page Applications` as type. Go to **Settings** and set the **Allowed Callback URLs** to `http://localhost:3000`. 

    :::note
    This field holds the set of URLs to which Auth0 is allowed to redirect the users after they authenticate. Our sample app will run at `http://localhost:3000` hence we set this value.
    :::

1. Copy the **Client Id** and **Domain** values. You will need them in a while.

1. Go to [Dashboard > Connections > Database](https://manage.auth0.com/#/connections/database) and create a new connection. Click **Create DB Connection**, set a name for the new connection, and click **Save**. Go to the connection's **Applications** tab and make sure your newly created application is enabled.

1. Download the [JavaScript SPA Sample](/quickstart/spa/vanillajs).

1. [Set the Client ID and Domain](https://github.com/auth0-samples/auth0-javascript-samples/tree/master/01-Login#set-the-client-id-and-domain) values.

1. Go to [Dashboard > Hosted Pages](${manage_url}/#/login_page). At the **Login** tab enable the toggle. 

1. At the **Default Templates** dropdown make sure that `Custom Login Form` is picked. The code is prepopulated for you.

1. Set the value of the `databaseConnection` variable to the name of the database connection your app is using. 

    ```js
    //code reducted for simplicity
	var databaseConnection = 'test-db';
	//code reducted for simplicity
	```

1. To add a field for the `consentGiven` metadata, add a checkbox at the form. For our example, we will configure the checkbox as checked by default and disabled so the user cannot uncheck it. You can adjust this according to your business needs.

    ```js
    //code reducted for simplicity
    <div class="form-group">
      <label for="name">I consent with data processing</label>
      <input
        type="checkbox"
        id="userConsent"
        checked disabled>
    </div>
    //code reducted for simplicity
    ```

1. Edit the signup function to set the metadata. Note that we set the value of the metadata to a string with the value `true` and not to a boolean value, and we are using `toString` to convert the number to a string. This is due to a restriction of the [Authentication API Signup endpoint](/api/authentication#signup) which only accepts strings as values.

    ```js
    //code reducted for simplicity
    webAuth.redirect.signupAndLogin({
      connection: databaseConnection,
      email: email,
      password: password,
      user_metadata: { consentGiven: 'true', consentTimestamp: Date.now().toString() }
    }, function(err) {
      if (err) displayError(err);
    });
    //code reducted for simplicity
    ```

1. To see what the login widget will look like, click the **Preview** tab.

    ![Preview custom form with auth0.js](/media/articles/compliance/auth0js-db-consent-flag.png)

1. To test this configuration run the application and go to [http://localhost:3000](http://localhost:3000). Sign up with a new user. Then go to [Dashboard > Users](${manage_url}/#/users) and search for your new user. Go to **User Details** and scroll down to the **Metadata** section. At the **user_metadata** text area you should see the `consentGiven` metadata set to `true`.

## Option 2: Use the API (Database)

If you serve your login page from your own server, then you can call the [Authentication API Signup endpoint](/api/authentication#signup) directly once the user signs up.

For the same scenario we have been discussing so far, once you sign up a new user, you can use the following snippet to create the user at Auth0 and set the metadata. Remember to replace the value of the `consentTimestamp` request parameter with the timestamp of when the user provided consent.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/dbconnections/signup",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"email\": \"YOUR_USER_EMAIL\",\"password\": \"YOUR_USER_PASSWORD\",\"user_metadata\": {\"consentGiven\": \"true\", \"consentTimestamp\": \"1525101183\" }}"
  }
}
```

Note that we set the value of the metadata to a string with the value `true` and not to a boolean value due to the API restriction that accepts strings as values, not booleans.

If setting boolean values is a requirement for you, you can use the Management API instead. In this scenario you sign up your user as usual, and then you call the [Update User endpoint of the Management API](/api/management/v2#!/Users/patch_users_by_id) to set the required metadata after the user has been created. For details on how to do that keep reading, the next paragraph uses that endpoint.

## Option 3: Use the API (Social)

If you use social connections, then you cannot use the Authentication API to create the user at Auth0, since that endpoint works only for database connections.

What you have to do instead is let your user sign up with the social provider (which will create a user record at Auth0) and then use the [Management API](/api/management/v2) to update the user's information.

Before you call the Management API you need to get a valid token. For details see [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production).

:::panel Get a token from an SPA
The linked article uses the [Client Credentials Flow](/flows/concepts/client-credentials) to get a token, which you cannot use from an app running on the browser. What you can use instead is the [Implicit Flow](/flows/concepts/implicit). Set the **audience** request parameter to `https://${account.namespace}/api/v2/` and the **scope** parameter to the scope `create:current_user_metadata`. You can use the Access Token you will get at the response to call the [Update User endpoint of the Management API](/api/management/v2#!/Users/patch_users_by_id).
:::

Once you have a valid token, use the following snippet to update the user's metadata.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/users/{USER_ID}",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_ACCESS_TOKEN"
	},
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{\"user_metadata\": {\"consentGiven\":true, \"consentTimestamp\": \"1525101183\"}}" 
    },
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

Note that in order to make this call you need to know the unique `user_id`. You can retrieve this from the `sub` claim of the [ID Token](/tokens/concepts/id-tokens), if you got one from the response. Alternatively, if all you have is the email, you can retrieve the Id by calling another endpoint of the Management API. For more information see [Search Users by Email](/best-practices/search-best-practices#users-by-email).

## Option 4: Redirect to another page

If you want to display more information to your user, then upon signup you can redirect to another page where you ask for consent and any additional info, and then redirect back to finish the authentication transaction. This can be done with [redirect rules](/rules/redirect). That same rule can be used to save the consent information at the user's metadata so you can track this information and not ask for consent upon next login.

<%= include('./_redirect.md') %>

To test this configuration:
 
1. Run the application and go to [http://localhost:3000](http://localhost:3000).
2. Sign up with a new user. You will be redirected to the consent form. 
3. Check the **I agree** flag, and click **Submit**.
4. Go to [Dashboard > Users](${manage_url}/#/users), and search for your new user.
5. Go to **User Details**, and scroll down to the **Metadata** section. 
6. At the **user_metadata** text area, you should see the `consentGiven` metadata set to `true` and the `consentTimestamp` set to the Unix timestamp of the moment the user consented.

![Application Sign Up widget](/media/articles/compliance/lock-consent-form-agree.png)

That's it, you are done!

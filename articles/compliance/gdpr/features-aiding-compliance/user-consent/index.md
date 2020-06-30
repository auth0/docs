---
title: "GDPR: Conditions for Consent"
description: This article discusses which Auth0 features can help customers comply with the Conditions for Consent GDPR requirements
toc: true
topics:
    - compliance
    - gdpr
contentType: 
    - index
    - how-to
useCase: compliance
---
# GDPR: Conditions for Consent

According to Article 7 of GDPR, you must ask users to consent on the processing of their personal data in a clear and easily accessible form. You must also show that the user has consented, and provide an easy way to withdraw consent at any time.

This article explains how you can use Auth0 features to implement these requirements.

<%= include('../_legal-warning.md') %>

## Ask for consent

Upon signup you have to ask your users for consent. With Auth0, you can save this information at the [user metadata](/users/concepts/overview-user-metadata). There are several available options here, depending on how you use Auth0 to authenticate your users.

::: note
Before you design your solution using metadata make sure you are aware of the restrictions. Auth0 limits the total size of the `user_metadata` to **16 MB**. For more details review the [metadata size limits](/best-practices/metadata-best-practices#metadata-storage-and-size-limits).
::: 

### Use Lock

You can customize the Lock UI to display links to your terms and conditions and/or privacy statement pages, and a consent checkbox that the user has to check in order to sign up. This can be done with the [mustAcceptTerms Lock option](/libraries/lock/configuration#mustacceptterms-boolean-). This property, when set to `true`, displays a checkbox alongside the terms and conditions that must be checked before signing up. The terms and conditions can be specified using the [languageDictionary option](/libraries/lock/configuration#languagedictionary-object-). Once the user accepts and signs up, save the consent information at the `user_metadata` using a [rule](/rules) that will run upon first login.

If you want to get more information from the users during signup, and you authenticate users with a database connection, you can add custom fields to the Lock UI. This can be done with the [additionalSignUpFields Lock option](/libraries/lock/configuration#additionalsignupfields-array-). Any custom fields are automatically added to the `user_metadata`.

If you are using social logins, adding custom fields is not an option, but you can redirect the user to another page where you ask for consent and any additional info, and then redirect back to finish the authentication transaction. This can be done with [redirect rules](/rules/redirect). Once the signup process is complete, save the consent information at the `user_metadata` by calling the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

:::note
For a tutorial on how to implement any of these scenarios, see the [Track Consent with Lock](/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock).
:::

### Use your custom UI

If you use a custom signup form with a database connection, you have to add an extra field to the signup screen in order to capture the user's consent. Afterwards, call the [Authentication API's Signup endpoint](/api/authentication#signup) in order to create the user in Auth0. At this point, you can set the consent information as part of the `user_metadata`.

Alternatively, if you use Auth0.js from an SPA, you can use [the signup method](/libraries/auth0js#sign-up) in order to create the user in Auth0 and set the consent info as part of the `user_metadata`.

If you use a custom signup form with social providers, you cannot set the user's consent information upon signup but you can update it as soon as the user is created. Save the consent information at the `user_metadata` by calling the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

:::note
For a tutorial on how to implement any of these scenarios, see the [Track Consent with Custom UI](/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-custom-ui).
:::

### Re-consent and user migration

If you need to ask for consent from existing users and you decide to migrate your users from an existing database to Auth0, you can use our [Automatic User Migration](/users/guides/configure-automatic-migration) feature. By activating this, each time a user logs in for the first time (since this was activated), they will be created in Auth0 without having to reset their password.

Note that every time your Terms and Conditions change, you **must** ask the users for consent again.

:::panel What else do I have to do?
- You must write up the notification users will see around how users' data is being used, how long data will be used, users' rights, etc. as well as customize the UI sign-up box
- You must determine if re-consent is required for your users, depending on your old terms and conditions and previous privacy certifications
:::

## Track consent

According to GDPR, you should be able to show that the user has consented to the processing of their personal data. 

With Auth0 you can save the user's consent information as part of the `user_metadata`. You can either save only a flag, showing if the user has consented or not, or a set of consent information and preferences (including for example, the day the user provided consent, the terms he consented to, etc). Afterwards, you can access and manipulate this information using our Management API.

:::note
To access the Management API you will need an Access Token. For information on how to get one, refer to the [Access Tokens for the Management API](/api/management/v2/tokens).
:::

The Management API offers several options when it comes to user search and endpoints to update `user_metadata` or batch export users.

### Search for a user using their email address

To search for a user using their email address, use [the Search user by email endpoint](/best-practices/search-best-practices#users-by-email). 

Set the **fields** request parameter to `user_metadata` in order to limit the fields returned. This way, only the user_metadata will be returned instead of the complete user profile.

Sample request:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users-by-email",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "email",
          "value": "USER_EMAIL_ADDRESS"
        },
        {
          "name": "fields",
          "value": "user_metadata"
        }
    ]
}
```

Sample response:

```json
[
  {},
  {
    "user_metadata": {
      "consent": {
	    "given": true,
	    "date": "01/23/2018",
	    "text_details": "some-url"
	  }
    }
  }
]
```

### Search for a user using their ID

To search for a user using their ID, use [the Get a user endpoint](/best-practices/search-best-practices#users-by-id). 

Set the **fields** request parameter to `user_metadata` in order to limit the fields returned. This way, only the `user_metadata` will be returned instead of the complete user profile.

Sample request:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users/YOUR_USER_ID",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "fields",
          "value": "user_metadata"
        }
    ]
}
```

Sample response:

```json
{
  "user_metadata": {
    "consent": {
	    "given": true,
	    "date": "01/23/2018",
	    "text_details": "some-url"
  	}
  }
}
```

### Update consent information

To update a user's `user_metadata`, use [the Update a user endpoint](/api/management/v2#!/Users/patch_users_by_id).

How you structure your request depends on how you have structured your metadata: as root or as inner properties.

If your metadata are stored as root properties:

```json
{
  "consentGiven": true,
  "consentDetails": "some-url"
}
```

If your metadata are stored as inner properties:

```json
{
  "consent": {
    "given": true,
    "text_details": "some-url"
  }
}
```

#### Update a root property

Updates to root-level properties are merged, so you only need to send the value for the field you want to update. For example, let's say we want to add a consent date and set it to `01/23/2018`.

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    },
    {
        "name": "content-type",
        "value": "application/json"
    }],
    "postData" : {
        "mimeType": "application/json",
        "text": "{\"user_metadata\":{\"consentDate\":\"01/24/2018\"}}"
    }
}
```

This will add a new property to the user profile, the **user_metadata.consentDate**, which will hold the date the customer consented. The response will be the full user profile. The updated metadata will look like this:

```json
{
  "consentGiven": true,
  "consentDate": "01/23/2018",
  "consentDetails": "some-url"
}
```

#### Update an inner property

To update an inner property, you must send the whole metadata object, even if you are not updating more than one property. **If you do not include the entire object, Auth0 will remove your existing properties**. 

Let's add an inner property for the consent date and set it to `01/23/2018`.

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    },
    {
        "name": "content-type",
        "value": "application/json"
    }],
    "postData" : {
        "mimeType": "application/json",
        "text": "{\"user_metadata\":{\"consent\": {\"given\":true, \"date\":\"01/23/2018\", \"text_details\":\"some-url\"}}}"
    }
}
```

This will add a new property to the user profile, the **user_metadata.consent.date**, which will hold the date the customer consented. The response will be the full user profile. The updated metadata will look like this:

```json
{
  "consent": {
    "given": true,
    "date": "01/23/2018",
    "text_details": "some-url"
  }
}
```

### Export consent information

To export a list of your users using the Management API, use [the User export endpoint](/best-practices/search-best-practices#user-export). 

This endpoint creates a job that exports all users associated with a connection. You will need the ID of the connection. To find this ID, use [the Get Connections endpoint](/api/management/v2#!/Connections/get_connections) (you can set the **name** parameter to the name of the connection to retrieve only this one).

Once you have the connection ID and a [Access Token for the Management API](/api/management/v2/tokens), you are ready to start exporting users. For a sample request and response see [User Export](/best-practices/search-best-practices#user-export).

:::panel What else do I have to do?
- Determine how you want to track consent. We recommend including information on not just the date the user consented, but the version of terms and conditions to which the user agreed. We also recommend including an array to hold information about users that withdraw their permission (remember that the user can consent and withdraw multiple times)
- Choose where you want to store consent: in Auth0's database or elsewhere
:::

## Withdraw consent

The user should have the option to withdraw consent using your app. This option should be easily accessible, and clearly distinguishable. Once the users decides to withdraw their consent, you should take action. 

First, you have to decide how you will handle withdrawal of consent: will you delete the users or flag them as deleted?

### Delete user

To delete a user, use the [Delete a user endpoint](/api/management/v2#!/Users/delete_users_by_id). 

```har
{
    "method": "DELETE",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }]
}
```

The response body for this endpoint is empty, so if you want to confirm that the user was successfully deleted try to [retrieve the user using their email](/best-practices/search-best-practices#users-by-email). If the endpoint returns an error, then your call to delete the user was successful.

### Flag user as deleted

If you don't want to delete the user, flag their profile as deleted using the `app_metadata` (endpoint: [Update a user](/api/management/v2#!/Users/patch_users_by_id)). Then, add some code that will make the authentication process to fail for any user with their profile flagged as such. 

This allows you to keep a record of deleted users for future use.

#### Step 1: Flag the profile

To flag a user as deleted use the [app_metadata](users/concepts/overview-user-metadata). In the following example, we will show you how to add a property called **deleted** to the **app_metadata** field. This allows you to configure the authentication process to treat all uses with this property set to true as deleted.

To update a user's metadata, use the [Update a user endpoint](/api/management/v2#!/Users/patch_users_by_id).

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    },
    {
        "name": "content-type",
        "value": "application/json"
    }],
    "postData" : {
        "mimeType": "application/json",
        "text": "{\"app_metadata\":{\"deleted\":true}}"
    }
}
```

#### Step 2: Disable login for flagged users

Next, we must disable login for users flagged as deleted. To do so, we will add a [rule](/rules) (that is, a JavaScript snippet that will run as part of the authentication pipeline).

Go to [Dashboard > Rules](${manage_url}/#/rules) and create a new rule. Copy the script you see below.

```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.deleted){
  	return callback(new UnauthorizedError('Access denied (deleted user)'));
  }
  callback(null, user, context);
}
```

The script: 

- Checks the value of the **deleted** metadata property (`user.app_metadata.deleted`)
- Returns an `Access denied (deleted user)` error to your app if `user.app_metadata.deleted = true`

Give a name to your rule and save your changes.

:::panel What else do I have to do?
- Ensure the consent withdrawal piece is granular enough
- Configure into the app the area where customers will withdraw consent
:::

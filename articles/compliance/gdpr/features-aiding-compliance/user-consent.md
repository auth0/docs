---
title: GDPR Compliance: Conditions for Consent
description: This article discusses which Auth0 features can help customers comply with the Conditions for Consent GDPR requirements
toc: true
---
# GDPR Compliance: Conditions for Consent

According to article 7 of GDPR, you have to ask users for consent on the processing of their personal data, in a clear and easily accessible form. You also have to be able to show that the user has consented, and provide an easy way to withdraw consent at any time. 

This article explains how you can use Auth0 features to implement these requirements.

## Ask for consent

Upon signup you have to ask your users for consent. With Auth0, you can save this information at the [user metadata](/metadata). There are several available options here, depending on how you use Auth0 to authenticate your users.

::: note
Before you design your solution using `user_metadata` make sure you have reviewed the [custom fields limitations](/libraries/custom-signup#custom-fields-limitations).
:::

---

**If you use Lock and authenticate users with a database connection**, add an extra field to the signup screen using the [additionalSignUpFields Lock option](/libraries/lock/configuration#additionalsignupfields-array-). This extra field will be automatically added to the `user_metadata`.

Alternatively, you can use the [mustAcceptTerms Lock option](/libraries/lock/configuration#mustacceptterms-boolean-). This, when set to `true`, displays a checkbox alongside the terms and conditions that must be checked before signing up. The terms and conditions can be specified using the [languageDictionary option](/libraries/lock/configuration#languagedictionary-object-). Once the user accepts and signs up, save the consent information at the `user_metadata` using the [additionalSignUpFields Lock option](/libraries/lock/configuration#additionalsignupfields-array-).

---

**If you use Lock and authenticate users with social providers**, you cannot add a custom field to the signup screen, but you can redirect the user to another page where you ask for consent and then redirect back to finish the authentication transaction. Implement the redirection using [redirect rules](/rules/redirect). Once you get the user's consent and the signup process is complete, save the consent information at the `user_metadata` by calling the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

---

**If you use a custom signup form with a database connection**, you have to add an extra field to the signup screen in order to capture the user's consent. Afterwards, call the [Authentication API's Signup endpoint](/api/authentication#signup) in order to create the user in Auth0. At this point, you can set the consent information as part of the `user_metadata`. For a sample request, refer to [Custom Signup > Send the Form Data](/libraries/custom-signup#2-send-the-form-data).

Alternatively, if you use Auth0.js, you can use [the signup method](/libraries/auth0js#sign-up) in order to create the user in Auth0 and set the consent info as part of the `user_metadata`.

---

**If you use a custom signup form with social providers**, you have to add an extra field to the signup screen in order to capture the user's consent. Save the consent information at the `user_metadata` by calling the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

---

**If you have to do re-consent with existing users and you decide to migrate your users from an existing database to Auth0**, you can use our [Automatic User Migration](/users/migrations/automatic) feature. By activating this, each time a user logs in for the first time (since this was activated), they will be created in Auth0 without having to reset their password. 

---

:::panel What else do I have to do?
- You must write up the notification users will see around how users' data is being used, how long data will be used, users' rights, etc. as well as customize the UI sign-up box
- You must determine if re-consent is required for your users, depending on your old terms and conditions and previous privacy certifications
:::

## Track consent

According to GDPR, you should be able to show that the user has consented to the processing of their personal data. 

With Auth0 you can save the user's consent information as part of the `user_metadata`. You can either save only a flag, showing if the user has consented or not, or a set of consent information and preferences (including for example, the day the user provided consent, the terms he consented to, etc). Afterwards, you can access and manipilate this information using our Management API.

:::note
To access the Management API you will need an access token, for information on how to get one refer to the [Auth0 Management API token](/api/management/v2/tokens).
:::

The Management API offers several offers several options when it comes to user search (search by email, id, or other fields) and endpoints to update `user_metadata` or batch export users.

### Search for a user using their email address

To search for a user using their email address, use [the Search user by email endpoint](/users/search#users-by-email). 

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

### Search for a user using their Id

To search for a user using their Id, use [the Get a user endpoint](/users/search#users-by-id). 

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

### Search for a set of users

To search for a set of users, use [the List or search users endpoint](/users/search#users). 

This endpoint is eventually consistent (that is, the response might not reflect the results of a recently-complete write operation) and that [only specific fields are available for search](/api/management/v2/user-search#searchable-fields). 

Consent information that are saved as part of the `user_metadata` are not searchable. 

For a sample request and response see [Search Users](/users/search#users). For more examples, see [Example Queries](/api/management/v2/user-search#example-queries).

### Update consent information

To update a user's `user_metadata`, use [the Update a user endpoint](/api/management/v2#!/Users/patch_users_by_id).

How you will structure your request depends on how you have structured your metadata: as root or as inner properties.

Metadata as root properties:

```json
{
  "consentGiven": true,
  "consentDetails": "some-url"
}
```

Metadata as inner properties:

```json
{
  "consent": {
    "given": true,
    "text_details": "some-url"
  }
}
```

#### Update a root property

In this case the metadata are merged so you need only send the field you want to update. For example, let's say we want to add a consent date and set it to `01/23/2018`.

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

In this case you have to send the whole object, even though you might want to update only one property. If you do not, the other properies will be removed. Let's add an inner property for the consent date and set it to `01/23/2018`.

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

To export a list of your users using the Management API, use [the User export endpoint](/users/search#user-export). 

This endpoint creates a job that exports all users associated with a connection. You will need the Id of the connection. To find this Id, use [the Get Connections endpoint](/api/management/v2#!/Connections/get_connections) (you can set the **name** parameter to the name of the connection to retrieve only this one).

Once you have the connection Id and a [Management API token](/api/management/v2/tokens), you are ready to start exporting users. For a sample request and response see [User Export](/users/search#user-export).


:::panel What else do I have to do?
- Determine how you want to track consent. We recommend putting in not just the date but the correct version of terms and conditions, specifying the version, and including an array for those who will withdraw, provide and withdraw consent again.
- Choose where you want to store consent, in Auth0's database or elsewhere
:::

## Withdraw consent

The user should have the option to withdraw consent using your app. This option should be easily accessible, and clearly distinguishable. Once the users decides to withdraw their consent, you should take action. First, you have to decide how you will handle withdrawal of consent: will you delete the users or flag them as deleted?

To delete a user, use the [Delete a user endpoint](/api/management/v2#!/Users/delete_users_by_id). The response body for this endpoint is empty, so if you want to confirm that the user was successfully deleted try to [retrieve the user using their email](/users/search#users-by-email). If the endpoint returns an error, then your call to delete the user was successful.

If you don't want to completely delete the user, flag their profile as deleted at the `app_metadata` (endpoint: [Update a user](/api/management/v2#!/Users/patch_users_by_id)). Then, add a rule that will make the authentication process to fail for any user with their profile flagged as such. This way you can keep a record of deleted users in case you need to refer to this information in the future.

:::panel What else do I have to do?
- Ensure the consent withdrawal piece is granular enough
- Configure into the app the area where customers will withdraw consent
:::

<%= include('../_stepnav', {
 prev: ["Go back", "/compliance/gdpr/features-aiding-compliance"],
 navHeader: "Auth0 Features and GDPR Compliance"
}) %>
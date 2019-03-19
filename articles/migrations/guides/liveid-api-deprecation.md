---
title: Microsoft Account Migration
description: This article covers the Live Connect + SDK deprecation and how to update your Auth0 Microsoft Account Connection.
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Microsoft Account Migration to Azure AD (personal accounts) + Microsoft Graph

In October 2017, Microsoft announced the [deprecation of the Live Connect API and Live SDK](https://developer.microsoft.com/en-us/office/blogs/outlook-rest-api-v1-0-office-365-discovery-and-live-connect-api-deprecation). This is a Microsoft deprecation that will affect Auth0 users using the Microsoft social connection. The change implies switching how Auth0 interacts with the Microsoft authentication APIs, and it might imply changes in customers application's code.

The change implies switching:

- From the Live Connect API to the Azure Active Directory v2 and OIDC protocol for Microsoft Account authentication
- From the Live SDK to Microsoft Graph to be able to get other resources including user profiles, contacts, files, etc

Note that even though Azure AD is used, this connection type will only accept personal accounts. For work or school accounts you should use the enterprise Azure AD connection type.

You can decide if Auth0 uses Live Connect + Live SDK or Azure AD + Microsoft Graph using the 'Strategy Version' field in the Microsoft Account connection settings page. 

![New Microsoft Connection Settings](/media/articles/connections/social/microsoft-account/microsoft-account-azureid.png)

You need to switch to 'Azure AD (personal accounts)' to ensure your applications will keep working after Microsoft decommissions the API.

**Microsoft Application Registration**

Depending on when you created your Live SDK application, it might or not support Azure Active Directory v2. If it's not supported, you will need to create a different application and update your Client ID and Client Secret in the Auth0 Microsoft connection settings. As a rule, if your Client ID looks like `00000000400FFF55`, you'll need to create a new application. 

For more information, check [Microsoft's documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-registration-portal).


**User Profile**

Microsoft Graph provides different user profile information compared to the Live Connect and Live SDK user profile. In particular, some of the user profile fields that were previously available are not available anymore:
 

***OIDC Profile***

| Field  |  Live SDK |  Microsoft Graph  |
|--------|---------------|------------------|
|  picture | Returned a URL for the user picture | Auth0 will build a URL that will return a default picture for the user based on their initials |
| locale | Returned a string in the format en_US | Not available |

***Raw Profile***

The raw user profile that can be obtained calling the [Get User By Id Endpoint](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id) has several differences when using Live SDK or Microsoft Graph.

The JSON below shows the fields that are in the Live SDK profile but are not present, or are different, in the Microsoft Graph one:

```js
{
    "locale": "en_ZA",
    "work": [],
    "emails": [
        "john.doe@windowslive.com"
    ],
    "addresses": {
        "personal": {
            "street": null,
            "street_2": null,
            "city": null,
            "state": null,
            "postal_code": null,
            "region": null
        },
        "business": {
            "street": null,
            "street_2": null,
            "city": null,
            "state": null,
            "postal_code": null,
            "region": null
        }
    },
    "phones": {
        "personal": null,
        "business": null,
        "mobile": null
    },
    "nickname": "john.doe@windowslive.com",
   ]
}
```

This other one shows the fields that are in the Microsoft Graph profile but are not present, or are different, in the Live SDK one one:

```js
{
    "strategy_version": 2,
    "displayName": "John Doe",
    "userPrincipalName": "john.doe@windowslive.com",
    "businessPhones": [],
    "nickname": "john.doe",
}
```

Key differences are:

- `strategy_version` has the value `1` when the user last logged-in with Live Connect, or `2` when they last logged in with Azure AD.
- `nickname` has a different format. 
- `locale`, `work`, `emails` array, `addresses`, `phones` are present in Live SDK but not in Microsoft Graph.
- `displayName`, `userPrincipalName`, `businessPhones` array are present in Microsoft Graph but not in Live SDK.

If a user that has previously logged in with Live Connect logs in with AzureAD, the profiles will be merged. The new profile will have both the content of the Live ID profile plus the fields from the Microsoft Graph profile.

The `strategy_version` will be set to '2' for users that last logged in with Azure AD, to '1' for users that logged in with Live Connect recently, and will not be present for users that did not login recently. You can use this field to better interpret the profile content.

Note that the `user_id` field will be the same regardless of the API used to connect with Microsoft, even if you had to create another application to use Azure Active Directory v2.
 
**Permissions**

Auth0 lets you select which permissions you want to ask from the Microsoft Graph APIs. The ones that Live SDK and Microsoft Graph support might provide similar functionality, but the data returned by them and their format may be completely different. See [Migrating from Live SDK - Permissions](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/migrating-from-live-sdk?view=odsp-graph-online#permissions) to understand what changes are required in your code.


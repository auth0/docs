---
title: Migration to LinkedIn API V2
description: This article covers the LinkedIn API deprecation and how to update your Auth0 LinkedIn Connection.
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Microsoft Account Migration to Azure AD (personal accounts) + Microsoft Graph

In October 2017, Microsoft announced the [deprecation of the Live Connect API and Live SDK](https://developer.microsoft.com/en-us/office/blogs/outlook-rest-api-v1-0-office-365-discovery-and-live-connect-api-deprecation). This is a Microsoft deprecation that will affect Auth0 users using the Microsoft social connection, and requires changes in the Auth0 configuration and potentially application code. 

The change implies switching:

- from the Live Connect API to the Azure Active Directory API to authenticate
- from the Live SDK to Microsoft Graph to be able to get other resources including user profiles, contacts, files, etc

You can decide if Auth0 uses Live Connect + Live SDK or Azure AD + Microsoft Graph using the 'Strategy Version' field in the Microsoft Account connection settings page. 

![New Microsoft Connection Settings](/media/articles/connections/social/microsoft-account/microsoft-account-azureid.png)

You need to switch to 'Azure AD (personal accounts)' to ensure your applications will keep working after Microsoft decommissions the endpoint.

**User Profile**

The profile that can be accessed through Microsoft Graph provides different user profile information compared to the Live Connect and Live SDK user profile. In particular, some of the user profile fields that were previously available are not available anymore:
 

***OIDC Profile***

| Field  |  Live SDK |  Microsoft Graph  |
|--------|---------------|------------------|
|  picture | Returned a URL for the user picture | Auth0 will build a URL that will return a default picture for the user based on their initials. To get the actual image you need to [download it using Microsoft Graph](https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0)|
| locale | Returned a string in the format en_US | Not available. |

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

The `strategy_version` will be set to '2' for users that last logged in with Azure AD, to '1' for users that logged in with Live SDK recently, and will not be present for users that did not login recently. You can use this field to better interpret the profile content.

Note that the `user_id` field will be the same regardless of the API used to connect with Microsoft.
 
**Permissions**

Auth0 lets you select which permissions you want to ask from the Microsoft Graph APIs. The ones that Live SDK and Microsoft Graph support might provide similar functionality, but the data returned by them and their format may be completely different. See [Migrating from Live SDK - Permissions](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/migrating-from-live-sdk?view=odsp-graph-online#permissions) to understand what changes are required in your code.

| Live SDK | Microsoft Graph |
|----------|-----------------|
|**Attributes**|**Permissions**|
|Basic Profile REQUIRED        |User (Read) REQUIRED |
|Email Addresses               |Offline Access  |
|Postal Addresses              |User (Read/Write)  |
|Birthday Date                 |User Activity (Read/Write)  |
|Work Profile                  |Device (Read)|
|**Permissions**               |Device (Command) |
|Contacts (Read)               |Mail (Read)  |  
|Offline Access                |Mail (Read/Write)  |
|Calendars (Read)              |Calendars (Read)  |
|Calendars (Read & Write)      |Calendars (Read/Write)| 
|Contact's Birthday            |Contacts (Read)|
|Contacts Creation             |Contacts (Read/Write)  |
|Contacts Calendar             |Files (Read) |
|Contact's Photos              |Files (Read All) |
|OneDrive Shared Files (Read)  |Files (Read/Write)|
|Events Creation               |Files (Read/Write All|
|Messenger                     |Notes (Read)  |
|Phone Numbers                 |Notes (Create)        |  
|Photos                        |Notes (Read/Write)         |
|Status Update                 |Tasks (Read)          |  
|OneDrive (Read)               |Tasks (Read/Write)  | 
|OneDrive (Read & Write)       ||
|Client ID Access              ||
|Client ID Creation            ||

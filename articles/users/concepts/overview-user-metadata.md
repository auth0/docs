---
description: Understand how user metadata and app metadata can be used to store information that does not originate from an identity provider.
topics: 
   - metadata
   - rules
   - endpoints
contentType: concept
useCase: manage-users
---

# Metadata

In addition to the [Normalized User Profile](/users/normalized) information, you can use metadata to store information that does not originate from an identity provider, or that overrides what an identity provider supplies.

There are three types of data typically stored in the `app_metadata` field:

* **Permissions**: privileges granted to certain users allowing them rights within the application that others do not have.
* **Plan information**: settings that cannot be changed by the user without confirmation from someone with the appropriate authority.
* **External IDs**: identifying information used to associate users with external accounts. 

Auth0 distinguishes between two types of metadata used to store specific kinds of information:

* **User metadata**: stores user attributes such as preferences that do *not* impact a user's core functionality. Logged in users can edit their data stored in `user_metadata` if you build a form for them using the Management API [`PATCH` endpoint](/api/management/v2#!/Users/patch_users_by_id) with the scope `update:current_user_metadata`. 
* **App metadata**: stores information (such as, support plan subscriptions, security <dfn data-key="role">roles</dfn>, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access. Data stored in `app_metadata` cannot be edited by users. See [App metadata restrictions](/best-practices/metadata-best-practices#app-metadata-restrictions) for what cannot be stored in this field. 

::: note
Data unrelated to user authentication should always be stored in an external database and not in the user profile metadata. 
:::

In the following example, the user `jane.doe@example.com` has the following metadata stored with their profile. 

```json
{
    "emails": "jane.doe@example.com",
    "user_metadata": {
        "hobby": "surfing"
    },
    "app_metadata": {
        "plan": "full"
    }
}
```

In the above example metadata, within a [Rule](/rules) or via a [call to the Management API](/users/guides/read-metadata), you could reference specific items from the data set as follows:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

<%= include('../_includes/_connection-synch-note.md') %>

## Keep reading

* [Manage User Metadata](/users/guides/manage-user-metadata)
* [User Metadata in Rules](/rules/current/metadata-in-rules)
* [Update Metadata with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [Metadata Best Practices](/best-practices/metadata-best-practices)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [Set Metadata Properties on Creation](/users/guides/set-metadata-properties-on-creation)

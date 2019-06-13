---
title: "GDPR: Right to access, correct, and erase data"
description: This article discusses which Auth0 features can help customers comply with the GDPR requirements on the user's right to access, correct, and erase their personal data
toc: true
topics:
    - compliance
    - gdpr
contentType: concept
useCase: compliance
---
# GDPR: Right to access, correct, and erase data

As per articles 15, 16, 17, and 19 of GDPR, users have the right to get a copy of their personal data you are processing, ask for rectifications if they are inaccurate, and ask you to delete their personal data. 

With Auth0, you can access, edit, and delete user information:
- manually, using the [Dashboard](${manage_url}/#/users), or
- programmatically, using the [Management API](/api/management/v2)

<%= include('./_legal-warning.md') %>

## Manual process

You can view, edit, and delete user information at [Dashboard > Users](${manage_url}/#/users). Drill down to a user to view their info. The information you can change are:

| **Field** | **How to edit**
|-|-|
| **Email** | Click Edit. Set the new email.
| **Email verified** | Click **Edit** at the **Εmail** field. Click the **Set email as verified** link.
| **Metadata** | Both the `app_metadata` and the `user_metadata` objects are editable from this screen. Edit the JSON at the **Metadata** section and save your changes.
| **Blocked** | Not directly editable. Click **Actions > Block User** at the top right of this screen. To unblock click **Actions > Unblock User**.
| **Email** | Not directly editable. Click **Actions > Change Email** at the top right of this screen.
| **Password** | Not directly editable. Click **Actions > Change Password** at the top right of this screen.

To delete a user, drill down and click **Actions > Delete User**.

## Programmatic process

You can also retrieve, edit, and delete user information using our API. 

First, pick an endpoint that matches your needs:

- [Retrieve a user using the ID as search criteria](/best-practices/search-best-practices#users-by-id)
- [Retrieve a user using the Email as search criteria](/best-practices/search-best-practices#users-by-email)
- [Export all users to a file using a long running job](/best-practices/search-best-practices#user-export)
- [Update a user](/api/management/v2#!/Users/patch_users_by_id). Note that not all fields are editable (see the next paragraph: [Editable data](#editable-data)). Keep in mind that:
  - The properties of the new object will replace the old ones. The **user_metadata** and **app_metadata** fields are an exception to this rule. These properties are merged instead of being replaced, though the merge happens only on the first level.
  - If you are updating **email_verified**, **phone_verified**, **username**, or **password**, you must set the **connection** parameter.
  - If your are updating **email** or **phone_number**, you must set the **connection** and the **client_id** parameters.
- [Delete a user based on the ID](/api/management/v2#!/Users/delete_users_by_id)

In order to call any of the API's endpoints, you will need an valid Access Token. This token must have the required permissions per endpoint.

:::note
Each endpoint at the [Management API explorer](/api/management/v2) has a section **Scopes** that lists the scope(s) that the Access Token must contain in order to access it. For example, the [Delete user endpoint](/api/management/v2#!/Users/delete_users_by_id) requires the `delete:users` scope.
:::

To learn more about these tokens and how you can generate one, see [Access Tokens for the Management API](/api/management/v2/tokens).

Once you know which endpoint you want to access, and you have a valid Access Token, you are ready to send your request.

## Editable data

The following user information can be updated using the API:

- blocked
- email_verified
- email
- verify_email
- password
- phone_number
- phone_verified
- verify_password
- user_metadata
- app_metadata
- username	

::: note
For a list of all the user attributes, refer to the [Structure of the User Profile](/users/references/user-profile-structure).
:::

The following user information are **not** editable:
- given_name
- family_name
- name
- nickname
- picture

## Searchable fields

You can search for users using the following:

- All the [normalized user profile fields](/users/normalized/auth0/normalized-user-profile-schema)
- The profile information under the **user_metadata** object:
  - name
  - nickname
  - given_name
  - family_name

---

:::panel What else do I have to do?
You are responsible for ensuring customer is erased or data is updated in any other databases that Auth0 is not connected to.
:::

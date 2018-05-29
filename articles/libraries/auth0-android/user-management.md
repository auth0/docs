---
section: libraries
toc: true
description: How to use Auth0.Android to manage users
tags:
  - libraries
  - android
  - users
---
# Use Auth0.Android to Manage Users

The Management API provides functionality that you can use to manage users of your application, including tasks such as the following.

* Link separate user accounts from different providers, tying them to a single profile (Read more about [Linking Accounts](/link-accounts) with Auth0)
* Unlink user accounts, returning them to separate identities
* Update user [metadata](/metadata)

## Initializing the API Application

To get started, create a new `UsersAPIClient` instance by passing it the `account` and the token for the primary identity. In the case of linking users, this primary identity is the user profile that you want to "keep" the data for, and which you plan to link other identities to.

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
UsersAPIClient users = new UsersAPIClient(account, "token");
```

## Linking users

Linking user accounts will allow a user to authenticate from any of their accounts and no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish a user's accounts to be linked, this is the way to go.

The `link` method accepts two parameters, the primary user id and the secondary user token (the token obtained after login with this identity). The user id in question is the unique identifier for this user account. If the id is in the format `facebook|1234567890`, the id required is the portion after the delimiting pipe.

```java
users
    .link("primary user id", "secondary user token")
    .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
        @Override
        public void onSuccess(List<UserIdentity> payload) {
            //Got the updated identities! Accounts linked.
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

## Unlinking users

Unlinking users is a similar process to the linking of users. The `unlink` method takes three parameters, though: the primary user id, the secondary user id, and the secondary provider (of the secondary user).

```java
users
    .unlink("primary user id", "secondary user id", "secondary provider")
    .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
        @Override
        public void onSuccess(List<UserIdentity> payload) {
            //Got the updated identities! Accounts linked.
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

::: note
When accounts are linked, the secondary account's metadata is **not** merged with the primary account's metadata. Similarly, when unlinking two accounts, the secondary account does not retain the primary account's metadata when it becomes separate again.
:::

## Updating user metadata

When updating user metadata, you will create a `metadata` object, and then call the `updateMetadata` method, passing it the user id and the `metadata` object. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata.

```java
Map<String, Object> metadata = new HashMap<>();
metadata.put("name", Arrays.asList("My", "Name", "Is"));
metadata.put("phoneNumber", "1234567890");

users
    .updateMetadata("user id", metadata)
    .start(new BaseCallback<UserProfile, ManagementException>() {
        @Override
        public void onSuccess(UserProfile payload) {
            //Metadata updated
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

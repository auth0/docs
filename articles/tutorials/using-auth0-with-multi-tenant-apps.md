---
description: This articles describes ways to implement and use Auth0 with multi-tenancy.
crews: crew-2
toc: true
---

# Using Auth0 with Multi-Tenant Applications

Multi-tenancy refers to the software architecture principle where a single instance of software runs on a server that is accessible to multiple groups of users.

By using a single Auth0 account for all of your applications, you maintain simplicity in your architecture and are able to manage all of your authentication flows in one place. Only if you need to share access to the Management Dashboard with individual applications would you need to create multiple Auth0 accounts (see this [GitHub repo](https://github.com/auth0/auth0-multitenant-spa-api-sample) for a sample application using this architecture scheme).

In Auth0, there are many ways you can handle multi-tenancy. While this article will cover several of the options available, it is by no means comprehensive. For additional assistance on how you can customize Auth0, please contact [Sales](https://auth0.com/?contact=true).

## Use User Metadata

For many users, we find that creating a single [Connection](/identityproviders) is sufficient. You can then control user access to one or more [Clients](/clients) by assigning the appropriate `metadata` value(s) to the user.

[Metadata](/metadata) in Auth0's user profile is a generic way of associating information to any authenticated user. **Permissions**, **Groups**, and **Roles** are all special cases of these attributes.

### Sample Implementations Using Metadata

The following examples describe architecture scenarios, followed by one possible implementation using Auth0's metadata fields.

#### Example 1

You have an app that allows a user to join one or more team(s). Each team is a tenant, and users can switch between teams using the app. Within that team, each user has differing levels of access.

##### Auth0 User Profile

Here's a sample user profile that captures the requirements described above.

```json
{
  "email": "employee@example.com",
  "app_metadata": {
    "permissions": {
      "team-1": {
        "role": "admin",
        "channels": ["*"]
      },
      "team-2": {
        "role": "employee",
        "channels": [ "channel-1", "channel-2" ]
      }
    }
  }
}
```

#### Example 2

Your app asks the user to provide their email.

**If the email domain matches one associated with a previously-registered organization**, the app hides the password box and displays a message indicating that they can use Single Sign On. When the use clicks **Continue**, they're redirected to the appropriate identity provider.

**If the email domain does not match an organization that allows Single Sign On**, the user must enter their password before clicking **Continue**.

Once authenticated, the user has access to files that they own, as well as any that were shared with them. Account-wise, the user has access to their personal account and the accounts of any organizations to which they belong.

::: note
Storing explicit details regarding a user's permissions levels in the `user_profile` may be unwieldy due to its large size. As such, you might consider doing this at the `company` level, rather than at the `user` level.
:::

##### Auth0 User Profile

Here's a sample user profile that captures the requirements described above.

```json
{
  "email": "user@example.com",
  "app_metadata": {
    "permissions": {
      "personal": {
        "role": "full",
      },
      "company1": {
        "role": "user",
      },
      "company2": {
        "role": "admin",
      }
    }
  }
}
```

#### Example 3

The overall architecture includes the following features:

* A single [Auth0 Dashboard](${manage_url}) that manages all apps;
* Support for the following Social providers: Google, GitHub, and Microsoft Live;
* Support for Username/Password Authentication;
* Support for Enterprise connections;
* Home realm discovery using email domains.

Because a user can have access to multiple apps, each with its own permissions level (for example, the user can be an admin for App A, but just a regular user on App B), we show this by assigning a `user_id` property to an **account-level** entity (for administrative permissions) or an **app-level** entity (for user-level permissions).

##### Auth0 User Profile

```json
{
  "email": "user@example.com",
  "app_metadata": {
    "permissions": {
      "company1": {
        "role": "full",
        "clients": [ "*" ]
      },
      "company2": {
        "role": "app-owner",
        "clients": [ "iae..." ]
      }
    }
  }
}
```

## Use Multiple Connections

While using multiple [Connections](/identityproviders) introduces additional layers of complexity, there are several scenarios where this option might make sense:

* You have different Connection-level requirements, such as varying password policies, for each of your Clients.
* You have users from different Connections. For example, one app may have users providing username/password credentials, while another app handles Enterprise logins.

::: warning
Please be aware that Auth0 enforces a limit of 50 Database Connections for a single Client.
:::

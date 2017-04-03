---
description: This articles describes how to implement and use Auth0 with multi-tenancy.
toc: true
---

# Using Auth0 with Multi-Tenant Applications

*Multi-tenancy* refers to the software architecture principle where a single instance of software runs on a server that is accessible to multiple groups of users (each referred to as a *tenant* and represented in Auth0 as a *Client*).

In Auth0, there are many ways you can handle multi-tenancy. While this article will cover several of the options available, it is by no means comprehensive. For additional assistance on how you can customize Auth0, please contact [Sales](mailto:sales@auth0.com).

## Use Metadata

For many users, we find that creating a single Connection is sufficient. You can then control user access to one or more Clients by assigning the appropriate `metadata` value(s) to the user.

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

**If the email domain matches one associated with a previously-registered organization**, the app hides the password box and displays a message indicating that they can use Single Sign On. When the use clicks *Continue*, they're redirected to the appropriate identity provider.

**If the email domain does not match an organization that allows Single Sign On**, the user must enter their password before clicking *Continue*.

Once authenticated, the user has access to files that they own, as well as any that were shared with them. Account-wise, the user has access to their personal account and the accounts of any organizations to which they belong.

:::panel-info Using Company Roles
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

## Use Multiple Connections

While using multiple Connections introduces additional layers of complexity, there are several scenarios where this option might make sense:

* You have different Connection-level requirements, such as varying password policies, for each of your Clients.

### Sample Implementations Using Multiple Connections

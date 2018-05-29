---
section: libraries
description: How to select different connection types for multiple login options with Lock V10.
tags:
  - libraries
  - lock
  - connections
---
# Selecting the Connection in Lock

<%= include('../../../_includes/_version_warning_lock') %>

Auth0 allows you to offer your users multiple ways of authenticating. This is especially important with SaaS, multi-tenant apps, in which a single app is used by many different organizations, each one of which is potentially using different systems such as LDAP, Active Directory, Google Apps, or username/password stores.

![](/media/articles/hrd/sd4h-6wlwOsQA1PCQKLAmtQ.png)

::: note
Selecting the appropriate Identity Providers from multiple options is called "Home Realm Discovery". A pompous name for a simple problem.
:::

## Option 1: Programmatically

When you initiate an authentication transaction with Auth0 you can optionally send a `connection` parameter. This value maps directly with any connection defined in the [Dashboard](${manage_url}).

If using the [Lock](/libraries/lock/v10), this is as simple as initiating Lock with the following option:

```js
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  {
    allowedConnections: ['YOUR CONNECTION HERE'];
  }
);
```

::: note
Note that you can also provide the `allowedConnections` option to the `lock.show()` method if providing it at instantiation is not ideal for your use case. Please refer to the [API documentation](/libraries/lock/v10/api#show-) for the `show` method for more information.
:::

There are multiple practical ways of determining which of your `connection` value to indicate for any given user. Here are two common scenarios:

* You can use vanity URLs: `https://{connection}.yoursite.com` or `https://www.yoursite.com/{connection}`. When a user arrives at your application with the vanity URL, you can pick up that value and pass it to Lock as the `allowedConnections` value.
* You can just ask the user to pick from a list of all of your available connections (or those you want to be chosen from) at some point, and then show only that connection to that user.
* You could use non-human-readable connection names and use some external mechanism to map these to users (for example, through a primary verification, out of band channel for example).

::: note
The first two methods above assume it is acceptable for your app to disclose the names of all of your connections, which may not be appropriate for your application.
:::

## Option 2: Using Email Domains with Lock

The [Lock](/libraries/lock/v10) has built in functionality for identity provider selection. For social connections it will show logos for all those enabled in that particular app.

An additional feature in the Lock is the use of email domains as a way of routing authentication requests. Enterprise connections in Auth0 can be mapped to `domains`. For example, when configuring an ADFS or a SAML-P identity provider:

![](/media/articles/libraries/lock/enterprise-connection.png)

If a connection has domains mapped to it, then the password input field gets disabled automatically when a user is typing an e-mail with a mapped domain.

![Lock using HRD/SSO](/media/articles/libraries/lock/hrd-sso.png)

In the example above the domain `auth0.com` has been mapped to an enterprise connection.

Notice that you can associate multiple domains to a single connection.

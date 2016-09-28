---
description: How to select different connection types for multiple login options with Lock V10.
---

# Selecting the connection in Auth0 for multiple login options

Auth0 allows you to offer your users multiple ways of authenticating. This is especially important with SaaS, multitenant apps in which a single app is used by many different organizations, each one potentially using different systems: LDAP, Active Directory, Google Apps, or username/password stores.

![](/media/articles/hrd/sd4h-6wlwOsQA1PCQKLAmtQ.png)

> Selecting the appropriate Identity Providers from multiple options is called "Home Realm Discovery". A pompous name for a simple problem.

## Option 1: programmatically
When you initiate an authentication transaction with Auth0 you can optionally send a `connection` parameter. This value maps directly with any __connection__ defined in your dashboard.

If using the [Lock](/lock), this is as simple as writing:

	auth0.show({connections: ['YOUR_CONNECTION']});


Notice that this is equivalent of just navigating to:

	https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=YOUR_CONNECTION

There are multiple practical ways of getting the `connection` value. Among the most common ones:

* You can use __vanity URLs__: `https://{connection}.yoursite.com` or `https://www.yoursite.com/{connection}`
* You can just ask the user to pick from a list (notice [there's an API](/api/v1#!#get--api-connections) to retrieve all connections available)

> These two methods assume it is acceptable for your app to disclose the names of all companies you are connected to. Sometimes this is not the case.

* You could use non-human-readable connection names and use some external mechanism to map these to users (e.g. through a primary verification, out of band channel for example).

## Option 2: using email domains with Lock

The [Lock](/lock) has built in functionality for identity provider selection. For social connections it will show logos for all those enabled in that particular app.

An additional feature in the Lock is the use of email domains as a way of routing authentication requests. Enterprise connections in Auth0 can be mapped to `domains`. For example, when configuring an ADFS or a SAML-P identity provider:

![](/media/articles/hrd/k_LcfC8PHp.png)

If a connection has this setup, then the password textbox gets disabled automatically when typing an e-mail with a mapped domain:

![](/media/articles/hrd/R7mvAZpSnf.png)

In the example above the domain `companyx.com` has been mapped to an enterprise connection.

Notice that you can associate multiple domains to a single connection.

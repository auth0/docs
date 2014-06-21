# Selecting the connections in Auth0 for multiple login options 

Auth0 allows you to offer your users multiple ways of authenticating. This is especially frequent with SaaS, multitenant apps in which a single app is used by many different organizations, each one potentially using different systems: LDAP, Active Directory, Google Apps, or username/password stores.

![]()

> Selecting the appropriate Identity Providers from multiple options is called "Home Realm Discovery". A pompous name for a simple problem.

##Option 1: routing requests with a specific connection option
When you initiate an authentication transaction with Auth0 you can optionally send a `connection` parameter. This value maps directly with any __connection__ defined in your dashboard.

If using the [Login Widget](login-widget2), this is as simple as writing:

	auth0.signin({connection: 'YOUR_CONNECTION'});


Notice that this is equivalent of just navigating to:

	https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=code&redirect_uri=@@account.callback@@&state=OPAQUE_VALUE&connection=YOUR_CONNECTION

There are multiple practical ways of getting th `connection`. Among the most common ones:

* You can use __vanity URLs__: `https://{connection}.yoursite.com` or `https://www.yoursite.com/{connection}`
* You can just ask the user to pick from a list (notice [there's an API](https://docs.auth0.com/api#!#get--api-connections) to retrieve all connections available)

> Notice that these two methods assume it is acceptable for your app to disclose the names of all companies you are connected to. Sometimes this is not the case.

* You could use non-human-readable connection names and use some external mechanism to map these to users (e.g. through a primary verification, out of band channel for example).

##Option 1: using the Login Widget

The [Login Widget](login-widget2) has built in functionality for identity provider selection. For social connections it will show logos for all enabled in that app. 

An additional feature in the widget is the use of email domains as a way of routing authentication requests. Enterprise connections in Auth0 can be mapped to `domains`. For example, when configuring an ADFS or a SAML-P identity provider:

![](/img/hrd-adfs.png)

If a connection has this setup, then the password textbox gets disabled automatically when typing an e-mail with a mapped domain:

![](/img/hrd-loginwidget.png)

In the example above the domain `qraftlabs.com` has been mapped to an enterprise connection.

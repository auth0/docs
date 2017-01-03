---
section: libraries
description: Describes different options for selecting the connection in Auth0 when there are multiple login options for Lock v9.
---

<%= include('../_includes/_lock-version-9') %>

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

## Option 3: adding custom buttons to Lock

Using [Lock](/lock)'s [support for customization and extensibility](/libraries/lock/customization) it's also possible to add buttons for your Custom Social or Enterprise Connections. The following example (written in jQuery) adds a button for Azure AD to Lock:

```
var lock = new Auth0Lock(cid, domain);
lock.once('signin ready', function() {
  var link = $('<a class="a0-zocial a0-waad" href="#">' +
    '<span>Login with Fabrikam Azure AD</span></a>');
  link.on('click', function() {
    lock.getClient().login({
      connection: 'fabrikamdirectory.onmicrosoft.com'
    });
    return false;
  });


  $('.a0-iconlist', this.$container)
    .append(link)
    .removeClass('a0-hide');
});

lock.show({
  connections: ['facebook', 'google-oauth2', 'windows-live']
});
```

This is useful when you want to give users a consistent login experience where they click on the connection they want to use.

![](/media/articles/hrd/hrd-custom-buttons-lock.png)

Lock's stylesheet contains the following provider icons which can be used when adding custom buttons:

```
.a0-amazon
.a0-aol
.a0-baidu
.a0-box
.a0-dropbox
.a0-dwolla
.a0-ebay
.a0-evernote
.a0-exact
.a0-facebook
.a0-fitbit
.a0-github
.a0-gmail
.a0-google
.a0-googleplus
.a0-guest
.a0-ie
.a0-instagram
.a0-linkedin
.a0-miicard
.a0-office365
.a0-openid
.a0-paypal
.a0-planningcenter
.a0-renren
.a0-salesforce
.a0-sharepoint
.a0-shopify
.a0-soundcloud
.a0-stackoverflow
.a0-thecity
.a0-thirtysevensignals
.a0-twitter
.a0-vk
.a0-waad
.a0-weibo
.a0-windows
.a0-wordpress
.a0-yahoo
.a0-yammer
.a0-yandex
```

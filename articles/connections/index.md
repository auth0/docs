---
url: /identityproviders
description: Auth0 is an identity hub that supports the many authentication providers listed here.
---

<style>
.connection {
  padding: 15px;
  /*border: 1px solid $gray-lighter;*/
}
.connection-content {
  text-align: center;
  min-height: 150px;
}
.connection-content:before {
  content: ' ';
  display: inline-block;
  vertical-align: middle;
  height: 90px;
}
.connection-image-wrap {
  display: inline-block;
  vertical-align: middle;
}
.connection-image-wrap img {
  max-height: 80px;
  max-width: 120px;
}
</style>

# Identity Providers Supported by Auth0

Auth0 is an identity hub that supports many authentication providers using various protocols: **OAuth2**, **WS-Federation**, etc. Auth0 supports [Social](#social), [Enterprise](#enterprise), [Database](#database-and-custom-connections) and [Passwordless](#passwordless) connections.

## Social

Auth0 supports the following social providers out of the box. You can also use any [OAuth2 Authorization Server](/connections/social/oauth2).

<% var socialConnections = _.sortBy(cache.find('connections/social'), 'index'); %>
<%= include('./_connections', { connections: socialConnections }) %>

## Enterprise

<% var enterpriseConnections = _.sortBy(cache.find('connections/enterprise'), 'index'); %>
<%= include('./_connections', { connections: enterpriseConnections }) %>

## Database and Custom Connections

If you want to create your own user store, instead of using external identity providers like Google or Facebook, you can use a Database Connection. This way you can can authenticate users with an email or username and a password. The credentials can be securely stored either in the Auth0 user store, or in your own database.

You can create any number of custom fields and store this information as part of the `user_metadata`. You can easily import users from a legacy user store, enable or disable sign ups, configure your password policy or enable Multifactor Authentication.

For more details refer to the [Database Connections](/connections/database) documentation.

## Passwordless
Full documentation on Passwordless authentication can be found at the links below:

<ul>
<li><a href="/connections/passwordless">Passwordless Authentication Overview</a></li>
<% _.forEach(_.sortBy(cache.find('connections/passwordless'), 'connection'), function(article) { %>
  <% if (article.connection) { %>
    <li>
      <% if (article.public === false) { %>
        <%- article.connection %>
      <% } else { %>
        <a href="<%- '/docs' + article.url %>"><%- article.connection %></a>
      <% } %>
    </li>
  <% } %>
<% }); %>
</ul>


## Additional Information

Auth0 sits between your app and the identity provider that authenticates your users. Through this level of abstraction, Auth0 keeps your app isolated from any changes to and idiosyncrasies of each provider's implementation. In addition, Auth0's [normalized user profile](/user-profile) simplifies user management.

**Note:** The relationship between Auth0 and any of these authentication providers is referred to as a 'connection'.

Auth0 is a multi-tenant service. When you register with Auth0, you get your own namespace (${account.namespace}). Many of these identity providers require registration and you will need to provide a `return url`. This will always be:

`https://${account.namespace}/login/callback`

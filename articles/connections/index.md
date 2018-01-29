---
url: /identityproviders
description: Auth0 is an identity hub that supports the many authentication providers listed here.
---

<style>
.connections-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.connections-container:after {
  content: '';
  flex: auto;
}
.connection {
  padding: 24px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-basis: 23%;
  margin-bottom: 16px;
  margin-right: 2.6666666%;
  overflow: hidden;
  transition: transform 0.2s, border 0.2s;
}
.connection:nth-child(4n) {
  margin-right: 0;
}
@media (max-width: 768px) {
  .connection {
    flex-basis: 48%;
    margin-right: 4%;
  }
  .connection:nth-child(2n){
    margin-right: 0;
  }
}
.connection.connection-public:hover {
  border: 1px solid rgb(10, 132, 174);
  transform: scale(1.02);
}
.connection-content {
  text-align: center;
}

.connection-title {
  font-size: 18px;
  margin-top: 16px;
  margin-bottom: 0;
  line-height: 1.2em;
}

.connection-image-wrap {
  display: inline-block;
  vertical-align: middle;
}
.connection-image-wrap img {
  max-height: 60px;
  max-width: 60px;
}
</style>

# Identity Providers Supported by Auth0

Auth0 is an identity hub that supports many authentication providers using various protocols: **OAuth2**, **WS-Federation**, and so on that Auth0 supports [Social](#social), [Enterprise](#enterprise), [Database](#database-and-custom-connections) and [Passwordless](#passwordless) connections.

## Social

Auth0 supports the following social providers out of the box. You can also use any [OAuth2 Authorization Server](/connections/social/oauth2).

<% var socialConnections = cache.find('articles/connections/social', {sort: 'index'}); %>
<%= include('./_connections', { connections: socialConnections }) %>

## Enterprise

<% var enterpriseConnections = cache.find('articles/connections/enterprise', {sort: 'index'}); %>
<%= include('./_connections', { connections: enterpriseConnections }) %>

## Legal identities

Through our partner Criipto we offer a growing range of government and bank identities tied to legal persons. 
<% var criiptoConnections = cache.find('articles/connections/criipto', {sort: 'index'}); %>
<%= include('./_connections', { connections: criiptoConnections }) %>

If the one you need isn't found here we suggest getting in touch with [Criipto](https://criipto.com).

## Database and Custom Connections

If you want to create your own user store, instead of using external identity providers like Google or Facebook, you can use a Database Connection. This way you can can authenticate users with an email or username and a password. The credentials can be securely stored either in the Auth0 user store, or in your own database.

You can create any number of custom fields and store this information as part of the `user_metadata`. You can easily import users from a legacy user store, enable or disable sign ups, configure your password policy or enable Multifactor Authentication.

For more details refer to the [Database Connections](/connections/database) documentation.

## Passwordless
Full documentation on Passwordless authentication can be found at the links below:

<ul>
<li><a href="/connections/passwordless">Passwordless Authentication Overview</a></li>
<% cache.find('articles/connections/passwordless', {sort: 'connection'}).forEach(article => { %>
  <% if (article.connection) { %>
    <li>
      <% if (article.public === false) { %>
        <%- article.connection %>
      <% } else { %>
        <a href="<%- article.url %>"><%- article.connection %></a>
      <% } %>
    </li>
  <% } %>
<% }); %>
</ul>

## Additional Information

Auth0 sits between your app and the identity provider that authenticates your users. Through this level of abstraction, Auth0 keeps your app isolated from any changes to and idiosyncrasies of each provider's implementation. In addition, Auth0's [normalized user profile](/user-profile) simplifies user management.

::: note
The relationship between Auth0 and any of these authentication providers is referred to as a 'connection'.
:::

Auth0 is a multi-tenant service. When you register with Auth0, you get your own namespace (${account.namespace}). Many of these identity providers require registration and you will need to provide a `return url`. This will always be:

`https://${account.namespace}/login/callback`

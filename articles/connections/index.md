---
url: /identityproviders
---

# Identity Providers supported by Auth0

Auth0 is an "identity hub" that supports a number of authentication providers using different protocols: **OAuth2**, **WS-Federation**, etc.

Auth0 supports the following identity providers:

## Enterprise
<ul>
<% _.forEach(_.sortBy(articles.findByHash('connections/enterprise').items, 'connection'), function(article) { %>
  <li>
    <a href="<%- env.BASE_URL + article.url %>"><%- article.connection %></a>
  </li>
<% }); %>
</ul>

## Social

Auth0 supports the following social providers out of the box. Additionally, you can add any [OAuth2 Authorization Server](/connections/social/oauth2).

<ul>
<% _.forEach(_.sortBy(articles.findByHash('connections/social').items, 'connection'), function(article) { %>
  <li>
    <a href="<%- env.BASE_URL + article.url %>"><%- article.connection %></a>
  </li>
<% }); %>
</ul>

## Database and Custom Connections

<ul>
<% _.forEach(_.sortBy(articles.findByHash('connections/database').items, 'connection'), function(article) { %>
  <li>
    <a href="<%- env.BASE_URL + article.url %>"><%- article.connection %></a>
  </li>
<% }); %>
</ul>

## Passwordless

<ul>
<% _.forEach(_.sortBy(articles.findByHash('connections/passwordless').items, 'connection'), function(article) { %>
  <li>
    <a href="<%- env.BASE_URL + article.url %>"><%- article.connection %></a>
  </li>
<% }); %>
</ul>


## Additional Information

Auth0 sits between your app and the identity provider that authenticates your users. Through this level of abstraction, Auth0 keeps your app isolated from any changes to and idiosyncrasies of each provider's implementation. In addition, Auth0's [normalized user profile](/user-profile) simpifies user management.

**Note:** The relationship between Auth0 and any of these authentication providers is called a 'connection'

Auth0 is a multi-tenant service. When you register with Auth0, you get your own namespace (${account.namespace}). Many of these identity providers require registration and you will need to provide a `return url`. This will always be:

	https://${account.namespace}/login/callback

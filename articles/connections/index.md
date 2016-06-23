---
url: /identityproviders
description: Auth0 is an identity hub that supports the many authentication providers listed here.
---

# Identity Providers Supported by Auth0

Auth0 is an identity hub that supports many authentication providers using various protocols: **OAuth2**, **WS-Federation**, etc. Auth0 supports **Social**, **Enterprise**, **Database** and **Passwordless** connections.

## Social

Auth0 supports the following social providers out of the box. You can also use any [OAuth2 Authorization Server](/connections/social/oauth2).

<table width="100%">
<tr>
<% var i=0; _.forEach(_.sortBy(articles.findByHash('connections/social').items, 'index'), function(article) { %>
<% if (article.connection) { %> 
<td align="center">
      <% if (article.public === false) { %>
        <%- article.connection %>
      <% } else { %>
        <a href="<%- '/docs' + article.url %>">
        <% if (article.image) { %>
        <img width="75" src="<%- '/docs' + article.image %>"><br><% } %><%- article.connection %></a>
      <% }; %>
</td>
  <% i++; if (i==3){i=0; %>
</tr>  
<% }  } %>
<% }); %>
</tr>
</table>

## Enterprise
<ul>
<% _.forEach(_.sortBy(articles.findByHash('connections/enterprise').items, 'connection'), function(article) { %>
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

## Database and Custom Connections

Auth0 provides database connections to authenticate users with an email or username and a password and securely store these credentials in the Auth0 user store, or in your own database. See [Database Connections](/connections/database) for the full documentation.

## Passwordless
Full documentation on Passwordless authentication can be found at the links below:

<ul>
<li><a href="/connections/passwordless">Passwordless Authentication Overview</a></li>
<% _.forEach(_.sortBy(articles.findByHash('connections/passwordless').items, 'connection'), function(article) { %>
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

**Note:** The relationship between Auth0 and any of these authentication providers is referred to a 'connection'.

Auth0 is a multi-tenant service. When you register with Auth0, you get your own namespace (${account.namespace}). Many of these identity providers require registration and you will need to provide a `return url`. This will always be:

`https://${account.namespace}/login/callback`

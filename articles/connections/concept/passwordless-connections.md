---
title: Passwordless Connections
description: Learn about passwordless connections.
topics:
  - authentication
  - applications
  - dashboard
contentType: concept
useCase:
  - add-login
---
# Passwordless Connections

Passwordless Connections allow users to login without the need to remember a password. This improves the user experience, especially on mobile apps, since users will only need an email address or phone number to register for your application.

Without passwords, your app will not need to implement a password reset procedure and users avoid the insecure practice of using the same password for many purposes. In addition, the credential used for authentication is automatically validated since the user just entered it at sign-up.

## Keep Reading

- [Passwordless Authentication Overview](/connections/passwordless)

<ul>
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

---
url: /libraries/lock-android
---

# Lock Android

Integrate [SSO](/sso) with [Auth0](https://auth0.com), add login and sign up dialogs in your app, even with social connections integrated, in a few simple steps.


## Overview

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps and Salesforce.

Lock facilitates your client-side authentication development, by:

* **Integrating** your Android app with **Auth0**.
* Providing a **beautiful native UI** to log your users in.
* Providing support for **Social Providers** (Facebook, Google, etc.), **Enterprise Providers** (AD, LDAP, etc.) and **Username & Password**.
* Enabling a Passwordless authentication using **SMS or Email**.

## Table of Content

<ul>
<% _.forEach(_.sortBy(articles.findByHash('libraries/lock-android').items, 'toc_title'), function(article) { %>
  <% if (article.toc_title) { %>
  <li>
    <span><a href="<%- '/docs' + article.url %>"><%- article.toc_title %></a>
    <% if (article.description) { %>
      - <%- article.description %>
    <% } %>
    </span>
  </li>
  <% } %>
<% }); %>
</ul>

## Quickstarts

Complementary with these docs, you should refer to the [**Android**](https://auth0.com/docs/quickstart/native/android) quickstarts, to learn the main concepts of Lock integration in your Android apps. You can find complete examples and sample projects there.
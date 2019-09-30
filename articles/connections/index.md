---
url: /identityproviders
section: articles
classes: topic-page
title: Connections
description: Learn about connections and types of identity providers supported by Auth0.
topics:
  - connections
contentType: 
    - index
useCase:
  - customize-connections
  - add-idp
---
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Connections</h1>
  <p>Introduction to the various sources of users for applications, including identity providers, databases, and passwordless authentication methods.</p>
</div>

A connection is the relationship between Auth0 and a source of users, which may include identity providers (such as Google or LinkedIn), databases, or passwordless authentication methods. Auth0 sits between your application and its sources of users, which adds a level of abstraction so your application is isolated from any changes to and idiosyncrasies of each source's implementation.

You can configure any number of connections for your applications to use in the Auth0 Dashboard. To view all the connections that you have configured or create new ones, see [View Connections](/dashboard/guides/connections/view-connections).

By default, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. You can [optionally disable this synchronization](/dashboard/guides/connections/configure-connection-sync) to allow for updating profile attributes from your application.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/connections/identity-providers-social">Identity Providers Supported by Auth0</a>

Identity Providers are servers that can provide identity information to other servers. Auth0 supports many Identity Providers using various protocols (like <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn>, <dfn data-key="security-assertion-markup-language">[SAML](/protocols/saml)</dfn>, [WS-Federation](/protocols/ws-fed), and more).
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/connections/identity-providers-social">Social Identity Providers</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/connections/identity-providers-enterprise">Enterprise Identity Providers</a>
      </li>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/connections/identity-providers-legal">Legal Identity Providers</a>
      </li>
    </ul>
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/connections/database">Database and Custom Connections</a>

If you want to create your own user store, instead of using external identity providers like Google or Facebook, you can use a Database Connection. This way you can authenticate users with an email or username and a password. The credentials can be securely stored either in the Auth0 user store or in your own database.
  </li>
  <li>
      <i class="icon icon-budicon-715"></i><a href="/connections/passwordless">Passwordless</a>

<dfn data-key="passwordless">Passwordless</dfn> connections allow users to log in without the need to remember a password. Instead, users enter their mobile phone number or email address and receive a one-time code or link, which they can then use to log in.
  </li>
</ul>
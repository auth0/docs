---
description: Classic Universal Login Experience
topics:
  - login
  - universal-login
contentType: index
---
# Classic Universal Login Experience

Auth0's Classic <dfn data-key="universal-login">Universal Login</dfn> experience is built on top of Auth0's JavaScript libraries <dfn data-key="lock">([Lock.js](/libraries/lock)</dfn>, [auth0.js](/libraries/auth0js), MFA Widget, Password Reset). Compared to the New Universal Login experience, it currently offers a more complete feature set.

When you [customize the HTML in the Dashboard](${manage_url}/#/login_page) for Universal Login pages, the default templates will also use the same JavaScript libraries, so from a UX and functional perspective, the transition between the default user interface and a custom one is more natural.

The Classic Experience has extensive [customization options](/universal-login/advanced-customization) available. After choosing one of the templates, you can modify them to meet your needs. The Lock widget, if used, has a variety of both appearance and behavior options that can be changed. The Auth0.js based templates have even more flexibility, as the UI is entirely custom made and can be modified to match your application's styles if you wish to do so.

Given that it is being used by a significant percentage of Auth0 customers, the Classic Universal Login Experience will be maintained for the foreseeable future. However, the majority of significant new feature development will be done on the [New Universal Login Experience](/universal-login/new).

## Implement Universal Login

<%= include('./_implement_universal_login') %>

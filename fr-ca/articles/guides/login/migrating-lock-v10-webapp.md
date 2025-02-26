---
title: Moving Web Applications using Lock to Universal Login 
description: Learn how to migrate from Web Applications using Lock to Universal Login
toc: true
topics:
  - lock
  - migrations
  - web-apps
  - universal-login
contentType:
    - how-to
useCase: migrate
---
# Migrate Web Applications using Lock 10+ to Universal Login

This document explains how to migrate Web Applications using [Lock 10+](/libraries/lock) to Universal Login. For other migration scenarios see [Migrating from Embedded to Universal Login](/guides/login/migration-embedded-universal).

When you use Lock in a Web Application, your code does basically this:

1. Initialize Lock using `responseType = 'code'`:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
     auth: {
      redirectUrl: '${account.callback}',
      responseType: 'code',
      params: {
        scope: 'openid profile email'
      }
    }
}); 
```
2. Show Lock when a login is required:

```js
function login() {
    lock.show();
}
```

<%= include('_includes/_centralized_webapp') %>

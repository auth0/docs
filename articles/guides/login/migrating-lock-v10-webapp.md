---
title: Moving Web Applications using Lock to Centralized Login 
description: Learn how to migrate from Web Applications using Lock to Centralized Login
toc: true
---
# Migrate Web Applications using Lock 10+ to Centralized Login

This document explains how to migrate Web Applications using Lock to centralized login. 

For other migration scenarios see [Migrating from Embedded to Centralized Login](/guides/login/migration-embedded-centralized).

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
2. Show lock when a login is required:

```js
function login() {
    lock.show();
}
```

<%= include('_includes/_centralized_webapp') %>
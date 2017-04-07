---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Hapi.js API
---

<%= include('../_includes/_api_scope_description') %>

Individual routes can be configured to look for a particular `scope` in the `access_token` using `auth.scope`.

```js
// server.js

// ...

server.route({
  method: 'GET',
  path: '/api/private/admin',
  config: {
    auth: {
      scope: 'read:messages'
    },
    handler: (req, res) => {
      res({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
    }
  }
});
```

With this configuration in place, only `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.
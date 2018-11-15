---
description: Read metadata using rules and Auth0 APIs.
topics: 
   - metadata
   - rules
contentType: how-to
useCase: manage-users
docsv2: true
oldDoc: /metadata/index.md
---

# Read Metadata

You can read the user's `user_metadata` properties the same way you would for any user profile property. This example retrieves the value associated with `user_metadata.hobby`:

```js
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```

::: note
For details on how to initialize `lock` refer to [new Auth0Lock(clientID, domain, options)](https://github.com/auth0/lock#new-auth0lockclientid-domain-options)
:::

## Keep Reading

* [Manage User Metadata with APIs](/users/guides/manage-user-metadata-with-apis)
* [User Data Storage Best Practices](/users/references/user-data-storage-best-practices)
* [Change User Pictures](/users/guides/change-user-pictures)


::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](/libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](/libraries/lock/v10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

# Lock: Initialization

```javascript
// Initialize with clientID and domain
var lock = new Auth0Lock(clientID, domain);

// Initialize with options
var lock = new Auth0Lock(clientID, domain, options);
```

- **clientID {String}**: Your application clientID in Auth0. ```${account.clientId}```
- **domain {String}**: Your Auth0 domain. Usually ```${account.namespace}```.

- **options {Object}**: See the [customization](/libraries/lock/v10/customization.md) page for more detail on the options available.

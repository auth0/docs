---
description: General troubleshooting steps for extensions.
toc: true
topics:
  - extensions
  - troubleshooting
  - errors
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - troubleshooting
---
# Troubleshoot Extensions

If you see issues with your [extensions](/extensions), we recommend that you begin the troubleshooting process with the following two steps:

1. Reinstalling the extension
2. Migrating to Node.js v8

## Reinstall the extension

One of the first things you can do when running into issues with an extension is to reinstall it:

1. Go to [Dashboard > Extensions](${manage_url}/#/extensions).
2. On the **Installed Extensions** tab, delete the extension.
3. Log out of the Auth0 Dashboard.
4. Log back in to the Auth0 Dashboard.
5. Reinstall and reconfigure the extension.

## Migrate to Node.js v8

Many Auth0 extensions rely on modules that use Node.js v8. If your tenant still uses Node.js v4, you may have issues running extensions or get errors such as:

```
Compilation failed: Cannot find module 'auth0-source-control-extension-tools'
```

We recommend changing your tenant's extensibility runtime from Node.js v4 to Node.js v8. Before updating, however, review the [migration guide](/migrations/guides/extensibility-node8) for full details on what will be affected by this change.

You can change the Node.js runtime version by going to the **Extensibility** section in [Tenant Settings > Advanced](https://manage.auth0.com/#/tenant/advanced).

## Contact Support

If you are still experiencing issues with your extensions, and you need to [contact support](https://support.auth0.com/), please be sure to **include errors logs and/or [real-time Webtask logs](/extensions/realtime-webtask-logs) with your support ticket**. Errors and logs can help Auth0 support troubleshoot your issue faster.

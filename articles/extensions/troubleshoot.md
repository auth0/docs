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

# Extensions Troubleshooting

In this article you'll find some general troubleshooting steps for [extensions](/extensions).

## Reinstall the extension

If you run into issues with an extension, first try reinstalling the extension:

1. Go to [Dashboard > Extensions](${manage_url}/#/extensions).
2. On the **Installed Extensions** tab, delete the extension.
3. Log out of the Auth0 Dashboard.
4. Log in to the Auth0 Dashboard.
5. Reinstall and reconfigure the extension.

## Migrate to Node 8

Many Auth0 extensions rely on modules that use Node 8. If your tenant still uses Node 4, you may have issues running extensions or get errors such as:

```
Compilation failed: Cannot find module 'auth0-source-control-extension-tools'
```

We recommend changing your tenant's extensibility runtime from Node 4 to Node 8. Before updating, check out this [migration guide](/migrations/guides/extensibility-node8) to see what may be affected by this change. To change the Node runtime version, go to the **Extensibility** section in [Tenant Settings > Advanced](https://manage.auth0.com/#/tenant/advanced).

## Include errors or logs in support tickets

If you are still experiencing issues and need to [contact support](https://support.auth0.com/), make sure to include errors or [Real-time Webtask Logs](/extensions/realtime-webtask-logs) in your support ticket. Errors and logs can help Auth0 support resolve your issue faster.
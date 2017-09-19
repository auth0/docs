---
title: Installing the Authorization Extension
description: How to install the Authorization Extension
---

# Authorization Extension: Installation

This doc walks you through the process of installing the Authorization Extension.

Before you begin, make sure that you have an existing [client](/client) that can be used with the Authorization Extension. Currently, you can use the following types of clients:

* Native
* Regular Web Applications
* Single Page Applications

Clients without an assigned type or Non Interactive Clients cannot be used with this extension.

::: warning
Installing this extension creates an `auth0-authz` client for your account. **Do not delete this client!** If you uninstall the extension at a later date, this client will be deleted automatically.
:::

## Install the Extension

To install the Authorization Extension, click on the "Auth0 Authorization" box located on the [Extensions](${manage_url}/#/extensions) page of the Management Dashboard. 

You'll be prompted to install the extension and to choose [where you'd like your data stored](#storage-types).

![Install Authorization Extension](/media/articles/extensions/authorization/app-install-v2.png)

Once the extension is installed, you'll see it listed under **Installed Extensions**.

![Installed Extensions](/media/articles/extensions/authorization/installed-extensions-v2.png)

When you click the link to open the extension for the first time, you'll be asked to provide permission for the extension to access your Auth0 account. If you do, you'll be redirected to the Authorization Dashboard.

![Authorization Dashboard](/media/articles/extensions/authorization/auth-dashboard-v2.png)

You can now use the Authorization Extension.
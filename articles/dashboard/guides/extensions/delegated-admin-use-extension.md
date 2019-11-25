---
description: Learn how to use the Delegated Administration Extension, which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard.
topics:
  - extensions
  - delegated-admin
  - dae
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - setup-delegated-admin
  - use-delegated-admin
---
# Use the Delegated Admin Extension

This guide will show you how to use the [Delegated Admin Extension](/extensions/delegated-admin), which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard.

::: warning
Before you can use the Delegated Admin extension, you need to [create a Delegated Admin Dashboard application](/dashboard/guides/extensions/delegated-admin-create-app) in Auth0 and [install the Delegated Admin extension](/dashboard/guides/extensions/delegated-admin-install-extension).
:::

1. Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

2. Click on the row for the **Delegated Administration Dashboard** extension. A new tab will open to display the login prompt.

    ![](/media/articles/extensions/delegated-admin/login-prompt.png)

    Because we disabled signups for the database connection while configuring it, the login screen will not display a Sign Up option.

    Once you provide valid credentials, you will be directed to your custom **Delegated Administration Dashboard** page, which will have the **TITLE** you provided at the top of the page, and if you provided a custom CSS file, that styling will be applied.

    ![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

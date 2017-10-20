---
title: User Import / Export Extension
toc: true
description: The User Import / Export is an extension that allows you to import / export users from or to any database you have configured in your account.
---
# User Import / Export

::: note
The User Import / Export extension is available in the PSaaS Appliance beginning with version `10755` when you have user search enabled.
:::

The **User Import / Export Extension** allows you to:

* Bulk import your existing database users into Auth0
* Search for and export some (or all) of you Auth0 database users

You must be a Dashboard Admin to use this extension.

::: warning
You can export a maximum of 10,000 users. If you need to export more users, please [contact Support](${env.DOMAIN_URL_SUPPORT}).
:::

## Install the Extension

To install this extension, click on **User Import / Export** in the list of provided extensions on the [Extensions page](${manage_url}/#/extensions) of the [Dashboard](${manage_url}). 

The extension does not require any additional configuration before it can be installed, so click **Install** in the informational pop-up window to proceed.

![](/media/articles/extensions/user-import-export/install-extension.png)

## Use the Extension

After you've installed your extension, you'll see it listed in your list of installed extensions. Click on **Import / Export Extension** to launch.

![](/media/articles/extensions/user-import-export/installed-extensions-list.png)

You'll be asked to grant permission for the extension to access your Auth0 account for the listed activities the first time you launch the extension.

![](/media/articles/extensions/user-import-export/permissions.png)

Click the **check mark** to proceed.

There are two ways of using this extension:

* Bulk import your existing database users into Auth0
* Search for and export some (or all) of you Auth0 database users

Both use cases are explained in further detail below.

### Import Users

By default, any time you open the extension, you'll see the **User Import** screen (if you're on the export screen, you can return to this screen by click **Import** in the left-hand navigation bar).

![](/media/articles/extensions/user-import-export/import.png)

To import your users, drag and drop a valid JSON file ([schema and examples here](/tutorials/bulk-importing-users-into-auth0)) onto the area that says **Drop your file here, or click to select**. Alternatively, you can click on this area to browse your files and select the appropriate JSON file. The JSON file should contain the list of users that you are planning to import.

Select the database connection for which your users will be imported. Please make sure that the connection you choose has been enabled for at least one client.

![](/media/articles/extensions/user-import-export/ready-for-import.png)

Click **Start Importing Users** to begin the import process.

When done, you'll see the following **Completed** message.

![](/media/articles/extensions/user-import-export/import-complete.png)

Once you've imported your users, you can manage them individually using the [Users section of the Dashboard](${manage_url/#/users})

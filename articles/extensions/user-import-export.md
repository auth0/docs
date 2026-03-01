---
title: User Import / Export Extension
toc: true
description: The User Import / Export is an extension that allows you to import / export users from or to any database you have configured in your account.
topics:
  - extensions
  - user-import-export
contentType:
  - how-to
useCase: extensibility-extensions
---
# User Import / Export

The **User Import / Export Extension** allows you to:

* Bulk import your existing database users into Auth0
* Search for and export some (or all) of your Auth0 database users

For a list of user profile fields that can be imported and exported, see [User Profile Attributes](/users/references/user-profile-structure#user-profile-attributes).

You must be a Dashboard Admin to use this extension.

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

Select the database connection for which your users will be imported. Please make sure that the connection you choose has been enabled for at least one application.

![](/media/articles/extensions/user-import-export/ready-for-import.png)

Click **Start Importing Users** to begin the import process.

When done, you'll see the following **Completed** message.

![](/media/articles/extensions/user-import-export/import-complete.png)

Once you've imported your users, you can manage them individually using the [Users section of the Dashboard](${manage_url}/#/users)

### Export Users

::: note
Auth0 uses the [ndjson](http://ndjson.org/) format due to the large size of export files. Before you can import users, you'll need to convert from **ndjson** to **json** using the library of your choice (such as [jq](https://stedolan.github.io/jq/)). When exporting users intended to later be imported, user field names should be left as their defaults and not mapped to a Column Name.
:::

To export your existing Auth0 users associated with database connections, select **Export** in the left-hand navigation bar.

![](/media/articles/extensions/user-import-export/export-users.png)

Under **User Fields**, you can decide which user attributes or expressions should be included in the export. The user attribute can be a static value like `user.user_metadata.name`, or it can be a JavaScript expression like `user.user_metadata.name || user.name`. Expressions will be evaluated during the export runtime. The **column name** value is how the value will be represented in the export. 

You can click the **Add Default Fields** button to automatically select the default fields and populate their column names (this is also a good way for you to visualize how parameters/expressions will appear).

You can remove extraneous attributes/expressions by clicking on its associated **trash can** icon.

Under **Settings**, you can:

* Configure how your exported users are listed by providing a **User Attribute** by which users should be sorted (as well as whether the users should be sorted in ascending or descending order)
* Choose your **Export Format**; you can choose between JSON and CSV files

![](/media/articles/extensions/user-import-export/settings.png)

When you're ready, click **Export X Users** (where `X` is the number of users you're exporting).

You can download the file containing your users when the export is complete.

![](/media/articles/extensions/user-import-export/export-complete.png)

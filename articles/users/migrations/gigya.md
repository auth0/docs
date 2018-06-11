---
title: Migrate Users from Gigya to Auth0
description: How to import users from Gigya to Auth0.
crews: crew-2
toc: true
- tags:
  - users
  - user-management
  - migrations
  - gigya
---

# Migrate Users from Gigya to Auth0

The tutorial will walk you through the process of configuring a custom database connection to import users from Gigya. It assumes that you have an Gigya account.

## Configuring the Custom Database Connection

### 1. Create a Custom Database

You can create a new database connection in the [Connections > Database](${manage_url}/#/connections/database) section of the Dashboard.

![Create a new DB Connection](/media/articles/users/migrations/create-database-connection.png)

### 2. Connect the Database to Application

Now you'll need to connect your database to an application. Navigate to the **Applications** tab of your database settings, under the **Applications Using This Connection** heading you can enable the database connection for each application.

![Database Connection Applications](/media/articles/users/migrations/enable-applications.png)

## Export Gigya Users

You can use [Gigya's IdentitySync](https://developers.gigya.com/display/GD/IdentitySync) to transform and export user data to match a target schema. For more details on this process, see [Gigya IdentitySync: Using IdentitySync](https://developers.gigya.com/display/GD/IdentitySync#IdentitySync-apiUsingIdentitySync).

Follow the instructions to transform your Gigya database's user data to [Auth0's user schema](/users/migrations/bulk-import#file-schema) and export the transformed data to JSON format.

## Import Gigya Users 

Next, you can import your Gigya users into Auth0 with the User Import/Export Extension or the Management API.

### Import Users with the User Import / Export Extension

Go to the [Extensions](${manage_url}/#/extensions) section of the Dashboard. Select the **User Import / Export** extension and install it. Once the extension is installed, you can click it to open an import/export interface that looks like this:

![User Import/Export Extension](/media/articles/extensions/user-import-export/import.png)

Drag your exported Gigya users JSON file into the designated upload area and select the database you created earlier. Click the **Start Importing Users** button to begin your import.

::: note
For more information on the User Import / Export Extension, check out the [User Import/Export Extension](/extensions/user-import-export) page.
:::

### Import Users with the Management API

As an alternative option to using the User Import/Export extension, you can leverage the Auth0 Management API to [create a job](/api/management/v2#!/Jobs/post_users_imports) to import your users to Auth0. For further instructions on this process, see the [Bulk User Imports with the Management API](/users/migration/bulk-import) page.

---
title: Alterian Integration
description: Learn how to import your Auth0 user data into Alterian.
toc: true
tags:
    - marketing
    - alterian
---

# Alterian Integration

## Import Users to Alterian

To import your Auth0 users into Alterian:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file into Alterian with the Campaign Manager's Data Import tool.

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Alterian accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

![User Import/Export Extension Format](/media/articles/integrations/marketing/import-export-set-format.png)

At the top in the **Fields** section, provide a **User Field** and **Column Name** for each user attribute to include in the export. For example:

User Field | Column Name
-----------|------------
`email` | Email Address
`created_at` | Created At
`given_name` | First Name
`family_name` | Last Name

![User Import/Export Extension Fields](/media/articles/integrations/marketing/import-export-fields.png)

After adding the user fields, click on the **Export Users** button to start the export. Once the export is complete, download the CSV file to use in the following section.

### Import a User Data File

::: note
[Alterian Campaign Manager: Data Import](http://cm.help.alterian.com/CM404/Default.htm#Customer_Analytics/Import_Export/Data_Import.htm)
:::

To import your CSV file into Alterian, follow these steps:

1. Open your Alterian Campaign Manager and click **Documents**.

2. Choose the directory to import the file to.

3. Click **Upload Files** and select your CSV file.

4. Click **Upload**.

5. Once the upload is complete, open the **Data Import** tool.

6. Configure your import settings using the provided fields on the **New Imports data** window.
    
    ![Data Import: New Imports](/media/articles/integrations/marketing/alterian/new-data-imports.png)

7. After you've reviewed your settings, click **Run Processess**.

That's it! You successfully imported your Auth0 users into Alterian.

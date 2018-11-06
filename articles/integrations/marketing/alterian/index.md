---
title: Export User Data To Alterian
description: Learn how to export your Auth0 user data and import it into Alterian.
toc: true
topics:
    - marketing
    - alterian
contentType: how-to
useCase: export-users-marketing
---

# Export User Data To Alterian

In this article, you’ll learn how to export user data in Auth0 to a CSV file then import it into Alterian with the campaign manager's data import tool.

## Create a user data file

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

## Import a user data file

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

7. After you've reviewed your settings, click **Run Processes**.

That's it! You successfully imported your Auth0 users into Alterian.

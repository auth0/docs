---
title: Export User Data To Salesforce
description: Learn how to export your Auth0 user data and import it into Salesforce.
toc: true
topics:
    - marketing
    - salesforce
contentType: how-to
useCase: export-users-marketing
---

# Export User Data To Salesforce

In this article, you’ll learn how to export user data in Auth0 to a CSV file then import it into Salesforce using the [Data Import Wizard](https://help.salesforce.com/articleView?id=data_import_wizard.htm).

## Create a user data file

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Salesforce accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

![User Import/Export Extension Format](/media/articles/integrations/marketing/import-export-set-format.png)

At the top in the **Fields** section, provide a **User Field** and **Column Name** for each user attribute to include in the export. For example:

User Field | Column Name
-----------|------------
`email` | Email Address
`created_at` | Created At
`given_name` | First Name
`family_name` | Last Name

![User Import/Export Extension Fields](/media/articles/integrations/marketing/import-export-fields.png)

::: note
[Salesforce: Prepare Your Data for Import](https://help.salesforce.com/articleView?id=import_prepare.htm)
:::

After adding the user fields, click on the **Export Users** button to start the export. Once the export is complete, download the CSV file to use in the following section.

## Import a user data file

::: note
[Salesforce: Import Data with the Data Import Wizard](https://help.salesforce.com/articleView?id=import_with_data_import_wizard.htm)
:::

Before you begin, make sure your Salesforce account has the required [user permissions](https://help.salesforce.com/articleView?id=faq_import_general_permissions.htm) to import records.

To import your CSV file into Salesforce, follow these steps:

1. Login to [Salesforce](https://login.salesforce.com/).

2. Navigate to **Setup** and open the **Data Import Wizard**.

4. Click **Launch Wizard**.

5. Configure the import and select your CSV file to upload using the fields provided.

6. Click **Next**.

7. On the **Edit Field Mapping** page, map your CSV file's data fields to Salesforce data fields. Click **Next** to proceed.

8. After you've verified the information on the **Review** page, click **Start Import**.

9. Check out the **Recent Import Jobs** tab on the **Data Import Wizard** home page for updates on the status of your import.

That's it! You successfully imported your Auth0 users into Salesforce.


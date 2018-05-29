---
title: Salesforce Marketing Cloud Integration
description: Learn how to import your Auth0 user data into Salesforce Marketing Cloud.
toc: true
tags:
    - marketing
    - salesforce
    - marketing-cloud
---

# Salesforce Marketing Cloud Integration

## Import Users to Salesforce Marketing Cloud

To import your Auth0 users into Salesforce Marketing Cloud:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file into Salesforce Marketing Cloud using [Email Studio](https://help.marketingcloud.com/en/documentation/exacttarget/getting_started/).

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Salesforce Marketing Cloud accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

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
[Email Studio: Import Subscribers](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/subscribers_for_interactive_marketing_hub/imports/importing_subscribers/)
:::

Before you begin, make sure your Salesforce account has the required [user permissions](https://help.salesforce.com/articleView?id=faq_import_general_permissions.htm) to import records.

To import your CSV file into Salesforce Marketing Cloud, follow these steps:

1. Log in to Salesforce Marketing Cloud and open **Email Studio**.

2. Navigate to **Subscribers > Lists**.

3. Choose the list to import to and select the **Import** action.

4. After the import wizard's introduction, select your CSV file as the **Upload Source** and select CSV as the **Data Format**. Enter the remaining settings and click **Next**.

5. In the **Map Attributes** dialog, map your CSV file's data fields to the correct data fields. When you've finished your mappings click **Next**.

6. After you've verified your mappings in the **Confirmed Mappings** dialog, click **Begin** to start the import.

That's it! You successfully imported your Auth0 users into Salesforce Marketing Cloud.


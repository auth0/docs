---
title: Oracle Eloqua Integration
description: Learn how to import your Auth0 user data into Eloqua.
toc: true
tags:
    - marketing
    - eloqua
    - oracle
---

# Oracle Eloqua Integration

## Import Users to Eloqua

To import your Auth0 users into Eloqua:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file using Oracl Eloqua's contact upload wizard.

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Eloqua accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

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
[Oracle Eloqua Help Center: Uploading Contacts](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/index.html#Help/Contacts/Tasks/UploadingContacts.htm)
:::

To import your CSV file into Eloqua, follow these steps:

1. Log in to Eloqua and navigate to **Audience > Contacts > Upload** to open the **Contact Upload Wizard**.

2. Configure the import using the provided fields on the **Pick Data Source** tab.

3. Click the **Cloud** button and select the file to upload.

4. After you've verified the file contents on the **Review** tab, click **Next Step**.

5. Under the **Map Fields** tab, enter the field mapping settings to match your CSV file data to contact fields. Click **Next Step** to continue.

6. Complete the final step of the wizard and click **Finish**.

That's it! You successfully imported your Auth0 users into Eloqua.
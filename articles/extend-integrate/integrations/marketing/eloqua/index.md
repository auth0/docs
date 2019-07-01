---
title: Export User Data To Oracle Eloqua
description: Learn how to export your Auth0 user data and import it into Oracle Eloqua.
toc: true
topics:
    - marketing
    - eloqua
    - oracle
contentType: how-to
useCase: export-users-marketing
---

# Export User Data To Oracle Eloqua

In this article, you’ll learn how to export user data in Auth0 to a CSV file then import it into Eloqua with the contact upload wizard.

## Create a user data file

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

## Import a user data file

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
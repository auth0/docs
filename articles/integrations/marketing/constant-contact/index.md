---
title: Constant Contact Integration
description: Learn how to import your Auth0 user data into Constant Contact.
toc: true
tags:
    - marketing
    - constant-contact
---

# Constant Contact Integration

## Import Users to Constant Contact

To import your Auth0 users into Constant Contact:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file on the Constant Contact dashboard.

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Constant Contact accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

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
[Constant Contact Knowledge Base: Import or Upload a File of Contact Email Addresses](https://knowledgebase.constantcontact.com/articles/KnowledgeBase/5296-import-or-upload-a-file-of-contact-email-addresses)
:::

To import your CSV file into Constant Contact, follow these steps:

1. [Log in to Constant Contact](https://login.constantcontact.com) and navigate to **Contacts**.

2. From the **Contacts** page, click **Add Contacts > Upload from file**.

3. Provide you CSV file on the **Upload from file** page then click **Continue**.

4. Review the columns and match them with your Constant Contact fields. Once you're finished click **Continue**.

5. On the **Select lists** page, choose the list or lists to add your contacts to.

6. Click **Upload**.

That's it! You successfully imported your Auth0 users into Constant Contact.
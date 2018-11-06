---
title: Export User Data To Watson Campaign Automation
description: Learn how to export your Auth0 user data and import it into Watson Campaign Automation.
toc: true
topics:
    - marketing
    - watson-campaign
contentType: how-to
useCase: export-users-marketing
---

# Export User Data To Watson Campaign Automation

In this article, you’ll learn how to export user data in Auth0 to a CSV file then import it into the Watson Campaign Automation dashboard.

## Create a user data file

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Watson Campaign Automation accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

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
[Watson Campaign Automation: Considerations for importing databases](https://www.ibm.com/support/knowledgecenter/en/SSWU4L/Data/imc_Data/import_details.html)
:::

After adding the user fields, click on the **Export Users** button to start the export. Once the export is complete, download the CSV file to use in the following section.

## Import a user data file

::: note
[Watson Campaign Automation: About importing a database](https://www.ibm.com/support/knowledgecenter/en/SSWU4L/Data/imc_Data/Import_a_Database.html)
:::

To import your CSV file into Watson Campaign Automation, follow these steps:

1. Log in to Watson Campaign Automation and navigate to **Data > Import New**.

2. On the **Select File** step, enter the new database's settings in the provided fields.

3. Select the option to upload a file from a local hard drive, then click **Browse** to select the file.

4. Set the file type to CSV (comma-separated values).

5. Click **Next** to proceed to the **Define Data Format** step.

6. Make sure your data was processed correctly, then click **Next**.

7. On the **Map Fields** step, choose which fields to include in the import as well as their types.

8. Click **Next** to proceed to the **Edit Field Settings** step.

9. Edit the settings on default or new fields as needed.

10. To start the import click **Next**.

That's it! You successfully imported your Auth0 users into Watson Campaign Automation.
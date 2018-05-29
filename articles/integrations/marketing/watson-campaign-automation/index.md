---
title: Watson Campaign Automation Integration
description: Learn how to import your Auth0 user data into Watson Campaign Automation.
toc: true
tags:
    - marketing
    - watson-campaign
---

# Watson Campaign Automation Integration

## Import Users to Watson Campaign Automation

To import your Auth0 users into Watson Campaign Automation:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file (database) on your Watson Campaign Automation dashboard.

### Create a User Data File

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

### Import a User Data File

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
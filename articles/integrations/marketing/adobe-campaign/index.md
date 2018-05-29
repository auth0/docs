---
title: Adobe Campaign Integration
description: Learn how to import your Auth0 user data into Adobe Campaign.
toc: true
tags:
    - marketing
    - adobe
    - adobe-campaign
---

# Adobe Campaign Integration

## Import Users to Adobe Campaign

To import your Auth0 users into Adobe Campaign:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file into Adobe Campaign with the [Adobe Campaign Import Wizard](https://docs.campaign.adobe.com/doc/AC/en/PTF_Importing-Exporting_data_About_generic_import_and_export.html).

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Adobe Campaign accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

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
[Adobe Campaign Documentation: Importing Data](https://docs.campaign.adobe.com/doc/AC/en/PTF_Importing-Exporting_data_Importing_data.html)
:::

Log in to your Adobe Campaign client dashboard and navigate to **Profiles and Targets > Jobs**. Create a new import job by clicking the **Create** button and selecting **New Import**.

A new **Import Wizard** window should open. On the **Template Selection** step you can set your import parameters.

Parameter | Description
----------|------------
Import template (leave as default) | The job template, set to `New text import` by default.
Label | A label for the job, for example: `Importing Auth0 users`.
Description | A brief description of the job.
Import type | Set to `Simple import` for single file imports and `Multiple import` for multiple file imports.
Folder | Select the folder to save the import file to.

![Adobe Campaign Import Wizard Template Selection](/media/articles/integrations/marketing/adobe-campaign/template-selection.png)

Once you've configured your import parameters, click the **Next** button to continue.

On the **File to Import** step upload the user data CSV file you exported from Auth0 in the previous section. Click the **Next** button to proceed to **Field Mapping**.

Next, map the export file schema to your Adobe Campaign database schema. Check that the field names and field types are correct, then click the **Next** button.

![Adobe Campaign Import Wizard Field Mapping](/media/articles/integrations/marketing/adobe-campaign/field-mapping.png)

Complete the remaining configuration steps by defining your data reconciliation mode and selecting a folder, list, or service for the users being imported.

Finally, begin the import by clicking the **Start** button on the **Data Import Execution** window.

![Adobe Campaign Import Wizard Data Import Execution](/media/articles/integrations/marketing/adobe-campaign/import-execution.png)

That's it! You successfully imported your Auth0 users into Adobe Campaign.

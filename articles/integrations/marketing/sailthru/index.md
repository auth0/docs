---
title: Sailthru Integration
description: Learn how to import your Auth0 user data into Sailthru.
toc: true
tags:
    - marketing
    - sailthru
---

# Sailthru Integration

## Import Users to Sailthru

To import your Auth0 users into Sailthru:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file to a list on your Sailthru dashboard.

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Sailthru accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

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
[Sailthru Documentation: Adding Users to Sailthru and Sailthru Lists](https://getstarted.sailthru.com/audience/managing-users/add-users-to-sailthru-and-lists/#List_File_Upload)
:::

To import your CSV file into Sailthru, follow these steps:

1. Log in to Sailthru and navigate to [Lists](https://my.sailthru.com/lists).

2. Choose a list, then click **Upload List** and select your CSV file.

3. Select **Add To List** for the **Action**.

4. Set your **Replace Vars** option and enter an email to receive notifications if desired.

5. Review your settings and click **Submit** to upload the file.

That's it! You successfully imported your Auth0 users into Sailthru.
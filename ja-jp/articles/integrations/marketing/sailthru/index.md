---
title: Export User Data To Sailthru
description: Learn how to export your Auth0 user data and import it into Sailthru.
toc: true
topics:
    - marketing
    - sailthru
contentType: how-to
useCase: export-users-marketing
---

# Export User Data To Sailthru

In this article, you’ll learn how to export user data in Auth0 to a CSV file then import it into the Sailthru dashboard.

## Create a user data file

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

### Import a user data file

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
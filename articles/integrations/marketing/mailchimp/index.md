---
title: MailChimp Integration
description: Learn how to import your Auth0 user data into MailChimp.
toc: true
tags:
    - marketing
    - mailchimp
---

# MailChimp Integration

## Import Users to MailChimp

To import your Auth0 users into MailChimp:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file into MailChimp on the [MailChimp Dashboard](https://login.mailchimp.com/).

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. MailChimp accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

![User Import/Export Extension Format](/media/articles/integrations/marketing/import-export-set-format.png)

At the top in the **Fields** section, provide a **User Field** and **Column Name** for each user attribute to include in the export. For MailChimp, an email field with the column name `Email Address` is required, so make sure to include it. For example:

User Field | Column Name
-----------|------------
`email` | Email Address
`created_at` | Created At
`given_name` | First Name
`family_name` | Last Name

![User Import/Export Extension Fields](/media/articles/integrations/marketing/import-export-fields.png)

::: note
[MailChimp Knowledge Base: Format Guidelines for Your Import File](https://kb.mailchimp.com/lists/growth/format-guidelines-for-your-import-file)
:::

After adding the user fields, click on the **Export Users** button to start the export. Once the export is complete, download the CSV file to use in the following section.

### Import a User Data File

::: note
[MailChimp Knowledge Base: Import Subscribers to a List](https://kb.mailchimp.com/lists/growth/import-subscribers-to-a-list)
:::

Log in to your MailChimp account and go to the **Lists** page. Select a list to import your Auth0 users into ([or create a new list](https://kb.mailchimp.com/lists/growth/create-a-new-list)). On your MailChimp List page, click on **Import Contacts** from the **Add Contacts** menu.

![MailChimp List: Import Contacts](/media/articles/integrations/marketing/mailchimp/import-contacts.png)

On the next page, select the `CSV or tab-delimited text file` option to import contacts from.

![MailChimp List Import Source](/media/articles/integrations/marketing/mailchimp/import-source.png)

Next, upload the user data CSV file you exported from Auth0 in the previous section. MailChimp will interpret your user data on the following page.

![MailChimp Import Column Match](/media/articles/integrations/marketing/mailchimp/import-column-match.png)

Check that the column names and field types are correct, when you're ready to proceed click the **Next** button.

![MailChimp Start Import](/media/articles/integrations/marketing/mailchimp/import-start.png)

After reviewing your selections and setting the import category, click on the **Import** button to start the user import.

That's it! You successfully imported your Auth0 users into MailChimp.

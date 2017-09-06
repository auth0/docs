---
title: User Import / Export Extension
toc: true
description: The User Import / Export is an extension that allows you to import / export users from or to any database you have configured in your account.
---
# User Import / Export

The __User Import / Export__ is an extension that allows you to import / export users from or to any database you have configured in your account. Please note that you need to be a Dashboard Admin in order to use this extension.

::: note
Export is limited to 10 thousand users. If you require to export more than this please [contact support](${env.DOMAIN_URL_SUPPORT}).
:::

## Configuring the Extension

To install this extension, click on __User Import / Export__ in the list of provided extensions on the [Extensions page](${manage_url}/#/extensions) of the [Dashboard](${manage_url}). When authorizing the application, you will be asked to provide the following information about your Auth0 account:

 - __Users__: create and read your users
 - __Connections__: read your connections
 - __Profile__: access to your profile

Once you have provided the appropriate values for the above fields, click on "Install" to proceed.

## Using Your Installed Extension

There are two ways of using this extension, they are described below:

### Import of users

1. Select the Import option in the menu from the left.
2. You may drop a valid JSON file ([schema and examples here](/tutorials/bulk-importing-users-into-auth0)) in the square area or click there to browse your files and search for a valid JSON file. This JSON file should contain the list of users that you are planning to import.
3. Select the database connection where these users will be imported. Please make sure that the connection is enabled for at least one client.
4. Click on the `Start importing users` blue button.

### Export of users

1. Select the Export option in the menu from the left.
2. You can query the users that you want to export by using the [Lucene query syntax](http://www.lucenetutorial.com/lucene-query-syntax.html) in the search bar. For example, to return all the users that have the `nickname` attribute you can use: `_exists_:nickname`.
3. In the columns section you can decide which attributes should be included in the export. The user attribute can be a static value like `user.user_metadata.name` or a Javascript expression like `user.user_metadata.name || user.name` which will then be evaluated during the export. The column name is how the value will be represented in the export. A good way of seeing an example of this is by clicking on the `Add default columns` blue button on the right.
4. In the settings section you can configure the sorting options of the output by writing a `User Attribute` in the text field, and the sorting order (descending or ascending) by toggling the button on and off respectively. You can also choose between two output formats, either a `.csv` or `.json` file.

### Observations

The User Import / Export extension is available in the PSaaS Appliance beginning with version 10755 when User search is enabled.

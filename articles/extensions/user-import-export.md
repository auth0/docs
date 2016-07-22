# User Import / Export 

The _User Import / Export_ is an extension that allows you to import / export users from or to any database you have configured in your account.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 `User Import / Export` in the list of provided extensions on the Extensions page of the Management Portal. When authorizing the application, you will be asked to provide the following information about your Auth0 account:

 - __Users__: create and read your users;
 - __Connections__: read your connections;
 - __Profile__: access to your profile;

Once you have provided the appropriate values for the above fields, click "Install" to proceed.

## Using Your Installed Extension

There are two ways of using this extension, they are described below:

### Import of users

1. Select the Import option in the menu from the left.
2. You may drop a valid JSON file in the square area or click there to browse your files and search for a valid JSON file. This JSON file should contain the list of users that you are planning to import.
3. Select the database connection where these users will be imported.
4. Click on the `Start importing users` blue button.

### Export of users

1. Select the Export option in the menu from the left.
2. You may query the users that you want to export via using the [Lucene query syntax](http://www.lucenetutorial.com/lucene-query-syntax.html) in the search bar. An example to return all the users that have the `user_metadata` attribute would be `_exists_:user_metadata`.
3. Regarding columns, you can decided which attributes should be included in the export. The user attribute can be a static value like `user.app_metadata.name` or a Javascript expression like `user.app_metadata.name || user.name` which will then be evaluated during the export. The column name is how the value will be represented in the export. A good way of seeing an example of this is by clicking on the `Add default columns` blue button on the right.
4. Regarding settings, you may sort out the output file by writing a `User Attribute` and click on Descending order if you toggle the button on. Ascending order is the default, that is when the button is toggled off. You can also choose between two output formats, either a `.csv` or `.json` file.

### Observations

This extension is not supported in the Appliance.

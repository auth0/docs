---
description: The Delegated Administration extension allows you to expose the Users dashboard to a group of users, without allowing them access to the dashboard.
---

# Delegated Administration

The **Delegated Administration** extension allows you to expose the [Users dashboard](${uiURL}/#/users) to a group of users, without having to provide access to them to the [dashboard](${uiURL}/#/). Instead the [Users dashboard](${uiURL}/#/users) is exposed as an Auth0 client. Let's see how this is done.

**NOTE**: This extension is currently available only for the public cloud. Extensions are not yet supported in the [appliance](/appliance).

## Configure the extension

Let's start with creating a new client application. Navigate to [Clients](${uiURL}/#/applications) and click on the **+Create Client** button. Set a name (we will name ours *Users Dashboard*) and choose *Single Page Web Applications* as client type. Click on **Create**.

![](/media/articles/extensions/delegated-admin/create-client.png)

Click on the *Settings* tab and set the **Allowed Callback URLs**. This varies based on your location.


| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://sandbox.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login` |
| Europe | `https://sandbox-eu.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login` |
| Australia | `https://sandbox-au.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login` |

Copy the **Client ID** value. 

Navigate to *Settings > Show Advanced Settings > OAuth* and paste the **Client ID** value to the **Allowed APPs / APIs** field. 

Set the **JsonWebToken Signature Algorithm** to *RS256*.

![](/media/articles/extensions/delegated-admin/set-rs256.png)

Save your changes.

When you create a new client, by default all the connections are enabled. This is something you want to change in this case, for security reasons. For example, if you have a Social Connection enabled, like Google, then anyone with the link could access your app, which is not something you want. The approach we follow in this tutorial is to disable all connections, create a new Database Connection and enable only this one for our new client application.

Navigate to the *Connections* tab and disable all the connections using the switch.

Following that, navigate to [Database Connections](${uiURL}/#/connections/database) and click on **+Create DB Connection**. Set a name for your connection, we will name ours *Helpdesk*. 

![](/media/articles/extensions/delegated-admin/create-connection.png)

Navigate to the *Settings* tab of the new connection and enable the **Disable Sign Ups** option. This way we avoid another security concern: if some malicious user gets hold of the link, signing up will not be possible. 

![](/media/articles/extensions/delegated-admin/disable-signup.png)

Enable this new connection for your client (*Users Dashboard* in our case) and add at least one user.

We are now ready to setup our new extension. Before we do so head back to your new Client and copy the **Client ID** value.

To install and configure this extension, click on the **Delegated Administration** box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the dashboard. The **Install Extension** window will open.

![](/media/articles/extensions/delegated-admin/install-extension.png)


Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: The **Client ID** value of the Client you will use.
- **TITLE**: Optionally, you can set a title for your Client. It will be displayed at the header of the page.
- **CUSTOM_CSS**: Optionally, you can set a css file, to customize the look and feel of your Client.

Once you have provided this information, click **Install**. Your extension is now ready to use!


## Use the extension

To access your newly created dashboard, navigate to *[Extensions](${uiURL}/#/extensions) > Installed Extensions* and click on the **Delegated Administration Dashboard**. A new tab will open and display the login prompt. 

![](/media/articles/extensions/delegated-admin/login-prompt.png)

Notice that there is no Sign Up option. That's because we disabled it earlier. 

Once you provide valid credentials you are navigated to the *Delegated Administration Dashboard*.

![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

There are two available views, *Users* and *Logs*. At the *Users* view you can see all the users displayed and perform certain actions on them. In the table below you can see all the options you can perform on a user, which ones are available via the [dashboard](${uiURL}/#/) and which via the extension. 

<table class="table">
    <tr>
        <th>Action</th>
        <th> Available via Dashboard </th>
        <th> Available via Extension </th>
    </tr>
    <tr>
        <th>Create user</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Contact user</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Sign in as user</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Block user</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Delete user</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Send verification email</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Change email</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Change password</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Reset password</th>
        <th>No</th>
        <th>Yes</th>
    </tr>
</table>

Notice the new *Reset password* option available via the extension. This option will send an email to the user allowing them to choose a new password. To do this click on a user and select *Actions > Reset password*.

![](/media/articles/extensions/delegated-admin/reset-pass-01.png)

This will send an email to the user, containing a link to change the password.

At the *Logs* view you can see log data of authentications made by your users. The contents of this view are a subset of the data displayed in the [Logs dashboard](${uiURL}/#/logs), which also displays data for the actions taken in the dashboard by the administrators.


## Customize the dashboard

You can use the **Title** and **Custom_CSS** variables to customize the look and feel of your dashboard. 

Navigate to the [Extensions](${uiURL}/#/extensions) page and go to the settings of the **Delegated Administration** extension. We are going to set a custom title and a custom css file:
- Set the **Title** to `Fabrikam User Management`.
- Set the **Custom_CSS** to `https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css`.

Save your changes, navigate to the extension and login. The dashboard now looks like that:

![](/media/articles/extensions/delegated-admin/custom-dashboard.png)


## Keep it safe

Limiting the access of users to your Helpdesk is very important. In this tutorial we disabled all Connections for our new Client and added only a Database Connection where we explicitly added a subset of our users. We also disabled the sign ups in order to avoid unauthorized access in case someone gets hold of the link. In case you don't want to setup a Database Connection but use for example an Active Directory connection you need to make sure that you limit the access only to authorized employees. You could use [Rules](/rules) for that purpose. 

For example, you could create a `Helpdesk Users` group in your directory and use a rule like the following.

```js
function (user, context, callback) {
 if (context.clientID === 'CLIENT_ID') {
   if (!user.groups || user.groups.indexOf('Helpdesk Users') < 0) {
     return callback(new UnauthorizedError('Only helpdesk is allowed to use this application'));
   }
 }
 
 callback(null, user, context);
}
```



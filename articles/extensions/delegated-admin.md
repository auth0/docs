---
description: The Delegated Administration extension allows you to expose the Users dashboard to a group of users, without allowing them access to the dashboard.
---

# Delegated Administration

The **Delegated Administration** extension allows you to expose the [Users dashboard](${uiURL}/#/users) to a group of users, without having to provide access to them to the [dashboard](${uiURL}/#/). Instead the [Users dashboard](${uiURL}/#/users) is exposed as an Auth0 client. Let's see how this is done.

**NOTE**: This extension is currently available only for the public cloud. Extensions are not yet supported in the [appliance](/appliance).

## Configure the extension

Let's start with creating a new client application. Navigate to [Clients](${uiURL}/#/applications) and click on the **+Create Client** button. Set a name (we will name ours *Users Dashboard*) and choose *Single Page Web Applications* as client type. Click on **Create**.

![](/media/articles/extensions/delegated-admin/create-client.png)

Navigate to *Settings > Show Advanced Settings > OAuth* and set the **JsonWebToken Signature Algorithm** to *RS256*. Click **Save Changes**.

![](/media/articles/extensions/delegated-admin/set-rs256.png)

While on the *Settings* tab set the **Allowed Callback URLs**. This varies based on your location.
- For US based, use: `https://sandbox.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login`
- For Europe based, use: `https://sandbox.eu.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login`
- For Australia based, use: `https://sandbox.au.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login`

Save your changes.

Navigate to the *Connections* tab. When you create a new client, by default all the connections are enabled. This is something you want to change in this case, for security reasons. For example, if you have a Social Connection enabled, like Google, then anyone with the link could access your app, which is not something you want. The approach we follow in this tutorial is to disable all connections, create a new Database Connection and enable only this one for our new client application.

After you disable all connections using the switch, navigate to [Database Connections](${uiURL}/#/connections/database) and click on **+Create DB Connection**. Set a name for your connection, we will name ours *Helpdesk*. 

![](/media/articles/extensions/delegated-admin/create-connection.png)

Navigate to the *Settings* tab of the new connection and enable the **Disable Sign Ups** option. This way we avoid another security concern: if some malicious user gets hold of the link, signing up will not be possible. 

![](/media/articles/extensions/delegated-admin/disable-signup.png)

Enable this new connection for your client (*Users Dashboard* in our case) and add at least one user.

We are now ready to setup our new extension. Before we do so head back to your new Client and copy the **Client ID** value.

To install and configure this extension, click on the __Delegated Administration__ box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the dashboard. The __Install Extension__ window will open.

![](/media/articles/extensions/delegated-admin/install-extension.png)


Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: The **Client ID** value of the Client you will use.
- **TITLE**: Optionally, you can set a title for your Client, for example *Fabrikam User Management*.
- **CUSTOM_CSS**: Optionally, you can set a css file, to customize the look and feel of your Client.

Once you have provided this information, click **Install**. Your extension is now ready to use!


## Use the extension

To access your newly created dashboard, navigate to *[Extensions](${uiURL}/#/extensions) > Installed Extensions* and click on the **Delegated Administration Dashboard**. A new tab will open and display the login prompt. 

![](/media/articles/extensions/delegated-admin/login-prompt.png)

Notice that there is no Sign Up option. That's because we disabled it earlier. 

Once you provide valid credentials you are navigated to the *Delegated Administration Dashboard*.

![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

This dashboard is using the standard UI. To change that, use the **Title** and **Custom_CSS** variables. For example, if we set **Title** to `Fabrikam User Management` and **Custom_CSS** to `https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css`, the dashboard would look like that:

![](/media/articles/extensions/delegated-admin/custom-dashboard.png)


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



---
description: The Delegated Administration extension allows you to expose the Users dashboard to a group of users, without allowing them access to the dashboard.
---

# Delegated Administration

The **GitHub Deployments** extension allows you to expose the [Users dashboard](${uiUrl}/#/users) to a group of users, without having to provide access to them to the [dashboard](${uiUrl}/#/). Instead the [Users dashboard](${uiUrl}/#/users) is exposed as an Auth0 client. Let's see how this is done.

**NOTE**: This extension is currently available only for the public cloud. Extensions are not yet supported in the [appliance](/appliance).

## Configure the extension

Let's start with creating a new client application. Navigate to [Clients](${uiUrl}/#/applications) and click on the **+Create Client** button. Set a name (we will name ours *Users Dashboard*) and choose *Single Page Web Applications* as client type. Click on **Create**.

![](/media/articles/extensions/delegated-admin/create-client.png)

Navigate to *Settings > Show Advanced Settings > OAuth* and set the **JsonWebToken Signature Algorithm** to *RS256*. Click **Save Changes**.

![](/media/articles/extensions/delegated-admin/set-rs256.png)

While on the *Settings* tab set the **Allowed Callback URLs**. This varies based on your location.
- For US based, use: `https://sandbox.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login`
- For Europe based, use: `https://sandbox.eu.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login`
- For Australia based, use: `https://sandbox.au.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login`


To install and configure this extension, click on the __Delegated Administration__ box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the dashboard. The __Install Extension__ window will open.

![](/media/articles/extensions/delegated-admin/install-extension.png)


Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: 
- **TITLE**: 
- **CUSTOM_CSS**: 

Once you have provided this information, click **Install**.

## Use the extension


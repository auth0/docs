---
description: How to configure a Custom Social Connection to your Auth0 app.
---

# Auth0 Extension: Custom Social Connections

The Custom Social Connections extension allows you to easily manage multiple social connections.

## Set Up a New Social Connection

To install the Custom Social Connection app, click on the **Custom Social Connections** box on the main [Extensions](${manage_url}/#/extensions) page of the Management Portal. You will be prompted to install the app.

![](/media/articles/extensions/installing-custom-social-connections.png)

At this point, you will see the app listed under the **Installed Extensions** tab.

![](/media/articles/extensions/installed-custom-social-extension.png)

Once you have installed the app, you will need to configure it to work with whichever social providers you require. To do so, click on the **Custom Social Connections** link listed under **Installed Extensions**.

You will be asked to authorize the Custom Social Connections app. After you do so, the **New Connection** window will open.

![](/media/articles/extensions/custom-social-connections.png)

Click the slider next to the social provider you want to set up. The slider will turn from grey to green, indicating that a connection to that provider exists.

### Configuring Social Connection Settings

The **New Connection** window contains two tabs: **Settings** and **Apps**:

![](/media/articles/extensions/new-custom-social-connection.png)

#### New Connection: Settings

The Settings page is used to provide the information required to set up the social connection. You will be asked for information in the following fields:

- __Name__: The name of the connection. Generally, this will be the name of the social provider, but you are free to name the connection whatever you would like;
- __Client ID__: The provider's client ID;
- __Client Secret__: The provider's client secret;
- __Authorization URL__: The URL where the transaction begins and authorization occurs;
- __Token URL__: The URL used to exchange the code generated from the information you provide for an access_token;
- __Scope__: The scope parameters for which you want access rights;
- __Fetch User Profile Script__: The function that returns the user profile and associated information.
- __Custom Headers__: An optional JSON object that lets you provide custom headers to be included in the HTTP calls to the provider. Should be in the format of:

```
{
    "Header1" : "Value",
    "Header2" : "Value"
    // ...
}
```

After you have provided values for the required fields, click **Save**.

#### New Connection: Apps

Once you have successfully configured the connection, you will be presented with a list of apps associated with your Auth0 account under the **Apps** tab of the **New Connection** window.

Using the slider, enable this social connection for the apps that you want to use it with.

Once you have enabled/disabled the appropriate apps, click **Save**.

## Use your new connection

You can use [auth0.js](/libraries/auth0js) or a direct link to log a user in with the new connection.

A direct link would look like this:

`https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION`

For more details, see the [documentation for the `/authorize` authentication API endpoint](/api/authentication/reference#social).

Lock does not currently support displaying buttons for custom social connections.

## Optional: Set up Basic Authentication

By default, when invoking the __Token URL__ to exchange the authentication code for an access_token, Auth0 will provide the `client ID` and `client secret` as part of the body of the POST. Some identity providers require [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), which involves providing those same credentials in a HTTP header.

If the identity provider requires Basic Authentication, you can be use the __Custom Headers__ setting with a JSON object like this:

```
{
    "Authorization" : "Basic xxxxxxxx"
}
```

`xxxxxxxx` should be the [Base64](https://en.wikipedia.org/wiki/Base64) encoding of the `client id`, a colon, and the `client secret`. For example, if the `client id` is `123456` and the `client secret` is `abcdef` you would Base64 encode `123456:abcdef`, which results in `MTIzNDU2OmFiY2RlZg==`. The resulting header would be:

```
{
    "Authorization" : "Basic MTIzNDU2OmFiY2RlZg=="
}
```

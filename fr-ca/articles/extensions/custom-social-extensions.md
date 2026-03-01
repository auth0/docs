---
description: How to configure a Custom Social Connection to your Auth0 app.
toc: true
topics:
 - extensions
 - custom-social-connections
contentType:
 - how-to
useCase: extensibility-extensions
---

# Auth0 Extension: Custom Social Connections

The Custom Social Connections extension allows you to manage multiple social connections easily.

## Set Up a New Social Connection Extension


To install the Custom Social Connections extension, log in to the Dashboard and go to [Extensions](${manage_url}/#/extensions). Click the **Custom Social Connections** box. You will be prompted to install the app.

When the extension has been installed, you'll be redirected to a page that lists your extension under **Installed Extensions** tab.

## Configure the Social Connection Extension settings

Once you have installed the app, you will need to configure it to work with whichever social providers you require. To do so, click on the **Custom Social Connections** link listed under **Installed Extensions**.

You will be asked to authorize the Custom Social Connections app. After you do so, the **New Connection** window will open.

Click the slider next to the social provider(s) you want to set up. The slider will turn from grey to green, indicating that a connection to that provider exists.

For information on how each provider handles authentication, see that provider's documentation.

### Settings configuration

As soon as you enable a specific social connection, Auth0 displays a pop-up **New Connection** window that contains two tabs: **Settings** and **Apps**. You will need to update these tabs accordingly so that your connection works as expected.

#### New Connection: Settings

The Settings page is used to provide the information required to set up the social connection. You will be asked for information in the following fields:

- __Name__: The name of the connection. Generally, this will be the name of the social provider, but you are free to name the connection whatever you would like;
- __Client ID__: The provider's client ID;
- __Client Secret__: The provider's client secret;
- __Authorization URL__: The URL where the transaction begins and authorization occurs;
- __Token URL__: The URL used to exchange the code generated from the information you provide for an Access Token;
- __Scope__: The scope parameters for which you want access rights;
- __Fetch User Profile Script__: The JS function that returns the user profile and associated information. It will be auto-generated with the appropriate fields depending on the chosen provider.
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

Once you have successfully configured the connection, you will be presented with a list of apps associated with your Auth0 tenant under the **Apps** tab of the **New Connection** window.

Using the slider, enable this social connection for the apps that you want to use it with. **If you do not enable *any* of the listed apps, you will not be able to use the connection.**

Once you have enabled/disabled the appropriate apps, click **Save**.

### Provide your Callback URL to the Identity Provider

The callback URL is the URL that is invoked by the provider after the authentication request has finished. Your provider will ask you to provide this URL at some point during the setup process.

Use this value for the **Callback URL**:
`https://${account.namespace}/login/callback`

Depending on the provider, this field can be referred to by different names. Sometimes called a **Redirect URI**, the callback URL may also be referred to as: "Valid OAuth redirect URI," "Authorized redirect URI," "Allowed Return URL," or something similar.

## Use your new connection

You can use [auth0.js](/libraries/auth0js) or a direct link to log a user in with the new connection.

A direct link would look like this:

`https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION`

For more details, see the [documentation for the `/authorize` authentication API endpoint](/api/authentication/reference#social).

Lock does not currently support displaying buttons for custom social connections.

## Optional: Set up Basic Authentication

By default, when invoking the __Token URL__ to exchange the authentication code for an Access Token, Auth0 will provide the `client ID` and `client secret` as part of the body of the POST. Some identity providers require [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), which involves providing those same credentials in an HTTP header.

If the identity provider requires Basic Authentication, you can use the __Custom Headers__ setting with a JSON object like this:

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

## Additional Steps

Depending on which social providers you are you using, there may be additional steps in the provider configuration to enable the connection. Please refer to the provider-specific documentation for clarifying details.

# Auth0 Extension: Custom Social Connections

The Custom Social Connections extension allows you to easily manage multiple social connections.

::: panel-info Extension availability
This extension is available only for the US region.
:::

## Setting Up a New Social Connection

To install the Custom Social Connection app, click on the "Custom Social Connections" box on the main Extensions page of the Management Portal. You will be prompted to install the app.

![](/media/articles/extensions/installing-custom-social-connections.png)

At this point, you will see the app listed under "Installed Extensions."

![](/media/articles/extensions/installed-custom-social-extension.png)

Once you have installed the app, you will need to configure it to work with whatever social providers you require. To do so, click on the "Custom Social Connections" link listed under "Installed Extensions".

You will be asked to authorize the Custom Social Connections app. If you do so, the New Connection window will pop open.

![](/media/articles/extensions/custom-social-connections.png)

Click the slider next to the social provider you are interested in setting up. The slider will turn from grey to green, indicating that a connection to that provider exists.

### Configuring Social Connection Settings

The New Connection Window contains two tabs: Settings and Apps

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

After you have provided values for the required fields, click "Save" to persist your changes.

#### New Connection: Apps

Once you have successfully configured the connection, you will be presented with a list of apps associated with your Auth0 account under the Apps tab of the New Connection window.

Using the slider next to the name of your app, you may choose whether that particular social connection may be used with a given app.

Once you have enabled/disabled the appropriate apps, click "Save".

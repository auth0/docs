# Custom Social Connections

Custom Social Connections allows you to easily manage multiple social connections.

## Setting Up a New Social Connection

To set up a new social connection, click the slider next to the social provider you are interested in setting up. The slider will turn from grey to green, indicating that a connection to that provider exists.

![]()

The New Connection window will then pop open.

![]()

### Configuring Social Connection Settings

The New Connection Window contains two tabs: Settings and Apps

#### New Connection: Settings

The Settings page is used to provide the information required to set up the social connection. You will be asked for information in the following fields:

- Name: The name of the connection. Generally, this will be the name of the social provider, but you are free to name the connection whatever you would like;
- Client ID: The provider's client ID;
- Client Secret: The provider's client secret;
- Authorization URL: The URL where the transaction begins and authorization occurs;
- Token URL: The URL used to exchange the code generated from the information you provide for an access_token;
- Scope: The scope parameters for which you want access rights;
- Fetch User Profile Script: The function that returns the user profile and associated information.

#### New Connection: Apps

![]()

Once you have successfully configured the connection, you will be presented with a list of apps associated with your Auth0 account under the Apps tab of the New Connection window.

Using the slider next to the name of your app, you may choose whether that particular social connection may be used with a given app.

Once you have enabled/disabled the appropriate apps, click "Save".

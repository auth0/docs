# Creating and Installing a Custom Extension

Rather than using one of Auth0's provided extensions, you may choose to create your own.

## Creating a Custom Extension
To begin creating your custom extension, please feel free to fork/clone any one of Auth0's extension repositories:

- [Auth0 Extension Boilerplate](https://github.com/auth0/auth0-extension-boilerplate)
- [Auth0 Extension with API Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-api)
- [Auth0 Extension with React Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-react)
- [Auth0 Extension with Hooks](https://github.com/auth0/auth0-extension-boilerplate-hooks)

Alternatively, you may follow the _Development Instructions_ provided via the _New Extension_ window that appears when you click on the _+ CREATE EXTENSION_ button. To view the _Development Instructions_, navigate to the [Extensions](${uiURL}/#/extensions) page of the [Management Portal](${uiURL}). Click on the _+ CREATE EXTENSION_ button. On the popup displayed click on the _Check out this command line tool_ link. The _Development Instructions_ popup is displayed. These instructions allow you to create your own extension using the command line.

Extensions can also be installed using `wt-cli`. The command would look like the following:

```
wt create {file} --name {extensionName} --param owner=“{tenant}” --param version="1.0.0"
```

Once the extension is installed you can make updates using the following:

```
wt update {extensionName} {file} -p {tenant}
```

Learn more about `wt-cli` by visiting the [documentation](https://webtask.io/docs/wt-cli) and the [github repository](https://github.com/auth0/wt-cli).

## Installing a Custom Extension
Once you have created your own extension, you may install it manually via the [Extensions](${uiURL}/#/extensions) page of the [Auth0 Management Portal](${uiURL}).

Near the top right-hand side of the window, click the _+ CREATE EXTENSION_ button.

![](/media/articles/extensions/custom/create-extension.png)

In the _New Extension_ window that pops open, provide the GitHub URL to the repository that contains the files required by your extension.

![](/media/articles/extensions/custom/new-extension.png)

> At this time, only repositories hosted by GitHub may be used.

Alternatively, you may host your files elsewhere and simply provide a link to the `webtask.json` file in the box (e.g. `http://example.com/webtask.json`).

Once you have provided the link to your files and clicked _Continue_, you will be prompted to install the extension. If you would like to proceed, click _Install_.

![](/media/articles/extensions/custom/install-custom-ext.png)

Under the _Installed Extensions_ tab you will find your newly-installed extension listed.

![](/media/articles/extensions/custom/installed-extensions.png)

## Extension Lifecycle

Let's have a look at what happens behind the scenes when installing and uninstalling custom extensions.

When the user clicks on _Install_, a _Client_ and a _ClientGrant_ are created for the extension with the scopes defined on the `webtask.json`. Also, access is granted to Management APIv2 Resource Server.

For this `webtask.json`:

```json
{
  "name": "my-extension";
  "auth0": {
    "createClient": true,
    "scopes": "create:rules"
  }
}
```

The following _Client_ and a _ClientGrant_ would be created:

```javascript
Clients.create({
  name: 'my-extension'
}).then(function (client) {
  return Grants.create({
    audience:  'https://jcenturion.auth0.com/api/v2/',
    client_id: client.client_id,
    scope: "create:rules"
  }).then(function () {
    return addSecrets(wt, client, wtUrl);
  });
});
```

The installation dialog will warn the user that the extension will have access to certain scopes. In this case: `create:rules`.

![](/media/articles/extensions/custom/scopes-warning.png)

The webtask will be created with the `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET` information set as secrets.

After the webtask is created, `/.webtask/on-install` (`POST /onInstallUrl`) is called sending a [JWT](/jwt) for validating that Auth0-manage is the one calling it.

> The expected success status is `204`. Keep in mind that if the hooks fail, then the install (or uninstall) will fail as well.

Install and uninstall URLs are configurable through `webtask.json`.

```json
{
  "name": "my-extension";
  "auth0": {
    "scopes": "create:rules",
    "onInstallUrl": "/my-own-on-install" 
  }
}
```

> _onInstallPath_ and _onUninstallPath_ are mandatory if you want auth0-dashboard to call them.

When the user clicks on _Uninstall_, `/.webtask/on-uninstall` (`DELETE /onUninstallUrl`) is called, with a JWT for validating that Auth0-manage is the one calling it. Afterwards, the webtask and the client associated to the webtask are removed.

The JWT, used for authenticating the calls to the hooks for both `/.webtask/on-install` and `/.webtask/on-uninstall`, looks like the following:

```json
{
  aud: {extensionUrl + hookPath},      
  iss: {auth0Domain},                 
  iat: timespan
}
```

The extension should validate the JWT. See [this](https://github.com/auth0/auth0-extension-boilerplate-hooks/blob/master/hooks/index.js#L11) for the validation applied.



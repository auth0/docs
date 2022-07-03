---
description: The Visual Studio Team Services Deployments extension allows you to deploy Rules, Universal Login pages and database connection scripts from Visual Studio Team Services to Auth0.
topics:
  - extensions
  - vs-team-services-deployments
contentType:
  - how-to
useCase: extensibility-extensions
---

# Visual Studio Team Services Deployments

The **Visual Studio Team Services Deployments** extension allows you to deploy [rules](/rules), rules configs, connections, database connection scripts, clients, client grants, resource servers, Universal Login pages and email templates from Visual Studio Team Services to Auth0. You can configure a Visual Studio Team Services project, keep all of your scripts there, and have them automatically deployed to Auth0 whenever you push changes to your project.

## Configure the Auth0 Extension

To install and configure this extension, click on the **Visual Studio Team Services Deployments** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the Auth0 Management Dashboard. The **Install Extension** window will open.

![Install extension popup window](/media/articles/extensions/visual-studio-ts/install-extension.png)

Set the following configuration variables:

* **TYPE**: The type of repository, choose from TFVC or Git
* **REPOSITORY**: The project from which you want to deploy rules and database scripts. To use a specific repository within a project, format your input value as follows: `projectName/repoName`.
* **BRANCH**: The branch we should monitor for commits.
* **INSTANCE**: Your Visual Studio Team Services instance name (without .visualstudio.com).
* **COLLECTION**: Your Visual Studio collection (DefaultCollection for Azure DevOps).
* **USERNAME**: Your Visual Studio Team Services username
* **TOKEN**: Your personal Access Token for Visual Studio Team Services, for details on how to configure one refer to [Configure a Personal Access Token](#configure-a-personal-access-token) below.
* **BASE_DIR**: The base directory, where all your tenant settings are stored
* **AUTO_REDEPLOY**: If enabled, the extension redeploys the last successful configuration in the event of a deployment failure. Manual deployments and validation errors does not trigger auto-redeployment
* **SLACK_INCOMING_WEBHOOK**: Webhook URL for Slack used to notify you of successful and failed deployments.

::: note
Some of the configuration variables were changed in version **2.5.0** of this extension. If you are updating the extension from a prior version, make sure that you update your configuration accordingly.
:::

Once you have provided this information, click **Install**.

## Configure a Personal Access Token

1. Sign in to either your Visual Studio Team Services account (https://{youraccount}.visualstudio.com) or your Team Foundation Server web portal (https://{server}:8080/tfs/).

2. From your home page, click on your profile in the top right corner of the page, then from the drop-down menu select **Security**.

![Profile drop down](/media/articles/extensions/visual-studio-ts/profile-menu.png)

3. This will bring up the **Personal Access Tokens** page, click **Add**.

![Add personal Access Token](/media/articles/extensions/visual-studio-ts/add-token.png)

4. Add a description for the new token, select the desired lifetime, and the account the token will be associated with. Then choose the scopes you wish to authorize and then click **Create Token**.

![Creating the Access Token](/media/articles/extensions/visual-studio-ts/create-token.png)

5. Once the token is created, you will need to save its value manually right away. Use this value as your **TFS_TOKEN**.

![Copy Access Token](/media/articles/extensions/visual-studio-ts/copy-token.png)

## Authorize Access

Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

![Installed Extensions](/media/articles/extensions/visual-studio-ts/installed-extensions-view.png)

Click on the row for the **Visual Studio Team Services Deployments** extension. The first time you click on your installed extension, you will be asked to grant it to access your Visual Studio Deployments account.

![Auth0 Integration Page](/media/articles/extensions/visual-studio-ts/vs-integration-page.png)

Once you agree, you will be directed to the **Visual Studio Team Services Integration** page.

![Visual Studio Team Services Integration Page](/media/articles/extensions/visual-studio-ts/vsts-integration.png)

Copy the **Payload URL** and **HTTP headers** values. You will use them to configure the Visual Studio Team Services Webhook in the next step.

## Configure the Visual Studio Team Services Webhook

Once you have configured your Auth0 Extension, you will need to configure the Visual Studio Team Services Webhook to complete the integration.

In your Visual Studio Team Services account, go to **Overview** and click on the name the project being used for the integration, then click **Service Hooks**.

![Select Service Hooks](/media/articles/extensions/visual-studio-ts/service-hooks.png)

Then click the link **Create the first subscription for this project**. Then select **Web Hooks** from the menu.

![Select Web Hooks](/media/articles/extensions/visual-studio-ts/web-hooks.png)

Then click the **Next** button, choose the trigger for the event, and the filters are optional. Then click **Next**.

![Configure Web Hook](/media/articles/extensions/visual-studio-ts/configure-web-hook.png)

For the **URL** field, enter the **Payload URL** from the previous step along with the **HTTP headers** field from the previous step. The remaining fields are optional.

## Deployment

Once you have set up the webhook in Visual Studio Team Services using the provided information, you are ready to start committing to your project.

With each commit you push to your configured Visual Studio Team Services project, the webhook will call the extension to initiate a deployment if changes were made to one of these folders:
- `clients`
- `grants`
- `emails`
- `resource-servers`
- `connections`
- `database-connections`
- `rules-configs`
- `rules`
- `pages`

The **Deploy** button on the **Deployments** tab of the extension allows you to manually deploy the Rules, Pages, and Database Connection scripts that you already have in your Visual Studio Team Services project. This is useful if your project already contains items that you want to deploy once you have set up the extension or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your project.

::: panel-warning Full Deployment
To maintain a consistent state, the extension will always do a full deployment of the contents of these folders. **Any rules, pages or database connection scripts that exist in Auth0 but not in your Visual Studio Team Services project will be deleted**.
:::

### Deploy Database Connection Scripts

To deploy Database Connection scripts, you must first create a directory under `database-connections`. The name of the directory must match **exactly** the name of your [database connection](${manage_url}/#/connections/database) in Auth0. You can create as many directories as you have Database Connections.

Under the created directory, create one file for each script you want to use. The allowed scripts are:

- `get_user.js`
- `create.js`
- `verify.js`
- `login.js`
- `change_password.js`
- `delete.js`

For a generic Custom Database Connection, only the `login.js` script is required. If you enable the migration feature, you will also need to provide the `get_user.js` script.

You can find examples in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db). While the samples were authored for GitHub, it will work for a Visual Studio Team Services integration as well.

#### Deploy Database Connection Settings

To deploy Database Connection settings, you must create `database-connections/[connection-name]/database.json`.

_This will work only for Auth0 connections (`strategy === auth0`), for non-Auth0 connections, use `connections`._

_Support for using `settings.json` has been deprecated in favor of `database.json` since v3.1.1 of the extension and may be dropped in a future release._

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Connections/patch_connections_by_id) for more info on allowed attributes for Connections.

### Deploy Connections

To deploy a connection, you must create a JSON file under the `connections` directory of your Visual Studio Team Services project. Example:

__facebook.json__
```json
{
  "name": "facebook",
  "strategy": "facebook",
  "enabled_clients": [
    "my-client"
  ],
  "options": {}
}
```

<%= include('./_includes/_embedded-clients-array') %>

_This will work only for non-Auth0 connections (`strategy !== auth0`), for Auth0 connections, use `database-connections`._

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Connections/post_connections) for more info on allowed attributes for Connections.

### Deploy Universal Login Pages

The supported pages are:

- `error_page`
- `guardian_multifactor`
- `login`
- `password_reset`

To deploy a page, you must create an HTML file under the `pages` directory of your Visual Studio Team Services project. For each HTML page, you need to create a JSON file (with the same name) that will be used to mark the page as enabled or disabled. For example, to deploy a `password_reset`, you would create two files:

```text
your-bitbucket-repo/pages/password_reset.html
your-bitbucket-repo/pages/password_reset.json
```

To enable the page, the `password_reset.json` would contain the following:

```json
{
  "enabled": true
}
```

<%= include('./_includes/_use-default-error') %>

### Deploy Rules

To deploy a rule, you must first create a JavaScript file under the `rules` directory of your Visual Studio Team Services project. Each Rule must be in its own JavaScript file.

For example, if you create the file `rules/set-country.js`, the extension will create a Rule in Auth0 with the name `set-country`.

::: note
If you plan to use source control integration for an existing account, first rename your Rules in Auth0 to match the name of the files you will be deploying to this directory.
:::

You can also control the Rule order and status (`enabled`/`disabled`) by creating a JSON file with the same name as your JavaScript file. For this example, you would create a file named `rules/set-country.json`.

__set-country.js__
```javascript
function (user, context, callback) {
  if (context.request.geoip) {
    user.country = context.request.geoip.country_name;
  }
  callback(null, user, context);
}
```

__set-country.json__
```json
{
  "enabled": false,
  "order": 15,
  "stage": "login_success"
}
```

You can find a `login_success` example in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules). While the sample was authored for GitHub, it will work for a Visual Studio Team Services integration as well.

#### Set Rule Order

To avoid conflicts, you cannot set multiple Rules of the same order. However, you can create a JSON file for each rule, and within each file, assign a value for `order`. We suggest using number values that allow for reordering with less risk of conflict. For example, assign a value of `10` to the first Rule and `20` to the second Rule, rather than using values of `1` and `2`, respectively).

#### Set the Stage

After you deploy a Rule, you cannot change its stage or the area where the Rule executes.

If you need the rule to execute in a different stage, you must create a new Rule with the updated stage and delete the original Rule.

Please note that you may have only a single Rule for the `user_registration` and `login_failure` stages.

### Deploy Rules Configs

To deploy a rule config, you must create a JSON file under the `rules-configs` directory of your Visual Studio Team Services project. Example:

__secret_number.json__
```json
{
  "key": "secret_number",
  "value": 42
}
```

### Deploy Clients

To deploy a client, you must create a JSON file under the `clients` directory of your Visual Studio Team Services project. Example:

__my-client.json__
```json
{
  "name": "my-client"
}
```

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Clients/post_clients) for more info on allowed attributes for Clients and Client Grants.

### Deploy Clients Grants

You can specify the client grants for each client by creating a JSON file in the `grants` directory.

__my-client-api.json__
```json
{
  "client_id": "my-client",
  "audience": "https://myapp.com/api/v1",
    "scope": [
      "read:users"
    ]
}
```

<%= include('./_includes/_deployment-extension') %>

### Deploy Resource Servers

To deploy a resource server, you must create a JSON file under the `resource-servers` directory of your Visual Studio Team Services project. Example:

__my-api.json__
```json
{
  "name": "my-api",
  "identifier": "https://myapp.com/api/v1",
  "scopes": [
    {
      "value": "read:users",
      "description": "Allows getting user information"
    }
  ]
}
```

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Resource_Servers/post_resource_servers) for more info on allowed attributes for Resource Servers.

### Deploy Email Provider

To deploy an email provider, you must create `provider.json` file under the `emails` directory of your Visual Studio Team Services project. Example:

__provider.json__
```json
{
    "name": "smtp",
    "enabled": true,
    "credentials": {
        "smtp_host": "smtp.server.com",
        "smtp_port": 25,
        "smtp_user": "smtp_user",
        "smtp_pass": "smtp_secret_password"
    }
}
```

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Emails/patch_provider) for more info on allowed attributes for Email Provider.

### Deploy Email Templates

The supported email templates are:
- `verify_email`
- `reset_email`
- `welcome_email`
- `blocked_account`
- `stolen_credentials`
- `enrollment_email`
- `mfa_oob_code`

To deploy an email template, you must create an HTML file under the `emails` directory of your Visual Studio Team Services project. For each HTML file, you need to create a JSON file (with the same name) with additional options for that template. For example, to deploy a `blocked_account` template, you would create two files:

```text
your-project/emails/blocked_account.html
your-project/emails/blocked_account.json
```

__blocked_account.json__
```json
{
    "template": "blocked_account",
    "from": "",
    "subject": "",
    "resultUrl": "",
    "syntax": "liquid",
    "body": "./blocked_account.html",
    "urlLifetimeInSeconds": 432000,
    "enabled": true
}
```

## Excluded records

You can exclude the following records from the deployment process: `rules`, `clients`, `databases`, `connections` and `resourceServers`. If excluded, the records will not be modified by deployments.

![](/media/articles/extensions/deploy-extensions/excluded-rules.png)

## Keywords Mapping

Beginning with version **3.0.0**, you can use keywords mapping to manage your secrets and tenant-based environment variables.

There are two ways to use the keyword mappings. You can either wrap the key using `@` symbols (e.g., `@@key@@`), or you can wrap the key using `#` symbols (e.g., `##key##`). 

  - If you use `@` symbols, your value will be converted from a JavaScript object or value to a JSON string.

  - If you use `#` symbols, Auth0 will perform a literal replacement.

This is useful for something like specifying different variables across your environments. For example, you could specify different JWT timeouts for your Development, QA/Testing, and Production environments.

Refer to the snippets below for sample implementations:

__Client.json__
```json
{
  ...
  "callbacks": [
    "##ENVIRONMENT_URL##/auth/callback"
  ],
  "jwt_configuration": {
    "lifetime_in_seconds": ##JWT_TIMEOUT##,
    "secret_encoded": true
  }
  ...
}
```

![](/media/articles/extensions/deploy-extensions/mappings.png)

## Track Deployments

To track your deployments, navigate to the [Extensions](${manage_url}/#/extensions) page, then **Installed Extensions** and click on the row for the **Visual Studio Team Services Deployments** extension, and select the **Deployments** tab. You will see a list of all deployments.

![](/media/articles/extensions/visual-studio-ts/deployments-tab.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

If you configured a **Slack Incoming Webhook**, you will be notified on Slack anytime a deployment occurs.

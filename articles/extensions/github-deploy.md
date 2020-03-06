---
toc: true
description: The GitHub Deployments extension allows you to deploy rules and database connection scripts from GitHub to Auth0.
topics:
  - extensions
  - github-deployments
contentType:
  - how-to
useCase: extensibility-extensions
---

# GitHub Deployments

The **GitHub Deployments** extension allows you to deploy [rules](/rules), rules configs, connections, database connection scripts, clients, client grants, resource servers, hosted pages and email templates from GitHub to Auth0. You can configure a GitHub repository, keep all your rules and database connection scripts there, and have them automatically deployed to Auth0 each time you push to your repository.

::: note
You can use the `auth0-deploy-cli` tool to export and import tenant configuration data to a directory structure or a YAML file. For more information, see [Deploy CLI Tool Overview](/extensions/deploy-cli).
:::

## Configure the extension

To install and configure this extension, click on the __GitHub Deployments__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the dashboard. The __Install Extension__ window will open.

![Install Github Deployments Extension](/media/articles/extensions/github-deploy/install-extension.png)

Set the following configuration variables:

* **REPOSITORY**: The repository from which you want to deploy rules and database scripts. This can be either a public or private repository.
* **BRANCH**: The branch that the extension will monitor for commits.
* **HOST**: The public accessible GitHub Enterprise _(version 2.11.3 and later)_ hostname, no value is required when using github.com (optional).
* **API_PATH**: GitHub Enterprise API path prefix, no value is required when using github.com (optional).
* **TOKEN**: Your GitHub Personal Access Token. Follow the instructions at [Creating an Access Token]
(https://help.github.com/articles/creating-an-access-token-for-command-line-use/#creating-a-token) to create a token with `repo` scope.
* **BASE_DIR**: The base directory, where all your tenant settings are stored
* **AUTO_REDEPLOY**: If enabled, the extension redeploys the last successful configuration in the event of a deployment failure. Manual deployments and validation errors does not trigger auto-redeployment
* **SLACK_INCOMING_WEBHOOK_URL**: The Webhook URL for Slack, used to receive Slack notifications for successful and failed deployments (optional).

::: note
Some of the configuration variables were changed in version **2.6.0** of this extension. If you are updating the extension from a prior version, make sure that you update your configuration accordingly.
:::

Once you have provided this information, click **Install**.

Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the __Installed Extensions__ tab.

Click on the row for the __GitHub Deployments__ extension. The first time you click on your installed extension, you will be asked to grant it to access your GitHub account.

![Grant Github Access](/media/articles/extensions/github-deploy/grant-access.png)

Once you agree, you will be directed to the __GitHub Integration__ configuration page.

![Configure Extension](/media/articles/extensions/github-deploy/configure-extension.png)

The __Configuration__ page will display the settings you will need to create a [webhook](https://developer.github.com/webhooks/) in your GitHub repository pointing to the extension.

Copy these values into the **Add Webhook** page for your GitHub repository:

![Add Webhook](/media/articles/extensions/github-deploy/add-webhook.png)

::: note
You can find details on how to configure a webhook at [Creating Webhooks](https://developer.github.com/webhooks/creating/) on GitHub.
:::

## Deployment

Once you have set up the webhook in GitHub using the provided information, you are ready to start committing to your repository.

With each commit you push to your configured GitHub repository, the webhook will call the extension to initiate a deployment if changes were made to one of these folders:
- `clients`
- `grants`
- `emails`
- `resource-servers`
- `connections`
- `database-connections`
- `rules-configs`
- `rules`
- `pages`

The __Deploy__ button on the **Deployments** tab of the extension allows you to manually deploy the rules and database connection scripts you already have in your GitHub repository. This is useful if you already have a repository filled with scripts that you want to deploy once you have set up the extension, or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your repository.

::: panel-warning Deleting Rules and Scripts from GitHub
To maintain a consistent state, the extension will always do a full redeployment of the contents of these folders. Any rules or database connection scripts that exist in Auth0 but not in your GitHub repository will be __deleted__.
:::

### Deploy Database Connection scripts

To deploy database connection scripts, you must first create a directory under `database-connections`. The name of the directory must __exactly__ match the name of your [database connection](${manage_url}/#/connections/database) in Auth0. Of course, you can create as many directories as you have database connections.

Under the created directory, create one file for every script you want to use. The allowed scripts are:

- `get_user.js`
- `create.js`
- `verify.js`
- `login.js`
- `change_password.js`
- `delete.js`

Only the `login.js` script is required in a custom database connection.

If you enabled the migration feature, you will also need to provide the `get_user.js` script.

You can find an example in [this GitHub repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db).

#### Deploy Database Connection settings

To deploy Database Connection settings, you must create `database-connections/[connection-name]/database.json`.

_This will work only for Auth0 connections (`strategy === auth0`); for non-Auth0 connections use `connections`._

_Support for using `settings.json` has been deprecated in favor of `database.json` since v3.1.1 of the extension and may be dropped in a future release._

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Connections/patch_connections_by_id) for more info on allowed attributes for Connections.

### Deploy Connections

To deploy a connection, you must create a JSON file under the `connections` directory of your GitHub repository. Example:

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

_This will work only for non-Auth0 connections (`strategy !== auth0`); for Auth0 connections, use `database-connections`._

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Connections/post_connections) for more info on allowed attributes for Connections.

### Deploy Universal Login Pages

The supported pages are:

- `error_page`
- `guardian_multifactor`
- `login`
- `password_reset`

To deploy a page, you must create an HTML file under the `pages` directory of your GitHub repository. For each HTML page, you need to create a JSON file (with the same name) that will be used to mark the page as enabled or disabled. For example, to deploy a `password_reset`, you would create two files:

```text
your-github-repo/pages/password_reset.html
your-github-repo/pages/password_reset.json
```

To enable the page, the `password_reset.json` would contain the following:

```json
{
  "enabled": true
}
```

<%= include('./_includes/_use-default-error') %>

### Deploy rules

To deploy a rule, you must first create a JavaScript file under the `rules` directory of your GitHub repository. Each rule must be in its own JavaScript file.

For example, if you create the file `rules/set-country.js`, then the extension will create a rule in Auth0 with the name `set-country`.

::: note
If you plan to use Source Control integration for an existing account, first rename your rules in Auth0 to the same name of the files you will be deploying to this directory.
:::

You can control the rule order and status (`enabled`/`disabled`) by creating a JSON file with the same name as your JavaScript file. For this example, you would create a file named `rules/set-country.json`.

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

You can find examples in [this GitHub repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules).

#### Set the order

Multiple rules of the same order are not allowed. To avoid conflicts, you can create a JSON file for each rule and assign a value for `order`. If you leave enough space between these values, re-ordering them without conflicts will be easier. For example, if you have three rules, instead of setting their order to `1`, `2`, `3`, you can set them to `10`, `20`, `30`. This way, to move the `30` rule before the `20`, you can simply change its `order` to any value between `11` and `19`.

### Deploy Rules Configs

To deploy a rule config, you must create a JSON file under the `rules-configs` directory of your GitHub repository. Example:

__secret_number.json__
```json
{
  "key": "secret_number",
  "value": "42"
}
```

### Deploy Clients

To deploy a client, you must create a JSON file under the `clients` directory of your GitHub repository. Example:

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

To deploy a resource server, you must create a JSON file under the `resource-servers` directory of your GitHub repository. Example:

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

To deploy an email provider, you must create `provider.json` file under the `emails` directory of your GitHub repository. Example:

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

To deploy an email template, you must create an HTML file under the `emails` directory of your GitHub repository. For each HTML file, you need to create a JSON file (with the same name) with additional options for that template. For example, to deploy a `blocked_account` template, you would create two files:

```text
your-github-repo/emails/blocked_account.html
your-github-repo/emails/blocked_account.json
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

## Track deployments

To track your deployments, navigate to the [extensions](${manage_url}/#/extensions) page, click on the row for the __GitHub Deployments__ extension, and select the __Deployments__ tab. You will see a list of all deployments, both successful and failed.

![Deployments Overview](/media/articles/extensions/github-deploy/deployments-overview.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

![Deployment Log](/media/articles/extensions/github-deploy/deployment-log.png)

Also, if you configured a **Slack Incoming Webhook**, you will be notified on Slack if a deployment has succeeded or failed.

![Slack Integration](/media/articles/extensions/github-deploy/slack-messages.png)

---
toc: true
description: The GitHub Deployments extension allows you to deploy rules and database connection scripts from GitHub to Auth0.
topics:
  - extensions
  - github-deployments
---

# GitHub Deployments

The **GitHub Deployments** extension allows you to deploy [rules](/rules) and database connection scripts from GitHub to Auth0. You can configure a GitHub repository, keep all your rules and database connection scripts there, and have them automatically deployed to Auth0 each time you push to your repository.

## Configure the extension

To install and configure this extension, click on the __GitHub Deployments__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the dashboard. The __Install Extension__ window will open.

![Install Github Deployments Extension](/media/articles/extensions/github-deploy/install-extension.png)

Set the following configuration variables:

- **GITHUB_REPOSITORY**: The repository from which you want to deploy rules and database scripts. This can be either a public or private repository.
- **GITHUB_BRANCH**: The branch that the extension will monitor for commits.
- **GITHUB_TOKEN**: Your GitHub personal Access Token. Follow the instructions at [Creating an Access Token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/#creating-a-token) to create a token with `repo` scope.
- **GITHUB_HOST**: The public accessible GitHub Enterprise _(version 2.11.3 and later)_ host name, no value is required when using github.com (optional).
- **GITHUB_API_PATH**: GitHub Enterprise API path prefix, no value is required when using github.com (optional).
- **SLACK_INCOMING_WEBHOOK_URL**: The Webhook URL for Slack, used in order to receive Slack notifications for successful and failed deployments (optional).


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

Once you have setup the webhook in GitHub using the provided information, you are ready to start committing to your repository.

With each commit you push to your configured GitHub repository, if changes were made in the `rules` or `database-connection` folders, the webhook will call the extension to initiate a deployment.

The __Deploy__ button on the **Deployments** tab of the  extension allows you to manually deploy the rules and database connection scripts you already have in your GitHub repository. This is useful if you already have a repository filled with scripts that you want to deploy once you have setup the extension, or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your repository.

::: panel-warning Deleting Rules and Scripts from GitHub
To maintain a consistent state, the extension will always do a full redeployment of the contents of these folders. Any rules or database connection scripts that exist in Auth0 but not in your GitHub repository will be __deleted__.
:::

### Deploy database connection scripts

In order to deploy database connection scripts, you must first create a directory under `database-connections`. The name of the directory must __exactly__ match the name of your [database connection](${manage_url}/#/connections/database) in Auth0. Of course, you can create as many directories as you have database connections.

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

### Deploy Hosted Pages

The supported hosted pages are:
- `error_page`
- `guardian_multifactor`
- `login`
- `password_reset`

To deploy a page, you must create an HTML file under the `pages` directory of your GitHub repository. For each HTML page you need to create a JSON file (with the same name) that will be used to mark the page as enabled or disabled. For example, in order to deploy an `error_page`, you would create two files:

```text
your-github-repo/pages/error_page.html
your-github-repo/pages/error_page.json
```

To enable the page the `error_page.json` would contain the following:

```json
{
  "enabled": true
}
```

### Deploy rules

In order to deploy a rule, you must first create a JavaScript file under the `rules` directory of your GitHub repository. Each rule must be in its own `.js` file.

For example, if you create the file `rules/set-country.js`, then the extension will create a rule in Auth0 with the name `set-country`.

::: note
If you plan to use Source Control integration for an existing account, first rename your rules in Auth0 to the same name of the files you will be deploying to this directory.
:::

You can mark rules as manual. In that case, the source control extension will not delete or update them. To mark a rule, navigate to the **Rules Configuration** tab of the GitHub Integration page. Toggle the **Manual Rule** switch for the rules you want to mark as manual. Click **Update Manual Rules** to save your changes.

![Manual Rules](/media/articles/extensions/github-deploy/manual-rules.png)

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
```javascript
{
  "enabled": false,
  "order": 15,
  "stage": "login_success"
}
```

You can find examples in [this GitHub repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules).

#### Set the order

Multiple rules of the same order are not allowed. To avoid conflicts, you can create a JSON file for each rule and assign a value for `order`. If you leave enough space between these values, re-ordering them without conflicts will be easier. For example, if you have three rules, instead of setting their order to `1`, `2`, `3`, you can set them to `10`, `20`, `30`. This way, to move the `30` rule before the `20`, you can simply change its `order` to any value between `11` and `19`.

## Track deployments

To track your deployments, navigate to the [extensions](${manage_url}/#/extensions) page, click on the row for the __GitHub Deployments__ extension, and select the __Deployments__ tab. You will see a list of all deployments, both successful and failed.

![Deployments Overview](/media/articles/extensions/github-deploy/deployments-overview.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

![Deployment Log](/media/articles/extensions/github-deploy/deployment-log.png)

Also, if you configured a **Slack Incoming Webhook**, you will be notified on Slack if a deployment has succeeded or failed.

![Slack Integration](/media/articles/extensions/github-deploy/slack-messages.png)

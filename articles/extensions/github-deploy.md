---
description: The GitHub Deployments extension allows you to deploy rules and database connection scripts from GitHub to Auth0. 
---

# GitHub Deployments

The **GitHub Deployments** extension allows you to deploy [rules](/rules) and database connection scripts from GitHub to Auth0. You can configure a GitHub repository, keep all your rules and database connection scripts there, and have them automatically deployed to Auth0 each time you push to your repository.

__NOTE__: This extension is currently available only for the public cloud. Extensions are not yet supported in the [appliance](/appliance).

## Configure the extension

To install and configure this extension, click on the __GitHub Deployments__ box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the dashboard. The __Install Extension__ window will open.

![](/media/articles/extensions/github-deploy/install-extension.png)

Set the following configuration variables:

- **GITHUB_REPOSITORY**: The repository from which you want to deploy rules and database scripts. This can be either a public or private repository. 
- **GITHUB_BRANCH**: The branch that the extension will monitor for commits.
- **GITHUB_TOKEN**: Your GitHub personal access token. Follow the instructions at [Creating an access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/#creating-a-token) to create a token with `repo` scope.
- **SLACK_INCOMING_WEBHOOK_URL**: The Webhook URL for Slack, used in order to receive Slack notifications for successful and failed deployments (optional).

Once you have provided this information, click **Install**.

Navigate to the [Extensions](${uiURL}/#/extensions) page and click on the __Installed Extensions__ tab. 

Click on the row for the __GitHub Deployments__ extension. The first time you click on your installed extension, you will be asked to grant it to access your GitHub account. 

![](/media/articles/extensions/github-deploy/grant-access.png)

Once you agree, you will be directed to the __GitHub Integration__ configuration page.

![](/media/articles/extensions/github-deploy/configure-extension.png)

The __Configuration__ page will display the settings you will need to create a [webhook](https://developer.github.com/webhooks/) in your GitHub repository pointing to the extension. 

Copy these values into the **Add Webhook** page for your GitHub repository:

![](/media/articles/extensions/github-deploy/add-webhook.png)

**NOTE**: You can find details on how to configure a webhook at [Creating Webhooks](https://developer.github.com/webhooks/creating/) on GitHub.

## Deployment

Once you have setup the webhook in GutHub using the provided information, you are ready to start committing to your repository. 

With each commit you push to your configured GitHub repository, if changes were made in the `rules` or `database-connection` folders, the webhook will call the extension to initiate a deployment. 

The __Deploy__ button on the **Deployments** tab of the  extension allows you to manually deploy the rules and database connection scripts you already have in your GitHub repository. This is useful if you already have a repository filled with scripts that you want to deploy once you have setup the extension, or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your repository.

::: panel-warning Full Deployment
To maintain a consistent state, the extension will always do a full redeployment of the contents of these folders. Any rules or database connection scripts that exist in Auth0 but not in your GitHub repository will be __deleted__.
:::

### Deploy database connection scripts

In order to deploy database connection scripts, you must first create a directory under `database-connections`. The name of the directory must __exactly__ match the name of your [database connection](${uiURL}/#/connections/database) in Auth0. Of course, you can create as many directories as you have database connections.

Under the created directory, create one file for every script you want to use. The allowed scripts are:

- `get_user.js`
- `create.js`
- `verify.js`
- `login.js`
- `change_password.js`
- `delete.js`

Only the `login.js` script is required in a custom database connection. 

If you enabled the migration feature, you will also need to provide the `get_user.js` script.

You can find an examples in [this GitHub repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db).

### Deploy rules

In order to deploy a rule, you must first create a JavaScript file under the `rules` directory of your GitHub repository. Each rule must be in its own `.js` file. 

For example, if you create the file `rules/set-country.js`, then the extension will create a rule in Auth0 with the name `set-country`. 

__NOTE__: If you plan to use Source Control integration for an existing account, first rename your rules in Auth0 to the same name of the files you will be deploying to this directory.

You can control the rule order, status (`enabled`/`disabled`) and stage (`login_success`, `login_failure`, `user_registration`) by creating a JSON file with the same name as your JavaScript file. For this example, you would create a file named `rules/set-country.json`.

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

#### Set the stage

After you deploy a rule, you cannot change its stage. You would have to create a new rule with a new name and updated stage, and then delete the original rule. For the `user_registration` and `login_failure` stages, only a single rule is allowed.

## Track deployments

To track your deployments, navigate to the [extensions](${uiURL}/#/extensions) page, click on the row for the __GitHub Deployments__ extension, and select the __Deployments__ tab. You will see a list of all deployments, both successful and failed.

![](/media/articles/extensions/github-deploy/deployments-overview.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

![](/media/articles/extensions/github-deploy/deployment-log.png)

Also, if you configured a **Slack Incoming Webhook**, you will be notified on Slack if a deployment has succeeded or failed.

![](/media/articles/extensions/github-deploy/slack-messages.png)


